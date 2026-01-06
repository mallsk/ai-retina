'use server';
/**
 * @fileOverview Classifies retinal images into severity levels (Low, Mid, High) with a confidence score.
 *
 * - classifySeverity - A function that handles the severity classification process.
 * - ClassifySeverityInput - The input type for the classifySeverity function.
 * - ClassifySeverityOutput - The return type for the classifySeverity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifySeverityInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a retina, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifySeverityInput = z.infer<typeof ClassifySeverityInputSchema>;

const ClassifySeverityOutputSchema = z.object({
  severity: z.enum(['Low Diabetic Retinopathy', 'Mid Diabetic Retinopathy', 'High Diabetic Retinopathy']).describe('The severity level of diabetic retinopathy.'),
  confidence: z.number().min(0).max(1).describe('The confidence score of the classification, between 0 and 1.'),
});
export type ClassifySeverityOutput = z.infer<typeof ClassifySeverityOutputSchema>;

export async function classifySeverity(input: ClassifySeverityInput): Promise<ClassifySeverityOutput> {
  return classifySeverityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifySeverityPrompt',
  input: {schema: ClassifySeverityInputSchema},
  output: {schema: ClassifySeverityOutputSchema},
  prompt: `You are a medical AI assistant that analyzes retinal fundus images to classify the severity of diabetic retinopathy.

  Given the retinal image, classify the severity of diabetic retinopathy into one of the following levels:
  - Low Diabetic Retinopathy
  - Mid Diabetic Retinopathy
  - High Diabetic Retinopathy

  Also, provide a confidence score (between 0 and 1) indicating the certainty of your classification.

  Retinal Image: {{media url=photoDataUri}}
  {
    "severity": "<Diabetic Retinopathy Level>",
    "confidence": <Confidence Score>
  }
  `,
});

const classifySeverityFlow = ai.defineFlow(
  {
    name: 'classifySeverityFlow',
    inputSchema: ClassifySeverityInputSchema,
    outputSchema: ClassifySeverityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
