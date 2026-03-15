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
  h('syntax','beginner',0, 'Focus on the <code>as</code> keyword in the <code>import</code> statement. What does creating a shorthand name let you do when calling library functions later?');
  h('syntax','beginner',1, 'R has two distinct operators here: one stores a value into a variable, the other checks whether two values are equal and returns a logical result. Which is which?');
  h('syntax','beginner',2, 'Trace the arithmetic step by step: compute the subtraction first, then the division. The result is a decimal fraction, not a whole number.');
  h('syntax','beginner',3, 'Look at how <code>France</code> is being assigned. In Stata, how does the interpreter distinguish between a variable name and literal text?');
  h('syntax','beginner',4, 'Stata evaluates in two stages: first it stores a value in the local macro, then it substitutes the macro reference before running <code>display</code>. Focus on what the backtick-apostrophe syntax does.');
  h('syntax','beginner',5, 'Compare how each language handles two things: the symbol for storing values and the way functions are called on data objects. Look at the dot-notation vs standalone-function patterns.');
  h('syntax','beginner',6, 'Think about which pandas function reads delimited text files. The two keyword arguments expect quoted strings — one for character encoding, one for the column delimiter.');
  h('syntax','beginner',7, 'Each step depends on the previous one: a library must be loaded before calling its functions, and data must exist in memory before you can preview it.');

  // ================================================================
  //  SYNTAX — INTERMEDIATE
  // ================================================================
  h('syntax','intermediate',0, 'Read the method chain left to right: <code>groupby()</code> splits the data, <code>[\'income\']</code> selects a column within each group, and <code>.mean()</code> aggregates. How many values does the result have?');
  h('syntax','intermediate',1, 'Think about what <code>round(x, 2)</code> does to the number of decimal places, then how <code>paste()</code> combines its arguments. What separator does <code>paste()</code> use by default?');
  h('syntax','intermediate',2, 'Look at the operator inside the filter brackets. There is a critical difference between <code>=</code> (which stores a value) and <code>==</code> (which tests equality).');
  h('syntax','intermediate',3, 'Stata local macros use a specific punctuation pattern for dereferencing: a backtick (<code>`</code>) before and an apostrophe (<code>\'</code>) after the name. Check whether the code uses this pattern correctly.');
  h('syntax','intermediate',4, 'The <code>%&gt;%</code> pipe passes the result of one step as the first argument to the next function. Think of it as connecting a sequence of transformations.');
  h('syntax','intermediate',5, 'Start by loading data into memory. Then inspect metadata before examining content — you need to know what variables exist before you can analyze their distributions.');
  h('syntax','intermediate',6, 'Stata has a community package archive with a specific name. After installing a package, you can run estimation commands. Think about what the archive command and the regression command are called.');
  h('syntax','intermediate',7, 'Match by what each command <b>does</b>: showing summary statistics, previewing rows, counting observations, and computing a mean. Each Python command has a Stata equivalent.');

  // ================================================================
  //  SYNTAX — ADVANCED
  // ================================================================
  h('syntax','advanced',0, 'Nested function calls evaluate inside-out. Identify which function runs first, then trace how its output feeds into the next outer function. The natural log produces values around 10-11 for these incomes.');
  h('syntax','advanced',1, 'Python looks up variable names when a function is <b>called</b>, not when it is <b>defined</b>. Check whether <code>rate</code> exists by the time <code>compute_tax(df)</code> executes.');
  h('syntax','advanced',2, 'Python starts counting from 0 (the first element is at index [0]), while R starts from 1 (the first element is at index [1]). What does <code>[1]</code> select in each language?');
  h('syntax','advanced',3, 'Stata\'s <code>collapse</code> uses prefix syntax: the statistic goes in parentheses <b>before</b> the variable name, not wrapped around it like a function call.');
  h('syntax','advanced',4, 'Think about what each step produces that the next step needs. Loading data comes first, cleaning before analysis, and displaying stored results requires those results to already exist.');
  h('syntax','advanced',5, 'GAP1 needs a comparison operator to filter years. GAP2 should be a categorical column suitable for grouping. GAP3 is the aggregation function that matches what <code>avg_wage</code> implies.');
  h('syntax','advanced',6, 'Python loops use <code>for x in ...:</code> with indentation. Stata uses <code>forvalues</code>/<code>foreach</code> with braces and macro expansion. R uses <code>for (x in ...)</code> with braces. Match by the language markers.');
  h('syntax','advanced',7, 'The <code>%%</code> operator computes the remainder after division in both Python and R. Try the calculation by hand: what is left over when 7 is divided by 2?');

  // ================================================================
  //  DATA IMPORT — BEGINNER
  // ================================================================
  h('data_import','beginner',0, 'Follow the three steps: import the library, call a function to load the file, then call a method to preview. Think about how many rows <code>.head()</code> shows by default.');
  h('data_import','beginner',1, 'Focus on two Stata commands: one reads external CSV files into memory, and the other displays metadata about the loaded variables. The <code>clear</code> option removes any existing data first.');
  h('data_import','beginner',2, 'Imagine <code>head()</code> rotated so each column becomes a row. What information would you see for each column — just the name, or also its type and sample values?');
  h('data_import','beginner',3, 'In Python strings, the backslash <code>\\</code> starts escape sequences. What does <code>\\n</code> mean inside a string? How does that corrupt a file path?');
  h('data_import','beginner',4, 'The pandas function for Excel files follows the same naming pattern as <code>read_csv</code>. Remember Python\'s 0-based indexing when specifying sheet numbers.');
  h('data_import','beginner',5, 'You must load data before inspecting it, and you should verify the import looks correct before saving. Think about which commands depend on data already being in memory.');
  h('data_import','beginner',6, 'Each language has its own file-reading function. Python pandas functions start with <code>pd.</code>, R uses standalone functions, and Stata uses commands like <code>use</code> and <code>import</code>.');
  h('data_import','beginner',7, 'Garbled accented characters (like <code>&Atilde;&copy;</code> instead of <code>&eacute;</code>) indicate an encoding mismatch. European files often use a specific encoding different from UTF-8.');

  // ================================================================
  //  DATA IMPORT — INTERMEDIATE
  // ================================================================
  h('data_import','intermediate',0, 'A <b>left</b> join keeps every row from the first (left) DataFrame. Think about what value gets filled in for the right DataFrame\'s columns when there is no matching row.');
  h('data_import','intermediate',1, '<code>1:m</code> stands for one-to-many. Think about which dataset has unique keys (each value appears at most once) and which has repeated keys.');
  h('data_import','intermediate',2, 'Merge keys are compared as exact strings. Look at the actual values in the key columns — do <code>\'France\'</code> and <code>\'france\'</code> match when compared as strings?');
  h('data_import','intermediate',3, 'Notice that the path is a URL, not a local file. Some Stata commands can download and parse files directly from web addresses.');
  h('data_import','intermediate',4, 'Follow the dependency chain: you need a response before you can parse JSON, parsed JSON before you can extract records, and records before you can build a DataFrame. What must come before everything?');
  h('data_import','intermediate',5, 'dplyr names its join functions descriptively — the join type is part of the function name. The <code>by</code> argument expects a quoted column name that exists in both data frames.');
  h('data_import','intermediate',6, 'Match by what each merge operation does: keeping all left-side rows, keeping only matched rows, or stacking rows vertically.');
  h('data_import','intermediate',7, 'The World Bank API returns a JSON array with two elements. The actual data records are in the second element, not accessible via direct property names like <code>$indicator</code>.');

  // ================================================================
  //  DATA IMPORT — ADVANCED
  // ================================================================
  h('data_import','advanced',0, '<code>melt()</code> converts columns into rows. Each column listed in <code>value_vars</code> becomes a separate row. Think about how many rows result if you have 5 countries and 3 year columns.');
  h('data_import','advanced',1, 'Stata\'s <code>reshape long</code> takes stub variables (like <code>income2018</code>) and stacks them into rows. The suffix becomes a new variable named in <code>j()</code>.');
  h('data_import','advanced',2, 'Look at what variables are listed after <code>merge</code>. Both datasets have a <code>year</code> variable — is it included in the merge keys? What happens when you merge only on <code>country</code>?');
  h('data_import','advanced',3, 'Think about how the table gets rendered. Does <code>requests.get()</code> execute JavaScript? Many modern pages load content dynamically after the initial HTML is served.');
  h('data_import','advanced',4, 'Follow the pipeline: imports, fetch the page, parse HTML, loop through rows, extract cells, store data. Each step depends on the output of the previous one.');
  h('data_import','advanced',5, 'The tidyr function for wide-to-long reshaping is the opposite of <code>pivot_wider</code>. The <code>names_to</code> and <code>values_to</code> arguments need quoted strings for the new column names.');
  h('data_import','advanced',6, 'Match by operation type: wide-to-long reshaping, long-to-wide reshaping, and full (outer) joins. Each pair performs the same operation in different languages.');
  h('data_import','advanced',7, '<code>file.path()</code> uses the OS-appropriate path separator automatically. Think about what happens when your code runs on a different operating system — Windows uses <code>\\</code> while Mac/Linux uses <code>/</code>.');

  // ================================================================
  //  DATA EXPLORATION — BEGINNER
  // ================================================================
  h('data_exploration','beginner',0, '<code>.describe()</code> computes a standard set of summary statistics for numeric columns. Think about which statistics are most useful for understanding a distribution at a glance.');
  h('data_exploration','beginner',1, 'Without <code>detail</code>, Stata\'s <code>summarize</code> shows basic statistics. The <code>detail</code> option adds a much richer set of distributional information — think about percentiles, shape, and extreme values.');
  h('data_exploration','beginner',2, 'Break the chain: <code>.isnull()</code> produces a True/False value for each cell. Then <code>.sum()</code> counts the True values per column. What does the result tell you?');
  h('data_exploration','beginner',3, 'R\'s <code>mean()</code> has a specific default behavior when any input value is <code>NA</code>. There is a parameter that tells R to exclude missing values before computing.');
  h('data_exploration','beginner',4, 'dplyr has a function that tallies how many times each unique value appears. The column name is passed unquoted (without quotes) in dplyr\'s syntax.');
  h('data_exploration','beginner',5, 'Think about dependencies: you need data loaded before checking anything. Check the data\'s structure and quality before computing summary statistics that could be affected by missing values.');
  h('data_exploration','beginner',6, 'Match by what each pair does: summary statistics, frequency counts, row counts, and missing value checks. Each Python command has an equivalent in R or Stata.');
  h('data_exploration','beginner',7, 'The <code>bysort</code> prefix sorts the data by a variable and then runs the command <b>separately for each group</b>. Think about whether the result is one summary or multiple summaries.');

  // ================================================================
  //  DATA EXPLORATION — INTERMEDIATE
  // ================================================================
  h('data_exploration','intermediate',0, '<code>.agg()</code> can accept a list of function names to compute multiple statistics per group. The result has one row per group and one column per statistic.');
  h('data_exploration','intermediate',1, 'The comparison <code>df[\'age\'] > 30</code> is applied element-wise. Think about what type of object it produces — a single value, or one value per row? How does <code>df[...]</code> use that?');
  h('data_exploration','intermediate',2, 'Check the data type of the column being aggregated. If numeric values were read as strings, <code>.mean()</code> cannot compute an average and will produce empty results.');
  h('data_exploration','intermediate',3, 'Look at the right side of the <code>|</code> operator. A standalone string like <code>\'South\'</code> is not a complete comparison — you need both sides of <code>|</code> to be proper Boolean expressions.');
  h('data_exploration','intermediate',4, 'A dplyr pipeline starts with data, then filters rows, groups, summarises, and arranges. Think about which steps are more efficient when placed early and which require prior steps to be completed.');
  h('data_exploration','intermediate',5, 'Stata\'s command for creating two-way frequency tables takes two variable names. The first becomes rows, the second becomes columns.');
  h('data_exploration','intermediate',6, 'Stata\'s <code>correlate</code> computes pairwise Pearson correlation coefficients. With multiple variables, it produces a square matrix. Think about what the diagonal values are and what the off-diagonal values represent.');
  h('data_exploration','intermediate',7, 'Match by what each pair does: grouped means, grouped means with plotting, and frequency counts. Notice how Python chains methods while R separates computation from visualization.');

  // ================================================================
  //  DATA EXPLORATION — ADVANCED
  // ================================================================
  h('data_exploration','advanced',0, 'Read the chain step by step: <code>query()</code> filters rows, <code>groupby()</code> creates groups from two columns, <code>agg()</code> computes multiple statistics per group, and <code>reset_index()</code> flattens the result.');
  h('data_exploration','advanced',1, 'Grouping by two columns creates a multi-level index. Using <code>.loc[\'France\']</code> selects the outer level. What does the resulting object look like — a single number or a Series?');
  h('data_exploration','advanced',2, 'Stata does not recognize the English word <code>and</code> as a logical operator. Think about which symbol Stata uses for AND conditions.');
  h('data_exploration','advanced',3, 'If a numeric column was read as character (e.g., because of commas in <code>\'45,000\'</code>), <code>summary()</code> shows character-type output instead of numeric statistics. Think about what caused the wrong type.');
  h('data_exploration','advanced',4, 'The workflow progresses from loading to quality checks to cleaning to analysis to visualization. Each step depends on findings from the previous one.');
  h('data_exploration','advanced',5, 'The dplyr aggregation verb has British and American spellings. R statistical functions need <code>na.rm = TRUE</code> to handle missing values. The standard deviation function in R is a two-letter abbreviation.');
  h('data_exploration','advanced',6, 'Match by operation: correlation matrices, row filtering, cross-tabulations, and group-level transformations (adding a group statistic as a new column without collapsing rows).');
  h('data_exploration','advanced',7, 'Look at the overall structure: does the script follow a logical progression? Consider what each numbered section accomplishes and whether the sections build on each other.');

  // ================================================================
  //  DATA CLEANING — BEGINNER
  // ================================================================
  h('data_cleaning','beginner',0, 'Focus on the <code>subset</code> parameter in <code>dropna()</code>. It controls <b>which column</b> triggers row removal. Rows with missing values in other columns are kept.');
  h('data_cleaning','beginner',1, 'The command name <code>destring</code> literally means "remove the string-ness." Look at what <code>ignore()</code> does to formatting characters, and how Stata handles the string <code>"."</code>.');
  h('data_cleaning','beginner',2, 'In R, subsetting operations return a <b>new</b> data frame — they do not modify the original. Check whether the result of the subsetting is being stored back into a variable.');
  h('data_cleaning','beginner',3, 'Check the data type of <code>zipcode</code>. When R creates a data frame from plain numbers, what type are they stored as? What might happen when <code>str_pad</code> implicitly converts that type to character?');
  h('data_cleaning','beginner',4, 'Think about why missing values must be dropped <b>before</b> type conversion. What happens if you call <code>.astype(int)</code> on a column that still contains NaN?');
  h('data_cleaning','beginner',5, 'You must load data before operating on it. Also, <code>destring</code> converts strings to numeric — think about whether numeric operations like <code>missing()</code> and <code>round()</code> can work on string data.');
  h('data_cleaning','beginner',6, 'You need to compute the average of the existing (non-missing) values in the column. Which pandas method on a Series returns the arithmetic mean, automatically excluding NaN?');
  h('data_cleaning','beginner',7, 'Match by the operation described: dropping missing rows, converting types, trimming whitespace, and replacing missing values. Look for language-specific keywords in each code snippet.');

  // ================================================================
  //  DATA CLEANING — INTERMEDIATE
  // ================================================================
  h('data_cleaning','intermediate',0, 'Trace each step in the chain: <code>.str.strip()</code> removes edge spaces, <code>.str.lower()</code> lowercases everything, and the regex <code>\\s+</code> matches one or more whitespace characters. What does each step produce?');
  h('data_cleaning','intermediate',1, '<code>case_when</code> evaluates conditions top to bottom and returns the value for the <b>first</b> condition that is TRUE. Check which range the given value falls into.');
  h('data_cleaning','intermediate',2, 'Think about how <code>str.replace()</code> interprets its first argument by default in recent versions of pandas. Is it treated as a regex pattern or a literal string?');
  h('data_cleaning','intermediate',3, 'Look at what variables are inside the <code>missing()</code> function call. How does <code>missing()</code> behave when given multiple variables — does it check any or all?');
  h('data_cleaning','intermediate',4, 'The key constraint: you must record which values are missing <b>before</b> filling them. Once <code>fillna()</code> runs, you can no longer tell which values were originally NaN.');
  h('data_cleaning','intermediate',5, 'Duplicate firms appearing many times would distort percentile calculations. Deduplication must come first so repeated observations do not bias the quantile boundaries.');
  h('data_cleaning','intermediate',6, 'Stata syntax: <code>replace varname = value if condition</code>. The missing value in Stata is represented by a single dot (<code>.</code>). Think about what condition identifies the invalid observations.');
  h('data_cleaning','intermediate',7, 'Match by functional equivalence: lowercasing strings, imputing missing values, deduplicating rows, and clipping outliers. Each Python method has an R counterpart.');

  // ================================================================
  //  DATA CLEANING — ADVANCED
  // ================================================================
  h('data_cleaning','advanced',0, '<code>np.where(condition, value_if_true, value_if_false)</code> checks each element. Pay special attention to whether zero satisfies <code>> 0</code>.');
  h('data_cleaning','advanced',1, 'In Stata, <code>_merge</code> has three categories: master only, using only, and matched. Read the frequency table to understand what each count means about data quality.');
  h('data_cleaning','advanced',2, 'Think about what happens to the distribution of a variable when 30% of its values are all replaced by the same number. How does that affect variance and downstream standard errors?');
  h('data_cleaning','advanced',3, 'Check the type of <code>firm_id</code>. When R coerces a numeric (double) to character for a string function, the text representation may include unexpected decimals or scientific notation.');
  h('data_cleaning','advanced',4, 'Think about dependencies: deduplication affects statistics so it comes first. Missing indicators must be created before imputation. Quantile bounds must be computed before clipping.');
  h('data_cleaning','advanced',5, 'The workflow is: load data, merge, inspect the <code>_merge</code> diagnostics, keep only matched observations, then clean up. You must look at <code>_merge</code> before deciding what to drop.');
  h('data_cleaning','advanced',6, 'To clip values from both sides, nest two element-wise functions: one enforces a floor and the other enforces a ceiling. Which R functions operate element-wise (not returning a single value)?');
  h('data_cleaning','advanced',7, 'Match by the operation described: checking for duplicates, inspecting merge quality, counting missing values, and identifying outliers. Identify the language from the syntax of each code snippet.');

  // ================================================================
  //  DATA ANALYSIS — BEGINNER
  // ================================================================
  h('data_analysis','beginner',0, 'Look at the <code>cov_type</code> parameter in <code>.fit()</code>. HC1 is a specific type of variance-covariance estimator. Think about what changes and what stays the same compared to a default <code>.fit()</code> call.');
  h('data_analysis','beginner',1, 'The <code>reg</code> command runs OLS. The <code>i.</code> prefix creates indicator (dummy) variables. The <code>robust</code> option changes how standard errors are computed. Think about how each part contributes.');
  h('data_analysis','beginner',2, 'Compare this <code>.fit()</code> call to a version with <code>cov_type=\'HC1\'</code>. What is missing? Think about what happens when <code>.fit()</code> is called without specifying a covariance type.');
  h('data_analysis','beginner',3, 'In R formulas, <code>*</code> and <code>:</code> have different meanings. One automatically includes the main effects of both variables; the other includes only the interaction term.');
  h('data_analysis','beginner',4, 'In statsmodels, defining a model (<code>.ols()</code>) and estimating it (<code>.fit()</code>) are separate steps. Think about which objects must exist before each function can be called.');
  h('data_analysis','beginner',5, 'Load the export package first, then estimate models from simplest to most complex. The export function needs the fitted model objects to exist before it can create the comparison table.');
  h('data_analysis','beginner',6, 'Stata\'s clustering option goes after the comma in a regression command. Think about which variable identifies the groups whose errors may be correlated.');
  h('data_analysis','beginner',7, 'Match by what each command does: OLS with robust SEs, fixed effects regression, and logistic regression. Identify the language from the syntax of each command.');

  // ================================================================
  //  DATA ANALYSIS — INTERMEDIATE
  // ================================================================
  h('data_analysis','intermediate',0, 'Look at <code>cov_type=\'cluster\'</code> together with <code>cov_kwds</code>. The keyword arguments configure <b>how</b> the clustering is done — specifically which variable defines the groups.');
  h('data_analysis','intermediate',1, 'In <code>feols()</code>, variables after the <code>|</code> are absorbed as fixed effects, and <code>cluster = ~var</code> controls standard error computation. These are two separate concepts.');
  h('data_analysis','intermediate',2, 'Think about what logit coefficients actually measure. Are they in probability units or in some other scale? How would you convert them to probability changes?');
  h('data_analysis','intermediate',3, 'Look at when each control variable was measured relative to the treatment. A variable that is <b>affected by</b> the treatment introduces bias if you control for it.');
  h('data_analysis','intermediate',4, 'You must estimate the logit model before computing marginal effects, because <code>margins()</code> takes a fitted model object as input. Load the package first.');
  h('data_analysis','intermediate',5, 'Stata requires you to declare the panel structure with <code>xtset</code> before using panel estimators like <code>xtreg</code>. Data must be in memory before any of this.');
  h('data_analysis','intermediate',6, 'R formula shorthand: <code>A * B</code> expands to <code>A + B + A:B</code>. The <code>*</code> includes both main effects plus their interaction in one operator.');
  h('data_analysis','intermediate',7, 'Think about what each statistic measures: R-squared is about explained variance, F-statistic is about joint significance, coefficient/SE gives individual significance, and cluster count affects inference.');

  // ================================================================
  //  DATA ANALYSIS — ADVANCED
  // ================================================================
  h('data_analysis','advanced',0, 'Count the terms carefully: the intercept is always implicit in statsmodels formulas. The <code>:</code> operator creates only the interaction, not the main effects. How many total terms?');
  h('data_analysis','advanced',1, 'Focus on the <code>keep()</code> option — it controls which coefficients appear in the output table. Also note the file format specified in <code>using</code>.');
  h('data_analysis','advanced',2, 'With 500 firms observed 10 times each, errors within the same firm are likely correlated over time. Does <code>HC1</code> handle within-group serial correlation, or only heteroskedasticity?');
  h('data_analysis','advanced',3, 'When resampling with replacement, some categories of a factor variable may be entirely absent in certain bootstrap samples. What happens to the model matrix and coefficient positions?');
  h('data_analysis','advanced',4, 'The bootstrap standard error is the standard deviation of coefficients across replications. Think about what must be initialized before the loop, what happens inside each iteration, and what comes after.');
  h('data_analysis','advanced',5, 'Clear previously stored estimates first. Then build models from simplest to most complex, storing each one. The comparison table can only be produced after all models are stored.');
  h('data_analysis','advanced',6, 'The Stargazer constructor expects its models grouped in a Python collection type. Think about the standard syntax for an ordered sequence of items.');
  h('data_analysis','advanced',7, 'Match by what each diagnostic does: computing marginal effects, measuring multicollinearity, testing for heteroskedasticity, and visualizing residual patterns. Identify the language from each code snippet.');

  // ================================================================
  //  CAUSAL INFERENCE — BEGINNER
  // ================================================================
  h('causal_inference','beginner',0, 'In DiD, three variables enter the regression: a group dummy, a time dummy, and their interaction. Which one captures the <b>differential</b> change for the treated group relative to control?');
  h('causal_inference','beginner',1, 'The function uses <code>method = "nearest"</code> for matching. Think about what "nearest neighbor" means in the context of estimated propensity scores — what is the function doing to treated and control units?');
  h('causal_inference','beginner',2, 'With 50 states observed over 20 years, observations within the same state are correlated over time. Does the <code>robust</code> option handle within-group serial correlation?');
  h('causal_inference','beginner',3, 'Look at the first-stage F-statistic. There is a well-known threshold for instrument strength. Is the reported value above or below that rule-of-thumb?');
  h('causal_inference','beginner',4, 'The post indicator depends on the year variable, so create it after loading the data. The interaction term requires both treatment and post columns to already exist.');
  h('causal_inference','beginner',5, 'Load the package first. Bandwidth selection is informational and typically precedes estimation. The model must be estimated before results can be displayed.');
  h('causal_inference','beginner',6, 'Stata IV syntax places the endogenous variable on the left and the instrument on the right inside the parentheses: <code>(endogenous = instrument)</code>.');
  h('causal_inference','beginner',7, 'Each method has one core assumption: DiD relies on how trends would have evolved, RDD on behavior near a threshold, IV on the instrument\'s channel of influence, and matching on which confounders are observed.');

  // ================================================================
  //  CAUSAL INFERENCE — INTERMEDIATE
  // ================================================================
  h('causal_inference','intermediate',0, 'With both country and year fixed effects, the coefficient is identified from <b>within-country</b> variation over time, net of common year shocks. Think about what each type of fixed effect absorbs.');
  h('causal_inference','intermediate',1, 'In event studies, one period must be omitted as the reference for normalization. Think about which period makes pre-treatment coefficients interpretable as a test of parallel trends.');
  h('causal_inference','intermediate',2, 'Check when each matching variable was measured relative to the treatment. The training was assigned in January 2020. Is every variable measured <b>before</b> that date?');
  h('causal_inference','intermediate',3, 'RDD identification comes from observations <b>near the cutoff</b>. What happens when observations far from the cutoff have excessive influence on a high-order polynomial fit?');
  h('causal_inference','intermediate',4, 'The relative time variable must exist before it can appear in the formula. The <code>iplot()</code> function needs the fitted model object. Think about what must be created in what order.');
  h('causal_inference','intermediate',5, 'Post-estimation commands like <code>estat</code> can only run after an estimation command. The first-stage F-test checks instrument strength, while the endogeneity test checks whether IV is needed at all.');
  h('causal_inference','intermediate',6, 'The <code>c</code> parameter in <code>rdrobust()</code> specifies the cutoff value of the running variable. What is the threshold where treatment status changes?');
  h('causal_inference','intermediate',7, 'Match by method: TWFE DiD with fixed effects, IV first-stage diagnostics, RDD bandwidth selection, and propensity score estimation. Identify the language from the syntax of each command.');

  // ================================================================
  //  CAUSAL INFERENCE — ADVANCED
  // ================================================================
  h('causal_inference','advanced',0, 'The synthetic control method combines donor units with optimal weights. Think about <b>how</b> it combines them — equally, optimally, or randomly? Are weights allowed to be negative?');
  h('causal_inference','advanced',1, 'The Sargan-Hansen test has a null hypothesis about instrument validity. A <b>high</b> p-value means failure to reject. What does the null hypothesis state?');
  h('causal_inference','advanced',2, 'Look at which period is set as <code>ref</code>. If the reference is the treatment period itself, what do the pre-treatment coefficients end up measuring? Compare this to using the period just before treatment.');
  h('causal_inference','advanced',3, 'Robustness in RDD typically requires demonstrating that results are stable across different bandwidth choices. Think about the standard set of bandwidths to report.');
  h('causal_inference','advanced',4, 'Data must be loaded and indexed before the synthetic control can identify units and time periods. The placebo test is a robustness check that comes after the main analysis.');
  h('causal_inference','advanced',5, 'Propensity scores must be estimated before matching can use them. The balance check verifies covariate similarity and can only be computed after the matched sample exists.');
  h('causal_inference','advanced',6, 'The fixest syntax for event study dummies is <code>i(variable, ref = value)</code>, where <code>ref</code> specifies the omitted reference period. The standard convention uses the period just before treatment.');
  h('causal_inference','advanced',7, 'Each method has a signature robustness check: event studies check pre-trends, RDD varies the estimation window, IV tests instrument strength, and synthetic control uses placebo assignments.');

  // ================================================================
  //  ESTIMATION — BEGINNER
  // ================================================================
  h('estimation','beginner',0, 'Look at the <code>cov_type</code> argument in <code>.fit()</code>. Think about what <b>changes</b> (the uncertainty estimates) and what <b>stays the same</b> (the point estimates) compared to calling <code>.fit()</code> without it.');
  h('estimation','beginner',1, 'Compare the two <code>regress</code> commands — one with <code>, robust</code> and one without. Think about whether the option affects the coefficients themselves or only the standard errors around them.');
  h('estimation','beginner',2, 'The researcher already knows there is heteroskedasticity. Look at how <code>summary()</code> computes standard errors by default — does it account for non-constant error variance?');
  h('estimation','beginner',3, 'In a logit model, coefficients are expressed in <b>log-odds</b>, not probabilities. Can you interpret 0.35 directly as a percentage-point change in probability?');
  h('estimation','beginner',4, 'Two R packages are needed: one provides the robust variance estimator function, and the other provides the function to display results using that variance matrix. Both must be loaded first.');
  h('estimation','beginner',5, 'Each regression must be stored immediately after it runs, because <code>estimates store</code> captures the most recently estimated model. The comparison table needs both stored estimates.');
  h('estimation','beginner',6, 'GAP1: The argument to <code>.fit()</code> that controls the variance-covariance type is two words joined by an underscore. GAP2: The HC variant with small-sample correction matches Stata\'s <code>, robust</code>.');
  h('estimation','beginner',7, 'All four pairs perform the same task — requesting robust standard errors — but in different languages. Match by identifying which syntax belongs to Python, Stata, or R.');

  // ================================================================
  //  ESTIMATION — INTERMEDIATE
  // ================================================================
  h('estimation','intermediate',0, 'Clustering accounts for error correlation within groups. Think about why workers at the same firm might have correlated unobserved characteristics, and how that affects standard errors.');
  h('estimation','intermediate',1, 'Entity fixed effects demean each variable within each individual. If a variable <b>never changes</b> over time for a person (like gender), what happens after demeaning?');
  h('estimation','intermediate',2, 'Cluster-robust standard errors rely on asymptotic theory as the number of clusters grows large. How many clusters does this study have, and is that enough for the asymptotics to be reliable?');
  h('estimation','intermediate',3, 'Logit coefficients are in log-odds units, which are nonlinearly related to probabilities. Think about what function or command converts them to probability-scale changes.');
  h('estimation','intermediate',4, 'The random seed must be set before any sampling. You need an empty container before the loop can fill it. The standard deviation is computed from the full set of stored coefficients after the loop finishes.');
  h('estimation','intermediate',5, 'In fixest, <code>feols(y ~ x | entity + time, vcov = ~entity)</code> combines two-way FE with clustered SEs. Load the package and data before estimation, and display results after.');
  h('estimation','intermediate',6, 'GAP1: The Stata command for logistic regression that reports log-odds coefficients. GAP2: The Stata post-estimation command that converts log-odds to probability-scale marginal effects.');
  h('estimation','intermediate',7, 'Match commands that add the same type of fixed effects (entity-only, entity with clustered SEs, two-way FE). Identify which language each syntax belongs to by looking for characteristic markers.');

  // ================================================================
  //  ESTIMATION — ADVANCED
  // ================================================================
  h('estimation','advanced',0, 'Notice the <code>vcov = ~firm_id + year</code> syntax with a <b>plus sign</b> between two variables. This allows for error correlation along two separate dimensions simultaneously.');
  h('estimation','advanced',1, 'Check how many clusters (states) are in the sample. Standard clustered SEs need many clusters to be reliable. What alternative provides better inference with few clusters?');
  h('estimation','advanced',2, 'Look at what unit is being resampled in the bootstrap loop. With clustered data, should you resample individual observations or entire clusters (firms)?');
  h('estimation','advanced',3, 'Compare the options after the comma in each <code>regress</code> command. Are both models using the same type of standard errors? What happens when you compare significance across different SE types?');
  h('estimation','advanced',4, 'The panel data must be indexed by entity and time before PanelOLS can identify the panel structure. Both entity and time effects are specified as boolean flags. Print results last.');
  h('estimation','advanced',5, 'Data must be loaded before analysis. The seed must be set before any command involving randomness. Post-estimation diagnostics can only run after the bootstrap finishes all replications.');
  h('estimation','advanced',6, 'GAP1: The fixest function for fixed-effects OLS — its name abbreviates the method. GAP2: The variable to cluster on — typically the cross-sectional unit to account for serial correlation.');
  h('estimation','advanced',7, 'Match each SE method with the data structure it is designed for: cross-sectional heteroskedasticity, grouped data with many clusters, grouped data with few clusters, or panel data with two correlation dimensions.');

  // ================================================================
  //  REPLICABILITY — BEGINNER
  // ================================================================
  h('replicability','beginner',0, 'A single <code>ROOT</code> variable stores the project\'s base directory. All other paths are built relative to it. Think about how many lines a collaborator needs to change to run this on their machine.');
  h('replicability','beginner',1, 'The <code>here()</code> function automatically finds the project root by looking for marker files (<code>.Rproj</code>, <code>.here</code>, <code>.git</code>). How does this help when sharing code?');
  h('replicability','beginner',2, 'Look at the file paths in the <code>use</code> and <code>save</code> commands. Would these exact paths exist on someone else\'s computer?');
  h('replicability','beginner',3, 'Compare the file path in <code>pd.read_csv()</code> with the path in <code>df.to_csv()</code>. Where is the cleaned data being saved — in the same location as the original?');
  h('replicability','beginner',4, 'The <code>here</code> package must be loaded before <code>here()</code> can be called. The directory list must be defined before the loop iterates over it. The confirmation message comes after creation.');
  h('replicability','beginner',5, 'Follow the numbered prefixes: data must be imported before cleaned, cleaned before analyzed, analyzed before tables are exported. Each script produces output the next one needs.');
  h('replicability','beginner',6, 'GAP1: The standard filename for storing secret environment variables starts with a dot. GAP2: The Git configuration file that specifies which files to ignore also starts with a dot.');
  h('replicability','beginner',7, 'Think about the lifecycle of a file change in Git: it starts in your working directory, gets staged with <code>git add</code>, and becomes permanent with <code>git commit</code>. Match each concept to its role.');

  // ================================================================
  //  REPLICABILITY — INTERMEDIATE
  // ================================================================
  h('replicability','intermediate',0, 'The <code>log using</code> command captures all Stata output to a file. Think about what a reviewer could do with this file without needing to re-run the code.');
  h('replicability','intermediate',1, '<code>renv::snapshot()</code> records exact package versions. <code>renv::restore()</code> reinstalls those same versions. Think about what happens when a package update changes a function\'s behavior.');
  h('replicability','intermediate',2, 'Look at the strings in <code>pd.read_csv()</code> and <code>df.to_csv()</code>. Would these paths exist on a Mac, Linux, or a different Windows user\'s machine?');
  h('replicability','intermediate',3, 'Look at how the regression coefficient gets from Stata output into the LaTeX file. Is this process automated or does it involve manual copying?');
  h('replicability','intermediate',4, 'Load packages before calling their functions. Estimate the model before exporting its results. The confirmation message should come last.');
  h('replicability','intermediate',5, 'Both imports must come before any function calls. The regression must produce results before Stargazer can format them. Writing to a file is the final step.');
  h('replicability','intermediate',6, 'GAP1: The R function to fix the random number generator seed is two words joined by a dot. GAP2: The R function for standard deviation is a common two-letter abbreviation.');
  h('replicability','intermediate',7, 'Each problem is caused by a specific bad practice. Think about what <b>single change</b> would fix each: portable paths, numbered scripts, automated export, or data separation.');

  // ================================================================
  //  REPLICABILITY — ADVANCED
  // ================================================================
  h('replicability','advanced',0, 'Notice the <code>==</code> syntax in requirements.txt (e.g., <code>pandas==2.1.4</code>). Think about what happens if a collaborator installs a newer version that changed its behavior.');
  h('replicability','advanced',1, 'All sub-directory globals (<code>$data</code>, <code>$code</code>, <code>$output</code>) are derived from <code>$root</code>. How many lines need changing when a collaborator sets up the project?');
  h('replicability','advanced',2, 'Look at the strings in <code>read_csv()</code> and <code>write_csv()</code>. Do they contain paths specific to one user\'s machine? What R function builds paths relative to the project root?');
  h('replicability','advanced',3, 'Look carefully at the master script. Is every numbered script being executed, or are any lines commented out? What happens when a downstream script depends on the output of a skipped step?');
  h('replicability','advanced',4, 'Imports must come before function calls. ROOT should be defined relative to the script\'s own location for portability. The scripts list must exist before the loop iterates over it.');
  h('replicability','advanced',5, 'The root path must be defined before any command that uses <code>$root</code>. The log file should open before the do-files run. The log must close at the very end to capture all output.');
  h('replicability','advanced',6, 'Both blanks use the same R package/function that builds paths relative to the project root. It automatically detects where marker files (<code>.Rproj</code> or <code>.here</code>) live.');
  h('replicability','advanced',7, 'Think about how each Git practice contributes to reproducibility: tracking decisions, isolating experiments, protecting sensitive data, and coordinating with collaborators.');

  // ================================================================
  //  MACHINE LEARNING — BEGINNER
  // ================================================================
  h('machine_learning','beginner',0, 'Look at <code>test_size=0.2</code> and <code>random_state=42</code>. One controls the proportion of data held out, the other fixes the random split. Think about what each does for reproducibility.');
  h('machine_learning','beginner',1, 'The code generates random numbers to split data and sets a seed beforehand. Think about why the seed matters and what the proportion <code>0.8</code> in the <code>gen train</code> line controls.');
  h('machine_learning','beginner',2, 'The code uses <code>initial_split()</code> which involves random sampling. Check whether there is a <code>set.seed()</code> call before it. What happens without one?');
  h('machine_learning','beginner',3, 'Look at the class distribution: 95% non-default, 5% default. What accuracy would a model that <b>always predicts the majority class</b> achieve?');
  h('machine_learning','beginner',4, 'The ML workflow follows: import, split data, create the model object, train it on training data, then evaluate on test data. Training and evaluation must use separate data.');
  h('machine_learning','beginner',5, 'Load the package first, then set the seed before the random split. Extract train/test subsets before fitting the model. Evaluate on test data last.');
  h('machine_learning','beginner',6, 'GAP1: The sklearn class for L1-regularized regression starts with an uppercase letter. GAP2: The regularization strength specified in the prompt — a decimal number.');
  h('machine_learning','beginner',7, 'RMSE and R-squared are for regression (continuous outcomes). AUC and Recall are for classification (binary outcomes). Think about what each one actually measures.');

  // ================================================================
  //  MACHINE LEARNING — INTERMEDIATE
  // ================================================================
  h('machine_learning','intermediate',0, 'Lasso penalizes the <b>absolute magnitude</b> of coefficients. If features are on very different scales (thousands vs single digits), which coefficients will be naturally larger and which smaller?');
  h('machine_learning','intermediate',1, '<code>num.trees</code> controls how many trees are grown. <code>mtry</code> controls how many features each tree considers at each split — this randomness is what decorrelates the trees.');
  h('machine_learning','intermediate',2, 'Look at when <code>fit_transform</code> is called and what data it uses. Is the scaler learning statistics (mean, std) from data that the model should never see during training?');
  h('machine_learning','intermediate',3, 'The loop tries multiple lambda values and picks the one with the best <b>test</b> RMSE. How many times is the test set being used? The test set should only be touched <b>once</b>.');
  h('machine_learning','intermediate',4, 'Data must be loaded and the seed set before analysis involving randomness. The Lasso model must be fitted before its coefficients or predictions can be inspected.');
  h('machine_learning','intermediate',5, 'The critical rule: the scaler must learn its statistics from the <b>training data only</b>. Use <code>fit_transform</code> on training data, but only <code>transform</code> (no fitting) on test data.');
  h('machine_learning','intermediate',6, 'GAP1: The Stata 16+ command for L1-regularized regression shares its name with the statistical method. GAP2: A common number of cross-validation folds between 3 and 10.');
  h('machine_learning','intermediate',7, 'L1 (Lasso) creates sparse models by pushing some coefficients to exactly zero. L2 (Ridge) shrinks all coefficients but keeps them all nonzero. Think about what controls the tradeoff.');

  // ================================================================
  //  MACHINE LEARNING — ADVANCED
  // ================================================================
  h('machine_learning','advanced',0, 'Double ML uses two separate ML models as nuisance learners: one predicts the outcome from controls, the other predicts the treatment from controls. Think about why both are needed to debias the estimate.');
  h('machine_learning','advanced',1, 'A standard random forest predicts E[Y|X]. A <b>causal</b> forest estimates how the treatment effect varies by individual characteristics: E[Y(1) - Y(0) | X]. These are fundamentally different targets.');
  h('machine_learning','advanced',2, 'Compare the scales: income is in dollars (mean ~50000) while education is in years (mean ~14). How does this affect coefficient magnitudes and how the Lasso penalty treats each one?');
  h('machine_learning','advanced',3, 'The random forest identifies that education is a strong <b>predictor</b> of wages. But does predictive importance imply causation? Could unobserved factors explain both education and wages?');
  h('machine_learning','advanced',4, 'The double-selection approach uses Lasso twice: once for the outcome and once for the treatment. The final estimator (<code>dsregress</code>) combines both. Both Lasso steps must precede it.');
  h('machine_learning','advanced',5, 'Cross-validation for lambda selection uses only training data. The test set evaluation should happen exactly once, at the very end, to provide an honest performance estimate.');
  h('machine_learning','advanced',6, 'GAP1: The R package for Generalized Random Forests is a 3-letter abbreviation. GAP2: The treatment variable — look at the context (wage as outcome, effect of a program).');
  h('machine_learning','advanced',7, 'Prediction methods answer "what will happen?" while causal methods answer "what is the effect of an intervention?" Causal forests add "for whom is the effect strongest?"');

})();
