import { createSelector } from 'reselect';
import { PRODUCTS_FETCHED, PRODUCT_CREATED } from '../types';

export default function products(state = {}, action = {}) {
	switch (action.type) {
		case PRODUCTS_FETCHED:
		case PRODUCT_CREATED:
			return { ...state, ...action.data.entities.products };
		default:
			return state;
	}
}

//selectors

export const productsSelector = (state) => state.products;

export const allProductsSelector = createSelector(productsSelector, (productHash) => Object.values(productHash));
