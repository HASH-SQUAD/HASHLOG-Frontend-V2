import React, { useState } from 'react';
import * as _ from './style';
import Logo from '../../assets/img/Login_Logo.svg';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
	const history = useNavigate();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

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
