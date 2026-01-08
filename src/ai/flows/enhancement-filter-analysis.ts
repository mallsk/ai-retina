'use server';

/**
 * @fileOverview Analyzes and compares retinal image enhancement filters, and recommends the best one.
 *
 * - analyzeEnhancementFilters - A function that performs the analysis.
 */

import {ai} from '@/ai/genkit';
import type { EnhancementFilterAnalysisInput, EnhancementFilterAnalysisOutput } from '@/ai/types/enhancement-filter-analysis';
import { EnhancementFilterAnalysisInputSchema, EnhancementFilterAnalysisOutputSchema } from '@/ai/types/enhancement-filter-analysis';


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
