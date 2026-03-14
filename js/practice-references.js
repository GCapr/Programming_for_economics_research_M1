// Practice Lab — Exercise-to-Course-Section Reference Mapping
// Maps each exercise (by topic, level, index) to the relevant course page and skill.
(function () {
  'use strict';

  window.PRACTICE_REFERENCES = {

    // ── TOPIC 1: SYNTAX & BASICS ──────────────────────────────────────
    syntax: {
      beginner: [
        { page: "01-getting-started.html", anchor: "packages",      skill: "Import and alias libraries in Python" },
        { page: "01-getting-started.html", anchor: "basic-syntax",   skill: "Distinguish assignment (=) from comparison (==)" },
        { page: "01-getting-started.html", anchor: "basic-syntax",   skill: "Use the <- assignment operator in R" },
        { page: "01-getting-started.html", anchor: "basic-syntax",   skill: "Quote string values correctly" },
        { page: "01-getting-started.html", anchor: "syntax-patterns", skill: "Use local macros in Stata" },
        { page: "01-getting-started.html", anchor: "basic-syntax",   skill: "Compare assignment syntax across Python, R, and Stata" },
        { page: "01-getting-started.html", anchor: "keyword-args",   skill: "Use keyword arguments in function calls" },
        { page: "01-getting-started.html", anchor: "dot-accessor",   skill: "Use the dot accessor to call methods" }
      ],
      intermediate: [
        { page: "01-getting-started.html", anchor: "dot-accessor",    skill: "Chain methods on DataFrames" },
        { page: "01-getting-started.html", anchor: "syntax-patterns", skill: "Read and use f-strings in Python" },
        { page: "01-getting-started.html", anchor: "syntax-patterns", skill: "Use comparison operators in data filters" },
        { page: "01-getting-started.html", anchor: "syntax-patterns", skill: "Reference local macros in Stata" },
        { page: "01-getting-started.html", anchor: "dot-accessor",    skill: "Use the pipe operator in R" },
        { page: "01-getting-started.html", anchor: "first-script",    skill: "Build a multi-step Stata workflow" },
        { page: "01-getting-started.html", anchor: "packages",        skill: "Install and load packages in Stata" },
        { page: "01-getting-started.html", anchor: "basic-syntax",    skill: "Compare equivalent operations across languages" }
      ],
      advanced: [
        { page: "01-getting-started.html", anchor: "nested-functions",    skill: "Read nested function calls" },
        { page: "01-getting-started.html", anchor: "functions-scope",     skill: "Understand variable scope in functions" },
        { page: "01-getting-started.html", anchor: "indexing-differences", skill: "Handle 0-based vs 1-based indexing" },
        { page: "01-getting-started.html", anchor: "dot-accessor",        skill: "Avoid common method chaining mistakes" },
        { page: "01-getting-started.html", anchor: "first-script",        skill: "Read a multi-step Python script" },
        { page: "01-getting-started.html", anchor: "dot-accessor",        skill: "Build complex R pipe chains" },
        { page: "01-getting-started.html", anchor: "for-loops",           skill: "Write for loops across languages" },
        { page: "01-getting-started.html", anchor: "indexing-differences", skill: "Handle integer division differences" }
      ]
    },

    // ── TOPIC 2: DATA IMPORT ──────────────────────────────────────────
    data_import: {
      beginner: [
        { page: "02a-file-import.html", anchor: "",          skill: "Read CSV files with pd.read_csv()" },
        { page: "02a-file-import.html", anchor: "",          skill: "Import data files in Stata" },
        { page: "02a-file-import.html", anchor: "",          skill: "Import and preview data in R" },
        { page: "02a-file-import.html", anchor: "",          skill: "Fix file path errors" },
        { page: "02a-file-import.html", anchor: "",          skill: "Read Excel files in Python" },
        { page: "02a-file-import.html", anchor: "",          skill: "Build a basic data pipeline in Stata" },
        { page: "02a-file-import.html", anchor: "",          skill: "Compare file reading across languages" },
        { page: "02a-file-import.html", anchor: "",          skill: "Handle file encoding issues" }
      ],
      intermediate: [
        { page: "02a-file-import.html", anchor: "",          skill: "Perform left joins with pandas merge()" },
        { page: "02a-file-import.html", anchor: "",          skill: "Use Stata merge command" },
        { page: "02a-file-import.html", anchor: "",          skill: "Debug merge key mismatches" },
        { page: "02b-apis.html",        anchor: "",          skill: "Fetch data from APIs" },
        { page: "02b-apis.html",        anchor: "",          skill: "Convert API responses to DataFrames" },
        { page: "02a-file-import.html", anchor: "",          skill: "Perform joins in R with dplyr" },
        { page: "02a-file-import.html", anchor: "",          skill: "Compare merge operations across languages" },
        { page: "02b-apis.html",        anchor: "",          skill: "Navigate JSON data structures" }
      ],
      advanced: [
        { page: "02a-file-import.html",  anchor: "",              skill: "Reshape data from wide to long format" },
        { page: "02a-file-import.html",  anchor: "",              skill: "Use Stata reshape command" },
        { page: "02a-file-import.html",  anchor: "",              skill: "Choose correct merge type for panel data" },
        { page: "02c-web-scraping.html", anchor: "basic-scraping", skill: "Debug web scraping selectors" },
        { page: "02c-web-scraping.html", anchor: "basic-scraping", skill: "Build a web scraping pipeline" },
        { page: "02a-file-import.html",  anchor: "",              skill: "Use pivot_longer() in R" },
        { page: "02a-file-import.html",  anchor: "",              skill: "Compare reshape operations across languages" },
        { page: "08-replicability.html", anchor: "",              skill: "Use portable file paths with os.path.join" }
      ]
    },

    // ── TOPIC 3: DATA EXPLORATION ─────────────────────────────────────
    data_exploration: {
      beginner: [
        { page: "03-data-exploration.html", anchor: "", skill: "Use describe() for summary statistics" },
        { page: "03-data-exploration.html", anchor: "", skill: "Get summary statistics in Stata" },
        { page: "03-data-exploration.html", anchor: "", skill: "Identify missing values in data" },
        { page: "03-data-exploration.html", anchor: "", skill: "Handle missing values in R summaries" },
        { page: "03-data-exploration.html", anchor: "", skill: "Create frequency tables in Python" },
        { page: "03-data-exploration.html", anchor: "", skill: "Build a data exploration workflow" },
        { page: "03-data-exploration.html", anchor: "", skill: "Compare exploration commands across languages" },
        { page: "03-data-exploration.html", anchor: "", skill: "Use bysort for grouped operations in Stata" }
      ],
      intermediate: [
        { page: "03-data-exploration.html",  anchor: "",            skill: "Aggregate data with groupby" },
        { page: "03-data-exploration.html",  anchor: "",            skill: "Filter data with boolean conditions" },
        { page: "03-data-exploration.html",  anchor: "",            skill: "Avoid aggregating wrong column types" },
        { page: "03-data-exploration.html",  anchor: "",            skill: "Debug filter logic in R" },
        { page: "03-data-exploration.html",  anchor: "",            skill: "Build filter-group-summarize pipelines" },
        { page: "03-data-exploration.html",  anchor: "",            skill: "Create cross-tabulations in Stata" },
        { page: "05-data-analysis.html",     anchor: "correlation", skill: "Compute correlation matrices" },
        { page: "03-data-exploration.html",  anchor: "",            skill: "Compare summary statistics across languages" }
      ],
      advanced: [
        { page: "03-data-exploration.html", anchor: "", skill: "Chain exploration operations" },
        { page: "03-data-exploration.html", anchor: "", skill: "Handle multi-index groupby results" },
        { page: "03-data-exploration.html", anchor: "", skill: "Debug chained boolean filters" },
        { page: "03-data-exploration.html", anchor: "", skill: "Use describe() include parameter correctly" },
        { page: "03-data-exploration.html", anchor: "", skill: "Write a complete exploration script" },
        { page: "03-data-exploration.html", anchor: "", skill: "Compute multiple grouped summaries in R" },
        { page: "03-data-exploration.html", anchor: "", skill: "Compare advanced exploration across languages" },
        { page: "03-data-exploration.html", anchor: "", skill: "Structure a cohesive data exploration" }
      ]
    },

    // ── TOPIC 4: DATA CLEANING ────────────────────────────────────────
    data_cleaning: {
      beginner: [
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Use dropna() with subset parameter" },
        { page: "04-data-cleaning.html", anchor: "validation",   skill: "Convert data types in Stata with destring" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Debug persistent missing values" },
        { page: "04-data-cleaning.html", anchor: "strings",      skill: "Apply string methods to correct column types" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Order cleaning operations correctly" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Order Stata cleaning steps" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Impute missing values with column means" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Compare cleaning operations across languages" }
      ],
      intermediate: [
        { page: "04-data-cleaning.html", anchor: "strings",      skill: "Chain string cleaning in pandas" },
        { page: "04-data-cleaning.html", anchor: "outliers",     skill: "Use case_when() for conditional assignment in R" },
        { page: "04-data-cleaning.html", anchor: "strings",      skill: "Debug regular expressions" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Diagnose over-aggressive data dropping" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Create missing indicators during imputation" },
        { page: "04-data-cleaning.html", anchor: "outliers",     skill: "Remove duplicates and winsorize in R" },
        { page: "04-data-cleaning.html", anchor: "outliers",     skill: "Use .loc for conditional assignment in pandas" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Compare cleaning operations: Python vs R" }
      ],
      advanced: [
        { page: "04-data-cleaning.html", anchor: "outliers",    skill: "Use np.where() for conditional replacement" },
        { page: "04-data-cleaning.html", anchor: "validation",  skill: "Run merge diagnostics in Stata" },
        { page: "04-data-cleaning.html", anchor: "missing-data", skill: "Understand imputation trade-offs" },
        { page: "04-data-cleaning.html", anchor: "strings",     skill: "Convert types before string cleaning" },
        { page: "04-data-cleaning.html", anchor: "case-study",  skill: "Build a complete cleaning pipeline" },
        { page: "04-data-cleaning.html", anchor: "validation",  skill: "Combine Stata cleaning with merge checks" },
        { page: "04-data-cleaning.html", anchor: "outliers",    skill: "Winsorize outliers programmatically" },
        { page: "04-data-cleaning.html", anchor: "validation",  skill: "Compare data quality checks across languages" }
      ]
    },

    // ── TOPIC 5: DATA ANALYSIS ────────────────────────────────────────
    data_analysis: {
      beginner: [
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Run OLS with robust standard errors" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Interpret Stata regression output" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Avoid overconfident statistical inference" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Write interaction terms correctly" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Order OLS estimation steps" },
        { page: "05-data-analysis.html", anchor: "summary-tables", skill: "Export regression results in Stata" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Cluster standard errors in Stata" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Compare regression commands across languages" }
      ],
      intermediate: [
        { page: "05-data-analysis.html", anchor: "regression", skill: "Cluster standard errors in Python" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Estimate two-way fixed effects in R" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Interpret logit coefficients correctly" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Avoid post-treatment bias" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Estimate logit marginal effects in R" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Run panel data regressions in Python" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Use interaction terms in R formulas" },
        { page: "05-data-analysis.html", anchor: "regression", skill: "Read and interpret estimation output" }
      ],
      advanced: [
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Distinguish * from : in formula syntax" },
        { page: "05-data-analysis.html", anchor: "summary-tables", skill: "Export regression tables with esttab" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Apply cluster corrections to standard errors" },
        { page: "07-estimation.html",    anchor: "bootstrap",      skill: "Compute bootstrap standard errors" },
        { page: "07-estimation.html",    anchor: "bootstrap",      skill: "Implement bootstrap SE computation" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Build models step by step in Stata" },
        { page: "05-data-analysis.html", anchor: "summary-tables", skill: "Create regression tables with stargazer in R" },
        { page: "05-data-analysis.html", anchor: "regression",     skill: "Compare diagnostic commands across languages" }
      ]
    },

    // ── TOPIC 6: CAUSAL INFERENCE ─────────────────────────────────────
    causal_inference: {
      beginner: [
        { page: "06b-did.html",              anchor: "classic",    skill: "Identify the key DiD coefficient" },
        { page: "06a-matching.html",         anchor: "psm",       skill: "Implement propensity score matching in R" },
        { page: "06b-did.html",              anchor: "classic",    skill: "Fix DiD standard error issues" },
        { page: "06d-iv.html",               anchor: "weak",      skill: "Diagnose weak instruments" },
        { page: "06b-did.html",              anchor: "classic",    skill: "Set up a DiD regression" },
        { page: "06c-rdd.html",              anchor: "sharp",     skill: "Run an RDD analysis in R" },
        { page: "06d-iv.html",               anchor: "2sls",      skill: "Estimate 2SLS in Stata" },
        { page: "06-causal-inference.html",  anchor: "",          skill: "Match causal methods to their key assumptions" }
      ],
      intermediate: [
        { page: "06b-did.html",              anchor: "twfe",        skill: "Estimate two-way FE for DiD" },
        { page: "06b-did.html",              anchor: "event-study", skill: "Specify event study models" },
        { page: "06a-matching.html",         anchor: "diagnostics", skill: "Avoid matching on post-treatment variables" },
        { page: "06c-rdd.html",              anchor: "bandwidth",   skill: "Choose bandwidth for RDD" },
        { page: "06b-did.html",              anchor: "event-study", skill: "Create DiD event study plots" },
        { page: "06d-iv.html",               anchor: "diagnostics", skill: "Run IV diagnostics in Stata" },
        { page: "06c-rdd.html",              anchor: "sharp",       skill: "Use rdrobust for RDD in Python" },
        { page: "06-causal-inference.html",  anchor: "",            skill: "Compare causal inference commands across languages" }
      ],
      advanced: [
        { page: "06e-synthetic-control.html", anchor: "basic",       skill: "Interpret synthetic control donor weights" },
        { page: "06d-iv.html",                anchor: "diagnostics",  skill: "Run IV overidentification tests" },
        { page: "06b-did.html",               anchor: "event-study",  skill: "Choose the correct reference period" },
        { page: "06c-rdd.html",               anchor: "bandwidth",    skill: "Test RDD robustness to bandwidth" },
        { page: "06e-synthetic-control.html", anchor: "basic",        skill: "Implement synthetic control in Stata" },
        { page: "06a-matching.html",          anchor: "diagnostics",  skill: "Check balance after matching" },
        { page: "06b-did.html",               anchor: "event-study",  skill: "Estimate event studies with fixest in R" },
        { page: "06-causal-inference.html",   anchor: "",             skill: "Design robustness tests for causal methods" }
      ]
    },

    // ── TOPIC 7: ESTIMATION ───────────────────────────────────────────
    estimation: {
      beginner: [
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Specify robust standard errors in Python" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Use the robust option in Stata" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Address heteroskedasticity in regressions" },
        { page: "07-estimation.html", anchor: "nonlinear",       skill: "Interpret logit coefficients as odds ratios" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Compute robust standard errors in R" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Compare classical and robust standard errors" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Choose the right HC variant" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Compare robust SE methods across languages" }
      ],
      intermediate: [
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Cluster standard errors correctly" },
        { page: "07-estimation.html", anchor: "panel",           skill: "Understand fixed effects and time-invariant variables" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Handle inference with too few clusters" },
        { page: "07-estimation.html", anchor: "nonlinear",       skill: "Compute logit marginal effects in R" },
        { page: "07-estimation.html", anchor: "bootstrap",       skill: "Implement bootstrap standard errors" },
        { page: "07-estimation.html", anchor: "panel",           skill: "Combine fixed effects with clustered SEs" },
        { page: "07-estimation.html", anchor: "nonlinear",       skill: "Estimate logit with marginal effects" },
        { page: "07-estimation.html", anchor: "panel",           skill: "Compare panel FE methods across languages" }
      ],
      advanced: [
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Compute two-way clustered standard errors" },
        { page: "07-estimation.html", anchor: "bootstrap",       skill: "Implement wild cluster bootstrap" },
        { page: "07-estimation.html", anchor: "bootstrap",       skill: "Bootstrap correctly with clustered data" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Compare models with different SE types" },
        { page: "07-estimation.html", anchor: "panel",           skill: "Estimate two-way FE in Python" },
        { page: "07-estimation.html", anchor: "bootstrap",       skill: "Set seeds for reproducible bootstrap in Stata" },
        { page: "07-estimation.html", anchor: "panel",           skill: "Use fixest for two-way fixed effects in R" },
        { page: "07-estimation.html", anchor: "standard-errors", skill: "Match SE methods to appropriate use cases" }
      ]
    },

    // ── TOPIC 8: REPLICABILITY & GIT ──────────────────────────────────
    replicability: {
      beginner: [
        { page: "08-replicability.html", anchor: "",              skill: "Create a master script for reproducibility" },
        { page: "08-replicability.html", anchor: "",              skill: "Organize research project folders" },
        { page: "08-replicability.html", anchor: "",              skill: "Use portable file paths" },
        { page: "08-replicability.html", anchor: "",              skill: "Protect raw data from overwriting" },
        { page: "09-github.html",        anchor: "git-workflow",  skill: "Follow the basic git workflow" },
        { page: "08-replicability.html", anchor: "",              skill: "Number scripts for execution order" },
        { page: "09-github.html",        anchor: "staging-area",  skill: "Write .gitignore files" },
        { page: "09-github.html",        anchor: "key-concepts",  skill: "Understand core git concepts" }
      ],
      intermediate: [
        { page: "08-replicability.html", anchor: "",                skill: "Create log files for reproducibility" },
        { page: "09-github.html",        anchor: "staging-area",    skill: "Use selective git staging" },
        { page: "09-github.html",        anchor: "committing",      skill: "Write clear commit messages" },
        { page: "08-replicability.html", anchor: "",                skill: "Automate result reporting" },
        { page: "09-github.html",        anchor: "git-workflow",    skill: "Use feature branches for collaboration" },
        { page: "08-replicability.html", anchor: "",                skill: "Automate table export in Python" },
        { page: "09-github.html",        anchor: "common-mistakes", skill: "Resolve git merge conflicts" },
        { page: "08-replicability.html", anchor: "",                skill: "Apply replicability best practices" }
      ],
      advanced: [
        { page: "09-github.html",        anchor: "staging-area",    skill: "Write advanced .gitignore patterns" },
        { page: "08-replicability.html", anchor: "",                skill: "Manage paths portably across systems" },
        { page: "09-github.html",        anchor: "common-mistakes", skill: "Handle leaked secrets in git history" },
        { page: "08-replicability.html", anchor: "",                skill: "Debug broken pipeline dependencies" },
        { page: "09-github.html",        anchor: "push-pull",       skill: "Collaborate safely with git push/pull" },
        { page: "08-replicability.html", anchor: "",                skill: "Write a full reproducible master script" },
        { page: "09-github.html",        anchor: "git-workflow",    skill: "Implement feature branch workflows" },
        { page: "09-github.html",        anchor: "git-workflow",    skill: "Apply git workflows to research" }
      ]
    },

    // ── TOPIC 9: MACHINE LEARNING ─────────────────────────────────────
    machine_learning: {
      beginner: [
        { page: "11e-model-evaluation.html", anchor: "train-test-split",  skill: "Split data into training and test sets" },
        { page: "11e-model-evaluation.html", anchor: "cross-validation",  skill: "Understand cross-validation purpose" },
        { page: "11e-model-evaluation.html", anchor: "train-test-split",  skill: "Use random seeds for reproducible splits" },
        { page: "11e-model-evaluation.html", anchor: "pitfalls",          skill: "Avoid misleading accuracy metrics" },
        { page: "11-machine-learning.html",  anchor: "supervised-unsupervised", skill: "Build a basic ML pipeline" },
        { page: "11e-model-evaluation.html", anchor: "train-test-split",  skill: "Implement train-test split in R" },
        { page: "11a-regularization.html",   anchor: "lasso",             skill: "Fit a Lasso regression" },
        { page: "11e-model-evaluation.html", anchor: "regression-metrics", skill: "Match ML evaluation metrics" }
      ],
      intermediate: [
        { page: "11a-regularization.html",   anchor: "intuition",            skill: "Scale features before regularization" },
        { page: "11b-trees.html",            anchor: "random-forests",       skill: "Tune random forest hyperparameters" },
        { page: "11e-model-evaluation.html", anchor: "pitfalls",             skill: "Prevent data leakage through scaling" },
        { page: "11e-model-evaluation.html", anchor: "pitfalls",             skill: "Avoid tuning on the test set" },
        { page: "11e-model-evaluation.html", anchor: "hyperparameter-tuning", skill: "Use GridSearchCV for hyperparameter tuning" },
        { page: "11a-regularization.html",   anchor: "intuition",            skill: "Build correct scaling pipelines" },
        { page: "11b-trees.html",            anchor: "cart",                 skill: "Control decision tree depth" },
        { page: "11a-regularization.html",   anchor: "comparison",           skill: "Compare regularization methods" }
      ],
      advanced: [
        { page: "11d-causal-ml.html",        anchor: "dml",             skill: "Implement double/debiased machine learning" },
        { page: "11d-causal-ml.html",        anchor: "causal-forests",  skill: "Estimate heterogeneous effects with causal forests" },
        { page: "11a-regularization.html",   anchor: "lasso",           skill: "Debug unscaled Lasso regressions" },
        { page: "11-machine-learning.html",  anchor: "prediction-vs-causation", skill: "Distinguish prediction from causation" },
        { page: "11d-causal-ml.html",        anchor: "dml",             skill: "Build a double ML estimation pipeline" },
        { page: "11a-regularization.html",   anchor: "lasso",           skill: "Create a complete regularized pipeline" },
        { page: "11d-causal-ml.html",        anchor: "causal-forests",  skill: "Implement causal forests in R" },
        { page: "11d-causal-ml.html",        anchor: "why-causal-ml",   skill: "Compare prediction ML with causal ML" }
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
