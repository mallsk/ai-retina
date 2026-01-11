import {z} from 'genkit';

export const EnhancementFilterAnalysisInputSchema = z.object({
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
  psnr: z.number().describe('Peak Signal-to-Noise Ratio (PSNR) in dB, measuring reconstruction fidelity.'),
  ssim: z.number().describe('Structural Similarity Index (SSIM), quantifying structural preservation.'),
  mse: z.number().describe('Mean Squared Error (MSE), quantifying distortion.'),
  entropy: z.number().describe('Entropy, reflecting information content and detail richness.'),
  cii: z.number().describe('Contrast Improvement Index (CII), assessing contrast improvement.'),
  efficiency: z.string().describe('Computational efficiency (e.g., ms/image).'),
  strengths: z.string().describe('Strengths of the filter.'),
  limitations: z.string().describe('Limitations of the filter.'),
});

export const EnhancementFilterAnalysisOutputSchema = z.object({
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
