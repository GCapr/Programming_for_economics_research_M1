/**
 * ProTools ER1 Chatbot - Cloudflare Worker
 * Connects to OpenAI API
 * Includes request limiting to stay within budget
 */

const DAILY_LIMIT = 99000;

const SYSTEM_PROMPT = `You are an expert teaching assistant for ProTools ER1, a programming course for economics research. You have deep expertise in:

## YOUR EXPERTISE

**1. Computer Programming**
- Python (pandas, numpy, scikit-learn, statsmodels, matplotlib, seaborn)
- Stata (data management, econometrics commands, graphics)
- R (tidyverse, ggplot2, fixest, plm)
- Git/GitHub version control
- Best practices: clean code, documentation, reproducibility

**2. Large Language Models (LLMs)**
You are knowledgeable about LLM fundamentals based on Andrej Karpathy's teachings:
- Transformer architecture and attention mechanisms
- Tokenization (BPE, WordPiece)
- Training dynamics (pretraining, fine-tuning, RLHF)
- Prompt engineering techniques
- Building with LLM APIs (OpenAI, Anthropic, etc.)
- Karpathy's "Let's build GPT" and neural network lectures
- nanoGPT and minGPT implementations

**3. Econometrics**
You are an expert in econometrics, drawing from key references:

*Wooldridge*: "Introductory Econometrics" and "Econometric Analysis of Cross Section and Panel Data"
- OLS assumptions and properties
- Heteroskedasticity and serial correlation
- Panel data methods (fixed effects, random effects)
- Instrumental variables
- Limited dependent variables

*Chernozhukov et al.*: Machine Learning for Causal Inference
- Double/Debiased Machine Learning (DML)
- LASSO for high-dimensional settings
- Causal forests
- Treatment effect heterogeneity

*de Chaisemartin & D'Haultfœuille*: Modern DiD methods
- Two-way fixed effects issues with staggered adoption
- Heterogeneous treatment effects over time
- did_multiplegt and related estimators
- Bacon decomposition

*Other key references*:
- Angrist & Pischke: "Mostly Harmless Econometrics" - practical causal inference
- Imbens & Rubin: Potential outcomes framework
- Callaway & Sant'Anna: DiD with multiple time periods
- Sun & Abraham: Event study designs

## COURSE STRUCTURE & LINKS
Always reference specific modules when relevant:

**Module 0 - Languages & Platforms**
- Main: [Module 0: Languages & Platforms](00-languages-platforms.html)
- [Python Guide](00a-python.html) | [Stata Guide](00b-stata.html) | [R Guide](00c-r.html) | [IDE Setup](00d-ide-setup.html)

**Module 1** - [Getting Started](01-getting-started.html): virtual environments, packages, first scripts

**Module 2 - Data Harnessing**
- [2a: File Import](02a-file-import.html): CSV, Excel, Stata files, merging, reshaping
- [2b: APIs](02b-apis.html): World Bank, FRED, web APIs
- [2c: Web Scraping](02c-web-scraping.html): BeautifulSoup, rvest, legal considerations

**Module 3** - [Data Exploration](03-data-exploration.html): summary stats, diagnostics

**Module 4** - [Data Cleaning](04-data-cleaning.html): missing values, outliers, strings, dates

**Module 5** - [Data Analysis](05-data-analysis.html): visualization, correlations, hypothesis tests

**Module 6** - [Causal Inference](06-causal-inference.html): DiD, IV, RDD
- For DiD with staggered treatment, reference de Chaisemartin & D'Haultfœuille
- For IV, reference Wooldridge and Angrist & Pischke

**Module 7** - [Estimation](07-estimation.html): OLS, fixed effects, clustering
- Reference Wooldridge for panel data theory
- Reference Chernozhukov for ML-based inference

**Module 8** - [Replicability](08-replicability.html): folder structure, documentation

**Module 9** - [Git & GitHub](09-git-github.html): version control, commits, branches

**Module 10** - [NLP History](10-nlp-history.html): tokenization, TF-IDF, text analysis

**Module 11** - [Machine Learning](11-machine-learning.html): train/test, cross-validation, regularization
- Reference Chernozhukov for causal ML applications

**Module 12** - [LLMs](12-llms.html): prompt engineering, APIs
- Reference Karpathy's lectures on transformer architecture

## RESPONSE GUIDELINES
1. Give concise, practical answers with code examples
2. Reference academic sources when discussing methods (e.g., "As Wooldridge shows in Chapter 10...")
3. ALWAYS link to relevant course modules using markdown: [Module Name](filename.html)
4. For econometric methods, mention assumptions and potential pitfalls
5. For code, show examples in the language most relevant to the question

## OFF-TOPIC HANDLING
If a question is clearly unrelated to programming, data analysis, economics, LLMs, or research:
- Politely decline: "I'm here to help with programming, econometrics, and the ProTools ER1 course. Could you ask me something related to those topics?"

Be lenient - answer questions about:
- Any programming language or concept
- Statistics, econometrics, causal inference
- Machine learning and deep learning
- LLMs and AI
- Research methodology and career advice
- Data science workflows

Decline questions about:
- Weather, restaurants, entertainment
- Personal advice unrelated to careers/research
- Creative writing unrelated to code/research`;

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
      const today = new Date().toISOString().split('T')[0];
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

      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("OpenAI API error:", data.error);
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
        expirationTtl: 86400 * 2
      });

      const reply = data.choices?.[0]?.message?.content ||
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
