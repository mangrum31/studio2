'use server';
/**
 * @fileOverview An AI agent for generating project status updates.
 *
 * - generateStatusUpdate - A function that handles the status update generation.
 * - GenerateStatusUpdateInput - The input type for the generateStatusUpdate function.
 * - GenerateStatusUpdateOutput - The return type for the generateStatusUpdate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStatusUpdateInputSchema = z.object({
  projectSummaries: z.string().describe("A summary of the projects, with each project on a new line, like 'Project: [description]'."),
});
export type GenerateStatusUpdateInput = z.infer<
  typeof GenerateStatusUpdateInputSchema
>;

const GenerateStatusUpdateOutputSchema = z.object({
  statusUpdate: z
    .string()
    .describe('A concise, professional status update summarizing the provided projects.'),
});
export type GenerateStatusUpdateOutput = z.infer<
  typeof GenerateStatusUpdateOutputSchema
>;

export async function generateStatusUpdate(
  input: GenerateStatusUpdateInput
): Promise<GenerateStatusUpdateOutput> {
  return generateStatusUpdateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStatusUpdatePrompt',
  input: {schema: GenerateStatusUpdateInputSchema},
  output: {schema: GenerateStatusUpdateOutputSchema},
  prompt: `You are an AI assistant that writes concise, professional status updates for stakeholders. Summarize the provided list of projects/tasks into a single, cohesive paragraph that highlights progress and next steps. Do not use bullet points or lists. The tone should be positive and informative.

Draft a summary based on the following projects:
{{{projectSummaries}}}
`,
});

const generateStatusUpdateFlow = ai.defineFlow(
  {
    name: 'generateStatusUpdateFlow',
    inputSchema: GenerateStatusUpdateInputSchema,
    outputSchema: GenerateStatusUpdateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
