import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './context/theme-context'
import Layout from './components/layout'

export default function App({
	Component,
	pageProps: { session, ...pageProps }
}) {
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
