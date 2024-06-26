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

export const Update_ProfileImg = async params => {
	const { data } = await AuthInstance.put(`/auth/update/profileimg`, params);
	return data;
};

export const Delete_ProfileImg = async params => {
	const { data } = await AuthInstance.put(`/auth/delete/profileimg`, params);
	return data;
};

export const Update_Password = async params => {
	const { data } = await AuthInstance.put(`/auth/update/password`, params);
	return data;
};

export const Update_NickName = async params => {
	const { data } = await AuthInstance.put(`/auth/update/nickname`, params);
	return data;
};

export const Delete_Account = async params => {
	const { data } = await AuthInstance.delete(`/auth/delete`, params);
	return data;
};

export const Get_UserList = async params => {
	const { data } = await AuthInstance.get(`/auth/adminLNRnUy7s5T`, params);
	return data;
};

export const Get_UserById = async params => {
	const { data } = await AuthInstance.post(`/auth/admincrhinqi`, params);
	return data;
};

export const Admin_Permission = async params => {
	const { data } = await AuthInstance.post(`/auth/admin`, params);
	return data;
};


