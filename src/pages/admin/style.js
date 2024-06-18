/*eslint-disable */
import styled from 'styled-components';

export const Admin_Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	gap: 100px;
`;

export const Admin_Layout = styled.div`
	width: 30%;
	height: 50%;
	border: 2px solid black;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	gap: 16px;
	padding: 1% 1%;
`;

export const Admin_SearchBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

export const Admin_Line = styled.div`
	width: 100%;
	height: 2px;
	background-color: black;
`;

export const Admin_Input = styled.input`
	border: none;
	font-size: 20px;
	outline: none;
	text-indent: 4px;
	width: 100%;
`;

export const Admin_Search_Icon = styled.div`cursor: pointer;`;

export const Admin_Content = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	gap: 10px;
`;

export const Admin_Content_Layout = styled.div`
	width: 100%;
	height: 14%;
	border: 2px solid black;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 3% 3%;
`;

export const Admin_UserName = styled.div`
	width: 70%;
	font-size: 20px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const Admin_Button = styled.button`
	background-color: black;
	border: none;
	color: white;
	font-size: 20px;
	width: 100px;
	height: 30px;
	border-radius: 6px;
`;
