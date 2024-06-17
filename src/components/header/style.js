import styled from 'styled-components';

export const Header_Container = styled.div`
	width: 100vw;
	height: 50px;
	display: flex;
	flex-direction: row;
	border-bottom: 1px black solid;
	justify-content: space-between;
	align-items: center;
	padding: 0px 10%;
	align-items: center;

	//드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	p {
		font-size: 38px;
		font-family: 'Pretendard-Black';
		cursor: pointer;
	}

	button {
		width: 70px;
		height: 30px;
		background: black;
		border: none;
		border-radius: 5px;
		color: white;
		font-size: 14px;
		cursor: pointer;
	}
`;

export const Header_Profile = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 4px;
	cursor: pointer;

	img {
		width: 40px;
		height: 40px;
		border-radius: 100%;
	}
`;

export const Header_ProfileDetail = styled.div`
	width: 0;
	height: 0;
	border-top: 14px solid black;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-radius: 5px;
`;

export const Header_DropDwonBlocker = styled.div`
	width: 70px;
	height: 50px;
	position: absolute;
	opacity: 0;
	top: 0;
	right: 10%;
	cursor: pointer;
`;

export const Header_DropDown = styled.div`
	width: 180px;
	background-color: #1e1e1e;
	position: absolute;
	right: 10%;
	top: 50px;
`;

export const Header_DropDown_Option = styled.div`
	width: 100%;
	height: 60px;
	font-size: 18px;
	color: white;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: left;
	margin-left: 20px;
	cursor: pointer;

	&:hover {
		color: black;
		transition: backgournd 0.2s ease-in-out, color 0.2s ease-in-out;
	}
`;

export const Header_WriteState = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;
