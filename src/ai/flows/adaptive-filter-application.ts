'use server';

/**
 * @fileOverview Applies and explains a conceptual 'Adaptive Contrast-Preserving Retinal Enhancement Filter (ACP-REF)'.
 *
 * - adaptiveFilterApplication - A function that handles the application and explanation of the filter.
 */

import {ai} from '@/ai/genkit';
import type { AdaptiveFilterApplicationInput, AdaptiveFilterApplicationOutput } from '@/ai/types/adaptive-filter-application';
import { AdaptiveFilterApplicationInputSchema, AdaptiveFilterApplicationOutputSchema } from '@/ai/types/adaptive-filter-application';

export async function adaptiveFilterApplication(input: AdaptiveFilterApplicationInput): Promise<AdaptiveFilterApplicationOutput> {
  return adaptiveFilterApplicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveFilterApplicationPrompt',
  input: {schema: AdaptiveFilterApplicationInputSchema},
  output: {schema: AdaptiveFilterApplicationOutputSchema},
  prompt: `You are an expert in retinal image processing. Explain the concept of an 'Adaptive Contrast-Preserving Retinal Enhancement Filter (ACP-REF)' and its advantages over conventional methods for enhancing retinal images.

The filter objectives are:
- Adaptive contrast enhancement
- Noise reduction with edge preservation
- Improved visibility of retinal vessels, microaneurysms, hemorrhages, and exudates
- Preservation of structural similarity

Use the following retinal image as context: {{media url=photoDataUri}}`,
});

const adaptiveFilterApplicationFlow = ai.defineFlow(
  {
    name: 'adaptiveFilterApplicationFlow',
    inputSchema: AdaptiveFilterApplicationInputSchema,
    outputSchema: AdaptiveFilterApplicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
