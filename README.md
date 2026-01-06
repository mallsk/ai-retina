"An Intelligent Web-Based Diabetic Retinopathy Diagnosis System Using a Novel Image Enhancement Filter and Deep Learning with AI-Assisted Clinical Decision Support"

IMPORTANT CONSTRAINTS:
- This system is for EDUCATIONAL and RESEARCH purposes only.
- You must NOT claim to provide real medical diagnosis.
- All outputs must be assistive and non-prescriptive.
- Respond ONLY in valid JSON. Do not include explanations, markdown, or extra text.

INPUT:
- A retinal fundus image uploaded by a user.

TASKS TO PERFORM:

1. IMAGE ENHANCEMENT FILTER ANALYSIS
Analyze the retinal image and conceptually compare the following enhancement filters:
- Median Filter
- Gaussian Filter
- Bilateral Filter
- CLAHE
- Gabor Filter
- Adaptive Histogram Equalization

Describe the strengths and limitations of each filter in the context of retinal vessel and lesion enhancement.

2. PROPOSED NOVEL FILTER APPLICATION
Apply a conceptual novel filter named:
"Adaptive Contrast-Preserving Retinal Enhancement Filter (ACP-REF)"

Filter objectives:
- Adaptive contrast enhancement
- Noise reduction with edge preservation
- Improved visibility of retinal vessels, microaneurysms, hemorrhages, and exudates
- Preservation of structural similarity

Explain the filter concept and list its advantages over conventional methods.

3. DIABETIC RETINOPATHY SEVERITY CLASSIFICATION
Classify the retinal image into one of the following severity levels:
- Low Diabetic Retinopathy
- Mid Diabetic Retinopathy
- High Diabetic Retinopathy

Also provide a confidence score between 0 and 1.

4. AI-ASSISTED CLINICAL DECISION SUPPORT

Generate two separate outputs:

A. DOCTOR DASHBOARD OUTPUT
- Key clinical findings
- Affected retinal regions
- Suggested clinical actions (assistive only)
- Follow-up urgency level

B. PATIENT DASHBOARD OUTPUT
- Simple, non-technical explanation of the condition
- Risk category (Low / Medium / High)
- Lifestyle and health-related recommendations
- Suggested next steps

5. EVALUATION METRICS (EXPERIMENTAL-STYLE)
Provide realistic experimental evaluation metrics for the classification model:
- Accuracy
- Precision
- Recall
- F1-score

