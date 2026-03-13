// Practice Exercises - Part 2: Data Cleaning, Data Analysis, Causal Inference
(function() {
  if (!window.PRACTICE_EXERCISES) window.PRACTICE_EXERCISES = {};

  // =========================================================================
  //  TOPIC 1: DATA CLEANING
  // =========================================================================
  window.PRACTICE_EXERCISES.data_cleaning = {

    // -----------------------------------------------------------------------
    //  BEGINNER (8 exercises)
    // -----------------------------------------------------------------------
    beginner: [
      // 1 — read (Python): dropna subset vs blanket
      {
        type: "read",
        title: "Targeted vs Blanket Drop of Missing Values",
        prompt: "How many rows does `result` contain?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'income':    [50000, None, 72000, None, 61000],\n    'education': [12,    16,   None,  14,   18]\n})\nresult = df.dropna(subset=['income'])\nprint(len(result))",
        options: [
          "5 — nothing is dropped",
          "3 — only rows where income is missing are dropped",
          "2 — rows with any missing value are dropped",
          "4 — only one income value is missing"
        ],
        correct: 1,
        explanation: "dropna(subset=['income']) removes only the 2 rows where income is None, leaving 3 rows. The missing value in 'education' (row 3) is kept because it is not in the subset. Using .dropna() without subset would have dropped all 3 rows containing any NaN."
      },
      // 2 — read (Stata): type conversion with destring
      {
        type: "read",
        title: "Type Conversion in Stata",
        prompt: "What does the `destring` command do here?",
        lang: "stata",
        code: "list income in 1/3\n* income: \"45000\" \"62,500\" \".\"\n\ndestring income, replace ignore(\",\")",
        options: [
          "Converts income from numeric to string format",
          "Converts income from string to numeric, removing commas",
          "Removes all non-numeric characters and deletes the variable",
          "Replaces missing string values with zero"
        ],
        correct: 1,
        explanation: "destring converts a string variable to numeric. The ignore(\",\") option tells Stata to strip commas before conversion. The entry \".\" becomes Stata's numeric missing value. This is a common cleaning step when data imported from CSV has formatting characters."
      },
      // 3 — bug (Python): forgetting reassignment with dropna
      {
        type: "bug",
        title: "Why Are Missing Values Still There?",
        prompt: "A student runs this code but finds that `df` still contains missing values. What is the bug?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({'wage': [45000, None, 52000, None]})\ndf.dropna(subset=['wage'])\nprint(df)",
        options: [
          "dropna() does not work on numeric columns",
          "The result of dropna() is not saved — need df = df.dropna(...) or inplace=True",
          "subset should be a string, not a list",
          "None is not recognized as missing — should use np.nan"
        ],
        correct: 1,
        explanation: "In pandas, most methods return a new DataFrame rather than modifying in place. Writing df.dropna(subset=['wage']) without assignment discards the result. The fix is df = df.dropna(subset=['wage']) or df.dropna(subset=['wage'], inplace=True)."
      },
      // 4 — bug (R): string method on wrong type
      {
        type: "bug",
        title: "String Cleaning Fails on Numeric Column",
        prompt: "This R code throws an error. Why?",
        lang: "r",
        code: "library(dplyr)\nlibrary(stringr)\n\ndf <- data.frame(zipcode = c(75001, 75002, 75003))\ndf <- df %>%\n  mutate(zipcode = str_pad(zipcode, width = 5, pad = \"0\"))",
        options: [
          "str_pad does not exist in the stringr package",
          "The pipe operator %>% is not loaded",
          "zipcode is numeric — str_pad works but may give unexpected results if not converted to character first",
          "width = 5 is too small for zip codes"
        ],
        correct: 2,
        explanation: "str_pad will coerce numeric to character implicitly in R, but this can lead to unexpected results with scientific notation for large numbers or trailing decimals. Best practice is to explicitly convert: as.character(zipcode) or format(zipcode) first, then pad. Always be deliberate about type conversion."
      },
      // 5 — reorder (Python): basic cleaning pipeline
      {
        type: "reorder",
        title: "Order a Basic Cleaning Pipeline",
        prompt: "Arrange these lines to: load data, drop missing income, convert education to integer, then save.",
        lang: "python",
        lines: [
          "df.to_csv('cleaned.csv', index=False)",
          "df['education'] = df['education'].astype(int)",
          "df = pd.read_csv('survey.csv')",
          "df = df.dropna(subset=['income'])"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "The correct sequence is: (1) read the data, (2) drop rows missing income, (3) convert education to integer — which requires no NaN in that column, and (4) save the cleaned file. Dropping missing values before type conversion avoids errors since NaN cannot be cast to int."
      },
      // 6 — reorder (Stata): destring and clean
      {
        type: "reorder",
        title: "Order a Stata Cleaning Workflow",
        prompt: "Arrange these Stata commands in the correct order to clean income data.",
        lang: "stata",
        lines: [
          "drop if missing(income)",
          "replace income = round(income, 1)",
          "use \"raw_survey.dta\", clear",
          "destring income, replace ignore(\"$,\")"
        ],
        correctOrder: [2, 3, 0, 1],
        explanation: "First load the data, then convert income from string to numeric (removing $ and commas), then drop observations with missing income, and finally round the values. You must destring before you can use numeric operations like drop-if-missing or round."
      },
      // 7 — fill (Python): fillna with mean
      {
        type: "fill",
        title: "Mean Imputation in Python",
        prompt: "Fill in the gap to replace missing income values with the column mean.",
        lang: "python",
        codeTemplate: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({'income': [50000, np.nan, 72000, np.nan, 61000]})\ndf['income'] = df['income'].fillna(___FILL___)",
        gaps: {
          "FILL": {
            answer: "df['income'].mean()",
            accept: ["df['income'].mean()", "df.income.mean()", "df[\"income\"].mean()"]
          }
        },
        explanation: "fillna(df['income'].mean()) first computes the mean of non-missing values (61000), then fills each NaN with that value. Note that mean imputation reduces the variance of the distribution — the imputed values all equal the mean, compressing the spread."
      },
      // 8 — match: cleaning operations across languages
      {
        type: "match",
        title: "Cleaning Operations Across Languages",
        prompt: "Match each cleaning task with the correct code.",
        pairs: [
          { left: "Drop rows where wage is missing", leftLang: "text", right: "df = df.dropna(subset=['wage'])", rightLang: "python" },
          { left: "Convert string to numeric in Stata", leftLang: "text", right: "destring wage, replace", rightLang: "stata" },
          { left: "Trim whitespace from names in R", leftLang: "text", right: "df$name <- trimws(df$name)", rightLang: "r" },
          { left: "Replace missing with zero in Python", leftLang: "text", right: "df['wage'] = df['wage'].fillna(0)", rightLang: "python" }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    //  INTERMEDIATE (8 exercises)
    // -----------------------------------------------------------------------
    intermediate: [
      // 1 — read (Python): string method chain
      {
        type: "read",
        title: "String Cleaning Chain in Pandas",
        prompt: "What does the name column look like after this chain?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({'name': ['  John  DOE ', ' jane   smith']})\ndf['name'] = (df['name']\n    .str.strip()\n    .str.lower()\n    .str.replace(r'\\s+', ' ', regex=True))\nprint(df['name'].tolist())",
        options: [
          "['John DOE', 'jane smith']",
          "['john doe', 'jane smith']",
          "['john  doe', 'jane   smith']",
          "['  john  doe ', ' jane   smith']"
        ],
        correct: 1,
        explanation: "The chain applies three steps in order: .str.strip() removes leading/trailing spaces, .str.lower() converts to lowercase, and .str.replace(r'\\s+', ' ', regex=True) collapses multiple internal spaces into one. The regex=True flag is essential — without it, the pattern \\s+ is treated as a literal string."
      },
      // 2 — read (R): conditional assignment with case_when
      {
        type: "read",
        title: "Conditional Assignment with case_when",
        prompt: "What value does income_group take when income is 55000?",
        lang: "r",
        code: "library(dplyr)\n\ndf <- df %>% mutate(\n  income_group = case_when(\n    income < 30000            ~ \"low\",\n    income >= 30000 & income < 60000 ~ \"middle\",\n    income >= 60000           ~ \"high\",\n    TRUE                      ~ \"unknown\"\n  )\n)",
        options: [
          "\"low\"",
          "\"middle\"",
          "\"high\"",
          "\"unknown\""
        ],
        correct: 1,
        explanation: "case_when evaluates conditions in order. 55000 is not < 30000 (first condition fails), but it is >= 30000 and < 60000 (second condition matches), so income_group = 'middle'. The TRUE ~ 'unknown' acts as a catch-all for NA or unexpected values."
      },
      // 3 — bug (Python): regex without regex=True
      {
        type: "bug",
        title: "Why Doesn't the Regex Work?",
        prompt: "A student tries to remove all digits from a column but it only removes the literal string '\\d+'. What is the bug?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({'address': ['123 Main St', '456 Oak Ave']})\ndf['address'] = df['address'].str.replace('\\d+', '')\nprint(df['address'].tolist())",
        options: [
          "The regex pattern \\d+ is incorrect for matching digits",
          "str.replace needs regex=True to interpret the pattern as a regex",
          "str.replace cannot be used on string columns",
          "The backslash needs to be doubled: \\\\d+"
        ],
        correct: 1,
        explanation: "Since pandas 1.2+, str.replace() defaults to regex=False for safety. Without regex=True, the pattern '\\d+' is treated as a literal string. The fix is df['address'].str.replace('\\d+', '', regex=True). This is a very common mistake — always pass regex=True when using regex patterns."
      },
      // 4 — bug (Stata): blanket drop vs targeted drop
      {
        type: "bug",
        title: "Too Many Observations Dropped",
        prompt: "A student wants to drop observations where income is missing, but loses far more rows than expected. What is the bug?",
        lang: "stata",
        code: "use survey.dta, clear\n* Want to keep only rows where income is non-missing\ndrop if missing(income, education, age, region)\ncount",
        options: [
          "The missing() function does not exist in Stata",
          "missing() with multiple variables drops rows where ANY variable is missing, not just income",
          "drop if should be replaced with keep if",
          "The count command resets the dataset"
        ],
        correct: 1,
        explanation: "missing(income, education, age, region) returns true if ANY of those variables is missing. To drop only where income is missing, use: drop if missing(income). This parallels the pandas pitfall of .dropna() without subset — both drop too aggressively when you specify multiple columns."
      },
      // 5 — reorder (Python): imputation with indicator
      {
        type: "reorder",
        title: "Imputation with Missing Indicator",
        prompt: "Arrange these lines to create a missing indicator BEFORE imputing income with the median.",
        lang: "python",
        lines: [
          "df['income'] = df['income'].fillna(df['income'].median())",
          "df = pd.read_csv('survey.csv')",
          "df['income_was_missing'] = df['income'].isna().astype(int)",
          "import pandas as pd"
        ],
        correctOrder: [3, 1, 2, 0],
        explanation: "The critical insight is that the missing indicator must be created BEFORE imputation. Once you fill NaN with the median, you can no longer tell which values were originally missing. The indicator variable preserves this information for downstream analysis."
      },
      // 6 — reorder (R): duplicates and winsorization
      {
        type: "reorder",
        title: "Remove Duplicates then Winsorize in R",
        prompt: "Arrange these R commands to deduplicate on firm_id, compute quantile bounds, then clip outliers.",
        lang: "r",
        lines: [
          "df$revenue <- pmin(pmax(df$revenue, q01), q99)",
          "q01 <- quantile(df$revenue, 0.01, na.rm = TRUE)",
          "q99 <- quantile(df$revenue, 0.99, na.rm = TRUE)",
          "df <- df %>% distinct(firm_id, .keep_all = TRUE)"
        ],
        correctOrder: [3, 1, 2, 0],
        explanation: "First deduplicate so that repeated firms do not distort the quantile computation. Then compute the 1st and 99th percentiles. Finally, clip revenue to those bounds using pmin/pmax. Computing quantiles on duplicated data would give biased bounds if some firms appear many times."
      },
      // 7 — fill (Python): loc-based conditional assignment
      {
        type: "fill",
        title: "Conditional Assignment with .loc",
        prompt: "Fill in the gap to set income to NaN for all rows where income is negative.",
        lang: "python",
        codeTemplate: "import numpy as np\nimport pandas as pd\n\ndf = pd.DataFrame({'income': [50000, -999, 72000, -1, 61000]})\n___LOC___ = np.nan",
        gaps: {
          "LOC": {
            answer: "df.loc[df['income'] < 0, 'income']",
            accept: ["df.loc[df['income'] < 0, 'income']", "df.loc[df[\"income\"] < 0, \"income\"]", "df.loc[df.income < 0, 'income']"]
          }
        },
        explanation: "df.loc[condition, column] selects rows matching the boolean condition and the specified column, then assigns the value. Here df['income'] < 0 creates a boolean mask, and 'income' targets the column to modify. This is the standard pandas idiom for conditional assignment."
      },
      // 8 — match: Python vs R cleaning equivalents
      {
        type: "match",
        title: "Cleaning Equivalents: Python vs R",
        prompt: "Match each Python cleaning operation with its R equivalent.",
        pairs: [
          { left: "df['x'].str.lower()", leftLang: "python", right: "tolower(df$x)", rightLang: "r" },
          { left: "df['x'].fillna(df['x'].mean())", leftLang: "python", right: "df$x[is.na(df$x)] <- mean(df$x, na.rm=TRUE)", rightLang: "r" },
          { left: "df.drop_duplicates(subset=['id'])", leftLang: "python", right: "df %>% distinct(id, .keep_all = TRUE)", rightLang: "r" },
          { left: "df['x'].clip(lower=q01, upper=q99)", leftLang: "python", right: "pmin(pmax(df$x, q01), q99)", rightLang: "r" }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    //  ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 — read (Python): np.where for conditional replacement
      {
        type: "read",
        title: "Conditional Replacement with np.where",
        prompt: "What values does the 'wage_clean' column contain after this code?",
        lang: "python",
        code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({'wage': [50000, -999, 72000, 0, 61000]})\ndf['wage_clean'] = np.where(\n    df['wage'] > 0,\n    df['wage'],\n    np.nan\n)\nprint(df['wage_clean'].tolist())",
        options: [
          "[50000, -999, 72000, 0, 61000]",
          "[50000, NaN, 72000, NaN, 61000]",
          "[50000, NaN, 72000, 0, 61000]",
          "[NaN, -999, NaN, 0, NaN]"
        ],
        correct: 1,
        explanation: "np.where(condition, value_if_true, value_if_false) checks each element. wage > 0 is True for 50000, 72000, 61000 (kept as-is) and False for -999 and 0 (replaced with NaN). Note that 0 is NOT > 0, so it becomes NaN too — a subtlety students often miss."
      },
      // 2 — read (Stata): merge diagnostics
      {
        type: "read",
        title: "Merge Diagnostics in Stata",
        prompt: "What does the tabulation of _merge tell you?",
        lang: "stata",
        code: "use firms.dta, clear\nmerge 1:1 firm_id using financials.dta\ntab _merge\n\n*  _merge     |   Freq.\n* -----------+---------\n*  master only|     150\n*  matched    |     800\n*  using only |      50",
        options: [
          "The merge failed — 200 observations were lost",
          "150 firms have no financial data, 50 financial records have no firm data, 800 matched",
          "All 1000 observations merged successfully",
          "There are 150 duplicate firm_ids in the master data"
        ],
        correct: 1,
        explanation: "The _merge variable is Stata's built-in merge diagnostic. 'master only' (value 1) means 150 firms exist in firms.dta but not in financials.dta. 'using only' (value 2) means 50 records exist only in financials.dta. 'matched' (value 3) means 800 records linked successfully. Always tabulate _merge to verify merge quality."
      },
      // 3 — bug (Python): mean imputation without indicator
      {
        type: "bug",
        title: "Imputation Destroys Information",
        prompt: "A student imputes missing wages with the mean. Their regression coefficient on wage later has a smaller standard error than expected. What went wrong?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.read_csv('survey.csv')\n# 30% of wages are missing\ndf['wage'] = df['wage'].fillna(df['wage'].mean())\n\n# Later: regression uses wage as predictor\n# Coefficient SE is suspiciously small",
        options: [
          "fillna should use median instead of mean",
          "Mean imputation reduces variance — 30% of values are now identical, inflating precision artificially",
          "The mean is computed on the wrong column",
          "fillna does not work with float columns"
        ],
        correct: 1,
        explanation: "Mean imputation replaces all missing values with the same number, compressing the distribution toward the center. With 30% of data imputed, the variance of wage shrinks substantially, making downstream standard errors artificially small. Best practice: create a missing indicator variable and consider multiple imputation or at minimum acknowledge the bias."
      },
      // 4 — bug (R): string methods on non-string column
      {
        type: "bug",
        title: "String Cleaning on the Wrong Type",
        prompt: "This code produces unexpected results when cleaning firm IDs. What is the bug?",
        lang: "r",
        code: "library(dplyr)\nlibrary(stringr)\n\ndf <- data.frame(firm_id = c(1001, 2002, 3003))\ndf <- df %>%\n  mutate(firm_id = str_replace(firm_id, \"00\", \"-\"))",
        options: [
          "str_replace needs the pattern as a regex",
          "firm_id is numeric — implicit coercion to string may produce '1001.000' instead of '1001'",
          "str_replace only replaces the first match, should use str_replace_all",
          "The mutate function cannot modify existing columns"
        ],
        correct: 1,
        explanation: "firm_id is numeric (double). When R implicitly coerces it to character for str_replace, it may represent 1001 as '1001' or '1001.000' depending on options. The safe approach is explicit conversion: as.character(as.integer(firm_id)) before string operations. Always check column types before applying string functions."
      },
      // 5 — reorder (Python): full cleaning pipeline
      {
        type: "reorder",
        title: "Complete Data Cleaning Pipeline",
        prompt: "Arrange these steps in the correct order for a robust cleaning pipeline.",
        lang: "python",
        lines: [
          "df = df.drop_duplicates(subset=['firm_id', 'year'])",
          "df['revenue_was_missing'] = df['revenue'].isna().astype(int)",
          "df['revenue'] = df['revenue'].clip(lower=q01, upper=q99)",
          "df['revenue'] = df['revenue'].fillna(df['revenue'].median())",
          "q01, q99 = df['revenue'].quantile(0.01), df['revenue'].quantile(0.99)"
        ],
        correctOrder: [0, 1, 4, 3, 2],
        explanation: "First deduplicate so repeated observations do not bias statistics. Then create the missing indicator before imputation (once you fill NaN, you lose the information). Compute quantile bounds on the imputed data, fill missing values, then winsorize. The order matters: dedup first, indicator before fill, quantiles before clip."
      },
      // 6 — reorder (Stata): cleaning with merge check
      {
        type: "reorder",
        title: "Stata Cleaning with Merge Diagnostics",
        prompt: "Arrange these Stata commands to merge datasets and verify the result.",
        lang: "stata",
        lines: [
          "drop if _merge != 3",
          "merge 1:1 firm_id using financials.dta",
          "tab _merge",
          "use firms.dta, clear",
          "drop _merge"
        ],
        correctOrder: [3, 1, 2, 0, 4],
        explanation: "Load the master data, perform the merge, tabulate _merge to inspect match quality, drop unmatched observations (keeping only _merge == 3), then drop the _merge variable itself to clean up. Always inspect _merge before deciding which observations to keep."
      },
      // 7 — fill (Python): winsorization
      {
        type: "fill",
        title: "Winsorize Outliers in Python",
        prompt: "Fill in the gap to clip revenue to the 1st and 99th percentiles.",
        lang: "python",
        codeTemplate: "import pandas as pd\n\ndf = pd.read_csv('firms.csv')\nq01 = df['revenue'].quantile(0.01)\nq99 = df['revenue'].quantile(0.99)\ndf['revenue'] = df['revenue'].___CLIP___",
        gaps: {
          "CLIP": {
            answer: "clip(lower=q01, upper=q99)",
            accept: ["clip(lower=q01, upper=q99)", "clip(q01, q99)", "clip(lower=q01,upper=q99)"]
          }
        },
        explanation: "The .clip(lower=q01, upper=q99) method caps values below q01 at q01 and above q99 at q99. This is winsorization — it preserves extreme observations rather than dropping them, reducing the influence of outliers without losing sample size."
      },
      // 8 — match: diagnosing data quality issues
      {
        type: "match",
        title: "Data Quality Checks Across Languages",
        prompt: "Match each data quality check with the correct implementation.",
        pairs: [
          { left: "Check for duplicate keys", leftLang: "text", right: "df.duplicated(subset=['firm_id', 'year']).sum()", rightLang: "python" },
          { left: "Inspect merge quality", leftLang: "text", right: "tab _merge", rightLang: "stata" },
          { left: "Count missing by column", leftLang: "text", right: "colSums(is.na(df))", rightLang: "r" },
          { left: "Identify outliers beyond 3 SD", leftLang: "text", right: "df[abs(df['x'] - df['x'].mean()) > 3*df['x'].std()]", rightLang: "python" }
        ]
      }
    ]
  };

  // =========================================================================
  //  TOPIC 2: DATA ANALYSIS
  // =========================================================================
  window.PRACTICE_EXERCISES.data_analysis = {

    // -----------------------------------------------------------------------
    //  BEGINNER (8 exercises)
    // -----------------------------------------------------------------------
    beginner: [
      // 1 — read (Python): OLS with robust SEs
      {
        type: "read",
        title: "OLS with Robust Standard Errors",
        prompt: "What type of standard errors does this regression use?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('wage ~ education + experience', data=df)\nresults = model.fit(cov_type='HC1')\nprint(results.summary())",
        options: [
          "Classical (homoskedastic) standard errors",
          "Heteroskedasticity-robust (White/Huber) standard errors",
          "Clustered standard errors",
          "Bootstrapped standard errors"
        ],
        correct: 1,
        explanation: "cov_type='HC1' specifies heteroskedasticity-consistent standard errors (the HC1 variant matches Stata's robust option). Classical SEs assume constant variance of errors, which is rarely true in economics data. Robust SEs are valid under heteroskedasticity and are standard practice."
      },
      // 2 — read (Stata): basic regression with robust
      {
        type: "read",
        title: "Interpreting Stata Regression Output",
        prompt: "What does this Stata command estimate?",
        lang: "stata",
        code: "reg wage education experience i.female, robust",
        options: [
          "A logistic regression of wage on three predictors",
          "An OLS regression with robust SEs, including a dummy for female",
          "A fixed-effects regression with entity effects",
          "A regression with clustered standard errors by female"
        ],
        correct: 1,
        explanation: "reg runs OLS. The i.female prefix creates a dummy variable from the female variable. The robust option requests heteroskedasticity-robust standard errors (HC1). This is the most common regression specification in applied economics."
      },
      // 3 — bug (Python): classical SEs instead of robust
      {
        type: "bug",
        title: "Overconfident Inference",
        prompt: "A student finds p < 0.01 but their advisor says the standard errors are wrong. What is the bug?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('income ~ education + age', data=df)\nresults = model.fit()\nprint(results.pvalues)",
        options: [
          "The formula syntax is wrong",
          ".fit() without cov_type uses classical SEs, which assume homoskedasticity — use .fit(cov_type='HC1')",
          "pvalues is not a valid attribute",
          "The model should use smf.wls instead of smf.ols"
        ],
        correct: 1,
        explanation: "Calling .fit() without specifying cov_type defaults to classical (OLS) standard errors, which assume the error variance is constant across observations. In economics data, heteroskedasticity is the norm, making classical SEs unreliable. Always use .fit(cov_type='HC1') for robust inference."
      },
      // 4 — bug (R): wrong interaction syntax
      {
        type: "bug",
        title: "Wrong Interaction Term Syntax",
        prompt: "A student wants to include education and its interaction with female, but NOT the main effect of female. The model includes female anyway. Why?",
        lang: "r",
        code: "model <- lm(wage ~ education * female, data = df)\nsummary(model)",
        options: [
          "The * operator is not valid in R formulas",
          "education * female expands to education + female + education:female — use education + education:female instead",
          "The interaction term must be written as I(education * female)",
          "R formulas do not support interaction terms"
        ],
        correct: 1,
        explanation: "In R formula syntax, * means 'main effects plus interaction': education * female = education + female + education:female. To include only the interaction without the female main effect, write: wage ~ education + education:female. The : operator creates only the interaction."
      },
      // 5 — reorder (Python): estimation workflow
      {
        type: "reorder",
        title: "Order an OLS Estimation Workflow",
        prompt: "Arrange these lines to run an OLS regression with robust SEs and display results.",
        lang: "python",
        lines: [
          "print(results.summary())",
          "results = model.fit(cov_type='HC1')",
          "import statsmodels.formula.api as smf",
          "model = smf.ols('wage ~ education + experience', data=df)"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "First import the module, then specify the model formula, then fit with robust standard errors, then display results. The .fit() step is where estimation actually happens — the .ols() call only defines the model structure."
      },
      // 6 — reorder (Stata): regression with table export
      {
        type: "reorder",
        title: "Stata Regression and Export Workflow",
        prompt: "Arrange these Stata commands to estimate two models and export a comparison table.",
        lang: "stata",
        lines: [
          "esttab m1 m2 using \"table.tex\", se star(* 0.1 ** 0.05 *** 0.01)",
          "eststo m1: reg wage education, robust",
          "eststo m2: reg wage education experience i.female, robust",
          "eststo clear"
        ],
        correctOrder: [3, 1, 2, 0],
        explanation: "First clear any stored estimates, then estimate and store each model with eststo, then export both to a LaTeX table with esttab. The se option displays standard errors below coefficients, and star() defines significance thresholds."
      },
      // 7 — fill (Stata): clustered SEs
      {
        type: "fill",
        title: "Clustered Standard Errors in Stata",
        prompt: "Fill in the gap to cluster standard errors at the firm level.",
        lang: "stata",
        codeTemplate: "reg wage education experience, ___CLUSTER___",
        gaps: {
          "CLUSTER": {
            answer: "cluster(firm_id)",
            accept: ["cluster(firm_id)", "vce(cluster firm_id)"]
          }
        },
        explanation: "cluster(firm_id) tells Stata to compute standard errors that are robust to within-firm correlation. When observations within the same firm are correlated (e.g., workers in the same company), ignoring clustering underestimates standard errors, leading to false rejections."
      },
      // 8 — match: regression concepts across languages
      {
        type: "match",
        title: "Regression Commands Across Languages",
        prompt: "Match each estimation task with the correct command.",
        pairs: [
          { left: "OLS with robust SEs", leftLang: "text", right: "smf.ols(...).fit(cov_type='HC1')", rightLang: "python" },
          { left: "Fixed effects regression", leftLang: "text", right: "xtreg y x, fe robust", rightLang: "stata" },
          { left: "Logistic regression", leftLang: "text", right: "glm(y ~ x, family = binomial, data = df)", rightLang: "r" }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    //  INTERMEDIATE (8 exercises)
    // -----------------------------------------------------------------------
    intermediate: [
      // 1 — read (Python): clustered SEs
      {
        type: "read",
        title: "Clustered Standard Errors in Python",
        prompt: "What does the cov_kwds argument control?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('revenue ~ rd_spending + capital', data=df)\nresults = model.fit(\n    cov_type='cluster',\n    cov_kwds={'groups': df['firm_id']}\n)\nprint(results.summary())",
        options: [
          "It adds firm_id as a control variable in the regression",
          "It specifies firm_id as the grouping variable for clustered standard errors",
          "It runs a separate regression for each firm_id",
          "It weights observations by firm_id"
        ],
        correct: 1,
        explanation: "cov_type='cluster' with cov_kwds={'groups': df['firm_id']} computes cluster-robust standard errors grouped by firm_id. This accounts for correlation of errors within firms. The coefficients are identical to non-clustered OLS — only the standard errors (and thus p-values) change."
      },
      // 2 — read (R): fixed effects with feols
      {
        type: "read",
        title: "Two-Way Fixed Effects in R",
        prompt: "What fixed effects are included in this model?",
        lang: "r",
        code: "library(fixest)\n\nmodel <- feols(\n  log_wage ~ education + experience | firm_id + year,\n  cluster = ~firm_id,\n  data = panel\n)",
        options: [
          "Only firm fixed effects",
          "Only year fixed effects",
          "Both firm and year fixed effects, with SEs clustered at the firm level",
          "Firm-by-year interaction fixed effects"
        ],
        correct: 2,
        explanation: "In feols syntax, variables after | are fixed effects. firm_id + year includes separate firm and year fixed effects (two-way FE). cluster = ~firm_id clusters standard errors at the firm level. This is the workhorse specification in panel data econometrics."
      },
      // 3 — bug (Python): interpreting logit coefficients as probabilities
      {
        type: "bug",
        title: "Logit Coefficient Misinterpretation",
        prompt: "A student reports: 'One more year of education increases the probability of being hired by 0.45.' Is this correct?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.logit('hired ~ education + experience', data=df)\nresults = model.fit()\nprint(results.params)\n# education    0.45\n# experience   0.12",
        options: [
          "Yes, logit coefficients directly measure probability changes",
          "No — logit coefficients are in log-odds units; marginal effects (.get_margeff()) give probability changes",
          "No — the coefficient should be exponentiated to get the probability",
          "No — logit models cannot estimate the effect of continuous variables"
        ],
        correct: 1,
        explanation: "Logit coefficients represent changes in log-odds, not probabilities. A coefficient of 0.45 means one more year of education increases the log-odds of hiring by 0.45. To get the actual probability change, compute marginal effects: results.get_margeff().summary(). The marginal effect depends on where you evaluate it (at the mean or averaged over the sample)."
      },
      // 4 — bug (Stata): post-treatment control
      {
        type: "bug",
        title: "Post-Treatment Bias",
        prompt: "A student studies the effect of a job training program on wages. Their advisor says one control variable is problematic. Which one?",
        lang: "stata",
        code: "* Training program assigned randomly in 2020\nreg wage_2021 training age education job_title_2021, robust",
        options: [
          "age — it is collinear with experience",
          "education — it is a pre-treatment variable",
          "job_title_2021 — it is a post-treatment variable that may be affected by the training",
          "wage_2021 — it should be the lagged wage instead"
        ],
        correct: 2,
        explanation: "job_title_2021 is measured after the training program (post-treatment). If training affects job title, which in turn affects wages, controlling for job title blocks part of the causal path and biases the treatment effect estimate. Only control for pre-treatment variables (age, education measured before 2020)."
      },
      // 5 — reorder (R): logit with marginal effects
      {
        type: "reorder",
        title: "Logit Estimation with Marginal Effects in R",
        prompt: "Arrange these lines to estimate a logit model and compute average marginal effects.",
        lang: "r",
        lines: [
          "summary(ame)",
          "ame <- margins(model)",
          "model <- glm(hired ~ education + experience, family = binomial, data = df)",
          "library(margins)"
        ],
        correctOrder: [3, 2, 1, 0],
        explanation: "Load the margins package, estimate the logit model with glm(family = binomial), compute average marginal effects with margins(), then display the results. Marginal effects convert log-odds coefficients into interpretable probability changes, which is essential for logit/probit models."
      },
      // 6 — reorder (Python): panel regression
      {
        type: "reorder",
        title: "Panel Data Regression in Python",
        prompt: "Arrange these lines to set up a panel index and run a fixed-effects regression.",
        lang: "python",
        lines: [
          "print(results.summary)",
          "results = model.fit(cov_type='clustered', cluster_entity=True)",
          "from linearmodels.panel import PanelOLS",
          "model = PanelOLS.from_formula('wage ~ 1 + education + experience + EntityEffects', data=df)",
          "df = df.set_index(['firm_id', 'year'])"
        ],
        correctOrder: [2, 4, 3, 1, 0],
        explanation: "Import PanelOLS, set a multi-index on the panel identifiers, specify the model with EntityEffects, fit with clustered SEs at the entity level, then display. The multi-index tells linearmodels which dimension is the entity and which is time."
      },
      // 7 — fill (R): interaction term
      {
        type: "fill",
        title: "Interaction Term in R Formula",
        prompt: "Fill in the gap to include education, female, AND their interaction in the model.",
        lang: "r",
        codeTemplate: "model <- lm(wage ~ ___FORMULA___, data = df)",
        gaps: {
          "FORMULA": {
            answer: "education * female",
            accept: ["education * female", "education*female", "education + female + education:female"]
          }
        },
        explanation: "In R, education * female is shorthand for education + female + education:female, which includes both main effects and their interaction. The interaction education:female tests whether the return to education differs between male and female workers."
      },
      // 8 — match: estimation output interpretation
      {
        type: "match",
        title: "Interpreting Estimation Output",
        prompt: "Match each statistic with what it tells you.",
        pairs: [
          { left: "R-squared = 0.02", leftLang: "text", right: "The model explains 2% of variance in the outcome — common in micro data", rightLang: "text" },
          { left: "F-statistic p < 0.001", leftLang: "text", right: "The predictors are jointly significant — at least one coefficient is nonzero", rightLang: "text" },
          { left: "education coef = 0.08, SE = 0.02", leftLang: "text", right: "One year of education is associated with an 8% wage increase (if log wage), significant at 1%", rightLang: "text" },
          { left: "Observations = 5000, Clusters = 50", leftLang: "text", right: "5000 observations grouped into 50 clusters for SE computation", rightLang: "text" }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    //  ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 — read (Python): formula interaction syntax
      {
        type: "read",
        title: "Formula Syntax: * vs : in Python",
        prompt: "How many estimated coefficients does this model have (including intercept)?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('wage ~ education + experience + education:experience', data=df)\nresults = model.fit(cov_type='HC1')",
        options: [
          "3 — education, experience, interaction",
          "4 — intercept, education, experience, education:experience",
          "5 — intercept, education, experience, education:experience, plus a duplicate",
          "2 — education and experience only"
        ],
        correct: 1,
        explanation: "The formula y ~ education + experience + education:experience includes: (1) intercept (always implicit), (2) education, (3) experience, (4) education:experience interaction. That is 4 coefficients. Note: education:experience is ONLY the interaction, whereas education*experience would also add the main effects (but they are already listed)."
      },
      // 2 — read (Stata): table export with esttab
      {
        type: "read",
        title: "Exporting Regression Tables in Stata",
        prompt: "What does this esttab command produce?",
        lang: "stata",
        code: "eststo m1: reg wage education, robust\neststo m2: reg wage education experience, robust\neststo m3: reg wage education experience i.female, robust\n\nesttab m1 m2 m3 using \"table1.tex\", replace ///\n  se star(* 0.1 ** 0.05 *** 0.01) ///\n  keep(education experience) ///\n  title(\"Wage Regressions\")",
        options: [
          "A CSV file with raw coefficient values",
          "A LaTeX table showing education and experience coefficients across 3 models with SEs and stars",
          "A table with all coefficients including the female dummy",
          "Three separate tables, one for each model"
        ],
        correct: 1,
        explanation: "esttab exports a publication-ready LaTeX table. The keep() option displays only education and experience (hiding the female dummy and constant). se shows standard errors below coefficients, star() adds significance stars. The three models appear as columns, showing how coefficients change as controls are added."
      },
      // 3 — bug (Python): forgetting to cluster
      {
        type: "bug",
        title: "Missing Cluster Correction",
        prompt: "A student studies firm-level panel data but finds suspiciously small p-values. What is the bug?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\n# Panel: 500 firms observed over 10 years = 5000 obs\nmodel = smf.ols('revenue ~ rd_spending + capital', data=panel_df)\nresults = model.fit(cov_type='HC1')\nprint(results.pvalues)",
        options: [
          "HC1 is the wrong robust SE estimator for panels",
          "Robust SEs alone do not account for within-firm correlation — need cluster(firm_id) for valid inference",
          "The model needs firm fixed effects to be valid",
          "Panel data cannot be analyzed with OLS"
        ],
        correct: 1,
        explanation: "With 10 observations per firm, errors within the same firm are likely correlated. HC1 (robust) handles heteroskedasticity but NOT within-cluster correlation. This underestimates SEs, producing inflated t-statistics. The fix: .fit(cov_type='cluster', cov_kwds={'groups': panel_df['firm_id']})."
      },
      // 4 — bug (R): no residual diagnostics
      {
        type: "bug",
        title: "Bootstrap Standard Errors",
        prompt: "A student implements a bootstrap for standard errors but gets a different number of coefficients in each iteration. What is the bug?",
        lang: "r",
        code: "set.seed(42)\nn <- nrow(df)\nboot_coefs <- numeric(1000)\nfor (b in 1:1000) {\n  idx <- sample(1:n, n, replace = TRUE)\n  boot_df <- df[idx, ]\n  # Some bootstrap samples drop a factor level of 'region'\n  m <- lm(wage ~ education + factor(region), data = boot_df)\n  boot_coefs[b] <- coef(m)[\"education\"]\n}",
        options: [
          "replace = TRUE is wrong — bootstrap should sample without replacement",
          "Some resamples may miss a factor level of region, changing the number of dummies and coefficient positions",
          "numeric(1000) should be list(1000)",
          "The seed should be set inside the loop"
        ],
        correct: 1,
        explanation: "When bootstrapping with factor variables, some resamples may not contain all levels of 'region'. This changes the model matrix and the number of coefficients, potentially causing coef(m)['education'] to return NA or the wrong value. The fix: ensure all factor levels are preserved with factor(region, levels = levels(df$region)) or use a cluster bootstrap."
      },
      // 5 — reorder (Python): bootstrap SE computation
      {
        type: "reorder",
        title: "Bootstrap Standard Error Computation",
        prompt: "Arrange these lines to compute a bootstrap standard error for the education coefficient.",
        lang: "python",
        lines: [
          "se_education = np.std(boot_coefs)",
          "boot_coefs.append(coef)",
          "boot_sample = df.sample(n=len(df), replace=True)",
          "boot_coefs = []\nfor b in range(1000):",
          "    coef = smf.ols('wage ~ education', data=boot_sample).fit().params['education']"
        ],
        correctOrder: [3, 2, 4, 1, 0],
        explanation: "Initialize a list and loop, resample with replacement, estimate the model on each bootstrap sample, collect the coefficient, then compute the standard deviation of the bootstrap distribution. The SD of bootstrap coefficients is the bootstrap standard error — this is the core idea of the bootstrap."
      },
      // 6 — reorder (Stata): stepwise model building
      {
        type: "reorder",
        title: "Stepwise Model Building in Stata",
        prompt: "Arrange these commands to estimate three nested models and compare them.",
        lang: "stata",
        lines: [
          "esttab m1 m2 m3, se r2 star(* 0.1 ** 0.05 *** 0.01)",
          "eststo m2: reg wage education experience, robust",
          "eststo m3: reg wage education experience i.female c.education#c.experience, robust",
          "eststo clear",
          "eststo m1: reg wage education, robust"
        ],
        correctOrder: [3, 4, 1, 2, 0],
        explanation: "Clear stored estimates, then build up from the simplest model (education only) to the most complex (with interaction). The c.education#c.experience syntax creates a continuous-by-continuous interaction. Finally, display all three side by side with esttab to show how coefficients evolve as controls are added."
      },
      // 7 — fill (Python): Stargazer table
      {
        type: "fill",
        title: "Regression Table with Stargazer",
        prompt: "Fill in the gap to add a second model to the Stargazer table.",
        lang: "python",
        codeTemplate: "from stargazer.stargazer import Stargazer\n\nmodel1 = smf.ols('wage ~ education', data=df).fit(cov_type='HC1')\nmodel2 = smf.ols('wage ~ education + experience', data=df).fit(cov_type='HC1')\n\ntable = Stargazer(___MODELS___)\nprint(table.render_latex())",
        gaps: {
          "MODELS": {
            answer: "[model1, model2]",
            accept: ["[model1, model2]", "[model1,model2]"]
          }
        },
        explanation: "Stargazer takes a list of fitted model objects and produces a publication-quality comparison table. Each model appears as a column, making it easy to see how coefficients change as controls are added. This is the Python equivalent of Stata's esttab."
      },
      // 8 — match: estimation diagnostics
      {
        type: "match",
        title: "Diagnostic Commands Across Languages",
        prompt: "Match each diagnostic task with the correct command.",
        pairs: [
          { left: "Marginal effects after logit", leftLang: "text", right: "margins, dydx(*)", rightLang: "stata" },
          { left: "Variance inflation factors", leftLang: "text", right: "from statsmodels.stats.outliers_influence import variance_inflation_factor", rightLang: "python" },
          { left: "Breusch-Pagan heteroskedasticity test", leftLang: "text", right: "estat hettest", rightLang: "stata" },
          { left: "Residual vs fitted plot", leftLang: "text", right: "plot(model, which = 1)", rightLang: "r" }
        ]
      }
    ]
  };

  // =========================================================================
  //  TOPIC 3: CAUSAL INFERENCE
  // =========================================================================
  window.PRACTICE_EXERCISES.causal_inference = {

    // -----------------------------------------------------------------------
    //  BEGINNER (8 exercises)
    // -----------------------------------------------------------------------
    beginner: [
      // 1 — read (Stata): DiD interaction term
      {
        type: "read",
        title: "Difference-in-Differences: The Key Coefficient",
        prompt: "Which coefficient gives the DiD treatment effect estimate?",
        lang: "stata",
        code: "gen treat_post = treated * post\nreg outcome treated post treat_post, robust",
        options: [
          "The coefficient on treated (average difference between groups before treatment)",
          "The coefficient on post (time trend for the control group)",
          "The coefficient on treat_post (the DiD estimand — differential change for treated vs control)",
          "The intercept (baseline outcome for the control group pre-treatment)"
        ],
        correct: 2,
        explanation: "In DiD, treat_post = treated * post captures the DIFFERENTIAL change in outcomes for the treated group relative to the control group after the policy. 'treated' captures pre-existing group differences; 'post' captures the common time trend. The interaction is the causal estimate under the parallel trends assumption."
      },
      // 2 — read (R): propensity score matching
      {
        type: "read",
        title: "Propensity Score Matching in R",
        prompt: "What does the matchit() function do in this code?",
        lang: "r",
        code: "library(MatchIt)\n\nm <- matchit(training ~ age + education + income,\n             method = \"nearest\", data = df)\nmatched_df <- match.data(m)\nsummary(m)",
        options: [
          "Runs a regression of training on covariates",
          "Estimates propensity scores and matches treated to control units based on nearest neighbor",
          "Creates a balanced random sample from the data",
          "Tests whether the treatment is randomly assigned"
        ],
        correct: 1,
        explanation: "matchit() first estimates a propensity score (probability of treatment given covariates) via logistic regression, then matches each treated unit to the nearest control unit based on propensity score distance. match.data() extracts the matched sample. summary() shows covariate balance before and after matching."
      },
      // 3 — bug (Stata): DiD without clustering
      {
        type: "bug",
        title: "DiD Standard Errors Are Too Small",
        prompt: "A student estimates DiD on a state-level panel and finds extremely significant results. What is the bug?",
        lang: "stata",
        code: "* State-level panel: 50 states x 20 years = 1000 obs\ngen treat_post = treated_state * post_reform\nreg outcome treated_state post_reform treat_post, robust",
        options: [
          "The interaction term should be computed differently",
          "robust SEs do not account for within-state correlation — need cluster(state) for valid DiD inference",
          "DiD requires a logit model, not OLS",
          "The post_reform variable should be interacted with year"
        ],
        correct: 1,
        explanation: "In panel DiD, errors within the same state are correlated over time. The robust option handles heteroskedasticity but not serial correlation within clusters. Bertrand, Duflo, and Mullainathan (2004) showed this inflates t-statistics dramatically. The fix: reg outcome treated_state post_reform treat_post, cluster(state)."
      },
      // 4 — bug (Python): IV with weak instrument
      {
        type: "bug",
        title: "Weak Instrument Problem",
        prompt: "A student runs an IV regression but the results look unreliable — huge standard errors and implausible coefficients. What should they check?",
        lang: "python",
        code: "from linearmodels.iv import IV2SLS\n\nmodel = IV2SLS.from_formula(\n    'wage ~ 1 + experience + [education ~ distance_to_college]',\n    data=df\n)\nresults = model.fit(cov_type='robust')\nprint(results.first_stage)\n# F-statistic: 3.2",
        options: [
          "The formula syntax is wrong for IV2SLS",
          "The first-stage F-statistic is 3.2, well below the threshold of 10 — distance_to_college is a weak instrument",
          "IV2SLS cannot handle robust standard errors",
          "The dependent variable should be log(wage)"
        ],
        correct: 1,
        explanation: "An F-statistic of 3.2 in the first stage indicates a weak instrument — distance_to_college barely predicts education. The rule of thumb is F > 10 (Stock and Yogo, 2005). Weak instruments lead to biased IV estimates (toward OLS) and unreliable inference. The student needs a stronger instrument or should report weak-IV-robust confidence intervals."
      },
      // 5 — reorder (Stata): basic DiD setup
      {
        type: "reorder",
        title: "Setting Up a DiD Regression",
        prompt: "Arrange these Stata commands to run a basic difference-in-differences analysis.",
        lang: "stata",
        lines: [
          "reg outcome treated post treat_post, cluster(state)",
          "gen treat_post = treated * post",
          "gen post = (year >= 2015)",
          "use state_panel.dta, clear"
        ],
        correctOrder: [3, 2, 1, 0],
        explanation: "Load the panel data, create the post-treatment indicator, generate the interaction term (treated x post), then estimate with clustered SEs at the state level. The interaction coefficient is the DiD estimate — the differential change in outcomes for treated vs control states after 2015."
      },
      // 6 — reorder (R): RDD estimation
      {
        type: "reorder",
        title: "Running an RDD Analysis in R",
        prompt: "Arrange these R commands to estimate a regression discontinuity design.",
        lang: "r",
        lines: [
          "summary(rd_result)",
          "rd_result <- rdrobust(y = df$outcome, x = df$score, c = 60)",
          "library(rdrobust)",
          "rdbwselect(y = df$outcome, x = df$score, c = 60)"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "Load the package, inspect the MSE-optimal bandwidth with rdbwselect(), then estimate the RDD with rdrobust() at the cutoff c = 60, and display results. The c parameter specifies the threshold — units just above 60 are treated, those just below are the control."
      },
      // 7 — fill (Stata): IV regression
      {
        type: "fill",
        title: "Two-Stage Least Squares in Stata",
        prompt: "Fill in the gap to instrument education with distance_to_college.",
        lang: "stata",
        codeTemplate: "ivregress 2sls wage experience (___ENDOG___), robust\nestat firststage",
        gaps: {
          "ENDOG": {
            answer: "education = distance_to_college",
            accept: ["education = distance_to_college", "education=distance_to_college"]
          }
        },
        explanation: "In ivregress syntax, the parentheses contain (endogenous_var = instruments). Here education is endogenous (correlated with unobserved ability) and distance_to_college is the instrument. estat firststage tests instrument relevance — check that the F-statistic exceeds 10."
      },
      // 8 — match: causal methods and their identifying assumptions
      {
        type: "match",
        title: "Causal Methods and Key Assumptions",
        prompt: "Match each causal inference method with its core identifying assumption.",
        pairs: [
          { left: "Difference-in-Differences", leftLang: "text", right: "Parallel trends: treated and control would have followed the same trajectory absent treatment", rightLang: "text" },
          { left: "Regression Discontinuity", leftLang: "text", right: "No manipulation: units cannot precisely sort around the cutoff", rightLang: "text" },
          { left: "Instrumental Variables", leftLang: "text", right: "Exclusion restriction: the instrument affects the outcome only through the endogenous variable", rightLang: "text" },
          { left: "Propensity Score Matching", leftLang: "text", right: "Conditional independence: no unobserved confounders after conditioning on covariates", rightLang: "text" }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    //  INTERMEDIATE (8 exercises)
    // -----------------------------------------------------------------------
    intermediate: [
      // 1 — read (R): TWFE with feols
      {
        type: "read",
        title: "Two-Way Fixed Effects DiD",
        prompt: "What does the coefficient on treated estimate in this TWFE specification?",
        lang: "r",
        code: "library(fixest)\n\nmodel <- feols(\n  log_gdp ~ treated | country + year,\n  cluster = ~country,\n  data = panel\n)",
        options: [
          "The average GDP level of treated countries",
          "The within-country, within-year effect of treatment on log GDP (the DiD estimand under TWFE)",
          "The between-country difference in GDP growth",
          "The time trend in GDP for all countries"
        ],
        correct: 1,
        explanation: "With country and year fixed effects, the treated coefficient is identified from within-country variation over time, net of common year shocks. This is the TWFE DiD estimand — it compares the change in log_gdp for treated countries before vs after treatment, relative to untreated countries over the same period."
      },
      // 2 — read (Stata): event study
      {
        type: "read",
        title: "Event Study Specification",
        prompt: "Why is ref = -1 used in this event study?",
        lang: "stata",
        code: "* rel_time = year - treatment_year\n* ranges from -5 to +5\nreghdfe outcome ib(-1).rel_time, absorb(unit_id year) cluster(unit_id)",
        options: [
          "It drops all observations from one period before treatment",
          "It sets period -1 (one year before treatment) as the reference category, so all coefficients are relative to that period",
          "It lags the outcome variable by one period",
          "It excludes the first year of the panel from estimation"
        ],
        correct: 1,
        explanation: "ib(-1).rel_time tells Stata to omit the dummy for rel_time = -1, making it the reference period. All event-study coefficients are then measured relative to one period before treatment. Pre-treatment coefficients (rel_time = -5 to -2) test parallel trends — they should be near zero. Post-treatment coefficients (rel_time = 0 to +5) show the dynamic treatment effect."
      },
      // 3 — bug (R): matching on post-treatment variable
      {
        type: "bug",
        title: "Matching on a Post-Treatment Variable",
        prompt: "A student matches on several covariates to estimate the effect of a job training program. What is the problem?",
        lang: "r",
        code: "library(MatchIt)\n\n# Training program assigned in January 2020\nm <- matchit(\n  training ~ age + education + occupation_2021 + pre_wage,\n  method = \"nearest\",\n  data = df\n)\nmatched_df <- match.data(m)",
        options: [
          "matchit should use method = 'exact' for better balance",
          "occupation_2021 is post-treatment — matching on it blocks the causal path and biases the estimate",
          "pre_wage should not be included as a matching variable",
          "The propensity score model should use a probit instead of logit"
        ],
        correct: 1,
        explanation: "occupation_2021 is measured after the training program (2020), so it may be affected by treatment. Matching on post-treatment variables is a form of conditioning on a mediator — it blocks the indirect effect (training -> better occupation -> higher wage) and introduces collider bias. Only match on pre-treatment covariates."
      },
      // 4 — bug (Python): RDD global polynomial
      {
        type: "bug",
        title: "RDD with Global Polynomial",
        prompt: "A student estimates RDD by fitting a polynomial on the full sample. What is the methodological problem?",
        lang: "python",
        code: "import numpy as np\nimport statsmodels.formula.api as smf\n\n# Running variable: test score, cutoff at 60\ndf['score_c'] = df['score'] - 60\ndf['score_c2'] = df['score_c'] ** 2\ndf['score_c3'] = df['score_c'] ** 3\ndf['treat'] = (df['score'] >= 60).astype(int)\n\nmodel = smf.ols(\n    'outcome ~ treat + score_c + score_c2 + score_c3',\n    data=df  # uses ALL data, not local\n).fit(cov_type='HC1')",
        options: [
          "The polynomial should include interactions with treat",
          "Global high-order polynomials are sensitive to observations far from the cutoff — use local linear regression (rdrobust) instead",
          "score_c should not be centered at the cutoff",
          "The treatment variable is defined incorrectly"
        ],
        correct: 1,
        explanation: "Gelman and Imbens (2019) show that global polynomial RDD is unreliable — observations far from the cutoff drive the fit and can produce spurious discontinuities. Best practice is local linear regression with an MSE-optimal bandwidth, as implemented in rdrobust. This focuses estimation on observations near the cutoff where the RDD assumption holds."
      },
      // 5 — reorder (R): event study plot
      {
        type: "reorder",
        title: "DiD Event Study with Plot",
        prompt: "Arrange these R commands to estimate an event study and plot the dynamic effects.",
        lang: "r",
        lines: [
          "iplot(model, xlab = 'Periods relative to treatment', ylab = 'Effect')",
          "model <- feols(outcome ~ i(rel_time, ref = -1) | unit_id + year, cluster = ~unit_id, data = df)",
          "library(fixest)",
          "df$rel_time <- df$year - df$treatment_year"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "Load fixest, compute relative time (periods since treatment), estimate the event study with period -1 as reference, then plot with iplot(). The plot shows pre-treatment coefficients (test parallel trends) and post-treatment coefficients (dynamic treatment effects) with confidence intervals."
      },
      // 6 — reorder (Stata): IV with diagnostics
      {
        type: "reorder",
        title: "IV Estimation with Diagnostics in Stata",
        prompt: "Arrange these Stata commands to run an IV regression and check instrument strength.",
        lang: "stata",
        lines: [
          "estat firststage",
          "ivregress 2sls wage experience (education = distance_to_college), robust",
          "estat endogeneity",
          "use labor.dta, clear"
        ],
        correctOrder: [3, 1, 0, 2],
        explanation: "Load data, run 2SLS, check first-stage F-statistic (F > 10 rule for instrument relevance), then test endogeneity (Durbin-Wu-Hausman test — if education is actually exogenous, OLS is more efficient). Always report the first-stage F with IV results."
      },
      // 7 — fill (Python): RDD estimation
      {
        type: "fill",
        title: "RDD with rdrobust in Python",
        prompt: "Fill in the gap to run an RDD at the cutoff score of 60.",
        lang: "python",
        codeTemplate: "from rdrobust import rdrobust\n\nresult = rdrobust(y=df['outcome'], x=df['score'], ___CUTOFF___)\nprint(result)",
        gaps: {
          "CUTOFF": {
            answer: "c=60",
            accept: ["c=60", "c = 60"]
          }
        },
        explanation: "The c parameter sets the RDD cutoff value. rdrobust automatically selects an MSE-optimal bandwidth, fits local linear regressions on each side of c=60, and computes robust confidence intervals. The estimated discontinuity at c is the local average treatment effect for units near the threshold."
      },
      // 8 — match: causal inference commands across languages
      {
        type: "match",
        title: "Causal Inference Commands Across Languages",
        prompt: "Match each causal method with the correct implementation.",
        pairs: [
          { left: "DiD with TWFE (R)", leftLang: "text", right: "feols(y ~ treated | unit + year, cluster = ~unit, data = df)", rightLang: "r" },
          { left: "IV first-stage F-test (Stata)", leftLang: "text", right: "estat firststage", rightLang: "stata" },
          { left: "RDD bandwidth selection (R)", leftLang: "text", right: "rdbwselect(y = df$outcome, x = df$score, c = 60)", rightLang: "r" },
          { left: "Propensity score (Python)", leftLang: "text", right: "LogisticRegression().fit(X, T).predict_proba(X)[:, 1]", rightLang: "python" }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    //  ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 — read (R): synthetic control
      {
        type: "read",
        title: "Synthetic Control: Understanding Donor Weights",
        prompt: "What does the synthetic control method do with the donor pool?",
        lang: "r",
        code: "library(Synth)\n\ndataprep_out <- dataprep(\n  foo = panel,\n  predictors = c(\"gdp\", \"population\", \"trade_share\"),\n  predictors.op = \"mean\",\n  dependent = \"gdp\",\n  unit.variable = \"country_id\",\n  time.variable = \"year\",\n  treatment.identifier = 7,\n  controls.identifier = c(1:6, 8:20),\n  time.predictors.prior = 1985:1999,\n  time.optimize.ssr = 1985:1999,\n  time.plot = 1985:2010\n)\nsynth_out <- synth(dataprep_out)",
        options: [
          "Averages all donor countries equally to create the counterfactual",
          "Finds optimal weights for donor countries to match the treated country's pre-treatment trajectory",
          "Runs a regression of the treated country's GDP on donor countries' GDP",
          "Randomly selects one donor country as the counterfactual"
        ],
        correct: 1,
        explanation: "Synthetic control finds a weighted combination of donor units (countries 1-6, 8-20) that best reproduces the treated unit's (country 7) pre-treatment outcomes and predictors. The gap between the treated unit and its synthetic counterpart after treatment is the causal effect. The weights are sparse — usually only a few donors get positive weight."
      },
      // 2 — read (Stata): IV overidentification
      {
        type: "read",
        title: "Overidentification Test for IV",
        prompt: "What does the Sargan-Hansen test tell you in this overidentified IV model?",
        lang: "stata",
        code: "ivregress 2sls wage experience (education = distance_to_college parent_education), robust\nestat overid\n* Sargan (score) chi2(1) = 0.82, p = 0.365",
        options: [
          "Both instruments are strong (F > 10)",
          "The overid test fails to reject, suggesting both instruments satisfy the exclusion restriction (or lack power to detect violations)",
          "education is endogenous and IV is necessary",
          "The model is exactly identified and the test is invalid"
        ],
        correct: 1,
        explanation: "With 2 instruments (distance, parent_education) and 1 endogenous variable, the model is overidentified. The Sargan-Hansen test checks whether the instruments give consistent estimates — failure to reject (p = 0.365) is consistent with both instruments being valid. However, if both instruments violate the exclusion restriction in the same way, the test has no power. It is a necessary but not sufficient check."
      },
      // 3 — bug (R): wrong event study reference
      {
        type: "bug",
        title: "Event Study with Wrong Reference Period",
        prompt: "A student's event study plot shows a spike at period -1. Their advisor says the normalization is wrong. Why?",
        lang: "r",
        code: "library(fixest)\n\n# rel_time: -5, -4, ..., -1, 0, 1, ..., 5\nmodel <- feols(\n  outcome ~ i(rel_time, ref = 0) | unit_id + year,\n  cluster = ~unit_id,\n  data = df\n)",
        options: [
          "The cluster variable should be year, not unit_id",
          "ref = 0 normalizes to the treatment period — should use ref = -1 to make pre-treatment the baseline",
          "i() does not work with negative values of rel_time",
          "The model should not include year fixed effects with an event study"
        ],
        correct: 1,
        explanation: "Setting ref = 0 (the treatment period) as the baseline means pre-treatment coefficients measure the difference from the treatment period — making it impossible to test parallel trends. The standard practice is ref = -1 (one period before treatment), so pre-treatment coefficients (rel_time = -5 to -2) test whether trends were parallel before treatment, and post-treatment coefficients measure the dynamic effect."
      },
      // 4 — bug (Stata): RDD with chosen bandwidth
      {
        type: "bug",
        title: "RDD Robustness to Bandwidth Choice",
        prompt: "A reviewer says the RDD result is not robust. What should the student do?",
        lang: "stata",
        code: "* Only reports one bandwidth\nrdrobust outcome score, c(60)\n* Estimated effect: 5.2 (p = 0.03)\n* MSE-optimal bandwidth: h = 8.3",
        options: [
          "Use a global polynomial instead",
          "Show results are stable across alternative bandwidths — e.g., rdrobust outcome score, c(60) h(5) and h(12)",
          "Increase the polynomial order to 3",
          "Remove the cutoff parameter c(60)"
        ],
        correct: 1,
        explanation: "A single bandwidth gives a single estimate. Robustness requires showing the result is stable when the bandwidth varies. Standard practice: report the MSE-optimal bandwidth result plus alternative bandwidths (e.g., h/2 and 2h). If the effect is significant only at the optimal bandwidth, it may be fragile. rdrobust also reports a bias-corrected confidence interval by default."
      },
      // 5 — reorder (Stata): synthetic control
      {
        type: "reorder",
        title: "Synthetic Control in Stata",
        prompt: "Arrange these Stata commands to run a synthetic control analysis.",
        lang: "stata",
        lines: [
          "synth gdp gdp(1985) gdp(1986) gdp(1987) population trade_share, trunit(7) trperiod(1990)",
          "tsset country_id year",
          "synth_runner gdp gdp(1985) gdp(1986) gdp(1987) population trade_share, trunit(7) trperiod(1990) gen_vars",
          "use country_panel.dta, clear",
          "graph twoway (line gdp year if country_id == 7) (line _Y_synthetic year if country_id == 7)"
        ],
        correctOrder: [3, 1, 0, 4, 2],
        explanation: "Load data, declare panel structure with tsset, run synth to find optimal donor weights matching country 7's pre-1990 GDP trajectory, plot the treated vs synthetic country, then run placebo tests with synth_runner (applies the method to every donor country to build a distribution of placebo effects for inference)."
      },
      // 6 — reorder (Python): matching with balance check
      {
        type: "reorder",
        title: "Propensity Score Matching with Balance Check",
        prompt: "Arrange these Python steps for matching with a proper balance diagnostic.",
        lang: "python",
        lines: [
          "matched = df.loc[df.index.isin(treated.index) | df.index.isin(matched_control.index)]",
          "ps = LogisticRegression().fit(X, df['treatment']).predict_proba(X)[:, 1]",
          "# Check balance: compare means of covariates in matched sample\nbalance = matched.groupby('treatment')[['age', 'education', 'income']].mean()",
          "from sklearn.linear_model import LogisticRegression\nfrom sklearn.neighbors import NearestNeighbors",
          "nn = NearestNeighbors(n_neighbors=1).fit(ps[df['treatment']==0].reshape(-1,1))\nmatched_control = df[df['treatment']==0].iloc[nn.kneighbors(ps[df['treatment']==1].reshape(-1,1))[1].flatten()]"
        ],
        correctOrder: [3, 1, 4, 0, 2],
        explanation: "Import packages, estimate propensity scores, find nearest-neighbor matches for each treated unit, construct the matched sample, then check covariate balance. The balance check is essential — if matched treated and control groups differ on observables, the matching failed and the estimate is biased."
      },
      // 7 — fill (R): event study specification
      {
        type: "fill",
        title: "Event Study in R with fixest",
        prompt: "Fill in the gap to estimate an event study with period -1 as the reference.",
        lang: "r",
        codeTemplate: "library(fixest)\n\nmodel <- feols(\n  outcome ~ ___EVENTSTUDY___ | unit_id + year,\n  cluster = ~unit_id,\n  data = df\n)\niplot(model)",
        gaps: {
          "EVENTSTUDY": {
            answer: "i(rel_time, ref = -1)",
            accept: ["i(rel_time, ref = -1)", "i(rel_time, ref=-1)", "i(rel_time,ref=-1)"]
          }
        },
        explanation: "i(rel_time, ref = -1) creates dummies for each value of rel_time with period -1 omitted as the reference. The resulting coefficients show the treatment effect at each period relative to one year before treatment. Pre-treatment coefficients near zero support the parallel trends assumption; post-treatment coefficients trace out the dynamic effect."
      },
      // 8 — match: placebo and robustness tests
      {
        type: "match",
        title: "Robustness Tests for Causal Methods",
        prompt: "Match each causal method with its standard robustness or placebo test.",
        pairs: [
          { left: "DiD event study", leftLang: "text", right: "Pre-treatment coefficients should be near zero (parallel trends test)", rightLang: "text" },
          { left: "RDD", leftLang: "text", right: "Vary the bandwidth: results should be stable across h/2, h, and 2h", rightLang: "text" },
          { left: "IV", leftLang: "text", right: "First-stage F > 10 (instrument relevance) and Sargan overid test (if overidentified)", rightLang: "text" },
          { left: "Synthetic control", leftLang: "text", right: "Placebo-in-space: apply the method to each donor unit and compare effect sizes", rightLang: "text" }
        ]
      }
    ]
  };

})();
