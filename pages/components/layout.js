import { useTheme } from '../context/theme-context'

const Layout = ({ children }) => {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={theme === 'dark' ? 'dark' : ''}>
			<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
				<main className="min-h-screen flex flex-col">{children}</main>
			</div>
		</div>
	)
}

export default Layout
