/*eslint-disable */
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Swal from 'sweetalert2';

import * as _ from './style';
import Header from '../../components/header';
import { useQuery } from 'react-query';
import { GetPostById } from '../../libs/api/Post';
import { AuthState } from '../../libs/api/Auth';

const Single = () => {
	const postId = window.location.pathname.split('/')[1];
	const { isLoading, data: post } = useQuery(
		['GetPostById', postId],
		GetPostById,
		{
			refetchOnWindowFocus: false,
			retry: 0,

			onError: (e) => {
				console.log(e.message);
			},
		}
	);

	const { data: auth, error } = useQuery('AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});

	const Preparing = () => {
		Swal.fire({
			position: 'top-end',
			icon: 'error',
			title: '준비중인 기능입니다.',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<_.Single_Container>
			<Header />
			<_.Single_Layout>
				<_.Single_Title>{post?.data.title}</_.Single_Title>
				<_.Single_Info_Layout>
					<_.Single_Info>
						<_.Single_Nickname>{post?.data?.User?.nickname}</_.Single_Nickname>
						<_.Single_Date>{post?.data.createdAt.substr(0, 10)}</_.Single_Date>
					</_.Single_Info>
					{post?.data?.User?.nickname === auth?.data?.nickname ? (
						<_.Single_EditTools>
							<button onClick={Preparing}>수정</button>
							<button onClick={Preparing}>삭제</button>
						</_.Single_EditTools>
					) : (
						''
					)}
				</_.Single_Info_Layout>

				<_.Single_Line></_.Single_Line>

				<_.Single_Body>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(post?.data ? post?.data.desc : ''),
						}}
					/>
				</_.Single_Body>
			</_.Single_Layout>
		</_.Single_Container>
	);
};

export default Single;
