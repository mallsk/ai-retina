import {z} from 'genkit';

export const AdaptiveFilterApplicationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A retinal fundus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AdaptiveFilterApplicationInput = z.infer<typeof AdaptiveFilterApplicationInputSchema>;

export const AdaptiveFilterApplicationOutputSchema = z.object({
  explanation: z.string().describe('An explanation of the conceptual ACP-REF filter and its advantages.'),
});
export type AdaptiveFilterApplicationOutput = z.infer<typeof AdaptiveFilterApplicationOutputSchema>;
