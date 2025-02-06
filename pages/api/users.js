import prisma from '../../lib/prisma'
import cors, { runMiddleware } from '../../lib/cors'
// import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
	await runMiddleware(req, res, cors)

	if (req.method === 'GET') {
		try {
			const users = await prisma.user.findMany()
			res.status(200).json(users)
		} catch (error) {
			res.status(500).json({ message: 'Erro ao buscar usuários.' })
		}
	} else if (req.method === 'POST') {
		const { name, email, password } = req.body

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Todos os campos são obrigatórios.' })
		}

		try {
			const existingUser = await prisma.user.findUnique({
				where: { email }
			})

			if (existingUser) {
				return res.status(400).json({ message: 'O email já está em uso.' })
			}

			const newUser = await prisma.user.create({
				data: {
					name,
					email,
					password,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString()
				}
			})

			return res
				.status(201)
				.json({ message: 'Usuário criado com sucesso.', user: newUser })
		} catch (error) {
			return res.status(500).json({ message: 'Erro ao criar usuário.' })
		}
	} else {
		res.status(405).json({ message: 'Método não permitido' })
	}
}
