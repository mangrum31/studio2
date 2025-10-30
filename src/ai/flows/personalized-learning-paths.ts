'use server';

/**
 * @fileOverview An AI agent for personalizing learning paths based on a child's strengths and weaknesses.
 *
 * - personalizeLearningPath - A function that handles the personalization of a learning path.
 * - PersonalizeLearningPathInput - The input type for the personalizeLearningPath function.
 * - PersonalizeLearningPathOutput - The return type for the personalizeLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeLearningPathInputSchema = z.object({
  childName: z.string().describe('The name of the child.'),
  gradeLevel: z.number().describe('The grade level of the child.'),
  strengths: z.string().describe('The strengths of the child.'),
  weaknesses: z.string().describe('The weaknesses of the child.'),
  learningGoals: z.string().describe('The learning goals for the child.'),
});
export type PersonalizeLearningPathInput = z.infer<
  typeof PersonalizeLearningPathInputSchema
>;

const PersonalizeLearningPathOutputSchema = z.object({
  personalizedPath: z
    .string()
    .describe('A personalized learning path for the child.'),
});
export type PersonalizeLearningPathOutput = z.infer<
  typeof PersonalizeLearningPathOutputSchema
>;

export async function personalizeLearningPath(
  input: PersonalizeLearningPathInput
): Promise<PersonalizeLearningPathOutput> {
  return personalizeLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeLearningPathPrompt',
  input: {schema: PersonalizeLearningPathInputSchema},
  output: {schema: PersonalizeLearningPathOutputSchema},
  prompt: `You are an expert in creating personalized learning paths for children.

  Given the following information about the child, create a personalized learning path that focuses on their weaknesses and builds on their strengths to achieve their learning goals.

  Child Name: {{{childName}}}
  Grade Level: {{{gradeLevel}}}
  Strengths: {{{strengths}}}
  Weaknesses: {{{weaknesses}}}
  Learning Goals: {{{learningGoals}}}
  `,
});

const personalizeLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizeLearningPathFlow',
    inputSchema: PersonalizeLearningPathInputSchema,
    outputSchema: PersonalizeLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
