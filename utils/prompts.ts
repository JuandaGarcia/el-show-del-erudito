export const createQuestionsPrompt = (subject: string) => `
Generate 15 trivia questions about the topic [${subject}] in JSON format
for a game like “Who Wants to Be a Millionaire”. Each question should
include the question text, four answer options (A, B, C, D), and the
correct answer. Ensure that the questions have increasing difficulty. If
the topic is not valid, return an error message in JSON format indicating
“El tema seleccionado no es válido. Por favor, elige otro tema.” Give me
the questions and answers in Spanish.
`
