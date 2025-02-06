import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function (props) {
	const router = useRouter()
	const { t } = useTranslation('common')

	const changeLanguage = (locale) =>
		router.push(router.pathname, router.asPath, { locale })

	return (
		<div className="flex items-center gap-2">
			<div className="text-sm font-thin">{t('change_language')}</div>
			<button
				onClick={() => changeLanguage('en')}
				disabled={router.locale === 'en'}
				className="grayscale disabled:grayscale-0 hover:grayscale-0 transition-all duration-300"
			>
				<Image src="/flags/gb.svg" alt="English" width={34} height={34} />
			</button>
			<button
				onClick={() => changeLanguage('pt')}
				disabled={router.locale === 'pt'}
				className="grayscale disabled:grayscale-0 hover:grayscale-0 transition-all duration-300"
			>
				<Image src="/flags/br.svg" alt="Portuguese" width={34} height={34} />
			</button>
		</div>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}
