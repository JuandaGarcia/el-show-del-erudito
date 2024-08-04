import { z } from 'zod'

enum Answer {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
}
export const QuestionSchema = z.object({
	question: z.string(),
	options: z.object({
		[Answer.A]: z.string(),
		[Answer.B]: z.string(),
		[Answer.C]: z.string(),
		[Answer.D]: z.string(),
	}),
	correct_answer: z.enum([Answer.A, Answer.B, Answer.C, Answer.D]),
})

export type Question = z.infer<typeof QuestionSchema>
