import SwitchThemeButton from './switch-theme-button'

export default function () {
	return (
		<aside className="p-4">
			<div className="container mx-auto flex justify-between">
				<SwitchThemeButton />
				<div>Component 2</div>
			</div>
		</aside>
	)
}
