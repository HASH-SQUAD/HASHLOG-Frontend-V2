/* eslint-disable */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import * as DOMPurify from 'isomorphic-dompurify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';

//style
import * as _ from './style.js';
import './style.css';

//Components
import Header from '../../components/header';
import Left_Arrow from '../../assets/img/Left_Arrow.svg';
import { Upload_Img } from '../../libs/api/Post.js';
import { AuthState } from '../../libs/api/Auth.js';

const Write = () => {
	const history = useNavigate();
	const location = useLocation();
	const WriteData = location.state;

	//로그인 상태관리
	const { isError } = useQuery('Write AuthState', AuthState, {
		refetchOnWindowFocus: false,
		retry: 0,
	});
	useEffect(() => {
		if (isError) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '로그인 후 이용해주세요',
				showConfirmButton: false,
				timer: 1500,
			});
			history('/auth/signin');
		}
	});

	//이미지 업로드 처리
	const { mutate: UploadImg } = useMutation(Upload_Img, {
		onSuccess: (res) => {
			console.log(res.url);
			const IMG_URL = res.url;
			const editor = quillRef.current.getEditor();
			const range = editor.getSelection();
			editor.insertEmbed(range.index, 'image', IMG_URL);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	//React-Quil
	const quillRef = useRef();
	const [title, setTitle] = useState(WriteData?.title);
	const [value, setValue] = useState(WriteData?.value);
	const imageHandler = () => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.addEventListener('change', async () => {
			const file = input.files[0];
			const formData = new FormData();
			formData.append('img', file);
			UploadImg(formData);
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
		if (!title) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '제목을 입력해주세요',
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}
		if (!value) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: '내용을 입력해주세요',
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}
		history('/writedetail', {
			state: {
				title: title,
				value: value,
				subheading: WriteData?.subheading,
				mainImg: WriteData?.mainImg,
				createdAt: WriteData?.createdAt,
				nickname: WriteData?.nickname,
				postId: WriteData?.postId,
				edit: WriteData?.edit,
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
							value={title ? title : ''}
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
						<button onClick={onSubmit}>
							{WriteData?.edit ? '수정하기' : '올리기'}
						</button>
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
