import prisma from '../../lib/prisma'
import cors, { runMiddleware } from '../../lib/cors'

export default async function handler(req, res) {
	try {
		await runMiddleware(req, res, cors)

		console.log(req.method)

		if (req.method === 'GET') {
			const user = await prisma.user.findUnique({
				where: { id: Number(req.query.id) }
			})
			res.status(200).json(user)
		} else if (req.method === 'PUT') {
			const { name, email, password } = req.body
			const updatedUser = await prisma.user.update({
				where: { id: Number(req.query.id) },
				data: {
					name,
					email,
					password,
					updatedAt: new Date().toISOString()
				}
			})
			res
				.status(200)
				.json({ user: updatedUser, message: 'User updated successfully' })
		} else if (req.method === 'DELETE') {
			await prisma.user.delete({
				where: { id: Number(req.query.id) }
			})
			res.status(200).json({ message: 'User deleted successfully' })
		} else {
			res.status(405).json({ message: 'Method Not Allowed' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user' })
	}
}
