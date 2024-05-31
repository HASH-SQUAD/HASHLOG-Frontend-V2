/*eslint-disable */
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

import * as _ from './style';
import Header from '../../components/header';
import { useQuery } from 'react-query';
import { GetPostById } from '../../libs/api/Post';

const Single = () => {
	const postId = window.location.pathname.split('/')[1];
	const { isLoading, isError, data, error } = useQuery(
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
	return (
		<_.Single_Container>
			<Header />
			<_.Single_Layout>
				<_.Single_Title>{data?.data.title}</_.Single_Title>
				<_.Single_Info_Layout>
					<_.Single_Info>
						<_.Single_Nickname>{data?.data.User.nickname}</_.Single_Nickname>
						<_.Single_Date>{data?.data.createdAt.substr(0, 10)}</_.Single_Date>
					</_.Single_Info>
					<_.Single_EditTools>
						<button>수정</button>
						<button>삭제</button>
					</_.Single_EditTools>
				</_.Single_Info_Layout>

				<_.Single_Line></_.Single_Line>

				<_.Single_Body>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(data?.data ? data?.data.desc : ''),
						}}
					/>
				</_.Single_Body>
			</_.Single_Layout>
		</_.Single_Container>
	);
};

export default Single;
