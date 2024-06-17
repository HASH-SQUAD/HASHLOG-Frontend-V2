import styled from 'styled-components';

export const Main_Content_Container = styled.div`
	width: 16vw;
	height: 28vh;
	background-color: white;
	border-radius: 30px;
	box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.2);
	padding: 2vh 0.5vw 2vh 0.5vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	img {
		width: 270px;
		height: 180px;
		border-radius: 14px;
		padding-bottom: 8px;
	}

	@media only screen and (max-width: 1299px) {
		width: 30vw;
		height: 22vh;
		padding: 10px 16px 16px 16px;
	}

	@media only screen and (max-width: 940px) {
		width: 40vw;
		height: 24vh;
		padding: 10px 16px 16px 16px;
	}

	@media only screen and (max-width: 768px) {
		width: 40vw;
		height: 30vh;
		padding: 10px 16px 16px 16px;
	}

	@media only screen and (max-width: 600px) {
		width: 80vw;
		height: 40vh;
		padding: 10px 16px 16px 16px;

		img {
			width: 100%;
			height: auto;
		}
	}

	@media only screen and (max-width: 430px) {
		width: 90vw;
		height: 40vh;
		padding: 10px 16px 16px 16px;

		img {
			width: 100%;
			height: auto;
		}
	}

	@media only screen and (max-width: 375px) {
		width: 90vw;
		height: 46vh;
		padding: 10px 16px 16px 16px;

		img {
			width: 100%;
			height: auto;
		}
	}
`;

export const Content_Info = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 8px;
`;

export const Content_date = styled.div`
	font-family: 'Pretendard-Regular';
	font-size: 16px;
	color: #696969;
`;

export const Content_title = styled.div`
	width: 90%;
	height: 30px;
	font-family: 'Pretendard-SemiBold';
	font-size: 27px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const Content_desc = styled.div`
	width: 90%;
	height: 40px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;

	p {
		width: 250px;
		height: 40px;
		font-family: 'Pretendard-Medium';
		font-size: 18px;
		color: #54575f;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
`;
