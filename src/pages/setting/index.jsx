/*eslint-disable */
import React, { useEffect, useState } from 'react';
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
	Update_NickName,
	Delete_Account,
} from '../../libs/api/Auth.js';
import { Upload_Img } from '../../libs/api/Post.js';
import { UpdatePwSchema } from '../../libs/utils/expression/signUp.js';
import {
	top_right_FalseAlert,
	top_right_TrueAlert,
} from '../../libs/utils/alert/top_right_Alert.js';
import Loading from '../loading/index.jsx';

const Setting = () => {
	const history = useNavigate();

	//유저 상태 가져오기
	const { isLoading, data, isError } = useQuery(
		'Setting_AuthState',
		AuthState,
		{
			refetchOnWindowFocus: false,
			retry: 0,
		}
	);
	useEffect(() => {
		if (isError) {
			top_right_FalseAlert('로그인 후 이용해주세요');
			history('/auth/signin');
		}
	});

	// 프로필이미지 업로드
	const { isLoading: UpdateProfileImgLoading, mutate: UpdateProfileImg } =
		useMutation(Update_ProfileImg);
	//이미지 업로드
	const { isLoading: UploadImgLoading, mutate: UploadImg } = useMutation(
		Upload_Img,
		{
			onSuccess: (res) => {
				data.data.profileImg = res.url;
				Update_ProfileImg({ profileImg: res.url });
				top_right_TrueAlert('성공적으로 수정되었습니다.');
				setTimeout(() => {
					history('/');
				}, 1000);
			},
		}
	);

	const onUploadImg = (e) => {
		const file = e.currentTarget.files[0];
		const formData = new FormData();
		formData.append('img', file);
		UploadImg(formData);
	};

	//프로필이미지 삭제
	const { isLoading: DeleteProfileImgLoading, mutate: DeleteProfile } =
		useMutation(Delete_ProfileImg);
	const onDeleteProfileImg = () => {
		DeleteProfile();
		top_right_TrueAlert('성공적으로 삭제되었습니다.');
		setTimeout(() => {
			history('/');
		}, 1000);
	};

	//닉네임 변경
	const { isLoading: UpdateNickNameLoading, mutate: UpdateNickName } =
		useMutation(Update_NickName, {
			onSuccess: (res) => {
				top_right_TrueAlert(res.message);
				setTimeout(() => {
					history('/');
				}, 1000);
			},
			onError: (err) => {
				top_right_FalseAlert(err.response.data.message);
			},
		});

	const openChangeNickaNmaeModal = () => {
		Swal.fire({
			title: '닉네임 변경',
			html:
				'<input type="password" id="pw_input" class="swal2-input" placeholder="현재 비밀번호"/>' +
				'<input type="text" id="nickName_input" class="swal2-input" placeholder="변경 닉네임"/>',
			showCancelButton: true,
			cancelButtonText: '취소하기',
			showLoaderOnConfirm: true,
			confirmButtonText: '변경하기',
			focusConfirm: false,
			preConfirm: () => {
				const pw = document.getElementById('pw_input').value;
				const newNickName = document.getElementById('nickName_input').value;
				UpdateNickName({ password: pw, nickname: newNickName });
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};

	//비빌번호 변경
	const { isLoading: UpdatePwLoading, mutate: UpdatePw } = useMutation(
		Update_Password,
		{
			onSuccess: (res) => {
				top_right_TrueAlert(res.message);
				setTimeout(() => {
					history('/');
				}, 1000);
			},
			onError: (err) => {
				top_right_FalseAlert(err.message);
			},
		}
	);

	const openChangePwModal = () => {
		Swal.fire({
			title: '비밀번호 변경',
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
				UpdatePwSchema.validate({ password: newPw }, { abortEarly: false })
					.then(() => {
						UpdatePw({ password: pw, newPassword: newPw });
					})
					.catch((validationErrors) => {
						validationErrors.inner.forEach((error) => {
							switch (error.path) {
								case 'password':
									top_right_FalseAlert(error.message);
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

	//회원탈퇴
	const { isLoading: DeleteAccountLoading, mutate: DeleteAccount } =
		useMutation(Delete_Account, {
			onSuccess: (res) => {
				top_right_TrueAlert(res.message);
				setTimeout(() => {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					history('/');
				}, 1000);
			},
			onError: (err) => {
				top_right_FalseAlert(err.response.data.message);
			},
		});

	const openDeleteAccountModal = () => {
		Swal.fire({
			title: '계정 삭제',
			html: '<input type="password" id="pw_input1" class="swal2-input" placeholder="비밀번호를 입력해주세요."/>',
			showCancelButton: true,
			cancelButtonText: '취소하기',
			showLoaderOnConfirm: true,
			confirmButtonText: '삭제하기',
			focusConfirm: false,
			preConfirm: () => {
				const PW = document.getElementById('pw_input1').value;
				DeleteAccount({ password: PW });
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};
	if (isLoading) {
		return <Loading />;
	}
	if (UpdateProfileImgLoading) {
		return <Loading />;
	}
	if (DeleteProfileImgLoading) {
		return <Loading />;
	}
	if (UpdateNickNameLoading) {
		return <Loading />;
	}
	if (UpdatePwLoading) {
		return <Loading />;
	}
	if (DeleteAccountLoading) {
		return <Loading />;
	}

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
						<_.Setting_NickName_Edit onClick={openChangeNickaNmaeModal}>
							수정
						</_.Setting_NickName_Edit>
					</_.Setting_NickName_Layout>

					<_.Setting_Change_Pw onClick={openChangePwModal}>
						비밀번호 변경하기
					</_.Setting_Change_Pw>

					<_.Setting_DeleteAccount onClick={openDeleteAccountModal}>
						회원탈퇴
					</_.Setting_DeleteAccount>
				</_.Setting_Right>
			</_.Setting_Layout>
		</_.Setting_Container>
	);
};

export default Setting;
