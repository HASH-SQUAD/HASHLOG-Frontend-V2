/*eslint-disable */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import * as _ from './style';
import Header from '../../components/header';
import Content from '../../components/content';
import { MainPost } from '../../libs/api/Post';
import PostDatas from '../../data/Contents';
import Poster from '../../assets/img/Poster.jpg';
import Loading from '../loading';

const Main = () => {
	const history = useNavigate();

	const { isLoading, isError, data, error } = useQuery('MainPoster', MainPost, {
		refetchOnWindowFocus: false,
		retry: 0,
		onError: (e) => {
			console.log(e.message);
		},
	});
	if (isLoading) {
		return <Loading />;
	}

	return (
		<_.Main_Container>
			<Header Write_State={false} />

			<img src={Poster} alt='Main Poster' />

			<_.Main_Content>
				{data?.data?.map((item) => (
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
			</_.Main_Content>
		</_.Main_Container>
	);
};

export default Main;
