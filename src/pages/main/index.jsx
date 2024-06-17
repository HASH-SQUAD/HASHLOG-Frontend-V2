/*eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import * as _ from './style';
import Header from '../../components/header';
import Content from '../../components/content';
import { MainPost } from '../../libs/api/Post';
import Poster from '../../assets/img/Poster.jpg';
import Loading from '../loading';

const Main = () => {
	const history = useNavigate();
	const [page, setPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const postsRef = useRef(new Set());
	const [hasMore, setHasMore] = useState(true);

	const {
		isLoading: GetPostLoading,
		data,
		isFetching,
	} = useQuery(['MainPoster', page], () => MainPost({ page }), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		retry: 0,
		onError: (e) => {
			console.log(e.message);
		},
	});

	useEffect(() => {
		if (data) {
			if (data.data.length === 0) {
				setHasMore(false);
			} else {
				const newPosts = data.data.filter(
					(post) => !postsRef.current.has(post.id)
				);
				newPosts.forEach((post) => postsRef.current.add(post.id));
				setPosts((prevPosts) => [...prevPosts, ...newPosts]);
			}
		}
	}, [data]);

	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
			!isFetching &&
			hasMore
		) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isFetching, hasMore]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	if (GetPostLoading && page === 1) {
		return <Loading />;
	}

	return (
		<_.Main_Container>
			<Header Write_State={false} />

			<img src={Poster} alt='Main Poster' />

			<_.Main_Content>
				{posts.map((item) => (
					<_.Main_Content_Body
						onClick={() => {
							history(`/post/${item.id}`);
						}}
						key={item.id}
					>
						<Content
							imgURL={item.mainImg}
							subHeading={item.subheading}
							date={item.date}
							title={item.title}
							desc={item.desc}
						/>
					</_.Main_Content_Body>
				))}
				{isFetching && <Loading />}
			</_.Main_Content>
		</_.Main_Container>
	);
};

export default Main;
