import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import * as _ from './style';
import { AuthState } from '../../libs/api/Auth';

const Header = ({ Write_State }) => {
	const AccessToken = localStorage.getItem('accessToken');
	const history = useNavigate();

	const { isLoading, isError, data, error } = useQuery('AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (e) => {
			console.log(e.message);
		},
	});

	return (
		<_.Header_Container>
			<p
				onClick={() => {
					history('/');
				}}
			>
				#
			</p>
			{!data ? (
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
