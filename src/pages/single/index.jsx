/*eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'isomorphic-dompurify';
import Swal from 'sweetalert2';

import * as _ from './style';
import Header from '../../components/header';
import { useMutation, useQuery } from 'react-query';
import { DeletePostById, GetPostById } from '../../libs/api/Post';
import { AuthState } from '../../libs/api/Auth';
import Loading from '../loading';

const Single = () => {
	const history = useNavigate();
	const postId = window.location.pathname.split('/')[2];

	const { isLoading: postLoading, data: post } = useQuery(
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

	const { data: auth } = useQuery('AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});

	//게시글 수정
	const EditPost = () => {
		history('/write', {
			state: {
				title: post?.data.title,
				value: post?.data.desc,
				subheading: post?.data.subheading,
				mainImg: post?.data.mainImg,
				createdAt: post?.data.createdAt,
				nickname: post?.data.User.nickname,
				postId: postId,
				edit: true,
			},
		});
	};

	//게시글 삭제
	const { isLoading: isLoadingStart, mutate: deletePost } = useMutation(
		(postId) => DeletePostById({ postId }),
		{
			onSuccess: (res) => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '정상적으로 삭제되었습니다.',
					showConfirmButton: false,
					timer: 1500,
				});
				history('/');
			},
		}
	);

	const DeletePost = () => {
		Swal.fire({
			title: '게시글 삭제',
			text: '게시글이 완전 삭제됩니다. 진행하시겠습니끼?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			confirmButtonText: '예',
			cancelButtonColor: '#d33',
			cancelButtonText: '아니요',
		}).then((result) => {
			if (result.isConfirmed) {
				deletePost(postId);
				history('/');
				window.location.reload();
			}
		});
	};
	if (postLoading) {
		return <Loading />;
	}

	return (
		<_.Single_Container>
			<Header />
			<_.Single_Layout>
				<_.Single_Title>{post?.data.title}</_.Single_Title>
				<_.Single_Info_Layout>
					<_.Single_Info>
						<_.Single_ProfileImg
							src={post?.data.User.profileImg}
							alt='ProfileImg'
						/>
						<_.Single_Nickname>{post?.data?.User?.nickname}</_.Single_Nickname>
						<_.Single_Date>{post?.data.createdAt.substr(0, 10)}</_.Single_Date>
					</_.Single_Info>
					{post?.data?.User?.nickname === auth?.data?.nickname ||
					auth?.data?.isAdmin ? (
						<_.Single_EditTools>
							<button onClick={EditPost}>수정</button>
							<button onClick={DeletePost}>삭제</button>
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
