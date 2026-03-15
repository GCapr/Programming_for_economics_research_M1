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
          "It installs the pandas package from the internet",
          "It loads the pandas library and lets you refer to it as pd",
          "It creates a new variable pd equal to the string 'pandas'",
          "It renames the pandas library permanently to pd on your system"
        ],
        correct: 1,
        explanation: "The 'import ... as' statement loads a library into your session and creates a short alias. Writing 'as pd' is a convention so you can type pd.read_csv() instead of pandas.read_csv(). It does not install anything or change anything permanently."
      },
      {
        type: "read",
        title: "Vectors and Logical Comparison in R",
        prompt: "What does each line do?",
        hint: "In R, <code>&lt;-</code> and <code>==</code> are different operators. One stores a value, the other tests equality.",
        lang: "r",
        code: "wage <- 45000\nwage == 50000",
        options: [
          "Line 1 stores 45000 in wage; Line 2 checks if wage equals 50000 and returns FALSE",
          "Both lines assign values to wage; wage ends up as 50000",
          "Line 1 checks equality; Line 2 assigns 50000 to wage",
          "Line 1 stores 45000; Line 2 reassigns wage to 50000"
        ],
        correct: 0,
        explanation: "In R, <- is the assignment operator: it stores a value. A double == is the comparison operator: it tests whether two values are equal and returns TRUE or FALSE. Since 45000 != 50000, the second line returns FALSE."
      },
      {
        type: "read",
        title: "R Assignment Operator",
        prompt: "After running this code, what is the value of gdp_growth?",
        hint: "Trace the arithmetic step by step: subtract, then divide. The result is a decimal, not a percentage.",
        lang: "r",
        code: "gdp_2024 <- 1200\ngdp_2025 <- 1260\ngdp_growth <- (gdp_2025 - gdp_2024) / gdp_2024",
        options: [
          "60 — the difference between the two years",
          "0.05 — the growth rate as a decimal",
          "5 — the growth rate as a percentage",
          "Error — cannot use <- for assignment in R"
        ],
        correct: 1,
        explanation: "R uses <- as its primary assignment operator. The calculation is (1260 - 1200) / 1200 = 60 / 1200 = 0.05. This is a decimal growth rate; to get a percentage you would multiply by 100."
      },
      {
        type: "bug",
        title: "Strings Need Quotes in Stata",
        prompt: "What is wrong with this Stata code?",
        hint: "Look at how the value <code>France</code> is assigned. In Stata, text values need special treatment — think about how other languages handle literal text.",
        lang: "stata",
        code: "local country = France\ndisplay \"`country'\"",
        options: [
          "display cannot show local macros in Stata",
          "France should be in quotes because it is a string — use local country = \"France\"",
          "You need to use display `country' without outer quotes",
          "The macro name 'country' is reserved in Stata"
        ],
        correct: 1,
        explanation: "Without quotes, Stata interprets France as a variable or another macro reference, not a string literal. String values must be enclosed in double quotes: local country = \"France\". Stata is strict about quoting strings when assigning them to local macros."
      },
      {
        type: "read",
        title: "Stata Local Macros",
        prompt: "What does the following Stata code display?",
        hint: "Pay attention to the backtick-apostrophe syntax (<code>`threshold'</code>) — this is how Stata expands a local macro to its stored value.",
        lang: "stata",
        code: "local threshold = 25000\ndisplay `threshold'",
        options: [
          "The word threshold is printed literally",
          "25000 is displayed — the local macro is expanded",
          "Error — backtick and apostrophe are not valid Stata syntax",
          "Nothing — display only works with strings"
        ],
        correct: 1,
        explanation: "In Stata, 'local' creates a local macro. You access it with backtick-name-apostrophe (`threshold'). Stata substitutes the macro's value (25000) before executing the display command."
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
        ]
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
        explanation: "pd.read_csv() is the function that loads CSV files. The encoding and sep arguments are keyword arguments — you pass them by name. The semicolon delimiter is common in European datasets where the comma is used as a decimal separator."
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
        explanation: "You must load a library before using its functions, read the data into a tibble, and then use head() to preview. In R, head() shows the first 6 rows by default and is a standalone function, not a method called with the dot accessor."
      }
    ],

    // ----------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // ----------------------------------------------------------
    intermediate: [
      {
        type: "read",
        title: "Method Chaining",
        prompt: "What does this chained expression produce?",
        hint: "Read the chain left to right: <code>groupby()</code> splits, <code>['income']</code> selects a column, and <code>.mean()</code> aggregates. The result has one entry per group.",
        lang: "python",
        code: "import pandas as pd\ndf = pd.DataFrame({'region': ['N','N','S','S'], 'income': [40,60,30,50]})\nresult = df.groupby('region')['income'].mean()",
        options: [
          "A single number: the overall mean income (45.0)",
          "A Series with the mean income per region: N=50.0, S=40.0",
          "The original DataFrame sorted by region",
          "Error — you cannot chain ['income'] after groupby()"
        ],
        correct: 1,
        explanation: "Method chaining reads left to right: df.groupby('region') groups rows, ['income'] selects the column, and .mean() computes the average within each group. The result is a Series indexed by region."
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
          "Error — paste() cannot combine strings and numbers"
        ],
        correct: 2,
        explanation: "In R, round(x, 2) rounds a number to 2 decimal places. paste() concatenates strings and automatically converts numbers to text, separating elements with a space by default. cat() prints the result without the quotes that print() would add."
      },
      {
        type: "bug",
        title: "Comparison in a Filter",
        prompt: "A student wants to filter rows where treatment equals 1. What is wrong?",
        hint: "Look at the operator inside the brackets. There is a difference between <code>=</code> (assignment) and <code>==</code> (comparison).",
        lang: "python",
        code: "treated = df[df['treatment'] = 1]",
        options: [
          "The column name 'treatment' should not be in quotes",
          "Single = is assignment, not comparison — should be == for equality testing",
          "df[] cannot accept boolean conditions",
          "The variable treated is a reserved keyword"
        ],
        correct: 1,
        explanation: "Inside a filter condition, you need the comparison operator == (checks equality), not the assignment operator = (stores a value). The fix: df[df['treatment'] == 1]. This is one of the most common beginner mistakes."
      },
      {
        type: "bug",
        title: "Stata Macro Reference",
        prompt: "This Stata code should loop over three variables, but it fails. Why?",
        hint: "Look at how the macro <code>v</code> is referenced inside the loop. Stata requires a specific quote style: a backtick (<code>`</code>) before and an apostrophe (<code>'</code>) after.",
        lang: "stata",
        code: "local vars income education age\nforeach v of local vars {\n    summarize 'v'\n}",
        options: [
          "foreach cannot loop over local macros in Stata",
          "The macro reference 'v' uses straight quotes — it should be `v' (backtick then apostrophe)",
          "summarize does not accept variable names as arguments",
          "The local macro should be defined with local vars = income education age"
        ],
        correct: 1,
        explanation: "Stata local macros must be referenced with a backtick (`) before and an apostrophe (') after the name: `v'. Using straight quotes ('v') creates a string literal instead of expanding the macro."
      },
      {
        type: "read",
        title: "R Pipe Operator",
        prompt: "What does this R code produce?",
        hint: "The pipe <code>%&gt;%</code> passes the result of one step as input to the next. Think of it as \"then do this.\"",
        lang: "r",
        code: "library(dplyr)\ndf %>%\n  filter(year == 2020) %>%\n  summarise(mean_gdp = mean(gdp))",
        options: [
          "A tibble with one row containing the mean GDP for the year 2020",
          "The full dataset filtered to 2020 but unsummarized",
          "Error — %>% is not valid R syntax",
          "A vector of all GDP values in 2020"
        ],
        correct: 0,
        explanation: "The pipe operator %>% passes the result of each step to the next function. First filter() keeps only 2020 rows, then summarise() computes the mean GDP. The result is a one-row tibble with a column called mean_gdp."
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
        explanation: "In Stata, you first load data (use), then inspect its structure (describe), examine numeric distributions (summarize), and explore categorical variables (tabulate). This mirrors the natural exploration workflow."
      },
      {
        type: "fill",
        title: "Stata Install and Load",
        prompt: "Fill in the blanks to install a user-written Stata package, then use it to run a regression. GAP1 is the Stata command to install packages from the SSC archive (e.g. <code>ssc</code>), and GAP2 is the regression command (e.g. <code>reg</code> or <code>regress</code>).",
        hint: "Stata's package archive is called SSC. The short form of the regression command is <code>reg</code>.",
        lang: "stata",
        codeTemplate: "___GAP1___ install outreg2\n___GAP2___ income treatment age, robust",
        gaps: {
          "GAP1": { answer: "ssc", accept: ["ssc"] },
          "GAP2": { answer: "reg", accept: ["reg", "regress"] }
        },
        explanation: "In Stata, 'ssc install' downloads user-written packages from the Statistical Software Components archive. 'reg' (short for 'regress') runs an OLS regression. The 'robust' option adds heteroskedasticity-robust standard errors."
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
        ]
      }
    ],

    // ----------------------------------------------------------
    // ADVANCED (8 exercises)
    // ----------------------------------------------------------
    advanced: [
      {
        type: "read",
        title: "Nested Function Calls",
        prompt: "What value does result hold after this code runs?",
        hint: "Nested calls evaluate inside-out: first <code>np.log()</code>, then <code>np.mean()</code>, then <code>np.round()</code>. Log-transform produces values around 10-11.",
        lang: "python",
        code: "import numpy as np\nincomes = [30000, 45000, 52000, 48000, 120000]\nresult = np.round(np.mean(np.log(incomes)), 2)",
        options: [
          "59000.0 — the arithmetic mean, rounded",
          "10.58 — the rounded mean of the log-transformed incomes",
          "48000 — the median income",
          "Error — np.log cannot take a list"
        ],
        correct: 1,
        explanation: "Nested calls evaluate inside-out: np.log(incomes) takes the natural log of each element, np.mean() averages those log values, and np.round(..., 2) rounds to 2 decimals. Log-transforming income before averaging is common in economics to handle skewed distributions."
      },
      {
        type: "bug",
        title: "Scope Issue with Python Functions",
        prompt: "This function should add a tax column, but produces an error. Why?",
        hint: "Look at when <code>rate</code> is defined relative to when the function is <b>called</b> (not defined). Python looks up variable names at call time.",
        lang: "python",
        code: "def compute_tax(dataframe):\n    tax = dataframe['income'] * rate\n    dataframe['tax'] = tax\n    return dataframe\n\nrate = 0.25\ndf = compute_tax(df)",
        options: [
          "dataframe is not a valid parameter name",
          "The function references 'rate' which is defined after the function — but this works because rate exists when the function is called",
          "You cannot add a column inside a function",
          "This actually works correctly — rate is accessible as a global variable when the function is called"
        ],
        correct: 3,
        explanation: "This is a scope trick question. Python looks up variable names at call time, not at definition time. Since rate = 0.25 is defined before compute_tax(df) is called, Python finds it in the global scope. The code works, but relying on global variables inside functions is fragile — better to pass rate as a parameter."
      },
      {
        type: "read",
        title: "Same Code, Different Behavior: Indexing",
        prompt: "Both lines use [1] to index. What does each return?",
        hint: "Python starts counting from 0 (0-based indexing), while R starts from 1 (1-based indexing).",
        lang: "python",
        code: "# Python\ngdp = [100, 200, 300]\nprint(gdp[1])  # ???\n\n# R equivalent\n# gdp <- c(100, 200, 300)\n# print(gdp[1])  # ???",
        options: [
          "Both print 200 — indexing is the same in Python and R",
          "Python prints 200 (0-based), R would print 100 (1-based)",
          "Python prints 100 (1-based), R would print 200 (0-based)",
          "Both print 100 — both languages use 1-based indexing"
        ],
        correct: 1,
        explanation: "Python uses 0-based indexing: element [0]=100, [1]=200, [2]=300. R uses 1-based indexing: element [1]=100, [2]=200, [3]=300. This is a critical difference when translating code between languages and a frequent source of off-by-one bugs."
      },
      {
        type: "bug",
        title: "Stata Collapse Syntax Error",
        prompt: "This code should compute the mean income by year, but produces an error. What is the bug?",
        hint: "Look at the position of the statistic name. Stata's <code>collapse</code> uses prefix syntax: the statistic goes in parentheses <b>before</b> the variable, not wrapped around it.",
        lang: "stata",
        code: "collapse mean(income), by(year)\nlist in 1/5",
        options: [
          "collapse does not accept the by() option",
          "The function syntax is wrong — it should be (mean) income, not mean(income)",
          "You cannot list after collapse",
          "collapse only works with numeric variables"
        ],
        correct: 1,
        explanation: "In Stata, collapse uses prefix syntax for statistics: the correct form is collapse (mean) income, by(year). Writing mean(income) is a common mistake — Stata puts the statistic in parentheses before the variable name, not as a function wrapping it."
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
        explanation: "The Stata workflow is: (1) load data with use, (2) clean missing values with drop if missing(), (3) compute summary statistics, (4) tabulate by group, (5) display results. Each step depends on the previous one — you cannot clean data you have not loaded."
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
        explanation: "This R pipe chain demonstrates a complete analysis flow: filter rows by condition, group by a categorical variable, compute a summary statistic (with na.rm = TRUE to handle missing values), and sort results in descending order."
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
        ]
      },
      {
        type: "bug",
        title: "Cross-Language Gotcha: Integer Division in R",
        prompt: "A student translated a Python calculation to R but gets a different answer. Why?",
        hint: "Compare the <code>%%</code> operator in both languages. Does it do the same thing? Look carefully at the actual output.",
        lang: "r",
        code: "# Python:  result = 7 %% 2   --> 1 (remainder)\n# R:\nresult <- 7 %% 2\nprint(result)     # prints 1",
        options: [
          "R cannot perform modulo operations on integers",
          "This actually produces the same result — %% is the modulo (remainder) operator in both R and Python",
          "R's %% does division, not modulo",
          "R requires as.numeric(7) %% as.numeric(2)"
        ],
        correct: 1,
        explanation: "The %% operator is the modulo (remainder) operator in both Python and R: 7 %% 2 = 1 because 7 divided by 2 leaves a remainder of 1. This is a case where syntax is identical across languages. However, R also has %/% for integer division (7 %/% 2 = 3), which differs from Python's // only in edge cases with negative numbers."
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
        title: "Reading a CSV File",
        prompt: "What does this code do?",
        hint: "Look at the three steps: import the library, call <code>read_csv()</code>, then call <code>.head()</code>. What does <code>.head()</code> show by default?",
        lang: "python",
        code: "import pandas as pd\ndf = pd.read_csv('gdp_data.csv')\ndf.head()",
        options: [
          "Creates a new CSV file called gdp_data.csv",
          "Loads the CSV file into a DataFrame and shows the first 5 rows",
          "Loads the CSV file and shows all rows",
          "Reads only the column headers from the file"
        ],
        correct: 1,
        explanation: "pd.read_csv() loads a CSV file into a pandas DataFrame. The .head() method displays the first 5 rows by default, giving you a quick preview of the data without printing the entire dataset."
      },
      {
        type: "read",
        title: "Stata Data Import",
        prompt: "What does this Stata code accomplish?",
        hint: "Focus on two commands: <code>import delimited</code> loads external data, and <code>describe</code> shows variable metadata. The <code>clear</code> option removes existing data from memory.",
        lang: "stata",
        code: "import delimited \"trade_data.csv\", clear\ndescribe",
        options: [
          "It exports the current data to a CSV file",
          "It loads a CSV file into memory, replacing any existing data, then shows variable names and types",
          "It merges trade_data.csv with the current dataset",
          "It only reads the first row of the CSV file"
        ],
        correct: 1,
        explanation: "In Stata, 'import delimited' reads CSV (and other delimited) files. The 'clear' option removes any data already in memory. 'describe' then lists all variables, their types, and labels — essential first step after loading data."
      },
      {
        type: "read",
        title: "R Data Import and Preview",
        prompt: "What information does glimpse() provide?",
        hint: "<code>glimpse()</code> is like a transposed version of <code>head()</code> — it shows each column as a row, with its type and first few values.",
        lang: "r",
        code: "library(readr)\ndf <- read_csv('employment.csv')\nglimpse(df)",
        options: [
          "Only the number of rows in the dataset",
          "A transposed summary showing columns, types, and first few values for each variable",
          "A full statistical summary with mean, median, and standard deviation",
          "Only the column names without any data preview"
        ],
        correct: 1,
        explanation: "glimpse() from the dplyr/tibble package shows each column as a row, displaying the column name, data type (chr, dbl, int, etc.), and the first few values. It is especially useful for wide datasets with many columns."
      },
      {
        type: "bug",
        title: "File Path Error",
        prompt: "A student on Windows gets a FileNotFoundError when running this line. What is wrong?",
        hint: "In Python strings, the backslash <code>\\</code> is an escape character. What does <code>\\n</code> mean inside a string?",
        lang: "python",
        code: "df = pd.read_csv('C:\\Users\\data\\new_file.csv')",
        options: [
          "pd.read_csv() cannot open files from the C:\\ drive",
          "The backslash (\\) is Python's escape character, so \\n is read as a newline instead of the folder name",
          "The file extension must be uppercase .CSV",
          "You need to import the os library before reading files"
        ],
        correct: 1,
        explanation: "In Python, the backslash (\\) inside a string is not just a slash — it is the 'escape character' that gives special meaning to the next letter. For example, \\n means 'newline' and \\t means 'tab'. In the path 'C:\\Users\\data\\new_file.csv', Python reads the \\n in '\\new_file' as a newline character, so the actual path becomes broken. Three common fixes: (1) use a raw string: r'C:\\Users\\data\\new_file.csv', (2) use forward slashes: 'C:/Users/data/new_file.csv', or (3) use os.path.join('C:', 'Users', 'data', 'new_file.csv')."
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
        explanation: "pd.read_excel() reads Excel files. The sheet_name parameter accepts either a 0-based integer index (1 for the second sheet) or the sheet name as a string ('Sheet2'). Remember: Python uses 0-based indexing, so the first sheet is 0, the second is 1."
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
        explanation: "The workflow is: (1) import the raw data, (2) describe variables to check types and labels, (3) browse a few observations visually, (4) save the cleaned file. You must load data before you can inspect or save it."
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
        ]
      },
      {
        type: "bug",
        title: "Encoding Error on European Data in R",
        prompt: "A student gets garbled characters (like Ã©) when loading a French dataset in R. What should they fix?",
        hint: "Garbled accented characters (e.g. <code>Ã©</code> instead of <code>é</code>) typically indicate an encoding mismatch. European files often use Latin-1 encoding.",
        lang: "r",
        code: "df <- read.csv('french_census.csv')",
        options: [
          "The file is too large for R to read",
          "The file likely uses Latin-1 encoding — add fileEncoding = 'latin1' or use read.csv(..., encoding = 'latin-1')",
          "French data cannot be read with read.csv()",
          "The file needs to be converted to .rds format first"
        ],
        correct: 1,
        explanation: "European datasets often use Latin-1 (ISO-8859-1) encoding for accented characters (e, a, u). If R assumes the wrong encoding, accented characters appear garbled. Adding fileEncoding = 'latin1' to read.csv() tells R how to decode the bytes correctly. In readr, use read_csv(..., locale = locale(encoding = 'latin1'))."
      }
    ],

    // ----------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // ----------------------------------------------------------
    intermediate: [
      {
        type: "read",
        title: "Left Join in Python",
        prompt: "What does this merge produce if some countries in gdp_df have no match in pop_df?",
        hint: "A <code>left</code> join keeps all rows from the left (first) DataFrame. Think about what happens to columns from the right DataFrame when there is no match.",
        lang: "python",
        code: "result = pd.merge(gdp_df, pop_df, on='country', how='left')",
        options: [
          "Only countries found in both DataFrames are kept",
          "All countries from gdp_df are kept; unmatched rows get NaN for population columns",
          "All countries from pop_df are kept; unmatched rows get NaN for GDP columns",
          "Error — you cannot merge on a string column"
        ],
        correct: 1,
        explanation: "A left join (how='left') keeps every row from the left DataFrame (gdp_df). If a country has no match in pop_df, the population columns are filled with NaN. This preserves your complete GDP dataset while adding population data where available."
      },
      {
        type: "read",
        title: "Stata Merge Syntax",
        prompt: "What does the 1:m specification mean in this merge?",
        hint: "<code>1:m</code> stands for one-to-many. Think about which dataset has unique keys and which has repeated keys.",
        lang: "stata",
        code: "use \"countries.dta\", clear\nmerge 1:m country_id using \"trade_flows.dta\"",
        options: [
          "Each country_id appears once in both datasets",
          "Each country_id appears once in the master (countries) but can appear many times in the using (trade_flows)",
          "Each country_id appears many times in both datasets",
          "It merges only the first observation per country_id"
        ],
        correct: 1,
        explanation: "1:m (one-to-many) means each key appears at most once in the master dataset but can repeat in the using dataset. For example, one country row matches many trade flow records. Stata checks this and throws an error if the assumption is violated."
      },
      {
        type: "bug",
        title: "Merge Key Mismatch",
        prompt: "This merge returns far fewer rows than expected. What is the likely problem?",
        hint: "Look at the actual values in the key columns: <code>'France'</code> vs <code>'france'</code>. String matching in merges is case-sensitive.",
        lang: "python",
        code: "# gdp_df has column: 'Country' with values like 'France'\n# codes_df has column: 'country' with values like 'france'\nresult = pd.merge(gdp_df, codes_df, left_on='Country', right_on='country')",
        options: [
          "left_on and right_on cannot be used together",
          "The key values differ in capitalization — 'France' != 'france' — so most rows fail to match",
          "You need how='outer' for any merge to work",
          "Merging on string columns is not supported in pandas"
        ],
        correct: 1,
        explanation: "String matching in merges is case-sensitive: 'France' and 'france' are different values. The fix is to normalize case before merging: gdp_df['Country'].str.lower() or codes_df['country'].str.title(). Always inspect your key columns before merging."
      },
      {
        type: "read",
        title: "Stata Import from URL",
        prompt: "What does this Stata code do?",
        hint: "Notice that the path is a URL, not a local file. Stata's <code>import delimited</code> can read directly from web addresses.",
        lang: "stata",
        code: "import delimited \"https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv\", clear\ndescribe\nlist in 1/5",
        options: [
          "It opens a web browser to download the file manually",
          "It directly imports a CSV file from a URL into Stata memory, then shows variable info and the first 5 rows",
          "It saves the URL as a string variable in Stata",
          "Error — Stata cannot read files from URLs"
        ],
        correct: 1,
        explanation: "Stata's import delimited can read directly from URLs, not just local file paths. This is very convenient for loading publicly hosted datasets. After importing, describe shows the variable structure and list in 1/5 displays the first 5 observations."
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
        explanation: "The pipeline is: (1) import libraries, (2) make the API request, (3) parse JSON response, (4) extract the records you need from the nested JSON structure, (5) convert to a DataFrame. Each step depends on the previous one's output."
      },
      {
        type: "fill",
        title: "R Left Join",
        prompt: "Fill in the blanks to perform a left join in R using dplyr. GAP1 is the join function name (e.g. <code>left_join</code>), and GAP2 is the key column name in quotes (e.g. <code>'country'</code>).",
        hint: "The dplyr function for a left join is <code>left_join</code>. The <code>by</code> argument takes the key column name as a quoted string.",
        lang: "r",
        codeTemplate: "result <- ___GAP1___(gdp_df, pop_df, by = ___GAP2___)",
        gaps: {
          "GAP1": { answer: "left_join", accept: ["left_join"] },
          "GAP2": { answer: "'country'", accept: ["'country'", "\"country\"", "c('country')", "c(\"country\")"] }
        },
        explanation: "In dplyr, left_join() keeps all rows from the first (left) table and adds matching columns from the second. The 'by' argument specifies the key column(s). This is equivalent to pd.merge(..., how='left') in Python."
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
        ]
      },
      {
        type: "bug",
        title: "R JSON Navigation Error",
        prompt: "A student fetched World Bank API data in R but gets an error accessing the results. What is wrong?",
        hint: "The World Bank API returns a JSON array with two elements: metadata and records. Try accessing <code>data[[2]]</code> instead of <code>data$indicator</code>.",
        lang: "r",
        code: "library(jsonlite)\ndata <- fromJSON('https://api.worldbank.org/v2/country/FRA/indicator/NY.GDP.PCAP.CD?format=json&date=2010:2020')\ngdp_value <- data$indicator$value",
        options: [
          "fromJSON() returns a character string, not a list",
          "The World Bank API returns a list — data[[2]] contains the actual records, not data$indicator",
          "fromJSON() requires a local file, not a URL",
          "You need to call names(data) before accessing any elements"
        ],
        correct: 1,
        explanation: "The World Bank API returns a JSON array at the top level: [metadata, records]. In R, fromJSON() parses this as a list of two elements. The records are in data[[2]], not data$indicator. Always inspect the structure with str(data) or names(data) first to understand the nesting."
      }
    ],

    // ----------------------------------------------------------
    // ADVANCED (8 exercises)
    // ----------------------------------------------------------
    advanced: [
      {
        type: "read",
        title: "Reshape from Wide to Long",
        prompt: "What does this reshape operation produce?",
        hint: "<code>melt()</code> converts columns into rows. Each column in <code>value_vars</code> becomes a row, with the column name stored in <code>var_name</code> and the value in <code>value_name</code>.",
        lang: "python",
        code: "# df has columns: country, gdp_2018, gdp_2019, gdp_2020\ndf_long = df.melt(\n    id_vars='country',\n    value_vars=['gdp_2018','gdp_2019','gdp_2020'],\n    var_name='year',\n    value_name='gdp'\n)",
        options: [
          "A wider DataFrame with more columns for each year",
          "A long DataFrame with columns: country, year, gdp — one row per country-year",
          "A summary table with mean GDP per country",
          "Error — melt() does not accept multiple value_vars"
        ],
        correct: 1,
        explanation: "melt() reshapes from wide to long format: columns become rows. Each country-year combination becomes its own row, with 'year' holding the former column name (gdp_2018, etc.) and 'gdp' holding the value. This is essential for panel data analysis."
      },
      {
        type: "read",
        title: "Stata Reshape Long",
        prompt: "What does this Stata reshape do to a dataset with variables income2018, income2019, income2020?",
        hint: "Stata's <code>reshape long</code> converts wide stub-variables (like <code>income2018</code>) into rows. The <code>i()</code> option is the panel ID, and <code>j()</code> captures the suffix (year).",
        lang: "stata",
        code: "reshape long income, i(country_id) j(year)",
        options: [
          "It creates new columns income2018, income2019, income2020 from a long dataset",
          "It converts the stub variables income2018-income2020 into rows with a new 'year' variable containing 2018, 2019, 2020",
          "It deletes columns and only keeps income for the latest year",
          "It merges income data from another file"
        ],
        correct: 1,
        explanation: "Stata's 'reshape long' converts wide variables that share a stub (income) followed by a suffix (2018, 2019, 2020) into a long format. The i() option identifies the panel unit, and j() names the new variable that will hold the suffix values."
      },
      {
        type: "bug",
        title: "Stata Merge Missing Key Variable",
        prompt: "A researcher merges country-level controls with panel data in Stata but gets unexpected duplicates. What is wrong?",
        hint: "Look at the key variables listed after <code>merge</code>. Both datasets have a <code>year</code> variable — is it included in the merge keys?",
        lang: "stata",
        code: "* master: panel data with country, year, gdp\n* using: controls with country, year, population, area\nmerge m:1 country using \"controls.dta\"",
        options: [
          "m:1 should be 1:1 for panel data",
          "The merge is only on 'country' — it should be merge m:1 country year using to match the panel structure",
          "Stata merge cannot handle panel data",
          "The using dataset should be the master"
        ],
        correct: 1,
        explanation: "When both datasets have a 'year' variable, merging only on 'country' matches each master row to any using row with the same country, regardless of year. This creates incorrect matches. The fix is to include all key variables: merge m:1 country year using \"controls.dta\"."
      },
      {
        type: "bug",
        title: "Web Scraping: Stale Selector",
        prompt: "This scraper returns an empty list even though the webpage has a visible data table. What is the likely issue?",
        hint: "Think about how the table gets rendered. Does <code>requests.get()</code> execute JavaScript? Many modern pages load content dynamically after the initial HTML.",
        lang: "python",
        code: "from bs4 import BeautifulSoup\nimport requests\nhtml = requests.get('https://example.org/stats').text\nsoup = BeautifulSoup(html, 'html.parser')\nrows = soup.find_all('tr', class_='data-row')",
        options: [
          "BeautifulSoup cannot parse HTML tables",
          "requests.get() does not return HTML content",
          "The table may be loaded by JavaScript after the page loads — requests only gets the initial HTML, not dynamically-rendered content",
          "find_all() requires a CSS selector string, not tag and class arguments"
        ],
        correct: 2,
        explanation: "Many modern websites load data via JavaScript after the initial HTML is served. requests.get() only fetches the raw HTML — it does not execute JavaScript. The table may not exist in that HTML at all. Solutions include using Selenium (which runs a browser) or checking for a hidden API endpoint."
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
        explanation: "Web scraping follows: (1) import libraries, (2) fetch the page, (3) parse the HTML, (4) loop through table rows (skip header with [1:]), (5) extract cells from each row, (6) store extracted text. Each step builds on the previous one's output."
      },
      {
        type: "fill",
        title: "R Pivot Longer",
        prompt: "Fill in the blanks to reshape wide data to long format in R. GAP1 is the tidyr function name (e.g. <code>pivot_longer</code>), GAP2 is the name for the new column holding former column names (e.g. <code>'year'</code>), and GAP3 is the name for the values column (e.g. <code>'gdp'</code>).",
        hint: "The function is <code>pivot_longer</code>. The <code>names_to</code> and <code>values_to</code> arguments take quoted strings for the new column names.",
        lang: "r",
        codeTemplate: "df_long <- df %>%\n  ___GAP1___(cols = starts_with('gdp_'),\n             names_to = ___GAP2___,\n             values_to = ___GAP3___)",
        gaps: {
          "GAP1": { answer: "pivot_longer", accept: ["pivot_longer"] },
          "GAP2": { answer: "'year'", accept: ["'year'", "\"year\""] },
          "GAP3": { answer: "'gdp'", accept: ["'gdp'", "\"gdp\""] }
        },
        explanation: "tidyr's pivot_longer() is R's equivalent of pandas melt(). The cols argument selects which columns to reshape, names_to specifies what to call the new column holding former column names, and values_to names the column for the values."
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
        ]
      },
      {
        type: "read",
        title: "R file.path() for Portable Paths",
        prompt: "Why use file.path() instead of paste() for constructing file paths in R?",
        hint: "Think about what happens when your code runs on a different operating system. Windows uses <code>\\</code> as a path separator, while Mac/Linux uses <code>/</code>.",
        lang: "r",
        code: "data_dir <- 'data'\nfilename <- 'gdp_panel.csv'\n\n# Approach A:\npath_a <- paste(data_dir, filename, sep = '/')\n\n# Approach B:\npath_b <- file.path(data_dir, filename)",
        options: [
          "Approach A is faster and preferred",
          "Approach B automatically uses the correct separator (\\ on Windows, / on Mac/Linux), making code portable across operating systems",
          "Both are identical in all cases — file.path is just syntactic sugar",
          "Approach B also verifies that the file exists"
        ],
        correct: 1,
        explanation: "file.path() inserts the correct path separator for the current operating system. On Windows it uses backslashes, on Mac/Linux it uses forward slashes. Hardcoding '/' in paste() works on Mac/Linux but can cause issues on Windows. This is R's equivalent of Python's os.path.join()."
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
        title: "Understanding .describe()",
        prompt: "What information does this code produce?",
        hint: "<code>.describe()</code> computes summary statistics for numeric columns. Think about what statistics are most useful for understanding a distribution.",
        lang: "python",
        code: "import pandas as pd\ndf = pd.read_csv('household_survey.csv')\ndf.describe()",
        options: [
          "Only the column names and data types",
          "Count, mean, std, min, 25%, 50%, 75%, max for each numeric column",
          "A full printout of every row in the dataset",
          "Only the mean of each column"
        ],
        correct: 1,
        explanation: "df.describe() computes summary statistics for all numeric columns: count (non-null entries), mean, standard deviation, minimum, 25th/50th/75th percentiles, and maximum. String and categorical columns are excluded by default."
      },
      {
        type: "read",
        title: "Stata Summary Statistics",
        prompt: "What does the 'detail' option add to this command?",
        hint: "Without <code>detail</code>, <code>summarize</code> shows basic stats (mean, std, min, max). The <code>detail</code> option adds a much richer set of distributional information.",
        lang: "stata",
        code: "summarize income, detail",
        options: [
          "Nothing extra — it is the same as summarize income",
          "It adds percentiles (1st, 5th, 10th, 25th, 50th, 75th, 90th, 95th, 99th), skewness, and kurtosis",
          "It shows income for each observation individually",
          "It creates a histogram of income"
        ],
        correct: 1,
        explanation: "Stata's 'summarize, detail' goes beyond the basic output (mean, std, min, max) to include a full percentile distribution, skewness, kurtosis, and the four smallest and largest values. This is essential for detecting outliers and understanding distributional shape."
      },
      {
        type: "read",
        title: "Checking for Missing Values",
        prompt: "What does this expression return?",
        hint: "<code>.isnull()</code> creates True/False for each cell, and <code>.sum()</code> counts the Trues per column. The result tells you how many values are missing in each column.",
        lang: "python",
        code: "df[['income', 'education', 'age']].isnull().sum()",
        options: [
          "The total number of rows in the DataFrame",
          "The count of missing (NaN) values in each of the three columns",
          "True or False for whether any column has missing values",
          "The sum of all values in income, education, and age"
        ],
        correct: 1,
        explanation: ".isnull() creates a Boolean DataFrame (True where values are NaN, False otherwise). .sum() then counts the True values in each column. This gives you a quick overview of data completeness — crucial before any analysis."
      },
      {
        type: "bug",
        title: "R Summary with Missing Values",
        prompt: "The mean returns NA instead of a number. What needs to change?",
        hint: "R's <code>mean()</code> returns <code>NA</code> if any value in the input is missing. There is a parameter to tell R to remove NAs before computing.",
        lang: "r",
        code: "mean(df$income)",
        options: [
          "df$income is not a valid way to access columns in R",
          "mean() returns NA if any value is missing — add na.rm = TRUE to ignore NAs",
          "You must use summarise() from dplyr instead",
          "The column name needs quotes: df$'income'"
        ],
        correct: 1,
        explanation: "In R, most statistical functions return NA if the input contains any missing values. This is a safety feature — R wants you to explicitly acknowledge that you are ignoring missing data by setting na.rm = TRUE. Always check for NAs and handle them intentionally."
      },
      {
        type: "fill",
        title: "Frequency Table in R",
        prompt: "Fill in the blanks to create a frequency table of education levels using dplyr. GAP1 is the dplyr function that counts occurrences (e.g. <code>count</code>), and GAP2 is the variable name to count by (e.g. <code>education</code>).",
        hint: "The dplyr function is <code>count</code>, and the variable to tabulate is <code>education</code>.",
        lang: "r",
        codeTemplate: "df %>%\n  ___GAP1___(___GAP2___)",
        gaps: {
          "GAP1": { answer: "count", accept: ["count"] },
          "GAP2": { answer: "education", accept: ["education"] }
        },
        explanation: "In dplyr, count() tallies the number of observations for each unique value of a variable. It is equivalent to df %>% group_by(education) %>% summarise(n = n()). For a quick base R alternative, use table(df$education)."
      },
      {
        type: "reorder",
        title: "Basic Exploration Workflow",
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
        explanation: "After loading data, check dimensions first (shape tells you rows and columns), then look for missing values (isnull().sum()), then compute summary statistics (describe()). This progression goes from structure to quality to content."
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
        ]
      },
      {
        type: "read",
        title: "Stata Bysort Pattern",
        prompt: "What does this Stata code compute?",
        hint: "The <code>bysort</code> prefix sorts the data by the specified variable and then runs the command <b>separately for each group</b>.",
        lang: "stata",
        code: "bysort region: summarize income",
        options: [
          "The overall summary of income, ignoring region",
          "Summary statistics of income computed separately for each value of region",
          "A new variable equal to the mean income per region",
          "It sorts the data by region but does not summarize anything"
        ],
        correct: 1,
        explanation: "The 'bysort' prefix sorts the data by the specified variable and then runs the command separately for each group. So this produces one summary table per region — showing you mean, std, min, and max income within each region."
      }
    ],

    // ----------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // ----------------------------------------------------------
    intermediate: [
      {
        type: "read",
        title: "Groupby Aggregation",
        prompt: "What does this code produce?",
        hint: "<code>.agg()</code> can accept a list of function names to compute multiple statistics at once. The result has one row per group and one column per statistic.",
        lang: "python",
        code: "result = df.groupby('region')['income'].agg(['mean', 'std', 'count'])",
        options: [
          "A single row with mean, std, and count of income across all regions",
          "A DataFrame with one row per region showing the mean, std, and count of income",
          "Three separate DataFrames: one for mean, one for std, one for count",
          "Error — agg() cannot accept a list of functions"
        ],
        correct: 1,
        explanation: "groupby('region') splits the data by region, ['income'] selects the column, and .agg(['mean', 'std', 'count']) applies three functions at once. The result is a DataFrame indexed by region with three columns — an efficient way to get multiple statistics in one operation."
      },
      {
        type: "read",
        title: "Boolean Filtering Mechanics",
        prompt: "What does the inner expression df['age'] > 30 actually create?",
        hint: "The comparison <code>df['age'] > 30</code> is applied element-wise. It produces a True/False value for <b>each row</b>, which then acts as a filter mask.",
        lang: "python",
        code: "young_workers = df[df['age'] > 30]",
        options: [
          "A list of row indices where age is above 30",
          "A Boolean Series (True/False for each row) that acts as a mask to select matching rows",
          "An integer count of workers over 30",
          "A copy of the age column with values above 30"
        ],
        correct: 1,
        explanation: "df['age'] > 30 creates a Boolean Series the same length as the DataFrame: True where age exceeds 30, False elsewhere. When you put this inside df[...], pandas uses it as a mask — keeping only rows where the value is True. This is called Boolean indexing."
      },
      {
        type: "bug",
        title: "Aggregating the Wrong Column Type",
        prompt: "This code runs but the output is unexpectedly empty. Why?",
        hint: "Check the data type of the <code>income</code> column. If numeric values were read as strings (e.g. <code>'45000'</code>), <code>.mean()</code> cannot compute an average.",
        lang: "python",
        code: "# The 'income' column was read as strings: '45000', '52000', etc.\navg_by_region = df.groupby('region')['income'].mean()",
        options: [
          "groupby does not work with string region names",
          "mean() silently skips string columns — income was read as text, not numbers, so there is nothing to average",
          "You need .agg('mean') instead of .mean()",
          "The result is not empty — it contains correct means"
        ],
        correct: 1,
        explanation: "If a numeric column is accidentally read as strings (e.g., due to commas in '45,000' or stray text), .mean() cannot compute an average and returns NaN or an empty result. Always check dtypes with df.dtypes first and convert with pd.to_numeric() if needed."
      },
      {
        type: "bug",
        title: "R Filter Logic Error",
        prompt: "A student wants to keep rows where region is either North or South. What is wrong?",
        hint: "Look at the right side of the <code>|</code> operator. The expression <code>'South'</code> alone is not a comparison — you need <code>region == 'South'</code>. Or use <code>%in%</code>.",
        lang: "r",
        code: "subset <- df %>%\n  filter(region == 'North' | 'South')",
        options: [
          "The pipe operator %>% is incompatible with filter()",
          "The | operator needs a full comparison on each side: region == 'North' | region == 'South'",
          "filter() does not accept the | (OR) operator",
          "String values cannot be compared with == in R"
        ],
        correct: 1,
        explanation: "In R (and Python), the OR operator | does not distribute: region == 'North' | 'South' evaluates 'South' as a standalone logical value (always TRUE), making the entire condition always TRUE. You must write region == 'North' | region == 'South' — or use region %in% c('North', 'South')."
      },
      {
        type: "reorder",
        title: "Filter-Group-Summarize Pipeline",
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
        explanation: "A dplyr pipeline reads top to bottom: (1) start with the data, (2) filter rows, (3) group by a variable, (4) compute summary statistics, (5) arrange results. Filtering before grouping is more efficient and ensures you only analyze relevant data."
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
        explanation: "Stata's 'tabulate' with two variables creates a cross-tabulation (contingency table) showing the frequency of each combination. This is essential for checking balance between treatment and control groups across categories."
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
          "A 3x3 matrix of pairwise Pearson correlation coefficients between the three variables",
          "A simple table showing mean and standard deviation of each variable",
          "Error — correlate requires at least 4 variables"
        ],
        correct: 1,
        explanation: "Stata's correlate command computes pairwise Pearson correlation coefficients. The result is a symmetric 3x3 matrix: diagonal values are 1.0 (each variable perfectly correlates with itself), and off-diagonal values range from -1 to +1. To get the covariance matrix instead, add the covariance option."
      },
      {
        type: "match",
        title: "Summary Statistics Across Languages",
        prompt: "Match equivalent grouped summary operations.",
        hint: "Match by what each pair does: grouped means, grouped means with a plot, and frequency counts of a categorical variable.",
        pairs: [
          { left: "df.groupby('yr')['gdp'].mean()", leftLang: "Python", right: "bysort yr: summarize gdp", rightLang: "Stata" },
          { left: "df.groupby('yr')['gdp'].mean().plot()", leftLang: "Python", right: "df %>% group_by(yr) %>%\n  summarise(m = mean(gdp)) %>%\n  ggplot(aes(yr, m)) + geom_line()", rightLang: "R" },
          { left: "df['sector'].value_counts()", leftLang: "Python", right: "df %>% count(sector)", rightLang: "R" }
        ]
      }
    ],

    // ----------------------------------------------------------
    // ADVANCED (8 exercises)
    // ----------------------------------------------------------
    advanced: [
      {
        type: "read",
        title: "Chained Exploration Pipeline",
        prompt: "What does this pipeline produce?",
        hint: "Read the chain step by step: <code>query()</code> filters, <code>groupby()</code> groups by two columns, <code>agg()</code> computes multiple stats, and <code>reset_index()</code> flattens the result.",
        lang: "python",
        code: "result = (df\n    .query('year >= 2010 & income > 0')\n    .groupby(['region', 'year'])['income']\n    .agg(['mean', 'median', 'count'])\n    .reset_index()\n)",
        options: [
          "A single summary row for all data since 2010",
          "A long DataFrame with region-year rows and columns for mean, median, and count of income — excluding zero/negative income and pre-2010 data",
          "The original DataFrame filtered and sorted",
          "Error — query() cannot combine conditions with &"
        ],
        correct: 1,
        explanation: "This pipeline chains four operations: query() filters rows (keeping post-2010 with positive income), groupby() creates region-year groups, agg() computes three statistics per group, and reset_index() converts the multi-index back to regular columns. The result is a clean summary table ready for analysis."
      },
      {
        type: "read",
        title: "Multi-Index GroupBy Result",
        prompt: "What is the structure of this result?",
        hint: "Grouping by two columns creates a multi-level index. Using <code>.loc['France']</code> selects the outer level, returning a Series indexed by the inner level (sector).",
        lang: "python",
        code: "result = df.groupby(['country', 'sector'])['employment'].sum()\nresult.loc['France']",
        options: [
          "A single number: total French employment",
          "A Series indexed by sector, showing total employment per sector in France",
          "The full multi-index Series, unfiltered",
          "Error — .loc cannot be used on a grouped Series"
        ],
        correct: 1,
        explanation: "Grouping by two columns creates a multi-index Series: the first level is country, the second is sector. Using .loc['France'] selects the outer level, returning a Series of sectors with their employment sums. Understanding multi-level indexing is key to working with hierarchical grouped results."
      },
      {
        type: "bug",
        title: "Stata Multiple Conditions in if",
        prompt: "A student wants to keep rows where region is 1 AND income is above 50000 in Stata. What is wrong?",
        hint: "Stata does not recognize the word <code>and</code> as a logical operator. Look for the correct symbol for AND in Stata.",
        lang: "stata",
        code: "keep if region == 1 and income > 50000",
        options: [
          "== cannot compare numeric values in Stata",
          "Stata uses & for AND conditions, not the word 'and' — should be keep if region == 1 & income > 50000",
          "You cannot filter on two conditions at once in Stata",
          "The condition should use | instead of &"
        ],
        correct: 1,
        explanation: "In Stata, logical AND is written as & and logical OR as |. The word 'and' is not a valid logical operator. The correct syntax is: keep if region == 1 & income > 50000. Unlike Python, Stata does not require parentheses around individual conditions, though they can improve readability."
      },
      {
        type: "bug",
        title: "R summary() Shows Character Instead of Numbers",
        prompt: "A student runs summary(df) but income shows character counts instead of mean/median. What happened?",
        hint: "If a column contains non-numeric characters (like commas in <code>'45,000'</code>), R reads it as character type. <code>summary()</code> behaves differently for character vs numeric columns.",
        lang: "r",
        code: "# income column was read with values like '45,000' and '52,000'\ndf <- read.csv('survey.csv')\nsummary(df$income)",
        options: [
          "summary() randomly treats some columns differently",
          "The comma in '45,000' caused R to read income as character — summary() shows length/class/mode for characters instead of numeric statistics",
          "summary() only works on data frames, not individual columns",
          "You need to specify summary(df$income, type = 'numeric')"
        ],
        correct: 1,
        explanation: "When CSV values contain commas (45,000) or other non-numeric characters, R reads them as character strings. summary() on a character vector shows counts instead of mean/median/quartiles. The fix: clean the data with gsub() to remove commas and convert with as.numeric(): df$income <- as.numeric(gsub(',', '', df$income))."
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
        explanation: "A thorough Stata exploration follows: (1) load data with use, (2) check quality (misstable for missing values, describe for types), (3) clean issues (destring to convert, drop missing), (4) compute group statistics with bysort, (5) visualize with graph bar. Cleaning before analysis prevents silent errors."
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
        explanation: "In dplyr, summarise() creates new columns from aggregate functions. Every R statistical function requires na.rm = TRUE to handle missing values — forgetting this is the #1 cause of unexpected NA results. sd() computes the standard deviation."
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
        ]
      },
      {
        type: "read",
        title: "Organizing a Cohesive Exploration",
        prompt: "Which observation about this script is correct?",
        hint: "Look at the overall structure: does the script follow a logical progression from data loading to quality checks to analysis? Consider what each numbered section accomplishes.",
        lang: "python",
        code: "# 1. Load\ndf = pd.read_csv('labor_survey.csv')\n\n# 2. Quality check\nassert df.shape[0] > 0, 'Empty dataset!'\nprint(f'Missing: {df.isnull().sum().sum()} / {df.size} values')\n\n# 3. Distribution check\nfor col in ['wage', 'hours', 'experience']:\n    q99 = df[col].quantile(0.99)\n    outliers = (df[col] > q99).sum()\n    print(f'{col}: {outliers} values above 99th percentile')\n\n# 4. Group comparison\npd.set_option('display.float_format', '{:.2f}'.format)\nprint(df.groupby('gender')[['wage','hours']].describe())",
        options: [
          "The assert statement will crash the program even if data loads correctly",
          "The loop in step 3 is unnecessary — describe() already shows outlier information",
          "The script follows a principled workflow: verify data, check distributions and outliers, then compare groups — with formatting for readability",
          "set_option only affects how numbers are stored, not how they are displayed"
        ],
        correct: 2,
        explanation: "This script demonstrates best practices: (1) load and immediately verify data is not empty, (2) quantify missingness, (3) systematically check each variable for outliers using the 99th percentile, (4) compare distributions across groups with formatted output. This methodical approach catches data issues before they corrupt your analysis."
      }
    ]
  };

})();
