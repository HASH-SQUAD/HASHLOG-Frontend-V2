/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as _ from './style';
import Logo from '../../assets/img/Login_Logo.svg';

const Page404 = () => {
	const history = useNavigate();
	const onSubmit = () => {
    history('/')
  };

	return (
		<_.Page404_Container>
			<img src={Logo} alt='Hash Logo' />
			<h1>Page404</h1>
			<_.Page404_Button onClick={onSubmit}>홈으로</_.Page404_Button>
		</_.Page404_Container>
	);
};

export default Page404;
