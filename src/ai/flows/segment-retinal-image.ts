'use server';

/**
 * @fileOverview A flow for segmenting a retinal image to identify key anatomical features and abnormalities.
 *
 * - segmentRetinalImage - A function that generates a textual segmentation summary.
 */

import { ai } from '@/ai/genkit';
import type { SegmentRetinalImageInput, SegmentRetinalImageOutput } from '@/ai/types/segment-retinal-image';
import { SegmentRetinalImageInputSchema, SegmentRetinalImageOutputSchema } from '@/ai/types/segment-retinal-image';


export async function segmentRetinalImage(input: SegmentRetinalImageInput): Promise<SegmentRetinalImageOutput> {
  return segmentRetinalImageFlow(input);
}

const segmentationPrompt = ai.definePrompt({
  name: 'segmentationPrompt',
  input: { schema: SegmentRetinalImageInputSchema },
  output: { schema: SegmentRetinalImageOutputSchema },
  prompt: `You are a specialized AI model for retinal image analysis. Your task is to perform a conceptual segmentation on the provided retinal fundus image.

You must identify and provide a detailed text description for each of the following features:
1.  **Optic Disc**: Describe its appearance, including shape, color, and clarity of its margins.
2.  **Blood Vessels**: Describe the vessel network, including their width, tortuosity, and any notable characteristics like arteriovenous (AV) nicking.
3.  **Lesions**: Describe any potential abnormalities, including microaneurysms, hemorrhages, and hard or soft exudates. If none are apparent, state that.

Finally, provide a concise overall summary of the segmentation findings.

Retinal Image: {{media url=photoDataUri}}`,
});

const segmentRetinalImageFlow = ai.defineFlow(
  {
    name: 'segmentRetinalImageFlow',
    inputSchema: SegmentRetinalImageInputSchema,
    outputSchema: SegmentRetinalImageOutputSchema,
  },
  async (input) => {
    const { output } = await segmentationPrompt(input);
    return output!;
  }
);
