import axios from 'axios';
export default {
	user: {
		login: (credentials) => axios.post('/api/auth', { credentials }).then((res) => res.data.user),
		signup: (user) => axios.post('/api/user/register', { user }).then((res) => res.data.user)
	},
	products: {
		fetchAll: () => axios.get('/api/product').then((res) => res.data.products),
		create: (product) => axios.post('/api/product', { product }),
		delete: (product) => axios.post('/api/product/delete', { product }),
		update: (product) => axios.post('/api/product/update', { product })
	}
};
