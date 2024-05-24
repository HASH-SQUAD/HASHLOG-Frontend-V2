import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as _ from './style';

const Header = ({ Write_State }) => {
	const AccessToken = localStorage.getItem('accessToken');
	const history = useNavigate();
	
	return (
		<_.Header_Container>
			<p>#</p>
			{!AccessToken ? (
				<button
					onClick={() => {
						history('/auth/signin');
					}}
				>
					로그인
				</button>
			) : !Write_State ? (
				<_.Header_WriteState>
					<button
						onClick={() => {
							history('/write');
						}}
					>
						글쓰기
					</button>
					<button
						onClick={() => {
							localStorage.removeItem('accessToken');
							window.location.reload();
						}}
					>
						로그아웃
					</button>
				</_.Header_WriteState>
			) : (
				<button>강민지 님</button>
			)}
		</_.Header_Container>
	);
};

export default Header;
