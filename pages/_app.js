import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './context/theme-context'
import Layout from './components/layout'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<ThemeProvider>
			<Layout>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</Layout>
		</ThemeProvider>
	)
}

export default appWithTranslation(App)
