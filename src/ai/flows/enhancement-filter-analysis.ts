'use server';

/**
 * @fileOverview Analyzes and compares retinal image enhancement filters, and recommends the best one.
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

const FilterAnalysisDetailSchema = z.object({
  filterName: z.string().describe('The name of the filter.'),
  vesselEnhancement: z.number().min(0).max(10).describe('Score for vessel enhancement (0-10).'),
  lesionVisibility: z.number().min(0).max(10).describe('Score for lesion visibility (0-10).'),
  noiseReduction: z.number().min(0).max(10).describe('Score for noise reduction (0-10).'),
  strengths: z.string().describe('Strengths of the filter.'),
  limitations: z.string().describe('Limitations of the filter.'),
});

const EnhancementFilterAnalysisOutputSchema = z.object({
  analysis: z.array(FilterAnalysisDetailSchema).describe(
    'An array of analyses for each filter, including quantitative scores.'
  ),
  bestFilter: z
    .enum(['Median', 'Gaussian', 'Bilateral', 'CLAHE', 'Gabor', 'Adaptive Histogram Equalization'])
    .describe('The best filter for enhancing the provided retinal image.'),
  reasoning: z
    .string()
    .describe('The reasoning for choosing the best filter.'),
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
  prompt: `You are an expert in image processing, specializing in retinal fundus images. For each filter below, provide a quantitative analysis by providing scores (0-10) for vessel enhancement, lesion visibility, and noise reduction. Also provide a summary of strengths and limitations.

Filters to analyze:
- Median Filter
- Gaussian Filter
- Bilateral Filter
- CLAHE (Contrast Limited Adaptive Histogram Equalization)
- Gabor Filter
- Adaptive Histogram Equalization

Based on your analysis, choose the single best filter for this specific image and provide a brief reasoning for your choice.

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
