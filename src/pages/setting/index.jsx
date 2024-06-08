// /*eslint-disable */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import * as _ from './style.js';
import Header from '../../components/header';
import { AuthState, Update_ProfileImg } from '../../libs/api/Auth.js';
import { Upload_Img } from '../../libs/api/Post.js';

const Setting = () => {
	//유저 상태 가져오기
	const { isLoading, data } = useQuery('Setting_AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
		onError: (e) => {
			console.log(e.message);
		},
	});

	// 프로필 업로드
	const { isLoading: UpdateProfileImgLoading, mutate: UpdateProfileImg } =
		useMutation(Update_ProfileImg);
	const { isLoading: UploadImgLoading, mutate: UploadImg } = useMutation(
		Upload_Img,
		{
			onSuccess: (res) => {
				data.data.profileImg = res.url;
				Update_ProfileImg({ profileImg: res.url });
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
		window.location.reload();
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

					<_.Setting_Delete_ProfileImg>이미지 삭제</_.Setting_Delete_ProfileImg>
				</_.Setting_Left>

				<_.Setting_Line />

				<_.Setting_Right>
					<_.Setting_NickName_Layout>
						<_.Setting_NickNmae>{data?.data.nickname}</_.Setting_NickNmae>
						<_.Setting_NickName_Edit>수정</_.Setting_NickName_Edit>
					</_.Setting_NickName_Layout>

					<_.Setting_Change_Pw>비밀번호 변경하기</_.Setting_Change_Pw>
					<_.Setting_DeleteAccount>회원탈퇴</_.Setting_DeleteAccount>
				</_.Setting_Right>
			</_.Setting_Layout>
		</_.Setting_Container>
	);
};

export default Setting;
