'use server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { QuestionSchema } from 'utils/schemas/question'
import { createQuestionsPrompt } from 'utils/prompts'

const ResponseSchema = z.object({
	questions: z.array(QuestionSchema).optional(),
	error_message: z.string().optional(),
})

export const createQuestions = async (
	subject: string
): Promise<z.infer<typeof ResponseSchema>> => {
	try {
		const prompt = createQuestionsPrompt(subject)

		const { object } = await generateObject({
			model: openai('gpt-4o-mini'),
			schema: ResponseSchema,
			prompt,
		})

		return object
	} catch (error) {
		return {
			error_message:
				'Ocurrió un error al generar las preguntas, por favor intenta de nuevo',
		}
	}
}
