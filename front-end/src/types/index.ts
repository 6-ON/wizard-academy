interface Crud {
	id: number
	createdAt?: string
	updatedAt?: string
}
interface User extends Crud {
	firstName: string
	lastName: string
	email: string
	phone: string
	role: 'dean' | 'professor' | 'student' | 'admin'
}
interface Userable extends Crud {
	user: User
}
interface Dean extends Userable {
    university?: University
}

interface University extends Crud {
	name: string
	adress: string
	dean?: Dean
}
