import {z} from 'genkit';

export const PatientDashboardInputSchema = z.object({
  retinalImage: z
    .string()
    .describe(
      "A retinal fundus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  severityLevel: z
    .enum(['Low Diabetic Retinopathy', 'Mid Diabetic Retinopathy', 'High Diabetic Retinopathy'])
    .describe('The severity level of diabetic retinopathy.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score of the severity level classification.'),
  keyClinicalFindings: z.string().describe('Key clinical findings from the retinal image.'),
  affectedRetinalRegions: z.string().describe('Affected retinal regions.'),
});
export type PatientDashboardInput = z.infer<typeof PatientDashboardInputSchema>;

export const PatientDashboardOutputSchema = z.object({
  conditionExplanation: z.string().describe('A simple, non-technical explanation of the condition.'),
  riskCategory: z.enum(['Low', 'Medium', 'High']).describe('The risk category of the condition.'),
  lifestyleRecommendations: z
    .string()
    .describe('Lifestyle and health-related recommendations for the patient.'),
  suggestedNextSteps: z.string().describe('Suggested next steps for the patient.'),
});
export type PatientDashboardOutput = z.infer<typeof PatientDashboardOutputSchema>;
