import {z} from 'genkit';

export const GenerateDoctorDashboardInputSchema = z.object({
  retinalImageDescription: z
    .string()
    .describe('A description of the retinal image, including observed features.'),
  severityClassification: z
    .string()
    .describe('The severity classification of the diabetic retinopathy (Low, Mid, High).'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score of the severity classification (0 to 1).'),
});
export type GenerateDoctorDashboardInput = z.infer<typeof GenerateDoctorDashboardInputSchema>;

export const GenerateDoctorDashboardOutputSchema = z.object({
  keyClinicalFindings: z.string().describe('Key clinical findings from the retinal image.'),
  affectedRetinalRegions: z.string().describe('Affected retinal regions based on the analysis.'),
  suggestedClinicalActions: z
    .string()
    .describe('Suggested clinical actions for educational purposes only (assistive, non-prescriptive).'),
  followUpUrgencyLevel: z.string().describe('Follow-up urgency level based on the severity.'),
});
export type GenerateDoctorDashboardOutput = z.infer<typeof GenerateDoctorDashboardOutputSchema>;
