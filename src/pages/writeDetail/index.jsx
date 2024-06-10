/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import * as _ from './style';
import Header from '../../components/header';
import UploadingImg from '../../assets/img/UploadImg.svg';
import { Upload_Img, Upload_Post, Update_Post } from '../../libs/api/Post';
import Swal from 'sweetalert2';
import { AuthState } from '../../libs/api/Auth';
import Loading from '../loading';

const WriteDetail = () => {
	const history = useNavigate();
	const location = useLocation();
	const WriteData = location.state;
	const postId = window.location.pathname.split('/')[1];

	//로그인 상태관리
	const { isError } = useQuery('WriteDetail AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});
	useEffect(() => {
		if (!WriteData) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '글을 작성해주세요',
				showConfirmButton: false,
				timer: 1500,
			});
			history('/write');
		}
		if (isError) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '로그인 후 이용해주세요',
				showConfirmButton: false,
				timer: 1500,
			});
			history('/auth/signin');
		}
	});

	const [data, setData] = useState({
		title: '',
		desc: '',
		mainImg: '',
		subheading: '',
	});
	useEffect(() => {
		if (WriteData) {
			setData({
				title: WriteData?.title,
				desc: WriteData?.value,
				mainImg: WriteData?.mainImg,
				subheading: WriteData?.subheading,
			});
		}
	}, [WriteData]);

	// 썸네일 업로드
	const { isLoading: UploadImgLoading, mutate: UploadImg } = useMutation(
		Upload_Img,
		{
			onSuccess: (res) => {
				setData((prevData) => ({ ...prevData, mainImg: res.url }));
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

	// 게시글 업로드
	const { isLoading: UploadPostLoading, mutate: UploadPost } = useMutation(
		Upload_Post,
		{
			onSuccess: (res) => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '게시글 작성이 완료되었습니다.',
					showConfirmButton: false,
					timer: 1500,
				});
				history('/');
				window.location.reload();
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
				mainImg: data.mainImg || 'http://localhost:3000/common/NoImg.jpg',
			});
		}
	};

	//게시글 수정
	const { isLoading: UpdatePostLoading, mutate: UpdatePost } = useMutation(
		Update_Post,
		{
			onSuccess: (res) => {
				console.log(res);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '게시글 수정이 완료되었습니다.',
					showConfirmButton: false,
					timer: 1500,
				});
				history('/');
				window.location.reload();
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);
	const onEdit = () => {
		if (!data.subheading) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '소제목을 입력해주세요.',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			UpdatePost({
				...data,
				postId: WriteData.postId,
				mainImg: data.mainImg || 'http://localhost:3000/common/NoImg.jpg',
			});
		}
	};

	if (UploadImgLoading || UpdatePostLoading || UploadPostLoading) {
		return <Loading />;
	}

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
								<_.Detail_ImgInput_Label htmlFor='ImgUploadInput'>
									재업로드
								</_.Detail_ImgInput_Label>
							</>
						) : (
							<>
								<img src={UploadingImg} alt='No Image' />
								<_.Detail_ImgInput_Label htmlFor='ImgUploadInput'>
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
							spellCheck='false'
							onChange={(e) => {
								setData({
									...data,
									subheading: e.currentTarget.value,
								});
							}}
							value={data.subheading}
						/>
						{WriteData?.edit ? (
							<_.Detail_SubmitButton onClick={onEdit}>
								수정하기
							</_.Detail_SubmitButton>
						) : (
							<_.Detail_SubmitButton onClick={onSubmit}>
								출간하기
							</_.Detail_SubmitButton>
						)}
					</_.Detail_Subheading>
				</_.Detail_Main>
			</_.Detail_Layout>
		</_.Detail_Container>
	);
};

export default WriteDetail;
