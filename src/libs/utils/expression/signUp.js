/* eslint-disable */
import * as Yup from 'yup';

export const validationSchema = Yup.object({
	userid: Yup.string()
		.min(3, '아이디는 최소 3자 이상 입력해야 합니다.')
		.max(25, '아이디는 25자 이하여야 합니다.')
		.matches(
			/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
			'아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!'
		)
		.required('아이디를 입력하세요'),

	password: Yup.string()
		.min(3, '비밀번호는 최소 8자 이상 입력해야 합니다.')
		.max(25, '비밀번호는 25자리 이하여야 합니다.')
		// .matches(
		// 	/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
		// 	'알파벳, 숫자, 특수문자를 모두 포함해야 합니다!'
		// )
		.required('비밀번호를 입력하세요'),

	// passwordCheck: Yup.string().oneOf(
	// 	[Yup.ref('password'), null],
	// 	'password is not matched'
	// ),

	passwordCheck: Yup.string()
		.oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다!')
		.required('비밀번호를 입력하세요.'),

	email: Yup.string()
		.matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '올바른 이메일 형식이 아닙니다.')
		.required('이메일을 입력하세요'),

	nickname: Yup.string()
		.min(3, '닉네임은 최소 3자 이상 입력해야 합니다.')
		.max(25, '닉네임은 25자 이하여야 합니다.')
		.matches(
			/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
			'닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!'
		)
		.required('닉네임을 입력하세요'),
});
