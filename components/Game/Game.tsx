import s from './Game.module.scss'
import Modal, {
	ModalContent,
	ModalFooter,
	ModalHeader,
} from 'components/ui/Modal/Modal'
import Button from 'components/ui/Button/Button'
import confetti from 'canvas-confetti'
import PhoneIcon from 'components/PhoneIcon/PhoneIcon'
import PublicHelpChart from 'components/PublicHelpChart/PublicHelpChart'
import { MdPhone } from 'react-icons/md'
import { CSSProperties, useState } from 'react'
import { Question } from 'utils/schemas/question'
import { bebasNeue } from 'fonts/bebasNeue'
import { GoHomeFill } from 'react-icons/go'
import { IoIosPeople } from 'react-icons/io'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { awards, buttonSelectedAnimationDuration } from 'utils/constants'
import { PiArrowCircleLeftBold } from 'react-icons/pi'

type Props = {
	questions: Question[]
	reset: () => void
	subject: string
}
enum GameOver {
	None = 0,
	Time = 1,
	Answer = 2,
}
const Game = ({ questions, reset, subject }: Props) => {
	/* Game State */
	const [isStarted, setIsStarted] = useState(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [isPublicHelpAvailable, setIsPublicHelpAvailable] = useState(true)
	const [isPhoneCallAvailable, setIsPhoneCallAvailable] = useState(true)
	const [isFiftyFiftyAvailable, setIsFiftyFiftyAvailable] = useState(true)
	const [disabledOptions, setDisabledOptions] = useState<string[]>([])
	const [answerSelected, setAnswerSelected] = useState<string | null>(null)
	const [numberOfTimesPlayed, setNumberOfTimesPlayed] = useState(0)
	const [gameOverType, setGameOverType] = useState<GameOver>(GameOver.None)
	const [securedMoney, setSecuredMoney] = useState(0)

	/* Modals */
	const [openPublicHelpModal, setOpenPublicHelpModal] = useState(false)
	const [openPhoneCallModal, setOpenPhoneCallModal] = useState(false)
	const [openGoHomeModal, setOpenGoHomeModal] = useState(false)
	const [openSuccessModal, setOpenSuccessModal] = useState(false)

	/* Values */
	const currentQuestion = questions[currentQuestionIndex]
	const currentOptions = Object.entries(currentQuestion.options)
	const currentAward = awards[currentQuestionIndex]
	const buttonEvents = answerSelected ? s.remove_events : ''

	const startGame = () => setIsStarted(true)
	const isDisabled = (key: string) => disabledOptions.includes(key)
	const toggleGoHomeModal = () => setOpenGoHomeModal(!openGoHomeModal)
	const formatPrize = (prize: number) => `$${prize.toLocaleString()}`

	const selectAnswer = (answer: string) => {
		setAnswerSelected(answer)
		// Await for the button animation
		setTimeout(() => {
			if (answer === currentQuestion.correct_answer) {
				if (currentAward.milestone) {
					setSecuredMoney(currentAward.prize)
				}
				setOpenSuccessModal(true)
				confetti({
					particleCount: 25,
					spread: 70,
					origin: { y: 0.6 },
					colors: ['#5608d2'],
				})
			} else {
				setGameOverType(GameOver.Answer)
			}
		}, buttonSelectedAnimationDuration + 700)
	}

	const gameOver = (type: GameOver.Answer | GameOver.Time) => {
		setOpenPhoneCallModal(false)
		setOpenPublicHelpModal(false)
		setGameOverType(type)
	}

	const setDefaultsToSetQuestion = () => {
		setDisabledOptions([])
		setAnswerSelected(null)
	}

	const nextQuestion = () => {
		setCurrentQuestionIndex(currentQuestionIndex + 1)
		setDefaultsToSetQuestion()
		setOpenSuccessModal(false)
	}

	const playAgain = () => {
		setIsStarted(false)
		setCurrentQuestionIndex(0)
		setDefaultsToSetQuestion()

		setIsPublicHelpAvailable(true)
		setIsPhoneCallAvailable(true)
		setIsFiftyFiftyAvailable(true)

		setGameOverType(GameOver.None)
		setNumberOfTimesPlayed(numberOfTimesPlayed + 1)
	}

	const publicHelp = () => {
		setOpenPublicHelpModal(true)
		setIsPublicHelpAvailable(false)
	}
	const closePublicHelpModal = () => setOpenPublicHelpModal(false)

	const phoneCall = () => {
		setOpenPhoneCallModal(true)
		setIsPhoneCallAvailable(false)
	}
	const closePhoneCallModal = () => setOpenPhoneCallModal(false)

	const fiftyFifty = () => {
		const options = currentOptions.filter(
			([key]) => key !== currentQuestion.correct_answer
		)
		const randomIndex = Math.floor(Math.random() * options.length)
		const [otherOption] = options[randomIndex]
		const newDisabledOptions = currentOptions.filter(
			([option]) =>
				option !== otherOption && option !== currentQuestion.correct_answer
		)
		setDisabledOptions(newDisabledOptions.map(([option]) => option))
		setIsFiftyFiftyAvailable(false)
	}

	return (
		<main className={s.game}>
			<img className={s.game__floor} src="/img/floor.png" alt="Piso" />
			<img className={s.game__room1} src="/img/room1.png" alt="Estantería" />
			<img className={s.game__room2} src="/img/room2.png" alt="Ventana" />
			<img
				className={s.game__plant}
				src="/img/plant.png"
				alt="Planta decorativa"
			/>
			<img
				className={s.game__light}
				src="/img/light.png"
				alt="Luz de la habitación"
			/>
			<section className={s.game__container}>
				{isStarted ? (
					<>
						<div className={s.game__container__controls}>
							<Button aria-label="Volver al Inicio" onClick={toggleGoHomeModal}>
								<GoHomeFill />
							</Button>
							<div
								className={`${s.game__container__controls__countdown} ${
									openPhoneCallModal ||
									openPublicHelpModal ||
									gameOverType === GameOver.Time
										? s.modal
										: ''
								}`}
							>
								<CountdownCircleTimer
									key={currentQuestionIndex + numberOfTimesPlayed}
									isPlaying={answerSelected === null}
									duration={30}
									colors={['#86E69B', '#e7b416', '#f57c61']}
									trailColor="#fff"
									colorsTime={[30, 10, 0]}
									strokeWidth={10}
									size={60}
									onComplete={() => gameOver(GameOver.Time)}
								>
									{({ remainingTime }) => (
										<span className={`${bebasNeue.className}`}>
											{remainingTime}
										</span>
									)}
								</CountdownCircleTimer>
							</div>
						</div>
						<div className={s.game__container__wildcards}>
							<Button
								fullWidth
								title="Ayuda del público"
								aria-label="Ayuda del público"
								onClick={publicHelp}
								disabled={!isPublicHelpAvailable}
								className={buttonEvents}
							>
								<IoIosPeople />
							</Button>
							<Button
								fullWidth
								title="Llamar a un amigo"
								aria-label="Llamar a un amigo"
								onClick={phoneCall}
								disabled={!isPhoneCallAvailable}
								className={buttonEvents}
							>
								<MdPhone />
							</Button>
							<Button
								fullWidth
								title="50 : 50"
								onClick={fiftyFifty}
								disabled={!isFiftyFiftyAvailable}
								className={`${s.game__container__wildcards__button} ${buttonEvents}`}
							>
								50 : 50
							</Button>
						</div>
						<div className={s.game__container__content}>
							<img
								src="/img/show.png"
								alt="El erudito preguntando"
								width={120}
								height={173}
								className={s.game__container__content__erudito}
							/>
							<h1 className={s.game__container__content__question}>
								{currentQuestion.question}
							</h1>
							<ul className={s.game__container__content__list}>
								{currentOptions.map(([key, value]) => (
									<li key={key}>
										<Button
											fullWidth
											onClick={() => selectAnswer(key)}
											disabled={isDisabled(key)}
											data-correct={
												answerSelected && currentQuestion.correct_answer === key
											}
											className={`${s.game__container__content__list__button} ${
												answerSelected === key ? s.selected : ''
											}  ${buttonEvents}`}
											style={
												{
													'--answer-color':
														key === currentQuestion.correct_answer
															? 'var(--color-success)'
															: 'var(--color-error)',
													'--animation-duration': `${buttonSelectedAnimationDuration}ms`,
												} as CSSProperties
											}
										>
											{key}: {value}
										</Button>
									</li>
								))}
							</ul>
						</div>
						<Modal
							noBackground
							noCloseButton
							open={openPublicHelpModal}
							handleClose={closePublicHelpModal}
						>
							<div className={s.game__container__modal}>
								<h2 className={s.game__container__modal__title}>
									¡Ayuda del público!
								</h2>
								<div className={s.game__container__modal__imgs}>
									<PublicHelpChart
										answer={currentQuestion.correct_answer}
										className={s.game__container__modal__imgs__chart}
									/>
									<img
										src="/img/cat.png"
										alt="El gato erudito"
										width={160}
										height={149}
										className={s.game__container__modal__imgs__cat_help_1}
									/>
									<img
										src="/img/mac.png"
										alt="Mac"
										width={116}
										height={135}
										className={s.game__container__modal__imgs__mac}
									/>
								</div>
								<p className={s.game__container__modal__message}>
									El público ha votado y la opción más votada es la{' '}
									<span className={s.game__container__modal__message__answer}>
										{currentQuestion.correct_answer}
									</span>
								</p>
								<Button fullWidth onClick={closePublicHelpModal}>
									Continuar
								</Button>
							</div>
						</Modal>
						<Modal
							noBackground
							noCloseButton
							open={openPhoneCallModal}
							handleClose={closePhoneCallModal}
						>
							<div className={s.game__container__modal}>
								<h2 className={s.game__container__modal__title}>
									¿Qué dice tu amigo?
								</h2>
								<div className={s.game__container__modal__imgs}>
									<PhoneIcon />
									<img
										src="/img/cat.png"
										alt="El gato erudito"
										width={160}
										height={149}
										className={s.game__container__modal__imgs__cat_call}
									/>
								</div>
								<p className={s.game__container__modal__message}>
									&quot;Yo creo que la respuesta correcta es la opción{' '}
									<span className={s.game__container__modal__message__answer}>
										{currentQuestion.correct_answer}
									</span>
									&quot;
								</p>
								<Button fullWidth onClick={closePhoneCallModal}>
									Continuar
								</Button>
							</div>
						</Modal>
						<Modal open={openGoHomeModal} handleClose={toggleGoHomeModal}>
							<ModalHeader>
								<h2>¿Estás seguro que quieres salir?</h2>
							</ModalHeader>
							<ModalContent>
								<p>Si sales, perderás todo tu progreso</p>
							</ModalContent>
							<ModalFooter>
								<Button fullWidth onClick={reset}>
									Salir
								</Button>
							</ModalFooter>
						</Modal>
						<Modal open={openSuccessModal} handleClose={nextQuestion}>
							<ModalHeader>
								<h2>¡Subiste de nivel! 💸</h2>
							</ModalHeader>
							<ModalContent>
								<div className={s.game__container__modal_info__awards}>
									{awards.map((award, index) => (
										<p
											key={award.prize}
											className={`${
												s.game__container__modal_info__awards__item
											} ${index === currentQuestionIndex + 1 ? s.active : ''} ${
												index <= currentQuestionIndex ? s.done : ''
											}`}
											style={{ '--delay': `${index * 0.1}s` } as CSSProperties}
										>
											<img
												src={
													award.milestone
														? '/img/erudito2.svg'
														: '/img/erudito_loader.svg'
												}
												alt="Nivel actual"
												className={
													s.game__container__modal_info__awards__item__img
												}
											/>
											{formatPrize(award.prize)}
										</p>
									))}
								</div>
								{!securedMoney ? (
									<p className={s.game__container__modal_info__text}>
										Aún no tienes nada asegurado. Si te retiras ahora, te llevas{' '}
										{formatPrize(currentAward.prize)}. Si continúas, podrías
										ganar {formatPrize(awards[currentQuestionIndex + 1].prize)}.
										¡Pero cuidado, podrías irte con las manos vacías!
									</p>
								) : (
									<p className={s.game__container__modal_info__text}>
										Tienes {formatPrize(securedMoney)} asegurados. Si te retiras
										ahora, te llevas {formatPrize(currentAward.prize)}. Si
										continúas, podrías ganar{' '}
										{formatPrize(awards[currentQuestionIndex + 1].prize)}. ¡Pero
										si pierdes, te irás con {formatPrize(securedMoney)}!
									</p>
								)}
								<div className={s.game__container__modal_info__buttons}>
									<Button fullWidth onClick={reset}>
										Retirarse con{' '}
										{formatPrize(awards[currentQuestionIndex].prize)}
									</Button>
									<Button fullWidth onClick={nextQuestion} variant="purple">
										Siguiente pregunta
									</Button>
								</div>
							</ModalContent>
						</Modal>
						<Modal
							noBackground
							noCloseButton
							open={gameOverType !== GameOver.None}
						>
							<div className={s.game__container__modal}>
								<h2 className={s.game__container__modal__title}>Game Over</h2>
								{gameOverType === GameOver.Time ? (
									<img
										src="/img/timer.png"
										alt="Timer"
										width={224}
										height={125}
										className={s.game__container__modal__time}
									/>
								) : (
									<img
										src="/img/egg.svg"
										alt="Huevo"
										width={200}
										height={86}
										className={s.game__container__modal__egg}
									/>
								)}
								<p className={s.game__container__modal__title}>
									{gameOverType === GameOver.Time
										? '¡Se acabó el tiempo! 😢'
										: '¡Has perdido! 😢'}
								</p>
								<div className={s.game__container__modal__buttons}>
									<Button fullWidth onClick={playAgain}>
										Jugar de nuevo con las mismas preguntas
									</Button>
									<Button fullWidth onClick={reset} variant="purple">
										Ir al inicio
									</Button>
								</div>
							</div>
						</Modal>
					</>
				) : (
					<div className={s.game__container__intro}>
						<img width={226} height={182} src="/img/cloud.png" alt="Intro" />
						<h1
							className={`${bebasNeue.className} ${s.game__container__intro__title}`}
						>
							{subject}
						</h1>
						<p className={s.game__container__intro__text}>
							A medida que respondas correctamente, avanzarás a preguntas más
							difíciles y acumularás puntos. Puedes usar los comodines “50:50”,
							“Llamada a un amigo” y “Ayuda del Público” para recibir asistencia
							cuando lo necesites.
						</p>
						<div className={s.game__container__intro__items}>
							<IoIosPeople size={32} />
							<MdPhone size={32} />
							<span>50 : 50</span>
						</div>
						<Button
							onClick={startGame}
							className={s.game__container__intro__button}
						>
							Jugar
						</Button>
						<button
							aria-label="Volver al inicio"
							className={s.game__container__intro__reset}
							onClick={reset}
						>
							<PiArrowCircleLeftBold size={32} />
						</button>
					</div>
				)}
			</section>
		</main>
	)
}

export default Game
