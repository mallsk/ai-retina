import { z } from 'genkit';

export const SegmentRetinalImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A retinal fundus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SegmentRetinalImageInput = z.infer<typeof SegmentRetinalImageInputSchema>;

export const SegmentRetinalImageOutputSchema = z.object({
  opticDiscMask: z.string().describe("A transparent PNG data URI of the optic disc segmentation mask, colored #FFD700 (Gold)."),
  vesselsMask: z.string().describe("A transparent PNG data URI of the blood vessels segmentation mask, colored #00FFFF (Cyan)."),
  lesionsMask: z.string().describe("A transparent PNG data URI of potential lesions (microaneurysms, hemorrhages, exudates) segmentation mask, colored #FF00FF (Magenta)."),
  segmentationSummary: z.string().describe("A brief summary of the key findings from the segmentation analysis, noting any significant features or abnormalities identified.")
});
export type SegmentRetinalImageOutput = z.infer<typeof SegmentRetinalImageOutputSchema>;
