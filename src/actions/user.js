import api from '../api';
import { userLoggedIn } from './auth';

export const register = (data) => (dispatch) =>
	api.user.signup(data).then((user) => {
		localStorage.exampleJWT = user.token;
		dispatch(userLoggedIn(user));
	});
