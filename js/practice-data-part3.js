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
        hint: "Look at the <code>cov_type</code> argument passed to <code>.fit()</code>. What does <code>HC1</code> stand for in the context of standard errors?",
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
        hint: "The <code>, robust</code> option changes how standard errors are computed. Think about whether it affects the coefficients themselves or only the uncertainty around them.",
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
      // 3 - bug (R) — Mistake: using classical SEs when robust is needed
      {
        type: "bug",
        title: "Ignoring Heteroskedasticity in R",
        prompt: "A researcher finds strong heteroskedasticity in the residuals but runs this code. What is the problem?",
        hint: "The researcher already knows there is heteroskedasticity. Look at how <code>summary()</code> computes standard errors by default — does it account for heteroskedasticity?",
        lang: "r",
        code: "model <- lm(consumption ~ income + age, data = df)\nsummary(model)",
        options: [
          "Line 1: lm() cannot handle multiple regressors",
          "Line 2: summary() reports classical SEs, ignoring the heteroskedasticity — should use coeftest(model, vcov = vcovHC(model, type = \"HC1\"))",
          "Line 1: the formula should use consumption ~ income * age for interaction",
          "Line 2: summary() does not display standard errors"
        ],
        correct: 1,
        explanation: "When heteroskedasticity is present, classical standard errors from summary(lm()) are biased. The fix is to use the sandwich and lmtest packages: coeftest(model, vcov = vcovHC(model, type = 'HC1')) computes robust standard errors without changing the coefficient estimates."
      },
      // 4 - bug (Stata) — Mistake: interpreting logit coefficients as probability changes
      {
        type: "bug",
        title: "Logit Coefficient Interpretation",
        prompt: "A researcher estimates a logit and interprets the results. What mistake did they make?",
        hint: "In a logit model, coefficients are expressed in <b>log-odds</b>, not probabilities. Can you interpret 0.35 directly as a percentage-point change?",
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
        hint: "Start by loading the required packages (<code>sandwich</code> and <code>lmtest</code>), then fit the model, and finally display robust results.",
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
        hint: "Run the classical regression first, store it, then run the robust version and store it. The comparison table comes last.",
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
        prompt: "Fill in the blanks to fit OLS with the standard robust variance estimator (the one with small-sample correction). Type the OLS model class name in GAP1 and the HC variant code in GAP2.",
        hint: "GAP1: The statsmodels class for ordinary least squares is three uppercase letters.<br>GAP2: The HC variant with small-sample correction is <code>HC</code> followed by one digit.",
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
        hint: "Look for commands that perform the same task (e.g., fitting with robust SEs, panel FE with robust SEs) but in different languages. The language labels on each side will help.",
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
      // 1 - read (R) — Skill: clustered SEs
      {
        type: "read",
        title: "Clustered Standard Errors in R",
        prompt: "Why does this code use clustered standard errors instead of just robust?",
        hint: "Notice the <code>cluster = firm_panel$firm_id</code> argument. Think about what happens when workers within the same firm share unobserved characteristics.",
        lang: "r",
        code: "library(sandwich)\nlibrary(lmtest)\n\nmodel <- lm(wage ~ education + experience, data = firm_panel)\ncoeftest(model, vcov = vcovCL(model, cluster = firm_panel$firm_id))",
        options: [
          "Because observations within the same firm may have correlated errors, and clustering accounts for this within-group correlation",
          "Because clustering makes the coefficient estimates more efficient",
          "Because clustering is required whenever you have panel data",
          "Because robust standard errors cannot be computed with more than two regressors"
        ],
        correct: 0,
        explanation: "Clustered SEs (via vcovCL from the sandwich package) allow for arbitrary correlation of errors within each cluster (firm). If workers at the same firm share unobserved characteristics, their errors are correlated, and ignoring this understates standard errors. You need roughly 30+ clusters for reliable inference."
      },
      // 2 - read (Python) — Skill: panel FE absorbs time-invariant variables
      {
        type: "read",
        title: "Fixed Effects and Time-Invariant Variables",
        prompt: "A researcher runs this panel regression. Why is the gender variable absent from the output?",
        hint: "Entity fixed effects demean each variable within each individual. If a variable <b>never changes</b> over time for a person, what happens after demeaning?",
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
        hint: "Cluster-robust standard errors rely on asymptotic theory as the number of clusters grows large. How many clusters does this study have, and is that enough?",
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
        hint: "Logit coefficients are in <b>log-odds</b> units. Can you convert 0.42 directly to a percentage change in probability?",
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
        hint: "Start with imports and seed, then initialize storage, run the bootstrap loop, and finally compute the standard deviation of the collected coefficients.",
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
      // 6 - reorder (R) — Skill: panel FE with clustering using fixest
      {
        type: "reorder",
        title: "Panel Fixed Effects with Clustering in R",
        prompt: "Arrange these R lines to estimate entity and time fixed effects with clustered standard errors.",
        hint: "Load the package first, then the data, then estimate the model with <code>feols()</code>, and finally display and export results.",
        lang: "r",
        lines: [
          "library(fixest)",
          "firm_panel <- read.csv(\"firm_panel.csv\")",
          "model <- feols(revenue ~ rd_spending + employees | firm_id + year,\n               vcov = ~firm_id, data = firm_panel)",
          "summary(model)",
          "etable(model, se = \"cluster\")"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "First load the fixest package and the data. Then estimate entity and time FE using the | syntax, with firm-clustered SEs via vcov = ~firm_id. Display the summary and export a formatted table with etable()."
      },
      // 7 - fill (Stata) — Skill: logit marginal effects
      {
        type: "fill",
        title: "Logit with Marginal Effects",
        prompt: "Fill in the blanks to estimate a logit model and compute average marginal effects in Stata. Type the estimation command in GAP1 and the post-estimation command in GAP2.",
        hint: "GAP1: The Stata command for logistic regression that reports log-odds coefficients.<br>GAP2: The Stata post-estimation command that computes average marginal effects.",
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
        hint: "Match commands that add the same type of fixed effects (entity-only, entity + clustered SEs, two-way FE). The language labels will help you identify equivalent operations.",
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
      // 1 - read (R) — Skill: two-way clustering
      {
        type: "read",
        title: "Two-Way Clustered Standard Errors in R",
        prompt: "What does the vcov argument accomplish in this code?",
        hint: "Notice the <code>vcov = ~firm_id + year</code> syntax with a <b>plus sign</b> between two variables. This allows for correlation along two separate dimensions.",
        lang: "r",
        code: "library(fixest)\n\nmodel <- feols(revenue ~ rd_spending + employees | firm_id,\n               vcov = ~firm_id + year, data = df)",
        options: [
          "It clusters standard errors by both firm and year, allowing for correlation within firms and within time periods simultaneously",
          "It runs two separate regressions, one for each cluster dimension",
          "It adds both firm and year fixed effects to the model",
          "It applies the bootstrap separately within each firm-year cell"
        ],
        correct: 0,
        explanation: "Two-way clustering (vcov = ~firm_id + year) allows errors to be correlated both within firms (across time) and within years (across firms). This is important when shocks affect all firms in a year (macro shocks) and persist within firms over time. fixest handles multi-way clustering natively."
      },
      // 2 - read (Stata) — Skill: wild bootstrap for few clusters
      {
        type: "read",
        title: "Wild Cluster Bootstrap",
        prompt: "Why does this researcher use wild cluster bootstrap instead of standard clustered SEs?",
        hint: "Check how many states (clusters) are in the sample. Standard clustered SEs need roughly 30+ clusters to be reliable.",
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
        hint: "Look at what unit is being resampled in the bootstrap loop. Is it individual observations or entire clusters (firms)?",
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
        hint: "Compare the options after the <code>regress</code> commands in Model 1 and Model 2. Are they using the same type of standard errors?",
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
        hint: "Start with the import, then set the panel index, specify the model with both entity and time effects, fit it, and print results last.",
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
        hint: "Load the data first, set the seed for reproducibility, then run the bootstrap command, and finally inspect the results.",
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
        prompt: "Fill in the blanks to estimate a two-way fixed effects model with firm-clustered SEs using the fixest package in R. Type the fixest estimation function in GAP1 and the clustering variable in GAP2.",
        hint: "GAP1: The fixest function for OLS with fixed effects (short for 'fixed-effects OLS').<br>GAP2: The variable to cluster on — look at the fixed effects in the formula for a clue.",
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
        hint: "Think about the data structure each method is designed for: cross-sectional, grouped with many clusters, grouped with few clusters, or panel data.",
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
      // 1 - read (Python) — Skill: reading master script pattern
      {
        type: "read",
        title: "Master Script Pattern in Python",
        prompt: "What is the purpose of defining ROOT at the top of this Python master script?",
        hint: "Think about what happens when a collaborator clones this project on a different computer. How many lines would they need to change?",
        lang: "python",
        code: "# master.py\nimport os\nimport subprocess\n\nROOT = \"/Users/maria/projects/wage_study\"\n\nfor script in ['01_import.py', '02_clean.py',\n               '03_analysis.py', '04_tables.py']:\n    subprocess.run(['python', os.path.join(ROOT, 'code', script)],\n                   check=True)",
        options: [
          "So that each collaborator only needs to change one line (the ROOT path) to run the entire project on their machine",
          "Because Python requires all paths to be absolute",
          "To prevent Python from overwriting files accidentally",
          "To make the code run faster by caching the path"
        ],
        correct: 0,
        explanation: "The master script pattern uses one absolute path at the top, then all other references are relative to that root via os.path.join(). When a collaborator clones the project, they change only the ROOT line and everything works. This is the cornerstone of portable replication."
      },
      // 2 - read (R) — Skill: portable paths with here package
      {
        type: "read",
        title: "Portable Paths with here() in R",
        prompt: "What advantage does the here() function provide in this R script?",
        hint: "The <code>here()</code> function automatically finds the project root (where <code>.Rproj</code> or <code>.here</code> lives). How does this help collaborators?",
        lang: "r",
        code: "library(here)\n\nraw_data <- read.csv(here(\"data\", \"raw\", \"survey.csv\"))\n\nclean_data <- raw_data[raw_data$age >= 18, ]\n\nwrite.csv(clean_data,\n          here(\"data\", \"processed\", \"survey_clean.csv\"),\n          row.names = FALSE)",
        options: [
          "here() builds paths relative to the project root (where .Rproj or .here lives), so the code works on any machine without changing paths",
          "here() makes the code run faster by caching file paths",
          "here() automatically creates missing directories",
          "here() is required by R to read CSV files"
        ],
        correct: 0,
        explanation: "The here package finds the project root (marked by .Rproj, .here, or .git) and builds all paths relative to it. This means collaborators never need to edit file paths — here('data', 'raw', 'survey.csv') resolves correctly on any machine where the project is cloned."
      },
      // 3 - bug (general) — Mistake: absolute paths in shared code
      {
        type: "bug",
        title: "Non-Portable Paths",
        prompt: "A student shares their project with a collaborator who cannot run the code. What is wrong?",
        hint: "Look at the file paths in the <code>use</code> and <code>save</code> commands. Would these paths exist on someone else's computer?",
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
      // 4 - bug (Python) — Mistake: modifying raw data
      {
        type: "bug",
        title: "Overwriting Raw Data",
        prompt: "This cleaning script has a critical error in its approach to data management. What is it?",
        hint: "Compare the file path in <code>pd.read_csv()</code> with the path in <code>df.to_csv()</code>. Where is the cleaned data being saved?",
        lang: "python",
        code: "# 02_clean.py\nimport pandas as pd\nimport os\n\nROOT = os.environ.get('PROJECT_ROOT', '.')\ndf = pd.read_csv(os.path.join(ROOT, 'data', 'raw', 'census.csv'))\ndf = df[df['age'] >= 18]\ndf.loc[df['income'] < 0, 'income'] = None\ndf.to_csv(os.path.join(ROOT, 'data', 'raw', 'census.csv'), index=False)",
        options: [
          "Line 7: filtering with df['age'] >= 18 should use .query() instead",
          "Line 8: replacing negative incomes with None is bad practice",
          "Line 9: saving back to data/raw/ overwrites the original data — should save to data/processed/",
          "Line 6: os.path.join is unnecessary — should use string concatenation"
        ],
        correct: 2,
        explanation: "Saving processed data back into the raw/ folder destroys the original dataset. If something goes wrong in cleaning, you cannot recover. Always save cleaned data to data/processed/ and keep raw data untouched. This is a fundamental replicability principle."
      },
      // 5 - reorder (R) — Skill: creating project directory structure
      {
        type: "reorder",
        title: "Setting Up a Reproducible R Project",
        prompt: "Arrange these R lines to create a standard project folder structure programmatically.",
        hint: "Load the package first, define the directories, create them, then confirm. The <code>here()</code> function is used to make paths portable.",
        lang: "r",
        lines: [
          "library(here)",
          "dirs <- c('data/raw', 'data/processed', 'code', 'output/tables', 'output/figures')",
          "for (d in dirs) dir.create(here(d), recursive = TRUE, showWarnings = FALSE)",
          "cat('Project structure created at:', here(), '\\n')"
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: "Load the here package for portable paths, define the standard directory structure (raw data, processed data, code, output), create all directories recursively, and confirm. This ensures every collaborator has the same folder layout when setting up the project."
      },
      // 6 - reorder (Stata) — Skill: numbered script execution
      {
        type: "reorder",
        title: "Numbered Script Pipeline",
        prompt: "Arrange these do-files in the correct execution order for a research project.",
        hint: "Follow the numbered prefixes: data must be imported before it can be cleaned, cleaned before analysis, and analysis before exporting tables.",
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
      // 7 - fill (Python) — Skill: programmatic .gitignore creation
      {
        type: "fill",
        title: "Creating a .gitignore with Python",
        prompt: "Fill in the blanks to create a .gitignore file that excludes data and secret files from version control. Type the pattern for secret environment files in GAP1 and the output filename in GAP2.",
        hint: "GAP1: The standard filename for environment variable / secret files starts with a dot.<br>GAP2: The Git configuration file that specifies which files to ignore also starts with a dot.",
        lang: "python",
        codeTemplate: "from pathlib import Path\n\nignore_patterns = [\n    '*.dta',\n    '*.csv',\n    'data/raw/',\n    '___GAP1___',\n    '*.log'\n]\n\nPath('___GAP2___').write_text('\\n'.join(ignore_patterns))\nprint('.gitignore created')",
        gaps: {
          "GAP1": { answer: ".env", accept: [".env", "*.env"] },
          "GAP2": { answer: ".gitignore", accept: [".gitignore"] }
        },
        explanation: "The .gitignore file tells Git which files to exclude from version control. .env files contain secrets (API keys) and should never be committed. Writing the .gitignore programmatically ensures every collaborator starts with the same exclusion rules when setting up the project."
      },
      // 8 - match — Skill: Git three states
      {
        type: "match",
        title: "Git Concepts",
        prompt: "Match each Git concept with its description.",
        hint: "Think about the lifecycle of a file change: it starts in your working directory, gets staged with <code>git add</code>, and becomes permanent with <code>git commit</code>.",
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
        hint: "The <code>log using</code> command captures all Stata output to a file. Think about what a reviewer could do with this file without re-running the code.",
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
      // 2 - read (R) — Skill: version-pinning with renv
      {
        type: "read",
        title: "Reproducible R Environments with renv",
        prompt: "What does this renv workflow accomplish for reproducibility?",
        hint: "Look at what <code>renv::snapshot()</code> and <code>renv::restore()</code> do. Think about what happens when a package gets updated and changes its behavior.",
        lang: "r",
        code: "# Set up renv for the project\nrenv::init()\n\n# Install packages as usual\ninstall.packages(\"fixest\")\ninstall.packages(\"sandwich\")\n\n# Save the exact package versions to a lockfile\nrenv::snapshot()\n\n# A collaborator restores the same versions:\nrenv::restore()",
        options: [
          "renv records exact package versions in a lockfile so collaborators install the same versions, ensuring code runs identically across machines",
          "renv makes R packages run faster by caching them locally",
          "renv is required by R to install packages from CRAN",
          "renv automatically updates all packages to the latest version"
        ],
        correct: 0,
        explanation: "renv creates a project-local library and a lockfile (renv.lock) recording every package version. When a collaborator runs renv::restore(), they get exactly the same package versions. This prevents the common problem of code breaking because a package update changed function behavior."
      },
      // 3 - bug (Python) — Mistake: hardcoded paths in shared code
      {
        type: "bug",
        title: "Hardcoded Paths in Python",
        prompt: "A collaborator cannot run this Python script. What is wrong?",
        hint: "Look at the strings passed to <code>pd.read_csv()</code> and <code>df.to_csv()</code>. Would these file paths work on a Mac, Linux, or a different Windows user's machine?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.read_csv('C:/Users/marco/Desktop/thesis/data/raw/survey.csv')\ndf = df[df['year'] >= 2010]\ndf.to_csv('C:/Users/marco/Desktop/thesis/data/processed/survey_clean.csv',\n          index=False)",
        options: [
          "Line 3: pd.read_csv cannot handle CSV files",
          "Lines 3 and 5 use absolute paths specific to Marco's Windows computer — should use os.path.join() with a configurable root or pathlib.Path",
          "Line 4: filtering by year should use .query() instead",
          "Line 5: index=False should not be used with to_csv()"
        ],
        correct: 1,
        explanation: "Absolute paths like C:/Users/marco/... only work on Marco's machine. The fix is to define a ROOT variable (or use pathlib) and build all paths relative to it: ROOT / 'data' / 'raw' / 'survey.csv'. This way collaborators only change the root path to run the project."
      },
      // 4 - bug (Stata) — Mistake: manual copy-paste of results
      {
        type: "bug",
        title: "Manual Result Reporting",
        prompt: "This workflow has a replicability flaw. What is it?",
        hint: "Look at how the regression coefficient gets from Stata into the LaTeX file. Is this process automated or manual?",
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
      // 5 - reorder (R) — Skill: automated table export for reproducibility
      {
        type: "reorder",
        title: "Automated Table Export in R",
        prompt: "Arrange these R lines to run a regression and export a reproducible LaTeX table.",
        hint: "Load packages first, then estimate the model, export the table, and confirm. The <code>etable()</code> function from fixest handles the export.",
        lang: "r",
        lines: [
          "library(fixest)\nlibrary(here)",
          "model <- feols(wage ~ education + experience | firm_id,\n               data = df)",
          "etable(model, tex = TRUE,\n       file = here('output', 'tables', 'regression.tex'))",
          "cat('Table exported to:', here('output', 'tables', 'regression.tex'))"
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: "Load packages (fixest for estimation, here for portable paths), run the regression with fixed effects, export the LaTeX table directly with etable(). This pipeline is fully reproducible — re-running the script regenerates the exact same table from data."
      },
      // 6 - reorder (Python) — Skill: table export for reproducibility
      {
        type: "reorder",
        title: "Automated Table Export in Python",
        prompt: "Arrange these lines to run regressions and export a reproducible LaTeX table.",
        hint: "Import libraries first, then run the regression, create the Stargazer table, and write it to a file.",
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
      // 7 - fill (R) — Skill: seed setting for reproducible analysis
      {
        type: "fill",
        title: "Reproducible Random Sampling in R",
        prompt: "Fill in the blanks to ensure this bootstrap procedure gives identical results every time. Type the R seed-setting function in GAP1 and the function to compute standard deviation in GAP2.",
        hint: "GAP1: The R function to fix the random number generator seed is <code>set.</code> followed by the word for a starting value.<br>GAP2: The R function for standard deviation is two lowercase letters.",
        lang: "r",
        codeTemplate: "___GAP1___(42)\n\nboot_coefs <- replicate(1000, {\n  idx <- sample(nrow(df), replace = TRUE)\n  boot_df <- df[idx, ]\n  coef(lm(wage ~ education, data = boot_df))[2]\n})\n\nboot_se <- ___GAP2___(boot_coefs)\ncat('Bootstrap SE:', round(boot_se, 4))",
        gaps: {
          "GAP1": { answer: "set.seed", accept: ["set.seed"] },
          "GAP2": { answer: "sd", accept: ["sd"] }
        },
        explanation: "set.seed(42) ensures the random number generator produces the same sequence every time, making bootstrap results reproducible. sd() computes the standard deviation of the bootstrapped coefficients, which is the bootstrap standard error."
      },
      // 8 - match — Skill: replicability best practices
      {
        type: "match",
        title: "Replicability Best Practices",
        prompt: "Match each replicability problem with its solution.",
        hint: "Each problem is caused by a specific bad practice. Think about what <b>single change</b> would fix each issue (portable paths, numbered scripts, automated export, or data separation).",
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
      // 1 - read (Python) — Skill: virtual environments for reproducibility
      {
        type: "read",
        title: "Virtual Environments for Reproducibility",
        prompt: "What does this workflow accomplish for research reproducibility?",
        hint: "Notice the <code>==</code> syntax in requirements.txt (e.g., <code>pandas==2.1.4</code>). What happens if a collaborator installs a newer version of a package that changed its behavior?",
        lang: "python",
        code: "# Terminal commands embedded in Python project README:\n# 1. Create environment\n# python -m venv .venv\n# source .venv/bin/activate\n\n# 2. Install pinned dependencies\n# pip install -r requirements.txt\n\n# requirements.txt contains:\n# pandas==2.1.4\n# statsmodels==0.14.1\n# scikit-learn==1.3.2\n# numpy==1.26.2",
        options: [
          "Pinning exact package versions in requirements.txt ensures every collaborator uses identical library versions, preventing results from changing due to package updates",
          "Virtual environments make Python code run faster by isolating the interpreter",
          "The requirements.txt file is only needed for publishing packages to PyPI",
          "Virtual environments prevent Python from accessing the internet"
        ],
        correct: 0,
        explanation: "Pinning package versions (pandas==2.1.4) ensures that code produces the same results months or years later. Without version pinning, a collaborator might install a newer version of statsmodels that computes standard errors differently, silently changing results."
      },
      // 2 - read (Stata) — Skill: path management with globals
      {
        type: "read",
        title: "Portable Path Management",
        prompt: "Why does this master script define multiple global macros for subdirectories?",
        hint: "Look at how <code>$data</code>, <code>$code</code>, and <code>$output</code> are derived from <code>$root</code>. How many lines need changing when a collaborator sets up the project?",
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
      // 3 - bug (R) — Mistake: non-portable path in R script
      {
        type: "bug",
        title: "Non-Portable R Script",
        prompt: "A collaborator cannot run this R analysis script. What is wrong?",
        hint: "Look at the strings in <code>read_csv()</code> and <code>write_csv()</code>. Do they contain paths specific to one user's machine?",
        lang: "r",
        code: "library(tidyverse)\n\ndf <- read_csv(\"/Users/maria/Desktop/thesis/data/raw/survey.csv\")\n\ndf_clean <- df %>%\n  filter(age >= 18) %>%\n  mutate(log_income = log(income + 1))\n\nwrite_csv(df_clean,\n          \"/Users/maria/Desktop/thesis/data/processed/survey_clean.csv\")",
        options: [
          "Line 3: read_csv cannot handle CSV files on macOS",
          "Lines 3 and 9 use absolute paths specific to Maria's computer — should use here::here() for portable project-relative paths",
          "Line 6: filter() should use subset() instead in R",
          "Line 7: log() cannot be used inside mutate()"
        ],
        correct: 1,
        explanation: "Absolute paths like /Users/maria/... only work on Maria's machine. The fix is to use the here package: read_csv(here('data', 'raw', 'survey.csv')). The here() function finds the project root automatically, so any collaborator can run the script without editing paths."
      },
      // 4 - bug (Stata) — Mistake: non-reproducible pipeline (missing dependencies)
      {
        type: "bug",
        title: "Broken Pipeline Dependency",
        prompt: "A reviewer runs the master script and gets an error on 03_analysis.do. The researcher says it works on their machine. What is wrong?",
        hint: "Look carefully at the master script. Is every numbered script being executed? Check for any commented-out lines.",
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
      // 5 - reorder (Python) — Skill: reproducible pipeline with Makefile-style script
      {
        type: "reorder",
        title: "Reproducible Pipeline in Python",
        prompt: "Arrange these Python lines to create a master script that runs the full analysis pipeline.",
        hint: "Start with imports, define ROOT relative to the script's location, list the numbered scripts, execute them in order, and print a completion message.",
        lang: "python",
        lines: [
          "import subprocess\nfrom pathlib import Path",
          "ROOT = Path(__file__).parent",
          "scripts = ['01_import.py', '02_clean.py',\n           '03_analysis.py', '04_tables.py']",
          "for script in scripts:\n    result = subprocess.run(\n        ['python', ROOT / 'code' / script], check=True)\n    print(f'Completed: {script}')",
          "print('Full pipeline finished successfully.')"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Import tools, define the project root relative to the script location (making it portable), list the numbered scripts in order, execute each sequentially with check=True (so it stops on errors), and confirm completion. This ensures the entire pipeline runs from raw data to results."
      },
      // 6 - reorder (Stata) — Skill: complete reproducible workflow
      {
        type: "reorder",
        title: "Full Reproducible Master Script",
        prompt: "Arrange these lines into a complete, reproducible master script.",
        hint: "Define the root path first, then open the log file, execute the numbered scripts in order, and close the log at the end.",
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
      // 7 - fill (R) — Skill: writing a portable R analysis script
      {
        type: "fill",
        title: "Portable R Project Setup",
        prompt: "Fill in the blanks to create a portable R script that reads data and exports results using project-relative paths. Type the R package name for portable paths in GAP1 and the path-building function in GAP2.",
        hint: "Both blanks use the same R package/function that builds paths relative to the project root. It rhymes with 'there'.",
        lang: "r",
        codeTemplate: "library(___GAP1___)\nlibrary(fixest)\n\ndf <- read.csv(here('data', 'processed', 'panel.csv'))\nmodel <- feols(wage ~ education | firm_id, data = df)\n\netable(model, tex = TRUE,\n       file = ___GAP2___('output', 'tables', 'results.tex'))",
        gaps: {
          "GAP1": { answer: "here", accept: ["here"] },
          "GAP2": { answer: "here", accept: ["here"] }
        },
        explanation: "The here package finds the project root (marked by .Rproj or .here) and builds all paths relative to it. Using here() for both reading data and exporting tables means the script works on any machine without editing paths — a core requirement for reproducible research."
      },
      // 8 - match — Skill: Git workflow concepts
      {
        type: "match",
        title: "Git Workflow for Research",
        prompt: "Match each Git practice with the reason it matters for research replicability.",
        hint: "Think about how each practice contributes to reproducibility: tracking decisions, isolating experiments, protecting sensitive data, or coordinating with collaborators.",
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
        hint: "Look at the <code>train_test_split</code> function. <code>test_size=0.2</code> controls the proportion held out, and <code>random_state</code> fixes the randomness.",
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
      // 2 - read (Stata) — Skill: understanding train/test split
      {
        type: "read",
        title: "Train-Test Split in Stata",
        prompt: "What does this Stata code do, and why is the seed set before splitting?",
        hint: "The <code>set seed</code> command ensures reproducibility. Then <code>runiform()</code> assigns random numbers used to split the data. Look at the proportion in the <code>gen train</code> line.",
        lang: "stata",
        code: "set seed 42\ngen sample = runiform()\nsort sample\ngen train = (_n <= int(0.8 * _N))\n\nreg consumption income education age if train == 1\npredict yhat\ngen sq_err = (consumption - yhat)^2 if train == 0\nsum sq_err if train == 0",
        options: [
          "Splits data into 80% training and 20% test sets using a random number; set seed 42 ensures the same split every time for reproducibility",
          "Splits data into 20% training and 80% test sets randomly each time",
          "Removes 20% of the data as outliers and keeps 80% for analysis",
          "Creates 42 random samples and averages the results"
        ],
        correct: 0,
        explanation: "set seed 42 fixes the random number generator. gen sample = runiform() assigns a random number to each observation, and after sorting, the first 80% become the training set. The regression is fit only on training data (if train == 1), and prediction errors are evaluated on the held-out test set."
      },
      // 3 - bug (R) — Mistake: not setting seed (non-reproducible)
      {
        type: "bug",
        title: "Non-Reproducible Split in R",
        prompt: "A colleague runs this code twice and gets different RMSE values each time. Why?",
        hint: "The code uses <code>initial_split()</code> which involves randomness. Is there a <code>set.seed()</code> call before it?",
        lang: "r",
        code: "library(rsample)\n\nsplit <- initial_split(df, prop = 0.8)\ntrain_data <- training(split)\ntest_data <- testing(split)\n\nmodel <- lm(consumption ~ income + education + age, data = train_data)\npredictions <- predict(model, newdata = test_data)\nrmse <- sqrt(mean((predictions - test_data$consumption)^2))\ncat('RMSE:', round(rmse, 4))",
        options: [
          "Line 7: lm() needs explicit hyperparameters",
          "Line 9: the RMSE formula is incorrect",
          "Line 3: initial_split is missing set.seed() before it, so each run creates a different random split",
          "Line 3: prop = 0.8 is too large for reliable results"
        ],
        correct: 2,
        explanation: "Without set.seed() before initial_split(), R uses a different random seed each time, producing different train/test splits and therefore different RMSE values. Adding set.seed(42) before the split ensures the same observations end up in train vs test every time."
      },
      // 4 - bug (Stata) — Mistake: using accuracy on imbalanced classes
      {
        type: "bug",
        title: "Misleading Accuracy in Stata",
        prompt: "A classifier for loan default achieves 95% accuracy. The researcher celebrates. What is wrong?",
        hint: "Look at the class distribution: 95% non-default, 5% default. What accuracy would a model that <b>always predicts no default</b> achieve?",
        lang: "stata",
        code: "* Data: 95% non-default, 5% default\nlogit default income credit_score age if train == 1\npredict phat if train == 0, pr\ngen predicted_default = (phat > 0.5) if train == 0\ngen correct = (predicted_default == default) if train == 0\nsum correct\n* Output: mean = .95 (95% accuracy)",
        options: [
          "logit is the wrong model for binary classification in Stata",
          "With 95% non-default, a model predicting no default for everyone gets 95% accuracy — should use estat classification or lroc for AUC instead",
          "The predict command should use the xb option, not pr",
          "The threshold 0.5 should always be used for classification"
        ],
        correct: 1,
        explanation: "When classes are imbalanced (95% vs 5%), accuracy is misleading because a naive 'always predict no default' classifier achieves 95%. In Stata, use estat classification for confusion matrix details, or lroc after logit for the AUC, which evaluates discrimination across all thresholds."
      },
      // 5 - reorder (Python) — Skill: basic ML pipeline
      {
        type: "reorder",
        title: "Basic ML Pipeline",
        prompt: "Arrange these lines into a correct machine learning workflow.",
        hint: "The ML workflow follows: import, split data, create model, train (fit), then evaluate on test data. Training and evaluation must use separate data.",
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
        hint: "Start by loading the package, then set seed and split, extract train/test sets, fit the model on training data, and evaluate on test data.",
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
        prompt: "Fill in the blanks to fit a Lasso regression with regularization strength 0.1. Type the sklearn class name in GAP1 and the alpha value in GAP2.",
        hint: "GAP1: The sklearn class for L1-regularized linear regression starts with an uppercase letter and has 5 characters.<br>GAP2: The regularization strength specified in the prompt — a decimal number.",
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
        hint: "RMSE and R-squared are for regression (continuous outcomes). AUC and Recall are for classification (binary outcomes). Think about what each acronym stands for.",
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
      // 1 - read (Stata) — Skill: feature scaling requirement for Lasso
      {
        type: "read",
        title: "Feature Scaling for Lasso in Stata",
        prompt: "Why does this code standardize features before fitting a Lasso model?",
        hint: "Lasso penalizes the <b>absolute size</b> of coefficients. If one feature is measured in thousands and another in single digits, which coefficient will be naturally larger?",
        lang: "stata",
        code: "* Standardize features\nforeach var of varlist income education age {\n    egen std_`var' = std(`var')\n}\n\n* Fit Lasso on standardized features\nlasso linear consumption std_income std_education std_age",
        options: [
          "Lasso penalizes coefficients by magnitude, so unscaled features with larger values get penalized more — standardizing puts all features on equal footing",
          "egen std() makes the model converge faster but does not affect results",
          "Standardization is required because lasso linear only accepts values between 0 and 1",
          "Standardization removes outliers that would otherwise bias the Lasso coefficients"
        ],
        correct: 0,
        explanation: "Lasso's L1 penalty is applied equally to all coefficients regardless of scale. If income is in thousands and age is in years, income's coefficient is naturally smaller, making it more likely to survive the penalty. Standardizing with egen std() ensures the penalty treats all features fairly."
      },
      // 2 - read (R) — Skill: random forest hyperparameters in R
      {
        type: "read",
        title: "Random Forest Hyperparameters in R",
        prompt: "What do num.trees and mtry control in this random forest?",
        hint: "<code>num.trees</code> controls how many trees are in the forest. <code>mtry</code> controls how many features each tree considers at each split — this is what decorrelates the trees.",
        lang: "r",
        code: "library(ranger)\n\nrf <- ranger(\n    wage ~ income + education + age + experience,\n    data = train_data,\n    num.trees = 500,\n    mtry = 2,\n    seed = 42\n)\nprint(rf)",
        options: [
          "num.trees = 500 grows 500 trees; mtry = 2 means each tree split considers only 2 features at random, reducing correlation between trees",
          "num.trees = 500 limits each tree to 500 nodes; mtry = 2 removes 2 features from the model",
          "num.trees = 500 uses 500 observations per tree; mtry = 2 scales features by a factor of 2",
          "num.trees = 500 creates 500 cross-validation folds; mtry = 2 selects the top 2 features globally"
        ],
        correct: 0,
        explanation: "Random forests aggregate many decorrelated trees. num.trees controls how many trees are grown (more is generally better but slower). mtry controls how many features are randomly considered at each split — lower values decorrelate the trees and reduce overfitting. A common default is sqrt(p)."
      },
      // 3 - bug (Python) — Mistake: fitting scaler on full data (data leakage)
      {
        type: "bug",
        title: "Data Leakage Through Scaling",
        prompt: "This code has a subtle but critical data leakage problem. Where is it?",
        hint: "Look at when <code>fit_transform</code> is called and what data it uses. Is the scaler learning statistics from data that the model should never see during training?",
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
      // 4 - bug (R) — Mistake: overfitting by tuning on test set
      {
        type: "bug",
        title: "Tuning on the Test Set in R",
        prompt: "This researcher reports an impressive test RMSE. What methodological error did they make?",
        hint: "The loop tries multiple lambda values and picks the one with the best <b>test</b> RMSE. How many times is the test set used? The test set should only be used <b>once</b>.",
        lang: "r",
        code: "library(glmnet)\n\nlambdas <- c(0.001, 0.01, 0.1, 1.0, 10.0)\nbest_rmse <- Inf\n\nfor (lam in lambdas) {\n  model <- glmnet(X_train, y_train, alpha = 1, lambda = lam)\n  preds <- predict(model, X_test)\n  rmse <- sqrt(mean((preds - y_test)^2))\n  if (rmse < best_rmse) {\n    best_rmse <- rmse\n    best_lambda <- lam\n  }\n}\ncat('Best test RMSE:', round(best_rmse, 4))",
        options: [
          "glmnet cannot loop over multiple lambda values",
          "The RMSE calculation is incorrect",
          "Selecting lambda that minimizes test error uses the test set for model selection — this overfits to the test set. Use cv.glmnet() on the training set instead",
          "The lambda values should be evenly spaced, not on a log scale"
        ],
        correct: 2,
        explanation: "The test set must be touched only once for final evaluation. Using it to choose lambda means the reported test RMSE is optimistic — it reflects the best of 5 attempts, not true out-of-sample performance. Use cv.glmnet(X_train, y_train) to select lambda via cross-validation, then evaluate once on the test set."
      },
      // 5 - reorder (Stata) — Skill: Lasso with cross-validation in Stata
      {
        type: "reorder",
        title: "Lasso with Cross-Validation in Stata",
        prompt: "Arrange these Stata lines to fit a Lasso model with automatic cross-validated lambda selection.",
        hint: "Load data and set seed first, then fit the Lasso with CV, inspect the selected coefficients, and finally evaluate predictions.",
        lang: "stata",
        lines: [
          "use household_data.dta, clear",
          "set seed 42",
          "lasso linear consumption income education age experience,\n    selection(cv, folds(5))",
          "lassocoef, display(coef, penalized)",
          "predict yhat\ngen sq_err = (consumption - yhat)^2\nsum sq_err"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Load data, set seed for reproducibility, fit lasso linear with 5-fold cross-validation to select the optimal penalty. lassocoef shows which variables were selected and their coefficients. Finally, generate predictions and evaluate the squared errors."
      },
      // 6 - reorder (Python) — Skill: proper scaling pipeline
      {
        type: "reorder",
        title: "Correct Scaling Pipeline",
        prompt: "Arrange these lines to properly scale features without data leakage.",
        hint: "Import first, split data, then fit the scaler on <b>training data only</b> (<code>fit_transform</code>), apply it to test data (<code>transform</code> only), and finally train and evaluate.",
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
      // 7 - fill (Stata) — Skill: Lasso feature selection
      {
        type: "fill",
        title: "Lasso Feature Selection in Stata",
        prompt: "Fill in the blanks to fit a Lasso regression with cross-validated penalty selection in Stata. Type the Stata command name in GAP1 and the number of CV folds in GAP2.",
        hint: "GAP1: The Stata 16+ command for L1-regularized regression is five lowercase letters.<br>GAP2: A common number of cross-validation folds (between 3 and 10).",
        lang: "stata",
        codeTemplate: "set seed 42\n___GAP1___ linear consumption income education age experience,\n    selection(cv, folds(___GAP2___))\nlassocoef, display(coef, penalized)",
        gaps: {
          "GAP1": { answer: "lasso", accept: ["lasso"] },
          "GAP2": { answer: "5", accept: ["5", "10"] }
        },
        explanation: "The lasso linear command in Stata (16+) fits a Lasso regression. selection(cv, folds(5)) uses 5-fold cross-validation to select the optimal penalty lambda. lassocoef shows which variables survived the L1 penalty (non-zero coefficients) — this is automatic feature selection."
      },
      // 8 - match — Skill: regularization concepts
      {
        type: "match",
        title: "Regularization Methods",
        prompt: "Match each regularization method with its key property.",
        hint: "L1 (Lasso) creates <b>sparse</b> models (some coefficients exactly zero). L2 (Ridge) shrinks but keeps all features. Higher penalty = simpler model. CV finds the best penalty.",
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
        hint: "Double ML uses two separate ML models as 'nuisance learners': one predicts the outcome (Y) from controls, and one predicts the treatment (D) from controls. This partials out confounders.",
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
        hint: "A standard random forest predicts E[Y|X]. A <b>causal</b> forest estimates E[Y(1) - Y(0) | X] — the treatment effect that varies by individual characteristics.",
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
      // 3 - bug (Stata) — Mistake: not scaling features before Lasso
      {
        type: "bug",
        title: "Unscaled Lasso in Stata",
        prompt: "This Lasso model keeps only income and drops education. The researcher concludes education does not matter. What went wrong?",
        hint: "Compare the scales: income is in dollars (mean ~50000) while education is in years (mean ~14). How does this affect the coefficient magnitudes and Lasso's penalty?",
        lang: "stata",
        code: "* income in dollars (mean ~50000), education in years (mean ~14)\nlasso linear consumption income education age\nlassocoef\n* Output: only income has a non-zero coefficient\n* \"Education has no effect on consumption\"",
        options: [
          "lasso linear cannot handle more than two features",
          "The default penalty is always too strong for any dataset",
          "Features were not standardized — income's large scale makes its coefficient tiny, so the penalty hits education harder. Need egen std_var = std(var) first",
          "Lasso dropped education because it is truly uncorrelated with the outcome"
        ],
        correct: 2,
        explanation: "Lasso penalizes the absolute sum of coefficients. Without standardization, income (mean ~50000) has a tiny coefficient to compensate for its large values, while education (mean ~14) has a larger coefficient. The penalty disproportionately shrinks education to zero. Standardize with egen std_x = std(x) before fitting."
      },
      // 4 - bug (Python) — Mistake: confusing prediction with causal interpretation
      {
        type: "bug",
        title: "Prediction vs Causation",
        prompt: "A researcher makes a policy recommendation based on this analysis. What is the flaw?",
        hint: "The random forest identifies that education is a strong <b>predictor</b> of wages. But does prediction imply causation? Could unobserved factors (like ability) explain both?",
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
      // 5 - reorder (Stata) — Skill: Lasso for treatment effect estimation
      {
        type: "reorder",
        title: "Lasso-Based Treatment Effect in Stata",
        prompt: "Arrange these Stata lines to estimate a treatment effect using Lasso for variable selection (double selection).",
        hint: "Load data first, then the two Lasso steps select controls for outcome and treatment separately. The <code>dsregress</code> command combines them into the final debiased estimate.",
        lang: "stata",
        lines: [
          "use training_data.dta, clear\nset seed 42",
          "* Step 1: Lasso-select controls for outcome\nlasso linear wage age education experience x1-x20,\n    selection(cv)",
          "* Step 2: Lasso-select controls for treatment\nlasso linear training age education experience x1-x20,\n    selection(cv)",
          "* Step 3: Post-double-selection estimator\ndsregress wage training,\n    controls(age education experience x1-x20)",
          "* Display results with valid standard errors\nestimates table, se"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Load data and set seed, then Stata's dsregress implements double selection: Lasso selects controls relevant for the outcome (wage), Lasso selects controls relevant for the treatment (training), and the final regression includes the union of selected controls. This yields a debiased treatment effect estimate."
      },
      // 6 - reorder (R) — Skill: full Lasso pipeline with glmnet
      {
        type: "reorder",
        title: "Complete Lasso Pipeline in R",
        prompt: "Arrange these R lines for a Lasso pipeline with CV tuning and honest evaluation.",
        hint: "Load packages, split data, prepare matrices, use <code>cv.glmnet()</code> to find the best lambda via cross-validation, then evaluate <b>once</b> on the test set.",
        lang: "r",
        lines: [
          "library(glmnet)\nlibrary(rsample)",
          "set.seed(42)\nsplit <- initial_split(df, prop = 0.8)\ntrain_data <- training(split)\ntest_data <- testing(split)",
          "X_train <- as.matrix(train_data[, c('income', 'education', 'age')])\ny_train <- train_data$consumption\nX_test <- as.matrix(test_data[, c('income', 'education', 'age')])\ny_test <- test_data$consumption",
          "cv_model <- cv.glmnet(X_train, y_train, alpha = 1, nfolds = 5)\ncat('Best lambda:', cv_model$lambda.min, '\\n')",
          "preds <- predict(cv_model, X_test, s = 'lambda.min')\nrmse <- sqrt(mean((preds - y_test)^2))\ncat('Test RMSE:', round(rmse, 4))"
        ],
        correctOrder: [0, 1, 2, 3, 4],
        explanation: "Load packages, split data with a seed, prepare matrices for glmnet, use cv.glmnet with 5 folds to select the optimal lambda via cross-validation, then evaluate once on the test set with lambda.min. This avoids overfitting to the test set."
      },
      // 7 - fill (R) — Skill: causal forest in R
      {
        type: "fill",
        title: "Causal Forest in R",
        prompt: "Fill in the blanks to estimate heterogeneous treatment effects with a causal forest. Type the R package name in GAP1 and the treatment variable name in GAP2.",
        hint: "GAP1: The R package for Generalized Random Forests is a 3-letter abbreviation.<br>GAP2: The treatment variable — look at the context (wage outcome, treatment effect of a program).",
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
        hint: "Prediction methods answer 'what will happen?' while causal methods answer 'what is the effect of an intervention?' Causal forests add 'for whom is the effect strongest?'",
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
