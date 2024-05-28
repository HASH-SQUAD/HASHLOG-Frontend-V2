import { DefaultInstance, AuthInstance } from './Axios';

export const AuthSignIn = async params => {
	const { data } = await DefaultInstance.post(`/auth/signin`, params);
	return data;
};

export const AuthSignUp = async params => {
	const { data } = await DefaultInstance.post(`/auth/signup`, params);
	return data;
};

export const AuthState = async params => {
	const { data } = await AuthInstance.get(`/auth/`, params);
	return data;
};

export const RefreshAccessToken = async params => {
	const { data } = await AuthInstance.post(`/jwt/`, params);
	return data;
};
