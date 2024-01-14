import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { renderUniversityCell } from '@/components/tables/universities/RenderCell'

const universityColumns = [
	{ name: 'UNIVERSITY', uid: 'university' },
	{ name: 'DEAN', uid: 'dean' },
	{ name: 'ACTIONS', uid: 'actions' },
]
export function UniversitiesTable({ data }: { data: University[] }) {
	return (
			<Table aria-label="universities table">
				<TableHeader columns={universityColumns}>
					{(column) => (
						<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={'No Universities to display.'} items={data} isLoading>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderUniversityCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
	)
}
