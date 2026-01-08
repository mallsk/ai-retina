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
  vesselEnhancement: z.number().min(0).max(10).describe('Score for vessel enhancement (0-10).'),
  lesionVisibility: z.number().min(0).max(10).describe('Score for lesion visibility (0-10).'),
  noiseReduction: z.number().min(0).max(10).describe('Score for noise reduction (0-10).'),
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
