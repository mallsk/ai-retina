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
  opticDiscDescription: z.string().describe("A textual description of the optic disc's appearance (shape, color, margins)."),
  vesselsDescription: z.string().describe("A textual description of the blood vessels (width, tortuosity, AV nicking)."),
  lesionsDescription: z.string().describe("A textual description of any potential lesions (microaneurysms, hemorrhages, exudates)."),
  segmentationSummary: z.string().describe("A brief summary of the key findings from the segmentation analysis, noting any significant features or abnormalities identified.")
});
export type SegmentRetinalImageOutput = z.infer<typeof SegmentRetinalImageOutputSchema>;
