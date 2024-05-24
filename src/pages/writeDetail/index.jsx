/*eslint-disable */
import React from 'react';
import { useLocation } from 'react-router-dom';

import * as _ from './style';
import Header from '../../components/header';
import UploadingImg from '../../assets/img/UploadImg.svg';

const WriteDetail = () => {
	const location = useLocation();
	const data = location.state;
	console.log(data);
	return (
		<_.Detail_Container>
			<Header />
			<_.Detail_Layout>
				<p>글 작성</p>
				<_.Detail_Main>
					<_.Detail_UploadImg>
						<img src={UploadingImg} alt='Uploading Image' />
						<_.Detail_ImgButton>썸네일 업로드</_.Detail_ImgButton>
					</_.Detail_UploadImg>

					<_.Detail_Subheading>
						<_.Detail_SubInput
							placeholder='내용을 입력해주세요'
							spellcheck='false'
						/>
						<_.Detail_SubmitButton>출간하기</_.Detail_SubmitButton>
					</_.Detail_Subheading>
				</_.Detail_Main>
			</_.Detail_Layout>
		</_.Detail_Container>
	);
};

export default WriteDetail;
