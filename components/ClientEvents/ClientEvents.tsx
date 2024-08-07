'use client'
import { useEffect } from 'react'
import ASCII from 'utils/ASCII'

const ClientEvents = () => {
	useEffect(() => {
		ASCII()
		console.log(
			`%c ▲ Powered by Vercel`,
			'color: #ffffff; font-family:monospace;'
		)
	}, [])
	return null
}

export default ClientEvents
