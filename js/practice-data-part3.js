// Practice Exercises - Part 3: Estimation, Replicability & Git, Machine Learning
(function() {
  if (!window.PRACTICE_EXERCISES) window.PRACTICE_EXERCISES = {};

  // =========================================================================
  // TOPIC 1: ESTIMATION
  // =========================================================================
  window.PRACTICE_EXERCISES.estimation = {

    // -----------------------------------------------------------------------
    // BEGINNER (8 exercises)
    // -----------------------------------------------------------------------
    beginner: [
      // 1 - read (Python) — Skill: reading robust SE specification
      {
        type: "read",
        title: "OLS with Robust Standard Errors",
        prompt: "What does this code produce?",
        lang: "python",
        code: "import statsmodels.api as sm\n\nX = sm.add_constant(df['education'])\nmodel = sm.OLS(df['wage'], X)\nresults = model.fit(cov_type='HC1')\nprint(results.summary())",
        options: [
          "OLS regression of wage on education with HC1 heteroskedasticity-robust standard errors",
          "OLS regression of wage on education with classical (non-robust) standard errors",
          "A logistic regression of wage on education with robust standard errors",
          "OLS regression of wage on education forced through the origin"
        ],
        correct: 0,
        explanation: "The cov_type='HC1' argument tells statsmodels to compute White heteroskedasticity-robust standard errors with the small-sample HC1 correction. The coefficients are identical to classical OLS; only the standard errors change."
      },
      // 2 - read (Stata) — Skill: robust SE in Stata, understanding that robust changes SEs not coefficients
      {
        type: "read",
        title: "Robust Option in Stata",
        prompt: "A researcher runs `regress wage education experience, robust` and compares with `regress wage education experience`. Which statement is true?",
        lang: "stata",
        code: "regress wage education experience, robust",
        options: [
          "Both commands produce the same coefficients but different standard errors",
          "The robust option produces different coefficients and different standard errors",
          "The robust option drops outliers before estimating the regression",
          "The robust option uses a different estimation method (not OLS)"
        ],
        correct: 0,
        explanation: "The robust option only changes the variance-covariance estimator used for standard errors. The point estimates (coefficients) are identical to classical OLS. Robust standard errors account for heteroskedasticity without altering the fitted model."
      },
      // 3 - bug (Python) — Mistake: using classical SEs when robust is needed
      {
        type: "bug",
        title: "Ignoring Heteroskedasticity",
        prompt: "A researcher finds strong heteroskedasticity in the residuals but runs this code. What is the problem?",
        lang: "python",
        code: "import statsmodels.api as sm\n\nX = sm.add_constant(df[['income', 'age']])\nmodel = sm.OLS(df['consumption'], X)\nresults = model.fit()\nprint(results.summary())",
        options: [
          "Line 3: add_constant cannot handle multiple regressors",
          "Line 5: model.fit() uses classical SEs, ignoring the heteroskedasticity — should use cov_type='HC1'",
          "Line 4: the dependent variable should come second in sm.OLS()",
          "Line 6: summary() does not display standard errors"
        ],
        correct: 1,
        explanation: "When heteroskedasticity is present, classical standard errors are biased and hypothesis tests are invalid. The fix is model.fit(cov_type='HC1'), which computes robust standard errors without changing the coefficient estimates."
      },
      // 4 - bug (Stata) — Mistake: interpreting logit coefficients as probability changes
      {
        type: "bug",
        title: "Logit Coefficient Interpretation",
        prompt: "A researcher estimates a logit and interprets the results. What mistake did they make?",
        lang: "stata",
        code: "logit employed education age income\n* Coefficient on education: 0.35\n* Interpretation: \"A one-year increase in\n*   education raises the probability of\n*   employment by 0.35 (35 percentage points)\"",
        options: [
          "The logit command syntax is wrong — needs commas between variables",
          "Logit coefficients are log-odds ratios, not probability changes — need margins, dydx(*) for marginal effects",
          "Logit models cannot include continuous variables like age and income",
          "The model is missing the robust option"
        ],
        correct: 1,
        explanation: "Logit coefficients represent changes in log-odds, not changes in probability. To get the marginal effect on probability, run margins, dydx(*) after the logit. A coefficient of 0.35 in log-odds does NOT mean a 35 percentage point change in probability."
      },
      // 5 - reorder (R) — Skill: OLS with robust SEs in R
      {
        type: "reorder",
        title: "Robust Standard Errors in R",
        prompt: "Arrange these lines to run OLS with HC1 robust standard errors in R.",
        lang: "r",
        lines: [
          "library(sandwich)",
          "library(lmtest)",
          "model <- lm(wage ~ education + experience, data = df)",
          "coeftest(model, vcov = vcovHC(model, type = \"HC1\"))"
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: "First load the sandwich package (provides vcovHC) and lmtest package (provides coeftest), then fit the OLS model with lm(), and finally display coefficients with HC1 robust standard errors using coeftest."
      },
      // 6 - reorder (Stata) — Skill: store and compare regressions
      {
        type: "reorder",
        title: "Compare Classical vs Robust SEs",
        prompt: "Arrange these Stata lines to run a regression with both classical and robust SEs and export a comparison table.",
        lang: "stata",
        lines: [
          "regress income education age",
          "estimates store classical",
          "regress income education age, robust",
          "estimates store robust_se",
          "esttab classical robust_se, se"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "First run the regression with classical SEs and store it, then run the same regression with robust SEs and store it. Finally, esttab displays both side by side so you can compare how standard errors change."
      },
      // 7 - fill (Python) — Skill: HC variants
      {
        type: "fill",
        title: "Choosing an HC Variant",
        prompt: "Fill in the blanks to fit OLS with the standard robust variance estimator (the one with small-sample correction).",
        lang: "python",
        codeTemplate: "import statsmodels.api as sm\n\nX = sm.add_constant(df['education'])\nmodel = sm.___GAP1___(df['wage'], X)\nresults = model.fit(cov_type='___GAP2___')\nprint(results.bse)",
        gaps: {
          "GAP1": { answer: "OLS", accept: ["OLS"] },
          "GAP2": { answer: "HC1", accept: ["HC1"] }
        },
        explanation: "sm.OLS creates an ordinary least squares model. HC1 is the standard robust estimator with the n/(n-k) small-sample correction, equivalent to Stata's robust option. HC0 has no correction; HC2 and HC3 are alternatives for small samples."
      },
      // 8 - match — Skill: robust SEs across languages
      {
        type: "match",
        title: "Robust SEs Across Languages",
        prompt: "Match equivalent robust standard error commands across Python, Stata, and R.",
        pairs: [
          {
            left: "model.fit(cov_type='HC1')",
            leftLang: "Python",
            right: "regress y x1 x2, robust",
            rightLang: "Stata"
          },
          {
            left: "vcovHC(model, type = \"HC1\")",
            leftLang: "R",
            right: "results.cov_params()",
            rightLang: "Python"
          },
          {
            left: "xtreg y x, fe vce(robust)",
            leftLang: "Stata",
            right: "PanelOLS(..., entity_effects=True).fit(cov_type='robust')",
            rightLang: "Python"
          },
          {
            left: "coeftest(model, vcov = vcovHC(model))",
            leftLang: "R",
            right: "results.summary()  # with HC1",
            rightLang: "Python"
          }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // -----------------------------------------------------------------------
    intermediate: [
      // 1 - read (Stata) — Skill: clustered SEs
      {
        type: "read",
        title: "Clustered Standard Errors",
        prompt: "Why does this code use clustered standard errors instead of just robust?",
        lang: "stata",
        code: "use firm_panel.dta, clear\nregress wage education experience, vce(cluster firm_id)",
        options: [
          "Because observations within the same firm may have correlated errors, and clustering accounts for this within-group correlation",
          "Because clustering makes the coefficient estimates more efficient",
          "Because clustering is required whenever you have panel data",
          "Because robust standard errors cannot be computed with more than two regressors"
        ],
        correct: 0,
        explanation: "Clustered SEs allow for arbitrary correlation of errors within each cluster (firm). If workers at the same firm share unobserved characteristics, their errors are correlated, and ignoring this understates standard errors. You need roughly 30+ clusters for reliable inference."
      },
      // 2 - read (Python) — Skill: panel FE absorbs time-invariant variables
      {
        type: "read",
        title: "Fixed Effects and Time-Invariant Variables",
        prompt: "A researcher runs this panel regression. Why is the gender variable absent from the output?",
        lang: "python",
        code: "from linearmodels.panel import PanelOLS\nimport pandas as pd\n\ndf = df.set_index(['person_id', 'year'])\nmod = PanelOLS(df['wage'], df[['experience', 'gender']],\n               entity_effects=True)\nresults = mod.fit(cov_type='clustered', cluster_entity=True)\nprint(results)",
        options: [
          "PanelOLS drops gender because it contains missing values",
          "Entity fixed effects absorb all time-invariant variation — since gender does not change within a person, its effect cannot be estimated",
          "PanelOLS cannot handle binary variables like gender",
          "The clustered covariance type is incompatible with the gender variable"
        ],
        correct: 1,
        explanation: "Entity fixed effects (entity_effects=True) demean each variable within each entity. Since gender never changes within a person, after demeaning it becomes all zeros. Fixed effects fundamentally cannot estimate the impact of time-invariant characteristics."
      },
      // 3 - bug (Stata) — Mistake: clustering with too few clusters
      {
        type: "bug",
        title: "Too Few Clusters",
        prompt: "This study uses data from 8 countries. What is wrong with this approach?",
        lang: "stata",
        code: "use multi_country.dta, clear\nregress gdp_growth trade_openness inflation, vce(cluster country)\n* 8 countries, 20 years each = 160 obs\n* \"Clustered standard errors account for\n*   within-country correlation\"",
        options: [
          "The vce(cluster) syntax is incorrect — should be vce(cluster country_id)",
          "With only 8 clusters, cluster-robust SEs are unreliable — need ~30+ clusters for asymptotic theory to apply",
          "You cannot cluster at the country level with panel data",
          "The regression needs to include country fixed effects before clustering"
        ],
        correct: 1,
        explanation: "Cluster-robust standard errors rely on the number of clusters going to infinity. With only 8 clusters, the SEs are severely biased (usually too small). Solutions include wild cluster bootstrap or using fewer restrictions on the error structure."
      },
      // 4 - bug (R) — Mistake: not getting marginal effects from logit
      {
        type: "bug",
        title: "Logit Marginal Effects in R",
        prompt: "This code fits a logit model but the researcher directly interprets the coefficients. What is the issue?",
        lang: "r",
        code: "model <- glm(employed ~ education + age,\n             family = binomial(link = \"logit\"), data = df)\nsummary(model)\n# \"Coefficient on education = 0.42, so one more year\n#   of education raises employment probability by 42%\"",
        options: [
          "The glm syntax is wrong — binomial should not have link = \"logit\"",
          "The model is missing the robust standard errors option",
          "Logit coefficients are in log-odds, not probabilities — need margins::margins(model) or predict with type = \"response\" for marginal effects",
          "The model should use family = gaussian for employment data"
        ],
        correct: 2,
        explanation: "Logit coefficients represent changes in log-odds, which have no direct percentage-point interpretation. To get average marginal effects (probability changes), use the margins package: margins(model) gives the effect of each variable on the predicted probability."
      },
      // 5 - reorder (Python) — Skill: bootstrap
      {
        type: "reorder",
        title: "Bootstrap Standard Errors",
        prompt: "Arrange these lines to compute bootstrap standard errors for an OLS coefficient in Python.",
        lang: "python",
        lines: [
          "import numpy as np",
          "np.random.seed(42)",
          "boot_coefs = []",
          "for i in range(1000):\n    idx = np.random.choice(len(df), size=len(df), replace=True)\n    boot_df = df.iloc[idx]\n    X_b = sm.add_constant(boot_df['education'])\n    coef = sm.OLS(boot_df['wage'], X_b).fit().params[1]\n    boot_coefs.append(coef)",
          "boot_se = np.std(boot_coefs, ddof=1)",
          "print(f'Bootstrap SE: {boot_se:.4f}')"
        ],
        correctOrder: [0, 1, 2, 3, 4, 5],
        explanation: "First import numpy and set the seed for reproducibility. Initialize an empty list, then run 1000 bootstrap replications sampling with replacement. Finally compute the standard deviation of the bootstrapped coefficients — this is the bootstrap SE."
      },
      // 6 - reorder (Stata) — Skill: panel FE with clustering
      {
        type: "reorder",
        title: "Panel Fixed Effects with Clustering",
        prompt: "Arrange these Stata lines to estimate entity and time fixed effects with clustered standard errors.",
        lang: "stata",
        lines: [
          "use firm_panel.dta, clear",
          "xtset firm_id year",
          "xtreg revenue rd_spending employees i.year, fe vce(cluster firm_id)",
          "estimates store fe_clustered",
          "esttab fe_clustered, se star(* 0.10 ** 0.05 *** 0.01)"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "First load data and declare the panel structure with xtset. Then estimate entity FE (fe) with time dummies (i.year) and cluster SEs at the firm level. Store the results and display them with significance stars."
      },
      // 7 - fill (Stata) — Skill: logit marginal effects
      {
        type: "fill",
        title: "Logit with Marginal Effects",
        prompt: "Fill in the blanks to estimate a logit model and compute average marginal effects in Stata.",
        lang: "stata",
        codeTemplate: "___GAP1___ employed education age income, robust\n___GAP2___, dydx(*)",
        gaps: {
          "GAP1": { answer: "logit", accept: ["logit", "logistic"] },
          "GAP2": { answer: "margins", accept: ["margins"] }
        },
        explanation: "The logit command estimates the model, but its coefficients are in log-odds. The margins, dydx(*) command computes average marginal effects — the average change in predicted probability for a one-unit change in each variable."
      },
      // 8 - match — Skill: FE across languages
      {
        type: "match",
        title: "Panel Fixed Effects Across Languages",
        prompt: "Match equivalent panel fixed effects specifications across Stata, Python, and R.",
        pairs: [
          {
            left: "xtreg y x, fe",
            leftLang: "Stata",
            right: "PanelOLS(y, x, entity_effects=True)",
            rightLang: "Python"
          },
          {
            left: "xtreg y x, fe vce(cluster firm_id)",
            leftLang: "Stata",
            right: "mod.fit(cov_type='clustered', cluster_entity=True)",
            rightLang: "Python"
          },
          {
            left: "feols(y ~ x | firm + year, data = df)",
            leftLang: "R (fixest)",
            right: "PanelOLS(y, x, entity_effects=True, time_effects=True)",
            rightLang: "Python"
          },
          {
            left: "reghdfe y x, absorb(firm year) vce(cluster firm)",
            leftLang: "Stata",
            right: "feols(y ~ x | firm + year, vcov = ~firm, data = df)",
            rightLang: "R (fixest)"
          }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    // ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 - read (Python) — Skill: two-way clustering
      {
        type: "read",
        title: "Two-Way Clustered Standard Errors",
        prompt: "What does the cov_type and clusters argument accomplish in this code?",
        lang: "python",
        code: "from linearmodels.panel import PanelOLS\n\ndf = df.set_index(['firm_id', 'year'])\nmod = PanelOLS(df['revenue'], df[['rd_spending', 'employees']],\n               entity_effects=True)\nresults = mod.fit(cov_type='clustered',\n                  cluster_entity=True, cluster_time=True)\nprint(results.summary)",
        options: [
          "It clusters standard errors by both firm and year, allowing for correlation within firms and within time periods simultaneously",
          "It runs two separate regressions, one for each cluster dimension",
          "It adds both firm and year fixed effects to the model",
          "It applies the bootstrap separately within each firm-year cell"
        ],
        correct: 0,
        explanation: "Two-way clustering allows errors to be correlated both within firms (across time) and within years (across firms). This is important when shocks affect all firms in a year (macro shocks) and persist within firms over time."
      },
      // 2 - read (Stata) — Skill: wild bootstrap for few clusters
      {
        type: "read",
        title: "Wild Cluster Bootstrap",
        prompt: "Why does this researcher use wild cluster bootstrap instead of standard clustered SEs?",
        lang: "stata",
        code: "regress test_score treatment class_size, vce(cluster state)\n* Only 12 states in the sample\nboottest treatment, cluster(state) reps(999) seed(42)",
        options: [
          "Wild cluster bootstrap is faster to compute than standard clustered SEs",
          "Wild cluster bootstrap provides valid inference with few clusters (here 12), where standard clustered SEs would be unreliable",
          "Wild cluster bootstrap changes the coefficient estimates to be more efficient",
          "The boottest command tests whether the treatment variable is endogenous"
        ],
        correct: 1,
        explanation: "With only 12 clusters, standard cluster-robust SEs are unreliable because asymptotic theory requires many clusters. Wild cluster bootstrap provides better finite-sample inference by resampling residuals with random sign flips within clusters."
      },
      // 3 - bug (Python) — Mistake: using regular bootstrap on clustered data
      {
        type: "bug",
        title: "Bootstrap on Clustered Data",
        prompt: "This code bootstraps standard errors for a model with firm-level clustering. What is the fundamental error?",
        lang: "python",
        code: "import numpy as np\nimport statsmodels.api as sm\n\nnp.random.seed(42)\nboot_coefs = []\nfor i in range(1000):\n    idx = np.random.choice(len(df), size=len(df), replace=True)\n    boot_df = df.iloc[idx]\n    X_b = sm.add_constant(boot_df[['education', 'experience']])\n    coef = sm.OLS(boot_df['wage'], X_b).fit().params[1]\n    boot_coefs.append(coef)\nboot_se = np.std(boot_coefs, ddof=1)",
        options: [
          "Line 7: np.random.choice should not use replace=True",
          "Line 7: the bootstrap resamples individual observations instead of entire clusters — need block bootstrap that resamples all observations within a firm together",
          "Line 11: .params[1] extracts the wrong coefficient",
          "Line 4: seed(42) makes the bootstrap deterministic, which invalidates the procedure"
        ],
        correct: 1,
        explanation: "When data has a cluster structure (e.g., workers within firms), the standard bootstrap destroys within-cluster correlation by resampling individuals. A block/cluster bootstrap resamples entire clusters, preserving the dependence structure that the original model accounts for."
      },
      // 4 - bug (Stata) — Mistake: comparing models with different SE types
      {
        type: "bug",
        title: "Comparing Models with Mixed SE Types",
        prompt: "A researcher presents these results side by side. What is misleading about this comparison?",
        lang: "stata",
        code: "* Model 1: baseline\nregress wage education age\nestimates store m1\n\n* Model 2: add controls\nregress wage education age gender occupation, robust\nestimates store m2\n\nesttab m1 m2, se star(* 0.10 ** 0.05 *** 0.01)\n* \"Education coefficient becomes insignificant in Model 2\"",
        options: [
          "esttab cannot compare models with different numbers of regressors",
          "Model 1 uses classical SEs while Model 2 uses robust SEs — the change in significance may reflect the SE type switch rather than the added controls",
          "The star thresholds are non-standard",
          "estimates store cannot be used after regress"
        ],
        correct: 1,
        explanation: "Comparing significance across models is misleading when they use different SE types. Robust SEs are typically larger than classical SEs, so a variable can lose significance simply from the switch to robust — not from the added controls. Both models should use the same SE type for a fair comparison."
      },
      // 5 - reorder (Python) — Skill: panel FE with two-way FE and clustering
      {
        type: "reorder",
        title: "Two-Way Fixed Effects in Python",
        prompt: "Arrange these lines to estimate a two-way FE model with clustered SEs and display the results.",
        lang: "python",
        lines: [
          "from linearmodels.panel import PanelOLS",
          "df = df.set_index(['firm_id', 'year'])",
          "mod = PanelOLS(df['revenue'], df[['rd_spending', 'employees']],\n               entity_effects=True, time_effects=True)",
          "results = mod.fit(cov_type='clustered', cluster_entity=True)",
          "print(results.summary)"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "First import PanelOLS, set the multi-index for panel structure, specify both entity and time fixed effects, fit with clustered SEs, and display. The entity_effects absorb firm-level constants; time_effects absorb year-level shocks."
      },
      // 6 - reorder (Stata) — Skill: bootstrap with seed
      {
        type: "reorder",
        title: "Reproducible Bootstrap in Stata",
        prompt: "Arrange these Stata lines to run a reproducible bootstrap of an OLS regression.",
        lang: "stata",
        lines: [
          "use worker_data.dta, clear",
          "set seed 42",
          "bootstrap _b, reps(1000): regress wage education experience",
          "estat bootstrap, all",
          "matrix list e(ci_percentile)"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "First load data and set the seed for reproducibility. The bootstrap command resamples 1000 times and re-estimates the regression each time. estat bootstrap displays all bootstrap statistics, and the final line shows percentile confidence intervals."
      },
      // 7 - fill (R) — Skill: two-way FE with clustering using fixest
      {
        type: "fill",
        title: "Two-Way FE with fixest",
        prompt: "Fill in the blanks to estimate a two-way fixed effects model with firm-clustered SEs using the fixest package in R.",
        lang: "r",
        codeTemplate: "library(fixest)\nresult <- ___GAP1___(revenue ~ rd_spending + employees | firm_id + year,\n                  vcov = ~___GAP2___, data = df)\nsummary(result)",
        gaps: {
          "GAP1": { answer: "feols", accept: ["feols"] },
          "GAP2": { answer: "firm_id", accept: ["firm_id", "firm"] }
        },
        explanation: "feols() from fixest estimates linear models with multiple fixed effects efficiently. The | firm_id + year syntax absorbs both entity and time FE. vcov = ~firm_id clusters standard errors at the firm level, accounting for within-firm error correlation."
      },
      // 8 - match — Skill: HC variants and bootstrap methods
      {
        type: "match",
        title: "SE Methods and Their Use Cases",
        prompt: "Match each standard error method with its appropriate use case.",
        pairs: [
          {
            left: "HC1 robust SEs",
            leftLang: "Method",
            right: "Cross-sectional data with heteroskedasticity",
            rightLang: "Use case"
          },
          {
            left: "Cluster-robust SEs",
            leftLang: "Method",
            right: "Grouped data with 30+ clusters and within-group correlation",
            rightLang: "Use case"
          },
          {
            left: "Wild cluster bootstrap",
            leftLang: "Method",
            right: "Grouped data with fewer than 30 clusters",
            rightLang: "Use case"
          },
          {
            left: "Two-way clustering",
            leftLang: "Method",
            right: "Panel data with both cross-sectional and time-series correlation",
            rightLang: "Use case"
          }
        ]
      }
    ]
  };

  // =========================================================================
  // TOPIC 2: REPLICABILITY (Modules 8-9)
  // =========================================================================
  window.PRACTICE_EXERCISES.replicability = {

    // -----------------------------------------------------------------------
    // BEGINNER (8 exercises)
    // -----------------------------------------------------------------------
    beginner: [
      // 1 - read (Stata) — Skill: reading master script pattern
      {
        type: "read",
        title: "Master Script Pattern",
        prompt: "What is the purpose of defining global root at the top of this Stata master script?",
        lang: "stata",
        code: "* master.do\nglobal root \"/Users/maria/projects/wage_study\"\n\ndo \"$root/code/01_import.do\"\ndo \"$root/code/02_clean.do\"\ndo \"$root/code/03_analysis.do\"\ndo \"$root/code/04_tables.do\"",
        options: [
          "So that each collaborator only needs to change one line (the root path) to run the entire project on their machine",
          "Because Stata requires all paths to be absolute",
          "To prevent Stata from overwriting files accidentally",
          "To make the code run faster by caching the path"
        ],
        correct: 0,
        explanation: "The master script pattern uses one absolute path at the top, then all other references are relative to that root. When a collaborator clones the project, they change only the global root line and everything works. This is the cornerstone of portable replication."
      },
      // 2 - read (general) — Skill: folder structure conventions
      {
        type: "read",
        title: "Project Folder Structure",
        prompt: "Which statement about this standard project folder structure is correct?",
        lang: "text",
        code: "project/\n  data/\n    raw/        <- original datasets\n    processed/  <- cleaned datasets\n  code/\n    01_import.do\n    02_clean.do\n    03_analysis.do\n  output/\n    tables/\n    figures/\n    logs/",
        options: [
          "Files in data/raw/ should never be modified — create processed versions in data/processed/ instead",
          "The numbering of scripts is just for aesthetics and has no functional purpose",
          "Output files should be stored alongside the code that generates them",
          "The raw/ and processed/ folders should contain identical copies of the data"
        ],
        correct: 0,
        explanation: "Raw data is sacred — it should be read-only so you can always trace your results back to the original source. All cleaning creates new files in data/processed/. This guarantees that running the pipeline from scratch produces identical results."
      },
      // 3 - bug (general) — Mistake: absolute paths in shared code
      {
        type: "bug",
        title: "Non-Portable Paths",
        prompt: "A student shares their project with a collaborator who cannot run the code. What is wrong?",
        lang: "stata",
        code: "* 01_import.do\nuse \"/Users/marco/Desktop/thesis/data/raw/survey.dta\", clear\nkeep if year >= 2010\nsave \"/Users/marco/Desktop/thesis/data/processed/survey_clean.dta\", replace",
        options: [
          "The keep command syntax is wrong",
          "Lines 2 and 4 use absolute paths specific to Marco's computer — should use relative paths from a project root variable",
          "The .dta file format is not compatible across machines",
          "The save command should not use the replace option"
        ],
        correct: 1,
        explanation: "Absolute paths like /Users/marco/... only work on Marco's machine. The fix is to define global root at the top and use $root/data/raw/survey.dta. This way collaborators only change the root path to run the entire project."
      },
      // 4 - bug (general) — Mistake: modifying raw data
      {
        type: "bug",
        title: "Overwriting Raw Data",
        prompt: "This cleaning script has a critical error in its approach to data management. What is it?",
        lang: "stata",
        code: "* 02_clean.do\nuse \"$root/data/raw/census.dta\", clear\ndrop if age < 18\nreplace income = . if income < 0\nsave \"$root/data/raw/census.dta\", replace",
        options: [
          "Line 3: drop if should use keep if instead",
          "Line 4: replacing negative incomes with missing is bad practice",
          "Line 5: saving back to data/raw/ overwrites the original data — should save to data/processed/",
          "Line 2: clear option is unnecessary"
        ],
        correct: 2,
        explanation: "Saving processed data back into the raw/ folder destroys the original dataset. If something goes wrong in cleaning, you cannot recover. Always save cleaned data to data/processed/ and keep raw data untouched. This is a fundamental replicability principle."
      },
      // 5 - reorder (Git) — Skill: basic git workflow
      {
        type: "reorder",
        title: "Basic Git Workflow",
        prompt: "Arrange these commands in the correct order for the standard Git workflow.",
        lang: "bash",
        lines: [
          "git add analysis.py",
          "git commit -m \"Add baseline regression with robust SEs\"",
          "git push origin main"
        ],
        correctOrder: [0, 1, 2],
        explanation: "The Git workflow follows three stages: (1) git add stages changes from the working directory, (2) git commit saves a snapshot to local history with a descriptive message, (3) git push uploads commits to the remote repository."
      },
      // 6 - reorder (Stata) — Skill: numbered script execution
      {
        type: "reorder",
        title: "Numbered Script Pipeline",
        prompt: "Arrange these do-files in the correct execution order for a research project.",
        lang: "stata",
        lines: [
          "do \"$root/code/01_import_data.do\"",
          "do \"$root/code/02_clean_merge.do\"",
          "do \"$root/code/03_regression.do\"",
          "do \"$root/code/04_export_tables.do\""
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: "Scripts are numbered to enforce execution order. Import raw data first, then clean and merge, run the analysis, and finally export results. This pipeline must run from start to finish to reproduce all results from the original data."
      },
      // 7 - fill (Git) — Skill: .gitignore patterns
      {
        type: "fill",
        title: "Writing a .gitignore",
        prompt: "Fill in the blanks to prevent large data files and sensitive credentials from being tracked by Git.",
        lang: "text",
        codeTemplate: "# Ignore all Stata data files\n___GAP1___\n# Ignore raw data folder\ndata/raw/\n# Ignore environment secrets\n___GAP2___",
        gaps: {
          "GAP1": { answer: "*.dta", accept: ["*.dta"] },
          "GAP2": { answer: ".env", accept: [".env", "*.env"] }
        },
        explanation: "The .gitignore file tells Git which files to exclude from version control. Large data files (*.dta) and secret credentials (.env) should never be committed — data because of size and privacy, secrets because anyone with repo access could see them."
      },
      // 8 - match — Skill: Git three states
      {
        type: "match",
        title: "Git Concepts",
        prompt: "Match each Git concept with its description.",
        pairs: [
          {
            left: "Working directory",
            leftLang: "Git state",
            right: "Files as they currently exist on your computer, including unsaved edits",
            rightLang: "Description"
          },
          {
            left: "Staging area (index)",
            leftLang: "Git state",
            right: "Files marked for inclusion in the next commit via git add",
            rightLang: "Description"
          },
          {
            left: "Repository (committed)",
            leftLang: "Git state",
            right: "Permanent snapshots saved to Git history via git commit",
            rightLang: "Description"
          },
          {
            left: ".gitignore",
            leftLang: "Git file",
            right: "Specifies files that Git should never track (data, secrets, logs)",
            rightLang: "Description"
          }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // -----------------------------------------------------------------------
    intermediate: [
      // 1 - read (Stata) — Skill: log files for reproducibility
      {
        type: "read",
        title: "Log Files for Reproducibility",
        prompt: "Why does this master script include log commands?",
        lang: "stata",
        code: "global root \"/Users/maria/projects/wage_study\"\nlog using \"$root/output/logs/analysis.log\", replace\n\ndo \"$root/code/01_import.do\"\ndo \"$root/code/02_clean.do\"\ndo \"$root/code/03_analysis.do\"\n\nlog close",
        options: [
          "Log files record all Stata output (results, warnings, errors), creating a permanent record that reviewers can check without re-running the code",
          "Log files make the code run faster by caching intermediate results",
          "Log files are required by Stata to execute do-files in sequence",
          "Log files prevent the code from overwriting existing output"
        ],
        correct: 0,
        explanation: "A log file captures everything Stata prints: regression output, summary statistics, error messages. This creates an auditable trail — a reviewer can verify results match the paper without installing Stata or accessing the data."
      },
      // 2 - read (Git) — Skill: why git add . is dangerous
      {
        type: "read",
        title: "The Danger of git add .",
        prompt: "A researcher runs these commands. What risk does this create?",
        lang: "bash",
        code: "# In project directory containing:\n#   analysis.py, .env (with API key), data.csv (500MB)\ngit add .\ngit commit -m \"Add analysis\"\ngit push origin main",
        options: [
          "git add . stages everything including the .env secrets file and the 500MB data file, pushing sensitive and large files to the remote",
          "git add . only stages Python files, so data.csv will be excluded",
          "git push will fail because the commit message is too short",
          "git add . creates a new branch instead of committing to main"
        ],
        correct: 0,
        explanation: "git add . stages ALL untracked and modified files in the directory. This includes .env (exposing API keys to anyone with repo access) and data.csv (bloating the repository permanently). Always use git add <specific-files> or maintain a proper .gitignore."
      },
      // 3 - bug (Git) — Mistake: vague commit messages
      {
        type: "bug",
        title: "Commit Message Quality",
        prompt: "A researcher's git log looks like this. What is wrong with these commit messages?",
        lang: "bash",
        code: "git log --oneline\n# a3f2b1c fix\n# 8d4e2a1 update\n# 1c7f3b2 changes\n# 9e5a4d3 stuff\n# 2b8c1e4 wip",
        options: [
          "The commit hashes are too short to be valid",
          "The messages are meaningless — they do not describe WHAT changed or WHY, making it impossible to trace the project's evolution",
          "Git requires commit messages to be at least 10 characters",
          "The --oneline flag hides important information"
        ],
        correct: 1,
        explanation: "Good commit messages describe what changed and why: \"Add robust SEs to baseline regression\" or \"Fix missing data handling in cleaning script\". Vague messages like \"fix\" or \"update\" make it impossible to understand the project history or find when a bug was introduced."
      },
      // 4 - bug (Stata) — Mistake: manual copy-paste of results
      {
        type: "bug",
        title: "Manual Result Reporting",
        prompt: "This workflow has a replicability flaw. What is it?",
        lang: "stata",
        code: "regress wage education experience, robust\n* Copy coefficient from Stata output\n* Paste into LaTeX file manually:\n* \\beta_1 = 0.084 (0.012)\n* Then compile paper.tex",
        options: [
          "The robust option is unnecessary for this regression",
          "Manually copying results is error-prone and non-reproducible — should use esttab to export directly to LaTeX",
          "LaTeX cannot display regression coefficients",
          "The regression is missing an intercept"
        ],
        correct: 1,
        explanation: "Manual copy-paste of results is a major replicability risk: transcription errors are common and impossible to detect. The fix is automated export: esttab using \"$root/output/tables/results.tex\", se replace generates the LaTeX table directly from Stata output."
      },
      // 5 - reorder (Git) — Skill: branching workflow
      {
        type: "reorder",
        title: "Git Feature Branch Workflow",
        prompt: "Arrange these commands to create a feature branch, do work, and merge it back to main.",
        lang: "bash",
        lines: [
          "git checkout -b add-robustness-checks",
          "git add robustness.py",
          "git commit -m \"Add placebo tests and alternative specifications\"",
          "git checkout main",
          "git merge add-robustness-checks"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Create and switch to a new branch with checkout -b. Do your work, stage, and commit. Then switch back to main and merge the feature branch in. This keeps main stable while you experiment on a separate branch."
      },
      // 6 - reorder (Python) — Skill: table export for reproducibility
      {
        type: "reorder",
        title: "Automated Table Export in Python",
        prompt: "Arrange these lines to run regressions and export a reproducible LaTeX table.",
        lang: "python",
        lines: [
          "import statsmodels.api as sm",
          "from stargazer.stargazer import Stargazer",
          "X = sm.add_constant(df[['education', 'experience']])\nresults = sm.OLS(df['wage'], X).fit(cov_type='HC1')",
          "table = Stargazer([results])",
          "with open('output/tables/regression.tex', 'w') as f:\n    f.write(table.render_latex())"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Import the packages, run the regression, create a Stargazer table object, and write the LaTeX output to a file. This pipeline is fully reproducible — re-running the script regenerates the exact same table from the data."
      },
      // 7 - fill (Git) — Skill: merge conflict markers
      {
        type: "fill",
        title: "Resolving a Merge Conflict",
        prompt: "Fill in the Git commands to resolve a merge conflict and complete the merge.",
        lang: "bash",
        codeTemplate: "# After git merge feature-branch shows a conflict:\n# Edit the file to resolve the conflict markers\n# Then:\ngit ___GAP1___ analysis.py\ngit ___GAP2___ -m \"Resolve merge conflict in analysis.py\"",
        gaps: {
          "GAP1": { answer: "add", accept: ["add"] },
          "GAP2": { answer: "commit", accept: ["commit"] }
        },
        explanation: "After manually resolving the conflict markers (<<<<<<< ======= >>>>>>>) in your editor, you git add the resolved file to mark it as resolved, then git commit to finalize the merge. The merge is not complete until you commit."
      },
      // 8 - match — Skill: replicability best practices
      {
        type: "match",
        title: "Replicability Best Practices",
        prompt: "Match each replicability problem with its solution.",
        pairs: [
          {
            left: "Code only works on one computer",
            leftLang: "Problem",
            right: "Use one root path variable, all other paths relative",
            rightLang: "Solution"
          },
          {
            left: "Cannot tell which script to run first",
            leftLang: "Problem",
            right: "Number scripts: 01_import, 02_clean, 03_analysis",
            rightLang: "Solution"
          },
          {
            left: "Results in paper don't match code output",
            leftLang: "Problem",
            right: "Export tables/figures directly from code (esttab, stargazer)",
            rightLang: "Solution"
          },
          {
            left: "Cleaning error destroyed the original data",
            leftLang: "Problem",
            right: "Keep raw data read-only, save cleaned data to processed/",
            rightLang: "Solution"
          }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    // ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 - read (Git) — Skill: reading .gitignore patterns
      {
        type: "read",
        title: "Understanding .gitignore Patterns",
        prompt: "Given this .gitignore, which file WOULD be tracked by Git?",
        lang: "text",
        code: "# .gitignore\n*.dta\n*.csv\ndata/raw/\n.env\n*.log\noutput/figures/*.png",
        options: [
          "data/raw/survey.dta",
          "code/03_analysis.do",
          "output/figures/regression_plot.png",
          ".env"
        ],
        correct: 1,
        explanation: "The .gitignore excludes .dta, .csv, everything in data/raw/, .env, .log, and .png files in output/figures/. The file code/03_analysis.do matches none of these patterns, so Git would track it. Code files should always be version-controlled."
      },
      // 2 - read (Stata) — Skill: path management with globals
      {
        type: "read",
        title: "Portable Path Management",
        prompt: "Why does this master script define multiple global macros for subdirectories?",
        lang: "stata",
        code: "global root \"/Users/maria/projects/wage_study\"\nglobal data \"$root/data\"\nglobal code \"$root/code\"\nglobal output \"$root/output\"\n\nuse \"$data/raw/survey.dta\", clear\ndo \"$code/02_clean.do\"\nesttab using \"$output/tables/results.tex\", se replace",
        options: [
          "It makes paths shorter and more readable while maintaining portability — changing only global root adapts the entire project",
          "Stata requires separate globals for each subdirectory",
          "Each global creates a backup copy of the directory",
          "The globals prevent Stata from accidentally deleting files"
        ],
        correct: 0,
        explanation: "Defining sub-globals like $data, $code, and $output makes scripts cleaner (shorter paths) while keeping everything portable. A collaborator changes only the root line, and all derived paths update automatically. This is a professional-grade project organization pattern."
      },
      // 3 - bug (Git) — Mistake: committing secrets to Git
      {
        type: "bug",
        title: "Leaked API Key in Git History",
        prompt: "A researcher realizes they committed a file with an API key three commits ago. They delete the file and commit. Is the problem solved?",
        lang: "bash",
        code: "# Three commits ago:\ngit add config.py  # contains API_KEY = \"sk-abc123...\"\ngit commit -m \"Add config\"\ngit push origin main\n\n# Now (trying to fix):\nrm config.py\ngit add config.py\ngit commit -m \"Remove config with API key\"\ngit push origin main",
        options: [
          "Yes, deleting the file and pushing removes all traces of the API key",
          "No — the API key is still in Git history; anyone can see it with git log and checkout the old commit. The key must be revoked and history rewritten with git filter-branch or BFG",
          "No — the file was not properly deleted because git rm should have been used instead of rm",
          "Yes, but only if you also add config.py to .gitignore"
        ],
        correct: 1,
        explanation: "Git stores the complete history of every file. Deleting a file only removes it from the current commit — all previous versions remain accessible. Once a secret is pushed, assume it is compromised: revoke the key immediately. Prevention via .gitignore is far easier than cleanup."
      },
      // 4 - bug (Stata) — Mistake: non-reproducible pipeline (missing dependencies)
      {
        type: "bug",
        title: "Broken Pipeline Dependency",
        prompt: "A reviewer runs the master script and gets an error on 03_analysis.do. The researcher says it works on their machine. What is wrong?",
        lang: "stata",
        code: "* master.do\nglobal root \"/Users/maria/projects/wage_study\"\n\ndo \"$root/code/01_import.do\"\n* do \"$root/code/02_clean.do\"   // commented out to save time\ndo \"$root/code/03_analysis.do\"\ndo \"$root/code/04_tables.do\"",
        options: [
          "The global root path needs to be updated for the reviewer's machine",
          "Script 02_clean.do is commented out, so 03_analysis.do cannot find the cleaned data — the pipeline has a broken dependency",
          "The do command should use run instead",
          "The master script needs a log file to work correctly"
        ],
        correct: 1,
        explanation: "The researcher commented out 02_clean.do to save time because the processed data already existed on their machine. But a new reviewer does not have the processed data. The pipeline must run end-to-end from raw data to final output — skipping steps breaks replicability."
      },
      // 5 - reorder (Git) — Skill: pull before push to avoid conflicts
      {
        type: "reorder",
        title: "Safe Collaboration with Git",
        prompt: "Arrange these commands for the safe workflow when pushing changes to a shared repository.",
        lang: "bash",
        lines: [
          "git add 03_analysis.do",
          "git commit -m \"Add industry fixed effects to wage regression\"",
          "git pull origin main",
          "git push origin main"
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: "Stage and commit your local changes first, then pull to integrate any remote changes (and resolve conflicts if needed), then push. Pulling before pushing prevents rejected pushes and ensures you are working with the latest version of the shared code."
      },
      // 6 - reorder (Stata) — Skill: complete reproducible workflow
      {
        type: "reorder",
        title: "Full Reproducible Master Script",
        prompt: "Arrange these lines into a complete, reproducible master script.",
        lang: "stata",
        lines: [
          "global root \"/Users/maria/projects/wage_study\"",
          "log using \"$root/output/logs/master.log\", replace",
          "do \"$root/code/01_import.do\"",
          "do \"$root/code/02_clean.do\"",
          "do \"$root/code/03_analysis.do\"",
          "log close"
        ],
        correctOrder: [0, 1, 2, 3, 4, 5],
        explanation: "Define the root path first, open a log file to capture all output, run the numbered scripts in order, and close the log. This produces a complete audit trail and ensures the pipeline runs end-to-end from raw data to final results."
      },
      // 7 - fill (Git) — Skill: creating a feature branch
      {
        type: "fill",
        title: "Feature Branch Workflow",
        prompt: "Fill in the blanks to create a feature branch, push it, and open a pull request.",
        lang: "bash",
        codeTemplate: "git checkout -b ___GAP1___\n# ... make changes and commit ...\ngit push -u origin ___GAP2___",
        gaps: {
          "GAP1": { answer: "add-robustness-checks", accept: ["add-robustness-checks", "feature-branch", "robustness-checks", "new-feature"] },
          "GAP2": { answer: "add-robustness-checks", accept: ["add-robustness-checks", "feature-branch", "robustness-checks", "new-feature"] }
        },
        explanation: "git checkout -b creates and switches to a new branch. After committing your work, git push -u origin <branch-name> pushes the branch to the remote and sets up tracking. The branch name should match in both commands."
      },
      // 8 - match — Skill: Git workflow concepts
      {
        type: "match",
        title: "Git Workflow for Research",
        prompt: "Match each Git practice with the reason it matters for research replicability.",
        pairs: [
          {
            left: "Descriptive commit messages",
            leftLang: "Practice",
            right: "Creates an audit trail showing exactly when and why each analysis decision was made",
            rightLang: "Why it matters"
          },
          {
            left: "Feature branches",
            leftLang: "Practice",
            right: "Keeps the main branch stable while experimenting with alternative specifications",
            rightLang: "Why it matters"
          },
          {
            left: ".gitignore for data and secrets",
            leftLang: "Practice",
            right: "Prevents committing large files and sensitive credentials to the repository",
            rightLang: "Why it matters"
          },
          {
            left: "Pull before push",
            leftLang: "Practice",
            right: "Integrates collaborators' changes and avoids overwriting their work",
            rightLang: "Why it matters"
          }
        ]
      }
    ]
  };

  // =========================================================================
  // TOPIC 3: MACHINE LEARNING (Modules 11-11d)
  // =========================================================================
  window.PRACTICE_EXERCISES.machine_learning = {

    // -----------------------------------------------------------------------
    // BEGINNER (8 exercises)
    // -----------------------------------------------------------------------
    beginner: [
      // 1 - read (Python) — Skill: train/test split
      {
        type: "read",
        title: "Train-Test Split",
        prompt: "What does this code do, and why is test_size=0.2 and random_state=42 specified?",
        lang: "python",
        code: "from sklearn.model_selection import train_test_split\n\nX = df[['income', 'education', 'age']]\ny = df['consumption']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
        options: [
          "Splits data into 80% training and 20% test sets; random_state ensures the same split every time for reproducibility",
          "Splits data into 20% training and 80% test sets randomly each time",
          "Removes 20% of the data as outliers and keeps 80% for analysis",
          "Splits features and target into separate files with 42 random shuffles"
        ],
        correct: 0,
        explanation: "test_size=0.2 holds out 20% of observations for evaluation (the model never trains on these). random_state=42 fixes the random seed so the exact same observations end up in train vs test every time, ensuring reproducible results."
      },
      // 2 - read (Python) — Skill: understanding cross-validation
      {
        type: "read",
        title: "Cross-Validation Purpose",
        prompt: "Why does this code use 5-fold cross-validation instead of a single train-test split?",
        lang: "python",
        code: "from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nscores = cross_val_score(model, X, y, cv=5,\n                         scoring='neg_mean_squared_error')\nprint(f'Mean CV MSE: {-scores.mean():.4f}')",
        options: [
          "Cross-validation trains 5 separate models on different folds, giving a more reliable estimate of out-of-sample performance than a single random split",
          "Cross-validation makes the model 5 times more accurate",
          "Cross-validation is required because LinearRegression cannot use train_test_split",
          "5-fold CV trains on 5% of data and tests on 95%, which is more rigorous"
        ],
        correct: 0,
        explanation: "With 5-fold CV, the data is split 5 ways; each fold serves as the test set once while the other 4 are training data. This reduces the variance of the performance estimate — a single random split might be lucky or unlucky, but averaging over 5 folds is more stable."
      },
      // 3 - bug (Python) — Mistake: not setting random_state (non-reproducible)
      {
        type: "bug",
        title: "Non-Reproducible Split",
        prompt: "A colleague runs this code twice and gets different RMSE values each time. Why?",
        lang: "python",
        code: "from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2)\nmodel = LinearRegression().fit(X_train, y_train)\nrmse = np.sqrt(np.mean((model.predict(X_test) - y_test)**2))\nprint(f'RMSE: {rmse:.4f}')",
        options: [
          "Line 7: LinearRegression needs explicit hyperparameters",
          "Line 8: the RMSE formula is incorrect",
          "Line 5-6: train_test_split is missing random_state, so each run creates a different random split",
          "Line 6: test_size=0.2 is too small for reliable results"
        ],
        correct: 2,
        explanation: "Without random_state, train_test_split uses a different random seed each time, producing different train/test splits and therefore different RMSE values. Setting random_state=42 (or any fixed integer) ensures the same split and reproducible results."
      },
      // 4 - bug (Python) — Mistake: using accuracy on imbalanced classes
      {
        type: "bug",
        title: "Misleading Accuracy",
        prompt: "A classifier for loan default achieves 95% accuracy. The researcher celebrates. What is wrong?",
        lang: "python",
        code: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\n# Data: 95% non-default, 5% default\nmodel = LogisticRegression().fit(X_train, y_train)\ny_pred = model.predict(X_test)\nprint(f'Accuracy: {accuracy_score(y_test, y_pred):.2%}')\n# Output: Accuracy: 95.00%",
        options: [
          "LogisticRegression is the wrong model for binary classification",
          "With 95% non-default, a model predicting \"no default\" for everyone gets 95% accuracy — should use precision, recall, or AUC instead",
          "accuracy_score requires probability predictions, not class labels",
          "The model needs more than two classes to compute accuracy"
        ],
        correct: 1,
        explanation: "When classes are imbalanced (95% vs 5%), accuracy is misleading because a naive \"always predict majority class\" classifier achieves 95%. Use precision (of those predicted default, how many actually defaulted), recall (of actual defaults, how many were caught), or AUC for a meaningful evaluation."
      },
      // 5 - reorder (Python) — Skill: basic ML pipeline
      {
        type: "reorder",
        title: "Basic ML Pipeline",
        prompt: "Arrange these lines into a correct machine learning workflow.",
        lang: "python",
        lines: [
          "from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression",
          "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
          "model = LinearRegression()",
          "model.fit(X_train, y_train)",
          "y_pred = model.predict(X_test)\nrmse = np.sqrt(np.mean((y_pred - y_test)**2))\nprint(f'Test RMSE: {rmse:.4f}')"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "The ML pipeline: import tools, split data into train/test, create the model, train it on training data only, then evaluate on the held-out test data. Training and evaluation must use separate data to get an honest estimate of performance."
      },
      // 6 - reorder (R) — Skill: train/test split in R
      {
        type: "reorder",
        title: "Train-Test Split in R",
        prompt: "Arrange these R lines to split data, train a model, and evaluate it.",
        lang: "r",
        lines: [
          "library(rsample)",
          "set.seed(42)\nsplit <- initial_split(df, prop = 0.8)",
          "train_data <- training(split)\ntest_data <- testing(split)",
          "model <- lm(wage ~ education + experience, data = train_data)",
          "predictions <- predict(model, newdata = test_data)\nrmse <- sqrt(mean((predictions - test_data$wage)^2))\ncat('Test RMSE:', round(rmse, 4))"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Load rsample, set seed for reproducibility, create the split object with 80/20 ratio, extract train and test sets, fit the model on training data only, and evaluate predictions on the test set."
      },
      // 7 - fill (Python) — Skill: Lasso regularization
      {
        type: "fill",
        title: "Lasso Regression",
        prompt: "Fill in the blanks to fit a Lasso regression with regularization strength 0.1.",
        lang: "python",
        codeTemplate: "from sklearn.linear_model import ___GAP1___\n\nmodel = ___GAP1___(alpha=___GAP2___)\nmodel.fit(X_train, y_train)\nprint(f'Non-zero coefficients: {(model.coef_ != 0).sum()}')",
        gaps: {
          "GAP1": { answer: "Lasso", accept: ["Lasso"] },
          "GAP2": { answer: "0.1", accept: ["0.1", "0.10"] }
        },
        explanation: "Lasso regression adds an L1 penalty that can shrink some coefficients exactly to zero, performing automatic feature selection. The alpha parameter controls regularization strength: larger alpha means more penalization and fewer non-zero coefficients."
      },
      // 8 - match — Skill: ML metrics
      {
        type: "match",
        title: "ML Evaluation Metrics",
        prompt: "Match each metric with what it measures.",
        pairs: [
          {
            left: "RMSE (Root Mean Squared Error)",
            leftLang: "Metric",
            right: "Average prediction error in the same units as the outcome variable",
            rightLang: "Measures"
          },
          {
            left: "R-squared",
            leftLang: "Metric",
            right: "Proportion of outcome variance explained by the model",
            rightLang: "Measures"
          },
          {
            left: "AUC (Area Under ROC Curve)",
            leftLang: "Metric",
            right: "How well a classifier distinguishes between classes across all thresholds",
            rightLang: "Measures"
          },
          {
            left: "Recall (Sensitivity)",
            leftLang: "Metric",
            right: "Of all actual positives, the fraction the model correctly identified",
            rightLang: "Measures"
          }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    // INTERMEDIATE (8 exercises)
    // -----------------------------------------------------------------------
    intermediate: [
      // 1 - read (Python) — Skill: feature scaling requirement for Lasso/Ridge
      {
        type: "read",
        title: "Feature Scaling for Regularization",
        prompt: "Why does this code scale features before fitting a Lasso model?",
        lang: "python",
        code: "from sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Lasso\n\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\nmodel = Lasso(alpha=0.1).fit(X_train_scaled, y_train)\ny_pred = model.predict(X_test_scaled)",
        options: [
          "Lasso penalizes coefficients by magnitude, so unscaled features with larger values get penalized more — scaling puts all features on equal footing",
          "StandardScaler makes the model converge faster but does not affect results",
          "Scaling is required because Lasso only accepts values between 0 and 1",
          "Scaling removes outliers that would otherwise bias the Lasso coefficients"
        ],
        correct: 0,
        explanation: "Lasso's L1 penalty is applied equally to all coefficients regardless of scale. If income is in thousands and age is in years, income's coefficient is naturally smaller, making it more likely to survive the penalty. Scaling ensures the penalty treats all features fairly."
      },
      // 2 - read (Python) — Skill: random forest hyperparameters
      {
        type: "read",
        title: "Random Forest Hyperparameters",
        prompt: "What do n_estimators and max_features control in this random forest?",
        lang: "python",
        code: "from sklearn.ensemble import RandomForestRegressor\n\nrf = RandomForestRegressor(\n    n_estimators=500,\n    max_features='sqrt',\n    random_state=42\n)\nrf.fit(X_train, y_train)",
        options: [
          "n_estimators=500 grows 500 trees; max_features='sqrt' means each tree split considers only sqrt(p) features at random, reducing correlation between trees",
          "n_estimators=500 limits each tree to 500 nodes; max_features='sqrt' removes the square root of features",
          "n_estimators=500 uses 500 observations per tree; max_features='sqrt' scales all features by their square root",
          "n_estimators=500 creates 500 cross-validation folds; max_features='sqrt' selects the top sqrt(p) features globally"
        ],
        correct: 0,
        explanation: "Random forests aggregate many decorrelated trees. n_estimators controls how many trees are grown (more is generally better but slower). max_features='sqrt' means at each split, only a random subset of sqrt(p) features is considered, which decorrelates the trees and reduces overfitting."
      },
      // 3 - bug (Python) — Mistake: fitting scaler on full data (data leakage)
      {
        type: "bug",
        title: "Data Leakage Through Scaling",
        prompt: "This code has a subtle but critical data leakage problem. Where is it?",
        lang: "python",
        code: "from sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Lasso\n\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)  # scale ALL data\n\nX_train, X_test = X_scaled[:800], X_scaled[800:]\ny_train, y_test = y[:800], y[800:]\n\nmodel = Lasso(alpha=0.1).fit(X_train, y_train)",
        options: [
          "Line 9: Lasso needs a larger alpha value",
          "Line 5: fit_transform is applied to ALL data before splitting — the scaler learns the mean/std from test data too, leaking test information into training",
          "Line 7: the split should use train_test_split instead of indexing",
          "Line 4: StandardScaler should be MinMaxScaler for Lasso"
        ],
        correct: 1,
        explanation: "Fitting the scaler on all data (including test) means the training features are centered and scaled using information from the test set. This is data leakage — the model indirectly 'sees' test data. The fix: fit scaler on X_train only, then transform both X_train and X_test."
      },
      // 4 - bug (Python) — Mistake: overfitting by tuning on test set
      {
        type: "bug",
        title: "Tuning on the Test Set",
        prompt: "This researcher reports an impressive test RMSE. What methodological error did they make?",
        lang: "python",
        code: "from sklearn.linear_model import Lasso\nimport numpy as np\n\nbest_rmse = float('inf')\nfor alpha in [0.001, 0.01, 0.1, 1.0, 10.0]:\n    model = Lasso(alpha=alpha).fit(X_train, y_train)\n    y_pred = model.predict(X_test)\n    rmse = np.sqrt(np.mean((y_pred - y_test)**2))\n    if rmse < best_rmse:\n        best_rmse = rmse\n        best_alpha = alpha\nprint(f'Best test RMSE: {best_rmse:.4f}')",
        options: [
          "Lasso cannot loop over multiple alpha values",
          "The RMSE calculation is incorrect",
          "Selecting alpha that minimizes test error uses the test set for model selection — this overfits to the test set. Use cross-validation on the training set instead",
          "The alpha values should be evenly spaced, not on a log scale"
        ],
        correct: 2,
        explanation: "The test set must be touched only once for final evaluation. Using it to choose alpha means the reported test RMSE is optimistic — it reflects the best of 5 attempts, not true out-of-sample performance. Use cross-validation on the training set to select alpha, then evaluate once on the test set."
      },
      // 5 - reorder (Python) — Skill: GridSearchCV pipeline
      {
        type: "reorder",
        title: "Hyperparameter Tuning with GridSearchCV",
        prompt: "Arrange these lines to properly tune a Lasso model using cross-validation.",
        lang: "python",
        lines: [
          "from sklearn.linear_model import Lasso\nfrom sklearn.model_selection import GridSearchCV",
          "param_grid = {'alpha': [0.001, 0.01, 0.1, 1.0, 10.0]}",
          "grid_search = GridSearchCV(Lasso(), param_grid,\n                          cv=5, scoring='neg_mean_squared_error')",
          "grid_search.fit(X_train, y_train)",
          "print(f'Best alpha: {grid_search.best_params_}')\nfinal_rmse = np.sqrt(np.mean(\n    (grid_search.predict(X_test) - y_test)**2))\nprint(f'Test RMSE: {final_rmse:.4f}')"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Import, define the parameter grid, create GridSearchCV with 5-fold CV, fit on training data (this tries all alpha values using CV), then use the best model to predict on the test set exactly once. This avoids overfitting to the test set."
      },
      // 6 - reorder (Python) — Skill: proper scaling pipeline
      {
        type: "reorder",
        title: "Correct Scaling Pipeline",
        prompt: "Arrange these lines to properly scale features without data leakage.",
        lang: "python",
        lines: [
          "from sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge",
          "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
          "scaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)",
          "X_test_scaled = scaler.transform(X_test)",
          "model = Ridge(alpha=1.0).fit(X_train_scaled, y_train)\nprint(f'Test R2: {model.score(X_test_scaled, y_test):.4f}')"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Import, split data FIRST, then fit the scaler on training data only (fit_transform), apply the same transformation to test data (transform only — no fitting). Finally train and evaluate. Fitting the scaler on train only prevents data leakage."
      },
      // 7 - fill (Python) — Skill: decision tree with max_depth
      {
        type: "fill",
        title: "Decision Tree Depth Control",
        prompt: "Fill in the blanks to fit a decision tree regressor with a maximum depth of 5 and evaluate it.",
        lang: "python",
        codeTemplate: "from sklearn.tree import ___GAP1___\n\nmodel = ___GAP1___(max_depth=___GAP2___, random_state=42)\nmodel.fit(X_train, y_train)\nprint(f'Test R2: {model.score(X_test, y_test):.4f}')",
        gaps: {
          "GAP1": { answer: "DecisionTreeRegressor", accept: ["DecisionTreeRegressor"] },
          "GAP2": { answer: "5", accept: ["5"] }
        },
        explanation: "DecisionTreeRegressor creates a tree that recursively splits the feature space. max_depth=5 limits the tree to 5 levels, preventing overfitting. Without depth control, the tree can memorize training data perfectly but perform poorly on new data."
      },
      // 8 - match — Skill: regularization concepts
      {
        type: "match",
        title: "Regularization Methods",
        prompt: "Match each regularization method with its key property.",
        pairs: [
          {
            left: "Lasso (L1 penalty)",
            leftLang: "Method",
            right: "Can shrink coefficients exactly to zero, performing feature selection",
            rightLang: "Property"
          },
          {
            left: "Ridge (L2 penalty)",
            leftLang: "Method",
            right: "Shrinks all coefficients toward zero but never sets them exactly to zero",
            rightLang: "Property"
          },
          {
            left: "Higher alpha / lambda",
            leftLang: "Hyperparameter",
            right: "Stronger penalization, simpler model, risk of underfitting",
            rightLang: "Effect"
          },
          {
            left: "Cross-validation for alpha",
            leftLang: "Technique",
            right: "Selects regularization strength that minimizes out-of-sample prediction error",
            rightLang: "Purpose"
          }
        ]
      }
    ],

    // -----------------------------------------------------------------------
    // ADVANCED (8 exercises)
    // -----------------------------------------------------------------------
    advanced: [
      // 1 - read (Python) — Skill: Double/Debiased ML
      {
        type: "read",
        title: "Double/Debiased Machine Learning",
        prompt: "What does DoubleMLPLR do and what are ml_l and ml_m?",
        lang: "python",
        code: "from doubleml import DoubleMLPLR, DoubleMLData\nfrom sklearn.ensemble import RandomForestRegressor\n\ndml_data = DoubleMLData(df, y_col='wage', d_cols='training',\n                        x_cols=['age', 'education', 'experience'])\nml_l = RandomForestRegressor(n_estimators=500)\nml_m = RandomForestRegressor(n_estimators=500)\n\ndml_plr = DoubleMLPLR(dml_data, ml_l, ml_m)\ndml_plr.fit()\nprint(dml_plr.summary)",
        options: [
          "DoubleMLPLR estimates the causal effect of training on wage; ml_l predicts the outcome (wage) and ml_m predicts the treatment (training) — both are nuisance parameters partialled out to debias the treatment effect",
          "DoubleMLPLR runs two random forests and averages their predictions for better accuracy",
          "ml_l and ml_m are the left and middle columns of the data matrix used for estimation",
          "DoubleMLPLR fits a partially linear model where ml_l controls for confounders and ml_m controls for measurement error"
        ],
        correct: 0,
        explanation: "Double ML uses two ML models as nuisance learners: ml_l predicts the outcome Y from controls X, and ml_m predicts the treatment D from controls X. By partialling out both, the method estimates the causal effect of D on Y while allowing flexible functional forms for confounders."
      },
      // 2 - read (R) — Skill: causal forests
      {
        type: "read",
        title: "Causal Forest for Heterogeneous Effects",
        prompt: "What does this causal forest estimate and how does it differ from a standard random forest?",
        lang: "r",
        code: "library(grf)\n\ncf <- causal_forest(\n    X = as.matrix(df[, c('age', 'education', 'income')]),\n    Y = df$wage,\n    W = df$training,\n    num.trees = 2000\n)\ntau_hat <- predict(cf)$predictions\nhist(tau_hat, main = 'Distribution of Treatment Effects')",
        options: [
          "It estimates individual-level causal treatment effects (CATEs) of training on wage — unlike a standard random forest, it targets the treatment effect rather than the outcome level",
          "It predicts wage using training as a feature, just like a standard random forest",
          "It removes confounding by running a random forest within each treatment group separately",
          "It estimates the average treatment effect only, not heterogeneous effects"
        ],
        correct: 0,
        explanation: "A causal forest from grf estimates Conditional Average Treatment Effects (CATEs) — how the effect of training on wage varies across individuals with different characteristics. Unlike prediction forests that estimate E[Y|X], causal forests estimate E[Y(1)-Y(0)|X], the treatment effect function."
      },
      // 3 - bug (Python) — Mistake: not scaling features before Lasso
      {
        type: "bug",
        title: "Unscaled Lasso Regression",
        prompt: "This Lasso model keeps only the income variable and drops education. The researcher concludes education does not matter. What went wrong?",
        lang: "python",
        code: "from sklearn.linear_model import Lasso\n\n# income in dollars (mean ~50000), education in years (mean ~14)\nmodel = Lasso(alpha=1.0).fit(X_train, y_train)\nprint('Coefficients:', dict(zip(features, model.coef_)))\n# Output: income: 0.0003, education: 0.0, age: 0.0",
        options: [
          "Lasso cannot handle more than two features",
          "Alpha=1.0 is always too strong for any dataset",
          "Features were not scaled — income's large scale makes its coefficient tiny, so the penalty hits education (small scale, larger coefficient) harder. Need StandardScaler first",
          "Lasso dropped education because it is truly uncorrelated with the outcome"
        ],
        correct: 2,
        explanation: "Lasso penalizes the absolute sum of coefficients. Without scaling, income (mean ~50000) has a tiny coefficient to compensate for its large values, while education (mean ~14) has a larger coefficient. The penalty disproportionately shrinks education to zero. Always scale features before Lasso/Ridge."
      },
      // 4 - bug (Python) — Mistake: confusing prediction with causal interpretation
      {
        type: "bug",
        title: "Prediction vs Causation",
        prompt: "A researcher makes a policy recommendation based on this analysis. What is the flaw?",
        lang: "python",
        code: "from sklearn.ensemble import RandomForestRegressor\n\nrf = RandomForestRegressor(n_estimators=500, random_state=42)\nrf.fit(X_train, y_train)\nprint(f'Test R2: {rf.score(X_test, y_test):.4f}')  # 0.85\n\n# Feature importance shows education is most important\n# Policy recommendation: \"Increasing education by\n#   1 year will raise wages by $5,200\"",
        options: [
          "Random forests cannot compute feature importance",
          "Test R-squared of 0.85 indicates overfitting",
          "Feature importance measures predictive value, not causal effect — education may correlate with unobserved ability. Need causal ML (DML, causal forests) or an experiment for causal claims",
          "The random forest needs more than 500 trees for reliable importance"
        ],
        correct: 2,
        explanation: "Prediction models identify correlations, not causal effects. High importance of education in a random forest means it is useful for prediction, but this could be driven by confounders like ability or family background. Policy recommendations require causal methods (DML, IV, RCTs), not just predictive accuracy."
      },
      // 5 - reorder (Python) — Skill: Double ML pipeline
      {
        type: "reorder",
        title: "Double ML Estimation Pipeline",
        prompt: "Arrange these lines to estimate a causal treatment effect using Double ML.",
        lang: "python",
        lines: [
          "from doubleml import DoubleMLPLR, DoubleMLData\nfrom sklearn.ensemble import RandomForestRegressor",
          "dml_data = DoubleMLData(df, y_col='wage', d_cols='training',\n                        x_cols=['age', 'education', 'experience'])",
          "ml_l = RandomForestRegressor(n_estimators=500, random_state=42)\nml_m = RandomForestRegressor(n_estimators=500, random_state=42)",
          "dml_plr = DoubleMLPLR(dml_data, ml_l, ml_m, n_folds=5)",
          "dml_plr.fit()\nprint(dml_plr.summary)"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Import the packages, structure the data (specifying outcome, treatment, and controls), define the two nuisance ML models (for outcome and treatment prediction), create the DML object with cross-fitting folds, and fit. The summary reports the debiased treatment effect with valid standard errors."
      },
      // 6 - reorder (Python) — Skill: full pipeline with scaling, CV, and evaluation
      {
        type: "reorder",
        title: "Complete Regularized Pipeline",
        prompt: "Arrange these lines for a complete Lasso pipeline with scaling, CV tuning, and honest evaluation.",
        lang: "python",
        lines: [
          "from sklearn.linear_model import LassoCV\nfrom sklearn.preprocessing import StandardScaler",
          "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
          "scaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)",
          "model = LassoCV(cv=5, random_state=42).fit(X_train_s, y_train)\nprint(f'Best alpha: {model.alpha_:.4f}')",
          "y_pred = model.predict(X_test_s)\nrmse = np.sqrt(np.mean((y_pred - y_test)**2))\nprint(f'Test RMSE: {rmse:.4f}')"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Import, split data, scale using train stats only (fit_transform on train, transform on test), tune alpha with LassoCV using 5-fold CV on training data, and evaluate once on the test set. This avoids both data leakage (scaling) and overfitting to the test set (CV for tuning)."
      },
      // 7 - fill (R) — Skill: causal forest in R
      {
        type: "fill",
        title: "Causal Forest in R",
        prompt: "Fill in the blanks to estimate heterogeneous treatment effects with a causal forest.",
        lang: "r",
        codeTemplate: "library(___GAP1___)\n\ncf <- causal_forest(\n    X = as.matrix(df[, c('age', 'education', 'income')]),\n    Y = df$wage,\n    W = df$___GAP2___,\n    num.trees = 2000\n)\naverage_treatment_effect(cf)",
        gaps: {
          "GAP1": { answer: "grf", accept: ["grf"] },
          "GAP2": { answer: "training", accept: ["training", "treatment", "treated"] }
        },
        explanation: "The grf package provides causal_forest(). X contains the covariates, Y is the outcome, and W is the binary treatment indicator. average_treatment_effect() computes the ATE with a valid confidence interval, while predict() gives individual-level treatment effects."
      },
      // 8 - match — Skill: ML vs causal ML
      {
        type: "match",
        title: "Prediction ML vs Causal ML",
        prompt: "Match each method with its appropriate research question.",
        pairs: [
          {
            left: "Random Forest / Lasso (prediction ML)",
            leftLang: "Method",
            right: "Which applicants are most likely to default on a loan?",
            rightLang: "Research question"
          },
          {
            left: "Double/Debiased ML (DoubleMLPLR)",
            leftLang: "Method",
            right: "What is the causal effect of a job training program on wages, controlling flexibly for confounders?",
            rightLang: "Research question"
          },
          {
            left: "Causal Forest (grf)",
            leftLang: "Method",
            right: "For whom is the job training program most effective — does the effect vary by age or education?",
            rightLang: "Research question"
          },
          {
            left: "Cross-validated Lasso for variable selection",
            leftLang: "Method",
            right: "Which of 200 candidate predictors are most useful for forecasting GDP growth?",
            rightLang: "Research question"
          }
        ]
      }
    ]
  };

})();
