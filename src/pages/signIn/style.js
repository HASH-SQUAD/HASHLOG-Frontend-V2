/*eslint-disable */
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
	width: 22%;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 10px;

	@media only screen and (max-width: 1299px) {
		width: 30%;
	}

	@media only screen and (max-width: 940px) {
		width: 40%;
	}

	@media only screen and (max-width: 768px) {
		width: 40%;
	}

	@media only screen and (max-width: 430px) {
		width: 80%;
	}

	@media only screen and (max-width: 375px) {
		width: 80%;
	}
`;

export const SiginIn_PW_Input = styled.input`
	width: 22%;
	height: 50px;
	font-size: 14px;
	font-family: 'Pretendard-Thin';
	text-indent: 6px;
	margin-bottom: 20px;

	@media only screen and (max-width: 1299px) {
		width: 30%;
	}

	@media only screen and (max-width: 940px) {
		width: 40%;
	}

	@media only screen and (max-width: 768px) {
		width: 40%;
	}

	@media only screen and (max-width: 430px) {
		width: 80%;
	}

	@media only screen and (max-width: 375px) {
		width: 80%;
	}
`;

export const SigIn_Button = styled.button`
	width: 22%;
	height: 50px;
	font-size: 24px;
	background-color: black;
	color: white;
	cursor: pointer;

	@media only screen and (max-width: 1299px) {
		width: 30%;
	}

	@media only screen and (max-width: 940px) {
		width: 40%;
	}

	@media only screen and (max-width: 768px) {
		width: 40%;
	}

	@media only screen and (max-width: 430px) {
		width: 80%;
	}

	@media only screen and (max-width: 375px) {
		width: 80%;
	}
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
