import { useTheme } from '../context/theme-context'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function () {
	const { theme, toggleTheme } = useTheme()

	return (
		<aside className="p-4">
			<div className="container mx-auto flex justify-between">
				<button
					onClick={toggleTheme}
					className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-full transition-all duration-300 hover:bg-blue-600"
				>
					{theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
				</button>
				<div>Component 2</div>
			</div>
		</aside>
	)
}
