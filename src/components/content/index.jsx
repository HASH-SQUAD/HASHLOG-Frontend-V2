import React from 'react';
import * as _ from './style';

const Content = ({ imgURL, date, title, desc, subHeading }) => {
	return (
		<_.Main_Content_Container>
			<img src={imgURL} alt='' />
			<_.Content_Info>
				<_.Content_date>{date}</_.Content_date>
				<_.Content_title>{title}</_.Content_title>
				<_.Content_desc>
					<p>{subHeading}</p>
				</_.Content_desc>
			</_.Content_Info>
		</_.Main_Content_Container>
	);
};

export default Content;
