import Cors from 'cors'

// Inicialize o middleware CORS com as configurações desejadas
const cors = Cors({
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	origin:
		process.env.NODE_ENV === 'production'
			? ['https://sua-aplicacao.com', 'https://outra-origem.com']
			: '*'
})

// Helper para utilizar middlewares em Next.js
export function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve(result)
		})
	})
}

export default cors
