import { renderDeanCell } from '@/components/tables/deans/RenderCell'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
const deansColumns = [
	{ name: 'DEAN', uid: 'dean' },
	{ name: 'UNIVERSITY', uid: 'university' },
	{ name: 'ACTIONS', uid: 'actions' },
]
export function DeansTable({ data }: { data: Dean[] }) {
	return (
		<Table aria-label="deans table">
			<TableHeader columns={deansColumns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={'No Deans to display.'} items={data} isLoading>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderDeanCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
