import { User } from '@nextui-org/react'
import React from 'react'
type UserCellProps = {
	user: User
}
const UserCell: React.FC<UserCellProps> = ({ user }) => {
	return (
		<User avatarProps={{ radius: 'lg' }} description={user.email} name={`${user.firstName} ${user.lastName}`}>
			{user.email}
		</User>
	)
}

export default UserCell
