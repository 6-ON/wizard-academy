import { ViewIcon, EditIcon, DeleteIcon } from '@/components/icons'
import { User, Tooltip } from '@nextui-org/react'
import UniversityCell from '../cells/UniversityCell'
import UserCell from '../cells/UserCell'
import { useUniversityActions } from '@/contexts'

export const renderUniversityCell = (university: University, columnKey: React.Key) => {
	switch (columnKey) {
		case 'dean':
			return <UserCell user={university.dean.user} />
		case 'university':
			return <UniversityCell university={university} />
		case 'actions':
			return <UniversityActions university={university} />
		default:
			return <span>Unhandled column</span>
	}
}
function UniversityActions({ university }) {
	const { onEdit, onDelete, onView } = useUniversityActions()
	return (
		<div className="relative flex items-center gap-2">
			<Tooltip content="Details">
				<span
					className="text-lg text-default-400 cursor-pointer active:opacity-50"
					onClick={() => onView(university)}
				>
					<ViewIcon />
				</span>
			</Tooltip>
			<Tooltip content="Edit user">
				<span
					className="text-lg text-blue-400 cursor-pointer active:opacity-50"
					onClick={() => onEdit(university)}
				>
					<EditIcon />
				</span>
			</Tooltip>
			<Tooltip color="danger" content="Delete user">
				<span
					className="text-lg text-red-400 cursor-pointer active:opacity-50"
					onClick={() => onDelete(university)}
				>
					<DeleteIcon />
				</span>
			</Tooltip>
		</div>
	)
}
