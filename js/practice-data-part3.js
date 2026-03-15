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
        prompt: "What does the cov_type='HC1' argument change in this regression?",
        hint: "Look at the <code>cov_type</code> argument passed to <code>.fit()</code>. Think about what changes and what stays the same compared to a default <code>.fit()</code> call.",
        lang: "python",
        code: "import statsmodels.api as sm\n\nX = sm.add_constant(df['education'])\nmodel = sm.OLS(df['wage'], X)\nresults = model.fit(cov_type='HC1')\nprint(results.summary())",
        options: [
          "It changes only the standard errors to be heteroskedasticity-robust; the coefficient estimates remain identical to classical OLS",
          "It changes both the coefficient estimates and the standard errors to be robust to heteroskedasticity",
          "It switches the estimation method from OLS to weighted least squares to handle heteroskedasticity",
          "It removes outliers that cause heteroskedasticity before estimating the regression"
        ],
        correct: 0,
        explanation: "A is correct: cov_type='HC1' only changes the variance-covariance matrix used to compute standard errors; the point estimates (coefficients) are identical to classical OLS. B is wrong because robust SEs never alter the coefficients — they only affect the uncertainty estimates. C is wrong because the estimation method remains ordinary least squares; WLS would require specifying weights. D is wrong because HC1 does not remove any observations — it adjusts the SE formula to be valid under heteroskedasticity."
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
          "The robust option produces different coefficients because it downweights high-variance observations",
          "The robust option drops observations with large residuals before re-estimating",
          "The robust option changes OLS to a generalized least squares estimator"
        ],
        correct: 0,
        explanation: "A is correct: the robust option only changes the variance-covariance estimator (to the Huber-White sandwich estimator), leaving point estimates identical. B is wrong because robust SEs do not reweight observations — they only adjust the formula for computing standard errors. C is wrong because no observations are dropped; every data point is used in estimation. D is wrong because the estimation method remains OLS — only the SE calculation changes, not the objective function being minimized."
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
          "Line 1: lm() cannot handle multiple regressors and should use glm() instead",
          "Line 2: summary() reports classical SEs, ignoring the heteroskedasticity — should use coeftest(model, vcov = vcovHC(model, type = \"HC1\"))",
          "Line 1: the formula should use consumption ~ income * age to capture the interaction effect",
          "Line 2: summary() does not display standard errors at all in R"
        ],
        correct: 1,
        explanation: "B is correct: summary(lm()) computes classical SEs that assume homoskedastic errors; when heteroskedasticity is present, these SEs are biased and inference is invalid. A is wrong because lm() handles any number of regressors — glm() is for generalized linear models, not a fix for heteroskedasticity. C is wrong because an interaction term addresses a different modeling question (whether the effect of income depends on age), not the SE problem. D is wrong because summary() does display SEs — they are just the wrong type when heteroskedasticity is present."
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
          "The logit command syntax is wrong — Stata requires commas between variable names",
          "Logit coefficients are log-odds ratios, not probability changes — need margins, dydx(*) to obtain marginal effects on the probability scale",
          "Logit models cannot include continuous independent variables like age and income",
          "The model is missing the robust option, which is required for valid logit estimation"
        ],
        correct: 1,
        explanation: "B is correct: logit coefficients represent changes in the log-odds of the outcome, which have no direct interpretation as probability changes. The relationship between log-odds and probability is nonlinear. A is wrong because Stata variable lists do not use commas — the syntax is correct. C is wrong because logit models can include any type of independent variable, continuous or categorical. D is wrong because robust SEs are optional and unrelated to the coefficient interpretation problem — the issue is about the scale of the coefficients, not their precision."
      },
      // 5 - reorder (R) — Skill: OLS with robust SEs in R
      {
        type: "reorder",
        title: "Robust Standard Errors in R",
        prompt: "Arrange these lines to run OLS with HC1 robust standard errors in R.",
        hint: "Start by loading the required packages (<code>sandwich</code> and <code>lmtest</code>), then fit the model, and finally display robust results.",
        lang: "r",
        lines: [
          "model <- lm(wage ~ education + experience, data = df)",
          "library(sandwich)",
          "coeftest(model, vcov = vcovHC(model, type = \"HC1\"))",
          "library(lmtest)"
        ],
        correctOrder: [1, 3, 0, 2],
        explanation: "First load the sandwich package (which provides vcovHC for robust variance estimation) and the lmtest package (which provides coeftest for displaying results). These must come before any functions that depend on them. Then fit the OLS model with lm(), which must happen before coeftest() can use it. Finally, coeftest() takes the fitted model and the HC1 robust variance matrix to display coefficients with corrected standard errors."
      },
      // 6 - reorder (Stata) — Skill: store and compare regressions
      {
        type: "reorder",
        title: "Compare Classical vs Robust SEs",
        prompt: "Arrange these Stata lines to run a regression with both classical and robust SEs and export a comparison table.",
        hint: "Run the classical regression first, store it, then run the robust version and store it. The comparison table comes last.",
        lang: "stata",
        lines: [
          "estimates store robust_se",
          "regress income education age",
          "esttab classical robust_se, se",
          "estimates store classical",
          "regress income education age, robust"
        ],
        correctOrder: [1, 3, 4, 0, 2],
        explanation: "The first regression must run before estimates store can save it. Then the robust version must run before it can be stored. esttab comes last because both stored estimates must exist before they can be displayed side by side. The order matters because estimates store captures the most recent estimation, so each regression must be immediately followed by its store command."
      },
      // 7 - fill (Python) — Skill: requesting robust SEs in the fit command
      {
        type: "fill",
        title: "Requesting Robust Standard Errors",
        prompt: "Fill in the blanks to request heteroskedasticity-robust standard errors when fitting an OLS model. Type the argument name in GAP1 and the HC variant with small-sample correction in GAP2.",
        hint: "GAP1: The argument to <code>.fit()</code> that controls the covariance type is two words joined by an underscore.<br>GAP2: The HC variant with small-sample correction is <code>HC</code> followed by one digit.",
        lang: "python",
        codeTemplate: "import statsmodels.formula.api as smf\n\nresults = smf.ols('wage ~ education + experience', data=df).fit(\n    ___GAP1___='___GAP2___'\n)\nprint(results.summary())",
        gaps: {
          "GAP1": { answer: "cov_type", accept: ["cov_type"] },
          "GAP2": { answer: "HC1", accept: ["HC1"] }
        },
        explanation: "GAP1 is cov_type — the argument to .fit() that specifies which variance-covariance estimator to use. Without it, .fit() uses classical (homoskedastic) standard errors. GAP2 is HC1 — the robust SE variant that applies the n/(n-k) small-sample correction, equivalent to Stata's ,robust option. Students often confuse HC0 (no correction, biased in small samples) with HC1, or forget the digit entirely. Both blanks relate to the same concept: how to request robust SEs when fitting a model."
      },
      // 8 - match — Skill: robust SEs across languages
      {
        type: "match",
        title: "Robust SEs Across Languages",
        prompt: "Match equivalent robust standard error commands across Python, Stata, and R.",
        hint: "Look for commands that perform the same task (e.g., fitting with robust SEs, computing a robust variance matrix) but in different languages. The language labels on each side will help.",
        pairs: [
          {
            left: "model.fit(cov_type='HC1')",
            leftLang: "Python",
            right: "regress y x1 x2, robust",
            rightLang: "Stata"
          },
          {
            left: "vcovHC(model, type = \"HC1\")",
            leftLang: "R (sandwich)",
            right: "coeftest(model, vcov = vcovHC(model))",
            rightLang: "R (lmtest)"
          },
          {
            left: "feols(y ~ x, vcov = \"hetero\", data = df)",
            leftLang: "R (fixest)",
            right: "smf.ols('y ~ x', data=df).fit(cov_type='HC1')",
            rightLang: "Python"
          },
          {
            left: "regress y x1 x2, vce(robust)",
            leftLang: "Stata",
            right: "regress y x1 x2, robust",
            rightLang: "Stata"
          }
        ],
        explanation: "All four pairs perform equivalent operations. Python uses cov_type='HC1' inside .fit(). Stata uses either ,robust or ,vce(robust) — they are identical. In R, vcovHC() computes the robust variance matrix and coeftest() uses it to display results — these two functions work together. R's fixest package offers a cleaner one-line syntax with vcov = 'hetero'. Understanding these equivalences lets you translate estimation code between languages."
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
        prompt: "Why does this code use clustered standard errors instead of just robust (HC1)?",
        hint: "Notice the <code>cluster = firm_panel$firm_id</code> argument. Think about what happens when workers within the same firm share unobserved characteristics.",
        lang: "r",
        code: "library(sandwich)\nlibrary(lmtest)\n\nmodel <- lm(wage ~ education + experience, data = firm_panel)\ncoeftest(model, vcov = vcovCL(model, cluster = firm_panel$firm_id))",
        options: [
          "Because observations within the same firm may have correlated errors, and clustering accounts for this within-group correlation",
          "Because clustering changes the coefficient estimates to be more efficient by weighting firms equally",
          "Because clustering is required whenever you have more than one regressor in a model",
          "Because HC1 robust standard errors cannot be computed when the sample size exceeds 1000"
        ],
        correct: 0,
        explanation: "A is correct: clustered SEs allow for arbitrary error correlation within each cluster (firm), which matters when workers at the same firm share unobserved characteristics. B is wrong because clustering only changes standard errors, not coefficient estimates — the point estimates are identical to OLS. C is wrong because the choice between HC1 and clustering depends on data structure (grouped vs. independent observations), not the number of regressors. D is wrong because HC1 works at any sample size — the issue is about within-group correlation, not sample size."
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
          "PanelOLS automatically drops gender because it detects missing values in the column",
          "Entity fixed effects absorb all time-invariant variation — since gender does not change within a person, its effect cannot be estimated separately from the person fixed effect",
          "PanelOLS cannot handle binary (0/1) variables and silently drops them from the model",
          "The clustered covariance type forces PanelOLS to exclude any categorical variables"
        ],
        correct: 1,
        explanation: "B is correct: entity fixed effects work by demeaning each variable within each entity. Since gender never changes for a given person, after demeaning it becomes a column of zeros and is collinear with the fixed effects. A is wrong because the drop is not about missing values — it would occur even with complete data. C is wrong because PanelOLS handles binary variables fine when they vary over time (e.g., marital status). D is wrong because cov_type only affects standard errors, not which variables enter the model."
      },
      // 3 - bug (Stata) — Mistake: clustering with too few clusters
      {
        type: "bug",
        title: "Too Few Clusters",
        prompt: "This study uses data from 8 countries over 20 years. What is wrong with this approach?",
        hint: "Cluster-robust standard errors rely on asymptotic theory as the number of clusters grows large. How many clusters does this study have, and is that enough?",
        lang: "stata",
        code: "use multi_country.dta, clear\nregress gdp_growth trade_openness inflation, vce(cluster country)\n* 8 countries, 20 years each = 160 obs\n* \"Clustered standard errors account for\n*   within-country correlation\"",
        options: [
          "The vce(cluster) syntax is incorrect — should use vce(cluster country_id) with an underscore",
          "With only 8 clusters, cluster-robust SEs are unreliable because asymptotic theory requires roughly 30+ clusters to provide valid inference",
          "Clustering at the country level is never appropriate in panel data — must always cluster at the individual level",
          "The regression needs to include country fixed effects before clustering, otherwise the clustered SEs are invalid"
        ],
        correct: 1,
        explanation: "B is correct: cluster-robust SEs rely on the number of clusters approaching infinity. With only 8 clusters, the variance estimator is severely biased, typically producing SEs that are too small. A is wrong because the syntax is fine — Stata accepts any valid variable name after vce(cluster). C is wrong because the appropriate clustering level depends on the data structure and the source of error correlation, not a fixed rule. D is wrong because fixed effects and clustered SEs address different problems — fixed effects control for unobserved heterogeneity, while clustering adjusts SEs for within-group correlation. They can be used independently."
      },
      // 4 - bug (R) — Mistake: not getting marginal effects from logit
      {
        type: "bug",
        title: "Logit Marginal Effects in R",
        prompt: "This code fits a logit model but the researcher directly interprets the coefficients as percentage changes. What is the issue?",
        hint: "Logit coefficients are in <b>log-odds</b> units. Can you convert 0.42 directly to a percentage change in probability?",
        lang: "r",
        code: "model <- glm(employed ~ education + age,\n             family = binomial(link = \"logit\"), data = df)\nsummary(model)\n# \"Coefficient on education = 0.42, so one more year\n#   of education raises employment probability by 42%\"",
        options: [
          "The glm syntax is wrong — binomial(link = \"logit\") should just be binomial without the link argument",
          "The model needs vcovHC() for robust standard errors before any interpretation is valid",
          "Logit coefficients are in log-odds, not probabilities — need margins::margins(model) or predict(..., type = \"response\") for probability-scale marginal effects",
          "The model should use family = gaussian() for a binary employment outcome"
        ],
        correct: 2,
        explanation: "C is correct: logit coefficients represent changes in the log-odds scale, which is nonlinearly related to probability. A coefficient of 0.42 means the log-odds increase by 0.42, not that the probability increases by 42 percentage points. A is wrong because binomial(link = \"logit\") is perfectly valid R syntax and equivalent to the default binomial(). B is wrong because robust SEs affect inference precision, not the interpretation of the coefficient scale. D is wrong because family = gaussian() would fit a linear probability model, which is a different model altogether and not a fix for the interpretation problem."
      },
      // 5 - reorder (Python) — Skill: bootstrap
      {
        type: "reorder",
        title: "Bootstrap Standard Errors",
        prompt: "Arrange these lines to compute bootstrap standard errors for an OLS coefficient in Python.",
        hint: "Start with imports and seed, then initialize storage, run the bootstrap loop, and finally compute the standard deviation of the collected coefficients.",
        lang: "python",
        lines: [
          "boot_se = np.std(boot_coefs, ddof=1)",
          "np.random.seed(42)",
          "print(f'Bootstrap SE: {boot_se:.4f}')",
          "import numpy as np",
          "boot_coefs = []",
          "for i in range(1000):\n    idx = np.random.choice(len(df), size=len(df), replace=True)\n    boot_df = df.iloc[idx]\n    X_b = sm.add_constant(boot_df['education'])\n    coef = sm.OLS(boot_df['wage'], X_b).fit().params[1]\n    boot_coefs.append(coef)"
        ],
        correctOrder: [3, 1, 4, 5, 0, 2],
        explanation: "numpy must be imported before any numpy functions can be called. The seed must be set before any random sampling to ensure reproducibility. The empty list must be initialized before the loop can append to it. The loop must complete all 1000 replications before the standard deviation can be computed. Finally, printing depends on boot_se existing. Each step produces something the next step requires."
      },
      // 6 - reorder (R) — Skill: panel FE with clustering using fixest
      {
        type: "reorder",
        title: "Panel Fixed Effects with Clustering in R",
        prompt: "Arrange these R lines to estimate entity and time fixed effects with clustered standard errors.",
        hint: "Load the package first, then the data, then estimate the model with <code>feols()</code>, and finally display and export results.",
        lang: "r",
        lines: [
          "model <- feols(revenue ~ rd_spending + employees | firm_id + year,\n               vcov = ~firm_id, data = firm_panel)",
          "etable(model, se = \"cluster\")",
          "library(fixest)",
          "summary(model)",
          "firm_panel <- read.csv(\"firm_panel.csv\")"
        ],
        correctOrder: [2, 4, 0, 3, 1],
        explanation: "The fixest library must load before feols() is available. The data must be read before feols() can reference its columns. The model must be estimated before summary() or etable() can display it. summary() shows a quick console overview, and etable() produces a formatted table — both depend on the fitted model object existing."
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
        explanation: "GAP1 is logit — the Stata command that estimates a logistic regression and reports coefficients in the log-odds scale. A common mistake is writing 'probit' (which is a different link function) or 'logistic' (which reports odds ratios instead of log-odds). GAP2 is margins — the post-estimation command that converts log-odds coefficients into average marginal effects (probability-scale changes). Students often try to interpret logit coefficients directly without running margins, leading to incorrect conclusions."
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
        ],
        explanation: "The key syntactic differences: Stata uses xtreg with ,fe for entity FE and reghdfe with absorb() for multi-way FE. Python's PanelOLS uses boolean flags (entity_effects, time_effects). R's fixest uses | to separate FE from regressors in the formula. Clustered SEs are specified via vce() in Stata, cov_type in Python, and vcov in R. Despite different syntax, all pairs perform identical estimation."
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
          "It clusters standard errors by both firm and year, allowing for correlation within firms across time and within years across firms simultaneously",
          "It runs two separate regressions — one clustered by firm and one clustered by year — and averages their standard errors",
          "It adds both firm and year as fixed effects to the regression model specification",
          "It applies the bootstrap separately within each unique firm-year combination"
        ],
        correct: 0,
        explanation: "A is correct: two-way clustering (vcov = ~firm_id + year) allows errors to be correlated both within firms across time and within years across firms, using the Cameron-Gelbach-Miller formula. B is wrong because two-way clustering is computed in a single regression using V = V_firm + V_year - V_firm*year, not by averaging separate regressions. C is wrong because vcov controls standard errors, not the model specification — fixed effects are specified with the | operator. D is wrong because two-way clustering is an analytical formula, not a resampling procedure like the bootstrap."
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
          "Wild cluster bootstrap is computationally faster than standard clustered SEs for large datasets",
          "Wild cluster bootstrap provides valid inference with few clusters (here 12), where standard clustered SEs would produce unreliable p-values",
          "Wild cluster bootstrap changes the coefficient estimates to be unbiased with small cluster counts",
          "The boottest command tests whether the treatment variable is endogenous and needs instrumental variables"
        ],
        correct: 1,
        explanation: "B is correct: with only 12 clusters, the asymptotic theory underlying standard cluster-robust SEs breaks down, typically producing SEs that are too small and over-rejecting the null. Wild cluster bootstrap provides better finite-sample inference. A is wrong because bootstrap methods are slower than analytical formulas, not faster. C is wrong because boottest does not change coefficient estimates — it only provides improved p-values and confidence intervals. D is wrong because boottest tests the significance of a coefficient, not endogeneity — the Hausman test or Durbin-Wu-Hausman test is used for endogeneity."
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
          "Line 7: np.random.choice should use replace=False to avoid duplicate observations",
          "Line 7: the bootstrap resamples individual observations instead of entire clusters — need a block bootstrap that resamples all observations within a firm together",
          "Line 10: .params[1] extracts the intercept instead of the education coefficient",
          "Line 4: setting a seed makes the bootstrap deterministic, which invalidates its statistical properties"
        ],
        correct: 1,
        explanation: "B is correct: when data has a cluster structure (workers within firms), individual-level resampling breaks the within-cluster correlation that the original model accounts for. A block bootstrap resamples entire firms, preserving intra-firm dependence. A is wrong because bootstrap must sample with replacement — that is the core mechanism generating sampling variability. C is wrong because .params[1] correctly extracts the first slope coefficient (index 0 is the intercept when a constant is added). D is wrong because setting a seed ensures reproducibility, which is good practice — the bootstrap's validity comes from resampling, not from randomness of the seed."
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
          "esttab cannot compare models with different numbers of independent variables",
          "Model 1 uses classical SEs while Model 2 uses robust SEs — the change in significance may reflect the SE type switch rather than the added controls",
          "The star significance thresholds (* 0.10 ** 0.05 *** 0.01) are non-standard and invalid",
          "estimates store cannot be used after the regress command in Stata"
        ],
        correct: 1,
        explanation: "B is correct: comparing significance across models that use different SE types conflates two changes. Robust SEs are typically larger than classical SEs, so a variable can appear to lose significance simply because the SE calculation changed, not because of the added controls. A is wrong because esttab is specifically designed to compare models with different specifications. C is wrong because these are standard significance levels widely used in economics. D is wrong because estimates store works after any estimation command in Stata, including regress."
      },
      // 5 - reorder (Python) — Skill: panel FE with two-way FE and clustering
      {
        type: "reorder",
        title: "Two-Way Fixed Effects in Python",
        prompt: "Arrange these lines to estimate a two-way FE model with clustered SEs and display the results.",
        hint: "Start with the import, then set the panel index, specify the model with both entity and time effects, fit it, and print results last.",
        lang: "python",
        lines: [
          "results = mod.fit(cov_type='clustered', cluster_entity=True)",
          "from linearmodels.panel import PanelOLS",
          "print(results.summary)",
          "df = df.set_index(['firm_id', 'year'])",
          "mod = PanelOLS(df['revenue'], df[['rd_spending', 'employees']],\n               entity_effects=True, time_effects=True)"
        ],
        correctOrder: [1, 3, 4, 0, 2],
        explanation: "PanelOLS must be imported before it can be used. The multi-index must be set before PanelOLS can identify the panel structure (which entity and which time period each row belongs to). The model must be specified before fitting. Fitting must happen before results exist to be printed. entity_effects absorbs firm-level unobservables; time_effects absorbs year-level shocks common to all firms."
      },
      // 6 - reorder (Stata) — Skill: bootstrap with seed
      {
        type: "reorder",
        title: "Reproducible Bootstrap in Stata",
        prompt: "Arrange these Stata lines to run a reproducible bootstrap of an OLS regression.",
        hint: "Load the data first, set the seed for reproducibility, then run the bootstrap command, and finally inspect the results.",
        lang: "stata",
        lines: [
          "matrix list e(ci_percentile)",
          "bootstrap _b, reps(1000): regress wage education experience",
          "use worker_data.dta, clear",
          "estat bootstrap, all",
          "set seed 42"
        ],
        correctOrder: [2, 4, 1, 3, 0],
        explanation: "Data must be loaded before any analysis. The seed must be set before the bootstrap command so the random resampling is reproducible. The bootstrap command must complete all 1000 replications before estat can summarize the results. matrix list e(ci_percentile) accesses stored bootstrap results, which only exist after estat bootstrap runs."
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
        explanation: "GAP1 is feols — the fixest function for fixed-effects OLS. Students sometimes write lm() (which cannot absorb FE efficiently) or felm() (which is from a different package, lfe). GAP2 is firm_id — clustering at the firm level accounts for within-firm error correlation over time. A common mistake is clustering at the year level or at the firm-year level, which would either miss within-firm correlation or create too many clusters to be meaningful."
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
        ],
        explanation: "HC1 handles heteroskedasticity but assumes independent observations — appropriate for cross-sectional data. Cluster-robust SEs allow within-group correlation but require many clusters for reliable asymptotics. Wild cluster bootstrap relaxes the large-cluster requirement using resampling. Two-way clustering handles correlation along two dimensions simultaneously (e.g., within firms over time AND within years across firms), which is common in panel data where both macro shocks and firm persistence matter."
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
          "Because Python requires all file paths to be absolute — relative paths cause import errors",
          "To prevent Python from accidentally overwriting files by constraining writes to the ROOT directory",
          "To make the code run faster by caching the directory path in a single variable"
        ],
        correct: 0,
        explanation: "A is correct: the master script defines one absolute path at the top, and all other paths are constructed relative to it via os.path.join(). A collaborator changes only this one line. B is wrong because Python handles relative paths fine — the issue is portability across machines, not a Python requirement. C is wrong because ROOT does not constrain file writes; scripts could still write anywhere. D is wrong because storing a path in a variable has no performance benefit — the advantage is purely about maintainability and portability."
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
          "here() builds paths relative to the project root (where .Rproj or .here lives), so the code works on any machine without editing paths",
          "here() caches file paths in memory, making repeated file reads significantly faster",
          "here() automatically creates any missing directories in the path before writing files",
          "here() is required by R to read CSV files — read.csv() does not accept plain string paths"
        ],
        correct: 0,
        explanation: "A is correct: here() detects the project root by searching for marker files (.Rproj, .here, .git) and constructs all paths relative to that root. Collaborators never edit paths. B is wrong because here() resolves paths each time it is called with no caching benefit — its value is portability. C is wrong because here() only builds path strings; it does not create directories. D is wrong because read.csv() accepts any valid string path — here() is a convenience for portability, not a requirement."
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
          "The keep if command uses incorrect syntax — should be drop if year < 2010 instead",
          "Lines 2 and 4 use absolute paths specific to Marco's computer — should use a global root variable with relative paths",
          "The .dta file format is platform-specific and cannot be opened on a different operating system",
          "The save command should not use the replace option because it risks overwriting important files"
        ],
        correct: 1,
        explanation: "B is correct: paths like /Users/marco/... only exist on Marco's machine. The fix is to define global root at the top and use \"$root/data/raw/survey.dta\". A is wrong because keep if is valid Stata syntax and does the same job as drop if with the opposite condition. C is wrong because .dta files are cross-platform — Stata reads them on Windows, Mac, and Linux. D is wrong because replace is standard practice for overwriting previously generated processed data during a pipeline re-run."
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
          "Line 7: filtering with df['age'] >= 18 should use .query('age >= 18') for better performance",
          "Line 8: replacing negative incomes with None introduces missing values that will crash downstream analysis",
          "Line 9: saving back to data/raw/ overwrites the original data — should save to data/processed/ to preserve the raw source",
          "Line 6: os.path.join is unnecessary when all path components are known strings"
        ],
        correct: 2,
        explanation: "C is correct: saving cleaned data back into the raw/ folder destroys the original dataset permanently. If the cleaning logic has a bug, the original data cannot be recovered. A is wrong because both filtering methods produce identical results — .query() is stylistic, not a correctness issue. B is wrong because replacing invalid values with None (NaN) is good cleaning practice; downstream code should handle missing values. D is wrong because os.path.join handles cross-platform path separators (/ vs \\), which is important for portability."
      },
      // 5 - reorder (R) — Skill: creating project directory structure
      {
        type: "reorder",
        title: "Setting Up a Reproducible R Project",
        prompt: "Arrange these R lines to create a standard project folder structure programmatically.",
        hint: "Load the package first, define the directories, create them, then confirm. The <code>here()</code> function is used to make paths portable.",
        lang: "r",
        lines: [
          "cat('Project structure created at:', here(), '\\n')",
          "for (d in dirs) dir.create(here(d), recursive = TRUE, showWarnings = FALSE)",
          "library(here)",
          "dirs <- c('data/raw', 'data/processed', 'code', 'output/tables', 'output/figures')"
        ],
        correctOrder: [2, 3, 1, 0],
        explanation: "The here package must be loaded before here() can be called. The directory list must be defined before the loop iterates over it. dir.create() must run before the confirmation message, since the message reports on the created structure. recursive = TRUE is needed because nested directories (e.g., data/raw) require parent directories to be created first."
      },
      // 6 - reorder (Stata) — Skill: numbered script execution
      {
        type: "reorder",
        title: "Numbered Script Pipeline",
        prompt: "Arrange these do-files in the correct execution order for a research project.",
        hint: "Follow the numbered prefixes: data must be imported before it can be cleaned, cleaned before analysis, and analysis before exporting tables.",
        lang: "stata",
        lines: [
          "do \"$root/code/03_regression.do\"",
          "do \"$root/code/01_import_data.do\"",
          "do \"$root/code/04_export_tables.do\"",
          "do \"$root/code/02_clean_merge.do\""
        ],
        correctOrder: [1, 3, 0, 2],
        explanation: "Each script depends on the output of the previous one: 01_import loads raw data into memory, 02_clean processes and merges it (requires imported data), 03_regression runs the analysis (requires cleaned data), and 04_export formats and saves results (requires regression output). Running them out of order would cause file-not-found errors or use stale data."
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
        explanation: "GAP1 is .env — the conventional filename for storing environment variables and secrets (API keys, passwords). Students sometimes write 'secrets.txt' or 'config', but .env is the standard convention recognized by frameworks and tools. GAP2 is .gitignore — the file that tells Git which files to exclude from tracking. A common mistake is writing 'gitignore' without the leading dot, which Git would not recognize."
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
        ],
        explanation: "The working directory is where you edit files — changes here are not yet tracked. The staging area is an intermediate step: git add selects which changes to include in the next commit, allowing you to commit some changes but not others. The repository stores committed snapshots permanently. .gitignore is different from the three states — it tells Git to completely ignore certain files, preventing them from even appearing as 'untracked'."
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
          "Log files record all Stata output (results, warnings, errors), creating a permanent record that reviewers can verify without re-running the code",
          "Log files make the analysis run faster by caching intermediate computation results between do-files",
          "Log files are required by Stata to execute multiple do-files sequentially in a single session",
          "Log files prevent the code from producing different results if the data changes between runs"
        ],
        correct: 0,
        explanation: "A is correct: a log file captures everything Stata prints to the console — regression tables, summary statistics, warnings, and errors — creating an auditable trail. B is wrong because log files only record text output; they do not cache computations or speed up execution. C is wrong because Stata can run multiple do-files without logging — log files are optional. D is wrong because log files passively record output; they do not lock data or prevent changes."
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
          "renv records exact package versions in a lockfile so collaborators install the same versions, preventing code from breaking due to package updates",
          "renv compiles R packages from source for faster execution on each collaborator's machine",
          "renv is required by R to install packages from CRAN — install.packages() does not work without it",
          "renv automatically updates all packages to the latest stable version to ensure compatibility"
        ],
        correct: 0,
        explanation: "A is correct: renv::snapshot() saves every installed package and its exact version to renv.lock. When a collaborator runs renv::restore(), they get the identical versions, preventing the common problem of code breaking because a package update changed function behavior. B is wrong because renv manages versions, not compilation — packages are installed the same way with or without renv. C is wrong because install.packages() works independently of renv — renv is an optional tool for version management. D is wrong because renv does the opposite of auto-updating: it freezes versions to ensure stability."
      },
      // 3 - bug (Python) — Mistake: hardcoded paths in shared code
      {
        type: "bug",
        title: "Hardcoded Paths in Python",
        prompt: "A collaborator on a Mac cannot run this Python script written on Windows. What is wrong?",
        hint: "Look at the strings passed to <code>pd.read_csv()</code> and <code>df.to_csv()</code>. Would these file paths work on a Mac, Linux, or a different Windows user's machine?",
        lang: "python",
        code: "import pandas as pd\n\ndf = pd.read_csv('C:/Users/marco/Desktop/thesis/data/raw/survey.csv')\ndf = df[df['year'] >= 2010]\ndf.to_csv('C:/Users/marco/Desktop/thesis/data/processed/survey_clean.csv',\n          index=False)",
        options: [
          "Line 3: pd.read_csv cannot read CSV files from Windows paths on any operating system",
          "Lines 3 and 5 use absolute paths specific to Marco's Windows computer — should use a configurable ROOT variable or pathlib.Path for portable paths",
          "Line 4: the year filter should use .query('year >= 2010') to be cross-platform compatible",
          "Line 5: index=False causes data corruption when saving CSV files on non-Windows systems"
        ],
        correct: 1,
        explanation: "B is correct: C:/Users/marco/... is an absolute path that only exists on Marco's Windows machine. On a Mac or Linux system, this path does not exist. A is wrong because pd.read_csv can read from Windows-style paths when running on Windows — the problem is that the path does not exist on other machines. C is wrong because .query() and bracket filtering produce identical results on all platforms. D is wrong because index=False works identically on all operating systems — it simply omits the row index from the CSV output."
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
          "The robust option should not be used because it changes the coefficient values reported",
          "Manually copying results into LaTeX is error-prone and non-reproducible — should use esttab to export tables directly from Stata to LaTeX",
          "LaTeX cannot render regression coefficients with proper formatting from external sources",
          "The regression is missing an intercept, which makes the coefficients unreliable"
        ],
        correct: 1,
        explanation: "B is correct: manual copy-paste introduces transcription errors (wrong digit, wrong decimal place) that are undetectable and non-reproducible. Automated export with esttab ensures the numbers in the paper always match the code output. A is wrong because robust does not change coefficients — it only changes standard errors. C is wrong because LaTeX excels at rendering formatted tables, and tools like esttab generate valid LaTeX code. D is wrong because Stata includes an intercept by default — there is no missing intercept."
      },
      // 5 - reorder (R) — Skill: automated table export for reproducibility
      {
        type: "reorder",
        title: "Automated Table Export in R",
        prompt: "Arrange these R lines to run a regression and export a reproducible LaTeX table.",
        hint: "Load packages first, then estimate the model, export the table, and confirm. The <code>etable()</code> function from fixest handles the export.",
        lang: "r",
        lines: [
          "model <- feols(wage ~ education + experience | firm_id,\n               data = df)",
          "cat('Table exported to:', here('output', 'tables', 'regression.tex'))",
          "library(fixest)\nlibrary(here)",
          "etable(model, tex = TRUE,\n       file = here('output', 'tables', 'regression.tex'))"
        ],
        correctOrder: [2, 0, 3, 1],
        explanation: "Libraries must be loaded before their functions can be called (feols from fixest, here from here). The model must be estimated before etable() can format its results. etable() must write the file before the confirmation message references it. This pipeline is fully automated: re-running the script regenerates the identical table from data, eliminating transcription errors."
      },
      // 6 - reorder (Python) — Skill: table export for reproducibility
      {
        type: "reorder",
        title: "Automated Table Export in Python",
        prompt: "Arrange these lines to run regressions and export a reproducible LaTeX table.",
        hint: "Import libraries first, then run the regression, create the Stargazer table, and write it to a file.",
        lang: "python",
        lines: [
          "table = Stargazer([results])",
          "import statsmodels.api as sm",
          "with open('output/tables/regression.tex', 'w') as f:\n    f.write(table.render_latex())",
          "X = sm.add_constant(df[['education', 'experience']])\nresults = sm.OLS(df['wage'], X).fit(cov_type='HC1')",
          "from stargazer.stargazer import Stargazer"
        ],
        correctOrder: [1, 4, 3, 0, 2],
        explanation: "Both imports must come first since the regression uses sm.OLS and the table uses Stargazer. The regression must produce results before Stargazer can format them into a table. The Stargazer object must be created before render_latex() can generate the LaTeX string. File writing comes last because it depends on the rendered output. This ensures every number in the paper comes directly from the code."
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
        explanation: "GAP1 is set.seed — this fixes R's random number generator so that sample() inside replicate() draws the same indices every run. Students often write seed() (not an R function) or forget the dot in set.seed. GAP2 is sd — the standard deviation of the bootstrapped coefficients, which is the bootstrap standard error. Students sometimes write var() (which gives variance, not SD) or std() (which is not an R function)."
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
        ],
        explanation: "Non-portable paths cause machine-specific failures — a root variable makes all paths relative and portable. Unnumbered scripts leave collaborators guessing execution order — numbered prefixes make dependencies explicit. Manual copy-paste introduces transcription errors — automated export guarantees paper-code consistency. Overwriting raw data is irreversible — separating raw/ and processed/ folders ensures the original source is always recoverable."
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
          "Virtual environments make Python code execute faster by isolating the interpreter from system processes",
          "The requirements.txt file is only needed for publishing packages to PyPI and has no effect on research reproducibility",
          "Virtual environments prevent Python scripts from accessing the internet, ensuring analyses use only local data"
        ],
        correct: 0,
        explanation: "A is correct: the == syntax pins exact versions, so pip install -r requirements.txt installs the same pandas, statsmodels, etc. on every machine, preventing silent result changes from package updates. B is wrong because virtual environments do not improve execution speed — they isolate dependencies to avoid version conflicts. C is wrong because requirements.txt is widely used for reproducibility in any Python project, not just PyPI packages. D is wrong because virtual environments do not restrict network access — they only create an isolated package installation directory."
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
          "It makes paths shorter and more readable while maintaining portability — changing only the root line adapts the entire project to a new machine",
          "Stata requires every directory to be declared as a separate global macro before it can be accessed",
          "Each global macro creates a backup copy of the directory contents for data safety",
          "The globals prevent Stata from writing files outside the defined directory tree"
        ],
        correct: 0,
        explanation: "A is correct: sub-globals like $data, $code, $output make scripts cleaner (shorter paths) and portable (change only $root). All derived paths update automatically. B is wrong because Stata can use full path strings directly — globals are a convenience, not a requirement. C is wrong because global macros are just string variables; they do not copy files or create backups. D is wrong because globals do not enforce access restrictions — a script could still write to any path."
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
          "Line 3: read_csv from tidyverse cannot handle CSV files on macOS — should use base R's read.csv instead",
          "Lines 3 and 9 use absolute paths specific to Maria's computer — should use here::here() for portable project-relative paths",
          "Line 6: filter() conflicts with base R's filter function and will produce unexpected results",
          "Line 7: log(income + 1) is invalid because the log function cannot be used inside mutate()"
        ],
        correct: 1,
        explanation: "B is correct: /Users/maria/... only exists on Maria's machine. Using here('data', 'raw', 'survey.csv') makes the script work on any machine by automatically finding the project root. A is wrong because read_csv works on all operating systems — it is a cross-platform function. C is wrong because loading tidyverse masks base R's filter with dplyr's filter, which is the intended behavior in a tidyverse workflow. D is wrong because log() works perfectly inside mutate() — any R function can be used in a dplyr mutate call."
      },
      // 4 - bug (Stata) — Mistake: non-reproducible pipeline (missing dependencies)
      {
        type: "bug",
        title: "Broken Pipeline Dependency",
        prompt: "A reviewer runs the master script and gets an error on 03_analysis.do. The researcher says 'it works on my machine.' What is wrong?",
        hint: "Look carefully at the master script. Is every numbered script being executed? Check for any commented-out lines.",
        lang: "stata",
        code: "* master.do\nglobal root \"/Users/maria/projects/wage_study\"\n\ndo \"$root/code/01_import.do\"\n* do \"$root/code/02_clean.do\"   // commented out to save time\ndo \"$root/code/03_analysis.do\"\ndo \"$root/code/04_tables.do\"",
        options: [
          "The global root path needs to be updated for the reviewer's machine — that is why 03_analysis.do fails",
          "Script 02_clean.do is commented out, so 03_analysis.do cannot find the cleaned data it depends on — the pipeline has a broken dependency",
          "The do command should use run instead because run suppresses output and is faster",
          "The master script is missing a log file command, which is required for Stata to execute do-files"
        ],
        correct: 1,
        explanation: "B is correct: commenting out 02_clean.do breaks the pipeline because 03_analysis.do expects the cleaned dataset that 02 would have produced. It works on the researcher's machine because the processed file already exists from a previous run. A is wrong because while the root path may also need updating, the error is specifically about the missing cleaned data file, not the path. C is wrong because do and run both execute scripts — run just suppresses console output. D is wrong because log files are optional and unrelated to script execution."
      },
      // 5 - reorder (Python) — Skill: reproducible pipeline with Makefile-style script
      {
        type: "reorder",
        title: "Reproducible Pipeline in Python",
        prompt: "Arrange these Python lines to create a master script that runs the full analysis pipeline.",
        hint: "Start with imports, define ROOT relative to the script's location, list the numbered scripts, execute them in order, and print a completion message.",
        lang: "python",
        lines: [
          "scripts = ['01_import.py', '02_clean.py',\n           '03_analysis.py', '04_tables.py']",
          "print('Full pipeline finished successfully.')",
          "import subprocess\nfrom pathlib import Path",
          "for script in scripts:\n    result = subprocess.run(\n        ['python', ROOT / 'code' / script], check=True)\n    print(f'Completed: {script}')",
          "ROOT = Path(__file__).parent"
        ],
        correctOrder: [2, 4, 0, 3, 1],
        explanation: "Imports must come first so subprocess and Path are available. ROOT must be defined before it is used in the loop. The scripts list must exist before the loop iterates over it. The loop must complete all scripts before the final success message. check=True ensures the pipeline stops on any error rather than silently continuing with stale data — a critical feature for reproducibility."
      },
      // 6 - reorder (Stata) — Skill: complete reproducible workflow
      {
        type: "reorder",
        title: "Full Reproducible Master Script",
        prompt: "Arrange these lines into a complete, reproducible master script.",
        hint: "Define the root path first, then open the log file, execute the numbered scripts in order, and close the log at the end.",
        lang: "stata",
        lines: [
          "do \"$root/code/02_clean.do\"",
          "log close",
          "log using \"$root/output/logs/master.log\", replace",
          "global root \"/Users/maria/projects/wage_study\"",
          "do \"$root/code/03_analysis.do\"",
          "do \"$root/code/01_import.do\""
        ],
        correctOrder: [3, 2, 5, 0, 4, 1],
        explanation: "The root path must be defined first because every subsequent line uses $root. The log file must open before the do-files so it captures all their output. The three do-files must execute in numbered order (import produces raw data for clean, clean produces processed data for analysis). log close must come last to ensure all output is captured and the file is properly saved."
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
        explanation: "Both gaps are here — the package name in library() and the function for building paths. GAP1: students sometimes write 'file.path' (which is an R function but requires manual root specification) or 'rprojroot' (the underlying package, but here wraps it). GAP2: students sometimes use paste0() or file.path() to build paths, but these require knowing the absolute root. here() automatically finds the project root and is the standard for portable R scripts."
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
        ],
        explanation: "Descriptive commits provide a decision log — reviewers can trace when a specification changed and why. Feature branches isolate experimental work so the main analysis remains runnable. .gitignore prevents accidental exposure of API keys or 500MB data files that would break the repository. Pull-before-push ensures you merge collaborators' recent changes before adding yours, preventing lost work and merge conflicts."
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
        prompt: "What does this code do, and why are test_size=0.2 and random_state=42 specified?",
        hint: "Look at the <code>train_test_split</code> function. <code>test_size=0.2</code> controls the proportion held out, and <code>random_state</code> fixes the randomness.",
        lang: "python",
        code: "from sklearn.model_selection import train_test_split\n\nX = df[['income', 'education', 'age']]\ny = df['consumption']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
        options: [
          "Splits data into 80% training and 20% test sets; random_state=42 ensures the same split every time for reproducibility",
          "Splits data into 20% training and 80% test sets; random_state=42 runs 42 different random shuffles and picks the best",
          "Removes 20% of the data as outliers based on statistical tests; random_state controls the outlier detection seed",
          "Splits each feature column independently into train and test portions; random_state determines column ordering"
        ],
        correct: 0,
        explanation: "A is correct: test_size=0.2 reserves 20% for testing (so 80% for training), and random_state=42 fixes the random seed for reproducibility. B is wrong because test_size specifies the test proportion (not training), and random_state is a seed value, not a count of shuffles. C is wrong because train_test_split performs random splitting, not outlier detection — no observations are removed based on their values. D is wrong because the function splits rows (observations) together, keeping features aligned — it never splits columns independently."
      },
      // 2 - read (Stata) — Skill: understanding train/test split
      {
        type: "read",
        title: "Train-Test Split in Stata",
        prompt: "What does this Stata code accomplish, and why is the seed set before splitting?",
        hint: "The <code>set seed</code> command ensures reproducibility. Then <code>runiform()</code> assigns random numbers used to split the data. Look at the proportion in the <code>gen train</code> line.",
        lang: "stata",
        code: "set seed 42\ngen sample = runiform()\nsort sample\ngen train = (_n <= int(0.8 * _N))\n\nreg consumption income education age if train == 1\npredict yhat\ngen sq_err = (consumption - yhat)^2 if train == 0\nsum sq_err if train == 0",
        options: [
          "Splits data into 80% training and 20% test sets using random numbers; set seed 42 ensures the same split every run",
          "Randomly removes 20% of observations as outliers; set seed 42 ensures the same outliers are removed each time",
          "Trains the regression on all data and evaluates on a random 20% subset; set seed controls the evaluation sample",
          "Creates 42 bootstrap samples and averages the regression results across all of them"
        ],
        correct: 0,
        explanation: "A is correct: runiform() assigns a random number to each row, sorting by it randomizes the order, and the first 80% become training data. The regression trains on train==1 and errors are evaluated on train==0 (test set). B is wrong because no observations are removed — they are all retained but assigned to different roles (train vs. test). C is wrong because the regression uses 'if train == 1', meaning it trains on only 80%, not all data. D is wrong because set seed 42 sets a single seed for reproducibility — it does not create 42 samples."
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
          "Line 7: lm() requires explicit hyperparameter tuning to produce consistent results",
          "Line 9: the RMSE formula is mathematically incorrect and should divide by n before taking the square root",
          "Line 3: initial_split() involves random sampling, but there is no set.seed() before it — each run creates a different split, producing different RMSE values",
          "Line 3: prop = 0.8 keeps too much data for training, leaving too few test observations for stable RMSE"
        ],
        correct: 2,
        explanation: "C is correct: without set.seed() before initial_split(), R uses a different random seed each time, creating different train/test splits and therefore different RMSE values. A is wrong because lm() is deterministic — given the same data, it always produces the same coefficients. B is wrong because the formula sqrt(mean((pred - actual)^2)) is the correct RMSE formula. D is wrong because 80/20 is a standard split ratio — the instability comes from the randomness, not the proportion."
      },
      // 4 - bug (Stata) — Mistake: using accuracy on imbalanced classes
      {
        type: "bug",
        title: "Misleading Accuracy on Imbalanced Data",
        prompt: "A classifier for loan default achieves 95% accuracy. The researcher celebrates. What is wrong?",
        hint: "Look at the class distribution: 95% non-default, 5% default. What accuracy would a model that <b>always predicts no default</b> achieve?",
        lang: "stata",
        code: "* Data: 95% non-default, 5% default\nlogit default income credit_score age if train == 1\npredict phat if train == 0, pr\ngen predicted_default = (phat > 0.5) if train == 0\ngen correct = (predicted_default == default) if train == 0\nsum correct\n* Output: mean = .95 (95% accuracy)",
        options: [
          "The logit command is the wrong model — should use probit for binary classification in Stata",
          "With 95% non-default observations, a naive model predicting 'no default' for everyone achieves 95% accuracy — should use AUC (lroc) or confusion matrix (estat classification) instead",
          "The predict command should use the xb option instead of pr to get proper predicted probabilities",
          "The 0.5 threshold is always optimal for classification and is not the source of the problem"
        ],
        correct: 1,
        explanation: "B is correct: when 95% of observations belong to one class, a model that always predicts that class achieves 95% accuracy without learning anything. AUC evaluates discrimination across all thresholds, and confusion matrices reveal whether the model actually detects defaults. A is wrong because logit and probit are both valid for binary outcomes — the issue is the evaluation metric, not the model choice. C is wrong because the pr option correctly gives predicted probabilities between 0 and 1; xb gives the linear predictor (log-odds). D is wrong because 0.5 is often suboptimal for imbalanced data — but the deeper problem is using accuracy at all, regardless of threshold."
      },
      // 5 - reorder (Python) — Skill: basic ML pipeline
      {
        type: "reorder",
        title: "Basic ML Pipeline",
        prompt: "Arrange these lines into a correct machine learning workflow.",
        hint: "The ML workflow follows: import, split data, create model, train (fit), then evaluate on test data. Training and evaluation must use separate data.",
        lang: "python",
        lines: [
          "y_pred = model.predict(X_test)\nrmse = np.sqrt(np.mean((y_pred - y_test)**2))\nprint(f'Test RMSE: {rmse:.4f}')",
          "model = LinearRegression()",
          "from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression",
          "model.fit(X_train, y_train)",
          "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)"
        ],
        correctOrder: [2, 4, 1, 3, 0],
        explanation: "Imports must come first to make functions available. Data must be split before training so the test set is held out. The model object must be created before .fit() can be called on it. The model must be trained before .predict() can generate predictions. Evaluation on the test set comes last because it requires both predictions and the true test labels."
      },
      // 6 - reorder (R) — Skill: train/test split in R
      {
        type: "reorder",
        title: "Train-Test Split in R",
        prompt: "Arrange these R lines to split data, train a model, and evaluate it.",
        hint: "Start by loading the package, then set seed and split, extract train/test sets, fit the model on training data, and evaluate on test data.",
        lang: "r",
        lines: [
          "model <- lm(wage ~ education + experience, data = train_data)",
          "set.seed(42)\nsplit <- initial_split(df, prop = 0.8)",
          "predictions <- predict(model, newdata = test_data)\nrmse <- sqrt(mean((predictions - test_data$wage)^2))\ncat('Test RMSE:', round(rmse, 4))",
          "library(rsample)",
          "train_data <- training(split)\ntest_data <- testing(split)"
        ],
        correctOrder: [3, 1, 4, 0, 2],
        explanation: "rsample must be loaded before initial_split() is available. set.seed() must be called before initial_split() to make the random split reproducible. The split object must exist before training() and testing() can extract subsets. The model must be trained on training data before predictions can be made on test data. Evaluation comes last because it requires both the fitted model and the test data."
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
        explanation: "GAP1 is Lasso — the sklearn class for L1-regularized regression. Students often write 'lasso' (lowercase, which Python would not find) or 'Ridge' (which is L2 penalty and does not set coefficients to zero). GAP2 is 0.1 — the regularization strength. A common mistake is confusing alpha with the significance level in hypothesis testing; here alpha controls how strongly coefficients are penalized toward zero."
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
        ],
        explanation: "RMSE is in the outcome's units (e.g., dollars), making it interpretable for regression. R-squared is unitless and ranges from 0 to 1, showing explanatory power. AUC evaluates classification performance without committing to a specific threshold — 0.5 is random guessing, 1.0 is perfect. Recall focuses specifically on catching positives (e.g., detecting all loan defaults), while precision (not listed) focuses on avoiding false alarms."
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
          "Lasso penalizes coefficients by absolute magnitude, so without standardization features on larger scales get unfairly protected from penalization — standardizing puts all features on equal footing",
          "The egen std() function speeds up Lasso convergence but does not change which features are selected",
          "Standardization is required because lasso linear only accepts input values between -3 and 3",
          "Standardization removes outliers from the data, which would otherwise dominate the Lasso penalty term"
        ],
        correct: 0,
        explanation: "A is correct: Lasso's L1 penalty is applied equally to all coefficient magnitudes. Without standardization, income (in thousands) has a tiny coefficient that barely gets penalized, while education (single digits) has a large coefficient that gets penalized heavily. B is wrong because standardization changes which features survive the penalty, not just convergence speed. C is wrong because lasso linear accepts any numeric values — there is no range restriction. D is wrong because standardization rescales all values (subtracting the mean and dividing by the SD), it does not remove any observations."
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
          "num.trees=500 grows 500 decision trees; mtry=2 means each split randomly considers only 2 of the 4 features, reducing correlation between trees",
          "num.trees=500 limits each tree to 500 leaf nodes; mtry=2 permanently removes 2 features from the entire model",
          "num.trees=500 uses 500 bootstrap samples of observations per tree; mtry=2 multiplies each feature by a scaling factor of 2",
          "num.trees=500 creates 500 cross-validation folds; mtry=2 selects the top 2 features globally based on importance scores"
        ],
        correct: 0,
        explanation: "A is correct: num.trees=500 grows 500 independent trees, and mtry=2 restricts each split to a random subset of 2 features. This randomness decorrelates the trees, reducing variance when averaging their predictions. B is wrong because num.trees controls the number of trees (not nodes), and mtry randomly varies which features are considered at each split (not removed permanently). C is wrong because num.trees is about tree count, not bootstrap size (bootstrap size equals the training set by default). D is wrong because random forests do not use cross-validation internally — each tree is trained on a bootstrap sample, and mtry applies per-split, not globally."
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
          "Line 9: Lasso requires a larger alpha value to avoid overfitting when features are scaled",
          "Line 5: fit_transform is applied to ALL data before splitting — the scaler learns the mean and standard deviation from test data too, leaking test information into training",
          "Line 7: manually splitting with indices is incorrect — must use train_test_split instead",
          "Line 4: StandardScaler should be MinMaxScaler because Lasso requires features in the 0-1 range"
        ],
        correct: 1,
        explanation: "B is correct: fitting the scaler on all data (line 5) means the training features are centered and scaled using the test set's mean and standard deviation. This leaks test information into training, making the model's test performance appear better than it truly is. A is wrong because alpha choice is independent of scaling — and data leakage is a far more serious problem than regularization tuning. C is wrong because manual index splitting is a valid alternative to train_test_split — the issue is the scaling order, not the splitting method. D is wrong because Lasso works with any scaler (or none) — StandardScaler is standard practice."
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
          "glmnet cannot accept a single lambda value — it requires a sequence of at least 10 lambda values",
          "The RMSE formula should use length(y_test) in the denominator for proper normalization",
          "Selecting the lambda that minimizes test error uses the test set for model selection — this overfits to the test set. Should use cv.glmnet() on training data instead",
          "The lambda values should be evenly spaced on a linear scale rather than a logarithmic scale"
        ],
        correct: 2,
        explanation: "C is correct: the test set should be touched only once for final evaluation. Using it to select the best lambda among 5 candidates means the reported RMSE reflects the best of 5 attempts, which is optimistically biased. cv.glmnet() performs cross-validation on the training data to select lambda. A is wrong because glmnet can accept a single lambda — it just usually computes a path over many values for efficiency. B is wrong because mean() already divides by n, so the formula is correct. D is wrong because the spacing of lambda values is a practical choice, not a methodological error — the problem is where they are evaluated."
      },
      // 5 - reorder (Stata) — Skill: Lasso with cross-validation in Stata
      {
        type: "reorder",
        title: "Lasso with Cross-Validation in Stata",
        prompt: "Arrange these Stata lines to fit a Lasso model with automatic cross-validated lambda selection.",
        hint: "Load data and set seed first, then fit the Lasso with CV, inspect the selected coefficients, and finally evaluate predictions.",
        lang: "stata",
        lines: [
          "set seed 42",
          "lassocoef, display(coef, penalized)",
          "predict yhat\ngen sq_err = (consumption - yhat)^2\nsum sq_err",
          "use household_data.dta, clear",
          "lasso linear consumption income education age experience,\n    selection(cv, folds(5))"
        ],
        correctOrder: [3, 0, 4, 1, 2],
        explanation: "Data must be loaded before any analysis. The seed must be set before lasso because cross-validation involves random fold assignment. The lasso command must complete before lassocoef can display which variables were selected. Predictions and error evaluation come last because they require the fitted model. Each step produces output that the next step depends on."
      },
      // 6 - reorder (Python) — Skill: proper scaling pipeline
      {
        type: "reorder",
        title: "Correct Scaling Pipeline",
        prompt: "Arrange these lines to properly scale features without data leakage.",
        hint: "Import first, split data, then fit the scaler on <b>training data only</b> (<code>fit_transform</code>), apply it to test data (<code>transform</code> only), and finally train and evaluate.",
        lang: "python",
        lines: [
          "X_test_scaled = scaler.transform(X_test)",
          "from sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge",
          "model = Ridge(alpha=1.0).fit(X_train_scaled, y_train)\nprint(f'Test R2: {model.score(X_test_scaled, y_test):.4f}')",
          "scaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)",
          "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)"
        ],
        correctOrder: [1, 4, 3, 0, 2],
        explanation: "Imports must come first. The data must be split before any scaling to prevent leakage. The scaler must be fit on training data only (fit_transform), learning the training mean and SD. The test data must be transformed using those same training statistics (transform only — no fitting). Finally, the model trains on scaled training data and evaluates on scaled test data. Fitting the scaler on training only is what prevents data leakage."
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
        explanation: "GAP1 is lasso — the Stata 16+ command for L1-regularized linear regression. Students sometimes write 'Lasso' (capitalized, which Stata does not recognize) or 'elasticnet' (a different command). GAP2 is 5 (or 10) — the number of cross-validation folds used to select the optimal lambda. Too few folds (e.g., 2) give high-variance estimates; too many (e.g., 50) are computationally expensive with minimal benefit. 5 or 10 is standard practice."
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
        ],
        explanation: "Lasso's L1 penalty uses the absolute value of coefficients, creating a 'diamond' constraint that has corners at zero — geometrically, solutions often land exactly at zero, producing sparse models. Ridge's L2 penalty uses squared coefficients, creating a smooth 'circle' constraint with no corners — coefficients shrink toward zero but never reach it. Higher alpha strengthens both penalties, trading bias for reduced variance. Cross-validation evaluates each alpha on held-out folds to find the best bias-variance tradeoff."
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
        prompt: "What does DoubleMLPLR do, and what roles do ml_l and ml_m play?",
        hint: "Double ML uses two separate ML models as 'nuisance learners': one predicts the outcome (Y) from controls, and one predicts the treatment (D) from controls. This partials out confounders.",
        lang: "python",
        code: "from doubleml import DoubleMLPLR, DoubleMLData\nfrom sklearn.ensemble import RandomForestRegressor\n\ndml_data = DoubleMLData(df, y_col='wage', d_cols='training',\n                        x_cols=['age', 'education', 'experience'])\nml_l = RandomForestRegressor(n_estimators=500)\nml_m = RandomForestRegressor(n_estimators=500)\n\ndml_plr = DoubleMLPLR(dml_data, ml_l, ml_m)\ndml_plr.fit()\nprint(dml_plr.summary)",
        options: [
          "DoubleMLPLR estimates the causal effect of training on wage; ml_l predicts the outcome from controls and ml_m predicts the treatment from controls — both are nuisance models partialled out to debias the estimate",
          "DoubleMLPLR runs two separate random forests and averages their predictions for higher accuracy than a single forest",
          "ml_l and ml_m refer to the 'left' and 'middle' partitions of the data used for cross-fitting the model",
          "DoubleMLPLR fits a partially linear regression where ml_l corrects for measurement error in the outcome and ml_m corrects for measurement error in the treatment"
        ],
        correct: 0,
        explanation: "A is correct: Double ML estimates a causal treatment effect by using ml_l to partial out confounders from the outcome (wage) and ml_m to partial out confounders from the treatment (training). The residuals from both are then used in a simple regression to get the debiased treatment effect. B is wrong because the two models serve different roles (outcome vs. treatment prediction), not the same role averaged together. C is wrong because ml_l and ml_m are model objects, not data partitions — cross-fitting is handled internally by DoubleMLPLR. D is wrong because Double ML addresses confounding (omitted variable bias), not measurement error — the 'double' refers to partialling out confounders from both Y and D."
      },
      // 2 - read (R) — Skill: causal forests
      {
        type: "read",
        title: "Causal Forest for Heterogeneous Effects",
        prompt: "What does this causal forest estimate, and how does it differ from a standard random forest?",
        hint: "A standard random forest predicts E[Y|X]. A <b>causal</b> forest estimates E[Y(1) - Y(0) | X] — the treatment effect that varies by individual characteristics.",
        lang: "r",
        code: "library(grf)\n\ncf <- causal_forest(\n    X = as.matrix(df[, c('age', 'education', 'income')]),\n    Y = df$wage,\n    W = df$training,\n    num.trees = 2000\n)\ntau_hat <- predict(cf)$predictions\nhist(tau_hat, main = 'Distribution of Treatment Effects')",
        options: [
          "It estimates individual-level causal treatment effects (CATEs) of training on wage that vary by covariates — unlike a standard random forest, it targets the treatment effect function, not the outcome prediction",
          "It predicts wage levels using training as one of several input features, exactly like a standard random forest would",
          "It removes confounding by running separate random forests within the treated and untreated groups and subtracting predictions",
          "It estimates only the average treatment effect (a single number), not individual-level heterogeneous effects"
        ],
        correct: 0,
        explanation: "A is correct: causal forests estimate Conditional Average Treatment Effects (CATEs) — how the causal effect of training on wage varies across individuals with different characteristics (age, education, income). B is wrong because a causal forest does not predict wage levels; it estimates the difference Y(1)-Y(0), which is fundamentally different from E[Y|X]. C is wrong because causal forests use a more sophisticated approach: they split on covariates that maximize treatment effect heterogeneity, not just prediction accuracy within groups. D is wrong because predict(cf)$predictions returns an individual-level treatment effect for each observation, and the histogram visualizes this heterogeneity."
      },
      // 3 - bug (Stata) — Mistake: not scaling features before Lasso
      {
        type: "bug",
        title: "Unscaled Lasso in Stata",
        prompt: "This Lasso model keeps only income and drops education. The researcher concludes education does not matter for consumption. What went wrong?",
        hint: "Compare the scales: income is in dollars (mean ~50000) while education is in years (mean ~14). How does this affect the coefficient magnitudes and Lasso's penalty?",
        lang: "stata",
        code: "* income in dollars (mean ~50000), education in years (mean ~14)\nlasso linear consumption income education age\nlassocoef\n* Output: only income has a non-zero coefficient\n* \"Education has no effect on consumption\"",
        options: [
          "The lasso linear command cannot handle more than two predictor features simultaneously",
          "The Lasso penalty is always too strong by default for any dataset and must be manually reduced",
          "Features were not standardized — income's large scale makes its coefficient naturally tiny, so the L1 penalty disproportionately shrinks education's larger coefficient to zero first",
          "Lasso correctly identified that education is truly uncorrelated with consumption in this population"
        ],
        correct: 2,
        explanation: "C is correct: without standardization, income (mean ~50000) gets a tiny coefficient (e.g., 0.0001 per dollar) while education (mean ~14) gets a large coefficient (e.g., 500 per year). The L1 penalty treats all coefficients equally by magnitude, so it shrinks education's large coefficient to zero first, even if education is actually important. A is wrong because lasso linear handles any number of features. B is wrong because Stata's lasso uses cross-validation by default to select the penalty — the issue is the feature scales, not the penalty magnitude. D is wrong because the selection is an artifact of the scale mismatch, not a valid finding about the true relationship."
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
          "Random forests cannot compute feature importance — the importance scores are unreliable and should not be used",
          "A test R-squared of 0.85 indicates severe overfitting, which invalidates any interpretation of the model",
          "Feature importance measures predictive association, not causal effect — education may correlate with unobserved ability, so a causal claim requires causal ML methods (DML, causal forests) or experimental data",
          "The random forest needs at least 1000 trees for the feature importance ranking to be statistically valid"
        ],
        correct: 2,
        explanation: "C is correct: random forest feature importance measures how much prediction accuracy drops when a feature is permuted — this captures correlation, not causation. Education may be a strong predictor because it correlates with unobserved ability, not because it causes higher wages. A is wrong because random forests do compute valid importance scores — they are just importance for prediction, not causal importance. B is wrong because 0.85 on a held-out test set is a legitimate performance measure, not evidence of overfitting (overfitting would show high training R-squared but low test R-squared). D is wrong because 500 trees is typically sufficient for stable importance rankings — the fundamental problem is conflating prediction with causation, regardless of tree count."
      },
      // 5 - reorder (Stata) — Skill: Lasso for treatment effect estimation
      {
        type: "reorder",
        title: "Lasso-Based Treatment Effect in Stata",
        prompt: "Arrange these Stata lines to estimate a treatment effect using Lasso for variable selection (double selection).",
        hint: "Load data first, then the two Lasso steps select controls for outcome and treatment separately. The <code>dsregress</code> command combines them into the final debiased estimate.",
        lang: "stata",
        lines: [
          "* Step 2: Lasso-select controls for treatment\nlasso linear training age education experience x1-x20,\n    selection(cv)",
          "* Display results with valid standard errors\nestimates table, se",
          "use training_data.dta, clear\nset seed 42",
          "* Step 1: Lasso-select controls for outcome\nlasso linear wage age education experience x1-x20,\n    selection(cv)",
          "* Step 3: Post-double-selection estimator\ndsregress wage training,\n    controls(age education experience x1-x20)"
        ],
        correctOrder: [2, 3, 0, 4, 1],
        explanation: "Data must be loaded and the seed set before any analysis. Step 1 uses Lasso to identify which controls predict the outcome (wage) — this must precede the final estimator. Step 2 uses Lasso to identify which controls predict the treatment (training) — also needed before dsregress. dsregress combines both selection results into a debiased treatment effect estimate. estimates table comes last because it displays the final results. The double-selection approach ensures that omitting relevant controls from either equation does not bias the treatment effect."
      },
      // 6 - reorder (R) — Skill: full Lasso pipeline with glmnet
      {
        type: "reorder",
        title: "Complete Lasso Pipeline in R",
        prompt: "Arrange these R lines for a Lasso pipeline with CV tuning and honest evaluation.",
        hint: "Load packages, split data, prepare matrices, use <code>cv.glmnet()</code> to find the best lambda via cross-validation, then evaluate <b>once</b> on the test set.",
        lang: "r",
        lines: [
          "cv_model <- cv.glmnet(X_train, y_train, alpha = 1, nfolds = 5)\ncat('Best lambda:', cv_model$lambda.min, '\\n')",
          "library(glmnet)\nlibrary(rsample)",
          "preds <- predict(cv_model, X_test, s = 'lambda.min')\nrmse <- sqrt(mean((preds - y_test)^2))\ncat('Test RMSE:', round(rmse, 4))",
          "X_train <- as.matrix(train_data[, c('income', 'education', 'age')])\ny_train <- train_data$consumption\nX_test <- as.matrix(test_data[, c('income', 'education', 'age')])\ny_test <- test_data$consumption",
          "set.seed(42)\nsplit <- initial_split(df, prop = 0.8)\ntrain_data <- training(split)\ntest_data <- testing(split)"
        ],
        correctOrder: [1, 4, 3, 0, 2],
        explanation: "Libraries must load before their functions are available. The data split must happen before matrices are prepared. Matrices must be constructed before cv.glmnet can use them. cv.glmnet must select the best lambda via cross-validation on training data before the test set is touched. The test evaluation comes last and happens only once — this is the 'honest' part: using the test set for evaluation only, never for model selection."
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
        explanation: "GAP1 is grf — the Generalized Random Forests package that provides causal_forest(). Students sometimes write 'randomForest' or 'ranger', which are standard prediction forests without causal estimation capabilities. GAP2 is training — the binary treatment indicator (W). A common mistake is putting the outcome variable here instead of the treatment, or confusing X (covariates) with W (treatment). The W argument must be binary (0/1) indicating which observations received the treatment."
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
        ],
        explanation: "Prediction ML (Random Forest, Lasso) answers 'what will Y be?' — ideal for forecasting and screening. Double ML answers 'what is the average causal effect of D on Y?' by using ML to flexibly control for confounders while still delivering a valid causal estimate. Causal forests go further by answering 'how does the causal effect vary across individuals?' — useful for targeting interventions. Cross-validated Lasso answers 'which variables matter for prediction?' through automatic feature selection, distinct from causal variable importance."
      }
    ]
  };

})();
