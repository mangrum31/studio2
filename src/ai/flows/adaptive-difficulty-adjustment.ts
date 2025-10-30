'use server';

/**
 * @fileOverview This file defines a Genkit flow for adaptive difficulty adjustment in the EduPlay Adventures game.
 *
 * It adjusts the game difficulty based on the player's performance in mini-games.
 * @param {AdaptiveDifficultyInput} input - The input data containing the player's recent performance.
 * @returns {Promise<AdaptiveDifficultyOutput>} - A promise that resolves to the adjusted difficulty level.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveDifficultyInputSchema = z.object({
  gameName: z.string().describe('The name of the mini-game.'),
  playerId: z.string().describe('The unique identifier for the player.'),
  score: z.number().describe('The player\'s score in the recent game session.'),
  attempts: z.number().describe('The number of attempts the player made.'),
});
export type AdaptiveDifficultyInput = z.infer<typeof AdaptiveDifficultyInputSchema>;

const AdaptiveDifficultyOutputSchema = z.object({
  adjustedDifficulty: z.string().describe('The adjusted difficulty level for the game (e.g., Easy, Medium, Hard).'),
  feedbackMessage: z.string().describe('A message providing feedback to the player or game designer about the difficulty adjustment.'),
});
export type AdaptiveDifficultyOutput = z.infer<typeof AdaptiveDifficultyOutputSchema>;

export async function adjustDifficulty(input: AdaptiveDifficultyInput): Promise<AdaptiveDifficultyOutput> {
  return adjustDifficultyFlow(input);
}

const adjustDifficultyPrompt = ai.definePrompt({
  name: 'adjustDifficultyPrompt',
  input: {schema: AdaptiveDifficultyInputSchema},
  output: {schema: AdaptiveDifficultyOutputSchema},
  prompt: `You are an AI game difficulty adjuster for the EduPlay Adventures game.

  Based on the player's performance in {{gameName}}, specifically their score of {{score}} and {{attempts}} attempts, determine whether the game should be made easier or harder.

  Consider these factors when adjusting the difficulty:
  - A very low score with many attempts indicates the game is too hard.
  - A very high score with few attempts indicates the game is too easy.
  - A moderate score with a reasonable number of attempts indicates the difficulty is appropriate.

  Output the adjusted difficulty level (Easy, Medium, or Hard) and provide a short message explaining the adjustment.
`,
});

const adjustDifficultyFlow = ai.defineFlow(
  {
    name: 'adjustDifficultyFlow',
    inputSchema: AdaptiveDifficultyInputSchema,
    outputSchema: AdaptiveDifficultyOutputSchema,
  },
  async input => {
    const {output} = await adjustDifficultyPrompt(input);
    return output!;
  }
);
