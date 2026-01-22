/**
 * ProTools ER1 Chatbot - Cloudflare Worker
 *
 * This serverless function handles chatbot requests and calls the OpenAI API.
 * Deploy this to Cloudflare Workers (free tier: 100,000 requests/day).
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Cloudflare account at https://workers.cloudflare.com
 * 2. Create a new Worker
 * 3. Paste this code
 * 4. Add environment variable: OPENAI_API_KEY (in Worker Settings > Variables)
 * 5. Deploy and copy the worker URL (e.g., https://protools-chatbot.yourname.workers.dev)
 * 6. Update CHATBOT_API_URL in chatbot.js with your worker URL
 *
 * Alternative: Use GOOGLE_API_KEY for Gemini (free tier) instead of OpenAI
 */

// Course content system prompt - this gives the LLM context about the course
const SYSTEM_PROMPT = `You are the ProTools ER1 course assistant, helping students learn programming for economics research. You are knowledgeable, friendly, and focused on practical guidance.

COURSE STRUCTURE:
- Module 0: Languages & Platforms - Choosing between Python, Stata, R; IDE setup (RStudio, VS Code, Stata)
- Module 1: Getting Started - First scripts, virtual environments, project setup
- Module 2: Data Harnessing - Three submodules:
  - 2a: Importing from Files (CSV, Excel, Stata .dta, Parquet; merging; reshaping wide/long)
  - 2b: Working with APIs (HTTP requests, JSON, World Bank API, FRED, authentication)
  - 2c: Web Scraping (legal considerations, robots.txt, ToS, BeautifulSoup, rvest, Selenium)
- Module 3: Data Exploration - "First Analysis" script, inspecting data, summary statistics, visualizations
- Module 4: Data Cleaning - Missing values, outliers, string manipulation, dates, validation
- Module 5: Data Analysis - Descriptive statistics, visualization (matplotlib, ggplot2), hypothesis testing
- Module 6: Causal Inference - DiD, IV, RDD, panel methods, parallel trends
- Module 7: Estimation Methods - OLS, fixed effects, clustering, robust standard errors
- Module 8: Replicability - Project organization, documentation, replication packages
- Module 9: Git & GitHub - Version control, commits, branches, pull requests, collaboration
- Module 10: History of NLP - Text processing evolution, bag of words, embeddings
- Module 11: Machine Learning - Supervised learning, cross-validation, regularization, trees
- Module 12: Large Language Models - Transformers, fine-tuning, prompt engineering, API usage

COURSE RESEARCH PROJECT:
Students build a project analyzing "Climate Vulnerability and Economic Growth" using World Bank data.

RESPONSE GUIDELINES:
1. Be concise but helpful. Students are busy.
2. Always mention which module covers the topic in depth.
3. Provide code snippets when helpful (mark language: Python, Stata, or R).
4. If unsure, suggest checking the relevant module or asking the instructor.
5. For causal inference questions, emphasize assumptions and identification.
6. For coding questions, give examples in the student's preferred language if mentioned.
7. Keep responses under 300 words unless the question requires more detail.

IMPORTANT: You are teaching economics graduate students. They understand statistics and economics but may be new to programming. Balance rigor with accessibility.`;

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS request (CORS preflight)
function handleOptions() {
  return new Response(null, { headers: corsHeaders });
}

// Call OpenAI API
async function callOpenAI(messages, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',  // Cost-effective and capable
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Call Google Gemini API (free alternative)
async function callGemini(messages, apiKey) {
  // Convert messages to Gemini format
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Add system prompt as first user message
  contents.unshift({
    role: 'user',
    parts: [{ text: `SYSTEM INSTRUCTIONS:\n${SYSTEM_PROMPT}\n\nNow respond to the following conversation:` }]
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Main request handler
export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders
      });
    }

    try {
      const { messages, pageContext } = await request.json();

      if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Add page context to help the bot understand where the user is
      const contextualMessages = [...messages];
      if (pageContext && contextualMessages.length > 0) {
        const lastUserMsg = contextualMessages.find(m => m.role === 'user');
        if (lastUserMsg) {
          lastUserMsg.content = `[User is viewing: ${pageContext.title}]\n\n${lastUserMsg.content}`;
        }
      }

      let responseText;

      // Try OpenAI first, fall back to Gemini
      if (env.OPENAI_API_KEY) {
        responseText = await callOpenAI(contextualMessages, env.OPENAI_API_KEY);
      } else if (env.GOOGLE_API_KEY) {
        responseText = await callGemini(contextualMessages, env.GOOGLE_API_KEY);
      } else {
        return new Response(JSON.stringify({
          error: 'No API key configured. Set OPENAI_API_KEY or GOOGLE_API_KEY in worker environment.'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ response: responseText }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({
        error: 'Failed to generate response. Please try again.',
        details: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
