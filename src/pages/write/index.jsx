/* eslint-disable */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import * as DOMPurify from 'isomorphic-dompurify';
import { useNavigate } from 'react-router-dom';

//style
import * as _ from './style.js';
import './style.css';

//Components
import Header from '../../components/header';
import Left_Arrow from '../../assets/img/Left_Arrow.svg';

const Write = () => {
	const history = useNavigate();

	//React-Quil
	const quillRef = useRef();
	const [title, setTitle] = useState('');
	const [value, setValue] = useState('');
	const imageHandler = () => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.addEventListener('change', async () => {
			const file = input.files[0];
			const formData = new FormData();
			formData.append('img', file);
			try {
				// await customAxios.post('/img/upload', formData).then((res) => {
				// 	const IMG_URL = res.data.url;
				// 	if (mainImgURL === '') {
				// 		setMainImgURL(res.data.url);
				// 	}
				// 	const editor = quillRef.current.getEditor();
				// 	const range = editor.getSelection();
				// 	editor.insertEmbed(range.index, 'image', IMG_URL);
				// });
			} catch (error) {
				console.log(error);
			}
		});
	};
	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					[{ header: '1' }, { header: '2' }, { header: '3' }, { header: '4' }],
					['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					['link', 'image'],
					['clean'],
				],
				handlers: {
					image: imageHandler,
				},
			},
		};
	}, []);

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'image',
		'link',
		'ordered',
		'bullet',
	];

	const onChangeContent = (contents) => {
		setValue(contents);
	};

	const onSubmit = () => {
		history('/writedetail', {
			state: {
				title: title,
				value: value,
			},
		});
	};

	return (
		<_.Write_Container>
			<Header />
			<_.Write_Layout>
				<_.Write_Left>
					<_.Write_Left_Top>
						<_.Write_Title_Input
							placeholder='제목을 입력해주세요'
							onChange={(e) => {
								setTitle(e.currentTarget.value);
							}}
						/>
						<_.Write_Line />
						<ReactQuill
							ref={quillRef}
							style={{ width: '48vw', height: '74vh' }}
							modules={modules}
							formats={formats}
							value={value}
							onChange={onChangeContent}
							placeholder='내용을 입력해주세요'
						/>
					</_.Write_Left_Top>
					<_.Write_Left_Bottom>
						<_.Write_Left_Arrow onClick={() => {}}>
							<img src={Left_Arrow} alt='Left_Arrow' />
							나가기
						</_.Write_Left_Arrow>
						<button onClick={onSubmit}>올리기</button>
					</_.Write_Left_Bottom>
				</_.Write_Left>

				<_.Write_Right>
					<_.Write_Preview_Title>{title}</_.Write_Preview_Title>
					<_.Write_Line />
					<_.Write_Preview_Content
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(value ? value : ''),
						}}
					/>
				</_.Write_Right>
			</_.Write_Layout>
		</_.Write_Container>
	);
};

export default Write;
