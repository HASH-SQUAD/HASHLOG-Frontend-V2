// /*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import * as _ from './style';
import Header from '../../components/header';
import UploadingImg from '../../assets/img/UploadImg.svg';
import { Upload_Img, Upload_Post } from '../../libs/api/Post';
import Swal from 'sweetalert2';

const WriteDetail = () => {
	const history = useNavigate();
	//데이터 처리
	const location = useLocation();
	const WriteData = location.state;

	const [data, setData] = useState({
		title: '',
		desc: '',
		mainImg: '',
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
	const { isLoading: UploadImgLoading, mutate: UploadImg } = useMutation(
		Upload_Img,
		{
			onSuccess: (res) => {
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

	console.log(data);
	//게시글 업로드
	const { isLoading: UploadPostLoading, mutate: UploadPost } = useMutation(
		Upload_Post,
		{
			onSuccess: (res) => {
				console.log(res);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '게시글 작성이 완료되었습니다.',
					showConfirmButton: false,
					timer: 1500,
				});
				history('/');
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);
	const onSubmit = () => {
		if (!data.subheading) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '소제목을 입력해주세요.',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			UploadPost({
				...data,
				mainImg: 'http://localhost:3000/uploads/NoImg.jpg',
			});
		}
	};

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
								<img src={UploadingImg} alt='No Image' />
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
