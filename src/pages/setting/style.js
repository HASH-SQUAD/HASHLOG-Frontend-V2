/*eslint-disable */
import styled from 'styled-components';

export const Setting_Container = styled.div`
	//드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const Setting_Layout = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 50px;
	margin-top: 100px;
`;

export const Setting_Left = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 400px;
	width: 300px;
	gap: 10px;
`;

export const Setting_ProfileImg = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 100%;
`;

export const Setting_Upload_ProfileImg_Label = styled.label`
	border: none;
	background-color: black;
	width: 180px;
	height: 40px;
	font-size: 18px;
	color: white;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Setting_Upload_ProfileImg = styled.input`
	display: none;
`;

export const Setting_Delete_ProfileImg = styled.button`
	border: none;
	background-color: #ff8282;
	width: 180px;
	height: 40px;
	font-size: 18px;
	color: black;
	cursor: pointer;
`;

export const Setting_Line = styled.div`
	background-color: black;
	width: 1px;
	height: 300px;
`;

export const Setting_Right = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 400px;
	width: 300px;
	gap: 10px;
	padding: 5% 0 0 0;
`;

export const Setting_NickName_Layout = styled.div`
	display: flex;
	flex-direction: row;
	align-items: end;
	justify-content: center;
`;

export const Setting_NickNmae = styled.div`
	font-size: 54px;
	font-family: 'Pretendard-Medium';
`;

export const Setting_NickName_Edit = styled.div`
	font-size: 20px;
	color: black;
	cursor: pointer;
`;

export const Setting_Change_Pw = styled.button`
	border: none;
	background-color: black;
	width: 180px;
	height: 40px;
	font-size: 18px;
	color: white;
	margin-top: 90px;
	cursor: pointer;
`;

export const Setting_DeleteAccount = styled.button`
	border: none;
	background-color: #ff8282;
	width: 180px;
	height: 40px;
	font-size: 18px;
	color: black;
	cursor: pointer;
`;
