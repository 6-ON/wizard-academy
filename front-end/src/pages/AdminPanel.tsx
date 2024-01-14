import { Button } from '@nextui-org/react'
import { deans, universities } from './data'
import { PlusIcon } from '@/components/icons'
import { DeansTable, UniversitiesTable } from '../components/tables'
import { UniversityActionsProvider } from '@/contexts'
import { UniversityModal } from '@/components/modals'

const AdminPanel = () => {
	return (
		<div className="flex flex-col relative min-h-screen max-w-full bg-primary-50">
			<Button isIconOnly size="lg" className="fixed bottom-6 scale-125 right-6 z-20 p-2" color="primary" variant='shadow'>
				<PlusIcon />
			</Button>
			<div className="flex flex-col gap-4 p-8">
				<DeansTable data={deans} />
				<UniversityActionsProvider>
					<UniversitiesTable data={universities} />
					<UniversityModal />
				</UniversityActionsProvider>
			</div>
		</div>
	)
}

export default AdminPanel
