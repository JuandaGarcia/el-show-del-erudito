import confetti from 'canvas-confetti'

export const confettiSuccess = () => {
	confetti({
		particleCount: 25,
		spread: 70,
		origin: { y: 0.6 },
		colors: ['#5608d2'],
	})
}

export const confettiWin = () => {
	const end = Date.now() + 15 * 1000
	const colors = ['#86e69b', '#ffea31']

	;(function frame() {
		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: colors,
		})
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: colors,
		})

		if (Date.now() < end) {
			requestAnimationFrame(frame)
		}
	})()
}
