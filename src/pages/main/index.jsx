/*eslint-disable */
import React from 'react';

import * as _ from './style';
import Header from '../../components/header';
import Content from '../../components/content';
import Poster from '../../assets/img/Poster.jpg';
import noImg from '../../assets/img/NoImg.jpg';
import data from '../../data/Contents';

const Main = () => {
	return (
		<_.Main_Container>
			<Header Write_State={false} />

			<img src={Poster} alt='Main Poster' />

			<_.Main_Content>
				{data.map((item) => (
					<_.Main_Content_Body
						onClick={() => {
							history(`/${item.id}`);
						}}
						key={item.id}
					>
						<Content
							imgURL={item.imgURL}
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
