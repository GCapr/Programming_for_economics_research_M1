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
        hint: "Focus on the <code>subset</code> parameter in <code>dropna()</code> — it controls which column's missing values trigger row removal.",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'income':    [50000, None, 72000, None, 61000],\n    'education': [12,    16,   None,  14,   18]\n})\nresult = df.dropna(subset=['income'])\nprint(len(result))",
        options: [
          "5 — dropna with subset keeps all rows because None is not NaN",
          "3 — only the 2 rows where income is None are dropped",
          "2 — all rows with any missing value anywhere are dropped",
          "4 — only one income value is None so only one row is dropped"
        ],
        correct: 1,
        explanation: "B is correct: dropna(subset=['income']) examines only the income column and removes the 2 rows where income is None (rows 2 and 4), leaving 3 rows. The missing value in education (row 3) is preserved because education is not in the subset. A is wrong because Python's None is treated as NaN by pandas — they are equivalent for missing-value detection. C is wrong because that describes the behavior of dropna() without the subset parameter, which drops any row containing any NaN in any column. D is wrong because there are 2 None values in income (rows 2 and 4), not 1."
      },
      // 2 — read (Stata): type conversion with destring
      {
        type: "read",
        title: "Type Conversion with destring in Stata",
        prompt: "After running this code, what is the type and content of the `income` variable?",
        hint: "The command name <code>destring</code> literally means 'remove the string-ness.' Look at what <code>ignore()</code> does to the formatting characters.",
        lang: "stata",
        code: "list income in 1/3\n* income: \"45000\" \"62,500\" \".\"\n\ndestring income, replace ignore(\",\")",
        options: [
          "String variable with values \"45000\", \"62500\", \".\"",
          "Numeric variable with values 45000, 62500, and missing (.)",
          "Numeric variable with values 45000, 62500, and 0",
          "The command fails because \".\" cannot be converted to a number"
        ],
        correct: 1,
        explanation: "B is correct: destring converts a string variable to numeric, the ignore(\",\") option strips commas before conversion, and the string \".\" is automatically recognized as Stata's numeric missing value. A is wrong because destring changes the type from string to numeric — that is its entire purpose. C is wrong because Stata treats the string \".\" as its native missing-value symbol, not as zero. D is wrong because Stata specifically recognizes \".\" as a valid representation of missing during destring, so no error occurs."
      },
      // 3 — bug (R): forgetting reassignment with complete.cases
      {
        type: "bug",
        title: "Why Are Missing Values Still There?",
        prompt: "A student runs this code but finds that `df` still contains missing values. What is the bug?",
        hint: "Look carefully at what happens to the result of the subsetting operation. Is it being stored anywhere?",
        lang: "r",
        code: "df <- data.frame(wage = c(45000, NA, 52000, NA))\ndf[complete.cases(df$wage), ]\nprint(df)",
        options: [
          "complete.cases() only works on entire data frames, not individual columns",
          "The result of subsetting is not saved — need df <- df[complete.cases(df$wage), ]",
          "complete.cases() returns TRUE for NA values, so the logic is inverted",
          "NA values in R require na.rm = TRUE to be detected by any function"
        ],
        correct: 1,
        explanation: "B is correct: in R, df[complete.cases(df$wage), ] creates and returns a new data frame with the NA rows removed, but does not modify df in place. Without assigning back (df <- df[...]), the original df is unchanged. A is wrong because complete.cases() works on vectors, data frames, and matrices — it is flexible about input types. C is wrong because complete.cases() returns TRUE for complete (non-NA) rows and FALSE for rows with NA, which is the correct logic for subsetting. D is wrong because complete.cases() inherently handles NA detection without needing na.rm — that parameter belongs to aggregation functions like mean() and sum()."
      },
      // 4 — bug (R): string method on wrong type
      {
        type: "bug",
        title: "String Padding Produces Unexpected Results on Numeric Data",
        prompt: "This R code is meant to zero-pad zip codes. What is the potential problem?",
        hint: "Check the data type of <code>zipcode</code>. What type does <code>data.frame()</code> create from plain numbers? Does <code>str_pad</code> expect that type?",
        lang: "r",
        code: "library(dplyr)\nlibrary(stringr)\n\ndf <- data.frame(zipcode = c(75001, 75002, 75003))\ndf <- df %>%\n  mutate(zipcode = str_pad(zipcode, width = 5, pad = \"0\"))",
        options: [
          "str_pad does not exist in the stringr package — use formatC() instead",
          "The pipe operator %>% cannot be used inside mutate()",
          "zipcode is numeric — str_pad coerces it implicitly, which can produce unexpected results with scientific notation or decimals",
          "width = 5 is too small because zip codes can have 9 digits with the +4 extension"
        ],
        correct: 2,
        explanation: "C is correct: zipcode is stored as numeric (double), and str_pad implicitly coerces it to character. For these small integers the output looks correct, but for large numbers R may use scientific notation (e.g., 1e+05) or trailing decimals (e.g., 75001.0), producing wrong results. Best practice is explicit conversion first: as.character(as.integer(zipcode)). A is wrong because str_pad is a standard stringr function. B is wrong because %>% pipes the data frame into mutate(), which is standard dplyr usage. D is wrong because the exercise is about 5-digit zip codes, and width = 5 is correct for that format."
      },
      // 5 — reorder (Python): basic cleaning pipeline
      {
        type: "reorder",
        title: "Order a Basic Cleaning Pipeline",
        prompt: "Arrange these lines to: load data, drop missing income, convert education to integer, then save.",
        hint: "Think about why you need to drop missing values <b>before</b> converting types. What happens if you try <code>.astype(int)</code> on a column with NaN?",
        lang: "python",
        lines: [
          "df.to_csv('cleaned.csv', index=False)",
          "df['education'] = df['education'].astype(int)",
          "df = pd.read_csv('survey.csv')",
          "df = df.dropna(subset=['income'])"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "The correct sequence is: (1) pd.read_csv loads the raw data — you cannot clean what you have not loaded. (2) dropna removes rows with missing income — this must come before type conversion because NaN cannot be cast to int (pandas raises an IntCastingNaNError). (3) astype(int) converts education to integer — safe only after NaN rows are gone. (4) to_csv saves the result — this must be last because saving before cleaning would write dirty data."
      },
      // 6 — reorder (Stata): destring and clean
      {
        type: "reorder",
        title: "Order a Stata Cleaning Workflow",
        prompt: "Arrange these Stata commands in the correct order to clean income data.",
        hint: "Start by loading data. You must convert from string to numeric (<code>destring</code>) before you can use numeric operations like <code>drop if missing()</code> or <code>round()</code>.",
        lang: "stata",
        lines: [
          "drop if missing(income)",
          "replace income = round(income, 1)",
          "use \"raw_survey.dta\", clear",
          "destring income, replace ignore(\"$,\")"
        ],
        correctOrder: [2, 3, 0, 1],
        explanation: "The correct order is: (1) use loads the dataset — required before any operation. (2) destring converts income from string to numeric — the $ and comma characters must be stripped before Stata can treat income as a number. (3) drop if missing removes observations with missing income — this requires income to already be numeric, since missing() checks for Stata's numeric missing value (.). (4) round cleans up decimal places — only meaningful on numeric, non-missing data."
      },
      // 7 — fill (Python): fillna with mean
      {
        type: "fill",
        title: "Mean Imputation in Python",
        prompt: "Fill in the gap to replace missing income values with the column mean. Type an expression using <code>df['income']</code> and a pandas method.",
        hint: "Use the <code>.mean()</code> method on <code>df['income']</code> to compute the average of non-missing values.",
        lang: "python",
        codeTemplate: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({'income': [50000, np.nan, 72000, np.nan, 61000]})\ndf['income'] = df['income'].fillna(___FILL___)",
        gaps: {
          "FILL": {
            answer: "df['income'].mean()",
            accept: ["df['income'].mean()", "df.income.mean()", "df[\"income\"].mean()"]
          }
        },
        explanation: "The gap teaches how to combine fillna() with an aggregate function. df['income'].mean() computes the mean of the 3 non-missing values (61000), which fillna() then uses to replace each NaN. A common mistake is writing just mean() without specifying the column, or using np.mean(df['income']) which includes NaN by default and returns NaN. Note that mean imputation reduces variance — all imputed values equal the mean, compressing the distribution."
      },
      // 8 — match: cleaning operations across languages
      {
        type: "match",
        title: "Cleaning Operations Across Languages",
        prompt: "Match each cleaning task with the correct code.",
        hint: "Look for language-specific keywords: <code>dropna</code> and <code>fillna</code> are pandas (Python), <code>destring</code> is Stata, and <code>trimws</code> is R.",
        pairs: [
          { left: "Drop rows where wage is missing", leftLang: "text", right: "df = df.dropna(subset=['wage'])", rightLang: "python" },
          { left: "Convert string to numeric in Stata", leftLang: "text", right: "destring wage, replace", rightLang: "stata" },
          { left: "Trim whitespace from names in R", leftLang: "text", right: "df$name <- trimws(df$name)", rightLang: "r" },
          { left: "Replace missing with zero in Python", leftLang: "text", right: "df['wage'] = df['wage'].fillna(0)", rightLang: "python" }
        ],
        explanation: "The key syntactic differences: Python pandas uses method chaining (df.dropna(), df.fillna()) with column selection via bracket notation. Stata uses standalone commands (destring) that act on named variables. R uses base functions (trimws) with dollar-sign column access (df$name). Notice that dropna uses subset= to target specific columns, while fillna takes the replacement value directly as an argument."
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
        hint: "Trace each step in order: <code>strip()</code> removes edge spaces, <code>lower()</code> lowercases, and the regex <code>\\s+</code> matches one or more whitespace characters.",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({'name': ['  John  DOE ', ' jane   smith']})\ndf['name'] = (df['name']\n    .str.strip()\n    .str.lower()\n    .str.replace(r'\\s+', ' ', regex=True))\nprint(df['name'].tolist())",
        options: [
          "['John DOE', 'jane smith'] — strip removes spaces but case is preserved",
          "['john doe', 'jane smith'] — stripped, lowercased, and internal spaces collapsed",
          "['john  doe', 'jane   smith'] — internal multiple spaces are not collapsed",
          "['  john  doe ', ' jane   smith'] — no transformation is applied"
        ],
        correct: 1,
        explanation: "B is correct: the chain applies three transformations in order — strip() removes leading/trailing spaces, lower() converts all characters to lowercase, and replace(r'\\s+', ' ', regex=True) collapses runs of internal whitespace into single spaces. A is wrong because lower() is called after strip(), so the case IS changed to lowercase — 'John DOE' would only result if lower() were omitted. C is wrong because the regex \\s+ matches one or more whitespace characters and replaces each match with a single space, which does collapse multiple internal spaces. D is wrong because strip() removes the leading/trailing spaces — this option ignores all three operations entirely."
      },
      // 2 — read (R): conditional assignment with case_when
      {
        type: "read",
        title: "Conditional Assignment with case_when",
        prompt: "What value does income_group take when income is 55000?",
        hint: "<code>case_when</code> evaluates conditions top to bottom and returns the value for the first condition that is TRUE. Check which range 55000 falls into.",
        lang: "r",
        code: "library(dplyr)\n\ndf <- df %>% mutate(\n  income_group = case_when(\n    income < 30000            ~ \"low\",\n    income >= 30000 & income < 60000 ~ \"middle\",\n    income >= 60000           ~ \"high\",\n    TRUE                      ~ \"unknown\"\n  )\n)",
        options: [
          "\"low\" — because case_when always uses the first condition",
          "\"middle\" — because 55000 falls in the range [30000, 60000)",
          "\"high\" — because 55000 is above the median income",
          "\"unknown\" — because 55000 does not match any specific value"
        ],
        correct: 1,
        explanation: "B is correct: case_when evaluates conditions top to bottom. 55000 is not < 30000 (first condition fails), but it IS >= 30000 and < 60000 (second condition is TRUE), so 'middle' is returned. A is wrong because case_when does not always use the first condition — it uses the first TRUE condition, and income < 30000 is FALSE for 55000. C is wrong because the categorization uses explicit thresholds (30000, 60000), not the median — 55000 < 60000 so it does not qualify as 'high'. D is wrong because TRUE ~ 'unknown' is a catch-all for values not matched by any prior condition (like NA), and 55000 is matched by the second condition before reaching TRUE."
      },
      // 3 — bug (Python): regex without regex=True
      {
        type: "bug",
        title: "Why Doesn't the Regex Pattern Remove Digits?",
        prompt: "A student tries to remove all digits from addresses but the code has no effect. What is the bug?",
        hint: "Think about how <code>str.replace()</code> interprets the first argument. By default in recent pandas, is it treated as a regex or a literal string?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.DataFrame({'address': ['123 Main St', '456 Oak Ave']})\ndf['address'] = df['address'].str.replace('\\d+', '')\nprint(df['address'].tolist())",
        options: [
          "The regex pattern \\d+ does not match digits — use [0-9]+ instead",
          "str.replace needs regex=True to interpret the pattern as a regex",
          "str.replace cannot accept an empty replacement string",
          "The backslash must be doubled to \\\\d+ for the regex to work"
        ],
        correct: 1,
        explanation: "B is correct: since pandas 1.2+, str.replace() defaults to regex=False for safety, so '\\d+' is treated as a literal string (looking for the characters backslash, d, plus), not as a regex pattern. The fix is df['address'].str.replace('\\d+', '', regex=True). A is wrong because \\d+ is a perfectly valid regex for matching digits — it is equivalent to [0-9]+. C is wrong because an empty string '' is a valid replacement that effectively deletes the matched text. D is wrong because Python raw strings or single backslashes work correctly inside the string — the issue is the regex=False default, not string escaping."
      },
      // 4 — bug (Stata): blanket drop vs targeted drop
      {
        type: "bug",
        title: "Too Many Observations Dropped",
        prompt: "A student wants to drop observations where income is missing, but loses far more rows than expected. What is the bug?",
        hint: "Look at what variables are inside the <code>missing()</code> function. How does <code>missing()</code> behave when given multiple variables?",
        lang: "stata",
        code: "use survey.dta, clear\n* Want to keep only rows where income is non-missing\ndrop if missing(income, education, age, region)\ncount",
        options: [
          "The missing() function requires a single variable — multiple arguments cause a syntax error",
          "missing() with multiple variables drops rows where ANY variable is missing, not just income",
          "drop if should be replaced with keep if !missing() for correct behavior",
          "The count command itself deletes observations from memory"
        ],
        correct: 1,
        explanation: "B is correct: missing(income, education, age, region) returns true if ANY of those variables has a missing value, so rows missing education, age, or region are also dropped even though the student only intended to drop missing income. The fix is drop if missing(income). A is wrong because Stata's missing() function does accept multiple arguments — it returns true if any argument is missing, which is valid syntax. C is wrong because while keep if !missing(income) would achieve the same goal for a single variable, the real bug is passing extra variables, not the choice between drop if and keep if. D is wrong because count simply displays the number of observations without modifying the dataset."
      },
      // 5 — reorder (Python): imputation with indicator
      {
        type: "reorder",
        title: "Imputation with Missing Indicator",
        prompt: "Arrange these lines to create a missing indicator BEFORE imputing income with the median.",
        hint: "The key constraint is that you must record which values are missing <b>before</b> filling them. Once you <code>fillna()</code>, you cannot tell which values were originally NaN.",
        lang: "python",
        lines: [
          "df['income'] = df['income'].fillna(df['income'].median())",
          "df = pd.read_csv('survey.csv')",
          "df['income_was_missing'] = df['income'].isna().astype(int)",
          "import pandas as pd"
        ],
        correctOrder: [3, 1, 2, 0],
        explanation: "The correct order is: (1) import pandas — required before any pandas function. (2) read_csv loads the data — must come before any column operations. (3) isna().astype(int) creates the missing indicator — this MUST come before fillna() because once NaN values are replaced, you can no longer identify which values were originally missing. (4) fillna(median()) replaces NaN with the median — safe to do last because the indicator already captured which rows had missing data."
      },
      // 6 — reorder (R): duplicates and winsorization
      {
        type: "reorder",
        title: "Remove Duplicates then Winsorize in R",
        prompt: "Arrange these R commands to deduplicate on firm_id, compute quantile bounds, then clip outliers.",
        hint: "Deduplication must come first so repeated firms do not distort the quantiles. Then compute bounds, then clip with <code>pmin</code>/<code>pmax</code>.",
        lang: "r",
        lines: [
          "df$revenue <- pmin(pmax(df$revenue, q01), q99)",
          "q01 <- quantile(df$revenue, 0.01, na.rm = TRUE)",
          "q99 <- quantile(df$revenue, 0.99, na.rm = TRUE)",
          "df <- df %>% distinct(firm_id, .keep_all = TRUE)"
        ],
        correctOrder: [3, 1, 2, 0],
        explanation: "The correct order is: (1) distinct() removes duplicate firms — this must come first because duplicate firms would distort quantile computation (a firm appearing 50 times has 50x the influence on percentile boundaries). (2-3) quantile() computes the 1st and 99th percentiles — these depend on the deduplicated distribution. (4) pmin(pmax(...)) clips outliers to the computed bounds — this must come last because it requires q01 and q99 to already exist."
      },
      // 7 — fill (Stata): conditional replacement with replace if
      {
        type: "fill",
        title: "Conditional Replacement in Stata",
        prompt: "Fill in the gap to set income to missing for all observations where income is negative. Type a <code>replace</code> command using <code>.</code> for missing and an <code>if</code> condition.",
        hint: "Stata syntax: <code>replace varname = value if condition</code>. The missing value in Stata is represented by a dot (<code>.</code>).",
        lang: "stata",
        codeTemplate: "* income contains: 50000, -999, 72000, -1, 61000\n___REPLACE___",
        gaps: {
          "REPLACE": {
            answer: "replace income = . if income < 0",
            accept: ["replace income = . if income < 0", "replace income=. if income<0", "replace income = . if income<0"]
          }
        },
        explanation: "The gap teaches the Stata replace...if pattern for conditional assignment. replace income = . sets income to Stata's numeric missing value (the dot), and the if income < 0 qualifier restricts this to observations where income is negative. A common mistake is writing replace income = NA (R syntax) or replace income = NaN (Python syntax) — Stata uses . exclusively. Another mistake is forgetting the if clause, which would set ALL observations to missing."
      },
      // 8 — match: Python vs R cleaning equivalents
      {
        type: "match",
        title: "Cleaning Equivalents: Python vs R",
        prompt: "Match each Python cleaning operation with its R equivalent.",
        hint: "Look for functional parallels: <code>str.lower()</code> matches <code>tolower()</code>, <code>fillna()</code> matches direct assignment with <code>is.na()</code>, etc.",
        pairs: [
          { left: "df['x'].str.lower()", leftLang: "python", right: "tolower(df$x)", rightLang: "r" },
          { left: "df['x'].fillna(df['x'].mean())", leftLang: "python", right: "df$x[is.na(df$x)] <- mean(df$x, na.rm=TRUE)", rightLang: "r" },
          { left: "df.drop_duplicates(subset=['id'])", leftLang: "python", right: "df %>% distinct(id, .keep_all = TRUE)", rightLang: "r" },
          { left: "df['x'].clip(lower=q01, upper=q99)", leftLang: "python", right: "pmin(pmax(df$x, q01), q99)", rightLang: "r" }
        ],
        explanation: "The key syntactic differences: Python uses method chaining on Series objects (str.lower(), fillna(), clip()), while R uses standalone functions (tolower(), is.na()) or dplyr verbs (distinct()). For imputation, Python's fillna() is a single method call, whereas R requires subsetting with is.na() and direct assignment. For winsorization, Python's clip() takes named lower/upper arguments, while R nests pmax (floor) inside pmin (ceiling). For deduplication, Python's drop_duplicates(subset=) maps to dplyr's distinct() with .keep_all = TRUE to retain all columns."
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
        hint: "<code>np.where(condition, value_if_true, value_if_false)</code> — check each wage value against <code>> 0</code>. Pay special attention to <code>0</code> itself.",
        lang: "python",
        code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({'wage': [50000, -999, 72000, 0, 61000]})\ndf['wage_clean'] = np.where(\n    df['wage'] > 0,\n    df['wage'],\n    np.nan\n)\nprint(df['wage_clean'].tolist())",
        options: [
          "[50000, NaN, 72000, NaN, 61000] — all non-positive values become NaN",
          "[50000, NaN, 72000, 0, 61000] — only strictly negative values become NaN",
          "[50000, -999, 72000, 0, 61000] — np.where does not modify the original values",
          "[NaN, -999, NaN, 0, NaN] — the condition logic is inverted"
        ],
        correct: 0,
        explanation: "A is correct: np.where(df['wage'] > 0, df['wage'], np.nan) checks each element — 50000, 72000, and 61000 are > 0 (kept), while -999 and 0 are NOT > 0 (replaced with NaN). The subtlety is that 0 > 0 is False, so zero also becomes NaN. B is wrong because it assumes 0 > 0 is True — it is False, so 0 is replaced with NaN just like -999. C is wrong because np.where creates a new array with the replacements applied — it does not leave values unchanged. D is wrong because it inverts the logic: np.where keeps values where the condition is True (positive wages) and replaces where False (non-positive)."
      },
      // 2 — read (Stata): merge diagnostics
      {
        type: "read",
        title: "Merge Diagnostics in Stata",
        prompt: "What does the tabulation of _merge tell you about the data quality of this merge?",
        hint: "In Stata, <code>_merge</code> has three categories: master only (in left dataset only), using only (in right dataset only), and matched (in both). Read the frequency table carefully.",
        lang: "stata",
        code: "use firms.dta, clear\nmerge 1:1 firm_id using financials.dta\ntab _merge\n\n*  _merge     |   Freq.\n* -----------+---------\n*  master only|     150\n*  matched    |     800\n*  using only |      50",
        options: [
          "The merge failed — 200 observations were lost and should be recovered",
          "150 firms lack financial data, 50 financial records lack firm data, and 800 matched successfully",
          "All 1000 observations merged successfully with no data quality issues",
          "There are 150 duplicate firm_ids in firms.dta causing the mismatch"
        ],
        correct: 1,
        explanation: "B is correct: _merge == 'master only' means 150 firms in firms.dta have no match in financials.dta (missing financial data). _merge == 'using only' means 50 records in financials.dta have no match in firms.dta (orphan financial records). _merge == 'matched' means 800 records linked successfully. A is wrong because the merge did not fail — Stata completed it and reported diagnostics; unmatched records are expected and require investigation, not automatic recovery. C is wrong because only 800 of the 1000 observations matched — the 200 unmatched records represent potential data quality issues. D is wrong because a 1:1 merge would produce an error if firm_id had duplicates in the master data; the 150 'master only' records are unique firms without financial data."
      },
      // 3 — bug (Python): mean imputation without indicator
      {
        type: "bug",
        title: "Imputation Destroys Distributional Information",
        prompt: "A student imputes missing wages with the mean. Their regression coefficient on wage later has a smaller standard error than expected. What went wrong?",
        hint: "Think about what happens to the distribution of wage when 30% of values are all replaced by the same number. How does that affect variance?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.read_csv('survey.csv')\n# 30% of wages are missing\ndf['wage'] = df['wage'].fillna(df['wage'].mean())\n\n# Later: regression uses wage as predictor\n# Coefficient SE is suspiciously small",
        options: [
          "fillna should use the median instead of the mean because the mean is sensitive to outliers",
          "Mean imputation reduces variance — 30% of values become identical, artificially inflating precision",
          "The mean was computed on the full column including NaN, producing NaN as the fill value",
          "fillna modifies the data in place and corrupts the original column for other analyses"
        ],
        correct: 1,
        explanation: "B is correct: mean imputation replaces all 30% of missing values with the exact same number, compressing the wage distribution toward the center and shrinking variance. This makes downstream standard errors artificially small, producing overconfident inference. A is wrong because switching from mean to median does not solve the core problem — median imputation also replaces all NaN with a single identical value, producing the same variance compression. C is wrong because pandas' mean() automatically excludes NaN, so it computes a valid mean of the observed values. D is wrong because fillna returns a new Series by default (inplace=False), and even when reassigned, the issue is distributional bias, not data corruption."
      },
      // 4 — bug (R): string methods on non-string column
      {
        type: "bug",
        title: "String Cleaning on the Wrong Type",
        prompt: "This code produces unexpected results when cleaning firm IDs. What is the bug?",
        hint: "Check the type of <code>firm_id</code>. When R coerces a numeric (double) to character, the representation may not be what you expect.",
        lang: "r",
        code: "library(dplyr)\nlibrary(stringr)\n\ndf <- data.frame(firm_id = c(1001, 2002, 3003))\ndf <- df %>%\n  mutate(firm_id = str_replace(firm_id, \"00\", \"-\"))",
        options: [
          "str_replace requires the pattern to be a compiled regex object, not a plain string",
          "firm_id is numeric — implicit coercion to string may produce '1001.000' instead of '1001'",
          "str_replace only replaces the first match — should use str_replace_all to replace all '00' substrings",
          "mutate cannot modify an existing column — it can only create new columns"
        ],
        correct: 1,
        explanation: "B is correct: firm_id is stored as numeric (double). When R implicitly coerces it to character for str_replace, the representation depends on options(digits) and the value — it may render as '1001', '1001.000', or even in scientific notation for large numbers, producing unexpected replacement results. The fix is explicit conversion: as.character(as.integer(firm_id)). A is wrong because str_replace accepts plain strings and treats them as regex patterns (or fixed strings with fixed()). C is wrong because while str_replace does only replace the first match, the primary bug is the type coercion — using str_replace_all on a numeric column would still have the same type issue. D is wrong because mutate() can both create new columns and overwrite existing ones."
      },
      // 5 — reorder (Python): full cleaning pipeline
      {
        type: "reorder",
        title: "Complete Data Cleaning Pipeline",
        prompt: "Arrange these steps in the correct order for a robust cleaning pipeline.",
        hint: "Deduplicate first so stats are not distorted. Create the missing indicator before imputation. Compute quantile bounds before clipping.",
        lang: "python",
        lines: [
          "df = df.drop_duplicates(subset=['firm_id', 'year'])",
          "df['revenue_was_missing'] = df['revenue'].isna().astype(int)",
          "df['revenue'] = df['revenue'].clip(lower=q01, upper=q99)",
          "df['revenue'] = df['revenue'].fillna(df['revenue'].median())",
          "q01, q99 = df['revenue'].quantile(0.01), df['revenue'].quantile(0.99)"
        ],
        correctOrder: [0, 1, 4, 3, 2],
        explanation: "The correct order is: (1) drop_duplicates must come first because duplicate firm-year observations would inflate quantile estimates and bias statistics. (2) isna() creates the missing indicator — this must come before fillna() because after imputation you cannot tell which values were originally missing. (3) quantile() computes percentile bounds — uses the distribution after deduplication. (4) fillna(median()) imputes missing values — must happen before clip() so that clipping applies to all values including imputed ones. (5) clip() winsorizes — requires q01/q99 and imputed data to exist."
      },
      // 6 — reorder (Stata): cleaning with merge check
      {
        type: "reorder",
        title: "Stata Cleaning with Merge Diagnostics",
        prompt: "Arrange these Stata commands to merge datasets and verify the result.",
        hint: "The workflow is: load data, merge, inspect <code>_merge</code>, keep only matched observations, then clean up the <code>_merge</code> variable.",
        lang: "stata",
        lines: [
          "drop if _merge != 3",
          "merge 1:1 firm_id using financials.dta",
          "tab _merge",
          "use firms.dta, clear",
          "drop _merge"
        ],
        correctOrder: [3, 1, 2, 0, 4],
        explanation: "The correct order is: (1) use loads the master dataset — required before any merge. (2) merge links with the using dataset — creates the _merge variable. (3) tab _merge inspects match quality — you must look at the diagnostics BEFORE deciding what to drop; skipping this step means you cannot detect data issues. (4) drop if _merge != 3 keeps only matched observations — this decision should be informed by the tab results. (5) drop _merge removes the diagnostic variable — must come last because earlier steps reference _merge."
      },
      // 7 — fill (R): winsorization
      {
        type: "fill",
        title: "Winsorize Outliers in R",
        prompt: "Fill in the gap to clip revenue to the 1st and 99th percentiles using <code>pmin</code> and <code>pmax</code>. Use the variables <code>df$revenue</code>, <code>q01</code>, and <code>q99</code>.",
        hint: "Nest <code>pmax()</code> inside <code>pmin()</code>: first set a floor with <code>pmax(df$revenue, q01)</code>, then cap the ceiling with <code>pmin(..., q99)</code>.",
        lang: "r",
        codeTemplate: "q01 <- quantile(df$revenue, 0.01, na.rm = TRUE)\nq99 <- quantile(df$revenue, 0.99, na.rm = TRUE)\ndf$revenue <- ___CLIP___",
        gaps: {
          "CLIP": {
            answer: "pmin(pmax(df$revenue, q01), q99)",
            accept: ["pmin(pmax(df$revenue, q01), q99)", "pmin(pmax(df$revenue,q01),q99)"]
          }
        },
        explanation: "The gap teaches the nested pmin/pmax pattern for two-sided clipping. pmax(df$revenue, q01) sets a floor by replacing values below q01 with q01 (element-wise maximum). pmin(..., q99) then sets a ceiling by replacing values above q99 with q99. A common mistake is reversing the nesting order — pmax(pmin(..., q99), q01) — which works identically in this case but is harder to read. Another mistake is using max/min (which return single values) instead of pmax/pmin (which operate element-wise)."
      },
      // 8 — match: diagnosing data quality issues
      {
        type: "match",
        title: "Data Quality Checks Across Languages",
        prompt: "Match each data quality check with the correct implementation.",
        hint: "Identify the language of each code snippet first (Python uses <code>df[...]</code>, Stata uses <code>tab</code>, R uses <code>colSums</code>), then match by the operation described.",
        pairs: [
          { left: "Check for duplicate keys", leftLang: "text", right: "df.duplicated(subset=['firm_id', 'year']).sum()", rightLang: "python" },
          { left: "Inspect merge quality", leftLang: "text", right: "tab _merge", rightLang: "stata" },
          { left: "Count missing by column", leftLang: "text", right: "colSums(is.na(df))", rightLang: "r" },
          { left: "Identify outliers beyond 3 SD", leftLang: "text", right: "df[abs(df['x'] - df['x'].mean()) > 3*df['x'].std()]", rightLang: "python" }
        ],
        explanation: "Each check uses language-specific idioms: Python's duplicated() returns a boolean Series that sum() counts, leveraging True=1. Stata's tab _merge exploits the built-in _merge variable created by the merge command. R's colSums(is.na(df)) combines is.na() (returns a logical matrix) with colSums() (sums each column). The outlier detection in Python uses vectorized boolean indexing with abs() for the z-score threshold. Note that Python uses method chaining (df.duplicated().sum()) while R nests function calls (colSums(is.na()))."
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
        hint: "Look at the <code>cov_type</code> parameter passed to <code>.fit()</code>. HC1 is a specific type of variance-covariance estimator.",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('wage ~ education + experience', data=df)\nresults = model.fit(cov_type='HC1')\nprint(results.summary())",
        options: [
          "Classical (homoskedastic) standard errors assuming constant error variance",
          "Heteroskedasticity-robust (HC1) standard errors, valid without constant variance",
          "Clustered standard errors accounting for within-group correlation",
          "Bootstrapped standard errors estimated by resampling the data"
        ],
        correct: 1,
        explanation: "B is correct: cov_type='HC1' specifies heteroskedasticity-consistent standard errors (the HC1 variant matches Stata's robust option), which are valid even when error variance differs across observations. A is wrong because classical SEs are the default when .fit() is called without cov_type — specifying HC1 explicitly overrides that default. C is wrong because clustered SEs require cov_type='cluster' with a cov_kwds argument specifying the grouping variable — HC1 handles heteroskedasticity but not within-group correlation. D is wrong because bootstrapped SEs require resampling the data many times and re-estimating — HC1 is an analytical formula, not a resampling procedure."
      },
      // 2 — read (Stata): basic regression with robust
      {
        type: "read",
        title: "Interpreting Stata Regression Syntax",
        prompt: "What does this Stata command estimate?",
        hint: "The <code>reg</code> command runs OLS. The <code>i.</code> prefix creates indicator (dummy) variables. The <code>robust</code> option affects standard errors.",
        lang: "stata",
        code: "reg wage education experience i.female, robust",
        options: [
          "A logistic regression of wage on education, experience, and female",
          "An OLS regression with robust SEs, where i.female creates a dummy variable",
          "A fixed-effects regression with entity fixed effects for each female value",
          "A regression with standard errors clustered by the female variable"
        ],
        correct: 1,
        explanation: "B is correct: reg runs OLS, the i. prefix creates indicator (dummy) variables from the female variable, and robust requests heteroskedasticity-robust standard errors (HC1). A is wrong because logistic regression in Stata uses the logit or logistic command, not reg — reg always runs OLS. C is wrong because i.female creates a single dummy variable, not entity fixed effects — fixed effects would use xtreg or absorb(). D is wrong because clustering requires the cluster(varname) option — robust only handles heteroskedasticity, not within-group correlation."
      },
      // 3 — bug (Python): classical SEs instead of robust
      {
        type: "bug",
        title: "Why Might These Standard Errors Be Wrong?",
        prompt: "A student finds p < 0.01 but their advisor says the standard errors are unreliable. What is the bug?",
        hint: "Compare this <code>.fit()</code> call to the previous exercise. What is missing from the arguments?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('income ~ education + age', data=df)\nresults = model.fit()\nprint(results.pvalues)",
        options: [
          "The formula should use C(education) to treat education as categorical",
          ".fit() without cov_type uses classical SEs, which assume homoskedasticity — use .fit(cov_type='HC1') instead",
          "pvalues is not a valid attribute — use results.f_pvalue instead",
          "The model needs to include an intercept explicitly with + 1 in the formula"
        ],
        correct: 1,
        explanation: "B is correct: calling .fit() without specifying cov_type defaults to classical OLS standard errors, which assume the error variance is constant across all observations (homoskedasticity). In economics data, this assumption rarely holds, making the SEs — and therefore p-values — unreliable. A is wrong because education as a continuous variable is appropriate in most wage regressions — treating it as categorical would create a dummy for every education level. C is wrong because pvalues is a valid attribute of OLS results that returns p-values for each coefficient. D is wrong because statsmodels formulas include an intercept by default — you would need to write -1 or +0 to remove it."
      },
      // 4 — bug (R): wrong interaction syntax
      {
        type: "bug",
        title: "Unintended Main Effect in Interaction Model",
        prompt: "A student wants to include education and its interaction with female, but NOT the main effect of female. The model includes female anyway. Why?",
        hint: "In R formulas, <code>*</code> and <code>:</code> have different meanings. One includes main effects automatically, the other does not.",
        lang: "r",
        code: "model <- lm(wage ~ education * female, data = df)\nsummary(model)",
        options: [
          "The * operator is not valid in R formulas — use interaction() instead",
          "education * female expands to education + female + education:female — use : to get only the interaction",
          "The interaction must be wrapped in I() as I(education * female) to prevent expansion",
          "lm() automatically includes all lower-order terms regardless of the formula syntax"
        ],
        correct: 1,
        explanation: "B is correct: in R formula syntax, A * B is shorthand for A + B + A:B, which includes both main effects and the interaction. To include education and its interaction with female without the female main effect, write: wage ~ education + education:female. A is wrong because * is a valid and commonly used formula operator in R. C is wrong because I() prevents arithmetic interpretation (e.g., I(x^2) for a squared term), but education * female is already interpreted as a formula operator, not arithmetic — I(education * female) would compute the literal product. D is wrong because lm() respects the formula exactly — if you use : instead of *, it includes only the interaction."
      },
      // 5 — reorder (Python): estimation workflow
      {
        type: "reorder",
        title: "Order an OLS Estimation Workflow",
        prompt: "Arrange these lines to run an OLS regression with robust SEs and display results.",
        hint: "The workflow is: import, define the model, fit with robust SEs, then print. The <code>.ols()</code> call defines the model; <code>.fit()</code> actually estimates it.",
        lang: "python",
        lines: [
          "print(results.summary())",
          "results = model.fit(cov_type='HC1')",
          "import statsmodels.formula.api as smf",
          "model = smf.ols('wage ~ education + experience', data=df)"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "The correct order is: (1) import the module — required before calling smf.ols. (2) smf.ols() defines the model formula and data — this creates the model object but does not estimate it. (3) model.fit(cov_type='HC1') performs the actual estimation with robust SEs — this requires the model object to exist. (4) print(results.summary()) displays the results — this requires the fitted results object from .fit()."
      },
      // 6 — reorder (R): regression with table export
      {
        type: "reorder",
        title: "R Regression and Export Workflow",
        prompt: "Arrange these R commands to estimate two models and export a comparison table.",
        hint: "Load the package first, then estimate both models (simple before complex), and finally export. <code>msummary()</code> needs the fitted model objects to exist before it can create the table.",
        lang: "r",
        lines: [
          "msummary(list(m1, m2), output = 'table.tex', stars = c('*' = 0.1, '**' = 0.05, '***' = 0.01))",
          "m1 <- lm(wage ~ education, data = df)",
          "m2 <- lm(wage ~ education + experience + female, data = df)",
          "library(modelsummary)"
        ],
        correctOrder: [3, 1, 2, 0],
        explanation: "The correct order is: (1) library(modelsummary) loads the package — required before msummary() is available. (2) m1 estimates the simple model — building from simple to complex is standard practice. (3) m2 estimates the full model — it can reference the same data as m1. (4) msummary() creates the comparison table — it requires both m1 and m2 to exist. The list() function passes both models so they appear as columns in the LaTeX output."
      },
      // 7 — fill (Stata): clustered SEs
      {
        type: "fill",
        title: "Clustered Standard Errors in Stata",
        prompt: "Fill in the gap to cluster standard errors at the firm level. Type <code>cluster(firm_id)</code> or <code>vce(cluster firm_id)</code>.",
        hint: "Stata syntax for clustering: <code>cluster(varname)</code> after the comma in a <code>reg</code> command.",
        lang: "stata",
        codeTemplate: "reg wage education experience, ___CLUSTER___",
        gaps: {
          "CLUSTER": {
            answer: "cluster(firm_id)",
            accept: ["cluster(firm_id)", "vce(cluster firm_id)"]
          }
        },
        explanation: "The gap teaches the Stata clustering syntax. cluster(firm_id) tells Stata to compute standard errors that account for within-firm correlation of errors. A common mistake is writing robust instead of cluster() — robust handles heteroskedasticity but not within-firm correlation. Another mistake is cluster(firm_id, year) — Stata's cluster() accepts only one variable; for two-way clustering, use reghdfe or ivreg2 with cluster(firm_id year)."
      },
      // 8 — match: regression concepts across languages
      {
        type: "match",
        title: "Regression Commands Across Languages",
        prompt: "Match each estimation task with the correct command.",
        hint: "Identify the language of each command: <code>smf.ols</code> is Python, <code>xtreg</code> is Stata, <code>glm</code> is R. Then match by the estimation method described.",
        pairs: [
          { left: "OLS with robust SEs", leftLang: "text", right: "smf.ols(...).fit(cov_type='HC1')", rightLang: "python" },
          { left: "Fixed effects regression", leftLang: "text", right: "xtreg y x, fe robust", rightLang: "stata" },
          { left: "Logistic regression", leftLang: "text", right: "glm(y ~ x, family = binomial, data = df)", rightLang: "r" }
        ],
        explanation: "The key differences: Python's statsmodels separates model definition (.ols()) from estimation (.fit()), and SE type is a fit-time argument. Stata's xtreg with fe absorbs entity fixed effects and robust adds heteroskedasticity-robust SEs in one command. R's glm() uses the family argument to specify the link function — binomial gives logistic regression, gaussian (default) gives OLS. Note that Stata uses a comma to separate the model from options, while Python uses named arguments and R uses function parameters."
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
        prompt: "What does the `cov_kwds` argument control in this regression?",
        hint: "Look at <code>cov_type='cluster'</code> together with <code>cov_kwds</code>. The keyword arguments configure <b>how</b> the clustering is done — specifically which variable defines the groups.",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('revenue ~ rd_spending + capital', data=df)\nresults = model.fit(\n    cov_type='cluster',\n    cov_kwds={'groups': df['firm_id']}\n)\nprint(results.summary())",
        options: [
          "It adds firm_id as a control variable in the regression equation",
          "It specifies firm_id as the grouping variable for clustered standard errors",
          "It runs a separate regression for each distinct firm_id",
          "It weights each observation by the number of observations in its firm"
        ],
        correct: 1,
        explanation: "B is correct: cov_kwds={'groups': df['firm_id']} tells statsmodels which variable defines the clusters for cluster-robust SE computation. The regression coefficients are identical to non-clustered OLS — only the standard errors change. A is wrong because control variables go in the formula string ('revenue ~ rd_spending + capital + firm_id'), not in cov_kwds — cov_kwds only affects the variance-covariance matrix of the estimator. C is wrong because cov_type='cluster' computes a single set of coefficients with adjusted SEs, not separate regressions per group — that would be a group-by regression or random-coefficients model. D is wrong because weighting uses the weights parameter in .fit() or WLS — clustering adjusts SEs for within-group correlation, not observation weights."
      },
      // 2 — read (R): fixed effects with feols
      {
        type: "read",
        title: "Two-Way Fixed Effects in R",
        prompt: "What fixed effects are included in this model?",
        hint: "In <code>feols</code>, variables after the <code>|</code> are fixed effects, and <code>cluster = ~firm_id</code> controls standard error computation. These are separate concepts.",
        lang: "r",
        code: "library(fixest)\n\nmodel <- feols(\n  log_wage ~ education + experience | firm_id + year,\n  cluster = ~firm_id,\n  data = panel\n)",
        options: [
          "Only firm fixed effects, with year as a control variable",
          "Only year fixed effects, with firm_id used only for clustering",
          "Both firm and year fixed effects, with SEs clustered at the firm level",
          "A firm-by-year interaction fixed effect (one dummy per firm-year pair)"
        ],
        correct: 2,
        explanation: "C is correct: in feols syntax, variables after | are absorbed as fixed effects — firm_id + year includes separate firm and year fixed effects (two-way FE). cluster = ~firm_id separately controls how standard errors are computed. A is wrong because both firm_id and year appear after the |, so both are fixed effects — year is not a regular control variable. B is wrong because firm_id after | makes it a fixed effect, not just a clustering variable — clustering (cluster = ~firm_id) and fixed effects (| firm_id) serve different purposes. D is wrong because firm_id + year creates additive (separate) fixed effects for firms and years, not their interaction — an interaction would be written as firm_id^year."
      },
      // 3 — bug (Python): interpreting logit coefficients as probabilities
      {
        type: "bug",
        title: "Logit Coefficient Misinterpretation",
        prompt: "A student reports: 'One more year of education increases the probability of being hired by 0.45.' Is this interpretation correct?",
        hint: "Think about what logit coefficients actually measure. Are they in probability units or in some other scale?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.logit('hired ~ education + experience', data=df)\nresults = model.fit()\nprint(results.params)\n# education    0.45\n# experience   0.12",
        options: [
          "Yes — logit coefficients directly measure changes in probability",
          "No — logit coefficients are in log-odds units; use .get_margeff() for probability changes",
          "No — the coefficient must be exponentiated (e^0.45) to get the probability change",
          "No — logit coefficients measure changes in the cumulative distribution function"
        ],
        correct: 1,
        explanation: "B is correct: logit coefficients represent changes in log-odds, not probabilities. A coefficient of 0.45 means one more year of education increases the log-odds of hiring by 0.45 units. To get the probability change, use results.get_margeff().summary(). A is wrong because logit uses a nonlinear link function (logistic), so coefficients are in log-odds space, not probability space — only in a linear probability model (OLS with binary outcome) would coefficients equal probability changes. C is wrong because exponentiating gives the odds ratio (e^0.45 = 1.57, meaning odds multiply by 1.57), not a probability change — odds and probabilities are different quantities. D is wrong because the cumulative distribution function describes the probit model (using the normal CDF), not the logit model (which uses the logistic function)."
      },
      // 4 — bug (Stata): post-treatment control
      {
        type: "bug",
        title: "Post-Treatment Bias in a Regression",
        prompt: "A student studies the effect of a job training program on wages. Their advisor says one control variable introduces bias. Which one and why?",
        hint: "Look at when each variable was measured relative to the treatment (training in 2020). Controlling for a variable that is <b>affected by</b> the treatment introduces bias.",
        lang: "stata",
        code: "* Training program assigned randomly in 2020\nreg wage_2021 training age education job_title_2021, robust",
        options: [
          "age — because it is perfectly collinear with birth year and will cause multicollinearity",
          "education — because it is endogenous and correlated with unobserved ability",
          "job_title_2021 — because it is a post-treatment variable that may be affected by the training",
          "wage_2021 — because the outcome should be the change in wage, not the level"
        ],
        correct: 2,
        explanation: "C is correct: job_title_2021 is measured after the training program (which was assigned in 2020), so it may be a consequence of treatment. If training causes a promotion (better job title), which increases wages, controlling for job title blocks this indirect causal path and underestimates the total treatment effect. Only pre-treatment variables should be used as controls. A is wrong because age is pre-determined (measured before treatment) and is not collinear with other variables in this specification — it is a valid control. B is wrong because education is also a pre-treatment variable and, with random assignment, controlling for it improves precision without introducing bias — endogeneity of education is a concern in observational studies, not randomized experiments. D is wrong because wage_2021 is the outcome variable, not a control — using levels vs. changes is a modeling choice, not a source of post-treatment bias."
      },
      // 5 — reorder (R): logit with marginal effects
      {
        type: "reorder",
        title: "Logit Estimation with Marginal Effects in R",
        prompt: "Arrange these lines to estimate a logit model and compute average marginal effects.",
        hint: "Load the package first, then estimate with <code>glm</code>, then compute marginal effects with <code>margins()</code>, and finally display. You need the model object before you can pass it to <code>margins()</code>.",
        lang: "r",
        lines: [
          "summary(ame)",
          "ame <- margins(model)",
          "model <- glm(hired ~ education + experience, family = binomial, data = df)",
          "library(margins)"
        ],
        correctOrder: [3, 2, 1, 0],
        explanation: "The correct order is: (1) library(margins) loads the package — required before margins() is available. (2) glm() estimates the logit model — family = binomial specifies logistic regression, and this must come before margins() because margins() takes a fitted model as input. (3) margins(model) computes average marginal effects — these convert log-odds coefficients into probability changes, which requires the fitted model object. (4) summary(ame) displays the results — this must be last because it needs the ame object to exist."
      },
      // 6 — reorder (Stata): panel regression with fixed effects
      {
        type: "reorder",
        title: "Panel Data Regression in Stata",
        prompt: "Arrange these Stata commands to declare panel structure and run a fixed-effects regression.",
        hint: "You must <code>use</code> the data before <code>xtset</code>, and <code>xtset</code> before <code>xtreg</code>. Display results last.",
        lang: "stata",
        lines: [
          "estimates table m1, se",
          "eststo m1: xtreg wage education experience, fe cluster(firm_id)",
          "xtset firm_id year",
          "use firm_panel.dta, clear"
        ],
        correctOrder: [3, 2, 1, 0],
        explanation: "The correct order is: (1) use loads the data — required before any operation. (2) xtset declares the panel structure — Stata needs to know which variable identifies entities (firm_id) and time (year) before it can run panel estimators. (3) xtreg with fe runs the fixed-effects regression — this requires xtset to have been called, and cluster(firm_id) adjusts SEs for within-firm correlation. (4) estimates table displays results — this requires the estimation to be stored first."
      },
      // 7 — fill (R): interaction term
      {
        type: "fill",
        title: "Interaction Term in R Formula",
        prompt: "Fill in the gap to include education, female, AND their interaction in the model. Type the R formula shorthand using <code>education</code> and <code>female</code>.",
        hint: "In R, the <code>*</code> operator between two variables expands to both main effects plus their interaction: <code>A * B</code> = <code>A + B + A:B</code>.",
        lang: "r",
        codeTemplate: "model <- lm(wage ~ ___FORMULA___, data = df)",
        gaps: {
          "FORMULA": {
            answer: "education * female",
            accept: ["education * female", "education*female", "education + female + education:female"]
          }
        },
        explanation: "The gap teaches R's formula shorthand for interactions. education * female expands to education + female + education:female, which includes both main effects and the interaction term. A common mistake is writing education:female alone, which includes only the interaction and omits the main effect of female — this forces the interaction to also absorb the main effect, biasing the interaction coefficient. Another mistake is I(education * female), which computes the arithmetic product, not the statistical interaction with main effects."
      },
      // 8 — match: estimation output interpretation
      {
        type: "match",
        title: "Interpreting Estimation Output",
        prompt: "Match each statistic with what it tells you.",
        hint: "Think about what each statistic measures: R-squared is about fit, F-statistic is about joint significance, coefficient/SE gives individual significance, and clusters affect inference.",
        pairs: [
          { left: "R-squared = 0.02", leftLang: "text", right: "The model explains 2% of variance in the outcome — common in micro data", rightLang: "text" },
          { left: "F-statistic p < 0.001", leftLang: "text", right: "The predictors are jointly significant — at least one coefficient is nonzero", rightLang: "text" },
          { left: "education coef = 0.08, SE = 0.02", leftLang: "text", right: "One year of education is associated with an 8% wage increase (if log wage), significant at 1%", rightLang: "text" },
          { left: "Observations = 5000, Clusters = 50", leftLang: "text", right: "5000 observations grouped into 50 clusters for SE computation", rightLang: "text" }
        ],
        explanation: "The key conceptual differences: R-squared measures explanatory power (proportion of variance explained) — in micro data with individual-level noise, even 2% can be economically meaningful. The F-statistic tests whether ALL coefficients jointly equal zero — a small p-value means the model as a whole has explanatory power. The coefficient/SE ratio (0.08/0.02 = 4) gives the t-statistic, which determines significance — here t = 4 > 2.58 so it is significant at 1%. Clusters vs observations matters because effective sample size for inference is closer to the number of clusters (50) than the number of observations (5000)."
      }
    ],

    // -----------------------------------------------------------------------
    //  ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 — read (Python): formula interaction syntax
      {
        type: "read",
        title: "Counting Coefficients with Interaction Terms",
        prompt: "How many estimated coefficients does this model have (including intercept)?",
        hint: "Count the terms: the intercept is always implicit in <code>statsmodels</code> formulas. The <code>:</code> operator creates only the interaction, not the main effects.",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\nmodel = smf.ols('wage ~ education + experience + education:experience', data=df)\nresults = model.fit(cov_type='HC1')",
        options: [
          "3 — education, experience, and the interaction only",
          "4 — intercept, education, experience, and education:experience",
          "5 — intercept, education, experience, education:experience, and a redundant main effect",
          "2 — education and experience only, since : replaces the main effects"
        ],
        correct: 1,
        explanation: "B is correct: the model has 4 coefficients — (1) the intercept (always implicit in statsmodels formulas), (2) education, (3) experience, and (4) education:experience. A is wrong because it forgets the intercept, which is automatically included unless you write -1 or +0 in the formula. C is wrong because no terms are redundant — education:experience creates only the interaction without duplicating main effects, so there are exactly 4 terms. D is wrong because the : operator creates an interaction IN ADDITION to the existing main effects — it does not replace them. Using * instead of separately listing terms would produce the same 4 coefficients."
      },
      // 2 — read (Stata): table export with esttab
      {
        type: "read",
        title: "Exporting Regression Tables in Stata",
        prompt: "What does this esttab command produce?",
        hint: "Look at the <code>keep()</code> option — it controls which coefficients appear in the table. Also note the <code>using</code> clause specifies the output file format.",
        lang: "stata",
        code: "eststo m1: reg wage education, robust\neststo m2: reg wage education experience, robust\neststo m3: reg wage education experience i.female, robust\n\nesttab m1 m2 m3 using \"table1.tex\", replace ///\n  se star(* 0.1 ** 0.05 *** 0.01) ///\n  keep(education experience) ///\n  title(\"Wage Regressions\")",
        options: [
          "A CSV file with raw coefficients and no formatting or significance indicators",
          "A LaTeX table showing only education and experience across 3 model columns with SEs and stars",
          "A LaTeX table with all coefficients including the female dummy and the constant",
          "Three separate LaTeX files, one table per model"
        ],
        correct: 1,
        explanation: "B is correct: esttab produces a single LaTeX table (.tex) with the three models as columns. keep(education experience) displays only those two coefficients, hiding the female dummy and constant. se shows standard errors below coefficients, and star() adds significance stars. A is wrong because the using clause specifies .tex (LaTeX), not .csv — esttab formats for publication with stars and SEs, which a raw CSV would not include. C is wrong because keep(education experience) explicitly restricts the displayed rows to only those two variables — the female dummy and constant are estimated but hidden from the table. D is wrong because esttab with a single using clause creates one file containing all three models side by side as columns."
      },
      // 3 — bug (Python): forgetting to cluster
      {
        type: "bug",
        title: "Robust SEs Are Not Enough for Panel Data",
        prompt: "A student studies firm-level panel data but finds suspiciously small p-values. What is the bug?",
        hint: "With 500 firms observed 10 times each, errors within the same firm are likely correlated. Does <code>HC1</code> handle that kind of correlation?",
        lang: "python",
        code: "import statsmodels.formula.api as smf\n\n# Panel: 500 firms observed over 10 years = 5000 obs\nmodel = smf.ols('revenue ~ rd_spending + capital', data=panel_df)\nresults = model.fit(cov_type='HC1')\nprint(results.pvalues)",
        options: [
          "HC1 is the wrong heteroskedasticity estimator — should use HC3 for small samples",
          "HC1 does not account for within-firm serial correlation — need cov_type='cluster' for valid inference",
          "The model needs firm fixed effects added to the formula to be valid",
          "OLS cannot be used on panel data — must use a panel-specific estimator"
        ],
        correct: 1,
        explanation: "B is correct: with 10 repeated observations per firm, errors within the same firm are likely serially correlated. HC1 handles heteroskedasticity but NOT within-cluster correlation, causing underestimated SEs and inflated t-statistics. The fix is .fit(cov_type='cluster', cov_kwds={'groups': panel_df['firm_id']}). A is wrong because HC3 is a small-sample correction for heteroskedasticity — it still does not handle within-cluster correlation, which is the core issue with panel data. C is wrong because while firm fixed effects may improve the specification, omitting them does not explain the inflated t-statistics — the SE problem comes from ignoring within-firm correlation, not from omitted variables. D is wrong because OLS can be applied to panel data (it is called pooled OLS) — the issue is purely about computing correct standard errors for inference."
      },
      // 4 — bug (R): bootstrap with missing factor levels
      {
        type: "bug",
        title: "Bootstrap Fails with Factor Variables",
        prompt: "A student implements a bootstrap for standard errors but gets errors or inconsistent coefficient counts in some iterations. What is the bug?",
        hint: "When resampling with replacement, some categories of a factor variable may be entirely absent in certain bootstrap samples. What happens to the model matrix then?",
        lang: "r",
        code: "set.seed(42)\nn <- nrow(df)\nboot_coefs <- numeric(1000)\nfor (b in 1:1000) {\n  idx <- sample(1:n, n, replace = TRUE)\n  boot_df <- df[idx, ]\n  # Some bootstrap samples drop a factor level of 'region'\n  m <- lm(wage ~ education + factor(region), data = boot_df)\n  boot_coefs[b] <- coef(m)[\"education\"]\n}",
        options: [
          "replace = TRUE is incorrect — bootstrap should sample without replacement to avoid bias",
          "Some resamples may miss a factor level of region, changing the number of dummies and coefficient positions",
          "numeric(1000) creates a vector of zeros that cannot store regression coefficients",
          "The seed should be set inside the loop so each iteration is independently reproducible"
        ],
        correct: 1,
        explanation: "B is correct: when bootstrapping with factor variables, some resamples may not contain all levels of region. This changes the model matrix (fewer dummy columns), potentially shifting coefficient positions so coef(m)['education'] returns NA or the wrong value. The fix is to pre-define factor levels: factor(region, levels = levels(df$region)). A is wrong because bootstrap fundamentally requires sampling WITH replacement — that is the definition of the nonparametric bootstrap. Without replacement, you just get the original sample permuted. C is wrong because numeric(1000) creates a vector of 1000 zeros, and regression coefficients (doubles) can overwrite those zeros without issue. D is wrong because the seed should be set ONCE before the loop for reproducibility — setting it inside would make every iteration identical."
      },
      // 5 — reorder (R): bootstrap SE computation
      {
        type: "reorder",
        title: "Bootstrap Standard Error Computation in R",
        prompt: "Arrange these R lines to compute a bootstrap standard error for the education coefficient.",
        hint: "Initialize the loop first, then inside each iteration: resample, estimate, store. After the loop, compute the SD of the stored coefficients.",
        lang: "r",
        lines: [
          "se_education <- sd(boot_coefs)",
          "boot_coefs[b] <- coef(m)[\"education\"]",
          "boot_sample <- df[sample(1:n, n, replace = TRUE), ]",
          "n <- nrow(df)\nboot_coefs <- numeric(1000)\nfor (b in 1:1000) {",
          "  m <- lm(wage ~ education, data = boot_sample)"
        ],
        correctOrder: [3, 2, 4, 1, 0],
        explanation: "The correct order is: (1) Initialize n, the storage vector, and the loop — required before any iteration. (2) Resample rows with replacement — each bootstrap iteration needs a fresh resample. (3) Estimate lm on the bootstrap sample — requires boot_sample to exist. (4) Store the education coefficient — requires the model m to be fitted. (5) Compute sd(boot_coefs) after the loop — the standard deviation of the bootstrap coefficients IS the bootstrap standard error. This captures the sampling variability of the estimator."
      },
      // 6 — reorder (Stata): stepwise model building
      {
        type: "reorder",
        title: "Stepwise Model Building in Stata",
        prompt: "Arrange these commands to estimate three nested models and compare them.",
        hint: "Start by clearing stored estimates. Then estimate models from simplest to most complex. Display the comparison table last with <code>esttab</code>.",
        lang: "stata",
        lines: [
          "esttab m1 m2 m3, se r2 star(* 0.1 ** 0.05 *** 0.01)",
          "eststo m2: reg wage education experience, robust",
          "eststo m3: reg wage education experience i.female c.education#c.experience, robust",
          "eststo clear",
          "eststo m1: reg wage education, robust"
        ],
        correctOrder: [3, 4, 1, 2, 0],
        explanation: "The correct order is: (1) eststo clear removes previously stored estimates — prevents contamination from earlier analyses. (2) m1 estimates the simplest model — education only. (3) m2 adds experience — building up gradually. (4) m3 adds the female dummy and the interaction — the c.education#c.experience syntax creates a continuous-by-continuous interaction. (5) esttab displays all three side by side — this must come last because it needs all stored estimates. Building from simple to complex lets readers see how coefficients change as controls are added."
      },
      // 7 — fill (Python): Stargazer table
      {
        type: "fill",
        title: "Regression Table with Stargazer in Python",
        prompt: "Fill in the gap to add a second model to the Stargazer table. Pass a Python list containing <code>model1</code> and <code>model2</code>.",
        hint: "Stargazer expects a list of fitted model objects: <code>[model1, model2]</code>.",
        lang: "python",
        codeTemplate: "from stargazer.stargazer import Stargazer\n\nmodel1 = smf.ols('wage ~ education', data=df).fit(cov_type='HC1')\nmodel2 = smf.ols('wage ~ education + experience', data=df).fit(cov_type='HC1')\n\ntable = Stargazer(___MODELS___)\nprint(table.render_latex())",
        gaps: {
          "MODELS": {
            answer: "[model1, model2]",
            accept: ["[model1, model2]", "[model1,model2]"]
          }
        },
        explanation: "The gap teaches how to pass multiple models to Stargazer for side-by-side comparison. Stargazer expects a Python list of fitted model objects. A common mistake is passing the models as separate arguments — Stargazer(model1, model2) — instead of wrapping them in a list. Another mistake is passing unfitted model objects (before .fit()) — Stargazer needs the results, not the model specification."
      },
      // 8 — match: estimation diagnostics
      {
        type: "match",
        title: "Diagnostic Commands Across Languages",
        prompt: "Match each diagnostic task with the correct command.",
        hint: "Identify the language from the syntax: <code>margins</code> and <code>estat</code> are Stata, <code>plot(model, which=...)</code> is R, and <code>from ... import ...</code> is Python.",
        pairs: [
          { left: "Marginal effects after logit", leftLang: "text", right: "margins, dydx(*)", rightLang: "stata" },
          { left: "Variance inflation factors", leftLang: "text", right: "from statsmodels.stats.outliers_influence import variance_inflation_factor", rightLang: "python" },
          { left: "Breusch-Pagan heteroskedasticity test", leftLang: "text", right: "estat hettest", rightLang: "stata" },
          { left: "Residual vs fitted plot", leftLang: "text", right: "plot(model, which = 1)", rightLang: "r" }
        ],
        explanation: "Each diagnostic uses language-specific syntax: Stata's margins, dydx(*) computes marginal effects for all variables (*) after a logit — dydx means derivative (change in probability per unit change in X). Python imports VIF from statsmodels' outliers_influence module as a function rather than a post-estimation command. Stata's estat hettest is a post-estimation command that tests the null of constant variance (homoskedasticity). R's plot(model, which = 1) produces the first of four diagnostic plots (residuals vs fitted values) — which selects which plot to display."
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
        title: "Difference-in-Differences: Identifying the Treatment Effect",
        prompt: "Which coefficient gives the DiD treatment effect estimate?",
        hint: "In DiD, the treatment effect is captured by the <b>interaction</b> of the group indicator and the time indicator. Which variable is the interaction?",
        lang: "stata",
        code: "gen treat_post = treated * post\nreg outcome treated post treat_post, robust",
        options: [
          "The coefficient on treated — it captures the treatment group's average outcome",
          "The coefficient on post — it captures the time change for all observations",
          "The coefficient on treat_post — it captures the differential change for treated vs control",
          "The intercept — it captures the baseline outcome before any treatment"
        ],
        correct: 2,
        explanation: "C is correct: treat_post = treated * post is the interaction that captures the DIFFERENTIAL change in outcomes for the treated group relative to the control group after the policy. This is the DiD estimand — the 'difference of differences.' A is wrong because the coefficient on treated captures the pre-existing difference between treated and control groups before treatment (the level difference), not the causal effect. B is wrong because the coefficient on post captures the common time trend shared by both treated and control groups — this is the change that would have happened anyway. D is wrong because the intercept is the average outcome for the control group in the pre-treatment period — it is the baseline reference point, not the treatment effect."
      },
      // 2 — read (R): propensity score matching
      {
        type: "read",
        title: "Propensity Score Matching in R",
        prompt: "What does the `matchit()` function do in this code?",
        hint: "The function is from the <code>MatchIt</code> package and uses <code>method = \"nearest\"</code>. Think about what 'nearest neighbor' means in the context of propensity scores.",
        lang: "r",
        code: "library(MatchIt)\n\nm <- matchit(training ~ age + education + income,\n             method = \"nearest\", data = df)\nmatched_df <- match.data(m)\nsummary(m)",
        options: [
          "Runs a regression of training on age, education, and income to test significance",
          "Estimates propensity scores and matches treated to control units using nearest neighbor",
          "Creates a stratified random sample balancing treatment and control groups by size",
          "Tests whether treatment assignment is independent of the covariates (balance test)"
        ],
        correct: 1,
        explanation: "B is correct: matchit() first estimates a propensity score (probability of receiving training given covariates) via logistic regression, then matches each treated unit to the nearest control unit in propensity score distance. match.data() extracts the matched sample. A is wrong because matchit() does estimate a logistic regression internally, but it uses the predicted probabilities for matching, not for hypothesis testing — the goal is pairing, not significance. C is wrong because matchit() pairs specific treated units with specific control units based on similarity, not by creating random strata — matching is deterministic, not random. D is wrong because the balance test is a diagnostic you run AFTER matching (via summary(m)) to verify the matching worked — matchit() itself performs the matching, not the testing."
      },
      // 3 — bug (Stata): DiD without clustering
      {
        type: "bug",
        title: "DiD Standard Errors Are Too Small",
        prompt: "A student estimates DiD on a state-level panel and finds extremely significant results. What is the bug?",
        hint: "With 50 states observed over 20 years, observations within the same state are correlated. Does the <code>robust</code> option handle within-group serial correlation?",
        lang: "stata",
        code: "* State-level panel: 50 states x 20 years = 1000 obs\ngen treat_post = treated_state * post_reform\nreg outcome treated_state post_reform treat_post, robust",
        options: [
          "The interaction term should use # instead of manual multiplication",
          "robust SEs do not account for within-state serial correlation — need cluster(state) for valid inference",
          "DiD requires a probit or logit model, not OLS, when the outcome is continuous",
          "The post_reform indicator should be interacted with year for an event study"
        ],
        correct: 1,
        explanation: "B is correct: in a state-year panel, errors within the same state are serially correlated over time. The robust option handles heteroskedasticity but NOT within-cluster serial correlation, leading to underestimated SEs and inflated t-statistics. Bertrand, Duflo, and Mullainathan (2004) showed this dramatically over-rejects. The fix is cluster(state). A is wrong because manually generating the interaction (treated * post) and using Stata's # notation produce identical results — this is a style choice, not a bug. C is wrong because OLS is the standard estimator for DiD with continuous outcomes — probit/logit are for binary outcomes. D is wrong because an event study is a more flexible specification, not a requirement — the two-period DiD with treat_post is valid when there is a single treatment date."
      },
      // 4 — bug (Python): IV with weak instrument
      {
        type: "bug",
        title: "Weak Instrument Problem in IV Estimation",
        prompt: "A student runs an IV regression but gets huge standard errors and implausible coefficients. What should they check first?",
        hint: "Look at the first-stage F-statistic. There is a well-known threshold for instrument strength. Is the reported value above or below it?",
        lang: "python",
        code: "from linearmodels.iv import IV2SLS\n\nmodel = IV2SLS.from_formula(\n    'wage ~ 1 + experience + [education ~ distance_to_college]',\n    data=df\n)\nresults = model.fit(cov_type='robust')\nprint(results.first_stage)\n# F-statistic: 3.2",
        options: [
          "The formula syntax is wrong — the endogenous variable should go outside brackets",
          "The first-stage F-statistic is 3.2, far below 10 — the instrument is too weak for reliable IV",
          "IV2SLS does not support the robust covariance type — use kernel instead",
          "The model needs to include the instrument directly as a control variable"
        ],
        correct: 1,
        explanation: "B is correct: an F-statistic of 3.2 in the first stage indicates a weak instrument — distance_to_college barely predicts education. The Stock-Yogo rule of thumb is F > 10 for the 2SLS bias to be less than 10% of the OLS bias. Weak instruments cause biased IV estimates (toward OLS) and unreliable confidence intervals. A is wrong because IV2SLS.from_formula uses brackets [endogenous ~ instruments] as its standard syntax — this is correct. C is wrong because linearmodels supports robust covariance estimation for IV — cov_type='robust' is valid. D is wrong because including the instrument as a control would violate the exclusion restriction — the instrument should affect wages ONLY through education, not directly."
      },
      // 5 — reorder (Python): basic DiD setup
      {
        type: "reorder",
        title: "Setting Up a DiD Regression in Python",
        prompt: "Arrange these Python lines to run a basic difference-in-differences analysis.",
        hint: "Load data first, then create the post indicator, then create the interaction (treated x post), and finally estimate. You need the interaction variable to exist before running the regression.",
        lang: "python",
        lines: [
          "results = smf.ols('outcome ~ treated + post + treat_post', data=df).fit(cov_type='cluster', cov_kwds={'groups': df['state']})",
          "df['treat_post'] = df['treated'] * df['post']",
          "df['post'] = (df['year'] >= 2015).astype(int)",
          "df = pd.read_stata('state_panel.dta')"
        ],
        correctOrder: [3, 2, 1, 0],
        explanation: "The correct order is: (1) read_stata loads the panel data — required before any column operations. (2) The post indicator is created from the year variable — this must exist before the interaction can be computed. (3) The interaction treat_post = treated * post requires both treated and post columns — so post must be created first. (4) The regression formula references treat_post — so it must exist before estimation. Clustering at the state level is essential for valid DiD inference on state-level panels."
      },
      // 6 — reorder (R): RDD estimation
      {
        type: "reorder",
        title: "Running an RDD Analysis in R",
        prompt: "Arrange these R commands to estimate a regression discontinuity design.",
        hint: "Load the package, inspect bandwidth selection first, then estimate with <code>rdrobust()</code>, and display results last. Bandwidth selection is informational and typically comes before estimation.",
        lang: "r",
        lines: [
          "summary(rd_result)",
          "rd_result <- rdrobust(y = df$outcome, x = df$score, c = 60)",
          "library(rdrobust)",
          "rdbwselect(y = df$outcome, x = df$score, c = 60)"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "The correct order is: (1) library(rdrobust) loads the package — required before any rdrobust functions. (2) rdbwselect() inspects bandwidth selection — this is informational and helps you understand what bandwidth the algorithm will choose, though rdrobust() also selects its own bandwidth. (3) rdrobust() estimates the RDD — it fits local linear regressions on each side of the cutoff c = 60 with an optimal bandwidth. (4) summary() displays results — requires the rd_result object."
      },
      // 7 — fill (Stata): IV regression
      {
        type: "fill",
        title: "Two-Stage Least Squares in Stata",
        prompt: "Fill in the gap to instrument education with distance_to_college. Type <code>education = distance_to_college</code> inside the parentheses.",
        hint: "Stata IV syntax: <code>(endogenous_var = instrument_var)</code>. The endogenous variable goes on the left, the instrument on the right.",
        lang: "stata",
        codeTemplate: "ivregress 2sls wage experience (___ENDOG___), robust\nestat firststage",
        gaps: {
          "ENDOG": {
            answer: "education = distance_to_college",
            accept: ["education = distance_to_college", "education=distance_to_college"]
          }
        },
        explanation: "The gap teaches Stata's IV syntax. The parentheses contain (endogenous_var = instruments), where education is the endogenous variable (correlated with unobserved ability in the error term) and distance_to_college is the instrument. A common mistake is reversing the order — writing (distance_to_college = education) — which would incorrectly instrument the distance variable. Another mistake is omitting estat firststage, which tests whether the instrument is strong enough (F > 10)."
      },
      // 8 — match: causal methods and their identifying assumptions
      {
        type: "match",
        title: "Causal Methods and Key Assumptions",
        prompt: "Match each causal inference method with its core identifying assumption.",
        hint: "Each method has one key assumption: DiD relies on trends, RDD on sorting behavior, IV on the instrument's exclusion, and matching on observable confounders.",
        pairs: [
          { left: "Difference-in-Differences", leftLang: "text", right: "Parallel trends: treated and control would have followed the same trajectory absent treatment", rightLang: "text" },
          { left: "Regression Discontinuity", leftLang: "text", right: "No manipulation: units cannot precisely sort around the cutoff", rightLang: "text" },
          { left: "Instrumental Variables", leftLang: "text", right: "Exclusion restriction: the instrument affects the outcome only through the endogenous variable", rightLang: "text" },
          { left: "Propensity Score Matching", leftLang: "text", right: "Conditional independence: no unobserved confounders after conditioning on covariates", rightLang: "text" }
        ],
        explanation: "Each method relies on a fundamentally different source of identifying variation: DiD uses within-unit changes over time (parallel trends assumes treated and control would have evolved identically without treatment). RDD uses the quasi-random variation near a cutoff (no-manipulation assumes units cannot game their score to be just above/below). IV uses exogenous variation from an instrument (exclusion means the instrument has no direct effect on the outcome). Matching uses observed covariates to create comparable groups (conditional independence assumes all confounders are observed and controlled for — the strongest and least testable assumption)."
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
        prompt: "What does the coefficient on `treated` estimate in this TWFE specification?",
        hint: "With both country and year fixed effects, the coefficient is identified from <b>within-country</b> variation over time, net of common shocks. This is the TWFE DiD logic.",
        lang: "r",
        code: "library(fixest)\n\nmodel <- feols(\n  log_gdp ~ treated | country + year,\n  cluster = ~country,\n  data = panel\n)",
        options: [
          "The average GDP level of treated countries compared to untreated countries",
          "The within-country change in log GDP associated with treatment, net of common year shocks",
          "The cross-country difference in GDP growth rates between treated and untreated groups",
          "The year-over-year GDP growth trend common to all countries in the sample"
        ],
        correct: 1,
        explanation: "B is correct: with country and year fixed effects, the treated coefficient is identified from within-country variation over time (country FE absorb permanent country differences) net of common year shocks (year FE absorb shocks affecting all countries equally). This is the TWFE DiD estimand. A is wrong because country fixed effects absorb the average GDP level of each country — the treated coefficient captures CHANGES within a country when treatment status switches, not level differences between countries. C is wrong because the coefficient measures the causal effect of treatment on a specific country's GDP trajectory, not a comparison of growth rates between groups. D is wrong because year fixed effects absorb the common time trend — the treated coefficient isolates the treatment effect AFTER removing this trend."
      },
      // 2 — read (Stata): event study
      {
        type: "read",
        title: "Event Study Reference Period Selection",
        prompt: "Why is `ref = -1` used in this event study specification?",
        hint: "In event studies, one period must be omitted as the reference (normalization). Think about which period makes the pre-treatment coefficients interpretable as a parallel trends test.",
        lang: "stata",
        code: "* rel_time = year - treatment_year\n* ranges from -5 to +5\nreghdfe outcome ib(-1).rel_time, absorb(unit_id year) cluster(unit_id)",
        options: [
          "It drops all observations from the period one year before treatment",
          "It sets period -1 as the reference so all coefficients are measured relative to one year pre-treatment",
          "It lags the outcome variable by one period to capture delayed effects",
          "It restricts the sample to only observations after rel_time = -1"
        ],
        correct: 1,
        explanation: "B is correct: ib(-1).rel_time tells Stata to omit the dummy for rel_time = -1, making it the reference period. All other event-study coefficients are measured relative to this period. Pre-treatment coefficients (rel_time = -5 to -2) test parallel trends — they should be near zero. A is wrong because setting a reference period does not drop observations — those observations are still in the estimation sample, they just serve as the normalization point with a coefficient implicitly equal to zero. C is wrong because ib(-1) is a factor-variable operator for setting the reference category, not a time-series lag operator — lagging in Stata uses L. or l. prefixes. D is wrong because the reference period affects which dummy is omitted, not which observations are included — the full sample is still used."
      },
      // 3 — bug (R): matching on post-treatment variable
      {
        type: "bug",
        title: "Matching on a Post-Treatment Variable",
        prompt: "A student matches on several covariates to estimate the effect of a job training program. What is the problem?",
        hint: "Check the year suffix on each variable. The training was assigned in January 2020. Is every matching variable measured <b>before</b> treatment?",
        lang: "r",
        code: "library(MatchIt)\n\n# Training program assigned in January 2020\nm <- matchit(\n  training ~ age + education + occupation_2021 + pre_wage,\n  method = \"nearest\",\n  data = df\n)\nmatched_df <- match.data(m)",
        options: [
          "method = 'nearest' gives poor balance — should use method = 'exact' for better results",
          "occupation_2021 is post-treatment — matching on it blocks the causal path and introduces collider bias",
          "pre_wage should not be included because it is the same variable as the outcome",
          "The propensity score model should use probit instead of logit for binary treatments"
        ],
        correct: 1,
        explanation: "B is correct: occupation_2021 is measured AFTER the training program (assigned January 2020), so it may be a consequence of treatment. If training causes a promotion (better occupation), which increases wages, conditioning on occupation blocks this indirect path and biases the estimate downward. This is a form of collider bias. A is wrong because exact matching is often infeasible with continuous covariates (too many unique combinations) and nearest-neighbor matching is a standard and valid approach. C is wrong because pre_wage is the wage BEFORE treatment, which is a valid pre-treatment covariate for matching — the outcome would be post-treatment wage, which is a different variable. D is wrong because logit and probit give nearly identical propensity scores in practice — the choice between them rarely matters, and it is not the source of bias here."
      },
      // 4 — bug (Python): RDD global polynomial
      {
        type: "bug",
        title: "RDD with Global Polynomial Is Unreliable",
        prompt: "A student estimates an RDD by fitting a high-order polynomial on the full sample. What is the methodological problem?",
        hint: "RDD identification comes from observations <b>near the cutoff</b>. What happens when observations far from the cutoff influence a high-order polynomial fit?",
        lang: "python",
        code: "import numpy as np\nimport statsmodels.formula.api as smf\n\n# Running variable: test score, cutoff at 60\ndf['score_c'] = df['score'] - 60\ndf['score_c2'] = df['score_c'] ** 2\ndf['score_c3'] = df['score_c'] ** 3\ndf['treat'] = (df['score'] >= 60).astype(int)\n\nmodel = smf.ols(\n    'outcome ~ treat + score_c + score_c2 + score_c3',\n    data=df  # uses ALL data, not local\n).fit(cov_type='HC1')",
        options: [
          "The polynomial terms should be interacted with treat to allow different slopes on each side",
          "Global polynomials are driven by observations far from the cutoff — use local linear regression (rdrobust) instead",
          "The running variable score_c should not be centered at the cutoff",
          "The treatment indicator should use a strict inequality (> 60) instead of >= 60"
        ],
        correct: 1,
        explanation: "B is correct: Gelman and Imbens (2019) demonstrate that global high-order polynomial RDD is unreliable — observations far from the cutoff have excessive influence on the polynomial fit and can create spurious discontinuities. Local linear regression with an MSE-optimal bandwidth (as in rdrobust) focuses on observations near the cutoff where the RDD assumption is most credible. A is wrong because while allowing different slopes on each side is good practice, it does not fix the fundamental problem of global polynomial sensitivity to distant observations. C is wrong because centering at the cutoff is standard and desirable — it makes the intercept interpretable as the outcome at the cutoff. D is wrong because the choice between >= and > affects at most a single observation at exactly 60 — this is inconsequential for inference and is not the methodological concern."
      },
      // 5 — reorder (R): event study plot
      {
        type: "reorder",
        title: "DiD Event Study with Plot",
        prompt: "Arrange these R commands to estimate an event study and plot the dynamic effects.",
        hint: "Load the package, compute relative time, estimate the event study model, then plot. You need <code>rel_time</code> to exist before using it in the formula.",
        lang: "r",
        lines: [
          "iplot(model, xlab = 'Periods relative to treatment', ylab = 'Effect')",
          "model <- feols(outcome ~ i(rel_time, ref = -1) | unit_id + year, cluster = ~unit_id, data = df)",
          "library(fixest)",
          "df$rel_time <- df$year - df$treatment_year"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "The correct order is: (1) library(fixest) loads the package — required before feols() and iplot() are available. (2) Compute rel_time from year and treatment_year — this variable must exist before it appears in the feols formula. (3) feols() estimates the event study with i(rel_time, ref = -1) creating dummies for each period relative to treatment — this requires rel_time to exist. (4) iplot() creates the event study plot — this requires the fitted model object to extract coefficients and confidence intervals."
      },
      // 6 — reorder (Stata): IV with diagnostics
      {
        type: "reorder",
        title: "IV Estimation with Diagnostics in Stata",
        prompt: "Arrange these Stata commands to run an IV regression and check instrument strength.",
        hint: "Load data, run <code>ivregress</code>, then post-estimation diagnostics. <code>estat firststage</code> checks instrument relevance, and <code>estat endogeneity</code> tests whether IV is even necessary.",
        lang: "stata",
        lines: [
          "estat firststage",
          "ivregress 2sls wage experience (education = distance_to_college), robust",
          "estat endogeneity",
          "use labor.dta, clear"
        ],
        correctOrder: [3, 1, 0, 2],
        explanation: "The correct order is: (1) use loads the data — required before any estimation. (2) ivregress runs 2SLS — the estimation must precede post-estimation diagnostics. (3) estat firststage checks instrument strength (F > 10 rule) — this is the most critical diagnostic because weak instruments invalidate all IV inference. (4) estat endogeneity runs the Durbin-Wu-Hausman test — this checks whether education is actually endogenous; if not, OLS is more efficient and IV is unnecessary."
      },
      // 7 — fill (Python): RDD estimation
      {
        type: "fill",
        title: "RDD with rdrobust in Python",
        prompt: "Fill in the gap to run an RDD at the cutoff score of 60. Type the parameter <code>c=60</code>.",
        hint: "The <code>c</code> parameter in <code>rdrobust()</code> specifies the cutoff value for the running variable.",
        lang: "python",
        codeTemplate: "from rdrobust import rdrobust\n\nresult = rdrobust(y=df['outcome'], x=df['score'], ___CUTOFF___)\nprint(result)",
        gaps: {
          "CUTOFF": {
            answer: "c=60",
            accept: ["c=60", "c = 60"]
          }
        },
        explanation: "The gap teaches the cutoff parameter in rdrobust. The c parameter specifies the threshold value of the running variable (score) at which treatment status changes. A common mistake is omitting c entirely (rdrobust defaults to c=0, which would be wrong if the cutoff is 60). Another mistake is confusing c with the bandwidth parameter h — c sets WHERE the discontinuity is, while h sets how wide a window to use around c for estimation."
      },
      // 8 — match: causal inference commands across languages
      {
        type: "match",
        title: "Causal Inference Commands Across Languages",
        prompt: "Match each causal method with the correct implementation.",
        hint: "Match by method: <code>feols</code> with fixed effects is TWFE DiD, <code>estat firststage</code> is an IV diagnostic, <code>rdbwselect</code> is for RDD, and <code>LogisticRegression</code> estimates propensity scores.",
        pairs: [
          { left: "DiD with TWFE (R)", leftLang: "text", right: "feols(y ~ treated | unit + year, cluster = ~unit, data = df)", rightLang: "r" },
          { left: "IV first-stage F-test (Stata)", leftLang: "text", right: "estat firststage", rightLang: "stata" },
          { left: "RDD bandwidth selection (R)", leftLang: "text", right: "rdbwselect(y = df$outcome, x = df$score, c = 60)", rightLang: "r" },
          { left: "Propensity score (Python)", leftLang: "text", right: "LogisticRegression().fit(X, T).predict_proba(X)[:, 1]", rightLang: "python" }
        ],
        explanation: "Each implementation reflects language-specific idioms for causal inference: R's feols uses the | operator to separate fixed effects from regressors, with cluster as a separate argument. Stata's estat firststage is a post-estimation command that only works after ivregress — it tests instrument relevance. R's rdbwselect computes the MSE-optimal bandwidth for RDD using the same syntax as rdrobust. Python's scikit-learn chain (.fit().predict_proba()[:, 1]) estimates propensity scores via logistic regression — the [:, 1] selects the probability of treatment (column index 1), not the probability of non-treatment."
      }
    ],

    // -----------------------------------------------------------------------
    //  ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 — read (R): synthetic control
      {
        type: "read",
        title: "Synthetic Control: How the Counterfactual Is Constructed",
        prompt: "What does the synthetic control method do with the donor pool?",
        hint: "The method creates a counterfactual from the donor countries. The key question is <b>how</b> it combines them — equally, optimally, or randomly?",
        lang: "r",
        code: "library(Synth)\n\ndataprep_out <- dataprep(\n  foo = panel,\n  predictors = c(\"gdp\", \"population\", \"trade_share\"),\n  predictors.op = \"mean\",\n  dependent = \"gdp\",\n  unit.variable = \"country_id\",\n  time.variable = \"year\",\n  treatment.identifier = 7,\n  controls.identifier = c(1:6, 8:20),\n  time.predictors.prior = 1985:1999,\n  time.optimize.ssr = 1985:1999,\n  time.plot = 1985:2010\n)\nsynth_out <- synth(dataprep_out)",
        options: [
          "Averages all 19 donor countries equally to create a simple mean counterfactual",
          "Finds optimal non-negative weights for donors to best match the treated country's pre-treatment path",
          "Runs a regression of country 7's GDP on all donors' GDP to estimate linear coefficients",
          "Randomly selects one donor country that most closely resembles country 7"
        ],
        correct: 1,
        explanation: "B is correct: synthetic control finds a weighted combination of donor units (countries 1-6, 8-20) with non-negative weights summing to 1 that best reproduces the treated unit's (country 7) pre-treatment trajectory and predictors. The gap after treatment between the treated unit and its synthetic counterpart estimates the causal effect. A is wrong because equal-weighted averaging would be a crude approach that ignores how similar each donor is to the treated unit — synthetic control optimizes weights to match the pre-treatment path, typically giving positive weight to only a few donors. C is wrong because the method uses constrained optimization (minimizing pre-treatment fit), not regression — regression coefficients can be negative and do not sum to 1, violating the convex-combination interpretation. D is wrong because synthetic control creates a composite of multiple donors rather than selecting a single best match — using multiple donors allows a closer pre-treatment fit than any single country alone."
      },
      // 2 — read (Stata): IV overidentification
      {
        type: "read",
        title: "Overidentification Test for IV Validity",
        prompt: "What does the Sargan-Hansen test with p = 0.365 tell you about this IV model?",
        hint: "The model has 2 instruments and 1 endogenous variable (overidentified). The overid test p-value is 0.365. A high p-value means failure to reject the null. What is the null hypothesis?",
        lang: "stata",
        code: "ivregress 2sls wage experience (education = distance_to_college parent_education), robust\nestat overid\n* Sargan (score) chi2(1) = 0.82, p = 0.365",
        options: [
          "Both instruments are strong — the F-statistic exceeds 10 in the first stage",
          "The test fails to reject instrument validity — both instruments give consistent estimates",
          "Education is confirmed as endogenous and IV estimation is necessary",
          "The model is exactly identified so the test provides no information"
        ],
        correct: 1,
        explanation: "B is correct: the Sargan-Hansen overidentification test has the null hypothesis that all instruments are valid (satisfy the exclusion restriction). With p = 0.365, we fail to reject, suggesting the two instruments give consistent estimates — consistent with both being valid. A is wrong because the overidentification test checks instrument VALIDITY (exclusion restriction), not instrument STRENGTH — strength is assessed by the first-stage F-statistic, which is a separate test. C is wrong because endogeneity is tested by the Durbin-Wu-Hausman test (estat endogeneity), not the overidentification test — these test different hypotheses. D is wrong because with 2 instruments and 1 endogenous variable, the model IS overidentified (2 - 1 = 1 degree of overidentification), which is why the test can be computed. An exactly identified model (1 instrument) would make the overid test infeasible."
      },
      // 3 — bug (R): wrong event study reference
      {
        type: "bug",
        title: "Event Study with Wrong Reference Period",
        prompt: "A student's event study plot shows a spike at period -1 relative to treatment. Their advisor says the normalization is wrong. Why?",
        hint: "Look at which period is set as <code>ref</code>. If the reference is the treatment period itself, what do the pre-treatment coefficients measure?",
        lang: "r",
        code: "library(fixest)\n\n# rel_time: -5, -4, ..., -1, 0, 1, ..., 5\nmodel <- feols(\n  outcome ~ i(rel_time, ref = 0) | unit_id + year,\n  cluster = ~unit_id,\n  data = df\n)",
        options: [
          "The cluster variable should be year instead of unit_id for valid inference",
          "ref = 0 normalizes to the treatment period — should use ref = -1 so pre-treatment tests parallel trends",
          "i() does not support negative values and produces incorrect dummies for rel_time < 0",
          "Year fixed effects should not be included alongside event-study dummies"
        ],
        correct: 1,
        explanation: "B is correct: setting ref = 0 (the treatment period) as the baseline means all coefficients — including pre-treatment ones — are measured relative to the moment of treatment. This makes the pre-treatment coefficient at period -1 show the full jump from pre to post, which is misleading and prevents proper parallel trends testing. The standard is ref = -1 (one period before treatment), so pre-treatment coefficients (periods -5 to -2) test whether outcomes were trending similarly before treatment. A is wrong because clustering by unit_id is correct for panel DiD — it accounts for serial correlation within units. Clustering by year would require many year clusters and is typically inappropriate. C is wrong because i() handles negative values correctly — they become dummy variables like any other value of rel_time. D is wrong because year fixed effects can coexist with event-study dummies when rel_time varies across units (staggered treatment) — the dummies absorb unit-specific treatment timing while year FE absorb common shocks."
      },
      // 4 — bug (Stata): RDD with chosen bandwidth
      {
        type: "bug",
        title: "RDD Robustness to Bandwidth Choice",
        prompt: "A reviewer says the RDD result is not robust because only one bandwidth is reported. What should the student do?",
        hint: "Robustness in RDD typically requires showing results are stable across different bandwidths (e.g., half and double the optimal).",
        lang: "stata",
        code: "* Only reports one bandwidth\nrdrobust outcome score, c(60)\n* Estimated effect: 5.2 (p = 0.03)\n* MSE-optimal bandwidth: h = 8.3",
        options: [
          "Switch to a global polynomial instead of local linear regression for stability",
          "Show results are stable across alternative bandwidths — report h/2, h, and 2h estimates",
          "Increase the polynomial order from 1 to 3 to capture more curvature near the cutoff",
          "Remove the cutoff parameter c(60) and let rdrobust detect the discontinuity automatically"
        ],
        correct: 1,
        explanation: "B is correct: a single bandwidth produces a single point estimate. Robustness requires demonstrating that the result is stable when the bandwidth varies — standard practice is to report results at h/2 and 2h alongside the optimal h. If the effect is significant only at the optimal bandwidth, it may be fragile. A is wrong because global polynomials are LESS reliable than local regression (Gelman and Imbens, 2019) — they are sensitive to observations far from the cutoff and can generate spurious results. C is wrong because Imbens and Lemieux (2008) recommend local LINEAR regression (order 1) as the default — higher-order local polynomials add variance without substantive improvement for most applications. D is wrong because rdrobust does not auto-detect cutoffs — the c parameter is required and must be specified based on the institutional design of the policy (the researcher must know where the threshold is)."
      },
      // 5 — reorder (Python): synthetic control
      {
        type: "reorder",
        title: "Synthetic Control Analysis in Python",
        prompt: "Arrange these Python lines to run a synthetic control analysis.",
        hint: "The flow is: import, load/index data, fit the synthetic control, plot treated vs synthetic, then run placebo tests. The placebo step comes last as a robustness check.",
        lang: "python",
        lines: [
          "sc = Synth()\nsc.fit(treated_unit=7, treatment_period=1990, predictors=['gdp', 'population', 'trade_share'])",
          "import pandas as pd\nfrom SparseSC import Synth",
          "panel = pd.read_stata('country_panel.dta')\npanel = panel.set_index(['country_id', 'year'])",
          "plt.plot(years, treated_gdp, label='Treated')\nplt.plot(years, sc.synthetic_, label='Synthetic')\nplt.axvline(x=1990, linestyle='--')\nplt.legend()\nplt.show()",
          "# Placebo: run synth for each donor unit\nplacebo_effects = [Synth().fit(treated_unit=d, treatment_period=1990, predictors=['gdp', 'population', 'trade_share']) for d in donors]"
        ],
        correctOrder: [1, 2, 0, 3, 4],
        explanation: "The correct order is: (1) Import packages — required before any function calls. (2) Load and index the panel data — set_index creates the multi-index that Synth needs to identify units and time periods. (3) Fit the synthetic control — this computes optimal donor weights to match country 7's pre-1990 trajectory. (4) Plot treated vs synthetic — the gap after 1990 is the estimated treatment effect; axvline marks the treatment date. (5) Placebo tests come last — running synth on each donor unit builds a distribution of placebo effects for inference (if the treated unit's effect is extreme relative to placebos, it is significant)."
      },
      // 6 — reorder (Python): matching with balance check
      {
        type: "reorder",
        title: "Propensity Score Matching with Balance Check",
        prompt: "Arrange these Python steps for matching with a proper balance diagnostic.",
        hint: "Import first, estimate propensity scores, find nearest-neighbor matches, construct the matched sample, then check covariate balance. The balance check must come after the matched sample is created.",
        lang: "python",
        lines: [
          "matched = df.loc[df.index.isin(treated.index) | df.index.isin(matched_control.index)]",
          "ps = LogisticRegression().fit(X, df['treatment']).predict_proba(X)[:, 1]",
          "# Check balance: compare means of covariates in matched sample\nbalance = matched.groupby('treatment')[['age', 'education', 'income']].mean()",
          "from sklearn.linear_model import LogisticRegression\nfrom sklearn.neighbors import NearestNeighbors",
          "nn = NearestNeighbors(n_neighbors=1).fit(ps[df['treatment']==0].reshape(-1,1))\nmatched_control = df[df['treatment']==0].iloc[nn.kneighbors(ps[df['treatment']==1].reshape(-1,1))[1].flatten()]"
        ],
        correctOrder: [3, 1, 4, 0, 2],
        explanation: "The correct order is: (1) Import LogisticRegression and NearestNeighbors — required before model fitting. (2) Estimate propensity scores via logistic regression — predict_proba()[:, 1] gives the probability of treatment for each observation. (3) Find nearest-neighbor matches — for each treated unit, find the control unit with the most similar propensity score. (4) Construct the matched sample — combine treated and their matched controls into one dataset. (5) Check covariate balance — compare mean age, education, and income between matched treated and control groups. If means differ substantially, the matching failed."
      },
      // 7 — fill (R): event study specification
      {
        type: "fill",
        title: "Event Study in R with fixest",
        prompt: "Fill in the gap to estimate an event study with period -1 as the reference. Type the <code>i()</code> function call using <code>rel_time</code> and <code>ref = -1</code>.",
        hint: "The <code>fixest</code> syntax for event study dummies is <code>i(variable, ref = value)</code>, where <code>ref</code> specifies the omitted reference period.",
        lang: "r",
        codeTemplate: "library(fixest)\n\nmodel <- feols(\n  outcome ~ ___EVENTSTUDY___ | unit_id + year,\n  cluster = ~unit_id,\n  data = df\n)\niplot(model)",
        gaps: {
          "EVENTSTUDY": {
            answer: "i(rel_time, ref = -1)",
            accept: ["i(rel_time, ref = -1)", "i(rel_time, ref=-1)", "i(rel_time,ref=-1)"]
          }
        },
        explanation: "The gap teaches the fixest event-study syntax. i(rel_time, ref = -1) creates indicator variables for each value of rel_time, omitting period -1 as the reference. A common mistake is using factor(rel_time) instead of i() — factor() works but does not integrate with iplot() for automatic event-study plotting. Another mistake is setting ref = 0 (the treatment period), which makes pre-treatment coefficients hard to interpret for parallel trends testing. The standard convention is ref = -1 so that pre-treatment coefficients should be near zero if parallel trends holds."
      },
      // 8 — match: placebo and robustness tests
      {
        type: "match",
        title: "Robustness Tests for Causal Methods",
        prompt: "Match each causal method with its standard robustness or placebo test.",
        hint: "Each method has a signature robustness check: event studies test pre-trends, RDD varies bandwidth, IV checks instrument strength, and synthetic control uses placebo units.",
        pairs: [
          { left: "DiD event study", leftLang: "text", right: "Pre-treatment coefficients should be near zero (parallel trends test)", rightLang: "text" },
          { left: "RDD", leftLang: "text", right: "Vary the bandwidth: results should be stable across h/2, h, and 2h", rightLang: "text" },
          { left: "IV", leftLang: "text", right: "First-stage F > 10 (instrument relevance) and Sargan overid test (if overidentified)", rightLang: "text" },
          { left: "Synthetic control", leftLang: "text", right: "Placebo-in-space: apply the method to each donor unit and compare effect sizes", rightLang: "text" }
        ],
        explanation: "Each robustness test targets the specific vulnerability of its method: DiD event studies plot pre-treatment coefficients — if they deviate from zero, parallel trends fails and the DiD estimate is unreliable. RDD bandwidth variation tests whether the estimated discontinuity is an artifact of a specific window size — stability across h/2, h, and 2h builds confidence. IV diagnostics address the two key threats: weak instruments (F < 10 biases IV toward OLS) and exclusion-restriction violations (Sargan test detects inconsistency across instruments). Synthetic control placebo-in-space estimates the 'effect' on untreated donor units — if the treated unit's effect is not unusually large relative to placebos, it may be due to chance."
      }
    ]
  };

})();
