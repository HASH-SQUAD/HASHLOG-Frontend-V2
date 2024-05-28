import { DefaultInstance } from './Axios';

export const MainPost = async params => {
	const { data } = await DefaultInstance.get(`/post/`, params);
	return data;
};
