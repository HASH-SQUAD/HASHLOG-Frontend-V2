/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import * as _ from './style';
import Logo from '../../assets/img/Login_Logo.svg';
import { AuthSignUp, AuthState } from '../../libs/api/Auth';
import { validationSchema } from '../../libs/utils/expression/signUp';
import Loading from '../loading';
import {
	top_right_FalseAlert,
	top_right_TrueAlert,
} from '../../libs/utils/alert/top_right_Alert';

const SignUp = () => {
	const history = useNavigate();
	//유저 상태 가져오기
	const { data } = useQuery('Setting_AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});
	useEffect(() => {
		if (data) {
			history('/');
		}
	});

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

	const { isLoading: SignUpAuthLoading, mutate: SignUpAuth } = useMutation(
		AuthSignUp,
		{
			onSuccess: (res) => {
				top_right_TrueAlert('정상적으로 회원가입 되었습니다.');
				history('/auth/signin');
			},
			onError: (err) => {
				top_right_FalseAlert(err.response.data.message);
				console.log(err.response.data.message);
			},
		}
	);
	if (SignUpAuthLoading) {
		return <Loading />;
	}

	const onSubmit = () => {
		validationSchema
			.validate(formData, { abortEarly: false })
			.then(() => {
				SignUpAuth(formData);
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
