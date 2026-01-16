/**
 * ProTools ER1 Chatbot - Cloudflare Worker
 * Connects to Google Gemini API
 * Includes request limiting to stay within free tier
 */

const DAILY_LIMIT = 99000; // Stop before hitting 100k free tier limit

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // Get today's date as key (resets daily)
      const today = new Date().toISOString().split('T')[0]; // e.g., "2026-01-16"
      const countKey = `requests_${today}`;

      // Get current count from KV
      let currentCount = parseInt(await env.REQUEST_COUNTER.get(countKey)) || 0;

      // Check if limit reached
      if (currentCount >= DAILY_LIMIT) {
        return new Response(JSON.stringify({
          error: "limit_reached",
          reply: "The AI assistant has reached its daily limit. Please try again tomorrow, or use the knowledge base for common questions about the course!"
        }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const { message } = await request.json();

      if (!message) {
        return new Response(JSON.stringify({ error: "No message provided" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
            systemInstruction: {
              parts: [{
                text: `You are a helpful teaching assistant for ProTools ER1, an economics programming course.

The course covers:
- Module 0: Languages & Platforms (Python, Stata, R, VS Code, RStudio, Jupyter)
- Module 1: Getting Started (virtual environments, packages, first scripts)
- Module 2: Data Harnessing (file import, APIs, web scraping)
- Module 3: Data Exploration (summary stats, diagnostics)
- Module 4: Data Cleaning (missing values, outliers, strings, dates)
- Module 5: Data Analysis (visualization, correlations, hypothesis tests)
- Module 6: Causal Inference (DiD, IV, RDD)
- Module 7: Estimation (OLS, fixed effects, clustering)
- Module 8: Replicability (folder structure, documentation)
- Module 9: Git & GitHub (version control, commits, branches)
- Module 10: NLP History (tokenization, TF-IDF, text analysis)
- Module 11: Machine Learning (train/test, cross-validation, regularization)
- Module 12: LLMs (prompt engineering, APIs)

Guidelines:
- Give concise, practical answers
- Include code examples in Python, Stata, or R when relevant
- Point students to specific modules when appropriate
- Be encouraging and supportive`
              }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error("Gemini API error:", data.error);
        return new Response(JSON.stringify({ error: "API error", details: data.error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Increment counter after successful API call
      await env.REQUEST_COUNTER.put(countKey, String(currentCount + 1), {
        expirationTtl: 86400 * 2 // Expire after 2 days to clean up old keys
      });

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again.";

      return new Response(JSON.stringify({ reply }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    } catch (error) {
      console.error("Worker error:", error);
      return new Response(JSON.stringify({ error: "Server error", details: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
