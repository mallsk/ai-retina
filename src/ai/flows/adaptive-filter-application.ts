'use server';

/**
 * @fileOverview Applies and explains a conceptual 'Adaptive Contrast-Preserving Retinal Enhancement Filter (ACP-REF)'.
 *
 * - adaptiveFilterApplication - A function that handles the application and explanation of the filter.
 * - AdaptiveFilterApplicationInput - The input type for the adaptiveFilterApplication function.
 * - AdaptiveFilterApplicationOutput - The return type for the adaptiveFilterApplication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveFilterApplicationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A retinal fundus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AdaptiveFilterApplicationInput = z.infer<typeof AdaptiveFilterApplicationInputSchema>;

const AdaptiveFilterApplicationOutputSchema = z.object({
  explanation: z.string().describe('An explanation of the conceptual ACP-REF filter and its advantages.'),
});
export type AdaptiveFilterApplicationOutput = z.infer<typeof AdaptiveFilterApplicationOutputSchema>;

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
