/*eslint-disable */
import styled from 'styled-components';

export const Detail_Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Detail_Layout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	align-items: center;
	margin-top: 20vh;
	gap: 100px;

	p {
		font-size: 30px;
		font-family: "Pretendard-Bold";
	}
`;

export const Detail_Main = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 50px;
`;

export const Detail_UploadImg = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  gap: 50px;
	width: 18vw;
	height: 30vh;
	border: 1px solid black;
`;

export const Detail_ImgButton = styled.button`
	background-color: black;
	color: #fff;
  width: 12vw;
  height: 4vh;
  font-size: 16px;
	font-family: 'Pretendard-Regular';
`;

export const Detail_Subheading = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 18vw;
	height: 30vh;
	gap: 20px;
`;

export const Detail_SubInput = styled.textarea`
	resize: none;
	width: 18vw;
	height: 30vh;
  font-size: 16px;
	font-family: 'Pretendard-Thin';
  padding: 8px 8px;
	text-indent: 6px;
`;

export const Detail_SubmitButton = styled.button`
	width: 18vw;
	height: 60px;
	font-size: 20px;
	font-family: 'Pretendard-Regular';
	background-color: black;
	color: #fff;
	cursor: pointer;
`;
