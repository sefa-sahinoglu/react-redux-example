import { combineReducers } from 'redux';

import user from './reducers/user';
import products from './reducers/products';

export default combineReducers({
	user,
	products
});
