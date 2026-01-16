# ProTools ER1 Chatbot Setup Guide

This guide explains how to connect the course chatbot to an LLM for intelligent responses.

## Quick Start (No API - Smart Fallback)

The chatbot works **immediately without any setup**! It uses smart keyword-based responses that cover all course topics. This is perfect for testing or if you don't want to set up an API.

## Option 1: Google Gemini (FREE - Recommended)

Google's Gemini API has a generous free tier (15 requests per minute).

### Step 1: Get API Key
1. Go to https://aistudio.google.com/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### Step 2: Deploy Cloudflare Worker
1. Go to https://workers.cloudflare.com and create free account
2. Click "Create a Worker"
3. Delete the default code and paste the contents of `cloudflare-worker.js`
4. Click "Save and Deploy"
5. Go to **Settings > Variables**
6. Add environment variable:
   - Name: `GOOGLE_API_KEY`
   - Value: (paste your Gemini API key)
7. Copy your Worker URL (e.g., `https://protools-chatbot.yourname.workers.dev`)

### Step 3: Update chatbot.js
Open `js/chatbot.js` and find this line (around line 25):
```javascript
apiUrl: null,  // Set to null to use fallback responses
```

Change it to:
```javascript
apiUrl: 'https://protools-chatbot.yourname.workers.dev',
```

## Option 2: OpenAI GPT-4o-mini

Better quality responses but costs ~$0.15 per 1M input tokens.

### Step 1: Get API Key
1. Go to https://platform.openai.com/api-keys
2. Create account and add payment method
3. Create new API key
4. Copy the key

### Step 2: Deploy (same as above)
Follow the same Cloudflare Worker steps, but use:
- Name: `OPENAI_API_KEY`
- Value: (paste your OpenAI API key)

## Cost Estimates

| Provider | Cost | Free Tier |
|----------|------|-----------|
| Google Gemini | Free | 15 requests/minute, unlimited |
| OpenAI GPT-4o-mini | ~$0.15/1M tokens | $5 credit for new accounts |

For a course with 50 students making 10 queries each per week:
- **Gemini**: $0/month
- **GPT-4o-mini**: ~$0.50-2/month

## How It Works

```
[Student Browser]
       ↓ POST request
[Cloudflare Worker] (keeps API key secret)
       ↓ API call
[LLM (Gemini/OpenAI)]
       ↓ response
[Student Browser]
```

The Cloudflare Worker acts as a proxy that:
1. Keeps your API key secret (never exposed to browsers)
2. Adds the course context (system prompt) to every request
3. Handles errors gracefully

## System Prompt

The chatbot knows about the entire course structure through a detailed system prompt in `cloudflare-worker.js`. You can customize this to:
- Emphasize certain topics
- Add office hours information
- Include assignment deadlines
- Adjust the tone/style

## Testing

1. Open any course page
2. Click the chat bubble in the bottom-right
3. Ask a question like "What's the difference between DiD and RDD?"
4. You should get a helpful, course-specific response

## Troubleshooting

**"API error" in console**
- Check that your API key is correctly set in Cloudflare Worker settings
- Verify the key hasn't expired
- Check Cloudflare Worker logs for details

**Responses are generic/not course-focused**
- Make sure you copied the full system prompt from `cloudflare-worker.js`
- The system prompt should mention all 13 modules

**CORS errors**
- The worker includes CORS headers. Make sure you deployed the latest version.

## Privacy Note

- Conversation logs are stored in the student's browser (localStorage)
- The Cloudflare Worker doesn't log conversations
- API providers (Google/OpenAI) may log requests per their policies
- Use `exportChatLogs()` in browser console to see what's stored locally
