/**
 * ProTools ER1 - Chatbot Assistant with Logging
 *
 * This provides a simple chatbot interface that logs all conversations.
 * The logs are stored in localStorage and can be exported.
 *
 * IMPORTANT: To connect to a real AI backend (like Claude API), you would need:
 * 1. A backend server to handle API calls (to keep your API key secret)
 * 2. Or use a service like Vercel Edge Functions, Cloudflare Workers, etc.
 *
 * For now, this provides a UI that logs conversations and can be extended
 * to connect to a real AI service.
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        storageKey: 'protools_er1_chat_logs',
        maxLogEntries: 1000,
        sessionIdKey: 'protools_er1_session_id'
    };

    // Generate a unique session ID
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get or create session ID
    function getSessionId() {
        let sessionId = sessionStorage.getItem(CONFIG.sessionIdKey);
        if (!sessionId) {
            sessionId = generateSessionId();
            sessionStorage.setItem(CONFIG.sessionIdKey, sessionId);
        }
        return sessionId;
    }

    // Get current page info
    function getPageContext() {
        return {
            url: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString()
        };
    }

    // Log a chat entry
    function logChat(entry) {
        try {
            const logs = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');

            // Add session and context info
            entry.sessionId = getSessionId();
            entry.context = getPageContext();

            logs.push(entry);

            // Keep only the last maxLogEntries
            if (logs.length > CONFIG.maxLogEntries) {
                logs.splice(0, logs.length - CONFIG.maxLogEntries);
            }

            localStorage.setItem(CONFIG.storageKey, JSON.stringify(logs));
        } catch (e) {
            console.error('Failed to log chat:', e);
        }
    }

    // Export logs (for instructor use)
    window.exportChatLogs = function() {
        const logs = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'protools_chat_logs_' + new Date().toISOString().split('T')[0] + '.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Get logs count (for instructor use)
    window.getChatLogsCount = function() {
        const logs = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
        console.log('Total chat log entries:', logs.length);
        return logs.length;
    };

    // Clear logs (for instructor use)
    window.clearChatLogs = function() {
        if (confirm('Are you sure you want to clear all chat logs?')) {
            localStorage.removeItem(CONFIG.storageKey);
            console.log('Chat logs cleared.');
        }
    };

    // Simple response generator (placeholder - replace with real AI integration)
    function generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Course-specific responses
        const responses = {
            'python': "Python is a versatile language widely used in data science and machine learning. In this course, I cover Python alongside Stata and R. Check out Module 1 for getting started with Python, and Module 10 for machine learning applications.",

            'stata': "Stata is the standard in academic economics, especially for panel data and econometrics. I'll show you how to use it for causal inference methods in Modules 5 and 6.",

            'r': "R excels at statistics and visualization (especially ggplot2). You'll find R code alongside Python and Stata throughout this course. Start with Module 0 to understand when to use each language.",

            'did': "Difference-in-Differences (DiD) is a key causal inference method I cover in Module 6. It requires parallel trends assumption and works well with panel data. I provide implementations in Python, Stata, and R.",

            'iv': "Instrumental Variables (IV) help address endogeneity when you have a valid instrument. See Module 6 for the theory and code implementations in all three languages.",

            'rdd': "Regression Discontinuity Design (RDD) exploits sharp cutoffs in treatment assignment. I cover both sharp and fuzzy RDD in Module 6 with code examples.",

            'git': "Git and version control are essential for reproducible research. Module 8 covers everything from basic commits to branching and pull requests. Every researcher should use Git!",

            'replicability': "Replicability is crucial in modern research. Module 7 covers project organization, documentation standards, and how to create professional replication packages.",

            'help': "I can help you with questions about Python, Stata, R, causal inference (DiD, IV, RDD), machine learning, Git, and replicability. What specific topic would you like to know more about?",

            'default': "That's a great question! I'd recommend checking the relevant module in the course. For causal inference, see Modules 5-6. For programming basics, start with Modules 0-4. For best practices, see Modules 7-8. Can I help you find something specific?"
        };

        // Check for keywords in message
        for (const [keyword, response] of Object.entries(responses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                return response;
            }
        }

        // Check for greetings
        if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
            return "Hello! Welcome to ProTools ER1. I'm here to help you navigate the course material. What would you like to learn about today?";
        }

        // Check for thanks
        if (lowerMessage.match(/(thank|thanks|thx)/)) {
            return "You're welcome! Feel free to ask if you have more questions about the course material.";
        }

        return responses.default;
    }

    // Add message to chat UI
    function addMessage(text, isUser = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ' + (isUser ? 'user' : 'assistant');

        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Handle sending a message
    function sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // Clear input
        input.value = '';

        // Add user message to UI
        addMessage(message, true);

        // Log user message
        logChat({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });

        // Generate and show response (with small delay for natural feel)
        setTimeout(() => {
            const response = generateResponse(message);

            // Add assistant message to UI
            addMessage(response, false);

            // Log assistant response
            logChat({
                type: 'assistant',
                message: response,
                userPrompt: message,
                timestamp: new Date().toISOString()
            });
        }, 500);
    }

    // Initialize chatbot
    function init() {
        const toggle = document.getElementById('chatbot-toggle');
        const panel = document.getElementById('chatbot-panel');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (!toggle || !panel) return;

        // Toggle panel visibility
        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) {
                input?.focus();
            }
        });

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                panel.classList.remove('open');
            });
        }

        // Send button
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        // Enter key to send (Shift+Enter for new line)
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
