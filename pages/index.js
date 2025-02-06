import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSession, signOut } from 'next-auth/react'

import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	AiOutlineLogout,
	AiFillEdit,
	AiOutlineUserDelete
} from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'

import showNotification from '../components/notification'
import Navigation from '../components/navigation'

export default function Dashboard(session) {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [editMode, setEditMode] = useState(false)
	const [createMode, setCreateMode] = useState(false)

	const router = useRouter()
	const { t } = useTranslation('common')

	const createUser = () => {
		axios
			.post('/api/users/', {
				...user,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			})
			.then((response) => {
				showNotification(response.data.message, 'success')
				setUsers((prevUsers) => [...prevUsers, { ...response.data.user }])
				setUser({})
				setCreateMode(false)
			})
			.catch((error) => {
				showNotification(error.response.data.message, 'error')
			})
	}

	const updateUser = () => {
		axios
			.put(`/api/user/${user.id}`, {
				...user,
				updatedAt: new Date().toISOString()
			})
			.then((response) => {
				showNotification(response.data.message, 'success')
				setUsers((prevUsers) =>
					prevUsers.map((user) =>
						user.id === response.data.user.id
							? { ...user, ...response.data.user }
							: user
					)
				)
				setUser({})
				setEditMode(false)
			})
			.catch((error) => {
				showNotification(error.response.data.message, 'error')
			})
	}

	const deleteUser = (id) => {
		axios
			.delete(`/api/user/${id}`)
			.then((response) => {
				showNotification(response.data.message, 'success')
				setUsers((prevUsers) =>
					prevUsers.filter((user) => {
						if (user.id !== id) return user
					})
				)
			})
			.catch((error) => {
				showNotification(error.response.data.message, 'error')
			})
	}

	useEffect(() => {
		if (session) {
			axios.get('/api/users').then((response) => setUsers(response.data))
		}
	}, [session])

	if (!session) return <p>Access Denied</p>

	return (
		<>
			<Navigation />
			<div className="container flex-1 flex flex-col mx-auto py-8 p-6 shadow-md">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-3xl text-black dark:text-white">
						{t('user_dashboard.title')}
					</h1>
					<button
						className="bg-red-500 text-white p-2 rounded transition-all duration-300 hover:bg-red-600"
						onClick={() => signOut({ callbackUrl: `/${router.locale}/login` })}
					>
						<AiOutlineLogout />
					</button>
				</div>
				<div className="mt-4 flex-1 overflow-y-auto">
					<table className="table-auto w-full h-max text-black dark:text-white">
						<thead>
							<tr>
								<th>{t('user_dashboard.th_name')}</th>
								<th>{t('user_dashboard.th_email')}</th>
								<th>{t('user_dashboard.th_password')}</th>
								<th className="text-right">{t('user_dashboard.th_actions')}</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.password}</td>
									<td className="text-right">
										<button
											className="bg-blue-500 text-white mr-1 p-2 rounded transition-all duration-300 hover:bg-blue-600"
											onClick={() => {
												axios.get(`/api/user/${user.id}`).then((response) => {
													const user = response.data
													setUser({
														id: user.id,
														name: user.name,
														email: user.email,
														password: user.password
													})
													setEditMode(true)
												})
											}}
										>
											<AiFillEdit />
										</button>
										<button
											className="bg-red-500 text-white p-2 rounded transition-all duration-300 hover:bg-red-600"
											onClick={() => deleteUser(user.id)}
										>
											<AiOutlineUserDelete />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex justify-end mt-4 self-auto">
					<button
						className="bg-blue-500 text-white p-2 rounded transition-all duration-300 hover:bg-blue-600"
						onClick={() => setCreateMode(true)}
					>
						{t('add_user_button')}
					</button>
				</div>
			</div>

			{createMode && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-gray-900">
					<div className="container">
						<div className="bg-white p-6 rounded shadow-md">
							<h2 className="text-2xl mb-4">Create User</h2>
							<form
								className="flex flex-col"
								onSubmit={(event) => event.preventDefault() || createUser()}
							>
								<input
									type="text"
									placeholder="Nome"
									className="border p-2 w-full mb-4"
									value={user.name}
									onChange={(e) => setUser({ ...user, name: e.target.value })}
									required
									autoFocus
								/>
								<input
									type="email"
									placeholder="Email"
									className="border p-2 w-full mb-4"
									value={user.email}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
									required
								/>
								<input
									type="password"
									placeholder="Password"
									className="border p-2 w-full mb-4"
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
									required
								/>
								<div className="flex justify-start flex-row-reverse">
									<button
										type="submit"
										className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600"
									>
										Create User
									</button>
									<button
										type="cancel"
										className="bg-red-500 text-white p-2 rounded transition-all duration-300 hover:bg-red-600"
										onClick={() => {
											setUser({})
											setCreateMode(false)
										}}
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{editMode && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-gray-900">
					<div className="container">
						<div className="bg-white p-6 rounded shadow-md">
							<h2 className="text-2xl mb-4">Edit User</h2>
							<form
								className="flex flex-col"
								onSubmit={(event) => event.preventDefault() || updateUser()}
							>
								<input
									type="text"
									placeholder="Nome"
									className="border p-2 w-full mb-4"
									value={user.name}
									onChange={(e) => setUser({ ...user, name: e.target.value })}
									autoFocus
									required
								/>
								<input
									type="email"
									placeholder="Email"
									className="border p-2 w-full mb-4"
									value={user.email}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
									required
								/>
								<input
									type="password"
									placeholder="Password"
									className="border p-2 w-full mb-4"
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
									required
								/>
								<div className="flex justify-start flex-row-reverse">
									<button
										type="submit"
										className="bg-blue-500 text-white p-2 rounded ml-2 transition-all duration-300 hover:bg-blue-600"
									>
										Update User
									</button>
									<button
										type="cancel"
										className="bg-red-500 text-white p-2 rounded transition-all duration-300 hover:bg-red-600"
										onClick={() => {
											setUser({})
											setEditMode(false)
										}}
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			<ToastContainer />
		</>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	const { locale } = context

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	return {
		props: {
			session,
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}
