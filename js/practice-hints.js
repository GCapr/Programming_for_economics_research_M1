// Practice Lab — Hint overlay
// Patches a 'hint' property onto every exercise after the data files load.
(function () {
  'use strict';
  var E = window.PRACTICE_EXERCISES;
  if (!E) return;

  /* helper: set hint on exercise [topic][level][index] */
  function h(topic, level, idx, hint) {
    if (E[topic] && E[topic][level] && E[topic][level][idx]) {
      E[topic][level][idx].hint = hint;
    }
  }

  // ================================================================
  //  SYNTAX — BEGINNER
  // ================================================================
  h('syntax','beginner',0, '<b>import ... as</b> creates a short alias for a library. Think about what <code>pd</code> lets you do afterward.');
  h('syntax','beginner',1, 'One of these operators stores a value, the other tests equality. Think about what <code>&lt;-</code> does differently from <code>==</code>.');
  h('syntax','beginner',2, 'The <code>&lt;-</code> operator assigns the value on the right to the name on the left. Trace the arithmetic step by step.');
  h('syntax','beginner',3, 'In Stata, string values must be enclosed in double quotes <code>" "</code>. Check what happens when quotes are missing.');
  h('syntax','beginner',4, 'Follow what Stata does in two steps: first it stores a value, then it expands the macro reference. What number replaces <code>`threshold\'</code> before <code>display</code> runs?');
  h('syntax','beginner',5, 'Look at the operator used for assignment and how functions are called: Python uses dot notation on objects (<code>df.head()</code>) while R passes the object as an argument (<code>head(df)</code>).');
  h('syntax','beginner',6, 'Think about which pandas function loads delimited text files. The encoding and separator are passed as quoted strings — what format does European CSV data typically use?');
  h('syntax','beginner',7, 'Each step depends on the previous one. A function must be loaded before you call it, and data must exist in memory before you can preview it.');

  // ================================================================
  //  SYNTAX — INTERMEDIATE
  // ================================================================
  h('syntax','intermediate',0, 'Method chaining applies operations left to right. Each <code>.method()</code> transforms the result of the previous one.');
  h('syntax','intermediate',1, 'Think about what <code>round(mean_wage, 2)</code> produces first, then how <code>paste()</code> joins its arguments together. By default, <code>paste()</code> separates items with spaces.');
  h('syntax','intermediate',2, 'In pandas filters, use <code>==</code> for comparison, not <code>=</code>. The expression inside <code>df[...]</code> must be a boolean Series.');
  h('syntax','intermediate',3, 'Stata local macros are referenced with backtick-apostrophe: <code>`varname\'</code>. Check whether the macro is dereferenced correctly.');
  h('syntax','intermediate',4, 'The R pipe <code>%&gt;%</code> or <code>|&gt;</code> passes the left-hand result as the first argument to the right-hand function.');
  h('syntax','intermediate',5, 'You need data in memory before you can inspect it, and you should understand variable structure before examining distributions. Start with loading, then metadata, then content.');
  h('syntax','intermediate',6, 'Stata has a package archive where community-written commands are hosted. After installing a package, you can use commands like <code>regress</code> directly. Think about the archive name and the regression command.');
  h('syntax','intermediate',7, 'Look for equivalent operations: Python\'s <code>df.describe()</code> vs Stata\'s <code>summarize</code>; Python\'s <code>.merge()</code> vs Stata\'s <code>merge</code>.');

  // ================================================================
  //  SYNTAX — ADVANCED
  // ================================================================
  h('syntax','advanced',0, 'Read nested calls from the inside out. The innermost function executes first, and its return value is passed to the next outer function.');
  h('syntax','advanced',1, 'Python looks up variable names when a function is <b>called</b>, not when it is <b>defined</b>. Check: does <code>rate</code> exist in the global scope by the time <code>compute_tax(df)</code> runs?');
  h('syntax','advanced',2, 'Python uses <b>0-based</b> indexing (first element is [0]). R uses <b>1-based</b> indexing (first element is [1]).');
  h('syntax','advanced',3, 'In Stata, the statistic name goes in parentheses as a <b>prefix</b> before the variable — it is not function-call syntax like in other languages. Look at where <code>mean</code> and <code>income</code> are positioned.');
  h('syntax','advanced',4, 'Each step creates something the next step needs. Loading must come first, cleaning before analysis, and reporting results requires the analysis to have already run.');
  h('syntax','advanced',5, 'GAP1 needs a comparison operator to filter years (like <code>&gt;=</code> or <code>==</code>). GAP2 should be a categorical variable suitable for grouping. GAP3 should match what <code>avg_wage</code> implies — which summary function computes an average?');
  h('syntax','advanced',6, 'Python loops end the header with a colon and use indentation. R wraps the iterator in parentheses and the body in braces. Stata uses <code>foreach</code>/<code>forvalues</code> keywords with braces and macro expansion.');
  h('syntax','advanced',7, 'The <code>%%</code> operator computes the remainder (modulo) in both Python and R. Try calculating <code>7 %% 2</code> by hand: what is the remainder when 7 is divided by 2?');

  // ================================================================
  //  DATA IMPORT — BEGINNER
  // ================================================================
  h('data_import','beginner',0, '<code>pd.read_csv("file.csv")</code> reads a CSV file into a DataFrame. The variable on the left stores the result.');
  h('data_import','beginner',1, 'Stata\'s <code>import delimited</code> reads CSV files. <code>use</code> reads <code>.dta</code> files. Think about which command matches.');
  h('data_import','beginner',2, 'Think about what you would see if <code>head()</code> were flipped on its side — with columns listed vertically instead of horizontally. What information would each row show?');
  h('data_import','beginner',3, 'On Windows, backslashes <code>\\</code> in file paths are interpreted as escape characters. Use <code>/</code>, <code>\\\\</code>, or raw strings <code>r"..."</code>.');
  h('data_import','beginner',4, 'The pandas function for Excel files follows the same naming pattern as <code>read_csv</code>. Remember that Python counts from 0, so the second item has index 1.');
  h('data_import','beginner',5, 'You must load data before you can inspect it, and you should verify the import before saving. Think about which commands depend on data already being in memory.');
  h('data_import','beginner',6, 'Python: <code>pd.read_csv()</code>. R: <code>read.csv()</code> or <code>read_csv()</code>. Stata: <code>import delimited</code>.');
  h('data_import','beginner',7, 'Garbled accented characters (like <code>Ã©</code> instead of <code>é</code>) mean the file was saved in one encoding but read with another. European files are often encoded in Latin-1, not UTF-8.');

  // ================================================================
  //  DATA IMPORT — INTERMEDIATE
  // ================================================================
  h('data_import','intermediate',0, 'A <b>left join</b> keeps all rows from the left table. Unmatched rows get <code>NaN</code> for the right table\'s columns.');
  h('data_import','intermediate',1, '<code>1:m</code> means one observation in the master matches many in the using dataset. Think about which dataset has unique keys.');
  h('data_import','intermediate',2, 'Merge keys must match exactly — check for spaces, capitalization, and data types (string vs numeric).');
  h('data_import','intermediate',3, 'Stata can import data directly from URLs with <code>import delimited</code> or <code>use</code> followed by a URL.');
  h('data_import','intermediate',4, 'Each step produces the input for the next: you need a response before you can parse JSON, parsed JSON before you can extract records, and records before you can build a DataFrame. What must come before everything else?');
  h('data_import','intermediate',5, 'dplyr names its join functions descriptively — the type of join is part of the function name. The <code>by</code> argument requires a quoted column name that exists in both data frames.');
  h('data_import','intermediate',6, 'Python uses <code>.merge(how="left")</code>, Stata uses <code>merge 1:1</code> or <code>merge m:1</code>, R uses <code>left_join()</code>.');
  h('data_import','intermediate',7, 'The World Bank API returns a JSON array with two elements: metadata at position 1 and the actual data records at position 2. Think about which element contains the GDP values you want.');

  // ================================================================
  //  DATA IMPORT — ADVANCED
  // ================================================================
  h('data_import','advanced',0, '<code>pd.melt()</code> converts wide data to long. <code>id_vars</code> stay fixed; <code>value_vars</code> become rows.');
  h('data_import','advanced',1, '<code>reshape long</code> in Stata converts stub variables (e.g. income2018, income2019) into rows with a new <code>j</code> variable for the year.');
  h('data_import','advanced',2, 'Look at what variables are listed after <code>merge</code>. If both datasets contain a <code>year</code> variable but you only merge on <code>country</code>, what happens to the year dimension?');
  h('data_import','advanced',3, 'Think about how the table gets rendered. <code>requests.get()</code> only fetches the initial HTML the server sends — it does not run JavaScript. If the table is loaded dynamically by a script, it won\'t be in the HTML.');
  h('data_import','advanced',4, 'Imports must come first. Then think about the dependency chain: you need a response before you can parse HTML, parsed HTML before you can find elements, and extracted data before you can build a DataFrame.');
  h('data_import','advanced',5, 'The tidyr function for wide-to-long reshaping has a descriptive name (the opposite of <code>pivot_wider</code>). The <code>names_to</code> and <code>values_to</code> arguments need quoted strings describing what the new columns represent.');
  h('data_import','advanced',6, 'Python: <code>pd.melt()</code>. R: <code>pivot_longer()</code>. Stata: <code>reshape long</code>. Look for the function and its arguments.');
  h('data_import','advanced',7, '<code>file.path()</code> joins path components with the correct OS separator. <code>paste()</code> would use a fixed separator that may not work on all systems.');

  // ================================================================
  //  DATA EXPLORATION — BEGINNER
  // ================================================================
  h('data_exploration','beginner',0, 'Think about what statistics help you understand a distribution at a glance. <code>.describe()</code> focuses on numeric columns and provides a standard set of distributional summaries.');
  h('data_exploration','beginner',1, 'Without <code>detail</code>, <code>summarize</code> shows only basic statistics (count, mean, std, min, max). The <code>detail</code> option adds a much richer view of the distribution. Think about what additional information helps you understand shape and tails.');
  h('data_exploration','beginner',2, 'Break the chain into two steps: what does <code>.isnull()</code> produce for each cell? Then what does <code>.sum()</code> do when applied to True/False values?');
  h('data_exploration','beginner',3, 'In R, <code>mean()</code> returns <code>NA</code> if any values are missing. Add <code>na.rm = TRUE</code> to ignore NAs.');
  h('data_exploration','beginner',4, 'dplyr has a shortcut function for tallying how many times each unique value appears. The variable you pass should be the categorical column you want to tabulate.');
  h('data_exploration','beginner',5, 'Think about dependencies: you need data loaded before checking anything, and you should understand the data\'s size and quality before computing statistics that might be affected by missing values.');
  h('data_exploration','beginner',6, 'Python: <code>df.describe()</code>. R: <code>summary(df)</code>. Stata: <code>summarize</code>. Match the function to the language.');
  h('data_exploration','beginner',7, '<code>bysort group: command</code> runs a Stata command separately for each group. Similar to <code>groupby</code> in Python.');

  // ================================================================
  //  DATA EXPLORATION — INTERMEDIATE
  // ================================================================
  h('data_exploration','intermediate',0, '<code>.groupby("col").agg()</code> groups rows and computes statistics. The result has one row per group.');
  h('data_exploration','intermediate',1, 'Think about what happens when you apply a comparison operator to an entire column. Does it produce one value, or one value <b>per row</b>? How does <code>df[...]</code> use that result?');
  h('data_exploration','intermediate',2, 'Numeric aggregations like <code>.mean()</code> skip non-numeric columns silently. If your target column is stored as strings, convert it first.');
  h('data_exploration','intermediate',3, 'Look at the right side of the <code>|</code> operator. Is <code>\'South\'</code> by itself a valid comparison? Each side of a logical operator needs a complete expression like <code>column == value</code>.');
  h('data_exploration','intermediate',4, 'Start with the data source. Then think about efficiency: should you reduce rows before or after grouping? Aggregation must follow grouping, and sorting only makes sense on the final result.');
  h('data_exploration','intermediate',5, 'Stata\'s <code>tabulate var1 var2</code> creates a cross-tabulation (two-way frequency table).');
  h('data_exploration','intermediate',6, 'Stata\'s <code>correlate</code> or <code>pwcorr</code> computes correlation matrices. <code>pwcorr</code> allows pairwise deletion and significance tests.');
  h('data_exploration','intermediate',7, 'Python: <code>groupby().mean()</code>. R: <code>group_by() %>% summarise()</code>. Stata: <code>collapse (mean)</code>. Match the syntax.');

  // ================================================================
  //  DATA EXPLORATION — ADVANCED
  // ================================================================
  h('data_exploration','advanced',0, 'Read the chain step by step: how many rows survive after <code>query()</code>? How does grouping by two columns affect the output structure? Does <code>.agg()</code> produce one row total or one row per group?');
  h('data_exploration','advanced',1, 'When you <code>groupby</code> two columns, the result has a <b>MultiIndex</b>. Use <code>.reset_index()</code> to flatten it back.');
  h('data_exploration','advanced',2, 'In Stata, compound conditions use <code>&</code> for AND and <code>|</code> for OR. Check the operators and parentheses.');
  h('data_exploration','advanced',3, 'If a numeric column was read as character/string, <code>summary()</code> shows length/class instead of mean/median. Convert with <code>as.numeric()</code>.');
  h('data_exploration','advanced',4, 'Each step reveals or fixes something that the next step needs. You must identify problems (missing values, wrong types) before cleaning, and clean before analyzing. Visualization comes after analysis.');
  h('data_exploration','advanced',5, 'The dplyr verb for collapsing groups into summary rows is similar to <code>summary</code> but with an \'ise\' ending. R statistical functions need a parameter to handle missing values, and the standard deviation function in R is a two-letter abbreviation.');
  h('data_exploration','advanced',6, 'Advanced operations: Python <code>.pivot_table()</code> vs R <code>spread()</code>/<code>pivot_wider()</code> vs Stata <code>reshape wide</code>.');
  h('data_exploration','advanced',7, 'Look at what each numbered section does and whether they build on each other logically. Does the script verify data quality before computing statistics? Does it check for outliers before comparing groups?');

  // ================================================================
  //  DATA CLEANING — BEGINNER
  // ================================================================
  h('data_cleaning','beginner',0, '<code>dropna(subset=["col"])</code> drops rows missing in that specific column only, not all columns. Count how many rows survive.');
  h('data_cleaning','beginner',1, '<code>destring</code> converts a string variable to numeric. The <code>replace</code> option modifies in place; <code>force</code> converts non-numeric to missing.');
  h('data_cleaning','beginner',2, 'In R, many tidyverse functions return a <b>new</b> data frame — they don\'t modify in place. You must reassign: <code>df &lt;- df %>% drop_na()</code>.');
  h('data_cleaning','beginner',3, 'Check what data type <code>data.frame()</code> assigns to the <code>zipcode</code> column. What does <code>str_pad</code> do when it receives a non-character input?');
  h('data_cleaning','beginner',4, 'Clean in order: load → drop missing → convert types → save. Converting types before dropping may cause errors if missing values can\'t convert.');
  h('data_cleaning','beginner',5, 'You must load the data before operating on it. Also, <code>destring</code> converts strings to numeric — think about whether you need to destring before or after using numeric operations like <code>missing()</code>.');
  h('data_cleaning','beginner',6, 'You need to compute the average of the existing (non-missing) values in the <code>income</code> column. Which pandas method returns the arithmetic mean of a Series?');
  h('data_cleaning','beginner',7, 'Python: <code>dropna()</code>, <code>fillna()</code>. R: <code>drop_na()</code>, <code>replace_na()</code>. Stata: <code>drop if missing()</code>.');

  // ================================================================
  //  DATA CLEANING — INTERMEDIATE
  // ================================================================
  h('data_cleaning','intermediate',0, 'Pandas string methods chain: <code>.str.lower()</code> → <code>.str.strip()</code> → <code>.str.replace()</code>. Each returns a new Series.');
  h('data_cleaning','intermediate',1, '<code>case_when()</code> tests conditions in order and assigns the first matching value. Like a series of if/else if statements.');
  h('data_cleaning','intermediate',2, 'Since pandas 1.2, the default behavior of <code>str.replace()</code> changed. Think about whether the first argument is being treated as a regular expression or a literal string.');
  h('data_cleaning','intermediate',3, 'Stata\'s <code>drop if</code> removes rows matching the condition. If the condition is too broad (e.g. <code>missing()</code> without specifying a variable), it drops too many.');
  h('data_cleaning','intermediate',4, 'Create the missing indicator <b>before</b> imputing — otherwise you lose track of which values were originally missing.');
  h('data_cleaning','intermediate',5, 'Duplicate firms appearing many times would distort percentile calculations. Think about which step must come first to ensure accurate quantile boundaries.');
  h('data_cleaning','intermediate',6, 'In Stata, the dot (<code>.</code>) represents a missing value. The <code>replace ... if</code> pattern lets you conditionally modify a variable. Think about what condition identifies the invalid observations.');
  h('data_cleaning','intermediate',7, 'Python <code>str.replace()</code> = R <code>str_replace()</code>. Python <code>dropna()</code> = R <code>drop_na()</code>. Match the equivalents.');

  // ================================================================
  //  DATA CLEANING — ADVANCED
  // ================================================================
  h('data_cleaning','advanced',0, '<code>np.where(condition, value_if_true, value_if_false)</code> works like an if/else applied to every row.');
  h('data_cleaning','advanced',1, 'After <code>merge</code>, Stata creates <code>_merge</code> with values 1 (master only), 2 (using only), 3 (matched). Tabulate to check merge quality.');
  h('data_cleaning','advanced',2, 'Mean imputation reduces variance and biases standard errors downward. Consider adding a missing indicator or using multiple imputation instead.');
  h('data_cleaning','advanced',3, 'If a column is numeric but you try to use string functions, R may silently coerce or fail. Check the column type with <code>class()</code> first.');
  h('data_cleaning','advanced',4, 'Think about dependencies: deduplication affects statistics, so do it early. You must record which values are missing <b>before</b> imputing. And quantile bounds must be computed before you can clip.');
  h('data_cleaning','advanced',5, 'You must inspect the <code>_merge</code> variable before deciding which observations to keep. And you cannot drop <code>_merge</code> if later steps still reference it.');
  h('data_cleaning','advanced',6, 'To clip values to a range, you need two operations: one to enforce a minimum (floor) and one to enforce a maximum (ceiling). Which R functions operate element-wise rather than returning a single value?');
  h('data_cleaning','advanced',7, 'Python: <code>df.duplicated()</code>. R: <code>duplicated()</code>. Stata: <code>duplicates report</code>. Match each check to its language.');

  // ================================================================
  //  DATA ANALYSIS — BEGINNER
  // ================================================================
  h('data_analysis','beginner',0, 'In statsmodels, <code>cov_type="HC1"</code> requests heteroskedasticity-robust (White) standard errors.');
  h('data_analysis','beginner',1, 'Stata\'s <code>regress y x1 x2</code> runs OLS. The output table shows coefficients, standard errors, t-stats, and p-values.');
  h('data_analysis','beginner',2, 'Default OLS standard errors assume homoskedasticity. If residual variance varies, use <code>robust</code> or <code>HC1</code> standard errors.');
  h('data_analysis','beginner',3, 'In R formulas, <code>y ~ x1 * x2</code> includes both main effects AND the interaction. <code>y ~ x1 : x2</code> includes ONLY the interaction.');
  h('data_analysis','beginner',4, 'In statsmodels, defining a model (<code>.ols()</code>) and estimating it (<code>.fit()</code>) are separate steps. Think about which objects must exist before each function can be called.');
  h('data_analysis','beginner',5, 'You need the <code>modelsummary</code> package loaded before calling <code>msummary()</code>. And the model objects must be fitted before they can be passed to the export function.');
  h('data_analysis','beginner',6, 'Stata\'s clustering option goes after the comma in a regression command. Think about which variable identifies the groups whose errors may be correlated.');
  h('data_analysis','beginner',7, 'Python: <code>smf.ols().fit()</code>. R: <code>lm()</code>. Stata: <code>regress</code>. Match the estimation command to its language.');

  // ================================================================
  //  DATA ANALYSIS — INTERMEDIATE
  // ================================================================
  h('data_analysis','intermediate',0, '<code>cov_kwds</code> passes options to the covariance estimator, like specifying the cluster variable with <code>groups</code>.');
  h('data_analysis','intermediate',1, 'In R\'s <code>feols()</code>, the part after <code>|</code> specifies fixed effects: <code>y ~ x | entity + time</code> absorbs entity and time FE.');
  h('data_analysis','intermediate',2, 'Logit coefficients are in <b>log-odds</b>, not probabilities. To get probability changes, compute <b>marginal effects</b>.');
  h('data_analysis','intermediate',3, 'A <b>post-treatment variable</b> is affected by the treatment. Controlling for it can absorb or distort the treatment effect (bad controls).');
  h('data_analysis','intermediate',4, 'You must estimate the model before computing marginal effects, because <code>margins()</code> takes a fitted model object as its input. And the <code>margins</code> package must be loaded before calling its functions.');
  h('data_analysis','intermediate',5, 'Stata requires you to declare the panel structure before using panel estimators. Think about which command tells Stata which variable identifies entities and which identifies time.');
  h('data_analysis','intermediate',6, 'R formula shorthand: <code>education * female</code> expands to <code>education + female + education:female</code>.');
  h('data_analysis','intermediate',7, 'R² measures fit, F-stat tests joint significance, t-stats test individual coefficients. Match each to its interpretation.');

  // ================================================================
  //  DATA ANALYSIS — ADVANCED
  // ================================================================
  h('data_analysis','advanced',0, 'In formulas, <code>*</code> = main effects + interaction. <code>:</code> = interaction only. Count: intercept + each main effect + each interaction.');
  h('data_analysis','advanced',1, 'Focus on the <code>keep()</code> option — it controls which coefficients appear in the output table. Variables not listed in <code>keep()</code> are estimated but hidden from the display.');
  h('data_analysis','advanced',2, 'With panel data, observations within firms are correlated. Standard OLS SEs ignore this, making p-values artificially small. Use <code>cluster(firm_id)</code>.');
  h('data_analysis','advanced',3, 'Bootstrap resamples data and re-estimates. Each iteration must produce the same number of coefficients. Check for collinearity or dropped variables.');
  h('data_analysis','advanced',4, 'The bootstrap standard error is simply the standard deviation of the coefficients across all resampled iterations. Think about what must be set up before the loop, what happens inside each iteration, and what summary comes after.');
  h('data_analysis','advanced',5, 'Clear any previously stored estimates first to avoid contamination. Then build models from simplest to most complex. The comparison table can only be produced after all models have been stored.');
  h('data_analysis','advanced',6, 'Stargazer expects its models wrapped in a Python collection type. Think about the standard Python syntax for grouping multiple items into an ordered sequence.');
  h('data_analysis','advanced',7, 'Diagnostics: Python <code>het_breuschpagan()</code>, Stata <code>estat hettest</code>, R <code>bptest()</code>. Match to language.');

  // ================================================================
  //  CAUSAL INFERENCE — BEGINNER
  // ================================================================
  h('causal_inference','beginner',0, 'In DiD, the treatment effect is the coefficient on the <b>interaction</b> of the treatment group dummy and the post-period dummy.');
  h('causal_inference','beginner',1, '<code>matchit()</code> matches treated units to control units based on covariates to make groups comparable. It uses propensity scores by default.');
  h('causal_inference','beginner',2, 'DiD with panel data needs <b>clustered</b> standard errors (at the state/group level) to account for serial correlation within units.');
  h('causal_inference','beginner',3, 'A <b>weak instrument</b> has a low first-stage F-statistic (rule of thumb: F &lt; 10). This leads to biased and imprecise IV estimates.');
  h('causal_inference','beginner',4, 'The post indicator depends on the year variable, so it must be created after loading the data. The interaction term requires both the treatment and post columns to already exist.');
  h('causal_inference','beginner',5, 'The <code>rdrobust</code> package must be loaded before its functions can be called. Bandwidth selection is an informational step that helps you understand what the estimation will use.');
  h('causal_inference','beginner',6, 'Stata IV syntax: <code>ivregress 2sls y controls (endogenous = instrument)</code>. The instrumented variable goes in parentheses.');
  h('causal_inference','beginner',7, 'DiD assumes parallel trends. IV assumes exclusion restriction. RDD assumes continuity at the cutoff. Matching assumes selection on observables.');

  // ================================================================
  //  CAUSAL INFERENCE — INTERMEDIATE
  // ================================================================
  h('causal_inference','intermediate',0, 'In TWFE, the treatment coefficient captures the average effect across all treated units and time periods, assuming no heterogeneous effects.');
  h('causal_inference','intermediate',1, 'The reference period (usually <code>t = -1</code>) is omitted so all other period coefficients are relative to it. This normalizes the pre-trend.');
  h('causal_inference','intermediate',2, 'Matching on <b>post-treatment</b> variables (outcomes that occur after treatment) introduces bias. Only match on <b>pre-treatment</b> covariates.');
  h('causal_inference','intermediate',3, 'RDD should use <b>local</b> estimation near the cutoff, not a global polynomial. High-degree polynomials overfit and give misleading results.');
  h('causal_inference','intermediate',4, 'The relative time variable must be computed from the data before it can appear in the formula. The <code>iplot()</code> function reads the fitted model object, so estimation must come first.');
  h('causal_inference','intermediate',5, 'Post-estimation commands like <code>estat</code> can only run after an estimation command. The first-stage F-test checks instrument relevance, while the endogeneity test checks whether IV is even necessary compared to OLS.');
  h('causal_inference','intermediate',6, 'The parameter that sets the threshold value in <code>rdrobust()</code> is a single letter. The cutoff value should match the institutional rule described in the exercise.');
  h('causal_inference','intermediate',7, 'All three languages express DiD with an interaction between treatment and post indicators, but each uses different syntax for interactions and fixed effects. Stata uses <code>##</code>, R uses <code>*</code>, and Python\'s formula syntax also uses <code>*</code>.');

  // ================================================================
  //  CAUSAL INFERENCE — ADVANCED
  // ================================================================
  h('causal_inference','advanced',0, 'Synthetic control creates a weighted combination of untreated units that best matches the treated unit\'s pre-treatment outcomes.');
  h('causal_inference','advanced',1, 'The <b>Sargan-Hansen test</b> checks if instruments are valid (exogenous). A rejection means at least one instrument is invalid.');
  h('causal_inference','advanced',2, 'In an event study, period <code>t = -1</code> should be the reference (coefficient normalized to 0). Pre-treatment coefficients should be near zero.');
  h('causal_inference','advanced',3, 'RDD robustness: try different bandwidths, polynomial orders, and kernel functions. If the result changes dramatically, it\'s not robust.');
  h('causal_inference','advanced',4, 'Data must be loaded and indexed before the synthetic control can identify units and time periods. The placebo test is a robustness check that should come after the main analysis is complete.');
  h('causal_inference','advanced',5, 'Propensity scores must be estimated before matching can use them. The balance check verifies that the matched sample has similar covariate distributions — it can only be computed after the matched sample exists.');
  h('causal_inference','advanced',6, 'In fixest, <code>i(time_var, ref = -1)</code> creates time dummies with period -1 as reference. Include inside the formula.');
  h('causal_inference','advanced',7, 'DiD: placebo pre-trends test. IV: overidentification test. RDD: bandwidth sensitivity. Matching: balance test. Match method to test.');

  // ================================================================
  //  ESTIMATION — BEGINNER
  // ================================================================
  h('estimation','beginner',0, 'In statsmodels, <code>.fit(cov_type="HC1")</code> computes robust standard errors. HC1 applies a small-sample degrees-of-freedom correction.');
  h('estimation','beginner',1, 'Adding <code>, robust</code> to a Stata regression command uses Huber-White standard errors that are valid under heteroskedasticity.');
  h('estimation','beginner',2, 'If residuals show a fan shape (variance increases with fitted values), standard errors are biased. Use <code>vcovHC()</code> for robust SEs in R.');
  h('estimation','beginner',3, 'Logit coefficients are <b>log-odds ratios</b>. To interpret as odds ratios, exponentiate: <code>exp(coef)</code>. They are NOT probability changes.');
  h('estimation','beginner',4, 'You need two specialized packages: one provides the robust variance estimator, the other provides the function to display results with a custom variance matrix. Both must be loaded before they can be used.');
  h('estimation','beginner',5, 'Each regression must be stored immediately after it runs, because <code>estimates store</code> captures whichever model was estimated most recently. The comparison table can only be produced once both stored estimates exist.');
  h('estimation','beginner',6, 'GAP1: The statsmodels class for ordinary least squares is named with uppercase letters.<br>GAP2: Among the HC family (HC0, HC1, HC2, HC3), which variant applies a degrees-of-freedom correction equivalent to Stata\'s <code>, robust</code>?');
  h('estimation','beginner',7, 'Python: <code>cov_type="HC1"</code>. Stata: <code>, robust</code>. R: <code>vcovHC(type="HC1")</code>. Match each syntax to its language.');

  // ================================================================
  //  ESTIMATION — INTERMEDIATE
  // ================================================================
  h('estimation','intermediate',0, 'Clustered SEs account for correlation within groups (e.g., firms, countries). Use when observations within clusters are not independent.');
  h('estimation','intermediate',1, 'Fixed effects absorb all <b>time-invariant</b> variables. If gender doesn\'t change over time, its effect is captured by the individual FE.');
  h('estimation','intermediate',2, 'With fewer than ~30-50 clusters, cluster-robust SEs can be severely biased. Consider wild cluster bootstrap or T(G-1) correction.');
  h('estimation','intermediate',3, 'In R, logit with <code>glm(family=binomial)</code> gives log-odds coefficients. Use <code>margins()</code> to convert to marginal effects.');
  h('estimation','intermediate',4, 'The random seed must be set before any sampling occurs. You need an empty container before you can fill it with results. The standard deviation can only be computed after all replications are complete.');
  h('estimation','intermediate',5, 'In R, <code>feols(y ~ x | entity + time, cluster = ~entity)</code> combines two-way FE with clustered SEs in one step.');
  h('estimation','intermediate',6, 'GAP1: Which Stata command estimates a binary outcome model that reports coefficients in the log-odds scale?<br>GAP2: After estimation, which Stata post-estimation command converts log-odds coefficients into probability-scale changes?');
  h('estimation','intermediate',7, 'Each command adds entity fixed effects but uses different syntax: one uses a comma option, one uses a boolean argument, and one uses the <code>|</code> operator in the formula. Match by identifying which language each syntax belongs to.');

  // ================================================================
  //  ESTIMATION — ADVANCED
  // ================================================================
  h('estimation','advanced',0, 'Two-way clustering adjusts for correlation along two dimensions (e.g., firm AND year). <code>vcov = ~firm + year</code> in fixest.');
  h('estimation','advanced',1, 'Wild cluster bootstrap is preferred when the number of clusters is small. It simulates the null distribution using Rademacher weights.');
  h('estimation','advanced',2, 'When data is clustered, you must resample <b>entire clusters</b>, not individual observations. Otherwise the bootstrap ignores within-cluster correlation.');
  h('estimation','advanced',3, 'Look carefully at the options after the comma in each <code>regress</code> command. Are both models using the same method to compute standard errors?');
  h('estimation','advanced',4, 'The panel data must be indexed by entity and time before PanelOLS can identify the panel structure. The model must be specified before fitting, and fitting must complete before results can be displayed.');
  h('estimation','advanced',5, 'For reproducibility, the random number generator must be initialized before any resampling. Post-estimation diagnostics can only run after the bootstrap completes all replications.');
  h('estimation','advanced',6, 'GAP1: The fixest package provides an estimation function whose name abbreviates \'fixed-effects OLS.\'<br>GAP2: When units are observed repeatedly over time, cluster the standard errors at the level of the cross-sectional unit to account for serial correlation.');
  h('estimation','advanced',7, 'Robust SEs: heteroskedasticity. Clustered SEs: within-group correlation. Bootstrap: small samples or complex estimators. Match appropriately.');

  // ================================================================
  //  REPLICABILITY — BEGINNER
  // ================================================================
  h('replicability','beginner',0, 'A <code>ROOT</code> variable stores the project\'s base directory. All other paths are built relative to it, making the script portable.');
  h('replicability','beginner',1, '<code>here()</code> automatically finds the project root (where <code>.Rproj</code> lives) so paths work regardless of working directory.');
  h('replicability','beginner',2, 'Hardcoded paths like <code>C:\\Users\\name\\...</code> break on other machines. Use <code>global root</code> or relative paths instead.');
  h('replicability','beginner',3, 'Never overwrite raw data files. Save cleaned data to a separate file/folder (e.g., <code>data/clean/</code>) to preserve the original.');
  h('replicability','beginner',4, 'The <code>here</code> package must be loaded before <code>here()</code> can be called. The directory list must be defined before the loop that creates them. The confirmation message should come after creation.');
  h('replicability','beginner',5, 'Each script produces output that the next script needs as input. Data must be imported before it can be cleaned, cleaned before analyzed, and analyzed before results can be exported.');
  h('replicability','beginner',6, 'GAP1: Sensitive configuration files (API keys, passwords) are conventionally stored in a file whose name starts with a dot, followed by a three-letter abbreviation for \'environment.\'<br>GAP2: Git uses a special dotfile to know which files should never be tracked.');
  h('replicability','beginner',7, 'Repository = project folder tracked by git. Commit = saved snapshot. Branch = parallel version. Remote = server copy (e.g., GitHub).');

  // ================================================================
  //  REPLICABILITY — INTERMEDIATE
  // ================================================================
  h('replicability','intermediate',0, 'Stata\'s <code>log using</code> captures all output (commands + results) to a file, creating a complete record of what ran and what it produced.');
  h('replicability','intermediate',1, '<code>renv</code> records exact package versions in <code>renv.lock</code>. <code>renv::restore()</code> reinstalls those exact versions on another machine.');
  h('replicability','intermediate',2, 'Hardcoded paths fail on other machines. Use <code>os.path.join()</code> or <code>pathlib.Path()</code> with a configurable root directory.');
  h('replicability','intermediate',3, 'Manually copying numbers into reports is error-prone and not reproducible. Automate with <code>esttab</code>, <code>stargazer</code>, or similar.');
  h('replicability','intermediate',4, 'Packages must be loaded before their functions are used. The model must be estimated before its results can be formatted into a table. The confirmation message should come last.');
  h('replicability','intermediate',5, 'Both <code>statsmodels</code> and the <code>Stargazer</code> library must be imported before use. The regression must produce results before the table formatter can process them. Writing to a file is the final step.');
  h('replicability','intermediate',6, 'GAP1: R has a function to fix the random number generator so that functions like <code>sample()</code> produce the same sequence every time. Its name is two words joined by a dot.<br>GAP2: The R function for standard deviation is a common two-letter abbreviation.');
  h('replicability','intermediate',7, 'Hardcoded paths → use relative paths. Manual tables → automate export. No seed → set seed. Match each problem to its solution.');

  // ================================================================
  //  REPLICABILITY — ADVANCED
  // ================================================================
  h('replicability','advanced',0, 'Virtual environments (<code>venv</code>) isolate Python packages per project. <code>requirements.txt</code> lists exact versions for reproducibility.');
  h('replicability','advanced',1, 'Stata <code>global</code> macros for subdirectories let collaborators change only one line (the root path) to run the project on their machine.');
  h('replicability','advanced',2, 'Hardcoded paths in R: replace with <code>here()</code> or <code>file.path()</code> relative to the project root.');
  h('replicability','advanced',3, 'If script 03 depends on output from script 02, and 02 hasn\'t been run (or was modified), 03 will fail or use stale data.');
  h('replicability','advanced',4, 'Imports must come before any function calls. The ROOT path should be defined relative to the script\'s own location for portability. The scripts list must exist before the loop can iterate over it.');
  h('replicability','advanced',5, 'The root path must be defined before any command that uses <code>$root</code>. The log file should open before the do-files run so it captures all their output. The log must close at the very end.');
  h('replicability','advanced',6, 'Both blanks use the same R package/function that builds paths relative to the project root. It rhymes with \'there\' and automatically detects where <code>.Rproj</code> or <code>.here</code> files live.');
  h('replicability','advanced',7, 'Feature branches prevent conflicts. Meaningful commits enable rollback. .gitignore protects sensitive data. Match each practice to its benefit.');

  // ================================================================
  //  MACHINE LEARNING — BEGINNER
  // ================================================================
  h('machine_learning','beginner',0, '<code>train_test_split(X, y, test_size=0.2)</code> holds out 20% for testing. <code>random_state</code> ensures the same split every time.');
  h('machine_learning','beginner',1, 'Setting a seed before random operations (like splitting) ensures reproducibility — same seed = same split every time.');
  h('machine_learning','beginner',2, 'Without <code>set.seed()</code>, each run produces a different random split, leading to different evaluation metrics.');
  h('machine_learning','beginner',3, 'With imbalanced classes (e.g., 95% non-default), a model predicting "no default" always gets 95% accuracy. Use precision, recall, or AUC instead.');
  h('machine_learning','beginner',4, 'The model object must be created before it can be trained. Training must use only the training data, and evaluation must use only the test data. Imports must come before anything else.');
  h('machine_learning','beginner',5, 'The <code>rsample</code> package must be loaded before <code>initial_split()</code> is available. The seed must be set before any random operation. The model can only be trained after the training subset is extracted.');
  h('machine_learning','beginner',6, '<code>Lasso(alpha=0.1)</code>: Lasso is the class name, <code>alpha</code> controls regularization strength. Higher alpha = more coefficients pushed to zero.');
  h('machine_learning','beginner',7, 'MSE: average squared error. RMSE: root of MSE (same units as y). R²: proportion of variance explained. AUC: classification discrimination.');

  // ================================================================
  //  MACHINE LEARNING — INTERMEDIATE
  // ================================================================
  h('machine_learning','intermediate',0, 'Regularization penalizes large coefficients. If features are on different scales, the penalty unfairly shrinks those with large units. <b>Standardize first</b>.');
  h('machine_learning','intermediate',1, '<code>num.trees</code>: number of trees in the forest (more = more stable). <code>mtry</code>: variables considered at each split (controls randomness).');
  h('machine_learning','intermediate',2, 'Data leakage: if you scale (fit scaler) on ALL data before splitting, the test set information leaks into training. Fit scaler on train only.');
  h('machine_learning','intermediate',3, 'Tuning hyperparameters on the test set makes test performance optimistic. Use a separate <b>validation set</b> or <b>cross-validation</b> for tuning.');
  h('machine_learning','intermediate',4, 'Data must be loaded and the seed set before any analysis involving randomness (CV uses random fold assignment). The Lasso model must be fitted before its coefficients or predictions can be inspected.');
  h('machine_learning','intermediate',5, 'The critical rule is: the scaler must learn its statistics (mean, standard deviation) from the training data only. Use <code>fit_transform</code> on training data but only <code>transform</code> on test data.');
  h('machine_learning','intermediate',6, 'GAP1: The Stata 16+ command for L1-regularized regression shares its name with the statistical method itself.<br>GAP2: Cross-validation divides the training data into equal parts. A common choice is between 3 and 10 parts.');
  h('machine_learning','intermediate',7, 'Lasso (L1): sparse, sets coefficients to zero. Ridge (L2): shrinks all coefficients, never exactly zero. Elastic Net: combines both.');

  // ================================================================
  //  MACHINE LEARNING — ADVANCED
  // ================================================================
  h('machine_learning','advanced',0, 'Double ML uses one ML model (<code>ml_l</code>) for the outcome and another (<code>ml_m</code>) for the treatment, then estimates the causal effect from residuals.');
  h('machine_learning','advanced',1, 'Causal forests estimate <b>heterogeneous treatment effects</b> — how the treatment effect varies across subgroups. Regular random forests only predict outcomes.');
  h('machine_learning','advanced',2, 'If features have different scales and you don\'t standardize, Lasso penalizes high-magnitude features more. The variable with the largest units gets shrunk first.');
  h('machine_learning','advanced',3, 'Prediction models find correlations. Causal inference requires identification strategies (randomization, IV, DiD, etc.). Correlation ≠ causation.');
  h('machine_learning','advanced',4, 'The double-selection approach uses Lasso twice: once for the outcome and once for the treatment. The <code>dsregress</code> command combines both selection results into a single debiased estimate, so both Lasso steps must come before it.');
  h('machine_learning','advanced',5, 'Cross-validation for lambda selection (<code>cv.glmnet</code>) must use only training data — this is how you choose the regularization strength without touching the test set. The test set evaluation should happen exactly once, at the very end.');
  h('machine_learning','advanced',6, 'In R, <code>grf</code> is the package for causal forests. <code>causal_forest(X, Y, W)</code> where W is the treatment indicator.');
  h('machine_learning','advanced',7, 'Prediction ML: "What will Y be?" Causal ML: "What is the effect of X on Y?" Match each method to the right question type.');

})();
