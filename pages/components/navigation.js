import { useTheme } from '../context/theme-context'

export default function () {
	const { theme, toggleTheme } = useTheme()

	return (
		<aside className="p-4">
			<div className="container mx-auto flex justify-between">
				<button
					onClick={toggleTheme}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					Toggle Theme {theme}
				</button>
				<div>Component 2</div>
			</div>
		</aside>
	)
}
