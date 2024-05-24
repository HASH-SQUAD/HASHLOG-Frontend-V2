/*eslint-disable */
import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

import * as _ from './style';
import Header from '../../components/header';

const Single = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	const postId = window.location.pathname.split('/')[1];

	return (
		<_.Single_Container>
			<Header />
			<_.Single_Layout>
				<_.Single_Title>{title}</_.Single_Title>
				<_.Single_Date>{date}</_.Single_Date>

				<_.Single_Body>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(description ? description : ''),
						}}
					/>
				</_.Single_Body>
			</_.Single_Layout>
		</_.Single_Container>
	);
};

export default Single;
