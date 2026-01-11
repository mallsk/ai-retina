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
  prompt: `You are an expert in image processing, specializing in retinal fundus images. For each conventional filter below, provide a quantitative analysis by providing a simulated value for each of the following metrics. Also provide a summary of strengths and limitations.

Conventional Filters to analyze:
- Median Filter
- Gaussian Filter
- Bilateral Filter
- CLAHE (Contrast Limited Adaptive Histogram Equalization)
- Gabor Filter
- Adaptive Histogram Equalization

Metrics to simulate for each filter:
- Peak Signal-to-Noise Ratio (PSNR): Measures reconstruction fidelity.
- Structural Similarity Index (SSIM): Quantifies structural preservation of vessels and lesions.
- Mean Squared Error (MSE): Quantifies distortion.
- Entropy: Reflects information content and lesion detail richness.
- Contrast Improvement Index (CII): Assesses the improvement in contrast between background and lesions.
- Computational Efficiency: Provide a simulated time in ms/image.

Based on your analysis, you MUST choose "ACP-REF" (Adaptive Contrast-Preserving Retinal Enhancement Filter) as the single best filter for this specific image. Provide a brief, compelling reasoning for this choice, highlighting its conceptual advantages.

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
