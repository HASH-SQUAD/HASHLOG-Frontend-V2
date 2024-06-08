/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import * as _ from './style';
import { AuthState } from '../../libs/api/Auth';

const Header = ({ Write_State }) => {
	const AccessToken = localStorage.getItem('accessToken');
	const history = useNavigate();

	const { isLoading, isError, data, error } = useQuery(
		'Header AuthState',
		AuthState,
		{
			refetchOnWindowFocus: false,
			retry: 0,
		}
	);

	//모달
	const [dropDownState, setDropDownState] = useState(false);

	//모달 밖 클릭시 꺼지도록
	const dropDownRef = useRef(null);
	useEffect(() => {
		const outSideClick = (e) => {
			const { target } = e;
			if (
				dropDownState &&
				dropDownRef.current &&
				!dropDownRef.current.contains(target)
			) {
				setDropDownState(false);
			}
		};
		document.addEventListener('mousedown', outSideClick);
	});
	const DropDwonSet = () => {
		if (dropDownState) {
			setDropDownState(false);
		} else {
			setDropDownState(true);
		}
	};

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
			) : (
				<_.Header_WriteState>
					<button
						onClick={() => {
							history('/write');
						}}
					>
						글쓰기
					</button>
					<_.Header_Profile onClick={DropDwonSet}>
						<img src={data?.data.profileImg} alt='ProfileImg' />
						<_.Header_ProfileDetail />
					</_.Header_Profile>
				</_.Header_WriteState>
			)}
			{dropDownState ? (
				<_.Header_DropDwonBlocker></_.Header_DropDwonBlocker>
			) : (
				''
			)}
			{dropDownState ? (
				<_.Header_DropDown ref={dropDownRef}>
					<_.Header_DropDown_Option
						onClick={() => {
							history('/setting');
						}}
					>
						설정
					</_.Header_DropDown_Option>
					<_.Header_DropDown_Option
						onClick={() => {
							localStorage.removeItem('accessToken');
							localStorage.removeItem('refreshToken');
							window.location.reload();
						}}
					>
						로그아웃
					</_.Header_DropDown_Option>
				</_.Header_DropDown>
			) : (
				''
			)}
		</_.Header_Container>
	);
};

export default Header;
