import React from 'react';

import * as _ from './style.js';
import Header from '../../components/header/';
import { SearchIcon } from '../../assets/img/SearchIcon';

const data = [
	{
		userid: 'dltmdgus1412',
		password: '$2b$10$ooj6trmfq1K7hg2tMl.YueQzKndf4c4LVmgAz8Ar0k.x9BSrhkboC',
		email: 'dltmdgus1412@gmail.com',
		profileImg:
			'http://10.150.150.193:3000/uploads/1718629601105.3585441214045122.jpg',
		nickname: 'Jamkris',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRsdG1kZ3VzMTQxMiIsImlhdCI6MTcxODY5NDAzOSwiZXhwIjoxNzUwMjUxNjM5fQ.4ITT-OzLlKRpisptF3F4PONLN2ejqSiuYUDr0bFX37E',
		isAdmin: true,
		createdAt: '2024-06-08T12:38:03.000Z',
		updatedAt: '2024-06-18T07:00:39.000Z',
		deletedAt: null,
	},
	{
		userid: 'r',
		password: '$2b$10$duSuehkPBBoXZTiZ7b/zc.qSR2sLMZW20VHNlJbLb14eo7RqCLcXi',
		email: 'r',
		profileImg:
			'http://localhost:3000/uploads/1718032110962.9870768344150072.jpg',
		nickname: 'r',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InIiLCJpYXQiOjE3MTg2OTQ2MzYsImV4cCI6MTc1MDI1MjIzNn0.fERcUfCYJ1oiFUmOvZDOaXUJwaDveAB8sWVnc3KYaHE',
		isAdmin: false,
		createdAt: '2024-06-09T16:37:11.000Z',
		updatedAt: '2024-06-18T07:10:36.000Z',
		deletedAt: null,
	},
];

const Admin = () => {
	return (
		<_.Admin_Container>
			<Header />

			<_.Admin_Layout>
				<_.Admin_SearchBar>
					<_.Admin_Input type='text' placeholder='유저아이디를 입력하세요.' />
					<_.Admin_Search_Icon>
						<SearchIcon />
					</_.Admin_Search_Icon>
				</_.Admin_SearchBar>

				<_.Admin_Line />

				<_.Admin_Content>
					{data.map((item) => (
						<_.Admin_Content_Layout>
							<_.Admin_UserName>
								{item.userid} ({item.isAdmin ? 'Admin' : 'User'})
							</_.Admin_UserName>
							<_.Admin_Button>
								{item.isAdmin ? '권한제거' : '권한부여'}
							</_.Admin_Button>
						</_.Admin_Content_Layout>
					))}
				</_.Admin_Content>
			</_.Admin_Layout>
		</_.Admin_Container>
	);
};

export default Admin;
