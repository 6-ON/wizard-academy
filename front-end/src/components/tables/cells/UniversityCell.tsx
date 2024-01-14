import React from 'react'
type UniversityCellProps = {
	university: University
}
const UniversityCell: React.FC<UniversityCellProps> = ({ university }) => {
	return (
		<div className="flex flex-col">
			<p className="text-bold text-sm capitalize">{university.name}</p>
			<p className="text-bold text-sm capitalize text-default-400">{university.adress}</p>
		</div>
	)
}

export default UniversityCell
