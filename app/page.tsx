'use client'
import s from './page.module.scss'
import Logo from 'components/ui/Logo/Logo'
import Signature from 'components/Signature/Signature'
import CreatedBy from 'components/CreatedBy/CreatedBy'
import Button from 'components/ui/Button/Button'
import Modal, {
	ModalContent,
	ModalFooter,
	ModalHeader,
} from 'components/ui/Modal/Modal'
import { useState } from 'react'
import Input from 'components/ui/Input/Input'
import { useForm } from 'react-hook-form'
import { createQuestions } from 'lib/createQuestions'

const Home = () => {
	const maxLengthSubject = 50
	const [openHowWorlsModal, setOpenHowWorksModal] = useState(false)
	const [openStartModal, setOpenStartModal] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<{ subject: string }>()

	const toggleOpenHowWorksModal = () => setOpenHowWorksModal(!openHowWorlsModal)
	const toggleStartModal = () => setOpenStartModal(!openStartModal)

	const onSubmit = handleSubmit(async ({ subject }) => {
		const questions = await createQuestions(subject)
		console.log({ questions })
	})

	return (
		<main className={s.home}>
			<section className={s.home__content}>
				<Logo className={s.home__content__logo} />
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
				<div className={s.home__content__created_by}>
					<CreatedBy />
					<Signature />
				</div>
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
							{errors.subject && (
								<p className={s.home__content__start__error}>
									{errors.subject.message}
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
										Generando preguntas...
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
				src="/img/light.svg"
				alt="Luz de la habitación"
			/>
			<img
				className={s.home__plant}
				src="/img/plant.svg"
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
