// src/ai/flows/project-card-summary-generator.ts
'use server';

/**
 * @fileOverview An AI agent that generates a concise project card summary based on the project title and description.
 *
 * - generateProjectCardSummary - A function that handles the project card summary generation process.
 * - GenerateProjectCardSummaryInput - The input type for the generateProjectCardSummary function.
 * - GenerateProjectCardSummaryOutput - The return type for the generateProjectCardSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectCardSummaryInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('The detailed description of the project.'),
});

export type GenerateProjectCardSummaryInput = z.infer<typeof GenerateProjectCardSummaryInputSchema>;

const GenerateProjectCardSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the project, highlighting key features and outcomes.'),
});

export type GenerateProjectCardSummaryOutput = z.infer<typeof GenerateProjectCardSummaryOutputSchema>;

export async function generateProjectCardSummary(input: GenerateProjectCardSummaryInput): Promise<GenerateProjectCardSummaryOutput> {
  return generateProjectCardSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectCardSummaryPrompt',
  input: {schema: GenerateProjectCardSummaryInputSchema},
  output: {schema: GenerateProjectCardSummaryOutputSchema},
  prompt: `You are an expert at creating concise and compelling project card summaries for portfolio websites.

  Given the project title and description below, generate a short summary (approximately 2-3 sentences) that highlights the key features, technologies used, and outcomes of the project.

  Title: {{{title}}}
  Description: {{{description}}}
  Summary:`, // The model will complete this sentence
});

const generateProjectCardSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectCardSummaryFlow',
    inputSchema: GenerateProjectCardSummaryInputSchema,
    outputSchema: GenerateProjectCardSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
