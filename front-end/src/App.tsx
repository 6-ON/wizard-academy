import { Button, Card, Input, NextUIProvider, Skeleton } from '@nextui-org/react'
import React, { FC } from 'react'

const App: FC = () => {
	return (
		<NextUIProvider>
			<div className="w-72"></div>
			<Button color="primary">Click me</Button>
			<Input type="email" label="Email" />
			<Card className="w-[200px] space-y-5 p-4" radius="lg">
				<Skeleton className="rounded-lg">
					<div className="h-24 rounded-lg bg-default-300"></div>
				</Skeleton>
				<div className="space-y-3">
					<Skeleton className="w-3/5 rounded-lg">
						<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
					</Skeleton>
					<Skeleton className="w-4/5 rounded-lg">
						<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
					</Skeleton>
					<Skeleton className="w-2/5 rounded-lg">
						<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
					</Skeleton>
				</div>
			</Card>
		</NextUIProvider>
	)
}

export default App
