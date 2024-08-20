'use client'
import s from './page.module.scss'
import Game from 'components/Game/Game'
import Logo from 'components/ui/Logo/Logo'
import Input from 'components/ui/Input/Input'
import Button from 'components/ui/Button/Button'
import CreatedBy from 'components/CreatedBy/CreatedBy'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Question } from 'utils/schemas/question'
import { createQuestions } from 'lib/createQuestions'
import Modal, {
	ModalContent,
	ModalFooter,
	ModalHeader,
} from 'components/ui/Modal/Modal'

export const maxDuration = 60
const Home = () => {
	const maxLengthSubject = 50
	const [openHowWorlsModal, setOpenHowWorksModal] = useState(false)
	const [openStartModal, setOpenStartModal] = useState(false)
	const [questions, setQuestions] = useState<Question[]>([
		{
			question: '¿Cuál es el país de origen del fútbol?',
			options: {
				A: 'Inglaterra',
				B: 'Brasil',
				C: 'Argentina',
				D: 'Italia',
			},
			correct_answer: 'A',
		},
		{
			question: '¿Cuántos jugadores hay en un equipo de fútbol en el campo?',
			options: {
				A: '9',
				B: '10',
				C: '11',
				D: '12',
			},
			correct_answer: 'C',
		},
		{
			question: '¿Qué significa la tarjeta roja en el fútbol?',
			options: {
				A: 'Advertencia',
				B: 'Expulsión',
				C: 'Gol',
				D: 'Falta',
			},
			correct_answer: 'B',
		},
		{
			question:
				'¿Quién es el máximo goleador de la historia de la Copa del Mundo?',
			options: {
				A: 'Pelé',
				B: 'Diego Maradona',
				C: 'Marta',
				D: 'Miroslav Klose',
			},
			correct_answer: 'D',
		},
		{
			question: '¿En qué año se celebró la primera Copa del Mundo de la FIFA?',
			options: {
				A: '1920',
				B: '1930',
				C: '1940',
				D: '1950',
			},
			correct_answer: 'B',
		},
		{
			question: '¿Qué equipo ha ganado más Copas del Mundo?',
			options: {
				A: 'Alemania',
				B: 'Brasil',
				C: 'Italia',
				D: 'Argentina',
			},
			correct_answer: 'B',
		},
		{
			question: "¿Quién es conocido como 'La Pulga'?",
			options: {
				A: 'Cristiano Ronaldo',
				B: 'Neymar',
				C: 'Lionel Messi',
				D: 'Ronaldinho',
			},
			correct_answer: 'C',
		},
		{
			question: '¿Cuál es el estadio más grande del mundo?',
			options: {
				A: 'Camp Nou',
				B: 'Maracanã',
				C: 'Wembley',
				D: 'Estadio Azteca',
			},
			correct_answer: 'B',
		},
		{
			question: '¿Qué país ganó la Eurocopa 2016?',
			options: {
				A: 'Francia',
				B: 'Portugal',
				C: 'España',
				D: 'Alemania',
			},
			correct_answer: 'B',
		},
		{
			question:
				'¿Quién es el entrenador con más títulos en la historia del fútbol?',
			options: {
				A: 'Pep Guardiola',
				B: 'Alex Ferguson',
				C: 'José Mourinho',
				D: 'Carlo Ancelotti',
			},
			correct_answer: 'B',
		},
		{
			question:
				'¿Qué jugador tiene el récord de más goles en la historia de la Liga española?',
			options: {
				A: 'Raúl',
				B: 'Cristiano Ronaldo',
				C: 'Lionel Messi',
				D: 'Telmo Zarra',
			},
			correct_answer: 'C',
		},
		{
			question: '¿Cuál es el club más valioso del mundo según Forbes en 2021?',
			options: {
				A: 'Real Madrid',
				B: 'Barcelona',
				C: 'Manchester United',
				D: 'Bayern Múnich',
			},
			correct_answer: 'C',
		},
		{
			question: '¿Qué selección ganó la Copa América 2021?',
			options: {
				A: 'Argentina',
				B: 'Brasil',
				C: 'Chile',
				D: 'Uruguay',
			},
			correct_answer: 'A',
		},
		{
			question: '¿Quién es el máximo goleador de la UEFA Champions League?',
			options: {
				A: 'Lionel Messi',
				B: 'Cristiano Ronaldo',
				C: 'Raúl',
				D: 'Robert Lewandowski',
			},
			correct_answer: 'B',
		},
		{
			question: '¿Qué país fue el anfitrión de la Copa del Mundo 2018?',
			options: {
				A: 'Brasil',
				B: 'Rusia',
				C: 'Sudáfrica',
				D: 'Alemania',
			},
			correct_answer: 'B',
		},
	] as Question[])
	const [questionsError, setQuestionsError] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<{ subject: string }>()
	const subject = watch('subject') || 'Futbol'

	const toggleOpenHowWorksModal = () => setOpenHowWorksModal(!openHowWorlsModal)
	const toggleStartModal = () => setOpenStartModal(!openStartModal)

	const onSubmit = handleSubmit(async ({ subject }) => {
		const { questions, error_message } = await createQuestions(subject)

		if (questions) {
			setQuestions(questions)
			setOpenStartModal(false)
		} else if (error_message) {
			setQuestionsError(error_message)
		}
	})

	const resetQuestions = () => setQuestions([])

	return questions.length ? (
		<Game questions={questions} reset={resetQuestions} subject={subject} />
	) : (
		<main className={s.home}>
			<section className={s.home__content}>
				<Logo
					className={s.home__content__logo}
					aria-label="El Show del Erudito, juego de preguntas"
				/>
				<p className={s.home__content__text}>
					¡Prepárate para una experiencia de trivia única y emocionante,
					inspirada en el icónico “Quién quiere ser millonario”! En El Show del
					Erudito, pondrás a prueba tu conocimiento con preguntas diseñadas
					especialmente para ti, basadas en el tema de tu elección.
				</p>
				<button
					className={s.home__content__how_works_btn}
					onClick={toggleOpenHowWorksModal}
				>
					¿Cómo funciona?
				</button>
				<Button className={s.home__content__button} onClick={toggleStartModal}>
					¡Jugar ahora!
				</Button>
				<CreatedBy type="home" />
				<Modal open={openHowWorlsModal} handleClose={toggleOpenHowWorksModal}>
					<ModalHeader>
						<h2>¿Cómo funciona?</h2>
					</ModalHeader>
					<ModalContent>
						<ol className={s.home__content__how_works__list}>
							<li>
								<strong>Elige tu Tema:</strong> Selecciona cualquier tema de
								interés. ¡Tú decides sobre qué quieres poner a prueba tus
								conocimientos!
							</li>
							<li>
								<strong>Responde Preguntas:</strong> Enfréntate a preguntas
								relacionadas específicamente con el tema que escogiste,
								diseñadas para desafiar tu mente y demostrar tu erudición.
							</li>
							<li>
								<strong>Avanza de Nivel:</strong> A medida que respondas
								correctamente, irás avanzando a preguntas más difíciles y
								acumulando puntos. Puedes aprovechar los comodines clásicos como
								el “50:50”, “Llamada a un amigo”, o la “Ayuda del Público” para
								recibir asistencia cuando más lo necesites.
							</li>
						</ol>
					</ModalContent>
				</Modal>
				<Modal open={openStartModal} handleClose={toggleStartModal}>
					<ModalHeader>
						<h2>¡Jugar ahora!</h2>
					</ModalHeader>
					<form onSubmit={onSubmit}>
						<ModalContent>
							<label className={s.home__content__start__label}>
								<span>¿Qué tema te interesa?</span>
								<Input
									fullWidth
									placeholder="Ej: Musica, Cine, Cultura general, etc..."
									maxLength={maxLengthSubject}
									error={errors.subject?.message}
									disabled={isSubmitting}
									{...register('subject', {
										required: 'Debes ingresar un tema',
										maxLength: {
											value: maxLengthSubject,
											message: 'Máximo 50 caracteres',
										},
									})}
								/>
							</label>
							{(errors.subject || questionsError) && (
								<p className={s.home__content__start__error}>
									{errors?.subject?.message || questionsError}
								</p>
							)}
							<p className={s.home__content__start__text}>
								Selecciona cualquier tema de interés. ¡Tú decides sobre qué
								quieres poner a prueba tus conocimientos!
							</p>
						</ModalContent>
						<ModalFooter>
							<Button
								fullWidth
								disabled={isSubmitting}
								className={s.home__content__start__button}
							>
								{isSubmitting ? (
									<>
										<img
											src="/img/erudito_loader.svg"
											alt="Cargando"
											className={s.home__content__start__button__loader}
										/>{' '}
										Repasando tema...
									</>
								) : (
									'¡Comenzar!'
								)}
							</Button>
						</ModalFooter>
					</form>
				</Modal>
			</section>
			<img
				className={s.home__light}
				src="/img/light.png"
				alt="Luz de la habitación"
			/>
			<img
				className={s.home__plant}
				src="/img/plant.png"
				alt="Planta decorativa"
			/>
			<img
				className={s.home__room}
				src="/img/home.png"
				alt="Habitación del Erudito"
			/>
		</main>
	)
}

export default Home
