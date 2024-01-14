import { ViewIcon, EditIcon, DeleteIcon } from '@/components/icons'
import { Tooltip } from '@nextui-org/react'
import React from 'react'
import UserCell from '../cells/UserCell'
import UniversityCell from '../cells/UniversityCell'

export const renderDeanCell = ({ user, university }: Dean, columnKey: React.Key) => {
	switch (columnKey) {
		case 'dean':
			return <UserCell user={user} />
		case 'university':
			return <UniversityCell university={university} />
		case 'actions':
			return (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Details">
						<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
							<ViewIcon />
						</span>
					</Tooltip>
					<Tooltip content="Edit user">
						<span className="text-lg text-blue-400 cursor-pointer active:opacity-50">
							<EditIcon />
						</span>
					</Tooltip>
					<Tooltip color="danger" content="Delete user">
						<span className="text-lg text-red-400 cursor-pointer active:opacity-50">
							<DeleteIcon />
						</span>
					</Tooltip>
				</div>
			)
		default:
			return null
	}
}
