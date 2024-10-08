import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import './globals.scss'
import ClientEvents from 'components/ClientEvents/ClientEvents'
import { Analytics } from '@vercel/analytics/react'

const exo2 = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'El Show del Erudito - Juego de Trivia',
	description:
		'Prepárate para desafiar tu conocimiento y divertirte como nunca en este emocionante juego de trivia. En El Show del Erudito, tendrás la oportunidad de poner a prueba tus habilidades mentales con preguntas generadas especialmente para ti, basadas en el tema de tu elección.',
	openGraph: {
		images:
			'https://raw.githubusercontent.com/JuandaGarcia/el-show-del-erudito/main/public/img/thumbnail.jpg',
	},
	manifest: '/manifest.json',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={exo2.className}>
				{children}
				<ClientEvents />
				<div id="modal" />
				<Analytics />
			</body>
		</html>
	)
}
