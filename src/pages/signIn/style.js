import styled from 'styled-components';

export const SignIn_Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
  justify-content: center;
	gap: 10px;
  margin-bottom: 50vh;
`;

export const SiginIn_ID_Input = styled.input`
	width: 400px;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 10px;
`;

export const SiginIn_PW_Input = styled.input`
	width: 400px;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 20px;
`;

export const SigIn_Button = styled.button`
	width: 400px;
	height: 50px;
	font-size: 24px;
	font-family: 'Pretendard-Bold';
	background-color: black;
	color: white;
	cursor: pointer;
`;

export const SignIn_NO_Exist = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;
	cursor: pointer;
	font-size: 12px;
	font-family: 'Pretendard-Light';

	p {
		font-size: 12px;
		font-family: 'Pretendard-SemiBold';
	}
`;
