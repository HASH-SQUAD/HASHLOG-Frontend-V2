/*eslint-disable */
import React from 'react';

import * as _ from './style.js';
import Header from '../../components/header';

const Setting = () => {
	return (
		<_.Setting_Container>
			<Header />
			<_.Setting_Layout>
				<_.Setting_Left>
					<_.Setting_ProfileImg
						src='https://velog.velcdn.com/images/jamkris/profile/06110d72-7c1e-4a61-95df-d6a4b4a4c84e/image.jpg'
						alt=''
					/>

					<_.Setting_Upload_ProfileImg>
						이미지 업로드
					</_.Setting_Upload_ProfileImg>

					<_.Setting_Delete_ProfileImg>이미지 삭제</_.Setting_Delete_ProfileImg>
				</_.Setting_Left>

				<_.Setting_Line />

				<_.Setting_Right>
					<_.Setting_NickName_Layout>
						<_.Setting_NickNmae>Jamkris</_.Setting_NickNmae>
            <_.Setting_NickName_Edit>수정</_.Setting_NickName_Edit>
					</_.Setting_NickName_Layout>

          <_.Setting_Change_Pw>비밀번호 변경하기</_.Setting_Change_Pw>
          <_.Setting_DeleteAccount>회원탈퇴</_.Setting_DeleteAccount>
				</_.Setting_Right>
			</_.Setting_Layout>
		</_.Setting_Container>
	);
};

export default Setting;
