import { UNIVERSITY_MODAL_TYPES } from '@/constants'
import { useDisclosure } from '@nextui-org/react'
import { ProviderProps, createContext, useContext, useState } from 'react'

interface IUniversityContext {
	university: University
	isOpen: boolean
	modalInfo: {
		variant: keyof typeof UNIVERSITY_MODAL_TYPES
	}
	onView: (university: University) => void
	onModalClose: () => void
	setUniversity: (university: University) => void
	onEdit: (university: University) => void
	onDelete: (university: University) => void
}
const UniversityActionsContext = createContext<IUniversityContext | null>(null)

export const UniversityActionsProvider = ({ children }) => {
	const [university, setUniversity] = useState<University>(null)
	const [modalInfo, setModalInfo] = useState<IUniversityContext['modalInfo']>()
	const { isOpen, onClose, onOpen } = useDisclosure()

	const onView = (university: University) => {
		setUniversity(university)
		setModalInfo({ variant: 'view' })
		onOpen()
	}
	const onEdit = (university: University) => {
		setUniversity(university)
		setModalInfo({ variant: 'edit' })
		onOpen()
	}
	const onModalClose = () => {
		onClose()
		setUniversity(null)
	}
	const onDelete = (university: University) => {
		setUniversity(university)
		onOpen()
	}
	return (
		<UniversityActionsContext.Provider
			value={{
				university,
				setUniversity,
				onEdit,
				onDelete,
				isOpen,
				onView,
                modalInfo,
				onModalClose,
			}}
		>
			{children}
		</UniversityActionsContext.Provider>
	)
}

export const useUniversityActions = () => useContext(UniversityActionsContext)
