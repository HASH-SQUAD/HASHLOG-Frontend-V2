/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import yup from 'yup';

import * as _ from './style';
import Logo from '../../assets/img/Login_Logo.svg';

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
	const [emailError, setEmailError] = useState('');
	const [nicknameError, setNicknameError] = useState('');

	const activeEnter = () => {};
	const onSubmit = () => {};

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
						userid: e.target.value,
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
						password: e.target.value,
					});
					setPasswordError('');
				}}
			/>

			{passwordError && <_.SiginIn_Error>{passwordError}</_.SiginIn_Error>}

			<_.SiginIn_EMAIL_Input
				placeholder='이메일을 입력해주세요'
				type='email'
				onChange={(e) => {
					setFormData({
						...formData,
						email: e.target.value,
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
						nickname: e.target.value,
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
