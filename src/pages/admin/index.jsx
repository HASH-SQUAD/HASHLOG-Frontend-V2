/*eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';

import * as _ from './style.js';
import Header from '../../components/header/';
import { SearchIcon } from '../../assets/img/SearchIcon';
import { Get_UserById, Get_UserList } from '../../libs/api/Auth.js';
import Loading from '../loading';

const Admin = () => {
	const [page, setPage] = useState(1);
	const [users, setUsers] = useState([]);
	const usersRef = useRef(new Set());
	const [hasMore, setHasMore] = useState(true);
	const contentRef = useRef(null);
	const [userId, setUserId] = useState('');
	const [isSearch, setIsSearch] = useState(false);

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

	if ((AllUserListLoading && page === 1) || GetUserListByIdLoading) {
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
						<_.Admin_Content_Layout
							key={item.userid}
							onClick={() => openModal(item)}
						>
							<_.Admin_UserName>
								{item.userid} ({item.isAdmin ? 'Admin' : 'User'})
							</_.Admin_UserName>
							<_.Admin_Button>
								{item.isAdmin ? '권한제거' : '권한부여'}
							</_.Admin_Button>
						</_.Admin_Content_Layout>
					))}
					{isFetching && !isSearch && <Loading />}
				</_.Admin_Content>

				<_.Admin_Modal></_.Admin_Modal>
			</_.Admin_Layout>
		</_.Admin_Container>
	);
};

export default Admin;
