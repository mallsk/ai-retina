'use server';

/**
 * @fileOverview Generates a doctor dashboard output with key clinical findings,
 * affected retinal regions, suggested clinical actions (assistive only), and
 * follow-up urgency levels for educational purposes.
 *
 * - generateDoctorDashboard - A function that generates the doctor dashboard information.
 */

import {ai} from '@/ai/genkit';
import type { GenerateDoctorDashboardInput, GenerateDoctorDashboardOutput } from '@/ai/types/generate-doctor-dashboard';
import { GenerateDoctorDashboardInputSchema, GenerateDoctorDashboardOutputSchema } from '@/ai/types/generate-doctor-dashboard';


export async function generateDoctorDashboard(input: GenerateDoctorDashboardInput): Promise<GenerateDoctorDashboardOutput> {
  return generateDoctorDashboardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDoctorDashboardPrompt',
  input: {schema: GenerateDoctorDashboardInputSchema},
  output: {schema: GenerateDoctorDashboardOutputSchema},
  prompt: `You are an AI assistant designed to help medical students learn how to interpret retinal images and make educational, non-prescriptive decisions.

  Based on the retinal image description, severity classification, and confidence score, generate the following information for a doctor dashboard:

  Retinal Image Description: {{{retinalImageDescription}}}
  Severity Classification: {{{severityClassification}}}
  Confidence Score: {{{confidenceScore}}}

  1.  Key Clinical Findings: Provide a summary of the key clinical findings observed in the retinal image.
  2.  Affected Retinal Regions: Identify the specific retinal regions that appear to be affected.
  3.  Suggested Clinical Actions (Assistive Only): Suggest potential clinical actions that could be taken, but emphasize that these are for educational purposes only and are non-prescriptive.
  4.  Follow-Up Urgency Level: Determine the appropriate follow-up urgency level based on the severity of the condition.

  Ensure that all outputs are assistive and non-prescriptive. This system is for EDUCATIONAL and RESEARCH purposes only and must NOT claim to provide real medical diagnosis.

  Output in a structured format.
  `,
});

const generateDoctorDashboardFlow = ai.defineFlow(
  {
    name: 'generateDoctorDashboardFlow',
    inputSchema: GenerateDoctorDashboardInputSchema,
    outputSchema: GenerateDoctorDashboardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
