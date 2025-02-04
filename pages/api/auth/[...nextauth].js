import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
// import bcrypt from 'bcryptjs'
import prisma from '../../lib/prisma' // Prisma Client

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				})

				if (!user) {
					throw new Error('No user found with this email')
				}
				// if (user && bcrypt.checkpw(user.password, credentials.password)) {

				if (user && credentials.password === user.password) {
					return user
				}

				return null
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login'
	}
})
