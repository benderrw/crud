import SwitchThemeButton from './switch-theme-button'
import SwitchLocaleButton from './switch-locale-button'

export default function () {
	return (
		<aside className="p-4">
			<div className="container mx-auto flex justify-between">
				<SwitchThemeButton />
				<SwitchLocaleButton />
			</div>
		</aside>
	)
}
