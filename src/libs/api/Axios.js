import axios from 'axios';
import { useMutation } from 'react-query';
import { RefreshAccessToken } from './Auth';

const AUTH_URL = process.env.REACT_APP_SERVER_ORIGIN;

export const AuthInstance = axios.create({
	baseURL: AUTH_URL,
	timeout: 10000,
});

AuthInstance.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken');
		const refreshToken = localStorage.getItem('refreshToken');
		if (accessToken) {
			config.headers.accessToken = accessToken;
		}
		if (refreshToken) {
			config.headers.refreshToken = refreshToken;
		}
		return config;
	},
	error => Promise.reject(error)
);

AuthInstance.interceptors.response.use(
	response => response,
	async error => {
		if (axios.isAxiosError(error) && error.response) {
			const { status } = error.response.data;
			const refreshToken = localStorage.getItem('refreshToken');

			if (status === 403) {
				if (refreshToken) {
					const { mutate: loginMutate } = useMutation(RefreshAccessToken, {
						onSuccess: res => {
							if (error.config) {
								error.config.headers.accessToken = res.data.accessToken;
								return axios.request(error.config);
							}
						},
						onError: err => {
							alert('로그인이 필요한 서비스입니다.');
						},
					});

					loginMutate();
				} else {
					throw error;
				}
			} else {
				throw error;
			}
		} else {
			throw error;
		}
	}
);

export const DefaultInstance = axios.create({
	baseURL: AUTH_URL,
	timeout: 10000,
});
