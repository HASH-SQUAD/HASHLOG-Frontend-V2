import styled from 'styled-components';

export const Write_Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Write_Layout = styled.div`
	padding: 30px 50px 0px 50px;
	width: 100vw;
	display: flex;
	flex-direction: row;
`;

export const Write_Left = styled.div`
	max-width: 48vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: 10px;
`;

export const Write_Left_Top = styled.div``;

export const Write_Left_Bottom = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 6vh;
	max-width: 48vw;
	padding-bottom: 20px;

	button {
		height: 50px;
		width: 120px;
		border: 1.5px solid black;
		border-radius: 10px;
		font-size: 24px;
		font-family: 'Pretendard-Regular';
		background-color: white;
		cursor: pointer;

		&:hover {
			background-color: #f2f2f2;
			transition: all 0.3s;
		}
	}
`;

export const Write_Left_Arrow = styled.div`
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	border-radius: 10px;
	gap: 8px;
	cursor: pointer;

	&:hover {
		background-color: #f2f2f2;
		transition: all 0.3s;
	}

	img {
		width: 30px;
		height: 30px;
	}
`;

export const Write_Title_Input = styled.input`
	width: 48vw;
	height: 80px;
	font-size: 40px;
	font-family: 'Pretendard-Medium';
	text-indent: 6px;
	overflow: scroll;
	border: none;
	color: black;
	outline: none;
`;

export const Write_Line = styled.div`
	width: 40vw;
	height: 3px;
	flex-shrink: 0;
	background-color: #b9b9bc;
	margin: 0px 0px 10px 0px;
`;

export const Write_Right = styled.div`
	max-width: 47vw;
	height: 92.2vh;
	padding: 0px 20px;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
	fill: #f5f5f5;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const Write_Preview_Title = styled.input`
	width: 45vw;
	height: 80px;
	display: flex;
	align-items: center;
	font-size: 40px;
	font-family: 'Pretendard-Medium';
	text-indent: 6px;
	overflow: scroll;
	border: none;
	color: black;
	outline: none;
	background-color: #f5f5f5;
`;

export const Write_Preview_Content = styled.div`
	height: 82vh;
	width: 46vw;
	overflow: scroll;
	word-break: normal h1 {
		font-size: 2em;
	}
	p {
		font-size: 16px;
		font-family: 'Pretendard-Light';
	}
	strong {
		font-weight: 500;
	}
	img {
		max-width: 44vw;
		max-height: 82vh;
	}
`;
