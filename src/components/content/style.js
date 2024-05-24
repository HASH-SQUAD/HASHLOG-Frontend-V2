import styled from 'styled-components'

export const Main_Content_Container = styled.div`
	width: 300px;
	height: 320px;
	background-color: white;
	border-radius: 30px;
	box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.2);
	padding: 17px 0px 0px 0px;

	img {
		display: block;
		margin: auto;
		width: 270px;
		height: 180px;
		border-radius: 14px;
		padding-bottom: 8px;
	}
`;

export const Content_Info = styled.div`
	width: 270px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Content_date = styled.div`
	font-family: 'Pretendard-Regular';
	font-size: 16px;
	color: #696969;
`;

export const Content_title = styled.div`
	font-family: 'Pretendard-SemiBold';
	font-size: 27px;
`;

export const Content_desc = styled.div`
	font-family: 'Pretendard-Medium';
	font-size: 22px;
	color: #54575f;
`;
