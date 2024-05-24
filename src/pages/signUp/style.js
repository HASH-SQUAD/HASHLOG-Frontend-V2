/*eslint-disable */
import styled from 'styled-components';

export const SignIn_Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 50vh;

	img {
		margin-bottom: 20px;
	}
`;

export const SiginIn_Error = styled.div`
	margin-top: -15px;
	margin-bottom: 16px;
	color: red;
	font-size: 14px;
`;

export const SiginIn_ID_Input = styled.input`
	width: 400px;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 20px;
`;

export const SiginIn_PW_Input = styled.input`
	width: 400px;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 20px;
`;

export const SiginIn_EMAIL_Input = styled.input`
	width: 400px;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 20px;
`;

export const SiginIn_NICKNAME_Input = styled.input`
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
	background-color: black;
	color: white;
	cursor: pointer;
`;

export const SignIn_NO_Exist = styled.div`
	margin-top: 10px;
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
