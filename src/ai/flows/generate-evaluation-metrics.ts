'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating realistic experimental evaluation metrics for a classification model.
 *
 * The flow takes no input and returns an object containing accuracy, precision, recall, and F1-score.
 * This is designed to simulate model performance assessment in a research environment.
 *
 * @exports generateEvaluationMetrics - The main function to trigger the evaluation metrics generation flow.
 */

import {ai} from '@/ai/genkit';
import type { EvaluationMetricsOutput } from '@/ai/types/generate-evaluation-metrics';
import { EvaluationMetricsOutputSchema } from '@/ai/types/generate-evaluation-metrics';


export async function generateEvaluationMetrics(): Promise<EvaluationMetricsOutput> {
  return generateEvaluationMetricsFlow();
}

const generateEvaluationMetricsPrompt = ai.definePrompt({
  name: 'generateEvaluationMetricsPrompt',
  output: {schema: EvaluationMetricsOutputSchema},
  prompt: `You are an AI assistant specialized in generating realistic, but simulated, evaluation metrics for machine learning classification models.

  Generate realistic values (between 0 and 1) for the following metrics:
  - Accuracy: Overall correctness of the model.
  - Precision: How many of the positive predictions were actually correct.
  - Recall: How many of the actual positive cases were correctly predicted.
  - F1-score: The harmonic mean of precision and recall, providing a balanced measure.

  Ensure the values are realistic and plausible for a diabetic retinopathy classification model. Provide the metrics as a JSON object.
  Do not add explanations, only provide the JSON object.
  `,
});

const generateEvaluationMetricsFlow = ai.defineFlow(
  {
    name: 'generateEvaluationMetricsFlow',
    outputSchema: EvaluationMetricsOutputSchema,
  },
  async () => {
    const {output} = await generateEvaluationMetricsPrompt({});
    return output!;
  }
);
