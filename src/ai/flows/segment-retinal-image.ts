'use server';

/**
 * @fileOverview A flow for segmenting a retinal image to identify key anatomical features and abnormalities.
 *
 * - segmentRetinalImage - A function that generates segmentation masks and a summary.
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
  prompt: `You are a specialized AI model for retinal image analysis. Your task is to perform instance segmentation on the provided retinal fundus image.

You must identify and generate separate segmentation masks for the following features:
1.  **Optic Disc**: The circular area where the optic nerve connects to the retina.
2.  **Blood Vessels**: The network of arteries and veins.
3.  **Lesions**: Any potential abnormalities, including microaneurysms, hemorrhages, and hard or soft exudates.

For each feature, you must generate a transparent PNG image as a data URI. The mask for each feature should be a specific solid color with no transparency variation within the masked area itself:
-   Optic Disc Mask: Use color #FFD700 (Gold).
-   Vessels Mask: Use color #00FFFF (Cyan).
-   Lesions Mask: Use color #FF00FF (Magenta).

The background of each generated image must be completely transparent. Also, provide a concise summary of the segmentation findings.

Retinal Image: {{media url=photoDataUri}}`,
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
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
