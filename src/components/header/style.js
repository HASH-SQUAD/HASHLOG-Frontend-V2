import styled from 'styled-components';

export const Header_Container = styled.div`
	width: 100vw;
	height: 50px;
	display: flex;
	flex-direction: row;
	border-bottom: 1px black solid;
	justify-content: space-between;
	align-items: center;
	padding: 0px 200px;
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

export const Header_Nickname = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	height: 30px;
	font-size: 18px;
	font-family: 'Pretendard-Regular';
`;

export const Header_WriteState = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
`;
