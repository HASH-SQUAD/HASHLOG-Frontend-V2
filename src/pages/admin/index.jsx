/*eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';

import * as _ from './style.js';
import Header from '../../components/header/';
import { SearchIcon } from '../../assets/img/SearchIcon';
import {
	Admin_Permission,
	AuthState,
	Get_UserById,
	Get_UserList,
} from '../../libs/api/Auth.js';
import Loading from '../loading';
import * as Swal from 'sweetalert2';
import {
	top_right_FalseAlert,
	top_right_TrueAlert,
} from '../../libs/utils/alert/top_right_Alert.js';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
	const history = useNavigate();
	const [page, setPage] = useState(1);
	const [users, setUsers] = useState([]);
	const usersRef = useRef(new Set());
	const [hasMore, setHasMore] = useState(true);
	const contentRef = useRef(null);
	const [userId, setUserId] = useState('');
	const [isSearch, setIsSearch] = useState(false);

	const {
		isLoading: userStateLoading,
		data: userStateData,
		isError: userStateError,
	} = useQuery('Setting_AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});

	useEffect(() => {
		if (!userStateLoading) {
			if (userStateError) {
				top_right_FalseAlert('로그인 후 이용해주세요');
				history('/auth/signin');
			} else if (!userStateData?.data?.isAdmin) {
				top_right_FalseAlert('어드민 권한이 없습니다.');
				history('/');
			}
		}
	}, [userStateLoading, userStateData, userStateError, history]);

	// 전체 유저
	const {
		isLoading: AllUserListLoading,
		data,
		isFetching,
	} = useQuery(['UserList', page], () => Get_UserList(page), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		retry: 0,
		onError: (e) => {
			console.log(e.message);
		},
	});

	// 무한스크롤
	useEffect(() => {
		if (!isSearch && data?.data) {
			if (data.data.length === 0) {
				setHasMore(false);
			} else {
				const newUsers = data.data.filter(
					(user) => !usersRef.current.has(user.userid)
				);
				newUsers.forEach((user) => usersRef.current.add(user.userid));
				setUsers((prevUsers) => [...prevUsers, ...newUsers]);
			}
		}
	}, [data, isSearch]);

	const handleScroll = useCallback(() => {
		const element = contentRef.current;
		if (
			element.scrollHeight - element.scrollTop <= element.clientHeight + 2 &&
			!isFetching &&
			hasMore
		) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isFetching, hasMore]);

	useEffect(() => {
		const element = contentRef.current;
		if (element) {
			element.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (element) {
				element.removeEventListener('scroll', handleScroll);
			}
		};
	}, [handleScroll]);

	// 유저검색
	const { isLoading: GetUserListByIdLoading, mutate: GetUserListById } =
		useMutation(Get_UserById, {
			onSuccess: (res) => {
				setUsers(res.data ? [res.data] : []);
				setHasMore(false);
			},
			onError: (err) => {
				console.log(err);
			},
		});

	const onSubmit = () => {
		setIsSearch(true);
		GetUserListById({ userId: userId });
	};

	const activeEnter = (e) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	//어드민 권한
	const { isLoading: AdminPermissionLoading, mutate: AdminPermission } =
		useMutation(Admin_Permission, {
			onSuccess: (res) => {
				top_right_TrueAlert(res.message);
				setTimeout(() => {
					history(0);
				}, 1000);
			},
			onError: (err) => {
				top_right_FalseAlert('에러발생');
			},
		});

	const openChangeNickaNmaeModal = (isAdmin, userid) => {
		Swal.fire({
			title: '권한변경',
			html: '<input type="password" id="code" class="swal2-input" placeholder="AccessCode"/>',
			showCancelButton: true,
			cancelButtonText: '취소하기',
			showLoaderOnConfirm: true,
			confirmButtonText: '변경하기',
			focusConfirm: false,
			preConfirm: () => {
				const code = document.getElementById('code').value;
				AdminPermission({
					userid: userid,
					accessCode: code,
					givenAccess: !isAdmin,
				});
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};

	if (
		(AllUserListLoading && page === 1) ||
		GetUserListByIdLoading ||
		AdminPermissionLoading
	) {
		return <Loading />;
	}

	return (
		<_.Admin_Container>
			<Header />

			<_.Admin_Layout>
				<_.Admin_SearchBar>
					<_.Admin_Input
						onKeyDown={activeEnter}
						placeholder='유저아이디를 입력하세요.'
						onChange={(e) => {
							setUserId(e.currentTarget.value);
						}}
					/>
					<_.Admin_Search_Icon onClick={onSubmit}>
						<SearchIcon />
					</_.Admin_Search_Icon>
				</_.Admin_SearchBar>

				<_.Admin_Line />

				<_.Admin_Content ref={contentRef}>
					{users.map((item) => (
						<_.Admin_Content_Layout key={item.userid}>
							<_.Admin_UserName>
								{item.userid} ({item.isAdmin ? 'Admin' : 'User'})
							</_.Admin_UserName>
							{item.isAdmin ? (
								<_.Admin_Button
									onClick={() =>
										openChangeNickaNmaeModal(item.isAdmin, item.userid)
									}
								>
									권한제거
								</_.Admin_Button>
							) : (
								<_.Admin_Button
									onClick={() =>
										openChangeNickaNmaeModal(item.isAdmin, item.userid)
									}
								>
									권한부여
								</_.Admin_Button>
							)}
						</_.Admin_Content_Layout>
					))}
					{isFetching && !isSearch && <Loading />}
				</_.Admin_Content>
			</_.Admin_Layout>
		</_.Admin_Container>
	);
};

export default Admin;
