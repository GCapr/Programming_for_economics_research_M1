// Practice Lab — Exercise-to-Course-Section Reference Mapping
// Maps each exercise (by topic, level, index) to the relevant course page and skill.
(function () {
  'use strict';

  /* helper — keeps entries compact */
  function r(page, anchor, skill) {
    return { page: page, anchor: anchor, skill: skill };
  }

  window.PRACTICE_REFERENCES = {

    // ── TOPIC 1: SYNTAX & BASICS ──────────────────────────────────────
    syntax: {
      beginner: [
        r("01-getting-started.html", "packages",          "Understand import aliases in Python"),
        r("01-getting-started.html", "basic-syntax",       "Distinguish assignment (<-) from comparison (==) in R"),
        r("01-getting-started.html", "basic-syntax",       "Perform arithmetic with stored variables in R"),
        r("01-getting-started.html", "syntax-patterns",    "Quote string values correctly in Stata"),
        r("01-getting-started.html", "syntax-patterns",    "Use local macro expansion in Stata"),
        r("01-getting-started.html", "basic-syntax",       "Compare assignment syntax across Python, R, and Stata"),
        r("01-getting-started.html", "keyword-args",       "Use keyword arguments in function calls"),
        r("01-getting-started.html", "first-script",       "Order steps in an R script workflow")
      ],
      intermediate: [
        r("01-getting-started.html", "dot-accessor",       "Chain methods on DataFrames with groupby"),
        r("01-getting-started.html", "syntax-patterns",    "Use paste() and round() for string formatting in R"),
        r("01-getting-started.html", "basic-syntax",       "Distinguish = (assignment) from == (comparison) in filters"),
        r("01-getting-started.html", "syntax-patterns",    "Debug Stata macro reference syntax (backtick-apostrophe)"),
        r("01-getting-started.html", "dot-accessor",       "Use the pipe operator (%>%) in R"),
        r("01-getting-started.html", "first-script",       "Order a Stata data exploration workflow"),
        r("01-getting-started.html", "packages",           "Install and load packages in Stata with ssc"),
        r("01-getting-started.html", "basic-syntax",       "Compare equivalent operations across Python and Stata")
      ],
      advanced: [
        r("01-getting-started.html", "nested-functions",    "Read nested function calls (inside-out evaluation)"),
        r("01-getting-started.html", "functions-scope",     "Understand variable scope in Python functions"),
        r("01-getting-started.html", "indexing-differences", "Handle 0-based vs 1-based indexing across languages"),
        r("01-getting-started.html", "syntax-patterns",     "Use Stata collapse prefix syntax correctly"),
        r("01-getting-started.html", "first-script",        "Build a multi-step Stata analysis workflow"),
        r("01-getting-started.html", "dot-accessor",        "Build complex R pipe chains with multiple steps"),
        r("01-getting-started.html", "for-loops",           "Write for loops across Python, Stata, and R"),
        r("01-getting-started.html", "indexing-differences", "Compare the modulo operator (%%) across languages")
      ]
    },

    // ── TOPIC 2: DATA IMPORT ──────────────────────────────────────────
    data_import: {
      beginner: [
        r("02a-file-import.html", "",              "Read CSV files with pd.read_csv() in Python"),
        r("02a-file-import.html", "",              "Import delimited data and describe variables in Stata"),
        r("02a-file-import.html", "",              "Import and preview data with glimpse() in R"),
        r("02a-file-import.html", "",              "Fix Windows file path escape character errors"),
        r("02a-file-import.html", "",              "Read Excel files with sheet_name in Python"),
        r("02a-file-import.html", "",              "Build a basic data import pipeline in Stata"),
        r("02a-file-import.html", "",              "Compare file reading functions across languages"),
        r("02a-file-import.html", "",              "Handle file encoding errors with European data")
      ],
      intermediate: [
        r("02a-file-import.html", "",              "Understand left join behavior with unmatched rows"),
        r("02a-file-import.html", "",              "Use Stata 1:m merge specification for panel data"),
        r("02a-file-import.html", "",              "Debug case-sensitive merge key mismatches"),
        r("02b-apis.html",        "",              "Import data from a URL in Stata"),
        r("02b-apis.html",        "",              "Build an API-to-DataFrame pipeline in Python"),
        r("02a-file-import.html", "",              "Perform left joins with dplyr in R"),
        r("02a-file-import.html", "",              "Compare merge operations across Python and Stata"),
        r("02b-apis.html",        "",              "Navigate nested JSON from APIs in R")
      ],
      advanced: [
        r("02a-file-import.html",  "",              "Reshape data from wide to long with melt()"),
        r("02a-file-import.html",  "",              "Use Stata reshape long for panel data"),
        r("02a-file-import.html",  "",              "Include all key variables in Stata merge commands"),
        r("02c-web-scraping.html", "basic-scraping", "Handle JavaScript-rendered content in web scraping"),
        r("02c-web-scraping.html", "basic-scraping", "Build a complete web scraping pipeline"),
        r("02a-file-import.html",  "",              "Use pivot_longer() for reshaping in R"),
        r("02a-file-import.html",  "",              "Compare reshape operations across languages"),
        r("08-replicability.html", "",              "Use portable file paths with file.path() in R")
      ]
    },

    // ── TOPIC 3: DATA EXPLORATION ─────────────────────────────────────
    data_exploration: {
      beginner: [
        r("03-data-exploration.html", "", "Read and interpret .describe() output in Python"),
        r("03-data-exploration.html", "", "Use summarize with the detail option in Stata"),
        r("03-data-exploration.html", "", "Count missing values per column with .isnull().sum()"),
        r("03-data-exploration.html", "", "Use na.rm = TRUE with R mean() to handle missing data"),
        r("03-data-exploration.html", "", "Create frequency tables with dplyr count()"),
        r("03-data-exploration.html", "", "Order data exploration steps in a logical workflow"),
        r("03-data-exploration.html", "", "Compare exploration commands across languages"),
        r("03-data-exploration.html", "", "Use bysort prefix for grouped commands in Stata")
      ],
      intermediate: [
        r("03-data-exploration.html", "", "Compute multiple aggregations with .agg()"),
        r("03-data-exploration.html", "", "Understand Boolean indexing mechanics in pandas"),
        r("03-data-exploration.html", "", "Detect string columns that silently break numeric aggregations"),
        r("03-data-exploration.html", "", "Fix incomplete Boolean logic in R filter()"),
        r("03-data-exploration.html", "", "Build filter-group-summarize pipelines in dplyr"),
        r("03-data-exploration.html", "", "Create cross-tabulations in Stata"),
        r("05-data-analysis.html",   "correlation", "Compute correlation matrices in Stata"),
        r("03-data-exploration.html", "", "Compare grouped summary operations across languages")
      ],
      advanced: [
        r("03-data-exploration.html", "", "Chain query(), groupby(), and agg() in pandas"),
        r("03-data-exploration.html", "", "Navigate multi-index groupby results"),
        r("03-data-exploration.html", "", "Use the & operator for AND logic in Stata"),
        r("03-data-exploration.html", "", "Debug wrong column types caused by commas in numbers"),
        r("03-data-exploration.html", "", "Build a complete Stata exploration workflow"),
        r("03-data-exploration.html", "", "Compute multiple grouped summaries with sd in R"),
        r("03-data-exploration.html", "", "Compare advanced exploration operations across languages"),
        r("03-data-exploration.html", "", "Structure a principled data exploration workflow")
      ]
    },

    // ── TOPIC 4: DATA CLEANING ────────────────────────────────────────
    data_cleaning: {
      beginner: [
        r("04-data-cleaning.html", "missing-data", "Use dropna() with subset parameter for targeted removal"),
        r("04-data-cleaning.html", "validation",   "Convert strings to numbers with destring in Stata"),
        r("04-data-cleaning.html", "missing-data", "Reassign after subsetting to persist changes in R"),
        r("04-data-cleaning.html", "strings",      "Handle implicit type coercion with string functions on numeric data"),
        r("04-data-cleaning.html", "missing-data", "Order cleaning steps: drop missing before type conversion"),
        r("04-data-cleaning.html", "missing-data", "Order Stata cleaning: destring before numeric operations"),
        r("04-data-cleaning.html", "missing-data", "Impute missing values with column means using fillna()"),
        r("04-data-cleaning.html", "missing-data", "Compare core cleaning operations across languages")
      ],
      intermediate: [
        r("04-data-cleaning.html", "strings",      "Chain string cleaning methods: strip, lower, replace"),
        r("04-data-cleaning.html", "outliers",     "Use case_when() for conditional recoding in R"),
        r("04-data-cleaning.html", "strings",      "Use regex=True with str.replace for pattern matching"),
        r("04-data-cleaning.html", "missing-data", "Avoid dropping too many rows with missing() on multiple variables"),
        r("04-data-cleaning.html", "missing-data", "Create missing indicators before imputation"),
        r("04-data-cleaning.html", "outliers",     "Deduplicate before computing quantile bounds in R"),
        r("04-data-cleaning.html", "outliers",     "Use replace...if for conditional assignment in Stata"),
        r("04-data-cleaning.html", "missing-data", "Compare cleaning operations: Python vs R")
      ],
      advanced: [
        r("04-data-cleaning.html", "outliers",     "Handle boundary conditions in np.where (zero is not positive)"),
        r("04-data-cleaning.html", "validation",   "Interpret Stata merge diagnostics (_merge)"),
        r("04-data-cleaning.html", "missing-data", "Understand how mean imputation reduces variance"),
        r("04-data-cleaning.html", "strings",      "Detect silent coercion when cleaning numeric columns as strings"),
        r("04-data-cleaning.html", "case-study",   "Build a full cleaning pipeline: dedup, indicator, quantiles, impute, clip"),
        r("04-data-cleaning.html", "validation",   "Follow the Stata merge workflow: merge, inspect, filter, drop _merge"),
        r("04-data-cleaning.html", "outliers",     "Winsorize outliers with pmin/pmax in R"),
        r("04-data-cleaning.html", "validation",   "Compare data quality diagnostics across languages")
      ]
    },

    // ── TOPIC 5: DATA ANALYSIS ────────────────────────────────────────
    data_analysis: {
      beginner: [
        r("05-data-analysis.html", "regression",     "Specify robust standard errors with cov_type='HC1'"),
        r("05-data-analysis.html", "regression",     "Interpret Stata reg command with i. prefix and robust option"),
        r("05-data-analysis.html", "regression",     "Recognize that default classical SEs may be unreliable"),
        r("05-data-analysis.html", "regression",     "Distinguish * (main effects + interaction) from : (interaction only) in R formulas"),
        r("05-data-analysis.html", "regression",     "Order OLS estimation steps: import, define, fit, display"),
        r("05-data-analysis.html", "summary-tables", "Estimate models and export comparison tables in R"),
        r("05-data-analysis.html", "regression",     "Cluster standard errors with cluster() in Stata"),
        r("05-data-analysis.html", "regression",     "Compare regression commands across languages")
      ],
      intermediate: [
        r("05-data-analysis.html", "regression",     "Use cov_type='cluster' with cov_kwds for clustered SEs in Python"),
        r("05-data-analysis.html", "regression",     "Use feols syntax for two-way fixed effects in R"),
        r("05-data-analysis.html", "regression",     "Interpret logit coefficients as log-odds, not probabilities"),
        r("05-data-analysis.html", "regression",     "Avoid controlling for post-treatment variables"),
        r("05-data-analysis.html", "regression",     "Compute logit marginal effects in R"),
        r("05-data-analysis.html", "regression",     "Declare panel structure with xtset before xtreg in Stata"),
        r("05-data-analysis.html", "regression",     "Use * shorthand for interaction with main effects in R"),
        r("05-data-analysis.html", "regression",     "Interpret key regression output statistics")
      ],
      advanced: [
        r("05-data-analysis.html", "regression",     "Understand : creates only the interaction, not main effects"),
        r("05-data-analysis.html", "summary-tables", "Use esttab keep() to control displayed coefficients"),
        r("05-data-analysis.html", "regression",     "Recognize HC1 is insufficient for panel data: need clustered SEs"),
        r("07-estimation.html",    "bootstrap",      "Handle bootstrap resamples that drop factor levels"),
        r("07-estimation.html",    "bootstrap",      "Implement bootstrap SE: resample, estimate, store, compute SD"),
        r("05-data-analysis.html", "summary-tables", "Build models step by step with eststo in Stata"),
        r("05-data-analysis.html", "summary-tables", "Create regression tables with Stargazer in Python/R"),
        r("05-data-analysis.html", "regression",     "Compare estimation diagnostics across languages")
      ]
    },

    // ── TOPIC 6: CAUSAL INFERENCE ─────────────────────────────────────
    causal_inference: {
      beginner: [
        r("06b-did.html",              "classic",    "Identify the DiD interaction coefficient as the treatment effect"),
        r("06a-matching.html",         "psm",        "Understand what matchit() does for propensity score matching"),
        r("06b-did.html",              "classic",    "Use cluster() instead of robust for DiD panel data"),
        r("06d-iv.html",               "weak",       "Diagnose weak instruments using first-stage F-statistic"),
        r("06b-did.html",              "classic",    "Set up a DiD regression: load, create post, create interaction, estimate"),
        r("06c-rdd.html",              "sharp",      "Follow the RDD workflow: load package, bandwidth, estimate, display"),
        r("06d-iv.html",               "2sls",       "Write the Stata IV syntax: (endogenous = instrument)"),
        r("06-causal-inference.html",  "",           "Match causal methods to their core identifying assumptions")
      ],
      intermediate: [
        r("06b-did.html",              "twfe",        "Understand what the treated coefficient identifies in TWFE"),
        r("06b-did.html",              "event-study", "Use ref = -1 as the standard event study reference period"),
        r("06a-matching.html",         "diagnostics", "Avoid matching on post-treatment variables"),
        r("06c-rdd.html",              "bandwidth",   "Recognize global polynomial RDD is driven by distant observations"),
        r("06b-did.html",              "event-study", "Compute rel_time, estimate, and plot event studies in R"),
        r("06d-iv.html",               "diagnostics", "Follow IV workflow: estimate, check strength, test endogeneity"),
        r("06c-rdd.html",              "sharp",       "Use rdrobust with the c= cutoff parameter"),
        r("06-causal-inference.html",  "",            "Compare causal inference implementations across languages")
      ],
      advanced: [
        r("06e-synthetic-control.html", "basic",       "Understand synthetic control optimal donor weighting"),
        r("06d-iv.html",                "diagnostics", "Interpret overidentification test p-values for IV validity"),
        r("06b-did.html",               "event-study", "Choose ref = -1, not ref = 0, for interpretable pre-trends"),
        r("06c-rdd.html",               "bandwidth",   "Test RDD robustness across alternative bandwidths (h/2, h, 2h)"),
        r("06e-synthetic-control.html", "basic",       "Implement synthetic control: import, load, fit, plot, placebo"),
        r("06a-matching.html",          "diagnostics", "Check covariate balance after propensity score matching"),
        r("06b-did.html",               "event-study", "Estimate event studies with i(rel_time, ref=-1) in fixest"),
        r("06-causal-inference.html",   "",            "Match causal methods to their signature robustness tests")
      ]
    },

    // ── TOPIC 7: ESTIMATION ───────────────────────────────────────────
    estimation: {
      beginner: [
        r("07-estimation.html", "standard-errors", "Understand that HC1 changes SEs but not coefficient estimates"),
        r("07-estimation.html", "standard-errors", "Use the robust option in Stata for heteroskedasticity-robust SEs"),
        r("07-estimation.html", "standard-errors", "Detect heteroskedasticity and apply robust SEs in R"),
        r("07-estimation.html", "nonlinear",       "Interpret logit coefficients as log-odds, not probability changes"),
        r("07-estimation.html", "standard-errors", "Order steps for robust SEs in R: load packages, fit, coeftest"),
        r("07-estimation.html", "standard-errors", "Compare classical vs robust SEs side by side in Stata"),
        r("07-estimation.html", "standard-errors", "Request robust SEs with cov_type='HC1' in Python"),
        r("07-estimation.html", "standard-errors", "Compare robust SE commands across Python, Stata, and R")
      ],
      intermediate: [
        r("07-estimation.html", "standard-errors", "Cluster standard errors for within-group correlation"),
        r("07-estimation.html", "panel",           "Understand fixed effects absorb time-invariant variables"),
        r("07-estimation.html", "standard-errors", "Handle inference with too few clusters (< 30)"),
        r("07-estimation.html", "nonlinear",       "Compute logit marginal effects with margins() in R"),
        r("07-estimation.html", "bootstrap",       "Implement bootstrap standard errors in Python"),
        r("07-estimation.html", "panel",           "Combine fixed effects with clustered SEs in R using fixest"),
        r("07-estimation.html", "nonlinear",       "Estimate logit with marginal effects in Stata"),
        r("07-estimation.html", "panel",           "Compare panel FE specifications across languages")
      ],
      advanced: [
        r("07-estimation.html", "standard-errors", "Compute two-way clustered standard errors in R"),
        r("07-estimation.html", "bootstrap",       "Use wild cluster bootstrap for few-cluster inference"),
        r("07-estimation.html", "bootstrap",       "Resample entire clusters in block bootstrap, not individual observations"),
        r("07-estimation.html", "standard-errors", "Detect misleading comparisons using mixed SE types"),
        r("07-estimation.html", "panel",           "Estimate two-way FE with clustered SEs in Python"),
        r("07-estimation.html", "bootstrap",       "Set seeds for reproducible bootstrap in Stata"),
        r("07-estimation.html", "panel",           "Use feols for two-way fixed effects with clustering in R"),
        r("07-estimation.html", "standard-errors", "Match SE methods to appropriate use cases")
      ]
    },

    // ── TOPIC 8: REPLICABILITY & GIT ──────────────────────────────────
    replicability: {
      beginner: [
        r("08-replicability.html", "",              "Create a master script with a single ROOT path for portability"),
        r("08-replicability.html", "",              "Use here() for portable project-relative paths in R"),
        r("08-replicability.html", "",              "Use relative paths instead of absolute paths in shared code"),
        r("08-replicability.html", "",              "Protect raw data by saving cleaned data to a separate folder"),
        r("08-replicability.html", "",              "Set up a reproducible R project folder structure"),
        r("08-replicability.html", "",              "Number scripts for clear execution order"),
        r("09-github.html",        "staging-area",  "Write .gitignore files to exclude data and secrets"),
        r("09-github.html",        "key-concepts",  "Understand core Git concepts: working directory, staging, commits")
      ],
      intermediate: [
        r("08-replicability.html", "",              "Use log files to capture all Stata output for reproducibility"),
        r("08-replicability.html", "",              "Pin package versions with renv for reproducible R environments"),
        r("08-replicability.html", "",              "Replace hardcoded paths with configurable ROOT variables"),
        r("08-replicability.html", "",              "Automate result reporting instead of manual copy-paste"),
        r("08-replicability.html", "",              "Automate table export with etable() in R"),
        r("08-replicability.html", "",              "Automate table export with Stargazer in Python"),
        r("08-replicability.html", "",              "Set seeds for reproducible random sampling"),
        r("08-replicability.html", "",              "Apply replicability best practices: paths, numbering, export, data separation")
      ],
      advanced: [
        r("08-replicability.html", "",              "Pin exact package versions with requirements.txt and venv"),
        r("08-replicability.html", "",              "Manage paths portably with Stata global macros"),
        r("08-replicability.html", "",              "Replace non-portable absolute paths with here() in R"),
        r("08-replicability.html", "",              "Debug broken pipeline dependencies from commented-out scripts"),
        r("08-replicability.html", "",              "Build a reproducible master pipeline in Python"),
        r("08-replicability.html", "",              "Write a full reproducible master script in Stata with logging"),
        r("08-replicability.html", "",              "Create portable R scripts with the here package"),
        r("09-github.html",        "git-workflow",  "Apply Git workflow practices to research collaboration")
      ]
    },

    // ── TOPIC 9: MACHINE LEARNING ─────────────────────────────────────
    machine_learning: {
      beginner: [
        r("11e-model-evaluation.html", "train-test-split",  "Split data into training and test sets with random_state"),
        r("11e-model-evaluation.html", "train-test-split",  "Implement train-test split in Stata with runiform()"),
        r("11e-model-evaluation.html", "train-test-split",  "Use set.seed() for reproducible splits in R"),
        r("11e-model-evaluation.html", "pitfalls",          "Avoid misleading accuracy on imbalanced data"),
        r("11-machine-learning.html",  "supervised-unsupervised", "Build a basic ML pipeline: split, create, fit, evaluate"),
        r("11e-model-evaluation.html", "train-test-split",  "Implement train-test split and evaluation in R"),
        r("11a-regularization.html",   "lasso",             "Fit a Lasso regression with sklearn"),
        r("11e-model-evaluation.html", "regression-metrics", "Match ML evaluation metrics to what they measure")
      ],
      intermediate: [
        r("11a-regularization.html",   "intuition",            "Scale features before regularization in Stata"),
        r("11b-trees.html",            "random-forests",       "Tune random forest hyperparameters (num.trees, mtry) in R"),
        r("11e-model-evaluation.html", "pitfalls",             "Prevent data leakage by fitting scaler on training data only"),
        r("11e-model-evaluation.html", "pitfalls",             "Avoid tuning hyperparameters on the test set"),
        r("11e-model-evaluation.html", "hyperparameter-tuning", "Use cross-validation for Lasso lambda selection in Stata"),
        r("11a-regularization.html",   "intuition",            "Build correct scaling pipelines without data leakage"),
        r("11a-regularization.html",   "lambda-selection",     "Use Lasso for feature selection in Stata"),
        r("11a-regularization.html",   "comparison",           "Compare regularization methods: Lasso vs Ridge")
      ],
      advanced: [
        r("11d-causal-ml.html",        "dml",             "Implement double/debiased machine learning"),
        r("11d-causal-ml.html",        "causal-forests",  "Estimate heterogeneous treatment effects with causal forests"),
        r("11a-regularization.html",   "lasso",           "Debug unscaled Lasso that drops important features"),
        r("11-machine-learning.html",  "prediction-vs-causation", "Distinguish prediction from causal interpretation"),
        r("11d-causal-ml.html",        "dml",             "Use Lasso for double-selection treatment effect estimation in Stata"),
        r("11a-regularization.html",   "lasso",           "Build a complete Lasso pipeline with CV in R"),
        r("11d-causal-ml.html",        "causal-forests",  "Implement causal forests with grf in R"),
        r("11d-causal-ml.html",        "why-causal-ml",   "Compare prediction ML with causal ML methods")
      ]
    }
  };

  // ── Friendly module names for display ────────────────────────────────
  window.PRACTICE_MODULE_NAMES = {
    "01-getting-started.html":    "Module 1: Getting Started",
    "02-data-harnessing.html":    "Module 2: Data Harnessing",
    "02a-file-import.html":       "Module 2a: File Import",
    "02b-apis.html":              "Module 2b: APIs",
    "02c-web-scraping.html":      "Module 2c: Web Scraping",
    "03-data-exploration.html":   "Module 3: Data Exploration",
    "04-data-cleaning.html":      "Module 4: Data Cleaning",
    "05-data-analysis.html":      "Module 5: Data Analysis",
    "06-causal-inference.html":   "Module 6: Causal Inference",
    "06a-matching.html":          "Module 6a: Matching",
    "06b-did.html":               "Module 6b: Difference-in-Differences",
    "06c-rdd.html":               "Module 6c: Regression Discontinuity",
    "06d-iv.html":                "Module 6d: Instrumental Variables",
    "06e-synthetic-control.html": "Module 6e: Synthetic Control",
    "07-estimation.html":         "Module 7: Estimation",
    "08-replicability.html":      "Module 8: Replicability",
    "09-github.html":             "Module 9: GitHub",
    "11-machine-learning.html":   "Module 11: Machine Learning",
    "11a-regularization.html":    "Module 11a: Regularization",
    "11b-trees.html":             "Module 11b: Trees",
    "11c-neural-networks.html":   "Module 11c: Neural Networks",
    "11d-causal-ml.html":         "Module 11d: Causal ML",
    "11e-model-evaluation.html":  "Module 11e: Model Evaluation"
  };
})();
