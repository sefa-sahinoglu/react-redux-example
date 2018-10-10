import { normalize } from 'normalizr';
import { PRODUCTS_FETCHED } from '../types';
import api from '../api';
import { productSchema } from '../schemas';

const productsFetched = (data) => ({
	type: PRODUCTS_FETCHED,
	data
});

export const fetchProducts = () => (dispatch) =>
	api.products.fetchAll().then((products) => dispatch(productsFetched(normalize(products, [ productSchema ]))));

export const createProduct = (data) => () => api.products.create(data);

export const deleteProduct = (data) => () => api.products.delete(data);

export const updateProduct = (data) => () => api.products.update(data);
