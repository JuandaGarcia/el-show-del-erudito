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
	const [questions, setQuestions] = useState<Question[]>([])
	const [questionsError, setQuestionsError] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<{ subject: string }>()
	const subject = watch('subject')

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
									placeholder="Ej: JavaScript, Musica, React, Cine, etc..."
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
