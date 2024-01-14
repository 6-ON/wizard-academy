import { Button, Card, Input, NextUIProvider, Skeleton } from '@nextui-org/react'
import React, { FC } from 'react'
import AdminPanel from './pages/AdminPanel'

const App: FC = () => {
	return (
		<NextUIProvider>
			<AdminPanel />
		</NextUIProvider>
	)
}

export default App
