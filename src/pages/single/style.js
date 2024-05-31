/*eslint-disable */
import styled from 'styled-components';

export const Single_Container = styled.div`
	width: 50vw;
`;

export const Single_Layout = styled.div`
	width: 100vw;
	padding: 20px 26vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	gap: 18px;
`;

export const Single_Title = styled.div`
	font-size: 50px;
	font-family: 'Pretendard-Bold';
`;

export const Single_Info_Layout = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

export const Single_Info = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 6px;
`;

export const Single_Nickname = styled.div`
	font-size: 16px;
	font-family: 'Pretendard-Regular';
	background-color: #eeeeee;
	padding: 6px 10px;
	border-radius: 20px;
`;

export const Single_Date = styled.div`
	font-size: 16px;
	font-family: 'Pretendard-Regular';
	color: #7a7d85;
`;

export const Single_EditTools = styled.div`
	display: flex;
	flex-direction: row;
	gap: 6px;

	button {
		cursor: pointer;
		background: none;
		border: none;
		font-size: 16px;
		color: #696969;
	}
`;

export const Single_Line = styled.div`
	width: 100%;
	height: 2px;
	background-color: #7a7d85;
	border-radius: 5px;
`;

export const Single_Body = styled.div`
	img {
		max-width: 30vw;
	}
`;
