import { useEffect, useRef } from 'react'
import s from './Modal.module.scss'
import { createPortal } from 'react-dom'

type Props = {
	open: boolean
	handleClose?: () => void
}
const Modal = ({ open, handleClose }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const modalContainer = document.querySelector('#modal')

	useEffect(() => {
		const body = document.querySelector('body')

		const closeOnEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose && handleClose()
			}
		}

		const controlScroll = (value: 'initial' | 'hidden') => {
			body && body.setAttribute('style', `overflow: ${value}`)
		}

		if (open) {
			controlScroll('hidden')
			document.body.addEventListener('keydown', closeOnEsc)
		} else {
			controlScroll('initial')
			document.body.removeEventListener('keydown', closeOnEsc)
		}

		return () => {
			controlScroll('initial')
			document.body.removeEventListener('keydown', closeOnEsc)
		}
	}, [open, handleClose])

	useEffect(() => {
		if (open) modalRef.current?.focus()
	}, [open])
	return open && modalContainer
		? createPortal(
				<div className={s.modal}>
					<div className={s.modal__content} ref={modalRef}>
						<h2>Modal</h2>
						<p>Modal content</p>
					</div>
					<div className={s.modal__overlay} onClick={handleClose} />
				</div>,
				modalContainer
		  )
		: null
}

export default Modal
