import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSession, signIn } from 'next-auth/react'
import { useState } from 'react'

import Navigation from './components/navigation'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { t } = useTranslation('common')

	const handleSubmit = async (e) => {
		e.preventDefault()
		await signIn('credentials', { email, password, callbackUrl: '/' })
	}

	return (
		<>
			<Navigation />
			<div className="min-h-screen flex items-center justify-center text-gray-900">
				<form
					className="bg-white p-6 rounded shadow-md"
					onSubmit={handleSubmit}
				>
					<h2 className="text-2xl mb-4">Login</h2>
					<input
						type="email"
						placeholder={t('user_dashboard.th_email')}
						className="border p-2 w-full mb-4"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
						autoFocus
					/>
					<input
						type="password"
						placeholder={t('user_dashboard.th_password')}
						className="border p-2 w-full mb-4"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
					/>
					<button
						className="bg-blue-600 text-white p-2 rounded w-full"
						type="submit"
					>
						Login
					</button>
					<div className="mt-4">
						<button
							className="w-full bg-red-900 p-2 text-white rounded"
							onClick={() => signIn('google')}
						>
							Login with Google
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	const { locale } = context

	if (session) {
		return {
			redirect: {
				destination: '/'
			}
		}
	}

	return {
		props: {
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}
