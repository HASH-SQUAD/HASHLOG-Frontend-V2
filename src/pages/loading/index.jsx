import React from 'react';

import * as _ from './style';
import LoadingGIF from '../../assets/img/LoadingGIF.gif';

const Loading = () => {
	return (
		<_.Loading_Container>
			<img src={LoadingGIF} alt='' />
		</_.Loading_Container>
	);
};

export default Loading;
