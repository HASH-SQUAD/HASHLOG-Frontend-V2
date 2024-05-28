import { DefaultInstance, AuthInstance } from './Axios';

export const MainPost = async params => {
	const { data } = await DefaultInstance.get(`/post/`, params);
	return data;
};

export const Upload_Img = async params => {
	const { data } = await AuthInstance.post(`/upload/image`, params);
	return data;
};
