'use server';
/**
 * @fileOverview Classifies retinal images into severity levels (Low, Mid, High) with a confidence score.
 *
 * - classifySeverity - A function that handles the severity classification process.
 */

import {ai} from '@/ai/genkit';
import type { ClassifySeverityInput, ClassifySeverityOutput } from '@/ai/types/severity-classification';
import { ClassifySeverityInputSchema, ClassifySeverityOutputSchema } from '@/ai/types/severity-classification';

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
