/*eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';

import * as _ from './style';
import Logo from '../../assets/img/Login_Logo.svg';
import { AuthSignIn } from '../../libs/api/Auth';

const SignIn = () => {
	const history = useNavigate();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const { isLoading: isLoadingStart, mutate: SignInAuth } = useMutation(
		AuthSignIn,
		{
			onSuccess: (res) => {
				console.log(res);
				localStorage.setItem('accesToken', res.accessToken);
				localStorage.setItem('refreshToken', res.refreshToken);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '정상적으로 로그인 되었습니다.',
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
		SignInAuth({
			userid: userId,
			password: password,
		});
	};

	const activeEnter = (e) => {
		if (e.key === 'Enter') {
			handleSubmit();
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
					setUserId(e.currentTarget.value);
				}}
			/>
			<_.SiginIn_PW_Input
				onKeyDown={activeEnter}
				placeholder='비밀번호를 입력해주세요'
				type='password'
				onChange={(e) => {
					setPassword(e.currentTarget.value);
				}}
			/>

			<_.SigIn_Button onClick={onSubmit}>로그인</_.SigIn_Button>

			<_.SignIn_NO_Exist>
				회원이 아니신가요?
				<p onClick={() => history('/auth/signup')}>회원가입</p>
			</_.SignIn_NO_Exist>
		</_.SignIn_Container>
	);
};

export default SignIn;
