// Practice Exercises - Part 1: Syntax, Data Import, Data Exploration
(function() {
  if (!window.PRACTICE_EXERCISES) window.PRACTICE_EXERCISES = {};

  // ============================================================
  // TOPIC 1: SYNTAX & BASICS (Module 1: Getting Started)
  // ============================================================
  window.PRACTICE_EXERCISES.syntax = {

    // ----------------------------------------------------------
    // BEGINNER (8 exercises)
    // ----------------------------------------------------------
    beginner: [
      {
        type: "read",
        title: "Understanding Import Aliases",
        prompt: "What does the following line accomplish?",
        hint: "Focus on the <code>as</code> keyword — it creates a shorthand name you can use instead of the full library name.",
        lang: "python",
        code: "import pandas as pd",
        options: [
          "It downloads and installs the pandas package from PyPI",
          "It loads the pandas library and lets you refer to it as pd",
          "It creates a variable pd containing the string 'pandas'",
          "It permanently renames the pandas library to pd on your computer"
        ],
        correct: 1,
        explanation: "B is correct: 'import ... as' loads a library into your current session and creates a short alias, so you can write pd.read_csv() instead of pandas.read_csv(). A is wrong because 'import' only loads an already-installed library — installation is done separately with pip or conda. C is wrong because pd becomes a reference to the entire pandas module object, not a string. D is wrong because the alias only exists in the current script or session — it does not change anything on your system."
      },
      {
        type: "read",
        title: "Assignment vs. Comparison Operators in R",
        prompt: "What does each line do?",
        hint: "In R, <code>&lt;-</code> and <code>==</code> are different operators. One stores a value, the other tests equality.",
        lang: "r",
        code: "wage <- 45000\nwage == 50000",
        options: [
          "Line 1 stores 45000 in wage; Line 2 checks if wage equals 50000 and returns FALSE",
          "Both lines assign values to wage; wage ends up as 50000",
          "Line 1 checks equality; Line 2 assigns 50000 to wage",
          "Line 1 stores 45000; Line 2 updates wage to 50000"
        ],
        correct: 0,
        explanation: "A is correct: <- is R's assignment operator (stores 45000 in wage), and == is the comparison operator (tests whether wage equals 50000 and returns FALSE since 45000 != 50000). B is wrong because == does not assign — it only compares, so wage remains 45000. C is wrong because <- assigns (does not compare) and == compares (does not assign) — the roles are reversed. D is wrong because == never changes the value of a variable; it only returns TRUE or FALSE."
      },
      {
        type: "read",
        title: "Arithmetic with Stored Variables in R",
        prompt: "After running this code, what is the value of gdp_growth?",
        hint: "Trace the arithmetic step by step: subtract, then divide. The result is a decimal, not a percentage.",
        lang: "r",
        code: "gdp_2024 <- 1200\ngdp_2025 <- 1260\ngdp_growth <- (gdp_2025 - gdp_2024) / gdp_2024",
        options: [
          "60 — the absolute difference between the two values",
          "0.05 — the growth rate as a decimal fraction",
          "5 — the growth rate as a whole-number percentage",
          "1.05 — the ratio of the two GDP values"
        ],
        correct: 1,
        explanation: "B is correct: (1260 - 1200) / 1200 = 60 / 1200 = 0.05, which is the growth rate expressed as a decimal. A is wrong because 60 is only the numerator (the difference) — the formula divides by gdp_2024 to get a rate. C is wrong because 5 would require multiplying by 100 to convert the decimal to a percentage, but the code does not do that. D is wrong because 1.05 would be gdp_2025 / gdp_2024, not (gdp_2025 - gdp_2024) / gdp_2024."
      },
      {
        type: "bug",
        title: "Strings Need Quotes in Stata",
        prompt: "What is wrong with this Stata code?",
        hint: "Look at how the value <code>France</code> is assigned. In Stata, text values need special treatment — think about how other languages handle literal text.",
        lang: "stata",
        code: "local country = France\ndisplay \"`country'\"",
        options: [
          "The display command cannot show local macros",
          "France must be in quotes because it is a string: local country = \"France\"",
          "The backtick-apostrophe syntax around country is invalid",
          "The macro name 'country' is a reserved word in Stata"
        ],
        correct: 1,
        explanation: "B is correct: without quotes, Stata tries to interpret France as a variable or macro reference rather than a literal string. The fix is local country = \"France\". A is wrong because display works perfectly with local macros when they are correctly defined and referenced. C is wrong because `country' (backtick before, apostrophe after) is exactly how Stata expands local macros. D is wrong because 'country' is not reserved — Stata allows it as a macro name."
      },
      {
        type: "read",
        title: "Stata Local Macro Expansion",
        prompt: "What does the following Stata code display?",
        hint: "Pay attention to the backtick-apostrophe syntax (<code>`threshold'</code>) — this is how Stata expands a local macro to its stored value.",
        lang: "stata",
        code: "local threshold = 25000\ndisplay `threshold'",
        options: [
          "The word threshold is printed literally",
          "25000 is displayed — the macro is expanded to its stored value",
          "An error — backtick and apostrophe are not valid syntax",
          "Nothing — display only works with quoted strings"
        ],
        correct: 1,
        explanation: "B is correct: Stata substitutes `threshold' with the stored value 25000 before executing display, so the output is 25000. A is wrong because `threshold' triggers macro expansion — Stata replaces it with the value, not the name. C is wrong because backtick-apostrophe is exactly the required syntax for local macro references in Stata. D is wrong because display works with numbers, expressions, and macro references, not only quoted strings."
      },
      {
        type: "match",
        title: "Assignment Across Languages",
        prompt: "Match each assignment statement with its language.",
        hint: "Python uses <code>=</code> and dot-method syntax, while R uses <code>&lt;-</code> and standalone functions like <code>head()</code>.",
        pairs: [
          { left: "income = 50000", leftLang: "Python", right: "income <- 50000", rightLang: "R" },
          { left: "import numpy as np", leftLang: "Python", right: "library(tidyverse)", rightLang: "R" },
          { left: "df.head()", leftLang: "Python", right: "head(df)", rightLang: "R" },
          { left: "len(my_list)", leftLang: "Python", right: "length(my_vector)", rightLang: "R" }
        ],
        explanation: "Python uses = for assignment while R uses <-. Python loads libraries with 'import' (optionally aliasing with 'as'), while R uses library(). Python calls methods on objects with dot notation (df.head()), while R uses standalone functions that take the object as an argument (head(df)). Python uses len() for length while R uses length() — same concept, slightly different names."
      },
      {
        type: "fill",
        title: "Keyword Arguments in Function Calls",
        prompt: "Fill in the blanks to read a CSV file with UTF-8 encoding, using a semicolon as the delimiter. GAP1 is the pandas function name (e.g. <code>read_csv</code>), GAP2 is the encoding string in quotes, and GAP3 is the separator character in quotes.",
        hint: "The function is <code>pd.read_csv()</code>. Encoding and separator are passed as quoted strings: <code>'utf-8'</code> and <code>';'</code>.",
        lang: "python",
        code: "import pandas as pd",
        codeTemplate: "df = pd.___GAP1___('data.csv', encoding=___GAP2___, sep=___GAP3___)",
        gaps: {
          "GAP1": { answer: "read_csv", accept: ["read_csv"] },
          "GAP2": { answer: "'utf-8'", accept: ["'utf-8'", "\"utf-8\"", "'UTF-8'", "\"UTF-8\""] },
          "GAP3": { answer: "';'", accept: ["';'", "\";\""] }
        },
        explanation: "GAP1 (read_csv): this is the pandas function for loading delimited text files — a common mistake is writing readcsv or read.csv (the R name). GAP2 ('utf-8'): the encoding parameter must be a quoted string; forgetting quotes causes a NameError. GAP3 (';'): the semicolon delimiter is common in European datasets where the comma serves as a decimal separator; the default sep=',' would treat the entire row as one column."
      },
      {
        type: "reorder",
        title: "R Data Loading Workflow",
        prompt: "Arrange these lines to: load a library, read a CSV, and print the first 6 rows.",
        hint: "You must load a library before calling its functions, and you must read data before you can preview it. <code>library()</code> comes first, <code>head()</code> comes last.",
        lang: "r",
        lines: [
          "head(df)",
          "library(readr)",
          "df <- read_csv('wages.csv')"
        ],
        correctOrder: [1, 2, 0],
        explanation: "library(readr) must come first because read_csv() is defined inside the readr package — calling it before loading the library produces a 'could not find function' error. df <- read_csv('wages.csv') must come second because it creates the df object that head() needs. head(df) must come last because it requires df to already exist in memory. Each step creates the prerequisite for the next."
      }
    ],

    // ----------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // ----------------------------------------------------------
    intermediate: [
      {
        type: "read",
        title: "Method Chaining in pandas",
        prompt: "What does this chained expression produce?",
        hint: "Read the chain left to right: <code>groupby()</code> splits, <code>['income']</code> selects a column, and <code>.mean()</code> aggregates. The result has one entry per group.",
        lang: "python",
        code: "import pandas as pd\ndf = pd.DataFrame({'region': ['N','N','S','S'], 'income': [40,60,30,50]})\nresult = df.groupby('region')['income'].mean()",
        options: [
          "A single number: 45.0, the overall mean of all incomes",
          "A Series with the mean income per region: N=50.0, S=40.0",
          "The original DataFrame sorted alphabetically by region",
          "An error — you cannot chain ['income'] after groupby()"
        ],
        correct: 1,
        explanation: "B is correct: groupby('region') splits data into groups N and S, ['income'] selects the column within each group, and .mean() averages per group — N: (40+60)/2=50.0, S: (30+50)/2=40.0. A is wrong because groupby produces per-group results, not one overall number. C is wrong because groupby followed by an aggregation creates a new smaller object, not a sorted version of the original. D is wrong because chaining ['income'] after groupby() is standard pandas syntax for selecting a column before aggregating."
      },
      {
        type: "read",
        title: "String Formatting with paste() and round()",
        prompt: "What does this R code print?",
        hint: "Think about what <code>round(x, 2)</code> does to decimal places, and remember that <code>paste()</code> joins its arguments with spaces by default.",
        lang: "r",
        code: "mean_wage <- 52347.891\ncat(paste('The average wage is', round(mean_wage, 2), 'euros'))",
        options: [
          "The average wage is mean_wage euros",
          "The average wage is 52347.891 euros",
          "The average wage is 52347.89 euros",
          "An error — paste() cannot combine strings and numbers"
        ],
        correct: 2,
        explanation: "C is correct: round(52347.891, 2) truncates to 2 decimal places giving 52347.89, and paste() concatenates the pieces with spaces between them. A is wrong because R evaluates the variable mean_wage to its numeric value — it does not paste the variable name as literal text. B is wrong because round(x, 2) explicitly limits the output to 2 decimal places, removing the third digit. D is wrong because paste() automatically coerces numbers to character strings before concatenation."
      },
      {
        type: "bug",
        title: "Assignment vs. Comparison in a Filter",
        prompt: "A student wants to filter rows where treatment equals 1. What is wrong?",
        hint: "Look at the operator inside the brackets. There is a difference between <code>=</code> (assignment) and <code>==</code> (comparison).",
        lang: "python",
        code: "treated = df[df['treatment'] = 1]",
        options: [
          "Column names inside brackets should not have quotes",
          "Single = is assignment, not comparison — use == to test equality",
          "Boolean conditions cannot be used inside df[...]",
          "The variable name treated conflicts with a Python keyword"
        ],
        correct: 1,
        explanation: "B is correct: inside a filter, you need == (comparison, returns True/False) not = (assignment, stores a value). The fix is df[df['treatment'] == 1]. A is wrong because pandas requires column names as quoted strings when using bracket notation. C is wrong because df[boolean_series] is the standard way to filter rows in pandas. D is wrong because 'treated' is not a Python keyword — it is a perfectly valid variable name."
      },
      {
        type: "bug",
        title: "Stata Macro Reference Syntax",
        prompt: "This Stata code should loop over three variables, but it fails. Why?",
        hint: "Look at how the macro <code>v</code> is referenced inside the loop. Stata requires a specific quote style: a backtick (<code>`</code>) before and an apostrophe (<code>'</code>) after.",
        lang: "stata",
        code: "local vars income education age\nforeach v of local vars {\n    summarize 'v'\n}",
        options: [
          "foreach cannot loop over local macros in Stata",
          "The reference 'v' uses straight quotes — it should be `v' (backtick then apostrophe)",
          "summarize does not accept variable names as arguments",
          "The local macro must use = sign: local vars = income education age"
        ],
        correct: 1,
        explanation: "B is correct: Stata local macros must be referenced with a backtick (`) before and an apostrophe (') after: `v'. Using straight quotes ('v') creates the string literal \"v\" instead of expanding the macro. A is wrong because foreach...of local is standard Stata syntax for iterating over macro contents. C is wrong because summarize absolutely accepts variable names. D is wrong because omitting = is correct when storing a list of words in a macro — the = form is for expressions."
      },
      {
        type: "read",
        title: "The R Pipe Operator",
        prompt: "What does this R code produce?",
        hint: "The pipe <code>%&gt;%</code> passes the result of one step as input to the next. Think of it as \"then do this.\"",
        lang: "r",
        code: "library(dplyr)\ndf %>%\n  filter(year == 2020) %>%\n  summarise(mean_gdp = mean(gdp))",
        options: [
          "A one-row tibble with a column mean_gdp containing the average GDP for 2020",
          "The full dataset filtered to year 2020, with all original columns intact",
          "An error — %>% is not recognized as valid R syntax",
          "A numeric vector of all individual GDP values from 2020"
        ],
        correct: 0,
        explanation: "A is correct: the pipe feeds df into filter() (keeping only 2020 rows), then feeds that result into summarise() which collapses all rows into a single mean. The output is a one-row tibble with one column named mean_gdp. B is wrong because summarise() reduces the data to one row per group (here, one row total) — it does not preserve original rows. C is wrong because %>% is the pipe operator from magrittr/dplyr, a core part of the tidyverse. D is wrong because summarise(mean_gdp = mean(gdp)) computes a single aggregate value, not a vector of individual values."
      },
      {
        type: "reorder",
        title: "Stata Data Exploration Workflow",
        prompt: "Arrange these Stata commands in the correct workflow order.",
        hint: "Start by loading data (<code>use</code>), then inspect its structure before analyzing content. <code>describe</code> comes before <code>summarize</code> and <code>tabulate</code>.",
        lang: "stata",
        lines: [
          "tabulate education",
          "use \"census.dta\", clear",
          "summarize income, detail",
          "describe"
        ],
        correctOrder: [1, 3, 2, 0],
        explanation: "use must come first because no commands can run without data in memory. describe comes next because you need to know what variables exist and their types before analyzing them. summarize follows because you now examine the distribution of numeric variables. tabulate comes last because you explore categorical variables after understanding the numeric ones. Each step builds understanding that informs the next."
      },
      {
        type: "fill",
        title: "Stata Package Installation and Regression",
        prompt: "Fill in the blanks to install a user-written Stata package, then use it to run a regression. GAP1 is the Stata command to install packages from the SSC archive (e.g. <code>ssc</code>), and GAP2 is the regression command (e.g. <code>reg</code> or <code>regress</code>).",
        hint: "Stata's package archive is called SSC. The short form of the regression command is <code>reg</code>.",
        lang: "stata",
        codeTemplate: "___GAP1___ install outreg2\n___GAP2___ income treatment age, robust",
        gaps: {
          "GAP1": { answer: "ssc", accept: ["ssc"] },
          "GAP2": { answer: "reg", accept: ["reg", "regress"] }
        },
        explanation: "GAP1 (ssc): Stata's package manager uses the command 'ssc install' to download from the Statistical Software Components archive — a common mistake is typing 'install' alone (which is not a Stata command) or 'pip install' (which is Python). GAP2 (reg): the regression command is 'reg' (short for 'regress') — students sometimes write 'ols' or 'lm' (the R equivalent), which do not exist in Stata."
      },
      {
        type: "match",
        title: "Same Operations Across Languages",
        prompt: "Match equivalent operations between Python and Stata.",
        hint: "Think about what each command does conceptually: showing summary stats, previewing rows, counting observations, computing a mean.",
        pairs: [
          { left: "df.describe()", leftLang: "Python", right: "summarize", rightLang: "Stata" },
          { left: "df.head()", leftLang: "Python", right: "list in 1/5", rightLang: "Stata" },
          { left: "df.shape[0]", leftLang: "Python", right: "count", rightLang: "Stata" },
          { left: "df['income'].mean()", leftLang: "Python", right: "summarize income, meanonly", rightLang: "Stata" }
        ],
        explanation: "df.describe() and summarize both produce summary statistics (count, mean, std, min, max, percentiles). df.head() and list in 1/5 both preview the first few rows — Python defaults to 5 rows, while Stata's 'list in 1/5' explicitly shows rows 1 through 5. df.shape[0] and count both return the number of observations. df['income'].mean() and summarize income, meanonly both compute a single mean — Stata's meanonly option suppresses all output except the mean, storing it in r(mean)."
      }
    ],

    // ----------------------------------------------------------
    // ADVANCED (8 exercises)
    // ----------------------------------------------------------
    advanced: [
      {
        type: "read",
        title: "Nested Function Calls: Evaluation Order",
        prompt: "What value does result hold after this code runs?",
        hint: "Nested calls evaluate inside-out: first <code>np.log()</code>, then <code>np.mean()</code>, then <code>np.round()</code>. Log-transform produces values around 10-11.",
        lang: "python",
        code: "import numpy as np\nincomes = [30000, 45000, 52000, 48000, 120000]\nresult = np.round(np.mean(np.log(incomes)), 2)",
        options: [
          "59000.0 — the arithmetic mean of the raw incomes",
          "10.58 — the rounded mean of the log-transformed incomes",
          "48000.0 — the median of the income list",
          "An error — np.log() cannot accept a Python list"
        ],
        correct: 1,
        explanation: "B is correct: evaluation proceeds inside-out — np.log(incomes) takes the natural log of each element (producing values around 10.3-11.7), np.mean() averages those log values, and np.round(..., 2) rounds to 2 decimal places. A is wrong because the log transformation is applied before averaging, so the result is on the log scale, not the original scale. C is wrong because np.mean() computes the arithmetic mean, not the median, and it operates on log-transformed values. D is wrong because NumPy automatically converts Python lists to arrays before applying operations."
      },
      {
        type: "bug",
        title: "Python Variable Scope in Functions",
        prompt: "A student expects this code to produce an error because rate is defined after the function. Does it?",
        hint: "Look at when <code>rate</code> is defined relative to when the function is <b>called</b> (not defined). Python looks up variable names at call time.",
        lang: "python",
        code: "def compute_tax(dataframe):\n    tax = dataframe['income'] * rate\n    dataframe['tax'] = tax\n    return dataframe\n\nrate = 0.25\ndf = compute_tax(df)",
        options: [
          "It errors because rate is used before it is defined",
          "It errors because you cannot modify a DataFrame inside a function",
          "It errors because dataframe is not a valid parameter name",
          "It runs without error — rate is found as a global variable at call time"
        ],
        correct: 3,
        explanation: "D is correct: Python resolves variable names when a function is called, not when it is defined. Since rate = 0.25 is assigned before compute_tax(df) is called, Python finds rate in the global scope. A is wrong because Python only needs the variable to exist when the function executes, not when it is defined — the function body is not evaluated at definition time. B is wrong because Python functions can freely modify mutable objects like DataFrames passed as arguments. C is wrong because any valid identifier can serve as a parameter name. Note: while this works, relying on global variables inside functions is fragile — better to pass rate as a parameter."
      },
      {
        type: "read",
        title: "0-Based vs. 1-Based Indexing",
        prompt: "Both languages use [1] to index. What does each return?",
        hint: "Python starts counting from 0 (0-based indexing), while R starts from 1 (1-based indexing).",
        lang: "python",
        code: "# Python\ngdp = [100, 200, 300]\nprint(gdp[1])  # ???\n\n# R equivalent\n# gdp <- c(100, 200, 300)\n# print(gdp[1])  # ???",
        options: [
          "Both print 200 — indexing works the same in both languages",
          "Python prints 200 (0-based), R prints 100 (1-based)",
          "Python prints 100 (1-based), R prints 200 (0-based)",
          "Both print 100 — both languages use 1-based indexing"
        ],
        correct: 1,
        explanation: "B is correct: Python uses 0-based indexing (element [0]=100, [1]=200, [2]=300), while R uses 1-based indexing (element [1]=100, [2]=200, [3]=300). So [1] returns different elements in each language. A is wrong because the two languages use different indexing conventions. C is wrong because it reverses the conventions — Python is 0-based, not 1-based. D is wrong because Python uses 0-based indexing, not 1-based. This difference is a frequent source of off-by-one bugs when translating code between languages."
      },
      {
        type: "bug",
        title: "Stata Collapse Syntax",
        prompt: "This code should compute the mean income by year, but produces an error. What is the bug?",
        hint: "Look at the position of the statistic name. Stata's <code>collapse</code> uses prefix syntax: the statistic goes in parentheses <b>before</b> the variable, not wrapped around it.",
        lang: "stata",
        code: "collapse mean(income), by(year)\nlist in 1/5",
        options: [
          "The collapse command does not accept a by() option",
          "The syntax is wrong — it should be (mean) income, not mean(income)",
          "You cannot use list after a collapse operation",
          "collapse only works on string variables, not numeric ones"
        ],
        correct: 1,
        explanation: "B is correct: Stata's collapse uses prefix syntax — the statistic goes in parentheses before the variable: collapse (mean) income, by(year). Writing mean(income) mimics function-call syntax from other languages, but Stata does not recognize it. A is wrong because by() is a standard option that tells collapse which groups to compute statistics within. C is wrong because list works after any data manipulation, including collapse. D is wrong because collapse is designed specifically for numeric variables — computing means, sums, medians, etc."
      },
      {
        type: "reorder",
        title: "Stata Analysis Workflow",
        prompt: "Arrange these Stata commands into a correct script that loads data, cleans it, analyzes, and reports.",
        hint: "Start with <code>use</code> to load data, then clean with <code>drop if</code>, then analyze with <code>summarize</code> and <code>table</code>, and finally <code>display</code> results.",
        lang: "stata",
        lines: [
          "drop if missing(income, education)",
          "display \"Max group mean income: \" r(max)",
          "use \"survey.dta\", clear",
          "table education, statistic(mean income)",
          "summarize income, meanonly"
        ],
        correctOrder: [2, 0, 4, 3, 1],
        explanation: "use must come first because all subsequent commands need data in memory. drop if missing comes second because cleaning should happen before analysis to avoid biased results. summarize comes third because it stores results in r() that we reference later. table comes fourth because it provides grouped analysis after we understand the overall distribution. display comes last because it references r(max), which is only populated after the preceding commands run."
      },
      {
        type: "fill",
        title: "R Pipe Chain with Multiple Steps",
        prompt: "Fill in the blanks to filter, group, summarize, and arrange results in R. GAP1 is a comparison operator (e.g. <code>&gt;=</code>), GAP2 is a grouping variable name (e.g. <code>region</code>), and GAP3 is an aggregation function (e.g. <code>mean</code>).",
        hint: "Use a comparison operator like <code>&gt;=</code> for filtering, a categorical column name for grouping, and <code>mean</code> to compute the average.",
        lang: "r",
        codeTemplate: "result <- df %>%\n  filter(year ___GAP1___ 2020) %>%\n  group_by(___GAP2___) %>%\n  summarise(avg_wage = ___GAP3___(wage, na.rm = TRUE)) %>%\n  arrange(desc(avg_wage))",
        gaps: {
          "GAP1": { answer: ">=", accept: [">=", "==", ">"] },
          "GAP2": { answer: "region", accept: ["region", "country", "sector"] },
          "GAP3": { answer: "mean", accept: ["mean", "median"] }
        },
        explanation: "GAP1 (>=): the comparison operator determines which years to include — >= keeps 2020 and later, == keeps only 2020, > excludes 2020. A common mistake is writing => (reversed order), which R does not recognize. GAP2 (region): this must be a categorical variable suitable for grouping — using a continuous variable like wage would create one group per unique value. GAP3 (mean): the aggregation function must match what avg_wage suggests; students sometimes write average() (which does not exist in R) instead of mean()."
      },
      {
        type: "match",
        title: "For Loops Across Languages",
        prompt: "Match each loop syntax with its language.",
        hint: "Python uses <code>for x in ...</code> with a colon and indentation. Stata uses <code>forvalues</code>/<code>foreach</code> with curly braces. R uses <code>for (x in ...)</code> with curly braces.",
        pairs: [
          { left: "for i in range(10):\n    print(i)", leftLang: "Python", right: "forvalues i = 1/10 {\n    display `i'\n}", rightLang: "Stata" },
          { left: "for country in ['US','UK','FR']:\n    print(country)", leftLang: "Python", right: "foreach c in US UK FR {\n    display \"`c'\"\n}", rightLang: "Stata" },
          { left: "for x in df.columns:\n    print(x)", leftLang: "Python", right: "for (x in names(df)) {\n    print(x)\n}", rightLang: "R" }
        ],
        explanation: "Python loops use 'for var in iterable:' with a colon and indentation to delimit the body. Stata has two loop types: 'forvalues' for numeric ranges (note: 1/10, not 0-based) and 'foreach' for lists of items — both use curly braces and require backtick-apostrophe macro expansion (`i'). R uses 'for (var in sequence)' with parentheses around the iterator clause and curly braces for the body. Note that Python's range(10) gives 0-9 while Stata's 1/10 gives 1-10."
      },
      {
        type: "bug",
        title: "Cross-Language Operator: %% in Python and R",
        prompt: "A student translated a Python calculation to R but expects a different result. What actually happens?",
        hint: "Compare the <code>%%</code> operator in both languages. Does it do the same thing? Look carefully at the actual output.",
        lang: "r",
        code: "# Python:  result = 7 %% 2   --> 1 (remainder)\n# R:\nresult <- 7 %% 2\nprint(result)     # prints 1",
        options: [
          "R cannot perform modulo operations on integers",
          "Both produce the same result — %% is the modulo operator in both Python and R",
          "R's %% performs integer division, not modulo",
          "R requires the modulo() function instead of the %% operator"
        ],
        correct: 1,
        explanation: "B is correct: %% computes the remainder (modulo) in both Python and R — 7 %% 2 = 1 because 7 = 3*2 + 1. A is wrong because R handles modulo on integers and doubles without issue. C is wrong because R's integer division operator is %/% (not %%) — 7 %/% 2 = 3. D is wrong because %% is the built-in infix operator for modulo in R; no function call is needed. Note: while %% behaves identically for positive numbers, Python and R differ for negative numbers (e.g., -7 %% 2 gives 1 in Python but -1 in R)."
      }
    ]
  };

  // ============================================================
  // TOPIC 2: DATA IMPORT (Module 2: Data Harnessing)
  // ============================================================
  window.PRACTICE_EXERCISES.data_import = {

    // ----------------------------------------------------------
    // BEGINNER (8 exercises)
    // ----------------------------------------------------------
    beginner: [
      {
        type: "read",
        title: "Reading a CSV File in Python",
        prompt: "What does this code do?",
        hint: "Look at the three steps: import the library, call <code>read_csv()</code>, then call <code>.head()</code>. What does <code>.head()</code> show by default?",
        lang: "python",
        code: "import pandas as pd\ndf = pd.read_csv('gdp_data.csv')\ndf.head()",
        options: [
          "Creates a new CSV file named gdp_data.csv on disk",
          "Loads the CSV into a DataFrame and displays the first 5 rows",
          "Loads the CSV and prints every row in the dataset",
          "Reads only the header row and ignores all data rows"
        ],
        correct: 1,
        explanation: "B is correct: pd.read_csv() loads the file into a DataFrame, and .head() displays the first 5 rows by default (you can pass a number like .head(10) to change this). A is wrong because read_csv reads an existing file — it does not create one (to_csv does that). C is wrong because .head() specifically limits output to 5 rows to avoid flooding your screen with large datasets. D is wrong because read_csv loads all rows and columns into memory, not just headers — .head() merely controls what is displayed."
      },
      {
        type: "read",
        title: "Stata Data Import with describe",
        prompt: "What does this Stata code accomplish?",
        hint: "Focus on two commands: <code>import delimited</code> loads external data, and <code>describe</code> shows variable metadata. The <code>clear</code> option removes existing data from memory.",
        lang: "stata",
        code: "import delimited \"trade_data.csv\", clear\ndescribe",
        options: [
          "It exports current data from Stata memory to a CSV file",
          "It loads a CSV into memory (replacing existing data) and then shows variable names and types",
          "It merges trade_data.csv with the data already in memory",
          "It reads only the first row of the CSV file into memory"
        ],
        correct: 1,
        explanation: "B is correct: 'import delimited' reads the CSV file into Stata's memory, and 'clear' replaces any existing data. 'describe' then lists all variables with their types and labels. A is wrong because import delimited reads data in, not out — exporting uses 'export delimited'. C is wrong because importing with clear replaces existing data entirely — merging requires the separate 'merge' command. D is wrong because import delimited reads all rows, not just the first — 'list in 1/1' would show only one row."
      },
      {
        type: "read",
        title: "R glimpse() for Data Preview",
        prompt: "What information does glimpse() provide?",
        hint: "<code>glimpse()</code> is like a transposed version of <code>head()</code> — it shows each column as a row, with its type and first few values.",
        lang: "r",
        code: "library(readr)\ndf <- read_csv('employment.csv')\nglimpse(df)",
        options: [
          "Only the total number of rows and columns",
          "A transposed summary: each column shown as a row with its type and sample values",
          "Full statistical summary with mean, median, and standard deviation for each column",
          "Only the column names, with no data preview or type information"
        ],
        correct: 1,
        explanation: "B is correct: glimpse() displays each column as a row, showing the column name, data type (chr, dbl, int, etc.), and the first few values that fit on screen. A is wrong because glimpse() shows dimensions plus detailed per-column information, not just counts. C is wrong because statistical summaries are provided by summary(), not glimpse() — glimpse shows raw data types and sample values. D is wrong because glimpse() includes both the data type and a preview of actual values alongside each column name."
      },
      {
        type: "bug",
        title: "Windows File Paths and Escape Characters",
        prompt: "A student on Windows gets a FileNotFoundError when running this line. What is wrong?",
        hint: "In Python strings, the backslash <code>\\</code> is an escape character. What does <code>\\n</code> mean inside a string?",
        lang: "python",
        code: "df = pd.read_csv('C:\\Users\\data\\new_file.csv')",
        options: [
          "pd.read_csv() cannot open files from the C:\\ drive",
          "The backslash is Python's escape character, so \\n becomes a newline instead of the folder name",
          "The file extension .csv must be written in uppercase as .CSV",
          "You must call import os before reading any file from disk"
        ],
        correct: 1,
        explanation: "B is correct: in Python strings, \\ is the escape character — \\n means 'newline' and \\t means 'tab'. The path 'C:\\Users\\data\\new_file.csv' has \\n interpreted as a newline, breaking the path. Fixes: use a raw string r'C:\\Users\\data\\new_file.csv', use forward slashes 'C:/Users/data/new_file.csv', or double the backslashes 'C:\\\\Users\\\\data\\\\new_file.csv'. A is wrong because pandas can read files from any drive or directory. C is wrong because file extensions are case-insensitive on Windows. D is wrong because pandas handles file reading on its own — os is not required."
      },
      {
        type: "fill",
        title: "Reading an Excel File",
        prompt: "Fill in the blanks to load the second sheet of an Excel file. GAP1 is the pandas function name (e.g. <code>read_excel</code>), and GAP2 is the sheet index or name (remember: Python uses 0-based indexing, so the second sheet is <code>1</code>).",
        hint: "The function is <code>read_excel</code>. For the second sheet, use 0-based index <code>1</code> or the name <code>'Sheet2'</code>.",
        lang: "python",
        codeTemplate: "df = pd.___GAP1___('survey.xlsx', sheet_name=___GAP2___)",
        gaps: {
          "GAP1": { answer: "read_excel", accept: ["read_excel"] },
          "GAP2": { answer: "1", accept: ["1", "'Sheet2'", "\"Sheet2\""] }
        },
        explanation: "GAP1 (read_excel): this is pandas' function for Excel files — a common mistake is writing read_xlsx (which does not exist in pandas) or read_csv (which cannot parse Excel format). GAP2 (1): Python's 0-based indexing means the second sheet has index 1 — writing 2 would request the third sheet. Alternatively, you can pass the sheet name as a string like 'Sheet2'."
      },
      {
        type: "reorder",
        title: "Basic Stata Data Pipeline",
        prompt: "Arrange these Stata commands to load, inspect, and save data.",
        hint: "You must load data before inspecting it, and inspect before saving. <code>import delimited</code> comes first, <code>save</code> comes last.",
        lang: "stata",
        lines: [
          "save \"clean_data.dta\", replace",
          "import delimited \"raw_data.csv\", clear",
          "describe",
          "browse in 1/10"
        ],
        correctOrder: [1, 2, 3, 0],
        explanation: "import delimited must come first because all other commands require data in memory. describe comes next because you need to verify that variables were imported with correct names and types before doing anything else. browse follows because visual inspection of actual values helps catch import issues that describe misses (e.g., misaligned columns). save comes last because you should only save after confirming the import is correct — saving prematurely locks in errors."
      },
      {
        type: "match",
        title: "File Reading Across Languages",
        prompt: "Match each file-reading function with its language.",
        hint: "Python pandas functions start with <code>pd.</code>, R uses standalone functions, and Stata uses commands like <code>use</code> and <code>import</code>.",
        pairs: [
          { left: "pd.read_csv('data.csv')", leftLang: "Python", right: "read_csv('data.csv')", rightLang: "R" },
          { left: "pd.read_stata('data.dta')", leftLang: "Python", right: "use \"data.dta\", clear", rightLang: "Stata" },
          { left: "pd.read_excel('data.xlsx')", leftLang: "Python", right: "import excel \"data.xlsx\", firstrow clear", rightLang: "Stata" }
        ],
        explanation: "For CSVs, Python uses pd.read_csv() while R uses read_csv() from readr — same name, but Python requires the pd. prefix. For Stata files, Python has pd.read_stata() while Stata itself uses 'use' — Stata's native format does not need 'import'. For Excel, Python uses pd.read_excel() while Stata uses 'import excel' with the 'firstrow' option to treat the first row as variable names (pandas does this by default)."
      },
      {
        type: "bug",
        title: "Encoding Errors with European Data in R",
        prompt: "A student gets garbled characters (like Ã©) when loading a French dataset in R. What should they fix?",
        hint: "Garbled accented characters (e.g. <code>Ã©</code> instead of <code>é</code>) typically indicate an encoding mismatch. European files often use Latin-1 encoding.",
        lang: "r",
        code: "df <- read.csv('french_census.csv')",
        options: [
          "The file is too large for R's read.csv() to handle",
          "The file uses Latin-1 encoding — add fileEncoding = 'latin1' to specify the correct decoding",
          "French characters are not supported by R's string handling",
          "The file must be converted to .rds format before R can read it"
        ],
        correct: 1,
        explanation: "B is correct: European datasets often use Latin-1 (ISO-8859-1) encoding for accented characters. If R assumes UTF-8 (the default), it misinterprets the bytes, producing garbled output like 'Ã©' instead of 'é'. The fix is read.csv('french_census.csv', fileEncoding = 'latin1'). A is wrong because file size does not cause character garbling — it would cause memory errors instead. C is wrong because R fully supports Unicode and accented characters when the encoding is correctly specified. D is wrong because R can read CSV files in any encoding — .rds conversion is not needed."
      }
    ],

    // ----------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // ----------------------------------------------------------
    intermediate: [
      {
        type: "read",
        title: "Left Join Behavior with Unmatched Rows",
        prompt: "What does this merge produce if some countries in gdp_df have no match in pop_df?",
        hint: "A <code>left</code> join keeps all rows from the left (first) DataFrame. Think about what happens to columns from the right DataFrame when there is no match.",
        lang: "python",
        code: "result = pd.merge(gdp_df, pop_df, on='country', how='left')",
        options: [
          "Only countries found in both DataFrames are kept",
          "All countries from gdp_df are kept; unmatched rows get NaN for population columns",
          "All countries from pop_df are kept; unmatched rows get NaN for GDP columns",
          "An error — merge requires both DataFrames to have identical country values"
        ],
        correct: 1,
        explanation: "B is correct: a left join keeps every row from the left DataFrame (gdp_df) and fills in NaN where no match exists in the right DataFrame (pop_df). A is wrong because that describes an inner join (how='inner'), which drops unmatched rows. C is wrong because that describes a right join (how='right'), which preserves the right DataFrame instead of the left. D is wrong because merge handles unmatched rows gracefully — it does not require identical keys."
      },
      {
        type: "read",
        title: "Stata 1:m Merge Specification",
        prompt: "What does the 1:m specification mean in this merge?",
        hint: "<code>1:m</code> stands for one-to-many. Think about which dataset has unique keys and which has repeated keys.",
        lang: "stata",
        code: "use \"countries.dta\", clear\nmerge 1:m country_id using \"trade_flows.dta\"",
        options: [
          "Each country_id appears exactly once in both datasets",
          "Each country_id is unique in the master but can repeat in the using dataset",
          "Each country_id can repeat in both datasets without restriction",
          "It merges only the first observation per country_id and discards the rest"
        ],
        correct: 1,
        explanation: "B is correct: 1:m (one-to-many) means each key appears at most once in the master dataset (countries.dta) but may appear multiple times in the using dataset (trade_flows.dta) — e.g., one country row matches many trade records. A is wrong because that describes a 1:1 merge, where keys must be unique in both datasets. C is wrong because that describes m:m (many-to-many), which Stata allows but is almost always a mistake. D is wrong because 1:m preserves all matching rows in the using dataset — it does not discard duplicates."
      },
      {
        type: "bug",
        title: "Case-Sensitive Merge Keys",
        prompt: "This merge returns far fewer rows than expected. What is the likely problem?",
        hint: "Look at the actual values in the key columns: <code>'France'</code> vs <code>'france'</code>. String matching in merges is case-sensitive.",
        lang: "python",
        code: "# gdp_df has column: 'Country' with values like 'France'\n# codes_df has column: 'country' with values like 'france'\nresult = pd.merge(gdp_df, codes_df, left_on='Country', right_on='country')",
        options: [
          "left_on and right_on cannot be used together in a merge",
          "The key values differ in capitalization — 'France' != 'france' — causing most rows to fail matching",
          "You must specify how='outer' for any merge to produce results",
          "Merging on string columns is not supported by pandas"
        ],
        correct: 1,
        explanation: "B is correct: string comparison in merges is case-sensitive, so 'France' and 'france' are treated as different values and do not match. Fix by normalizing case before merging: gdp_df['Country'].str.lower(). A is wrong because left_on and right_on are designed to be used together when the key columns have different names. C is wrong because the default how='inner' works fine when keys actually match — the problem is the case mismatch, not the join type. D is wrong because pandas fully supports merging on string columns."
      },
      {
        type: "read",
        title: "Importing Data from a URL in Stata",
        prompt: "What does this Stata code do?",
        hint: "Notice that the path is a URL, not a local file. Stata's <code>import delimited</code> can read directly from web addresses.",
        lang: "stata",
        code: "import delimited \"https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv\", clear\ndescribe\nlist in 1/5",
        options: [
          "It opens a web browser to download the file manually",
          "It downloads and loads the CSV directly from a URL, then shows variable info and the first 5 rows",
          "It stores the URL as a string variable in the dataset",
          "An error — Stata cannot read files from web URLs"
        ],
        correct: 1,
        explanation: "B is correct: Stata's import delimited accepts URLs directly, downloading and parsing the CSV in one step. describe then shows variable metadata, and list in 1/5 displays the first 5 observations. A is wrong because Stata handles the download internally — no browser is involved. C is wrong because the URL is used to locate the file, not stored as data — the CSV contents become the dataset. D is wrong because Stata supports HTTP/HTTPS URLs for import commands, which is convenient for reproducible research with public data."
      },
      {
        type: "reorder",
        title: "API Data to DataFrame Pipeline",
        prompt: "Arrange these lines to fetch API data and convert it to a DataFrame.",
        hint: "The flow is: import libraries, make the request, parse the JSON, extract the records, then create a DataFrame. Each step depends on the previous one.",
        lang: "python",
        lines: [
          "df = pd.DataFrame(records)",
          "records = [{'year': item['date'], 'gdp': item['value']} for item in data[1]]",
          "data = response.json()",
          "import requests, pandas as pd",
          "response = requests.get(url, params={'format': 'json'})"
        ],
        correctOrder: [3, 4, 2, 1, 0],
        explanation: "import comes first because requests.get and pd.DataFrame are unavailable without it. requests.get follows because it creates the response object. response.json() comes next because it parses the raw HTTP response into a Python data structure. The list comprehension follows because it requires the parsed data to extract records. pd.DataFrame comes last because it needs the records list. Reversing any two adjacent steps would cause a NameError (undefined variable)."
      },
      {
        type: "fill",
        title: "R Left Join with dplyr",
        prompt: "Fill in the blanks to perform a left join in R using dplyr. GAP1 is the join function name (e.g. <code>left_join</code>), and GAP2 is the key column name in quotes (e.g. <code>'country'</code>).",
        hint: "The dplyr function for a left join is <code>left_join</code>. The <code>by</code> argument takes the key column name as a quoted string.",
        lang: "r",
        codeTemplate: "result <- ___GAP1___(gdp_df, pop_df, by = ___GAP2___)",
        gaps: {
          "GAP1": { answer: "left_join", accept: ["left_join"] },
          "GAP2": { answer: "'country'", accept: ["'country'", "\"country\"", "c('country')", "c(\"country\")"] }
        },
        explanation: "GAP1 (left_join): dplyr uses descriptive function names — left_join, right_join, inner_join, full_join — unlike pandas which uses a single merge() with a how= parameter. A common mistake is writing merge() (base R) or pd.merge() (Python syntax). GAP2 ('country'): the by= argument requires a quoted string — writing by = country (unquoted) causes an error because R tries to evaluate country as a variable."
      },
      {
        type: "match",
        title: "Merge Operations Across Languages",
        prompt: "Match equivalent merge operations across Python and Stata.",
        hint: "Think about what each merge does: keeping all left rows, keeping only matches, or stacking rows vertically.",
        pairs: [
          { left: "pd.merge(a, b, on='id', how='left')", leftLang: "Python", right: "merge 1:1 id using \"b.dta\"", rightLang: "Stata" },
          { left: "pd.merge(a, b, on='id', how='inner')", leftLang: "Python", right: "merge 1:1 id using \"b.dta\", keep(3)", rightLang: "Stata" },
          { left: "pd.concat([df1, df2])", leftLang: "Python", right: "append using \"df2.dta\"", rightLang: "Stata" }
        ],
        explanation: "A left merge in Python (how='left') keeps all left-side rows; in Stata, a basic merge keeps all master rows by default (keep(1 3) makes this explicit). An inner merge in Python (how='inner') keeps only matched rows; Stata's keep(3) achieves this by retaining only observations matched in both datasets (_merge==3). pd.concat stacks DataFrames vertically (row-wise); Stata's append does the same — both require matching column structures."
      },
      {
        type: "bug",
        title: "Navigating Nested JSON from an API in R",
        prompt: "A student fetched World Bank API data in R but gets an error accessing the results. What is wrong?",
        hint: "The World Bank API returns a JSON array with two elements: metadata and records. Try accessing <code>data[[2]]</code> instead of <code>data$indicator</code>.",
        lang: "r",
        code: "library(jsonlite)\ndata <- fromJSON('https://api.worldbank.org/v2/country/FRA/indicator/NY.GDP.PCAP.CD?format=json&date=2010:2020')\ngdp_value <- data$indicator$value",
        options: [
          "fromJSON() returns a plain character string, not a structured list",
          "The API returns a list — the records are in data[[2]], not data$indicator",
          "fromJSON() can only read local files, not URLs",
          "You must call names(data) before you can access any elements"
        ],
        correct: 1,
        explanation: "B is correct: the World Bank API returns a JSON array with two elements — metadata at index 1 and actual records at index 2. In R, fromJSON() parses this as a list, so data[[2]] contains the data frame of results. A is wrong because fromJSON() parses JSON into R data structures (lists, data frames), not character strings. C is wrong because fromJSON() supports URLs directly, downloading and parsing in one step. D is wrong because names() is a diagnostic tool — it is not a prerequisite for accessing list elements."
      }
    ],

    // ----------------------------------------------------------
    // ADVANCED (8 exercises)
    // ----------------------------------------------------------
    advanced: [
      {
        type: "read",
        title: "Wide-to-Long Reshape with melt()",
        prompt: "What does this reshape operation produce?",
        hint: "<code>melt()</code> converts columns into rows. Each column in <code>value_vars</code> becomes a row, with the column name stored in <code>var_name</code> and the value in <code>value_name</code>.",
        lang: "python",
        code: "# df has columns: country, gdp_2018, gdp_2019, gdp_2020\ndf_long = df.melt(\n    id_vars='country',\n    value_vars=['gdp_2018','gdp_2019','gdp_2020'],\n    var_name='year',\n    value_name='gdp'\n)",
        options: [
          "A wider DataFrame with additional columns added for each year",
          "A long DataFrame with columns: country, year, gdp — one row per country-year pair",
          "A summary table showing the mean GDP per country across years",
          "An error — melt() cannot accept multiple columns in value_vars"
        ],
        correct: 1,
        explanation: "B is correct: melt() reshapes from wide to long — each country-year combination becomes its own row. If df has 5 countries and 3 year columns, df_long has 15 rows with columns country, year (holding 'gdp_2018', 'gdp_2019', 'gdp_2020'), and gdp (holding the values). A is wrong because melt() makes data longer (more rows, fewer columns), not wider. C is wrong because melt() restructures data without computing any aggregates. D is wrong because value_vars is designed to accept a list of column names."
      },
      {
        type: "read",
        title: "Stata reshape long",
        prompt: "What does this Stata reshape do to a dataset with variables income2018, income2019, income2020?",
        hint: "Stata's <code>reshape long</code> converts wide stub-variables (like <code>income2018</code>) into rows. The <code>i()</code> option is the panel ID, and <code>j()</code> captures the suffix (year).",
        lang: "stata",
        code: "reshape long income, i(country_id) j(year)",
        options: [
          "It creates new columns income2018, income2019, income2020 from a long-format dataset",
          "It converts income2018, income2019, income2020 into rows with a new 'year' variable holding 2018, 2019, 2020",
          "It deletes all income columns except the most recent year",
          "It merges an external file containing income data by year"
        ],
        correct: 1,
        explanation: "B is correct: reshape long takes stub variables (income2018, income2019, income2020) and stacks them into rows. The suffix (2018, 2019, 2020) becomes the new variable named in j(year), and the values go into a single 'income' column. A is wrong because that describes reshape wide, which is the reverse operation — converting rows back to columns. C is wrong because reshape preserves all data; it restructures rather than deletes. D is wrong because reshape operates on data already in memory — it does not access external files."
      },
      {
        type: "bug",
        title: "Missing Key Variables in a Stata Merge",
        prompt: "A researcher merges country-level controls with panel data in Stata but gets unexpected duplicates. What is wrong?",
        hint: "Look at the key variables listed after <code>merge</code>. Both datasets have a <code>year</code> variable — is it included in the merge keys?",
        lang: "stata",
        code: "* master: panel data with country, year, gdp\n* using: controls with country, year, population, area\nmerge m:1 country using \"controls.dta\"",
        options: [
          "The merge type m:1 should be changed to 1:1 for panel data",
          "The merge keys omit 'year' — it should be merge m:1 country year using to match the panel structure",
          "Stata's merge command cannot handle panel data at all",
          "The using dataset should be specified as the master instead"
        ],
        correct: 1,
        explanation: "B is correct: when both datasets contain 'year', merging only on 'country' matches each master-year row to every using-year row with the same country, creating incorrect cross-joins. The fix is merge m:1 country year using \"controls.dta\". A is wrong because m:1 is correct — the master (panel) has multiple rows per country while the using (controls) may have one row per country-year. C is wrong because Stata merges handle panel data routinely — the issue is the key specification. D is wrong because swapping master and using does not fix the missing key problem."
      },
      {
        type: "bug",
        title: "JavaScript-Rendered Content and Web Scraping",
        prompt: "This scraper returns an empty list even though the webpage has a visible data table. What is the likely issue?",
        hint: "Think about how the table gets rendered. Does <code>requests.get()</code> execute JavaScript? Many modern pages load content dynamically after the initial HTML.",
        lang: "python",
        code: "from bs4 import BeautifulSoup\nimport requests\nhtml = requests.get('https://example.org/stats').text\nsoup = BeautifulSoup(html, 'html.parser')\nrows = soup.find_all('tr', class_='data-row')",
        options: [
          "BeautifulSoup cannot parse HTML table elements",
          "requests.get() does not return text content from web pages",
          "The table is loaded by JavaScript after page load — requests only gets the initial static HTML",
          "find_all() requires a CSS selector string instead of tag and class arguments"
        ],
        correct: 2,
        explanation: "C is correct: requests.get() fetches only the raw HTML that the server sends initially — it does not execute JavaScript. Many modern websites load tables dynamically via JavaScript after the page loads, so the table HTML does not exist in what requests receives. Solutions include Selenium (runs a real browser) or finding the underlying API endpoint. A is wrong because BeautifulSoup parses HTML tables perfectly well when they are present in the HTML. B is wrong because requests.get().text returns the HTML content as a string. D is wrong because find_all('tr', class_='data-row') is valid BeautifulSoup syntax for finding tags by name and CSS class."
      },
      {
        type: "reorder",
        title: "Complete Web Scraping Pipeline",
        prompt: "Arrange these lines into a working web scraping script.",
        hint: "The pipeline is: import, fetch page, parse HTML, loop through rows, extract cells, store data. Imports always come first.",
        lang: "python",
        lines: [
          "cells = row.find_all('td')",
          "from bs4 import BeautifulSoup\nimport requests, pandas as pd",
          "for row in soup.find_all('tr')[1:]:",
          "soup = BeautifulSoup(response.text, 'html.parser')",
          "response = requests.get('https://example.org/data')",
          "    records.append({'country': cells[0].text, 'gdp': cells[1].text})"
        ],
        correctOrder: [1, 4, 3, 2, 0, 5],
        explanation: "Imports come first because all subsequent code uses requests, BeautifulSoup, and pd. requests.get() follows because it fetches the raw HTML that BeautifulSoup needs. BeautifulSoup parsing comes next because it creates the soup object needed for find_all(). The for loop follows because it iterates over the parsed table rows ([1:] skips the header row). find_all('td') comes inside the loop because it extracts cells from each specific row. The append comes last because it requires the cells to already be extracted."
      },
      {
        type: "fill",
        title: "R pivot_longer for Reshaping",
        prompt: "Fill in the blanks to reshape wide data to long format in R. GAP1 is the tidyr function name (e.g. <code>pivot_longer</code>), GAP2 is the name for the new column holding former column names (e.g. <code>'year'</code>), and GAP3 is the name for the values column (e.g. <code>'gdp'</code>).",
        hint: "The function is <code>pivot_longer</code>. The <code>names_to</code> and <code>values_to</code> arguments take quoted strings for the new column names.",
        lang: "r",
        codeTemplate: "df_long <- df %>%\n  ___GAP1___(cols = starts_with('gdp_'),\n             names_to = ___GAP2___,\n             values_to = ___GAP3___)",
        gaps: {
          "GAP1": { answer: "pivot_longer", accept: ["pivot_longer"] },
          "GAP2": { answer: "'year'", accept: ["'year'", "\"year\""] },
          "GAP3": { answer: "'gdp'", accept: ["'gdp'", "\"gdp\""] }
        },
        explanation: "GAP1 (pivot_longer): this is tidyr's function for wide-to-long reshaping — students often confuse it with pivot_wider (which goes in the opposite direction) or write melt (the pandas equivalent, not available in R). GAP2 ('year'): names_to requires a quoted string for the new column name — a common mistake is writing year without quotes, which R would interpret as a variable reference. GAP3 ('gdp'): values_to also requires a quoted string — writing gdp unquoted causes the same error."
      },
      {
        type: "match",
        title: "Reshape Operations Across Languages",
        prompt: "Match equivalent reshape operations across Python, R, and Stata.",
        hint: "Match by operation type: wide-to-long reshaping, long-to-wide reshaping, and full (outer) joins.",
        pairs: [
          { left: "df.melt(id_vars='id', var_name='year')", leftLang: "Python", right: "reshape long val, i(id) j(year)", rightLang: "Stata" },
          { left: "df.pivot_table(index='id', columns='year')", leftLang: "Python", right: "reshape wide val, i(id) j(year)", rightLang: "Stata" },
          { left: "pd.merge(a, b, on='id', how='outer')", leftLang: "Python", right: "full_join(a, b, by = 'id')", rightLang: "R" }
        ],
        explanation: "melt() and reshape long both convert wide data to long format — multiple columns become rows. The id_vars/i() specify which columns stay fixed, while var_name/j() names the new variable that captures the former column identity. pivot_table() and reshape wide both do the reverse — rows become columns. pd.merge with how='outer' and full_join both perform a full outer join — keeping all rows from both datasets and filling NaN/NA where no match exists."
      },
      {
        type: "read",
        title: "Portable File Paths with file.path() in R",
        prompt: "Why use file.path() instead of paste() for constructing file paths in R?",
        hint: "Think about what happens when your code runs on a different operating system. Windows uses <code>\\</code> as a path separator, while Mac/Linux uses <code>/</code>.",
        lang: "r",
        code: "data_dir <- 'data'\nfilename <- 'gdp_panel.csv'\n\n# Approach A:\npath_a <- paste(data_dir, filename, sep = '/')\n\n# Approach B:\npath_b <- file.path(data_dir, filename)",
        options: [
          "Approach A is faster and should always be preferred",
          "Approach B automatically uses the correct path separator for the current OS, making code portable",
          "Both are identical in all cases — file.path() is just a cosmetic wrapper",
          "Approach B additionally checks whether the file exists on disk"
        ],
        correct: 1,
        explanation: "B is correct: file.path() inserts the OS-appropriate separator (\\ on Windows, / on Mac/Linux), ensuring code works across platforms. A is wrong because paste() with sep='/' is not faster — and it hardcodes a forward slash that may cause issues on Windows. C is wrong because the two approaches produce different results on Windows: paste gives 'data/gdp_panel.csv' while file.path gives 'data\\gdp_panel.csv'. D is wrong because file.path() only constructs the path string — it does not verify file existence (use file.exists() for that)."
      }
    ]
  };

  // ============================================================
  // TOPIC 3: DATA EXPLORATION (Module 3: Data Exploration)
  // ============================================================
  window.PRACTICE_EXERCISES.data_exploration = {

    // ----------------------------------------------------------
    // BEGINNER (8 exercises)
    // ----------------------------------------------------------
    beginner: [
      {
        type: "read",
        title: "Understanding .describe() Output",
        prompt: "What information does this code produce?",
        hint: "<code>.describe()</code> computes summary statistics for numeric columns. Think about what statistics are most useful for understanding a distribution.",
        lang: "python",
        code: "import pandas as pd\ndf = pd.read_csv('household_survey.csv')\ndf.describe()",
        options: [
          "Only the column names and their data types",
          "Count, mean, std, min, 25%, 50%, 75%, max for each numeric column",
          "A complete printout of every row in the dataset",
          "Only the mean and median of each column"
        ],
        correct: 1,
        explanation: "B is correct: describe() outputs eight statistics per numeric column — count (non-null), mean, standard deviation, minimum, three quartiles (25%, 50%, 75%), and maximum. A is wrong because column names and types are shown by df.dtypes or df.info(), not describe(). C is wrong because describe() produces summary statistics, not raw data — use df.to_string() to see all rows. D is wrong because describe() includes seven additional statistics beyond mean; notably, the 50% row is the median, but describe() does not label it as such."
      },
      {
        type: "read",
        title: "Stata summarize with the detail Option",
        prompt: "What does the 'detail' option add to this command?",
        hint: "Without <code>detail</code>, <code>summarize</code> shows basic stats (mean, std, min, max). The <code>detail</code> option adds a much richer set of distributional information.",
        lang: "stata",
        code: "summarize income, detail",
        options: [
          "Nothing — the output is identical to summarize without detail",
          "Percentiles (1st through 99th), skewness, kurtosis, and the four smallest/largest values",
          "A row-by-row listing of every income observation in the dataset",
          "A histogram visualization of the income distribution"
        ],
        correct: 1,
        explanation: "B is correct: the detail option adds a rich set of distributional information — percentiles at 1%, 5%, 10%, 25%, 50%, 75%, 90%, 95%, 99%, plus skewness, kurtosis, and the four smallest and largest values. A is wrong because detail substantially expands the output from 5 statistics to over 20. C is wrong because listing individual observations requires the 'list' command, not summarize. D is wrong because histograms require the 'histogram' command — summarize produces only text output."
      },
      {
        type: "read",
        title: "Counting Missing Values per Column",
        prompt: "What does this expression return?",
        hint: "<code>.isnull()</code> creates True/False for each cell, and <code>.sum()</code> counts the Trues per column. The result tells you how many values are missing in each column.",
        lang: "python",
        code: "df[['income', 'education', 'age']].isnull().sum()",
        options: [
          "The total number of rows in the DataFrame",
          "The count of missing (NaN) values in each of the three columns",
          "A single True/False value indicating whether any column has missing data",
          "The arithmetic sum of all non-missing values in each column"
        ],
        correct: 1,
        explanation: "B is correct: .isnull() creates a Boolean DataFrame (True where NaN, False otherwise), and .sum() counts True values per column, giving the number of missing values in each of income, education, and age. A is wrong because row count is given by len(df) or df.shape[0], not this chain. C is wrong because .sum() returns one count per column (a Series), not a single True/False — use .isnull().any().any() for that. D is wrong because .sum() here operates on the Boolean output of .isnull(), counting True values — it does not sum the original numeric data."
      },
      {
        type: "bug",
        title: "R mean() Returns NA with Missing Data",
        prompt: "The mean returns NA instead of a number. What needs to change?",
        hint: "R's <code>mean()</code> returns <code>NA</code> if any value in the input is missing. There is a parameter to tell R to remove NAs before computing.",
        lang: "r",
        code: "mean(df$income)",
        options: [
          "df$income is not valid syntax for accessing a column in R",
          "mean() returns NA when any value is missing — add na.rm = TRUE to exclude NAs from the calculation",
          "You must use dplyr's summarise() instead of base R's mean()",
          "Column names require quotes when using the $ accessor: df$'income'"
        ],
        correct: 1,
        explanation: "B is correct: R's mean() propagates NA by default — if even one value is NA, the result is NA. Adding na.rm = TRUE tells R to remove NAs before computing the mean. This is a deliberate safety feature forcing you to acknowledge missing data. A is wrong because df$column_name is standard R syntax for extracting a column as a vector. C is wrong because base R's mean() works perfectly — you just need the na.rm parameter. D is wrong because the $ accessor does not require quotes — df$income is valid syntax."
      },
      {
        type: "fill",
        title: "Frequency Table with dplyr",
        prompt: "Fill in the blanks to create a frequency table of education levels using dplyr. GAP1 is the dplyr function that counts occurrences (e.g. <code>count</code>), and GAP2 is the variable name to count by (e.g. <code>education</code>).",
        hint: "The dplyr function is <code>count</code>, and the variable to tabulate is <code>education</code>.",
        lang: "r",
        codeTemplate: "df %>%\n  ___GAP1___(___GAP2___)",
        gaps: {
          "GAP1": { answer: "count", accept: ["count"] },
          "GAP2": { answer: "education", accept: ["education"] }
        },
        explanation: "GAP1 (count): dplyr's count() tallies occurrences of each unique value — a common mistake is writing table() (which is base R and does not work in a pipe chain) or tally() (which requires a prior group_by). GAP2 (education): this is passed unquoted in dplyr's non-standard evaluation — writing 'education' in quotes would cause an error because count() expects a bare column name."
      },
      {
        type: "reorder",
        title: "Data Exploration Workflow in Python",
        prompt: "Arrange these exploration steps in a logical order.",
        hint: "Load data first, then check its dimensions, then check for missing values, and finally compute summary statistics. Go from structure to quality to content.",
        lang: "python",
        lines: [
          "df.describe()",
          "df = pd.read_csv('wages.csv')",
          "df.isnull().sum()",
          "df.shape"
        ],
        correctOrder: [1, 3, 2, 0],
        explanation: "pd.read_csv must come first because all other commands need the df object to exist. df.shape comes second because knowing the dimensions (rows x columns) sets expectations for all subsequent checks. df.isnull().sum() comes third because missing values affect how you interpret summary statistics — you need to know about data quality before computing aggregates. df.describe() comes last because its summary statistics are meaningful only after you understand the data's structure and completeness."
      },
      {
        type: "match",
        title: "Exploration Commands Across Languages",
        prompt: "Match equivalent data exploration commands.",
        hint: "Match by function: summary statistics, frequency counts, row counts, and missing value checks.",
        pairs: [
          { left: "df.describe()", leftLang: "Python", right: "summary(df)", rightLang: "R" },
          { left: "df['region'].value_counts()", leftLang: "Python", right: "tabulate region", rightLang: "Stata" },
          { left: "df.shape", leftLang: "Python", right: "count", rightLang: "Stata" },
          { left: "df.isnull().sum()", leftLang: "Python", right: "misstable summarize", rightLang: "Stata" }
        ],
        explanation: "df.describe() and summary(df) both produce summary statistics, though R's summary() also works on non-numeric columns while Python's describe() focuses on numeric ones by default. value_counts() and tabulate both count occurrences of each category. df.shape returns (rows, columns) as a tuple while Stata's count reports just the row count. df.isnull().sum() and misstable summarize both report missing values per variable — Stata's version also shows missing-value patterns across variables."
      },
      {
        type: "read",
        title: "Stata bysort Prefix for Grouped Commands",
        prompt: "What does this Stata code compute?",
        hint: "The <code>bysort</code> prefix sorts the data by the specified variable and then runs the command <b>separately for each group</b>.",
        lang: "stata",
        code: "bysort region: summarize income",
        options: [
          "A single summary of income for the entire dataset, ignoring region",
          "Separate summary statistics for income computed within each region",
          "A new variable containing the mean income for each observation's region",
          "It sorts data by region without producing any summary output"
        ],
        correct: 1,
        explanation: "B is correct: bysort region: sorts data by region and then runs summarize income separately for each unique value of region, producing one summary table per group. A is wrong because the bysort prefix explicitly requests group-level computation — without it, summarize would give the overall summary. C is wrong because creating a new variable requires egen (e.g., bysort region: egen mean_inc = mean(income)) — summarize only displays results without modifying data. D is wrong because bysort both sorts and executes the command that follows the colon."
      }
    ],

    // ----------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // ----------------------------------------------------------
    intermediate: [
      {
        type: "read",
        title: "Multiple Aggregations with .agg()",
        prompt: "What does this code produce?",
        hint: "<code>.agg()</code> can accept a list of function names to compute multiple statistics at once. The result has one row per group and one column per statistic.",
        lang: "python",
        code: "result = df.groupby('region')['income'].agg(['mean', 'std', 'count'])",
        options: [
          "A single row showing mean, std, and count of income across all regions combined",
          "A DataFrame with one row per region and columns for mean, std, and count of income",
          "Three separate DataFrames, one for each statistic",
          "An error — .agg() only accepts a single function, not a list"
        ],
        correct: 1,
        explanation: "B is correct: groupby('region') creates groups, ['income'] selects the column, and .agg(['mean', 'std', 'count']) computes all three functions per group. The result is a DataFrame indexed by region with three columns. A is wrong because groupby produces per-group results — to get a single-row overall summary, you would skip groupby and call df['income'].agg(...) directly. C is wrong because .agg() with a list returns one DataFrame with multiple columns, not separate objects. D is wrong because .agg() is specifically designed to accept lists (or dicts) of functions."
      },
      {
        type: "read",
        title: "Boolean Indexing Mechanics",
        prompt: "What does the inner expression df['age'] > 30 actually create?",
        hint: "The comparison <code>df['age'] > 30</code> is applied element-wise. It produces a True/False value for <b>each row</b>, which then acts as a filter mask.",
        lang: "python",
        code: "young_workers = df[df['age'] > 30]",
        options: [
          "A list of integer row indices where age exceeds 30",
          "A Boolean Series (True/False per row) used as a mask to select matching rows",
          "An integer count of how many workers are over 30",
          "A copy of the age column containing only values above 30"
        ],
        correct: 1,
        explanation: "B is correct: df['age'] > 30 produces a Boolean Series the same length as df, with True where the condition holds and False elsewhere. When placed inside df[...], pandas uses it as a mask, keeping only rows marked True. A is wrong because the result is a Series of booleans, not integer indices — use df.index[df['age'] > 30] for indices. C is wrong because the comparison returns a full Series of True/False values, not a single count — use .sum() on the boolean Series for a count. D is wrong because the outer df[...] selects complete rows (all columns), not just the age column."
      },
      {
        type: "bug",
        title: "String Columns Silently Break Numeric Aggregations",
        prompt: "This code runs but the output is unexpectedly empty. Why?",
        hint: "Check the data type of the <code>income</code> column. If numeric values were read as strings (e.g. <code>'45000'</code>), <code>.mean()</code> cannot compute an average.",
        lang: "python",
        code: "# The 'income' column was read as strings: '45000', '52000', etc.\navg_by_region = df.groupby('region')['income'].mean()",
        options: [
          "groupby() cannot operate when the grouping column contains strings",
          "income was read as text, so .mean() silently skips it — returning NaN or empty results",
          "You must use .agg('mean') instead of .mean() for grouped data",
          "The result actually contains correct values — empty output is a display issue"
        ],
        correct: 1,
        explanation: "B is correct: when a column that should be numeric is stored as strings (e.g., due to commas in '45,000' or stray text), .mean() cannot compute an average and silently returns NaN or an empty result. The fix is to check dtypes and convert with pd.to_numeric(). A is wrong because groupby works fine with string grouping columns — the issue is the aggregation column's type. C is wrong because .mean() and .agg('mean') are equivalent — neither works on string data. D is wrong because the empty result is a real data type problem, not a display glitch."
      },
      {
        type: "bug",
        title: "Incomplete Boolean Logic in R filter()",
        prompt: "A student wants to keep rows where region is either North or South. What is wrong?",
        hint: "Look at the right side of the <code>|</code> operator. The expression <code>'South'</code> alone is not a comparison — you need <code>region == 'South'</code>. Or use <code>%in%</code>.",
        lang: "r",
        code: "subset <- df %>%\n  filter(region == 'North' | 'South')",
        options: [
          "The pipe operator %>% is incompatible with filter()",
          "Each side of | needs a complete comparison: region == 'North' | region == 'South'",
          "The filter() function does not support the | (OR) operator",
          "String values cannot be compared with the == operator in R"
        ],
        correct: 1,
        explanation: "B is correct: the | operator does not distribute automatically. Writing region == 'North' | 'South' evaluates 'South' as a standalone logical value (a non-empty string, which is truthy), making the entire condition always TRUE and keeping all rows. The fix is region == 'North' | region == 'South', or more elegantly, region %in% c('North', 'South'). A is wrong because %>% works seamlessly with all dplyr functions including filter(). C is wrong because filter() fully supports | for OR conditions when both sides are proper comparisons. D is wrong because == works perfectly with strings in R."
      },
      {
        type: "reorder",
        title: "dplyr Filter-Group-Summarize Pipeline",
        prompt: "Arrange these R lines into a correct dplyr pipeline.",
        hint: "A dplyr pipeline starts with the data, then filters rows, groups, summarises, and finally arranges. The <code>%&gt;%</code> at the end of a line connects it to the next step.",
        lang: "r",
        lines: [
          "group_by(education) %>%",
          "df %>%",
          "arrange(desc(mean_wage))",
          "filter(year >= 2015) %>%",
          "summarise(mean_wage = mean(wage, na.rm = TRUE)) %>%"
        ],
        correctOrder: [1, 3, 0, 4, 2],
        explanation: "df %>% must start the pipeline because it provides the data that all subsequent verbs operate on. filter() comes next because reducing rows before grouping is more efficient and ensures only relevant data enters the analysis. group_by() follows because you must define groups before computing group-level statistics. summarise() comes after group_by because it collapses each group to one row. arrange() must be last because it sorts the final summary results — sorting before summarise would be pointless since summarise produces new rows."
      },
      {
        type: "fill",
        title: "Cross-Tabulation in Stata",
        prompt: "Fill in the blanks to create a two-way frequency table of education by treatment status in Stata. GAP1 is the Stata command for cross-tabulation (e.g. <code>tabulate</code> or <code>tab</code>), and GAP2 is the second variable name (e.g. <code>treatment</code>).",
        hint: "The command is <code>tabulate</code> (or <code>tab</code>). List two variable names to get a two-way table.",
        lang: "stata",
        codeTemplate: "___GAP1___ education ___GAP2___",
        gaps: {
          "GAP1": { answer: "tabulate", accept: ["tabulate", "tab"] },
          "GAP2": { answer: "treatment", accept: ["treatment", "treated"] }
        },
        explanation: "GAP1 (tabulate): Stata's cross-tabulation command — common mistakes include writing crosstab (Python's pd.crosstab) or table (which exists in Stata but uses different syntax). The abbreviation 'tab' is widely used. GAP2 (treatment): the second variable creates columns in the table while the first (education) creates rows — this is the standard layout for checking balance across treatment groups in experimental research."
      },
      {
        type: "read",
        title: "Correlation Matrix in Stata",
        prompt: "What does this Stata code produce?",
        hint: "The <code>correlate</code> command computes pairwise Pearson correlation coefficients. With three variables, you get a 3x3 matrix.",
        lang: "stata",
        code: "correlate income education_years age",
        options: [
          "The covariance matrix of the three variables",
          "A 3x3 matrix of pairwise Pearson correlation coefficients",
          "A table showing the mean and standard deviation of each variable",
          "An error — correlate requires exactly two variables"
        ],
        correct: 1,
        explanation: "B is correct: correlate computes Pearson correlation coefficients for all pairs, producing a symmetric 3x3 matrix. Diagonal values are always 1.0 (each variable correlates perfectly with itself), and off-diagonal values range from -1 to +1. A is wrong because the covariance matrix requires adding the 'covariance' option — without it, Stata reports standardized correlations. C is wrong because means and standard deviations are shown by summarize, not correlate. D is wrong because correlate accepts any number of variables (2 or more) and produces the corresponding NxN matrix."
      },
      {
        type: "match",
        title: "Grouped Summary Operations Across Languages",
        prompt: "Match equivalent grouped summary operations.",
        hint: "Match by what each pair does: grouped means, grouped means with a plot, and frequency counts of a categorical variable.",
        pairs: [
          { left: "df.groupby('yr')['gdp'].mean()", leftLang: "Python", right: "bysort yr: summarize gdp", rightLang: "Stata" },
          { left: "df.groupby('yr')['gdp'].mean().plot()", leftLang: "Python", right: "df %>% group_by(yr) %>%\n  summarise(m = mean(gdp)) %>%\n  ggplot(aes(yr, m)) + geom_line()", rightLang: "R" },
          { left: "df['sector'].value_counts()", leftLang: "Python", right: "df %>% count(sector)", rightLang: "R" }
        ],
        explanation: "groupby().mean() and bysort: summarize both compute group-level means — Python returns a Series while Stata prints a summary table per group. The plot pair shows how Python chains .plot() directly onto aggregation results, while R separates computation (dplyr) from visualization (ggplot2), requiring explicit aesthetic mapping. value_counts() and count() both tally category frequencies — Python sorts by frequency (descending) by default, while R's count() sorts by the variable values."
      }
    ],

    // ----------------------------------------------------------
    // ADVANCED (8 exercises)
    // ----------------------------------------------------------
    advanced: [
      {
        type: "read",
        title: "Chained Exploration with query() and agg()",
        prompt: "What does this pipeline produce?",
        hint: "Read the chain step by step: <code>query()</code> filters, <code>groupby()</code> groups by two columns, <code>agg()</code> computes multiple stats, and <code>reset_index()</code> flattens the result.",
        lang: "python",
        code: "result = (df\n    .query('year >= 2010 & income > 0')\n    .groupby(['region', 'year'])['income']\n    .agg(['mean', 'median', 'count'])\n    .reset_index()\n)",
        options: [
          "A single summary row aggregating all data from 2010 onward",
          "A DataFrame with region-year rows and columns for mean, median, and count — excluding zero/negative income and pre-2010 data",
          "The original DataFrame filtered and sorted but with no aggregation",
          "An error — query() cannot combine conditions with the & operator"
        ],
        correct: 1,
        explanation: "B is correct: query() filters to post-2010 positive-income rows, groupby() creates region-year groups, agg() computes three statistics per group, and reset_index() converts the multi-index into regular columns. A is wrong because groupby(['region', 'year']) produces one row per region-year combination, not one overall row. C is wrong because .agg() performs aggregation, collapsing each group to a single row. D is wrong because query() supports & for AND conditions and | for OR conditions within its string expression syntax."
      },
      {
        type: "read",
        title: "Navigating Multi-Index GroupBy Results",
        prompt: "What is the structure of this result?",
        hint: "Grouping by two columns creates a multi-level index. Using <code>.loc['France']</code> selects the outer level, returning a Series indexed by the inner level (sector).",
        lang: "python",
        code: "result = df.groupby(['country', 'sector'])['employment'].sum()\nresult.loc['France']",
        options: [
          "A single number representing total French employment across all sectors",
          "A Series indexed by sector, showing total employment per sector in France",
          "The full multi-index Series for all countries, not just France",
          "An error — .loc[] cannot be used on a grouped Series"
        ],
        correct: 1,
        explanation: "B is correct: groupby with two columns creates a multi-level index (country, sector). Using .loc['France'] selects the outer level, returning a Series indexed by the inner level (sector) with summed employment values. A is wrong because .loc['France'] preserves the sector breakdown — to get a single total, you would need result.loc['France'].sum(). C is wrong because .loc['France'] filters to only France's data. D is wrong because .loc[] works on any pandas Series or DataFrame, including those produced by groupby aggregations."
      },
      {
        type: "bug",
        title: "Stata Logical AND Operator Syntax",
        prompt: "A student wants to keep rows where region is 1 AND income is above 50000 in Stata. What is wrong?",
        hint: "Stata does not recognize the word <code>and</code> as a logical operator. Look for the correct symbol for AND in Stata.",
        lang: "stata",
        code: "keep if region == 1 and income > 50000",
        options: [
          "The == operator cannot compare numeric values in Stata",
          "Stata uses & for AND, not the word 'and' — write keep if region == 1 & income > 50000",
          "Stata's keep command does not support compound conditions",
          "The condition should use | (OR) instead of AND logic"
        ],
        correct: 1,
        explanation: "B is correct: Stata uses the symbol & for logical AND and | for logical OR — the English words 'and' and 'or' are not recognized as operators. The fix is keep if region == 1 & income > 50000. A is wrong because == works for numeric comparison in Stata just as it does in other languages. C is wrong because keep if supports arbitrarily complex conditions using &, |, and parentheses. D is wrong because the student's intent is to require both conditions (AND logic), not either condition (OR logic)."
      },
      {
        type: "bug",
        title: "Commas in Numbers Cause Wrong Column Types in R",
        prompt: "A student runs summary(df) but income shows character counts instead of mean/median. What happened?",
        hint: "If a column contains non-numeric characters (like commas in <code>'45,000'</code>), R reads it as character type. <code>summary()</code> behaves differently for character vs numeric columns.",
        lang: "r",
        code: "# income column was read with values like '45,000' and '52,000'\ndf <- read.csv('survey.csv')\nsummary(df$income)",
        options: [
          "summary() randomly varies its output format between runs",
          "Commas in '45,000' caused R to read income as character — summary() shows length/class for characters instead of numeric statistics",
          "summary() only works on entire data frames, not individual columns",
          "You must pass summary(df$income, type = 'numeric') to get numeric output"
        ],
        correct: 1,
        explanation: "B is correct: the commas in values like '45,000' prevent R from parsing them as numbers, so the column is stored as character type. summary() adapts its output to the type — for characters it shows length, class, and mode instead of mean/median/quartiles. The fix: df$income <- as.numeric(gsub(',', '', df$income)). A is wrong because summary()'s output is deterministic based on column type, not random. C is wrong because summary() works on individual columns, vectors, and data frames alike. D is wrong because summary() does not have a type parameter — you must convert the data type before calling it."
      },
      {
        type: "reorder",
        title: "Complete Stata Exploration Script",
        prompt: "Arrange these Stata blocks into a proper exploration workflow.",
        hint: "The workflow is: load data, check quality (missing values and types), clean issues, perform grouped analysis, then visualize. Each step depends on the previous one.",
        lang: "stata",
        lines: [
          "* Step: Check data quality\nmisstable summarize\ndescribe",
          "* Step: Grouped analysis\nbysort region: summarize income, detail",
          "* Step: Clean before analysis\ndestring income, replace force\ndrop if missing(income)",
          "* Step: Load data\nuse \"survey.dta\", clear",
          "* Step: Visualize\ngraph bar (mean) income, over(region) title(\"Mean Income by Region\")"
        ],
        correctOrder: [3, 0, 2, 1, 4],
        explanation: "use must come first because all commands need data in memory. Quality checks (misstable, describe) come second because you need to identify problems before cleaning. Cleaning (destring, drop if missing) comes third because it fixes the issues identified in the previous step — destring converts string-encoded numbers, and dropping missing values prevents them from corrupting analysis. Grouped analysis comes fourth because it requires clean data to produce valid statistics. Visualization comes last because it presents the analysis results — creating a graph before cleaning could display misleading patterns."
      },
      {
        type: "fill",
        title: "R Grouped Summary with Multiple Statistics",
        prompt: "Fill in the blanks to compute mean and standard deviation of wages by sector, excluding missing values. GAP1 is the dplyr summarization function (e.g. <code>summarise</code>), GAP2 is the parameter to remove NAs (e.g. <code>na.rm = TRUE</code>), and GAP3 is the R function for standard deviation (e.g. <code>sd</code>).",
        hint: "Use <code>summarise</code> (or <code>summarize</code>), add <code>na.rm = TRUE</code> to handle missing values, and <code>sd</code> computes the standard deviation.",
        lang: "r",
        codeTemplate: "result <- df %>%\n  group_by(sector) %>%\n  ___GAP1___(\n    avg_wage = mean(wage, ___GAP2___),\n    sd_wage = ___GAP3___(wage, na.rm = TRUE)\n  )",
        gaps: {
          "GAP1": { answer: "summarise", accept: ["summarise", "summarize"] },
          "GAP2": { answer: "na.rm = TRUE", accept: ["na.rm = TRUE", "na.rm=TRUE", "na.rm = T", "na.rm=T"] },
          "GAP3": { answer: "sd", accept: ["sd"] }
        },
        explanation: "GAP1 (summarise): dplyr's aggregation verb — a common mistake is writing summary() (base R, different purpose) or aggregate() (base R, different syntax). Both British (summarise) and American (summarize) spellings work. GAP2 (na.rm = TRUE): this is required in every R statistical function when missing values may be present — forgetting it is the most common cause of unexpected NA results. GAP3 (sd): R's standard deviation function — students sometimes write std() (Python/NumPy name) or stdev() (Excel name), neither of which exists in R."
      },
      {
        type: "match",
        title: "Advanced Exploration Across Languages",
        prompt: "Match equivalent advanced exploration operations.",
        hint: "Match by operation: correlation matrices, row filtering, cross-tabulations, and group-level transformations (adding a group mean as a new column).",
        pairs: [
          { left: "df[cols].corr()", leftLang: "Python", right: "correlate income education age", rightLang: "Stata" },
          { left: "df.query('year >= 2015')", leftLang: "Python", right: "df %>% filter(year >= 2015)", rightLang: "R" },
          { left: "pd.crosstab(df['educ'], df['treated'])", leftLang: "Python", right: "tabulate educ treated", rightLang: "Stata" },
          { left: "df.groupby('yr')['x'].transform('mean')", leftLang: "Python", right: "bysort yr: egen mean_x = mean(x)", rightLang: "Stata" }
        ],
        explanation: "corr() and correlate both compute pairwise Pearson correlations — Python returns a DataFrame while Stata prints a matrix. query() and filter() both subset rows by condition — Python uses a string expression while R uses bare column names. pd.crosstab and tabulate both create two-way frequency tables — useful for checking treatment-control balance. transform('mean') and bysort: egen both add a group-level statistic as a new column without collapsing rows — critically different from summarize/agg which reduce each group to one row."
      },
      {
        type: "read",
        title: "Principled Data Exploration Workflow",
        prompt: "Which observation about this script is correct?",
        hint: "Look at the overall structure: does the script follow a logical progression from data loading to quality checks to analysis? Consider what each numbered section accomplishes.",
        lang: "python",
        code: "# 1. Load\ndf = pd.read_csv('labor_survey.csv')\n\n# 2. Quality check\nassert df.shape[0] > 0, 'Empty dataset!'\nprint(f'Missing: {df.isnull().sum().sum()} / {df.size} values')\n\n# 3. Distribution check\nfor col in ['wage', 'hours', 'experience']:\n    q99 = df[col].quantile(0.99)\n    outliers = (df[col] > q99).sum()\n    print(f'{col}: {outliers} values above 99th percentile')\n\n# 4. Group comparison\npd.set_option('display.float_format', '{:.2f}'.format)\nprint(df.groupby('gender')[['wage','hours']].describe())",
        options: [
          "The assert statement will crash the program regardless of whether data loads correctly",
          "The outlier loop in step 3 is redundant because describe() already reports outliers",
          "The script follows a principled workflow: verify data integrity, check distributions for outliers, then compare groups — with formatted output",
          "pd.set_option only affects how numbers are stored internally, not how they display"
        ],
        correct: 2,
        explanation: "C is correct: the script demonstrates a methodical approach — (1) load data, (2) verify it is non-empty and quantify missingness, (3) systematically check each numeric variable for outliers using percentiles, (4) compare distributions across groups with clean formatting. A is wrong because assert only raises an error when its condition is False — if the dataset has rows, shape[0] > 0 is True and execution continues. B is wrong because describe() shows min/max/quartiles but does not explicitly count outliers or flag values above a threshold — the loop provides targeted outlier detection. D is wrong because set_option('display.float_format') changes only the display formatting (e.g., showing 2 decimal places), not the underlying stored values."
      }
    ]
  };

})();
