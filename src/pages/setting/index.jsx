// /*eslint-disable */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import * as _ from './style.js';
import Header from '../../components/header';
import {
	AuthState,
	Update_ProfileImg,
	Delete_ProfileImg,
	Update_Password,
} from '../../libs/api/Auth.js';
import { Upload_Img } from '../../libs/api/Post.js';
import { UpdatePwSchema } from '../../libs/utils/expression/signUp.js';

const Setting = () => {
	//유저 상태 가져오기
	const { isLoading, data } = useQuery('Setting_AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});

	// 프로필 업로드
	const { isLoading: UpdateProfileImgLoading, mutate: UpdateProfileImg } =
		useMutation(Update_ProfileImg);
	//이미지 업로드
	const { isLoading: UploadImgLoading, mutate: UploadImg } = useMutation(
		Upload_Img,
		{
			onSuccess: (res) => {
				data.data.profileImg = res.url;
				Update_ProfileImg({ profileImg: res.url });
				window.location.reload();
			},
		}
	);

	const onUploadImg = (e) => {
		const file = e.currentTarget.files[0];
		const formData = new FormData();
		formData.append('img', file);
		UploadImg(formData);
	};

	//프로필 삭제
	const { isLoading: DeleteProfileImgLoading, mutate: DeleteProfile } =
		useMutation(Delete_ProfileImg);

	const onDeleteProfileImg = () => {
		DeleteProfile();
		window.location.reload();
	};

	//비빌번호 변경
	const { isLoading: UpdatePwLoading, mutate: UpdatePw } = useMutation(
		Update_Password,
		{
			onSuccess: (res) => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: res.message,
					showConfirmButton: false,
					timer: 1500,
				});
			},
			onError: (err) => {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: err.message,
					showConfirmButton: false,
					timer: 1500,
				});
			},
		}
	);

	const openChangePwModal = () => {
		Swal.fire({
			title: 'Submit your Github username',
			html:
				'<input type="password" id="pw_input1" class="swal2-input" placeholder="현재 비밀번호"/>' +
				'<input type="password" id="pw_input2" class="swal2-input" placeholder="변경 비밀번호"/>',
			showCancelButton: true,
			cancelButtonText: '취소하기',
			showLoaderOnConfirm: true,
			confirmButtonText: '변경하기',
			focusConfirm: false,
			preConfirm: () => {
				const pw = document.getElementById('pw_input1').value;
				const newPw = document.getElementById('pw_input2').value;
				UpdatePwSchema
					.validate({ password: newPw }, { abortEarly: false })
					.then(() => {
						UpdatePw({ password: pw, newPassword: newPw });
					})
					.catch((validationErrors) => {
						validationErrors.inner.forEach((error) => {
							switch (error.path) {
								case 'password':
									Swal.fire({
										position: 'top-end',
										icon: 'error',
										title: error.message,
										showConfirmButton: false,
										timer: 1500,
									});
									break;
								default:
									break;
							}
						});
					});
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};

	return (
		<_.Setting_Container>
			<Header />
			<_.Setting_Layout>
				<_.Setting_Left>
					<_.Setting_ProfileImg src={data?.data.profileImg} alt='' />

					<_.Setting_Upload_ProfileImg_Label htmlFor='ImgUploadInput'>
						이미지 업로드
					</_.Setting_Upload_ProfileImg_Label>

					<_.Setting_Upload_ProfileImg
						id='ImgUploadInput'
						type='file'
						accept='.png, .jpeg, .jpg'
						onChange={onUploadImg}
					/>

					<_.Setting_Delete_ProfileImg onClick={onDeleteProfileImg}>
						이미지 삭제
					</_.Setting_Delete_ProfileImg>
				</_.Setting_Left>

				<_.Setting_Line />

				<_.Setting_Right>
					<_.Setting_NickName_Layout>
						<_.Setting_NickNmae>{data?.data.nickname}</_.Setting_NickNmae>
						<_.Setting_NickName_Edit>수정</_.Setting_NickName_Edit>
					</_.Setting_NickName_Layout>

					<_.Setting_Change_Pw onClick={openChangePwModal}>
						비밀번호 변경하기
					</_.Setting_Change_Pw>

					<_.Setting_DeleteAccount>회원탈퇴</_.Setting_DeleteAccount>
				</_.Setting_Right>
			</_.Setting_Layout>
		</_.Setting_Container>
	);
};

export default Setting;
