/**
 * ProTools ER1 - Course Assistant Chatbot
 *
 * Hybrid chatbot: First checks local knowledge base, then falls back to
 * Gemini API via Cloudflare Worker for questions not in the knowledge base.
 */

(function() {
    'use strict';

    // ===========================================
    // CONFIGURATION
    // ===========================================

    const API_URL = 'https://protools-chatbot.protools-er1.workers.dev';
    const USE_API_FALLBACK = true; // Set to false to use only knowledge base

    // ===========================================
    // KNOWLEDGE BASE - All Q&A pairs
    // ===========================================

    const KNOWLEDGE_BASE = [
        // ============ GENERAL / GETTING STARTED ============
        {
            keywords: ['hello', 'hi', 'hey', 'ciao', 'good morning', 'good afternoon'],
            question: "Greeting",
            answer: "Hello! I'm the ProTools ER1 assistant. I can help you with:\n\n- **Course navigation** - finding the right module\n- **Programming** - Python, Stata, R questions\n- **Methods** - causal inference, estimation\n- **Best practices** - Git, replicability\n\nWhat would you like to learn about?"
        },
        {
            keywords: ['help', 'what can you do', 'how does this work'],
            question: "What can you help with?",
            answer: "I can answer questions about:\n\n**Programming**: Python, Stata, R syntax\n**Data work**: Loading, cleaning, merging, APIs, scraping\n**Causal inference**: DiD, IV, RDD, panel methods\n**ML & NLP**: Machine learning, text analysis, LLMs\n**Best practices**: Git, replicability, documentation\n\nJust type your question!"
        },
        {
            keywords: ['which module', 'where do i find', 'where is', 'what module covers'],
            question: "Finding content in the course",
            answer: "Here's the course structure:\n\n**Modules 0-1**: Setup & getting started\n**Module 2**: Data acquisition (files, APIs, scraping)\n**Module 3**: Data exploration & diagnostics\n**Module 4**: Data cleaning\n**Module 5**: Analysis & visualization\n**Modules 6-7**: Causal inference & estimation\n**Modules 8-9**: Replicability & Git\n**Modules 10-12**: NLP, ML, LLMs\n\nWhat topic are you looking for?"
        },
        {
            keywords: ['thank', 'thanks', 'thx', 'grazie', 'cheers'],
            question: "Thanks",
            answer: "You're welcome! Feel free to ask if you have more questions. Good luck with your research!"
        },

        // ============ MODULE 0: LANGUAGES & PLATFORMS ============
        {
            keywords: ['which language', 'python or stata', 'python or r', 'stata or r', 'what language should', 'best language'],
            question: "Which programming language should I use?",
            answer: "It depends on your goals:\n\n**Stata**: Best for econometrics, standard in academic economics, excellent for panel data\n\n**Python**: Most versatile, great for ML/NLP, largest ecosystem, industry-relevant\n\n**R**: Excellent for statistics & visualization (ggplot2), strong in biostatistics\n\n**My recommendation**: Learn Stata for econometrics papers, Python for everything else. See Module 0 for detailed comparisons."
        },
        {
            keywords: ['rstudio', 'r studio', 'how to use rstudio'],
            question: "How do I use RStudio?",
            answer: "RStudio is the standard IDE for R. Key panels:\n\n- **Source** (top-left): Write scripts\n- **Console** (bottom-left): Run commands\n- **Environment** (top-right): See variables\n- **Plots/Files** (bottom-right): View outputs\n\nSee **Module 0 → RStudio Guide** for complete setup instructions."
        },
        {
            keywords: ['vscode', 'vs code', 'visual studio code'],
            question: "How do I set up VS Code?",
            answer: "VS Code is great for Python (and multi-language projects):\n\n1. Install VS Code from code.visualstudio.com\n2. Install the **Python extension**\n3. Install the **Jupyter extension** for notebooks\n4. Select your Python interpreter (bottom-left)\n\nSee **Module 0 → VS Code Guide** for detailed setup."
        },
        {
            keywords: ['jupyter', 'notebook', 'ipynb', 'colab'],
            question: "Should I use Jupyter notebooks?",
            answer: "Notebooks are great for:\n- **Exploration**: Testing code interactively\n- **Teaching**: Mixing code, output, and explanations\n- **Visualization**: Seeing plots inline\n\nBut for **production code**, use regular .py scripts - they're easier to version control and debug.\n\nSee **Module 0 → Notebooks Guide**."
        },

        // ============ MODULE 1: GETTING STARTED ============
        {
            keywords: ['virtual environment', 'venv', 'conda', 'environment'],
            question: "What is a virtual environment?",
            answer: "A virtual environment isolates your project's dependencies:\n\n**Python (venv)**:\n`python -m venv myenv`\n`source myenv/bin/activate`\n\n**Conda**:\n`conda create -n myenv python=3.11`\n`conda activate myenv`\n\n**Why use them?** Different projects need different package versions. Environments prevent conflicts and ensure reproducibility.\n\nSee **Module 1** for complete setup."
        },
        {
            keywords: ['install package', 'pip install', 'conda install', 'install library'],
            question: "How do I install packages?",
            answer: "**Python (pip)**:\n`pip install pandas numpy matplotlib`\n\n**Python (conda)**:\n`conda install pandas numpy matplotlib`\n\n**R**:\n`install.packages(\"tidyverse\")`\n\n**Stata**: Most commands built-in; for user-written:\n`ssc install outreg2`\n\n**Tip**: Always install in a virtual environment!"
        },
        {
            keywords: ['first script', 'hello world', 'getting started', 'beginner'],
            question: "How do I write my first script?",
            answer: "**Python**:\n```python\nprint(\"Hello, economics!\")\nimport pandas as pd\ndf = pd.read_csv(\"data.csv\")\nprint(df.head())\n```\n\n**Stata**:\n```stata\ndisplay \"Hello, economics!\"\nimport delimited \"data.csv\", clear\nlist in 1/5\n```\n\n**R**:\n```r\nprint(\"Hello, economics!\")\nlibrary(tidyverse)\ndf <- read_csv(\"data.csv\")\nhead(df)\n```\n\nSee **Module 1** for complete examples."
        },

        // ============ MODULE 2: DATA HARNESSING ============
        {
            keywords: ['load csv', 'read csv', 'import csv', 'open csv'],
            question: "How do I load a CSV file?",
            answer: "**Python**:\n`import pandas as pd`\n`df = pd.read_csv(\"data.csv\")`\n\n**Stata**:\n`import delimited \"data.csv\", clear`\n\n**R**:\n`library(readr)`\n`df <- read_csv(\"data.csv\")`\n\n**Common options**:\n- Skip rows: `skiprows=1` (Python)\n- Encoding: `encoding=\"utf-8\"`\n- Missing values: `na_values=[\".\", \"NA\"]`\n\nSee **Module 2a** for more formats."
        },
        {
            keywords: ['load excel', 'read excel', 'xlsx', 'xls'],
            question: "How do I load an Excel file?",
            answer: "**Python**:\n`df = pd.read_excel(\"data.xlsx\", sheet_name=\"Sheet1\")`\n\n**Stata**:\n`import excel \"data.xlsx\", sheet(\"Sheet1\") firstrow clear`\n\n**R**:\n`library(readxl)`\n`df <- read_excel(\"data.xlsx\", sheet = \"Sheet1\")`\n\n**Tip**: For large files, convert to CSV first - it's faster.\n\nSee **Module 2a**."
        },
        {
            keywords: ['load stata', 'read dta', '.dta', 'stata file'],
            question: "How do I load a Stata .dta file?",
            answer: "**Python**:\n`df = pd.read_stata(\"data.dta\")`\n\n**Stata**:\n`use \"data.dta\", clear`\n\n**R**:\n`library(haven)`\n`df <- read_dta(\"data.dta\")`\n\n**Note**: Stata files preserve variable labels. In Python, access with `df.attrs` or use `pyreadstat`.\n\nSee **Module 2a**."
        },
        {
            keywords: ['merge', 'join', 'combine datasets', 'merge datasets', 'left join', 'inner join'],
            question: "How do I merge two datasets?",
            answer: "**Python**:\n`merged = pd.merge(df1, df2, on=\"id\", how=\"left\")`\n\n**Stata**:\n`merge 1:1 id using \"df2.dta\"`\n`merge m:1 id using \"df2.dta\"`\n\n**R**:\n`merged <- left_join(df1, df2, by = \"id\")`\n\n**Join types**:\n- `inner`: Only matching rows\n- `left`: All from left + matches\n- `outer`: All rows from both\n\nSee **Module 2a** for diagrams."
        },
        {
            keywords: ['reshape', 'wide to long', 'long to wide', 'pivot', 'melt'],
            question: "How do I reshape data (wide to long)?",
            answer: "**Python (wide→long)**:\n`df_long = pd.melt(df, id_vars=[\"id\"], var_name=\"year\", value_name=\"gdp\")`\n\n**Python (long→wide)**:\n`df_wide = df.pivot(index=\"id\", columns=\"year\", values=\"gdp\")`\n\n**Stata**:\n`reshape long gdp, i(id) j(year)`\n`reshape wide gdp, i(id) j(year)`\n\n**R**:\n`pivot_longer(df, cols = -id)`\n`pivot_wider(df, names_from = year, values_from = gdp)`\n\nSee **Module 2a**."
        },
        {
            keywords: ['api', 'world bank', 'fred', 'census', 'fetch data'],
            question: "How do I get data from an API?",
            answer: "**World Bank (Python)**:\n`import wbdata`\n`data = wbdata.get_dataframe({\"NY.GDP.PCAP.CD\": \"gdp_pc\"})`\n\n**FRED (Python)**:\n`from fredapi import Fred`\n`fred = Fred(api_key=\"YOUR_KEY\")`\n`data = fred.get_series(\"GDP\")`\n\n**General API (Python)**:\n`import requests`\n`response = requests.get(url)`\n`data = response.json()`\n\nSee **Module 2b** for authentication and examples."
        },
        {
            keywords: ['scrape', 'scraping', 'web scraping', 'beautifulsoup', 'rvest'],
            question: "How do I scrape data from a website?",
            answer: "**Before scraping, check:**\n1. Is there an API? (Use that instead)\n2. robots.txt - is scraping allowed?\n3. Terms of Service\n4. Copyright on the data\n\n**Python (BeautifulSoup)**:\n```python\nfrom bs4 import BeautifulSoup\nimport requests\nhtml = requests.get(url).text\nsoup = BeautifulSoup(html, \"html.parser\")\ndata = soup.select(\"table tr\")\n```\n\n**R (rvest)**:\n```r\nlibrary(rvest)\npage <- read_html(url)\ndata <- page %>% html_table()\n```\n\nSee **Module 2c** for legal considerations and examples."
        },
        {
            keywords: ['robots.txt', 'legal scraping', 'is scraping legal', 'terms of service'],
            question: "Is web scraping legal?",
            answer: "**It depends.** Check these before scraping:\n\n1. **robots.txt**: Visit `site.com/robots.txt` - if it says `Disallow: /`, don't scrape\n\n2. **Terms of Service**: Many sites prohibit scraping\n\n3. **Copyright**: The data itself may be protected\n\n4. **Rate limiting**: Don't overload servers (add delays)\n\n**Safe options**:\n- Use official APIs when available\n- Scrape only public, factual data\n- Respect rate limits\n- Don't scrape behind logins\n\nSee **Module 2c** for the complete legal framework."
        },

        // ============ MODULE 3: DATA EXPLORATION ============
        {
            keywords: ['explore data', 'first analysis', 'understand data', 'data exploration', 'eda'],
            question: "How should I explore a new dataset?",
            answer: "Follow this **First Analysis** workflow:\n\n1. **Load**: `df = pd.read_csv(\"data.csv\")`\n2. **Dimensions**: `df.shape` → rows & columns\n3. **Structure**: `df.info()` → types & missing\n4. **Preview**: `df.head()` → first rows\n5. **Summary**: `df.describe()` → statistics\n6. **Missing**: `df.isnull().sum()` → count NAs\n7. **Visualize**: histograms, scatter plots\n\n**Do this BEFORE any analysis!** It catches data issues early.\n\nSee **Module 3** for complete script."
        },
        {
            keywords: ['summary statistics', 'describe', 'mean', 'median', 'std'],
            question: "How do I get summary statistics?",
            answer: "**Python**:\n`df.describe()` → mean, std, min, max, quartiles\n`df[\"var\"].mean()` → single stat\n\n**Stata**:\n`summarize` → all variables\n`summarize var, detail` → with percentiles\n\n**R**:\n`summary(df)` → all variables\n`mean(df$var, na.rm=TRUE)` → single stat\n\n**Tip**: Always check for outliers that skew the mean!\n\nSee **Module 3**."
        },
        {
            keywords: ['check missing', 'missing values', 'count na', 'null values', 'how many missing'],
            question: "How do I check for missing values?",
            answer: "**Python**:\n`df.isnull().sum()` → count per column\n`df.isnull().sum() / len(df) * 100` → percentage\n\n**Stata**:\n`misstable summarize` → missing patterns\n`count if missing(var)` → single variable\n\n**R**:\n`colSums(is.na(df))` → count per column\n`summary(df)` → shows NA's\n\n**Important**: Understand WHY data is missing before handling it!\n\nSee **Modules 3 & 4**."
        },

        // ============ MODULE 4: DATA CLEANING ============
        {
            keywords: ['handle missing', 'impute', 'fill na', 'drop missing', 'missing data'],
            question: "How do I handle missing values?",
            answer: "**Options:**\n\n1. **Drop rows**: `df.dropna()` - loses data\n2. **Drop columns**: `df.drop(columns=[\"col\"])` - if mostly missing\n3. **Fill with value**: `df.fillna(0)` or `df.fillna(df.mean())`\n4. **Forward fill**: `df.fillna(method=\"ffill\")` - time series\n5. **Imputation**: Multiple imputation for sophisticated handling\n\n**Key question**: Is data MCAR, MAR, or MNAR? This affects your strategy.\n\nSee **Module 4**."
        },
        {
            keywords: ['outlier', 'outliers', 'detect outlier', 'remove outlier', 'extreme values'],
            question: "How do I handle outliers?",
            answer: "**Detection:**\n- **IQR method**: Outside Q1-1.5*IQR to Q3+1.5*IQR\n- **Z-score**: |z| > 3 (more than 3 std from mean)\n- **Visual**: Box plots, histograms\n\n**Python (IQR)**:\n```python\nQ1, Q3 = df[\"var\"].quantile([0.25, 0.75])\nIQR = Q3 - Q1\noutliers = (df[\"var\"] < Q1-1.5*IQR) | (df[\"var\"] > Q3+1.5*IQR)\n```\n\n**Before removing**: Investigate! Outliers might be real data or errors.\n\nSee **Module 4**."
        },
        {
            keywords: ['clean string', 'string manipulation', 'text cleaning', 'strip', 'lowercase'],
            question: "How do I clean string variables?",
            answer: "**Python**:\n```python\ndf[\"name\"] = df[\"name\"].str.lower()  # lowercase\ndf[\"name\"] = df[\"name\"].str.strip()  # remove whitespace\ndf[\"name\"] = df[\"name\"].str.replace(\"old\", \"new\")\n```\n\n**Stata**:\n```stata\ngen name_clean = lower(name)\ngen name_clean = strtrim(name)\ngen name_clean = subinstr(name, \"old\", \"new\", .)\n```\n\n**R**:\n```r\ndf$name <- tolower(df$name)\ndf$name <- str_trim(df$name)\ndf$name <- str_replace_all(df$name, \"old\", \"new\")\n```\n\nSee **Module 4**."
        },
        {
            keywords: ['parse date', 'date format', 'datetime', 'convert to date'],
            question: "How do I work with dates?",
            answer: "**Python**:\n```python\ndf[\"date\"] = pd.to_datetime(df[\"date\"], format=\"%Y-%m-%d\")\ndf[\"year\"] = df[\"date\"].dt.year\ndf[\"month\"] = df[\"date\"].dt.month\n```\n\n**Stata**:\n```stata\ngen date2 = date(datestr, \"YMD\")\nformat date2 %td\ngen year = year(date2)\n```\n\n**R**:\n```r\nlibrary(lubridate)\ndf$date <- ymd(df$date)\ndf$year <- year(df$date)\n```\n\nSee **Module 4**."
        },

        // ============ MODULE 5: DATA ANALYSIS ============
        {
            keywords: ['histogram', 'distribution', 'plot histogram'],
            question: "How do I create a histogram?",
            answer: "**Python**:\n```python\nimport matplotlib.pyplot as plt\nplt.hist(df[\"var\"], bins=30, edgecolor=\"black\")\nplt.xlabel(\"Variable\")\nplt.ylabel(\"Frequency\")\nplt.show()\n```\n\n**Stata**:\n`histogram var, frequency`\n\n**R**:\n```r\nggplot(df, aes(x = var)) +\n  geom_histogram(bins = 30, fill = \"steelblue\") +\n  labs(x = \"Variable\", y = \"Frequency\")\n```\n\nSee **Module 5**."
        },
        {
            keywords: ['scatter plot', 'scatterplot', 'correlation plot', 'x vs y'],
            question: "How do I create a scatter plot?",
            answer: "**Python**:\n```python\nplt.scatter(df[\"x\"], df[\"y\"], alpha=0.5)\nplt.xlabel(\"X variable\")\nplt.ylabel(\"Y variable\")\nplt.show()\n```\n\n**Stata**:\n`scatter y x`\n\n**R**:\n```r\nggplot(df, aes(x = x, y = y)) +\n  geom_point(alpha = 0.5) +\n  geom_smooth(method = \"lm\")\n```\n\nSee **Module 5**."
        },
        {
            keywords: ['correlation', 'corr', 'correlation matrix'],
            question: "How do I calculate correlations?",
            answer: "**Python**:\n```python\ndf[[\"var1\", \"var2\", \"var3\"]].corr()\n# Heatmap:\nimport seaborn as sns\nsns.heatmap(df.corr(), annot=True)\n```\n\n**Stata**:\n`correlate var1 var2 var3`\n`pwcorr var1 var2, sig` (with p-values)\n\n**R**:\n```r\ncor(df[, c(\"var1\", \"var2\", \"var3\")], use=\"complete.obs\")\n```\n\nSee **Module 5**."
        },
        {
            keywords: ['t-test', 'ttest', 'hypothesis test', 'difference in means'],
            question: "How do I run a t-test?",
            answer: "**Python**:\n```python\nfrom scipy import stats\ngroup1 = df[df[\"treated\"]==1][\"outcome\"]\ngroup2 = df[df[\"treated\"]==0][\"outcome\"]\nt_stat, p_value = stats.ttest_ind(group1, group2)\n```\n\n**Stata**:\n`ttest outcome, by(treated)`\n\n**R**:\n`t.test(outcome ~ treated, data = df)`\n\n**Remember**: t-test assumes normal distributions. For non-normal data, consider Mann-Whitney U test.\n\nSee **Module 5**."
        },

        // ============ MODULE 6: CAUSAL INFERENCE ============
        {
            keywords: ['causal inference', 'causality', 'causal effect', 'identify'],
            question: "What is causal inference?",
            answer: "**Causal inference** estimates the effect of a treatment/policy on an outcome, not just correlation.\n\n**Key challenge**: We can't observe the same unit both treated AND untreated (fundamental problem of causal inference).\n\n**Methods to address this**:\n- **RCT**: Random assignment (gold standard)\n- **DiD**: Compare treatment vs control over time\n- **IV**: Use exogenous variation\n- **RDD**: Exploit cutoffs in treatment\n\n**Critical**: Always state your identification assumption!\n\nSee **Module 6**."
        },
        {
            keywords: ['did', 'difference in difference', 'difference-in-difference', 'diff in diff', 'parallel trends'],
            question: "What is Difference-in-Differences (DiD)?",
            answer: "**DiD** compares changes over time between treatment and control groups.\n\n**Formula**: (Treat_after - Treat_before) - (Control_after - Control_before)\n\n**Key assumption**: **Parallel trends** - absent treatment, both groups would have followed the same trend.\n\n**Python/Stata**:\n```stata\nreg outcome i.treated##i.post, robust\n```\nThe coefficient on `treated#post` is the DiD estimate.\n\n**Always**: Plot pre-trends to check parallel trends assumption!\n\nSee **Module 6**."
        },
        {
            keywords: ['iv', 'instrumental variable', 'instrument', '2sls', 'two stage'],
            question: "What is Instrumental Variables (IV)?",
            answer: "**IV** uses an exogenous variable (instrument) to isolate causal variation when treatment is endogenous.\n\n**Requirements for valid instrument Z**:\n1. **Relevance**: Z affects treatment (first stage)\n2. **Exclusion**: Z affects outcome ONLY through treatment\n3. **Independence**: Z is as-good-as-random\n\n**Stata**:\n`ivregress 2sls outcome (treatment = instrument), robust`\n\n**Python**:\n```python\nfrom linearmodels.iv import IV2SLS\nmodel = IV2SLS.from_formula(\"outcome ~ 1 + [treatment ~ instrument]\", df)\n```\n\n**Always**: Test first-stage F > 10 (weak instruments test)\n\nSee **Module 6**."
        },
        {
            keywords: ['rdd', 'regression discontinuity', 'discontinuity', 'cutoff', 'threshold'],
            question: "What is Regression Discontinuity (RDD)?",
            answer: "**RDD** exploits a cutoff in a running variable that determines treatment.\n\n**Example**: Students scoring ≥60 get a scholarship. Compare outcomes just above/below 60.\n\n**Key assumption**: Units just above/below cutoff are similar (no manipulation).\n\n**Types**:\n- **Sharp RDD**: Treatment = 1 if score ≥ cutoff\n- **Fuzzy RDD**: Treatment more likely above cutoff (use IV)\n\n**Implementation**:\n```stata\nrdrobust outcome score, c(60)\n```\n\n**Always**: Plot the discontinuity! Visual evidence is compelling.\n\nSee **Module 6**."
        },

        // ============ MODULE 7: ESTIMATION ============
        {
            keywords: ['ols', 'regression', 'linear regression', 'regress'],
            question: "How do I run OLS regression?",
            answer: "**Python**:\n```python\nimport statsmodels.api as sm\nX = sm.add_constant(df[[\"x1\", \"x2\"]])\nmodel = sm.OLS(df[\"y\"], X).fit()\nprint(model.summary())\n```\n\n**Stata**:\n`reg y x1 x2, robust`\n\n**R**:\n```r\nmodel <- lm(y ~ x1 + x2, data = df)\nsummary(model)\n```\n\n**Always use robust standard errors** unless you have a good reason not to!\n\nSee **Module 7**."
        },
        {
            keywords: ['fixed effect', 'fe', 'panel data', 'within estimator', 'entity fixed effect'],
            question: "How do I estimate fixed effects models?",
            answer: "**Fixed effects** control for time-invariant unobserved heterogeneity.\n\n**Stata**:\n```stata\nxtset id year\nxtreg outcome treatment, fe robust\n```\n\n**Python**:\n```python\nfrom linearmodels.panel import PanelOLS\nmodel = PanelOLS.from_formula(\"outcome ~ treatment + EntityEffects\", df.set_index([\"id\",\"year\"]))\n```\n\n**R**:\n```r\nlibrary(plm)\nmodel <- plm(outcome ~ treatment, data=df, index=c(\"id\",\"year\"), model=\"within\")\n```\n\nSee **Module 7**."
        },
        {
            keywords: ['cluster', 'clustered standard error', 'cluster robust', 'clustering'],
            question: "When should I cluster standard errors?",
            answer: "**Cluster when**:\n- Observations within groups are correlated\n- Treatment varies at group level\n\n**Rule**: Cluster at the level of treatment assignment.\n\n**Stata**:\n`reg y x, cluster(state)`\n\n**Python**:\n```python\nmodel.fit(cov_type=\"clustered\", cluster_entity=True)\n```\n\n**R**:\n```r\nlibrary(sandwich)\ncoeftest(model, vcov = vcovCL(model, cluster = df$state))\n```\n\n**Caution**: Need sufficient clusters (≥50) for valid inference.\n\nSee **Module 7**."
        },

        // ============ MODULE 8: REPLICABILITY ============
        {
            keywords: ['replicability', 'reproducibility', 'replicate', 'replication package'],
            question: "How do I make my research replicable?",
            answer: "**Replicability checklist**:\n\n1. **Folder structure**:\n   - `/data/raw/` - original data (never modify)\n   - `/data/processed/` - cleaned data\n   - `/code/` - all scripts\n   - `/output/` - figures, tables\n\n2. **Master script**: One script that runs everything in order\n\n3. **Documentation**: README explaining each file\n\n4. **Version control**: Use Git\n\n5. **Dependencies**: List all packages with versions\n\nSee **Module 8** for complete template."
        },
        {
            keywords: ['folder structure', 'project organization', 'organize project', 'directory structure'],
            question: "How should I organize my project folders?",
            answer: "**Recommended structure**:\n```\nproject/\n├── data/\n│   ├── raw/          # Original data (READ ONLY)\n│   └── processed/    # Cleaned data\n├── code/\n│   ├── 01_clean.py\n│   ├── 02_analysis.py\n│   └── 03_figures.py\n├── output/\n│   ├── figures/\n│   └── tables/\n├── docs/\n├── README.md\n└── requirements.txt\n```\n\n**Key principles**:\n- Number scripts in execution order\n- Never modify raw data\n- Separate code from output\n\nSee **Module 8**."
        },

        // ============ MODULE 9: GIT & GITHUB ============
        {
            keywords: ['git', 'version control', 'git basics', 'what is git'],
            question: "What is Git and why should I use it?",
            answer: "**Git** tracks changes to your code over time:\n\n**Benefits**:\n- **History**: See what changed and when\n- **Undo**: Revert to previous versions\n- **Collaboration**: Work with others without conflicts\n- **Backup**: Code stored on GitHub\n\n**Basic workflow**:\n```bash\ngit add .              # Stage changes\ngit commit -m \"msg\"    # Save snapshot\ngit push               # Upload to GitHub\n```\n\n**Every researcher should use Git!**\n\nSee **Module 9**."
        },
        {
            keywords: ['git commit', 'commit', 'save changes', 'commit message'],
            question: "How do I commit changes in Git?",
            answer: "**Steps**:\n```bash\ngit status            # See what changed\ngit add filename.py   # Stage specific file\ngit add .             # Stage all changes\ngit commit -m \"Add regression analysis\"\n```\n\n**Good commit messages**:\n- \"Add DiD estimation for policy effect\"\n- \"Fix missing value handling in clean.py\"\n- \"Update Figure 2 with 2023 data\"\n\n**Bad messages**: \"update\", \"fix\", \"stuff\"\n\nSee **Module 9**."
        },
        {
            keywords: ['git push', 'push', 'github', 'upload code'],
            question: "How do I push code to GitHub?",
            answer: "**First time setup**:\n```bash\ngit remote add origin https://github.com/user/repo.git\ngit push -u origin main\n```\n\n**After that**:\n```bash\ngit push\n```\n\n**If you get errors**:\n```bash\ngit pull --rebase    # Get others' changes first\ngit push\n```\n\n**Tip**: Commit often, push regularly!\n\nSee **Module 9**."
        },
        {
            keywords: ['branch', 'git branch', 'branching', 'feature branch'],
            question: "How do Git branches work?",
            answer: "**Branches** let you experiment without affecting main code:\n\n```bash\ngit checkout -b new-feature  # Create & switch\n# ... make changes ...\ngit add .\ngit commit -m \"Add feature\"\ngit checkout main            # Switch back\ngit merge new-feature        # Merge changes\n```\n\n**Use branches for**:\n- New features\n- Experiments\n- Bug fixes\n\n**Keep main branch stable!**\n\nSee **Module 9**."
        },

        // ============ MODULE 10: NLP HISTORY ============
        {
            keywords: ['nlp', 'natural language', 'text analysis', 'text data'],
            question: "How do I analyze text data?",
            answer: "**Text analysis pipeline**:\n\n1. **Preprocessing**:\n   - Tokenization (split into words)\n   - Lowercasing\n   - Remove punctuation/stopwords\n   - Stemming/lemmatization\n\n2. **Representation**:\n   - Bag of words\n   - TF-IDF\n   - Word embeddings (Word2Vec, etc.)\n\n3. **Analysis**:\n   - Sentiment analysis\n   - Topic modeling\n   - Classification\n\nSee **Module 10** for implementations."
        },
        {
            keywords: ['tokenize', 'tokenization', 'split text', 'words'],
            question: "What is tokenization?",
            answer: "**Tokenization** splits text into individual units (usually words).\n\n**Python**:\n```python\n# Simple:\nwords = text.split()\n\n# Better (handles punctuation):\nimport nltk\nwords = nltk.word_tokenize(text)\n\n# Even better:\nfrom spacy import load\nnlp = load(\"en_core_web_sm\")\ndoc = nlp(text)\nwords = [token.text for token in doc]\n```\n\nSee **Module 10**."
        },
        {
            keywords: ['tfidf', 'tf-idf', 'term frequency', 'bag of words', 'bow'],
            question: "What is TF-IDF?",
            answer: "**TF-IDF** = Term Frequency × Inverse Document Frequency\n\n- **TF**: How often a word appears in a document\n- **IDF**: How rare the word is across all documents\n\n**Intuition**: Words that appear often in one document but rarely in others are important.\n\n**Python**:\n```python\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nvectorizer = TfidfVectorizer()\nX = vectorizer.fit_transform(documents)\n```\n\nSee **Module 10**."
        },

        // ============ MODULE 11: MACHINE LEARNING ============
        {
            keywords: ['machine learning', 'ml', 'prediction', 'supervised learning'],
            question: "What is machine learning?",
            answer: "**Machine learning** finds patterns in data to make predictions.\n\n**Types**:\n- **Supervised**: Learn from labeled data (regression, classification)\n- **Unsupervised**: Find structure (clustering, PCA)\n\n**Key for economists**: ML is for PREDICTION, not causal inference!\n\n**Workflow**:\n1. Split data (train/test)\n2. Train model on training data\n3. Evaluate on test data\n4. Never evaluate on training data!\n\nSee **Module 11**."
        },
        {
            keywords: ['train test', 'train test split', 'holdout', 'validation'],
            question: "Why split data into train and test?",
            answer: "**Problem**: Models can memorize training data (overfitting).\n\n**Solution**: Test on unseen data.\n\n**Python**:\n```python\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n```\n\n**Typical split**: 80% train, 20% test\n\n**Even better**: Cross-validation (multiple splits)\n\nSee **Module 11**."
        },
        {
            keywords: ['cross-validation', 'cv', 'k-fold', 'kfold'],
            question: "What is cross-validation?",
            answer: "**Cross-validation** tests model on multiple train/test splits:\n\n**K-fold CV**:\n1. Split data into K parts\n2. Train on K-1 parts, test on 1\n3. Repeat K times (different test part each time)\n4. Average the results\n\n**Python**:\n```python\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5)\nprint(f\"Mean accuracy: {scores.mean():.3f}\")\n```\n\nSee **Module 11**."
        },
        {
            keywords: ['lasso', 'ridge', 'regularization', 'l1', 'l2', 'elastic net'],
            question: "What is regularization (LASSO/Ridge)?",
            answer: "**Regularization** prevents overfitting by penalizing large coefficients.\n\n**Ridge (L2)**: Shrinks coefficients toward zero\n**LASSO (L1)**: Can set coefficients exactly to zero (feature selection)\n**Elastic Net**: Combines both\n\n**Python**:\n```python\nfrom sklearn.linear_model import Lasso, Ridge\nmodel = Lasso(alpha=0.1)  # alpha controls penalty\nmodel.fit(X_train, y_train)\n```\n\n**Use when**: Many features, potential overfitting\n\nSee **Module 11**."
        },
        {
            keywords: ['random forest', 'decision tree', 'tree', 'ensemble'],
            question: "What are tree-based methods?",
            answer: "**Decision trees** make predictions by splitting data on features.\n\n**Random Forest**: Average many trees (reduces overfitting)\n**Gradient Boosting**: Build trees sequentially (XGBoost, LightGBM)\n\n**Python**:\n```python\nfrom sklearn.ensemble import RandomForestRegressor\nmodel = RandomForestRegressor(n_estimators=100)\nmodel.fit(X_train, y_train)\n```\n\n**Pros**: Handle non-linear relationships, feature importance\n**Cons**: Less interpretable than OLS\n\nSee **Module 11**."
        },

        // ============ MODULE 12: LLMs ============
        {
            keywords: ['llm', 'large language model', 'gpt', 'chatgpt', 'claude', 'transformer'],
            question: "What are Large Language Models?",
            answer: "**LLMs** (GPT, Claude, Gemini) are neural networks trained on massive text data.\n\n**Uses in research**:\n- Text classification\n- Summarization\n- Data extraction from documents\n- Code generation\n\n**Key concepts**:\n- **Prompt engineering**: How you ask affects the answer\n- **Temperature**: Higher = more creative\n- **Tokens**: Units of text (words/subwords)\n\nSee **Module 12**."
        },
        {
            keywords: ['prompt', 'prompt engineering', 'how to prompt', 'write prompt'],
            question: "How do I write good prompts for LLMs?",
            answer: "**Prompt engineering tips**:\n\n1. **Be specific**: \"Summarize this paper's methodology\" > \"Summarize\"\n\n2. **Provide context**: \"You are an economics research assistant...\"\n\n3. **Give examples**: Show the format you want\n\n4. **Break down tasks**: Complex task → multiple simple prompts\n\n5. **Iterate**: Refine based on outputs\n\n**Example**:\n```\nExtract the following from this abstract:\n- Research question\n- Method used\n- Main finding\n\nAbstract: [paste text]\n```\n\nSee **Module 12**."
        },
        {
            keywords: ['openai api', 'api llm', 'use gpt', 'call api'],
            question: "How do I use LLM APIs?",
            answer: "**OpenAI (Python)**:\n```python\nfrom openai import OpenAI\nclient = OpenAI(api_key=\"your-key\")\n\nresponse = client.chat.completions.create(\n    model=\"gpt-4o-mini\",\n    messages=[{\"role\": \"user\", \"content\": \"Your prompt\"}]\n)\nprint(response.choices[0].message.content)\n```\n\n**Anthropic (Claude)**:\n```python\nfrom anthropic import Anthropic\nclient = Anthropic(api_key=\"your-key\")\n\nresponse = client.messages.create(\n    model=\"claude-3-haiku-20240307\",\n    messages=[{\"role\": \"user\", \"content\": \"Your prompt\"}]\n)\n```\n\nSee **Module 12**."
        },

        // ============ ERROR MESSAGES ============
        {
            keywords: ['error', 'bug', 'not working', 'failed', 'exception'],
            question: "I'm getting an error!",
            answer: "**Debugging steps**:\n\n1. **Read the error message** - it usually tells you what's wrong\n2. **Check the line number** - that's where to look\n3. **Common issues**:\n   - `FileNotFoundError`: Check file path\n   - `KeyError`: Column name doesn't exist\n   - `TypeError`: Wrong data type\n   - `NameError`: Variable not defined\n\n4. **Google the error** - someone else had it too!\n\n**Tip**: Copy the exact error message and search for it."
        },
        {
            keywords: ['file not found', 'filenotfounderror', 'no such file', 'path'],
            question: "I'm getting 'File not found' error",
            answer: "**Common causes**:\n\n1. **Wrong path**: Use absolute path or check relative path\n   ```python\n   # Check current directory:\n   import os\n   print(os.getcwd())\n   ```\n\n2. **Typo in filename**: Check spelling, extension\n\n3. **Backslashes on Windows**: Use raw strings\n   ```python\n   pd.read_csv(r\"C:\\Users\\data.csv\")\n   # or forward slashes:\n   pd.read_csv(\"C:/Users/data.csv\")\n   ```\n\n4. **File doesn't exist**: Check if it's really there!"
        },
        {
            keywords: ['keyerror', 'column not found', 'no column', 'key error'],
            question: "I'm getting 'KeyError' for a column",
            answer: "**The column name doesn't exist.** Common causes:\n\n1. **Typo**: Check spelling exactly\n   ```python\n   print(df.columns.tolist())  # See all columns\n   ```\n\n2. **Extra spaces**: Column might be `\" name\"` not `\"name\"`\n   ```python\n   df.columns = df.columns.str.strip()\n   ```\n\n3. **Case sensitivity**: `\"Name\"` ≠ `\"name\"`\n\n4. **After merge**: Column might have suffix like `\"var_x\"`"
        }
    ];

    // ===========================================
    // MATCHING ALGORITHM
    // ===========================================

    function findBestMatch(userMessage) {
        const lower = userMessage.toLowerCase();
        const words = lower.split(/\s+/);

        let bestMatch = null;
        let bestScore = 0;

        for (const entry of KNOWLEDGE_BASE) {
            let score = 0;

            // Check each keyword
            for (const keyword of entry.keywords) {
                if (lower.includes(keyword)) {
                    // Exact phrase match scores higher
                    score += keyword.split(' ').length * 2;
                }
            }

            // Bonus for question word match
            if (entry.question && lower.includes(entry.question.toLowerCase().split(' ')[0])) {
                score += 1;
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        // Require minimum score for a match
        if (bestScore >= 2) {
            return { found: true, answer: bestMatch.answer };
        }

        // No good match found
        return { found: false, answer: null };
    }

    // ===========================================
    // API FALLBACK (Gemini via Cloudflare Worker)
    // ===========================================

    async function askGemini(message) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.reply || "Sorry, I couldn't get a response. Please try again.";
        } catch (error) {
            console.error('Chatbot API error:', error);
            return "I'm having trouble connecting right now. Here's what I can help with:\n\n- **Course navigation**: \"Where do I find X?\"\n- **Programming**: Python, Stata, R code questions\n- **Methods**: DiD, IV, RDD, regression\n- **Data**: Loading, cleaning, merging\n- **Tools**: Git, APIs, scraping\n\nTry rephrasing your question!";
        }
    }

    // ===========================================
    // UI & LOGGING
    // ===========================================

    const CONFIG = {
        storageKey: 'protools_er1_chat_logs',
        maxLogEntries: 500
    };

    function logChat(entry) {
        try {
            const logs = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
            entry.timestamp = new Date().toISOString();
            entry.page = document.title;
            logs.push(entry);
            if (logs.length > CONFIG.maxLogEntries) {
                logs.splice(0, logs.length - CONFIG.maxLogEntries);
            }
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(logs));
        } catch (e) { }
    }

    window.exportChatLogs = function() {
        const logs = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'protools_chat_logs.json';
        a.click();
    };

    function addMessage(text, isUser = false) {
        const container = document.getElementById('chatbot-messages');
        if (!container) return;

        const div = document.createElement('div');
        div.className = 'chat-message ' + (isUser ? 'user' : 'assistant');

        const p = document.createElement('p');
        // Format text
        text = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/\n/g, '<br>');
        p.innerHTML = text;
        div.appendChild(p);

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    async function sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        input.value = '';
        addMessage(message, true);
        logChat({ type: 'user', message });

        // First, check knowledge base
        const kbResult = findBestMatch(message);

        if (kbResult.found) {
            // Knowledge base has a good answer
            setTimeout(() => {
                addMessage(kbResult.answer, false);
                logChat({ type: 'assistant', message: kbResult.answer, userQuery: message, source: 'knowledge_base' });
            }, 300);
        } else if (USE_API_FALLBACK) {
            // No KB match - use Gemini API
            addMessage("Thinking...", false);
            const response = await askGemini(message);
            // Remove "Thinking..." message
            const container = document.getElementById('chatbot-messages');
            if (container && container.lastChild) {
                container.removeChild(container.lastChild);
            }
            addMessage(response, false);
            logChat({ type: 'assistant', message: response, userQuery: message, source: 'gemini_api' });
        } else {
            // No API fallback - show default message
            const defaultMsg = "I'm not sure about that specific question. Here's what I can help with:\n\n- **Course navigation**: \"Where do I find X?\"\n- **Programming**: Python, Stata, R code questions\n- **Methods**: DiD, IV, RDD, regression\n- **Data**: Loading, cleaning, merging\n- **Tools**: Git, APIs, scraping\n\nTry rephrasing your question!";
            setTimeout(() => {
                addMessage(defaultMsg, false);
                logChat({ type: 'assistant', message: defaultMsg, userQuery: message, source: 'fallback' });
            }, 300);
        }
    }

    // ===========================================
    // CHATBOT ANIMATIONS & SPEECH BUBBLES
    // ===========================================

    const SPEECH_BUBBLES = [
        "Need help? I'm here!",
        "Ask me anything!",
        "Want me to explain something?",
        "Got questions?",
        "Stuck on code? Ask me!",
        "I can help with that!",
        "Let's figure this out!",
        "Need a code example?",
        "Confused? Just ask!",
        "Python? Stata? R? I got you!"
    ];

    const ANIMATIONS = [
        'chatbot-bounce',
        'chatbot-wiggle',
        'chatbot-pulse',
        'chatbot-wave',
        'chatbot-hop-left-right',
        'chatbot-color-shift'
    ];

    let speechBubbleTimeout = null;
    let animationTimeout = null;
    let isPanelOpen = false;

    function showSpeechBubble(toggle) {
        if (isPanelOpen) return;

        // Remove existing bubble if any
        const existingBubble = document.querySelector('.chatbot-speech-bubble');
        if (existingBubble) existingBubble.remove();

        // Create speech bubble
        const bubble = document.createElement('div');
        bubble.className = 'chatbot-speech-bubble';
        bubble.textContent = SPEECH_BUBBLES[Math.floor(Math.random() * SPEECH_BUBBLES.length)];
        toggle.parentElement.appendChild(bubble);

        // Animate in
        requestAnimationFrame(() => {
            bubble.classList.add('visible');
        });

        // Remove after 5 seconds (longer display time)
        setTimeout(() => {
            bubble.classList.remove('visible');
            setTimeout(() => bubble.remove(), 300);
        }, 5000);
    }

    function triggerAnimation(toggle) {
        if (isPanelOpen) return;

        // Remove any existing animation classes
        ANIMATIONS.forEach(anim => toggle.classList.remove(anim));

        // Add random animation
        const animation = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
        toggle.classList.add(animation);

        // Remove after animation completes (longer for hop and color animations)
        const duration = (animation === 'chatbot-hop-left-right' || animation === 'chatbot-color-shift') ? 1800 : 1000;
        setTimeout(() => {
            toggle.classList.remove(animation);
        }, duration);
    }

    function scheduleNextAnimation(toggle) {
        if (isPanelOpen) return;

        // Random interval between 4-8 seconds for animation (more frequent)
        const animDelay = 4000 + Math.random() * 4000;
        animationTimeout = setTimeout(() => {
            triggerAnimation(toggle);
            scheduleNextAnimation(toggle);
        }, animDelay);
    }

    function scheduleNextSpeechBubble(toggle) {
        if (isPanelOpen) return;

        // Random interval between 12-25 seconds for speech bubble (more frequent)
        const bubbleDelay = 12000 + Math.random() * 13000;
        speechBubbleTimeout = setTimeout(() => {
            showSpeechBubble(toggle);
            scheduleNextSpeechBubble(toggle);
        }, bubbleDelay);
    }

    function stopAnimations() {
        isPanelOpen = true;
        if (speechBubbleTimeout) clearTimeout(speechBubbleTimeout);
        if (animationTimeout) clearTimeout(animationTimeout);
        const existingBubble = document.querySelector('.chatbot-speech-bubble');
        if (existingBubble) existingBubble.remove();
    }

    function startAnimations(toggle) {
        isPanelOpen = false;
        scheduleNextAnimation(toggle);
        scheduleNextSpeechBubble(toggle);
    }

    function init() {
        const toggle = document.getElementById('chatbot-toggle');
        const panel = document.getElementById('chatbot-panel');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (!toggle || !panel) return;

        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) {
                stopAnimations();
                input?.focus();
            } else {
                startAnimations(toggle);
            }
        });

        closeBtn?.addEventListener('click', () => {
            panel.classList.remove('open');
            startAnimations(toggle);
        });
        sendBtn?.addEventListener('click', sendMessage);
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Add styles for code blocks and animations
        const style = document.createElement('style');
        style.textContent = `
            .chat-message code {
                background: #2d3748;
                color: #fbd38d;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Fira Code', monospace;
                font-size: 0.85em;
            }
            .chat-message pre {
                background: #1a202c;
                border-radius: 6px;
                padding: 0.75rem;
                overflow-x: auto;
                margin: 0.5rem 0;
            }
            .chat-message pre code {
                background: none;
                padding: 0;
                color: #e2e8f0;
            }

            /* Speech Bubble */
            .chatbot-speech-bubble {
                position: absolute;
                bottom: 115px;
                right: 10px;
                background: white;
                color: #1a365d;
                padding: 12px 18px;
                border-radius: 18px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                font-size: 0.95rem;
                font-weight: 600;
                white-space: nowrap;
                opacity: 0;
                transform: translateY(10px) scale(0.9);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
                z-index: 9998;
            }
            .chatbot-speech-bubble::after {
                content: '';
                position: absolute;
                bottom: -8px;
                right: 40px;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid white;
            }
            .chatbot-speech-bubble.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            /* Bounce Animation */
            @keyframes chatbot-bounce-anim {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-12px); }
                50% { transform: translateY(0); }
                75% { transform: translateY(-6px); }
            }
            .chatbot-bounce {
                animation: chatbot-bounce-anim 0.6s ease-in-out;
            }

            /* Wiggle Animation */
            @keyframes chatbot-wiggle-anim {
                0%, 100% { transform: rotate(0deg); }
                20% { transform: rotate(-15deg); }
                40% { transform: rotate(12deg); }
                60% { transform: rotate(-8deg); }
                80% { transform: rotate(5deg); }
            }
            .chatbot-wiggle {
                animation: chatbot-wiggle-anim 0.6s ease-in-out;
            }

            /* Pulse Animation */
            @keyframes chatbot-pulse-anim {
                0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }
                50% { transform: scale(1.1); box-shadow: 0 6px 20px rgba(237, 137, 54, 0.5); }
            }
            .chatbot-pulse {
                animation: chatbot-pulse-anim 0.8s ease-in-out;
            }

            /* Wave Animation */
            @keyframes chatbot-wave-anim {
                0%, 100% { transform: rotate(0deg); }
                10% { transform: rotate(14deg); }
                20% { transform: rotate(-8deg); }
                30% { transform: rotate(14deg); }
                40% { transform: rotate(-4deg); }
                50% { transform: rotate(10deg); }
                60%, 100% { transform: rotate(0deg); }
            }
            .chatbot-wave {
                animation: chatbot-wave-anim 1s ease-in-out;
            }

            /* Hop Left-Right Animation (triple jump) */
            @keyframes chatbot-hop-lr-anim {
                0% { transform: translateX(0) translateY(0); }
                8% { transform: translateX(-15px) translateY(-10px); }
                16% { transform: translateX(-15px) translateY(0); }
                24% { transform: translateX(0) translateY(0); }
                32% { transform: translateX(15px) translateY(-10px); }
                40% { transform: translateX(15px) translateY(0); }
                48% { transform: translateX(0) translateY(0); }
                56% { transform: translateX(-12px) translateY(-8px); }
                64% { transform: translateX(-12px) translateY(0); }
                72% { transform: translateX(0) translateY(0); }
                80% { transform: translateX(12px) translateY(-8px); }
                88% { transform: translateX(12px) translateY(0); }
                100% { transform: translateX(0) translateY(0); }
            }
            .chatbot-hop-left-right {
                animation: chatbot-hop-lr-anim 1.6s ease-in-out;
            }

            /* Color Shift Animation */
            @keyframes chatbot-color-anim {
                0%, 100% { background: var(--color-primary); }
                20% { background: #e53e3e; }
                40% { background: #38a169; }
                60% { background: #805ad5; }
                80% { background: #dd6b20; }
            }
            .chatbot-color-shift {
                animation: chatbot-color-anim 1.5s ease-in-out;
            }
        `;
        document.head.appendChild(style);

        // Start animations after a short delay
        setTimeout(() => {
            startAnimations(toggle);
            // Show initial speech bubble after 5 seconds
            setTimeout(() => {
                if (!isPanelOpen) showSpeechBubble(toggle);
            }, 5000);
        }, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
