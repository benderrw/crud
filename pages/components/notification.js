import { toast } from 'react-toastify'

export const showNotification = (message, type) => {
	const options = {
		position: 'bottom-left',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true
	}

	if (type === 'success') {
		toast.success(message, options)
	} else if (type === 'error') {
		toast.error(message, options)
	}
}
