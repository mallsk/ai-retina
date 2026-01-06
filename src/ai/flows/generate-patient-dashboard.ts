'use server';

/**
 * @fileOverview Generates a patient-friendly explanation of diabetic retinopathy, risk category,
 * lifestyle recommendations, and suggested next steps.
 *
 * - generatePatientDashboard - A function that generates the patient dashboard content.
 * - PatientDashboardInput - The input type for the generatePatientDashboard function.
 * - PatientDashboardOutput - The return type for the generatePatientDashboard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientDashboardInputSchema = z.object({
  retinalImage: z
    .string()
    .describe(
      "A retinal fundus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  severityLevel: z
    .enum(['Low Diabetic Retinopathy', 'Mid Diabetic Retinopathy', 'High Diabetic Retinopathy'])
    .describe('The severity level of diabetic retinopathy.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score of the severity level classification.'),
  keyClinicalFindings: z.string().describe('Key clinical findings from the retinal image.'),
  affectedRetinalRegions: z.string().describe('Affected retinal regions.'),
});
export type PatientDashboardInput = z.infer<typeof PatientDashboardInputSchema>;

const PatientDashboardOutputSchema = z.object({
  conditionExplanation: z.string().describe('A simple, non-technical explanation of the condition.'),
  riskCategory: z.enum(['Low', 'Medium', 'High']).describe('The risk category of the condition.'),
  lifestyleRecommendations: z
    .string()
    .describe('Lifestyle and health-related recommendations for the patient.'),
  suggestedNextSteps: z.string().describe('Suggested next steps for the patient.'),
});
export type PatientDashboardOutput = z.infer<typeof PatientDashboardOutputSchema>;

export async function generatePatientDashboard(
  input: PatientDashboardInput
): Promise<PatientDashboardOutput> {
  return generatePatientDashboardFlow(input);
}

const patientDashboardPrompt = ai.definePrompt({
  name: 'patientDashboardPrompt',
  input: {schema: PatientDashboardInputSchema},
  output: {schema: PatientDashboardOutputSchema},
  prompt: `You are an AI assistant creating content for a patient dashboard to explain Diabetic Retinopathy.

  Given the following information, generate a simple explanation of the condition, assign a risk category, provide lifestyle recommendations, and suggest next steps for the patient.

  Remember this is for educational purposes only and not to be taken as a real medical diagnosis.

  Severity Level: {{{severityLevel}}}
  Confidence Score: {{{confidenceScore}}}
  Key Clinical Findings: {{{keyClinicalFindings}}}
  Affected Retinal Regions: {{{affectedRetinalRegions}}}

  Instructions:
  1.  Condition Explanation: Explain Diabetic Retinopathy in simple, non-technical terms that a patient can easily understand.
  2.  Risk Category: Based on the severity level and confidence score, assign a risk category ('Low', 'Medium', or 'High').
  3.  Lifestyle Recommendations: Provide 2-3 brief lifestyle and health-related recommendations tailored to a patient with Diabetic Retinopathy.
  4.  Suggested Next Steps: Suggest 2-3 next steps the patient should take, such as consulting with a specialist or scheduling a follow-up appointment.

  Output in JSON format.
  `,
});

const generatePatientDashboardFlow = ai.defineFlow(
  {
    name: 'generatePatientDashboardFlow',
    inputSchema: PatientDashboardInputSchema,
    outputSchema: PatientDashboardOutputSchema,
  },
  async input => {
    const {output} = await patientDashboardPrompt(input);
    return output!;
  }
);
