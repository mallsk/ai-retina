import {z} from 'genkit';

export const EvaluationMetricsOutputSchema = z.object({
  accuracy: z.number().describe('The accuracy of the classification model (0-1).'),
  precision: z.number().describe('The precision of the classification model (0-1).'),
  recall: z.number().describe('The recall of the classification model (0-1).'),
  f1Score: z.number().describe('The F1-score of the classification model (0-1).'),
});
export type EvaluationMetricsOutput = z.infer<typeof EvaluationMetricsOutputSchema>;
