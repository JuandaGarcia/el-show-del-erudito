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

type Props = {
	questions: Question[]
	reset: () => void
}
const Game = ({ questions, reset }: Props) => {
	/* Game State */
	const [isStarted, setIsStarted] = useState(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [isPublicHelpAvailable, setIsPublicHelpAvailable] = useState(true)
	const [isPhoneCallAvailable, setIsPhoneCallAvailable] = useState(true)
	const [isFiftyFiftyAvailable, setIsFiftyFiftyAvailable] = useState(true)
	const [disabledOptions, setDisabledOptions] = useState<string[]>([])
	const [answerSelected, setAnswerSelected] = useState<string | null>(null)
	const [numberOfTimesPlayed, setNumberOfTimesPlayed] = useState(0)

	/* Values */
	const currentQuestion = questions[currentQuestionIndex]
	const currentOptions = Object.entries(currentQuestion.options)
	const buttonEvents = answerSelected ? s.remove_events : ''

	/* Modals */
	const [openPublicHelpModal, setOpenPublicHelpModal] = useState(false)
	const [openPhoneCallModal, setOpenPhoneCallModal] = useState(false)
	const [openGoHomeModal, setOpenGoHomeModal] = useState(false)
	const [openSuccessModal, setOpenSuccessModal] = useState(false)
	const [gameOverMessage, setGameOverMessage] = useState<string | null>(null)

	const startGame = () => setIsStarted(true)
	const isDisabled = (key: string) => disabledOptions.includes(key)
	const toggleGoHomeModal = () => setOpenGoHomeModal(!openGoHomeModal)
	const onCompleteCountdown = () => setGameOverMessage('¡Se acabó el tiempo!')
	const formatPrize = (prize: number) => `$${prize.toLocaleString()}`

	const selectAnswer = (answer: string) => {
		setAnswerSelected(answer)
		// Await for the button animation
		setTimeout(() => {
			if (answer === currentQuestion.correct_answer) {
				setOpenSuccessModal(true)
				confetti({
					particleCount: 25,
					spread: 70,
					origin: { y: 0.6 },
					colors: ['#5608d2'],
				})
			} else {
				setGameOverMessage('¡Has perdido!')
			}
		}, buttonSelectedAnimationDuration + 500)
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
		setCurrentQuestionIndex(0)
		setDefaultsToSetQuestion()
		setIsPublicHelpAvailable(true)
		setIsPhoneCallAvailable(true)
		setIsFiftyFiftyAvailable(true)
		setGameOverMessage(null)
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
			<section className={s.game__container}>
				<div className={s.game__container__controls}>
					<Button aria-label="Volver al Inicio" onClick={toggleGoHomeModal}>
						<GoHomeFill />
					</Button>
					<div
						className={`${s.game__container__controls__countdown} ${
							openPhoneCallModal || openPublicHelpModal ? s.modal : ''
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
							onComplete={onCompleteCountdown}
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
					<div className={s.game__container__public_help}>
						<h2 className={s.game__container__public_help__title}>
							¡Ayuda del público!
						</h2>
						<div className={s.game__container__public_help__imgs}>
							<PublicHelpChart
								answer={currentQuestion.correct_answer}
								className={s.game__container__public_help__imgs__chart}
							/>
							<img
								src="/img/cat.png"
								alt="El gato erudito"
								width={160}
								height={149}
								className={s.game__container__phone_call__imgs__cat_help_1}
							/>
							<img
								src="/img/mac.png"
								alt="Mac"
								width={116}
								height={135}
								className={s.game__container__phone_call__imgs__mac}
							/>
						</div>
						<p className={s.game__container__public_help__message}>
							El público ha votado y la opción más votada es la{' '}
							<span className={s.game__container__public_help__message__answer}>
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
					<div className={s.game__container__phone_call}>
						<h2 className={s.game__container__phone_call__title}>
							¿Qué dice tu amigo?
						</h2>
						<div className={s.game__container__phone_call__imgs}>
							<PhoneIcon />
							<img
								src="/img/cat.png"
								alt="El gato erudito"
								width={160}
								height={149}
								className={s.game__container__phone_call__imgs__cat_call}
							/>
						</div>
						<p className={s.game__container__phone_call__message}>
							&quot;Yo creo que la respuesta correcta es la opción{' '}
							<span className={s.game__container__phone_call__message__answer}>
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
						<h2>¡Correcto! 💸</h2>
					</ModalHeader>
					<ModalContent>
						<h3>Premios</h3>
						<div className={s.game__container__modal_info__awards}>
							{awards.map((award, index) => (
								<p
									key={award.prize}
									className={`${s.game__container__modal_info__award} ${
										index === currentQuestionIndex ? s.active : ''
									}`}
								>
									{formatPrize(award.prize)}
								</p>
							))}
						</div>
						<div className={s.game__container__modal_info__buttons}>
							<Button fullWidth onClick={reset}>
								Retirarse con {formatPrize(awards[currentQuestionIndex].prize)}
							</Button>
							<Button fullWidth onClick={nextQuestion} variant="purple">
								Siguiente pregunta
							</Button>
						</div>
					</ModalContent>
				</Modal>
				<Modal noCloseButton open={gameOverMessage !== null}>
					<ModalHeader>
						<h2>{gameOverMessage}</h2>
					</ModalHeader>
					<ModalContent>
						<p>¡Inténtalo de nuevo!</p>
						<div className={s.game__container__modal_info__buttons}>
							<Button fullWidth onClick={playAgain}>
								Jugar con las mismas preguntas
							</Button>
							<Button fullWidth onClick={reset} variant="purple">
								Ir al inicio
							</Button>
						</div>
					</ModalContent>
				</Modal>
			</section>
			<img className={s.game__room1} src="/img/room1.png" alt="Estantería" />
			<img className={s.game__room2} src="/img/room2.png" alt="Ventana" />
			<img
				className={s.game__plant}
				src="/img/plant.png"
				alt="Planta decorativa"
			/>
			<img className={s.game__floor} src="/img/floor.png" alt="Piso" />
		</main>
	)
}

export default Game
