/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import * as _ from './style';
import Swal from 'sweetalert2';
import Logo from '../../assets/img/Login_Logo.svg';
import { AuthSignUp } from '../../libs/api/Auth';
import { validationSchema } from '../../libs/utils/expression/signUp';

const SignUp = () => {
	const history = useNavigate();
	const initialFormData = {
		userid: '',
		password: '',
		email: '',
		nickname: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const [useridError, setUseridError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordCheckError, setPasswordCheckError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [nicknameError, setNicknameError] = useState('');

	const { isLoading: isLoadingStart, mutate: SignInAuth } = useMutation(
		AuthSignUp,
		{
			onSuccess: (res) => {
				console.log(res);
				localStorage.setItem('accesToken', res.accessToken);
				localStorage.setItem('refreshToken', res.refreshToken);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '정상적으로 회원가입 되었습니다.',
					showConfirmButton: false,
					timer: 1500,
				});
				history('/');
			},
			onError: (err) => {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: err.response.data.message,
					showConfirmButton: false,
					timer: 1500,
				});
				console.log(err.response.data.message);
				console.log(err);
			},
		}
	);

	const onSubmit = () => {
		validationSchema
			.validate(formData, { abortEarly: false })
			.then(() => {
				console.log('success');
				// SignInAuth(formData);
			})
			.catch((validationErrors) => {
				validationErrors.inner.forEach((error) => {
					switch (error.path) {
						case 'userid':
							setUseridError(error.message);
							break;
						case 'password':
							setPasswordError(error.message);
							break;
						case 'passwordCheck':
							setPasswordCheckError(error.message);
							break;
						case 'email':
							setEmailError(error.message);
							break;
						case 'nickname':
							setNicknameError(error.message);
							break;
						default:
							break;
					}
				});
			});
	};

	const activeEnter = (e) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	return (
		<_.SignIn_Container>
			<img src={Logo} width='120px' height='120px' alt='Logo' />
			<_.SiginIn_ID_Input
				onKeyDown={activeEnter}
				placeholder='아이디를 입력해주세요'
				type='text'
				onChange={(e) => {
					setFormData({
						...formData,
						userid: e.currentTarget.value,
					});
					setUseridError('');
				}}
			/>
			{useridError && <_.SiginIn_Error>{useridError}</_.SiginIn_Error>}

			<_.SiginIn_PW_Input
				onKeyDown={activeEnter}
				placeholder='비밀번호를 입력해주세요'
				type='password'
				onChange={(e) => {
					setFormData({
						...formData,
						password: e.currentTarget.value,
					});
					setPasswordError('');
				}}
			/>
			{passwordError && <_.SiginIn_Error>{passwordError}</_.SiginIn_Error>}

			<_.SiginIn_PW_CheckInput
				onKeyDown={activeEnter}
				placeholder='비밀번호를 한번더 입력해주세요'
				type='password'
				onChange={(e) => {
					setFormData({
						...formData,
						passwordCheck: e.currentTarget.value,
					});
					setPasswordCheckError('');
				}}
			/>
			{passwordCheckError && (
				<_.SiginIn_Error>{passwordCheckError}</_.SiginIn_Error>
			)}

			<_.SiginIn_EMAIL_Input
				placeholder='이메일을 입력해주세요'
				type='email'
				onChange={(e) => {
					setFormData({
						...formData,
						email: e.currentTarget.value,
					});
					setEmailError('');
				}}
			/>
			{emailError && <_.SiginIn_Error>{emailError}</_.SiginIn_Error>}

			<_.SiginIn_NICKNAME_Input
				placeholder='닉네임을 입력해주세요'
				type='text'
				onChange={(e) => {
					setFormData({
						...formData,
						nickname: e.currentTarget.value,
					});
					setNicknameError('');
				}}
			/>
			{nicknameError && <_.SiginIn_Error>{nicknameError}</_.SiginIn_Error>}

			<_.SigIn_Button onClick={onSubmit}>회원가입</_.SigIn_Button>

			<_.SignIn_NO_Exist>
				이미 회원이신가요?
				<p onClick={() => history('/auth/signin')}>로그인</p>
			</_.SignIn_NO_Exist>
		</_.SignIn_Container>
	);
};

export default SignUp;
