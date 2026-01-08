import {z} from 'genkit';

export const ClassifySeverityInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a retina, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifySeverityInput = z.infer<typeof ClassifySeverityInputSchema>;

export const ClassifySeverityOutputSchema = z.object({
  severity: z.enum(['Low Diabetic Retinopathy', 'Mid Diabetic Retinopathy', 'High Diabetic Retinopathy']).describe('The severity level of diabetic retinopathy.'),
  confidence: z.number().min(0).max(1).describe('The confidence score of the classification, between 0 and 1.'),
});
export type ClassifySeverityOutput = z.infer<typeof ClassifySeverityOutputSchema>;
