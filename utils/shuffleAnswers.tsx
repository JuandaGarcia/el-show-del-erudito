import { Question } from './schemas/question'

export const shuffleAnswers = (questions: Question[]): Question[] => {
	return questions.map(question => {
		// Convertimos el objeto de opciones en un array de pares [key, value]
		const entries = Object.entries(question.options)

		// Mezclamos aleatoriamente las entradas
		const shuffledEntries = entries.sort(() => Math.random() - 0.5)

		// Reconstruimos el objeto de opciones con las entradas mezcladas
		const shuffledOptions: { [key: string]: any } = {}
		let newCorrectAnswer = ''

		shuffledEntries.forEach(([key, value], index) => {
			// Las nuevas claves serán A, B, C, D basadas en el nuevo orden
			const newKey = String.fromCharCode(65 + index) // 65 es el código ASCII de 'A'
			shuffledOptions[newKey] = value

			// Si el valor mezclado es el correcto, actualizamos la respuesta correcta
			if (key === question.correct_answer) {
				newCorrectAnswer = newKey
			}
		})

		// Devolvemos la pregunta con las opciones mezcladas y la respuesta correcta actualizada
		return {
			...question,
			options: shuffledOptions,
			correct_answer: newCorrectAnswer,
		}
	}) as Question[]
}
