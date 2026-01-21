# ProTools ER1: Programming Tools for Empirical Research

An interactive online course designed to help first-year Economics PhD students develop the programming skills essential for empirical research.

## Overview

ProTools ER1 provides a comprehensive introduction to programming tools and methods used in modern empirical economics research. The course bridges classical econometric tools (Stata, R) with contemporary data science and AI capabilities (Python, Jupyter, LLMs).

**Target Audience:** PhD students in economics, quantitative researchers, and anyone seeking to jumpstart empirical research with programming.

## Course Structure

The course consists of 13 modules organized into a logical learning progression:

| Module | Title | Topics |
|--------|-------|--------|
| **0** | Languages & Platforms | Python, Stata, R setup; IDE walkthroughs (RStudio, Stata, VS Code, Jupyter) |
| **1** | Getting Started | Course overview, data analysis workflows, introductory exercises |
| **2** | Data Harnessing | File import (CSV, Excel, .dta), APIs, web scraping |
| **3** | Data Exploration | Data inspection, summary statistics, visualization |
| **4** | Data Cleaning | Data quality, transformation, validation |
| **5** | Data Analysis | Statistical analysis, data simulation, experimental design |
| **6** | Causal Inference | Matching, Difference-in-Differences, RDD, IV, Synthetic Control |
| **7** | Estimation Methods | Standard errors, panel data, nonlinear models, MLE/GMM |
| **8** | Replicability | Project organization, documentation, replication packages |
| **9** | Git & GitHub | Version control, collaboration, branching, pull requests |
| **10** | History of NLP | From ELIZA to Transformers |
| **11** | Machine Learning | Prediction, regularization, trees, neural networks |
| **12** | Large Language Models | How LLMs work, prompting, APIs, limitations |

## Programming Languages

The course teaches three core languages essential for economics research:

### Python
- Recommended primary language for beginners
- Best compatibility with AI coding assistants
- Key packages: `pandas`, `numpy`, `matplotlib`, `statsmodels`, `linearmodels`, `scikit-learn`

### Stata
- Dominant language in academic economics
- Essential for replicating published research
- Key packages: `estout`, `reghdfe`, `rdrobust`, `csdid`, `did_imputation`

### R
- Statistical computing and advanced graphics
- Strong econometrics ecosystem
- Key packages: `tidyverse`, `fixest`, `modelsummary`, `rdrobust`, `ggdag`

## Features

### Interactive Learning
- **Multi-language code tabs:** View examples in Python, Stata, and R side-by-side
- **Interactive exercises:** Practice coding with instant feedback
- **Solution dropdowns:** Reveal answers progressively
- **Code tooltips:** Hover explanations for coding concepts

### AI-Powered Assistant
- Built-in chatbot for questions about course content
- Context-aware responses based on current module
- Supports Google Gemini and OpenAI backends

### Research Project
Throughout the course, students build a complete research project: *"Climate Vulnerability and Economic Growth"*—from data acquisition through causal analysis and documentation.

## File Structure

```
/
├── index.html              # Main landing page
├── resources.html          # References, textbooks, data sources
├── modules/                # Course content (33 HTML files)
│   ├── 00-languages-platforms.html
│   ├── 01-getting-started.html
│   ├── 02-data-harnessing.html
│   ├── 02a-file-import.html
│   ├── 02b-apis.html
│   ├── 02c-web-scraping.html
│   ├── 03-data-exploration.html
│   ├── 04-data-cleaning.html
│   ├── 05-data-analysis.html
│   ├── 06-causal-inference.html
│   ├── 06a-matching.html
│   ├── 06b-did.html
│   ├── 06c-rdd.html
│   ├── 06d-iv.html
│   ├── 06e-synthetic-control.html
│   ├── 07-estimation.html
│   ├── 08-replicability.html
│   ├── 09-github.html
│   ├── 10-nlp-history.html
│   ├── 11-machine-learning.html
│   ├── 12-llms.html
│   └── ...
├── css/
│   └── style.css           # Main styling
├── js/
│   ├── main.js             # Core interactivity
│   ├── chatbot.js          # AI assistant
│   └── password-protection.js
├── api/
│   ├── cloudflare-worker.js
│   └── CHATBOT_SETUP.md    # Chatbot configuration guide
└── images/                 # Course graphics
```

## Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Fonts:** Crimson Pro (headings), Fira Code (code), Source Sans Pro (body)
- **Backend:** Cloudflare Workers (API proxy for chatbot)
- **Design:** Responsive, mobile-friendly layout

## Getting Started

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required—it's static HTML/CSS/JS

### Chatbot Setup (Optional)
See [api/CHATBOT_SETUP.md](api/CHATBOT_SETUP.md) for instructions on configuring the AI assistant with Google Gemini (free) or OpenAI.

## Resources

The course references several key textbooks and resources:

### Causal Inference
- Cunningham, *Causal Inference: The Mixtape*
- Huntington-Klein, *The Effect*
- Angrist & Pischke, *Mostly Harmless Econometrics*

### Programming
- McKinney, *Python for Data Analysis*
- Wickham & Grolemund, *R for Data Science*

### Machine Learning
- James et al., *An Introduction to Statistical Learning*
- Hastie et al., *The Elements of Statistical Learning*

### Data Sources
- IPUMS, World Bank Open Data, FRED, Harvard Dataverse, AEA Data Editor

## Course Philosophy

- **Hands-on:** Emphasis on practical, applicable skills
- **Multi-language:** Recognizes economists use different tools
- **Research-oriented:** Real research project throughout
- **Beginner-friendly:** Clear explanations and interactive demos
- **Modern:** Classical econometrics AND modern ML/LLM tools
- **Reproducible:** Strong focus on documentation and replication

## Contributing

Feedback and contributions are welcome. Please use the contact form in the course or open an issue in this repository.

## License

This course is intended for educational purposes.

---

*ProTools ER1 is Part 1 of a two-part series. ProTools ER2 (coming soon) will cover advanced topics.*
