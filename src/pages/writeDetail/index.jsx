// /*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as _ from './style';
import Header from '../../components/header';
import UploadingImg from '../../assets/img/UploadImg.svg';
import { useMutation } from 'react-query';
import { Upload_Img } from '../../libs/api/Post';

const WriteDetail = () => {
	//데이터 처리
	const location = useLocation();
	const WriteData = location.state;

	const [data, setData] = useState({
		title: '',
		desc: '',
		mainImg: 'http://localhost:3000/uploads/NoImg.jpg',
		subheading: '',
	});
	useEffect(() => {
		if (WriteData) {
			setData({
				title: WriteData.title,
				desc: WriteData.value,
				mainImg: '',
			});
		}
	}, [WriteData]);

	//썸네일 업로드
	const { isLoading: isLoadingStart, mutate: UploadImg } = useMutation(
		Upload_Img,
		{
			onSuccess: (res) => {
				console.log(res.url);
				setData((data) => ({ ...data, mainImg: res.url }));
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);
	const onUploadImg = (e) => {
		const file = e.currentTarget.files[0];
		const formData = new FormData();
		formData.append('img', file);
		UploadImg(formData);
	};

	//게시글 업로드
	const onSubmit = () => {};

	return (
		<_.Detail_Container>
			<Header />
			<_.Detail_Layout>
				<p>글 작성</p>
				<_.Detail_Main>
					<_.Detail_UploadImg>
						{data.mainImg ? (
							<>
								<img src={data.mainImg} alt='Uploading Image' />
								<_.Detail_ImgInput_Label for='ImgUploadInput'>
									재업로드
								</_.Detail_ImgInput_Label>
							</>
						) : (
							<>
								<img
									src='http://localhost:3000/uploads/NoImg.jpg'
									alt='No Image'
								/>
								<_.Detail_ImgInput_Label for='ImgUploadInput'>
									썸네일 업로드
								</_.Detail_ImgInput_Label>
							</>
						)}

						<_.Detail_ImgInput
							id='ImgUploadInput'
							type='file'
							accept='.png, .jpeg, .jpg'
							onChange={onUploadImg}
						/>
					</_.Detail_UploadImg>

					<_.Detail_Subheading>
						<_.Detail_SubInput
							placeholder='내용을 입력해주세요'
							spellcheck='false'
							onChange={(e) => {
								setData({
									...data,
									subheading: e.currentTarget.value,
								});
							}}
						/>
						<_.Detail_SubmitButton onClick={onSubmit}>
							출간하기
						</_.Detail_SubmitButton>
					</_.Detail_Subheading>
				</_.Detail_Main>
			</_.Detail_Layout>
		</_.Detail_Container>
	);
};

export default WriteDetail;
