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
  h('syntax','beginner',1, 'In R, <code>&lt;-</code> assigns values. <code>c()</code> creates vectors. Logical operators like <code>&gt;</code> return <code>TRUE</code>/<code>FALSE</code> for each element.');
  h('syntax','beginner',2, 'The <code>&lt;-</code> operator assigns the value on the right to the name on the left. Trace the arithmetic step by step.');
  h('syntax','beginner',3, 'In Stata, string values must be enclosed in double quotes <code>" "</code>. Check what happens when quotes are missing.');
  h('syntax','beginner',4, 'Stata local macros are set with <code>local name value</code> and referenced with <code>`name\'</code> (backtick + apostrophe).');
  h('syntax','beginner',5, 'Python uses <code>=</code>, R uses <code>&lt;-</code>, and Stata uses <code>local</code> or <code>gen</code>. Look at the syntax on each side.');
  h('syntax','beginner',6, 'The pandas function to read CSV is <code>read_csv</code>. Keyword arguments use the form <code>name=value</code>, e.g. <code>encoding="utf-8"</code>.');
  h('syntax','beginner',7, 'A typical R workflow: first <code>library()</code>, then <code>read.csv()</code> or <code>read_csv()</code>, then <code>head()</code> to preview.');

  // ================================================================
  //  SYNTAX — INTERMEDIATE
  // ================================================================
  h('syntax','intermediate',0, 'Method chaining applies operations left to right. Each <code>.method()</code> transforms the result of the previous one.');
  h('syntax','intermediate',1, '<code>paste()</code> concatenates strings in R. <code>round(x, digits)</code> rounds to the specified decimal places.');
  h('syntax','intermediate',2, 'In pandas filters, use <code>==</code> for comparison, not <code>=</code>. The expression inside <code>df[...]</code> must be a boolean Series.');
  h('syntax','intermediate',3, 'Stata local macros are referenced with backtick-apostrophe: <code>`varname\'</code>. Check whether the macro is dereferenced correctly.');
  h('syntax','intermediate',4, 'The R pipe <code>%&gt;%</code> or <code>|&gt;</code> passes the left-hand result as the first argument to the right-hand function.');
  h('syntax','intermediate',5, 'A typical Stata workflow: <code>use</code> data, <code>describe</code>, <code>summarize</code>, <code>tabulate</code>, then analysis commands.');
  h('syntax','intermediate',6, 'In Stata, <code>ssc install</code> downloads user-written packages. After installing, use the command directly (e.g. <code>reghdfe</code>).');
  h('syntax','intermediate',7, 'Look for equivalent operations: Python\'s <code>df.describe()</code> vs Stata\'s <code>summarize</code>; Python\'s <code>.merge()</code> vs Stata\'s <code>merge</code>.');

  // ================================================================
  //  SYNTAX — ADVANCED
  // ================================================================
  h('syntax','advanced',0, 'Read nested calls from the inside out. The innermost function executes first, and its return value is passed to the next outer function.');
  h('syntax','advanced',1, 'Python variables defined inside a function are <b>local</b> by default. Modifying a variable inside a function does not change it outside unless returned.');
  h('syntax','advanced',2, 'Python uses <b>0-based</b> indexing (first element is [0]). R uses <b>1-based</b> indexing (first element is [1]).');
  h('syntax','advanced',3, 'Stata\'s <code>collapse</code> syntax is <code>collapse (stat) newvar=oldvar, by(groupvar)</code>. Check that parentheses and variable names are placed correctly.');
  h('syntax','advanced',4, 'A Stata script typically: <code>use</code> data → clean/generate → <code>regress</code> → <code>esttab</code> to export. Think about the logical order.');
  h('syntax','advanced',5, 'In R pipes, use <code>%&gt;%</code> between steps. <code>filter()</code> selects rows, <code>group_by()</code> groups, <code>summarise()</code> aggregates, <code>arrange()</code> sorts.');
  h('syntax','advanced',6, 'Python: <code>for x in list:</code>. R: <code>for (x in vector) {}</code>. Stata: <code>foreach x in list {}</code> or <code>forvalues</code>.');
  h('syntax','advanced',7, 'In Python, <code>//</code> is integer division (rounds down). In R, <code>/</code> always returns a decimal. Check how division behaves differently.');

  // ================================================================
  //  DATA IMPORT — BEGINNER
  // ================================================================
  h('data_import','beginner',0, '<code>pd.read_csv("file.csv")</code> reads a CSV file into a DataFrame. The variable on the left stores the result.');
  h('data_import','beginner',1, 'Stata\'s <code>import delimited</code> reads CSV files. <code>use</code> reads <code>.dta</code> files. Think about which command matches.');
  h('data_import','beginner',2, 'R\'s <code>glimpse()</code> from dplyr shows column names, types, and the first few values — like a transposed <code>head()</code>.');
  h('data_import','beginner',3, 'On Windows, backslashes <code>\\</code> in file paths are interpreted as escape characters. Use <code>/</code>, <code>\\\\</code>, or raw strings <code>r"..."</code>.');
  h('data_import','beginner',4, '<code>pd.read_excel()</code> reads Excel files. The <code>sheet_name</code> parameter selects the sheet (0-indexed or by name).');
  h('data_import','beginner',5, 'Typical Stata pipeline: <code>import delimited</code> → <code>describe</code>/<code>browse</code> → <code>save</code>.');
  h('data_import','beginner',6, 'Python: <code>pd.read_csv()</code>. R: <code>read.csv()</code> or <code>read_csv()</code>. Stata: <code>import delimited</code>.');
  h('data_import','beginner',7, 'When text looks garbled (e.g. Ã©), the file encoding is wrong. Add <code>encoding = "UTF-8"</code> or <code>fileEncoding = "UTF-8"</code>.');

  // ================================================================
  //  DATA IMPORT — INTERMEDIATE
  // ================================================================
  h('data_import','intermediate',0, 'A <b>left join</b> keeps all rows from the left table. Unmatched rows get <code>NaN</code> for the right table\'s columns.');
  h('data_import','intermediate',1, '<code>1:m</code> means one observation in the master matches many in the using dataset. Think about which dataset has unique keys.');
  h('data_import','intermediate',2, 'Merge keys must match exactly — check for spaces, capitalization, and data types (string vs numeric).');
  h('data_import','intermediate',3, 'Stata can import data directly from URLs with <code>import delimited</code> or <code>use</code> followed by a URL.');
  h('data_import','intermediate',4, 'API pipeline: <code>requests.get(url)</code> → <code>.json()</code> → navigate to the data key → <code>pd.DataFrame()</code>.');
  h('data_import','intermediate',5, 'In dplyr, <code>left_join(x, y, by = "key")</code> joins keeping all rows from <code>x</code>. Type the function name and the <code>by</code> argument.');
  h('data_import','intermediate',6, 'Python uses <code>.merge(how="left")</code>, Stata uses <code>merge 1:1</code> or <code>merge m:1</code>, R uses <code>left_join()</code>.');
  h('data_import','intermediate',7, 'API responses in R via <code>jsonlite::fromJSON()</code> return nested lists. Use <code>[[1]]</code> or <code>$name</code> to navigate.');

  // ================================================================
  //  DATA IMPORT — ADVANCED
  // ================================================================
  h('data_import','advanced',0, '<code>pd.melt()</code> converts wide data to long. <code>id_vars</code> stay fixed; <code>value_vars</code> become rows.');
  h('data_import','advanced',1, '<code>reshape long</code> in Stata converts stub variables (e.g. income2018, income2019) into rows with a new <code>j</code> variable for the year.');
  h('data_import','advanced',2, 'In Stata, <code>merge m:1</code> means many in master, one in using. If the using dataset has duplicates, consider <code>merge m:m</code> or fix the data.');
  h('data_import','advanced',3, 'Web scraping selectors must match the current HTML. If the website changed its structure, old CSS selectors or class names may no longer exist.');
  h('data_import','advanced',4, 'Scraping pipeline: <code>requests.get(url)</code> → <code>BeautifulSoup(html)</code> → <code>find/select</code> elements → extract text → build DataFrame.');
  h('data_import','advanced',5, '<code>pivot_longer()</code> reshapes wide to long. Specify <code>cols</code> (which columns to pivot), <code>names_to</code>, and <code>values_to</code>.');
  h('data_import','advanced',6, 'Python: <code>pd.melt()</code>. R: <code>pivot_longer()</code>. Stata: <code>reshape long</code>. Look for the function and its arguments.');
  h('data_import','advanced',7, '<code>file.path()</code> joins path components with the correct OS separator. <code>paste()</code> would use a fixed separator that may not work on all systems.');

  // ================================================================
  //  DATA EXPLORATION — BEGINNER
  // ================================================================
  h('data_exploration','beginner',0, '<code>.describe()</code> returns count, mean, std, min, 25%, 50%, 75%, max for numeric columns by default.');
  h('data_exploration','beginner',1, 'Stata\'s <code>summarize, detail</code> adds percentiles (1, 5, 10, 25, 50, 75, 90, 95, 99), skewness, and kurtosis.');
  h('data_exploration','beginner',2, '<code>.isnull().sum()</code> counts missing values per column. <code>.isnull()</code> returns True/False, <code>.sum()</code> counts the Trues.');
  h('data_exploration','beginner',3, 'In R, <code>mean()</code> returns <code>NA</code> if any values are missing. Add <code>na.rm = TRUE</code> to ignore NAs.');
  h('data_exploration','beginner',4, 'In dplyr, <code>count(column)</code> creates a frequency table. Equivalent to <code>group_by() %>% summarise(n = n())</code>.');
  h('data_exploration','beginner',5, 'Exploration usually starts with shape/dimensions, then summary statistics, then specific columns or distributions.');
  h('data_exploration','beginner',6, 'Python: <code>df.describe()</code>. R: <code>summary(df)</code>. Stata: <code>summarize</code>. Match the function to the language.');
  h('data_exploration','beginner',7, '<code>bysort group: command</code> runs a Stata command separately for each group. Similar to <code>groupby</code> in Python.');

  // ================================================================
  //  DATA EXPLORATION — INTERMEDIATE
  // ================================================================
  h('data_exploration','intermediate',0, '<code>.groupby("col").agg()</code> groups rows and computes statistics. The result has one row per group.');
  h('data_exploration','intermediate',1, '<code>df["col"] > 30</code> produces a boolean Series of True/False. Using it inside <code>df[...]</code> keeps only True rows.');
  h('data_exploration','intermediate',2, 'Numeric aggregations like <code>.mean()</code> skip non-numeric columns silently. If your target column is stored as strings, convert it first.');
  h('data_exploration','intermediate',3, 'In R, use <code>|</code> for OR, not <code>||</code> (which only checks the first element). Inside <code>filter()</code>, use <code>%in%</code> for multiple values.');
  h('data_exploration','intermediate',4, 'A dplyr pipeline: <code>filter()</code> → <code>group_by()</code> → <code>summarise()</code>. Each step connects with <code>%&gt;%</code>.');
  h('data_exploration','intermediate',5, 'Stata\'s <code>tabulate var1 var2</code> creates a cross-tabulation (two-way frequency table).');
  h('data_exploration','intermediate',6, 'Stata\'s <code>correlate</code> or <code>pwcorr</code> computes correlation matrices. <code>pwcorr</code> allows pairwise deletion and significance tests.');
  h('data_exploration','intermediate',7, 'Python: <code>groupby().mean()</code>. R: <code>group_by() %>% summarise()</code>. Stata: <code>collapse (mean)</code>. Match the syntax.');

  // ================================================================
  //  DATA EXPLORATION — ADVANCED
  // ================================================================
  h('data_exploration','advanced',0, 'Chained operations: <code>.query()</code> filters, <code>.groupby()</code> groups, <code>.agg()</code> summarizes, <code>.sort_values()</code> sorts.');
  h('data_exploration','advanced',1, 'When you <code>groupby</code> two columns, the result has a <b>MultiIndex</b>. Use <code>.reset_index()</code> to flatten it back.');
  h('data_exploration','advanced',2, 'In Stata, compound conditions use <code>&</code> for AND and <code>|</code> for OR. Check the operators and parentheses.');
  h('data_exploration','advanced',3, 'If a numeric column was read as character/string, <code>summary()</code> shows length/class instead of mean/median. Convert with <code>as.numeric()</code>.');
  h('data_exploration','advanced',4, 'A Stata exploration script: <code>use</code> → <code>describe</code> → <code>summarize</code> → <code>tabulate</code> → specific analyses.');
  h('data_exploration','advanced',5, 'Use <code>group_by(sector) %>% summarise(mean_wage = mean(wage, na.rm=TRUE), sd_wage = sd(wage, na.rm=TRUE))</code>.');
  h('data_exploration','advanced',6, 'Advanced operations: Python <code>.pivot_table()</code> vs R <code>spread()</code>/<code>pivot_wider()</code> vs Stata <code>reshape wide</code>.');
  h('data_exploration','advanced',7, 'Good exploration follows a narrative: load → inspect shape → check types → summarize → look for patterns → investigate anomalies.');

  // ================================================================
  //  DATA CLEANING — BEGINNER
  // ================================================================
  h('data_cleaning','beginner',0, '<code>dropna(subset=["col"])</code> drops rows missing in that specific column only, not all columns. Count how many rows survive.');
  h('data_cleaning','beginner',1, '<code>destring</code> converts a string variable to numeric. The <code>replace</code> option modifies in place; <code>force</code> converts non-numeric to missing.');
  h('data_cleaning','beginner',2, 'In R, many tidyverse functions return a <b>new</b> data frame — they don\'t modify in place. You must reassign: <code>df &lt;- df %>% drop_na()</code>.');
  h('data_cleaning','beginner',3, 'String methods like <code>str_replace()</code> work on character columns. If the column is numeric, convert with <code>as.character()</code> first.');
  h('data_cleaning','beginner',4, 'Clean in order: load → drop missing → convert types → save. Converting types before dropping may cause errors if missing values can\'t convert.');
  h('data_cleaning','beginner',5, 'Stata cleaning: <code>use</code> → <code>drop if missing()</code> → <code>destring</code> → <code>save</code>.');
  h('data_cleaning','beginner',6, 'Mean imputation: <code>df["income"].fillna(df["income"].mean())</code>. The gap should compute the mean of the <code>income</code> column.');
  h('data_cleaning','beginner',7, 'Python: <code>dropna()</code>, <code>fillna()</code>. R: <code>drop_na()</code>, <code>replace_na()</code>. Stata: <code>drop if missing()</code>.');

  // ================================================================
  //  DATA CLEANING — INTERMEDIATE
  // ================================================================
  h('data_cleaning','intermediate',0, 'Pandas string methods chain: <code>.str.lower()</code> → <code>.str.strip()</code> → <code>.str.replace()</code>. Each returns a new Series.');
  h('data_cleaning','intermediate',1, '<code>case_when()</code> tests conditions in order and assigns the first matching value. Like a series of if/else if statements.');
  h('data_cleaning','intermediate',2, 'In pandas, <code>str.replace()</code> uses regex by default. The pattern <code>\\d+</code> matches digits. But if you pass a literal string, set <code>regex=False</code>.');
  h('data_cleaning','intermediate',3, 'Stata\'s <code>drop if</code> removes rows matching the condition. If the condition is too broad (e.g. <code>missing()</code> without specifying a variable), it drops too many.');
  h('data_cleaning','intermediate',4, 'Create the missing indicator <b>before</b> imputing — otherwise you lose track of which values were originally missing.');
  h('data_cleaning','intermediate',5, 'R workflow: <code>distinct()</code> removes duplicates → <code>quantile()</code> finds bounds → <code>pmin()/pmax()</code> clips values.');
  h('data_cleaning','intermediate',6, 'Stata syntax: <code>replace income = . if income &lt; 0</code>. The dot <code>.</code> represents missing in Stata.');
  h('data_cleaning','intermediate',7, 'Python <code>str.replace()</code> = R <code>str_replace()</code>. Python <code>dropna()</code> = R <code>drop_na()</code>. Match the equivalents.');

  // ================================================================
  //  DATA CLEANING — ADVANCED
  // ================================================================
  h('data_cleaning','advanced',0, '<code>np.where(condition, value_if_true, value_if_false)</code> works like an if/else applied to every row.');
  h('data_cleaning','advanced',1, 'After <code>merge</code>, Stata creates <code>_merge</code> with values 1 (master only), 2 (using only), 3 (matched). Tabulate to check merge quality.');
  h('data_cleaning','advanced',2, 'Mean imputation reduces variance and biases standard errors downward. Consider adding a missing indicator or using multiple imputation instead.');
  h('data_cleaning','advanced',3, 'If a column is numeric but you try to use string functions, R may silently coerce or fail. Check the column type with <code>class()</code> first.');
  h('data_cleaning','advanced',4, 'Pipeline order: load → inspect → handle missing → fix types → remove duplicates → handle outliers → validate → save.');
  h('data_cleaning','advanced',5, 'Stata merge diagnostics: <code>merge</code> → <code>tab _merge</code> → <code>assert _merge == 3</code> or handle unmatched.');
  h('data_cleaning','advanced',6, '<code>pmin(x, upper)</code> caps at the upper bound. <code>pmax(x, lower)</code> sets a floor. Combine both to winsorize.');
  h('data_cleaning','advanced',7, 'Python: <code>df.duplicated()</code>. R: <code>duplicated()</code>. Stata: <code>duplicates report</code>. Match each check to its language.');

  // ================================================================
  //  DATA ANALYSIS — BEGINNER
  // ================================================================
  h('data_analysis','beginner',0, 'In statsmodels, <code>cov_type="HC1"</code> requests heteroskedasticity-robust (White) standard errors.');
  h('data_analysis','beginner',1, 'Stata\'s <code>regress y x1 x2</code> runs OLS. The output table shows coefficients, standard errors, t-stats, and p-values.');
  h('data_analysis','beginner',2, 'Default OLS standard errors assume homoskedasticity. If residual variance varies, use <code>robust</code> or <code>HC1</code> standard errors.');
  h('data_analysis','beginner',3, 'In R formulas, <code>y ~ x1 * x2</code> includes both main effects AND the interaction. <code>y ~ x1 : x2</code> includes ONLY the interaction.');
  h('data_analysis','beginner',4, 'OLS workflow: specify formula → fit model → get robust SEs → display summary. The formula comes before the fit.');
  h('data_analysis','beginner',5, 'R regression workflow: <code>lm()</code> to estimate → <code>stargazer()</code> or <code>modelsummary()</code> to export.');
  h('data_analysis','beginner',6, 'In Stata, cluster SEs: <code>regress y x, vce(cluster firm_id)</code> or <code>regress y x, cluster(firm_id)</code>.');
  h('data_analysis','beginner',7, 'Python: <code>smf.ols().fit()</code>. R: <code>lm()</code>. Stata: <code>regress</code>. Match the estimation command to its language.');

  // ================================================================
  //  DATA ANALYSIS — INTERMEDIATE
  // ================================================================
  h('data_analysis','intermediate',0, '<code>cov_kwds</code> passes options to the covariance estimator, like specifying the cluster variable with <code>groups</code>.');
  h('data_analysis','intermediate',1, 'In R\'s <code>feols()</code>, the part after <code>|</code> specifies fixed effects: <code>y ~ x | entity + time</code> absorbs entity and time FE.');
  h('data_analysis','intermediate',2, 'Logit coefficients are in <b>log-odds</b>, not probabilities. To get probability changes, compute <b>marginal effects</b>.');
  h('data_analysis','intermediate',3, 'A <b>post-treatment variable</b> is affected by the treatment. Controlling for it can absorb or distort the treatment effect (bad controls).');
  h('data_analysis','intermediate',4, 'Logit in R: <code>glm(formula, family=binomial)</code> → <code>margins::margins()</code> for average marginal effects.');
  h('data_analysis','intermediate',5, 'Stata panel: <code>xtset panel_id time_id</code> → <code>xtreg y x, fe</code> for fixed effects regression.');
  h('data_analysis','intermediate',6, 'R formula shorthand: <code>education * female</code> expands to <code>education + female + education:female</code>.');
  h('data_analysis','intermediate',7, 'R² measures fit, F-stat tests joint significance, t-stats test individual coefficients. Match each to its interpretation.');

  // ================================================================
  //  DATA ANALYSIS — ADVANCED
  // ================================================================
  h('data_analysis','advanced',0, 'In formulas, <code>*</code> = main effects + interaction. <code>:</code> = interaction only. Count: intercept + each main effect + each interaction.');
  h('data_analysis','advanced',1, '<code>esttab</code> exports stored estimates to tables. <code>se</code> shows SEs, <code>star()</code> adds significance stars.');
  h('data_analysis','advanced',2, 'With panel data, observations within firms are correlated. Standard OLS SEs ignore this, making p-values artificially small. Use <code>cluster(firm_id)</code>.');
  h('data_analysis','advanced',3, 'Bootstrap resamples data and re-estimates. Each iteration must produce the same number of coefficients. Check for collinearity or dropped variables.');
  h('data_analysis','advanced',4, 'Bootstrap in R: define a function that resamples → replicate it B times → compute <code>sd()</code> of the coefficients.');
  h('data_analysis','advanced',5, 'Stata model building: <code>eststo: reg y x1</code> → <code>eststo: reg y x1 x2</code> → <code>esttab</code> to compare.');
  h('data_analysis','advanced',6, 'In Python\'s Stargazer, pass a <b>list</b> of fitted models: <code>Stargazer([model1, model2])</code>.');
  h('data_analysis','advanced',7, 'Diagnostics: Python <code>het_breuschpagan()</code>, Stata <code>estat hettest</code>, R <code>bptest()</code>. Match to language.');

  // ================================================================
  //  CAUSAL INFERENCE — BEGINNER
  // ================================================================
  h('causal_inference','beginner',0, 'In DiD, the treatment effect is the coefficient on the <b>interaction</b> of the treatment group dummy and the post-period dummy.');
  h('causal_inference','beginner',1, '<code>matchit()</code> matches treated units to control units based on covariates to make groups comparable. It uses propensity scores by default.');
  h('causal_inference','beginner',2, 'DiD with panel data needs <b>clustered</b> standard errors (at the state/group level) to account for serial correlation within units.');
  h('causal_inference','beginner',3, 'A <b>weak instrument</b> has a low first-stage F-statistic (rule of thumb: F &lt; 10). This leads to biased and imprecise IV estimates.');
  h('causal_inference','beginner',4, 'DiD setup: create treatment and post dummies → create interaction → regress <code>y ~ treat + post + treat*post</code>.');
  h('causal_inference','beginner',5, 'RDD in R: load data → define running variable and cutoff → estimate with <code>rdrobust()</code> or local linear regression.');
  h('causal_inference','beginner',6, 'Stata IV syntax: <code>ivregress 2sls y controls (endogenous = instrument)</code>. The instrumented variable goes in parentheses.');
  h('causal_inference','beginner',7, 'DiD assumes parallel trends. IV assumes exclusion restriction. RDD assumes continuity at the cutoff. Matching assumes selection on observables.');

  // ================================================================
  //  CAUSAL INFERENCE — INTERMEDIATE
  // ================================================================
  h('causal_inference','intermediate',0, 'In TWFE, the treatment coefficient captures the average effect across all treated units and time periods, assuming no heterogeneous effects.');
  h('causal_inference','intermediate',1, 'The reference period (usually <code>t = -1</code>) is omitted so all other period coefficients are relative to it. This normalizes the pre-trend.');
  h('causal_inference','intermediate',2, 'Matching on <b>post-treatment</b> variables (outcomes that occur after treatment) introduces bias. Only match on <b>pre-treatment</b> covariates.');
  h('causal_inference','intermediate',3, 'RDD should use <b>local</b> estimation near the cutoff, not a global polynomial. High-degree polynomials overfit and give misleading results.');
  h('causal_inference','intermediate',4, 'Event study in R: estimate with period indicators → extract coefficients → <code>ggplot()</code> with <code>geom_point()</code> and <code>geom_errorbar()</code>.');
  h('causal_inference','intermediate',5, 'IV diagnostics in Stata: <code>ivregress 2sls</code> → <code>estat firststage</code> to check instrument strength → <code>estat overid</code> if overidentified.');
  h('causal_inference','intermediate',6, '<code>rdrobust(y, x, c=cutoff)</code>: <code>y</code> is the outcome, <code>x</code> is the running variable, <code>c</code> is the cutoff value.');
  h('causal_inference','intermediate',7, 'Stata DiD: <code>regress y treat##post</code>. R: <code>feols(y ~ treat*post)</code>. Python: <code>smf.ols("y ~ treat*post")</code>.');

  // ================================================================
  //  CAUSAL INFERENCE — ADVANCED
  // ================================================================
  h('causal_inference','advanced',0, 'Synthetic control creates a weighted combination of untreated units that best matches the treated unit\'s pre-treatment outcomes.');
  h('causal_inference','advanced',1, 'The <b>Sargan-Hansen test</b> checks if instruments are valid (exogenous). A rejection means at least one instrument is invalid.');
  h('causal_inference','advanced',2, 'In an event study, period <code>t = -1</code> should be the reference (coefficient normalized to 0). Pre-treatment coefficients should be near zero.');
  h('causal_inference','advanced',3, 'RDD robustness: try different bandwidths, polynomial orders, and kernel functions. If the result changes dramatically, it\'s not robust.');
  h('causal_inference','advanced',4, 'Synthetic control in Python: define treated unit → define donor pool → optimize weights → compare treated vs synthetic post-treatment.');
  h('causal_inference','advanced',5, 'Matching workflow: estimate propensity scores → match → check covariate balance → if balanced, estimate treatment effect on matched sample.');
  h('causal_inference','advanced',6, 'In fixest, <code>i(time_var, ref = -1)</code> creates time dummies with period -1 as reference. Include inside the formula.');
  h('causal_inference','advanced',7, 'DiD: placebo pre-trends test. IV: overidentification test. RDD: bandwidth sensitivity. Matching: balance test. Match method to test.');

  // ================================================================
  //  ESTIMATION — BEGINNER
  // ================================================================
  h('estimation','beginner',0, 'In statsmodels, <code>.fit(cov_type="HC1")</code> computes robust standard errors. HC1 applies a small-sample degrees-of-freedom correction.');
  h('estimation','beginner',1, 'Adding <code>, robust</code> to a Stata regression command uses Huber-White standard errors that are valid under heteroskedasticity.');
  h('estimation','beginner',2, 'If residuals show a fan shape (variance increases with fitted values), standard errors are biased. Use <code>vcovHC()</code> for robust SEs in R.');
  h('estimation','beginner',3, 'Logit coefficients are <b>log-odds ratios</b>. To interpret as odds ratios, exponentiate: <code>exp(coef)</code>. They are NOT probability changes.');
  h('estimation','beginner',4, 'R robust SE workflow: <code>lm()</code> → <code>coeftest(model, vcov = vcovHC(model, type = "HC1"))</code>.');
  h('estimation','beginner',5, 'Compare by running the same regression twice: once without <code>, robust</code> and once with. Then <code>esttab</code> both side by side.');
  h('estimation','beginner',6, 'HC1 is the standard robust estimator (equivalent to Stata\'s <code>, robust</code>). Type <code>HC1</code> as the covariance type.');
  h('estimation','beginner',7, 'Python: <code>cov_type="HC1"</code>. Stata: <code>, robust</code>. R: <code>vcovHC(type="HC1")</code>. Match each syntax to its language.');

  // ================================================================
  //  ESTIMATION — INTERMEDIATE
  // ================================================================
  h('estimation','intermediate',0, 'Clustered SEs account for correlation within groups (e.g., firms, countries). Use when observations within clusters are not independent.');
  h('estimation','intermediate',1, 'Fixed effects absorb all <b>time-invariant</b> variables. If gender doesn\'t change over time, its effect is captured by the individual FE.');
  h('estimation','intermediate',2, 'With fewer than ~30-50 clusters, cluster-robust SEs can be severely biased. Consider wild cluster bootstrap or T(G-1) correction.');
  h('estimation','intermediate',3, 'In R, logit with <code>glm(family=binomial)</code> gives log-odds coefficients. Use <code>margins()</code> to convert to marginal effects.');
  h('estimation','intermediate',4, 'Bootstrap: loop B times → resample with replacement → fit model → store coefficient → compute SD of stored coefficients.');
  h('estimation','intermediate',5, 'In R, <code>feols(y ~ x | entity + time, cluster = ~entity)</code> combines two-way FE with clustered SEs in one step.');
  h('estimation','intermediate',6, 'Stata: <code>logit y x1 x2</code> to estimate, then <code>margins, dydx(*)</code> for average marginal effects.');
  h('estimation','intermediate',7, 'Stata: <code>xtreg, fe</code>. Python: <code>PanelOLS(entity_effects=True)</code>. R: <code>feols(y ~ x | entity)</code>.');

  // ================================================================
  //  ESTIMATION — ADVANCED
  // ================================================================
  h('estimation','advanced',0, 'Two-way clustering adjusts for correlation along two dimensions (e.g., firm AND year). <code>vcov = ~firm + year</code> in fixest.');
  h('estimation','advanced',1, 'Wild cluster bootstrap is preferred when the number of clusters is small. It simulates the null distribution using Rademacher weights.');
  h('estimation','advanced',2, 'When data is clustered, you must resample <b>entire clusters</b>, not individual observations. Otherwise the bootstrap ignores within-cluster correlation.');
  h('estimation','advanced',3, 'Comparing models with different SE types (e.g., OLS vs robust vs clustered) is misleading because confidence intervals are not comparable.');
  h('estimation','advanced',4, 'Two-way FE in Python: <code>PanelOLS(y, x, entity_effects=True, time_effects=True)</code>. Cluster SEs with <code>cov_type="clustered"</code>.');
  h('estimation','advanced',5, 'Reproducible bootstrap in Stata: <code>set seed 12345</code> → <code>bootstrap coef, reps(1000): regress y x</code>.');
  h('estimation','advanced',6, 'In fixest, <code>feols(y ~ x | firm + year, vcov = ~firm)</code> estimates two-way FE with firm-clustered SEs.');
  h('estimation','advanced',7, 'Robust SEs: heteroskedasticity. Clustered SEs: within-group correlation. Bootstrap: small samples or complex estimators. Match appropriately.');

  // ================================================================
  //  REPLICABILITY — BEGINNER
  // ================================================================
  h('replicability','beginner',0, 'A <code>ROOT</code> variable stores the project\'s base directory. All other paths are built relative to it, making the script portable.');
  h('replicability','beginner',1, '<code>here()</code> automatically finds the project root (where <code>.Rproj</code> lives) so paths work regardless of working directory.');
  h('replicability','beginner',2, 'Hardcoded paths like <code>C:\\Users\\name\\...</code> break on other machines. Use <code>global root</code> or relative paths instead.');
  h('replicability','beginner',3, 'Never overwrite raw data files. Save cleaned data to a separate file/folder (e.g., <code>data/clean/</code>) to preserve the original.');
  h('replicability','beginner',4, 'Project setup in R: <code>dir.create()</code> for folders → set paths → document the structure. Create folders before writing files to them.');
  h('replicability','beginner',5, 'Scripts should run in numbered order: <code>01_clean.do</code> → <code>02_merge.do</code> → <code>03_analyze.do</code> → <code>04_tables.do</code>.');
  h('replicability','beginner',6, '<code>.gitignore</code> patterns: <code>*.csv</code> ignores all CSVs, <code>data/</code> ignores the data folder, <code>.env</code> ignores secrets.');
  h('replicability','beginner',7, 'Repository = project folder tracked by git. Commit = saved snapshot. Branch = parallel version. Remote = server copy (e.g., GitHub).');

  // ================================================================
  //  REPLICABILITY — INTERMEDIATE
  // ================================================================
  h('replicability','intermediate',0, 'Stata\'s <code>log using</code> captures all output (commands + results) to a file, creating a complete record of what ran and what it produced.');
  h('replicability','intermediate',1, '<code>renv</code> records exact package versions in <code>renv.lock</code>. <code>renv::restore()</code> reinstalls those exact versions on another machine.');
  h('replicability','intermediate',2, 'Hardcoded paths fail on other machines. Use <code>os.path.join()</code> or <code>pathlib.Path()</code> with a configurable root directory.');
  h('replicability','intermediate',3, 'Manually copying numbers into reports is error-prone and not reproducible. Automate with <code>esttab</code>, <code>stargazer</code>, or similar.');
  h('replicability','intermediate',4, 'R automated export: <code>lm()</code> → <code>stargazer(model, out="table.tex")</code> or <code>modelsummary(model, output="table.docx")</code>.');
  h('replicability','intermediate',5, 'Python export: fit models → <code>Stargazer([model1, model2])</code> → <code>.render_latex()</code> or save to file.');
  h('replicability','intermediate',6, '<code>set.seed()</code> before random operations ensures identical results on every run. Type the R function name.');
  h('replicability','intermediate',7, 'Hardcoded paths → use relative paths. Manual tables → automate export. No seed → set seed. Match each problem to its solution.');

  // ================================================================
  //  REPLICABILITY — ADVANCED
  // ================================================================
  h('replicability','advanced',0, 'Virtual environments (<code>venv</code>) isolate Python packages per project. <code>requirements.txt</code> lists exact versions for reproducibility.');
  h('replicability','advanced',1, 'Stata <code>global</code> macros for subdirectories let collaborators change only one line (the root path) to run the project on their machine.');
  h('replicability','advanced',2, 'Hardcoded paths in R: replace with <code>here()</code> or <code>file.path()</code> relative to the project root.');
  h('replicability','advanced',3, 'If script 03 depends on output from script 02, and 02 hasn\'t been run (or was modified), 03 will fail or use stale data.');
  h('replicability','advanced',4, 'A Python master script: define root → build paths → <code>subprocess.run()</code> or <code>exec()</code> each sub-script in order.');
  h('replicability','advanced',5, 'Stata master script: <code>global root</code> → <code>do "$root/code/01_clean.do"</code> → ... → <code>do "$root/code/04_tables.do"</code>.');
  h('replicability','advanced',6, '<code>here()</code> finds the project root. <code>file.path()</code> joins paths portably. Use both for portable R scripts.');
  h('replicability','advanced',7, 'Feature branches prevent conflicts. Meaningful commits enable rollback. .gitignore protects sensitive data. Match each practice to its benefit.');

  // ================================================================
  //  MACHINE LEARNING — BEGINNER
  // ================================================================
  h('machine_learning','beginner',0, '<code>train_test_split(X, y, test_size=0.2)</code> holds out 20% for testing. <code>random_state</code> ensures the same split every time.');
  h('machine_learning','beginner',1, 'Setting a seed before random operations (like splitting) ensures reproducibility — same seed = same split every time.');
  h('machine_learning','beginner',2, 'Without <code>set.seed()</code>, each run produces a different random split, leading to different evaluation metrics.');
  h('machine_learning','beginner',3, 'With imbalanced classes (e.g., 95% non-default), a model predicting "no default" always gets 95% accuracy. Use precision, recall, or AUC instead.');
  h('machine_learning','beginner',4, 'ML pipeline: split data → train model on training set → predict on test set → evaluate. Never train on test data.');
  h('machine_learning','beginner',5, 'R ML workflow: <code>sample()</code> to split → <code>lm()</code> or <code>randomForest()</code> to train → <code>predict()</code> → evaluate.');
  h('machine_learning','beginner',6, '<code>Lasso(alpha=0.1)</code>: Lasso is the class name, <code>alpha</code> controls regularization strength. Higher alpha = more coefficients pushed to zero.');
  h('machine_learning','beginner',7, 'MSE: average squared error. RMSE: root of MSE (same units as y). R²: proportion of variance explained. AUC: classification discrimination.');

  // ================================================================
  //  MACHINE LEARNING — INTERMEDIATE
  // ================================================================
  h('machine_learning','intermediate',0, 'Regularization penalizes large coefficients. If features are on different scales, the penalty unfairly shrinks those with large units. <b>Standardize first</b>.');
  h('machine_learning','intermediate',1, '<code>num.trees</code>: number of trees in the forest (more = more stable). <code>mtry</code>: variables considered at each split (controls randomness).');
  h('machine_learning','intermediate',2, 'Data leakage: if you scale (fit scaler) on ALL data before splitting, the test set information leaks into training. Fit scaler on train only.');
  h('machine_learning','intermediate',3, 'Tuning hyperparameters on the test set makes test performance optimistic. Use a separate <b>validation set</b> or <b>cross-validation</b> for tuning.');
  h('machine_learning','intermediate',4, 'Stata Lasso with CV: <code>lasso linear y x1-x10, selection(cv)</code> automatically selects the penalty via cross-validation.');
  h('machine_learning','intermediate',5, 'Correct pipeline: split → fit scaler on train → transform train → transform test (using train parameters) → fit model on scaled train.');
  h('machine_learning','intermediate',6, 'Stata Lasso: <code>lasso linear y x1 x2 ..., selection(cv)</code>. The command name is <code>lasso</code>, selection method is <code>cv</code>.');
  h('machine_learning','intermediate',7, 'Lasso (L1): sparse, sets coefficients to zero. Ridge (L2): shrinks all coefficients, never exactly zero. Elastic Net: combines both.');

  // ================================================================
  //  MACHINE LEARNING — ADVANCED
  // ================================================================
  h('machine_learning','advanced',0, 'Double ML uses one ML model (<code>ml_l</code>) for the outcome and another (<code>ml_m</code>) for the treatment, then estimates the causal effect from residuals.');
  h('machine_learning','advanced',1, 'Causal forests estimate <b>heterogeneous treatment effects</b> — how the treatment effect varies across subgroups. Regular random forests only predict outcomes.');
  h('machine_learning','advanced',2, 'If features have different scales and you don\'t standardize, Lasso penalizes high-magnitude features more. The variable with the largest units gets shrunk first.');
  h('machine_learning','advanced',3, 'Prediction models find correlations. Causal inference requires identification strategies (randomization, IV, DiD, etc.). Correlation ≠ causation.');
  h('machine_learning','advanced',4, 'Double selection in Stata: use Lasso to select controls for both the outcome and the treatment, then include selected variables in the final regression.');
  h('machine_learning','advanced',5, 'R Lasso pipeline: <code>cv.glmnet()</code> for CV tuning → <code>lambda.min</code> or <code>lambda.1se</code> → predict on test set → compute RMSE.');
  h('machine_learning','advanced',6, 'In R, <code>grf</code> is the package for causal forests. <code>causal_forest(X, Y, W)</code> where W is the treatment indicator.');
  h('machine_learning','advanced',7, 'Prediction ML: "What will Y be?" Causal ML: "What is the effect of X on Y?" Match each method to the right question type.');

})();
