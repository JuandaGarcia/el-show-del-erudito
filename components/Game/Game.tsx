import s from './Game.module.scss'
import Button from 'components/ui/Button/Button'
import { MdPhone } from 'react-icons/md'
import { useState } from 'react'
import { Question } from 'utils/schemas/question'
import { bebasNeue } from 'fonts/bebasNeue'
import { IoIosPeople } from 'react-icons/io'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { GoHomeFill } from 'react-icons/go'
import Modal from 'components/ui/Modal/Modal'

type Props = {
	questions: Question[]
}
const Game = ({ questions }: Props) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const currentQuestion = questions[currentQuestionIndex]
	const currentOptions = Object.entries(currentQuestion.options)
	const [timeToAnswer, setTimeToAnswer] = useState(30)
	const [isStarted, setIsStarted] = useState(false)
	const [isPublicHelpAvailable, setIsPublicHelpAvailable] = useState(true)
	const [isPhoneCallAvailable, setIsPhoneCallAvailable] = useState(true)
	const [isFiftyFiftyAvailable, setIsFiftyFiftyAvailable] = useState(true)
	const [disabledOptions, setDisabledOptions] = useState<string[]>([])
	const [isPlaying, setIsPlaying] = useState(true)
	const [openPublicHelpModal, setOpenPublicHelpModal] = useState(false)
	const [openPhoneCallModal, setOpenPhoneCallModal] = useState(false)
	const isDisabled = (key: string) => disabledOptions.includes(key)

	const startGame = () => setIsStarted(true)

	const gameOver = () => {}

	const selectAnswer = (answer: string) => {
		if (answer === currentQuestion.correct_answer) {
			setCurrentQuestionIndex(prev => prev + 1)
			setTimeToAnswer(30)
			setDisabledOptions([])
		} else {
			alert('Incorrecto')
		}
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
					<Button aria-label="Ayuda del público">
						<GoHomeFill />
					</Button>
					<CountdownCircleTimer
						key={currentQuestionIndex}
						isPlaying={isPlaying}
						duration={timeToAnswer}
						colors={['#86E69B', '#e7b416', '#f57c61']}
						trailColor="#fff"
						colorsTime={[30, 10, 0]}
						strokeWidth={10}
						size={60}
						onComplete={gameOver}
					>
						{({ remainingTime }) => (
							<span className={`${bebasNeue.className}`}>{remainingTime}</span>
						)}
					</CountdownCircleTimer>
				</div>
				<div className={s.game__container__wildcards}>
					<Button
						fullWidth
						title="Ayuda del público"
						aria-label="Ayuda del público"
						onClick={publicHelp}
						disabled={!isPublicHelpAvailable}
					>
						<IoIosPeople />
					</Button>
					<Button
						fullWidth
						title="Llamar a un amigo"
						aria-label="Llamar a un amigo"
						onClick={phoneCall}
						disabled={!isPhoneCallAvailable}
					>
						<MdPhone />
					</Button>
					<Button
						fullWidth
						title="50 : 50"
						onClick={fiftyFifty}
						disabled={!isFiftyFiftyAvailable}
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
								>
									{key}: {value}
								</Button>
							</li>
						))}
					</ul>
				</div>
				<Modal
					open={openPublicHelpModal}
					handleClose={closePublicHelpModal}
				></Modal>
				<Modal
					open={openPhoneCallModal}
					handleClose={closePhoneCallModal}
				></Modal>
			</section>
		</main>
	)
}

export default Game
