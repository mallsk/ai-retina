'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating realistic experimental evaluation metrics for a classification model.
 *
 * The flow takes no input and returns an object containing accuracy, precision, recall, and F1-score.
 * This is designed to simulate model performance assessment in a research environment.
 *
 * @exports generateEvaluationMetrics - The main function to trigger the evaluation metrics generation flow.
 * @exports EvaluationMetricsOutput - The type definition for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluationMetricsOutputSchema = z.object({
  accuracy: z.number().describe('The accuracy of the classification model (0-1).'),
  precision: z.number().describe('The precision of the classification model (0-1).'),
  recall: z.number().describe('The recall of the classification model (0-1).'),
  f1Score: z.number().describe('The F1-score of the classification model (0-1).'),
});
export type EvaluationMetricsOutput = z.infer<typeof EvaluationMetricsOutputSchema>;

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
