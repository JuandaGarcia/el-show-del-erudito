export const createQuestionsPrompt = (subject: string) => `
Genera 15 preguntas de trivia sobre el tema [${subject}] en formato JSON
para un juego como “Quién quiere ser millonario”. Cada pregunta debe
incluir el texto de la pregunta, cuatro opciones de respuesta (A, B, C, D)
y la respuesta correcta. Asegúrate de que las preguntas tengan una
dificultad creciente. Si el tema no es válido, devuelve un mensaje de
error en formato JSON indicando “El tema seleccionado no es válido. Por
favor, elige otro tema.”. Asegúrate de que las respuestas correctas no se
repitan consecutivamente en la misma opción (A, B, C, D) y que haya una
distribución balanceada entre las opciones correctas.
`
