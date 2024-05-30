import { DefaultInstance, AuthInstance } from './Axios';

export const MainPost = async params => {
	const { data } = await DefaultInstance.get(`/post/`, params);
	return data;
};

export const Upload_Img = async params => {
	const { data } = await AuthInstance.post(`/upload/image`, params);
	return data;
};

export const Upload_Post = async params => {
	const { data } = await AuthInstance.post(`/post/`, params);
	return data;
};

export const GetPostById = async params => {
	const { data } = await DefaultInstance.get(`/post/${params.queryKey[1]}`, params);
	return data;
};
