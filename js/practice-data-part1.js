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
        title: "Assignment vs Comparison",
        prompt: "What does each line do?",
        lang: "python",
        code: "wage = 45000\nwage == 50000",
        options: [
          "Line 1 stores 45000 in wage; Line 2 checks if wage equals 50000 and returns False",
          "Both lines assign values to wage; wage ends up as 50000",
          "Line 1 checks equality; Line 2 assigns 50000 to wage",
          "Line 1 stores 45000; Line 2 reassigns wage to 50000"
        ],
        correct: 0,
        explanation: "A single = is the assignment operator: it stores a value. A double == is the comparison operator: it tests whether two values are equal and returns True or False. Since 45000 != 50000, the second line returns False."
      },
      {
        type: "read",
        title: "R Assignment Operator",
        prompt: "After running this code, what is the value of gdp_growth?",
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
        title: "Strings Need Quotes",
        prompt: "What is wrong with this code?",
        lang: "python",
        code: "country = France\nprint(country)",
        options: [
          "print() cannot display strings in Python",
          "France should be in quotes because it is a string, not a variable name",
          "You need to use print(country,) with a trailing comma",
          "The variable name 'country' is reserved in Python"
        ],
        correct: 1,
        explanation: "Without quotes, Python interprets France as a variable name and throws a NameError because no variable called France has been defined. String values must always be enclosed in quotes: country = 'France' or country = \"France\"."
      },
      {
        type: "read",
        title: "Stata Local Macros",
        prompt: "What does the following Stata code display?",
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
        prompt: "Fill in the blanks to read a CSV file with UTF-8 encoding, using a semicolon as the delimiter.",
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
        title: "Dot Accessor Pattern",
        prompt: "Arrange these lines to: import pandas, load a CSV, and print the first 5 rows.",
        lang: "python",
        lines: [
          "df.head()",
          "import pandas as pd",
          "df = pd.read_csv('wages.csv')"
        ],
        correctOrder: [1, 2, 0],
        explanation: "You must import a library before using it, load data before inspecting it, and call .head() on the DataFrame object using the dot accessor pattern: object.method()."
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
        title: "Reading an f-string",
        prompt: "What does this code print?",
        lang: "python",
        code: "mean_wage = 52347.891\nprint(f'The average wage is {mean_wage:.2f} euros')",
        options: [
          "The average wage is {mean_wage:.2f} euros",
          "The average wage is 52347.891 euros",
          "The average wage is 52347.89 euros",
          "Error — f-strings cannot format floats"
        ],
        correct: 2,
        explanation: "f-strings evaluate expressions inside curly braces. The :.2f format specifier rounds the number to 2 decimal places. So {mean_wage:.2f} becomes 52347.89."
      },
      {
        type: "bug",
        title: "Comparison in a Filter",
        prompt: "A student wants to filter rows where treatment equals 1. What is wrong?",
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
        prompt: "Fill in the blanks to install a user-written Stata package, then use it.",
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
        title: "Method Chaining Trap",
        prompt: "This code should print the mean income by year. What is the bug?",
        lang: "python",
        code: "result = df.groupby('year')['income'].mean\nprint(result)",
        options: [
          "groupby() requires a list, not a string",
          "mean is missing parentheses — .mean refers to the method object, .mean() calls it",
          "You cannot select a column after groupby in pandas",
          "print() cannot display a grouped Series"
        ],
        correct: 1,
        explanation: "Without parentheses, .mean refers to the method itself as an object rather than calling it. This prints something like '<bound method ...>' instead of the actual computed means. You must write .mean() to execute the function. This is a common trap in Python's dot accessor pattern."
      },
      {
        type: "reorder",
        title: "Complex Python Analysis Script",
        prompt: "Arrange these lines into a correct script that loads data, cleans it, analyzes, and reports.",
        lang: "python",
        lines: [
          "df = df.dropna(subset=['income', 'education'])",
          "print(f'Mean income: {mean_inc:.2f}')",
          "import pandas as pd",
          "mean_inc = df.groupby('education')['income'].mean().max()",
          "df = pd.read_csv('survey.csv')"
        ],
        correctOrder: [2, 4, 0, 3, 1],
        explanation: "The workflow is: (1) import libraries, (2) load data, (3) clean missing values, (4) compute statistics, (5) report results. Each step depends on the previous one — you cannot clean data you have not loaded, or analyze data you have not cleaned."
      },
      {
        type: "fill",
        title: "R Pipe Chain with Multiple Steps",
        prompt: "Fill in the blanks to filter, group, summarize, and arrange results in R.",
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
        pairs: [
          { left: "for i in range(10):\n    print(i)", leftLang: "Python", right: "forvalues i = 1/10 {\n    display `i'\n}", rightLang: "Stata" },
          { left: "for country in ['US','UK','FR']:\n    print(country)", leftLang: "Python", right: "foreach c in US UK FR {\n    display \"`c'\"\n}", rightLang: "Stata" },
          { left: "for x in df.columns:\n    print(x)", leftLang: "Python", right: "for (x in names(df)) {\n    print(x)\n}", rightLang: "R" }
        ]
      },
      {
        type: "bug",
        title: "Cross-Language Gotcha: Integer Division",
        prompt: "A student translated this Stata calculation to Python but gets a different answer. Why?",
        lang: "python",
        code: "# Stata:   display 7/2     --> 3.5\n# Python:\nresult = 7 // 2\nprint(result)     # prints 3",
        options: [
          "Python cannot divide integers",
          "The // operator performs floor division (rounds down), not regular division — use / instead",
          "Stata rounds 3.5 up to 4, so the difference is in rounding",
          "Python requires float(7) / float(2) for any division"
        ],
        correct: 1,
        explanation: "In Python, / performs true division (7/2 = 3.5) while // performs floor division (7//2 = 3). Stata's / always does true division. When translating between languages, using // instead of / silently truncates your results — dangerous in economics where fractions matter."
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
        prompt: "A student on Windows gets a FileNotFoundError. What is wrong?",
        lang: "python",
        code: "df = pd.read_csv('C:\\Users\\data\\new_file.csv')",
        options: [
          "pd.read_csv() cannot open files from C:\\ drive",
          "Backslash \\ is an escape character in Python — \\n becomes a newline instead of part of the path",
          "The file extension must be uppercase .CSV",
          "You need to import the os library before reading files"
        ],
        correct: 1,
        explanation: "In Python strings, backslash is an escape character: \\n means newline, \\t means tab. The path 'C:\\Users\\data\\new_file.csv' contains \\n, which Python interprets as a newline. Fix: use raw strings r'C:\\Users\\...', forward slashes 'C:/Users/...', or os.path.join()."
      },
      {
        type: "fill",
        title: "Reading an Excel File",
        prompt: "Fill in the blanks to load the second sheet of an Excel file.",
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
        pairs: [
          { left: "pd.read_csv('data.csv')", leftLang: "Python", right: "read_csv('data.csv')", rightLang: "R" },
          { left: "pd.read_stata('data.dta')", leftLang: "Python", right: "use \"data.dta\", clear", rightLang: "Stata" },
          { left: "pd.read_excel('data.xlsx')", leftLang: "Python", right: "import excel \"data.xlsx\", firstrow clear", rightLang: "Stata" }
        ]
      },
      {
        type: "bug",
        title: "Encoding Error on European Data",
        prompt: "A student gets garbled characters (like Ã©) when loading a French dataset. What should they fix?",
        lang: "python",
        code: "df = pd.read_csv('french_census.csv')",
        options: [
          "The file is too large for pandas to read",
          "The file likely uses Latin-1 or UTF-8 encoding — add encoding='latin-1' or encoding='utf-8'",
          "French data cannot be read with pd.read_csv()",
          "The file needs to be converted to .dta format first"
        ],
        correct: 1,
        explanation: "European datasets often use Latin-1 (ISO-8859-1) encoding for accented characters (e, a, u). If pandas assumes the wrong encoding, accented characters appear garbled. Adding encoding='latin-1' or encoding='utf-8' tells pandas how to decode the bytes correctly."
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
        title: "API Call to JSON",
        prompt: "What does this code sequence do?",
        lang: "python",
        code: "import requests\nresponse = requests.get('https://api.worldbank.org/v2/country/FRA/indicator/NY.GDP.PCAP.CD',\n                        params={'format': 'json', 'date': '2010:2020'})\ndata = response.json()",
        options: [
          "It downloads a CSV file from the World Bank",
          "It sends an HTTP GET request and parses the JSON response into a Python list/dictionary",
          "It uploads French GDP data to the World Bank API",
          "It opens the World Bank website in a browser"
        ],
        correct: 1,
        explanation: "requests.get() sends an HTTP GET request to the URL with query parameters. The API returns data in JSON format, and .json() parses it into Python lists and dictionaries. This is how you programmatically access data from web APIs instead of downloading files manually."
      },
      {
        type: "reorder",
        title: "API Data to DataFrame Pipeline",
        prompt: "Arrange these lines to fetch API data and convert it to a DataFrame.",
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
        prompt: "Fill in the blanks to perform a left join in R using dplyr.",
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
        pairs: [
          { left: "pd.merge(a, b, on='id', how='left')", leftLang: "Python", right: "merge 1:1 id using \"b.dta\"", rightLang: "Stata" },
          { left: "pd.merge(a, b, on='id', how='inner')", leftLang: "Python", right: "merge 1:1 id using \"b.dta\", keep(3)", rightLang: "Stata" },
          { left: "pd.concat([df1, df2])", leftLang: "Python", right: "append using \"df2.dta\"", rightLang: "Stata" }
        ]
      },
      {
        type: "bug",
        title: "JSON Navigation Error",
        prompt: "A student fetched World Bank API data but gets a TypeError. What is wrong?",
        lang: "python",
        code: "data = response.json()\ngdp_value = data['indicator']['value']",
        options: [
          "response.json() returns a string, not a dictionary",
          "The World Bank API returns a list at the top level — data[1] is the actual records, not data['indicator']",
          ".json() requires an encoding argument",
          "You need to call data.keys() before accessing any values"
        ],
        correct: 1,
        explanation: "Many APIs (including the World Bank) return a JSON array, not an object, at the top level. The response is typically [metadata, records], so you access data[1] to get the list of records, then loop through each record to access fields like record['value']. Always inspect the JSON structure with print(data[:2]) first."
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
        title: "Wrong Merge Type for Panel Data",
        prompt: "A researcher merges country-level controls with panel data but loses yearly variation. What is wrong?",
        lang: "python",
        code: "# panel_df: columns = [country, year, gdp] (multiple years per country)\n# controls_df: columns = [country, year, population, area]\nmerged = pd.merge(panel_df, controls_df, on='country', how='left')",
        options: [
          "how='left' should be how='right'",
          "The merge is only on 'country' — it should be on=['country', 'year'] to match the panel structure",
          "pd.merge cannot handle panel data",
          "controls_df should be the left table"
        ],
        correct: 1,
        explanation: "When both datasets have a 'year' column, merging only on 'country' creates all possible country-year combinations (a cross join on years). This duplicates rows incorrectly. The fix is on=['country', 'year'] to match each country in each specific year."
      },
      {
        type: "bug",
        title: "Web Scraping: Stale Selector",
        prompt: "This scraper returns an empty list even though the webpage has a visible data table. What is the likely issue?",
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
        prompt: "Fill in the blanks to reshape wide data to long format in R.",
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
        pairs: [
          { left: "df.melt(id_vars='id', var_name='year')", leftLang: "Python", right: "reshape long val, i(id) j(year)", rightLang: "Stata" },
          { left: "df.pivot_table(index='id', columns='year')", leftLang: "Python", right: "reshape wide val, i(id) j(year)", rightLang: "Stata" },
          { left: "pd.merge(a, b, on='id', how='outer')", leftLang: "Python", right: "full_join(a, b, by = 'id')", rightLang: "R" }
        ]
      },
      {
        type: "read",
        title: "os.path.join for Portable Paths",
        prompt: "Why use os.path.join() instead of string concatenation for file paths?",
        lang: "python",
        code: "import os\ndata_dir = 'data'\nfilename = 'gdp_panel.csv'\n\n# Approach A:\npath_a = data_dir + '/' + filename\n\n# Approach B:\npath_b = os.path.join(data_dir, filename)",
        options: [
          "Approach A is faster and preferred",
          "Approach B automatically uses the correct separator (\\ on Windows, / on Mac/Linux), making code portable",
          "Both are identical in all cases — os.path.join is just syntactic sugar",
          "Approach B also verifies that the file exists"
        ],
        correct: 1,
        explanation: "os.path.join() inserts the correct path separator for the current operating system. On Windows it uses backslashes, on Mac/Linux it uses forward slashes. Hardcoding '/' works on Mac/Linux but breaks on Windows. This is especially important for research code shared across team members on different systems."
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
        title: "Frequency Table in Python",
        prompt: "Fill in the blanks to create a frequency table of education levels.",
        lang: "python",
        codeTemplate: "df[___GAP1___].___GAP2___()",
        gaps: {
          "GAP1": { answer: "'education'", accept: ["'education'", "\"education\""] },
          "GAP2": { answer: "value_counts", accept: ["value_counts"] }
        },
        explanation: "value_counts() counts the frequency of each unique value in a column, sorted from most to least common. It is the pandas equivalent of Stata's 'tabulate' command. This is your go-to method for exploring categorical variables."
      },
      {
        type: "reorder",
        title: "Basic Exploration Workflow",
        prompt: "Arrange these exploration steps in a logical order.",
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
        prompt: "Fill in the blanks to create a two-way frequency table of education by treatment status in Stata.",
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
        title: "Correlation Matrix",
        prompt: "What does this code show?",
        lang: "python",
        code: "df[['income', 'education_years', 'age']].corr()",
        options: [
          "The covariance matrix of the three variables",
          "A 3x3 matrix of pairwise Pearson correlation coefficients between the three variables",
          "A simple table showing mean and standard deviation of each variable",
          "Error — corr() requires at least 4 columns"
        ],
        correct: 1,
        explanation: "The .corr() method computes pairwise Pearson correlation coefficients. The result is a symmetric 3x3 matrix: diagonal values are 1.0 (each variable perfectly correlates with itself), and off-diagonal values range from -1 to +1. This is a quick way to spot relationships."
      },
      {
        type: "match",
        title: "Summary Statistics Across Languages",
        prompt: "Match equivalent grouped summary operations.",
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
        title: "Chained Boolean Filter Error",
        prompt: "A student wants rows where region is 'North' AND income is above 50000. What is wrong?",
        lang: "python",
        code: "result = df[df['region'] == 'North' and df['income'] > 50000]",
        options: [
          "== cannot compare strings in pandas",
          "Python's 'and' keyword does not work with pandas Series — use & with parentheses around each condition",
          "You cannot filter on two conditions at once",
          "The condition should use | instead of 'and'"
        ],
        correct: 1,
        explanation: "Python's 'and' keyword tries to evaluate each Series as a single Boolean (True/False), which is ambiguous for a Series of values. Pandas requires the bitwise & operator, with parentheses: df[(df['region'] == 'North') & (df['income'] > 50000)]. Parentheses are necessary because & has higher precedence than ==."
      },
      {
        type: "bug",
        title: "describe() Excluding Key Variables",
        prompt: "A student runs df.describe() but income and population columns are missing from the output. What happened?",
        lang: "python",
        code: "# income column has values like '45,000' and '52,000'\n# population column has values like '1.2M' and '850K'\ndf.describe()",
        options: [
          "describe() randomly excludes some columns",
          "The columns contain formatting characters (commas, M, K) so pandas stored them as strings — describe() skips non-numeric columns by default",
          "describe() only shows the first 5 columns",
          "You need to pass the column names explicitly to describe()"
        ],
        correct: 1,
        explanation: "When CSV values contain commas (45,000), letters (1.2M), or currency symbols, pandas reads them as strings, not numbers. describe() only summarizes numeric columns by default. The fix: clean the data first — remove commas, convert suffixes, and cast to numeric with pd.to_numeric()."
      },
      {
        type: "reorder",
        title: "Complete Exploration Script",
        prompt: "Arrange these blocks into a proper exploration workflow.",
        lang: "python",
        lines: [
          "# Step: Check data quality\nprint(df.isnull().sum())\nprint(df.dtypes)",
          "# Step: Grouped analysis\nsummary = df.groupby('region')['income'].agg(['mean','median','std'])\nprint(summary)",
          "# Step: Clean before analysis\ndf['income'] = pd.to_numeric(df['income'], errors='coerce')\ndf = df.dropna(subset=['income'])",
          "# Step: Load data\nimport pandas as pd\ndf = pd.read_csv('survey.csv')",
          "# Step: Visualize\nsummary['mean'].plot(kind='bar', title='Mean Income by Region')"
        ],
        correctOrder: [3, 0, 2, 1, 4],
        explanation: "A thorough exploration follows: (1) load data, (2) check quality (missing values, data types), (3) clean issues (convert types, handle NAs), (4) compute group statistics, (5) visualize results. Cleaning before analysis prevents silent errors in your statistics."
      },
      {
        type: "fill",
        title: "R Grouped Summary with Multiple Statistics",
        prompt: "Fill in the blanks to compute mean and standard deviation of wages by sector, excluding missing values.",
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
