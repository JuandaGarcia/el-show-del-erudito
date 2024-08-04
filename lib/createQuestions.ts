'use server'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { createQuestionsPrompt } from 'utils/prompts'
import { z } from 'zod'

enum Answer {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
}
const QuestionSchema = z.object({
	question: z.string(),
	options: z.object({
		[Answer.A]: z.string(),
		[Answer.B]: z.string(),
		[Answer.C]: z.string(),
		[Answer.D]: z.string(),
	}),
	correct_answer: z.enum([Answer.A, Answer.B, Answer.C, Answer.D]),
})

const ResponseSchema = z.object({
	questions: z.array(QuestionSchema).optional(),
	error_message: z.string().optional(),
})

export const createQuestions = async (subject: string) => {
	const prompt = createQuestionsPrompt(subject)

	const { object } = await generateObject({
		model: openai('gpt-4o-mini'),
		schema: ResponseSchema,
		prompt,
	})

	return object
}
