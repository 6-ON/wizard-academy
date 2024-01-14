import { UNIVERSITY_MODAL_TYPES } from '@/constants'
import { useUniversityActions } from '@/contexts'
import { deans } from '@/pages/data'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	Autocomplete,
	AutocompleteItem,
	Avatar,
} from '@nextui-org/react'

export const UniversityModal = () => {
	const { isOpen, onModalClose: onClose, university, modalInfo } = useUniversityActions()
	return (
		<Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="xl">
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{UNIVERSITY_MODAL_TYPES[modalInfo.variant]}
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col gap-4">
								<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
									<Input label="Name" variant="bordered" />
									<Input label="Adress" variant="bordered" />
								</div>
								<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
									<Autocomplete
										defaultItems={deans}
										variant="bordered"
										label="Dean"
									>
										{({user}) => (
											<AutocompleteItem key={user.id} textValue={user.firstName}>
												<div className="flex gap-2 items-center">
													<Avatar
														alt={user.firstName}
														className="flex-shrink-0"
														size="sm"
													/>
													<div className="flex flex-col">
														<span className="text-small">{user.firstName}</span>
														<span className="text-tiny text-default-400">{user.email}</span>
													</div>
												</div>
											</AutocompleteItem>
										)}
									</Autocomplete>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={onClose}>
								Action
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
