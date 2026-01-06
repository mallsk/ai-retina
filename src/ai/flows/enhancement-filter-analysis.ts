'use server';

/**
 * @fileOverview Analyzes and compares retinal image enhancement filters.
 *
 * - analyzeEnhancementFilters - A function that performs the analysis.
 * - EnhancementFilterAnalysisInput - The input type for the analyzeEnhancementFilters function.
 * - EnhancementFilterAnalysisOutput - The return type for the analyzeEnhancementFilters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancementFilterAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A retinal fundus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhancementFilterAnalysisInput = z.infer<
  typeof EnhancementFilterAnalysisInputSchema
>;

const EnhancementFilterAnalysisOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'Analysis comparing Median, Gaussian, Bilateral, CLAHE, Gabor, and Adaptive Histogram Equalization filters, including strengths and limitations for retinal vessel and lesion enhancement.'
    ),
});
export type EnhancementFilterAnalysisOutput = z.infer<
  typeof EnhancementFilterAnalysisOutputSchema
>;

export async function analyzeEnhancementFilters(
  input: EnhancementFilterAnalysisInput
): Promise<EnhancementFilterAnalysisOutput> {
  return enhancementFilterAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhancementFilterAnalysisPrompt',
  input: {schema: EnhancementFilterAnalysisInputSchema},
  output: {schema: EnhancementFilterAnalysisOutputSchema},
  prompt: `You are an expert in image processing, specializing in retinal fundus images. Provide an analysis comparing the following enhancement filters, including their strengths and limitations for retinal vessel and lesion enhancement:

- Median Filter
- Gaussian Filter
- Bilateral Filter
- CLAHE (Contrast Limited Adaptive Histogram Equalization)
- Gabor Filter
- Adaptive Histogram Equalization

Consider the context of enhancing retinal vessels and lesions for diabetic retinopathy analysis.

Here is the retinal image: {{media url=photoDataUri}}`,
});

const enhancementFilterAnalysisFlow = ai.defineFlow(
  {
    name: 'enhancementFilterAnalysisFlow',
    inputSchema: EnhancementFilterAnalysisInputSchema,
    outputSchema: EnhancementFilterAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
