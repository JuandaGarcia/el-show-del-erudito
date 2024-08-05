import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import s from './Modal.module.scss'
import { createPortal } from 'react-dom'
import { bebasNeue } from 'fonts/bebasNeue'
import { IoClose } from 'react-icons/io5'

type Props = {
	open: boolean
	handleClose?: () => void
	noBackground?: boolean
}
const Modal = ({
	open,
	handleClose,
	children,
	noBackground,
}: PropsWithChildren<Props>) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [container, setContainer] = useState<Element | null>()

	useEffect(() => {
		const closeOnEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose && handleClose()
			}
		}

		if (open) {
			document.body.addEventListener('keydown', closeOnEsc)
		} else {
			document.body.removeEventListener('keydown', closeOnEsc)
		}

		return () => {
			document.body.removeEventListener('keydown', closeOnEsc)
		}
	}, [open, handleClose])

	useEffect(() => {
		if (open) modalRef.current?.focus()
	}, [open])

	useEffect(() => {
		setContainer(document.querySelector('#modal'))
	}, [])

	return open && container
		? createPortal(
				<div className={s.modal}>
					<div
						className={`${s.modal__content} ${noBackground && s.no_background}`}
						ref={modalRef}
					>
						<button
							className={s.modal__content__close}
							aria-label="Cerrar Modal"
							onClick={handleClose}
						>
							<IoClose />
						</button>
						{children}
					</div>
					<div className={s.modal__overlay} onClick={handleClose} />
				</div>,
				container
		  )
		: null
}

export const ModalHeader = ({ children }: PropsWithChildren) => {
	return (
		<header className={`${s.modal__content__header} ${bebasNeue.className}`}>
			{children}
		</header>
	)
}
export const ModalContent = ({ children }: PropsWithChildren) => {
	return <div className={s.modal__content__content}>{children}</div>
}
export const ModalFooter = ({ children }: PropsWithChildren) => {
	return <div className={s.modal__content__footer}>{children}</div>
}

export default Modal
