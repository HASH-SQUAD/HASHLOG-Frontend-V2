import { Navigate, useRoutes } from 'react-router-dom';

//pages
import Main from '../pages/main';
import SiginIn from '../pages/signIn';
import SiginUp from '../pages/signUp';
import Page404 from '../pages/page404';
import Single from '../pages/single';
import Write from '../pages/write';
import WriteDeatil from '../pages/writeDetail';
import Setting from '../pages/setting';
import Admin from '../pages/admin';

export default function Router() {
	return useRoutes([
		{
			path: '/auth',
			children: [
				{ path: 'signin', element: <SiginIn /> },
				{ path: 'signup', element: <SiginUp /> },
			],
		},
		{
			path: '/',
			children: [
				{ path: '/', element: <Main /> },
				{ path: '/post/:id', element: <Single /> },
				{ path: '/write', element: <Write /> },
				{ path: '/writedetail', element: <WriteDeatil /> },
				{
					path: `/${process.env.REACT_APP_ADMIN_ORIGIN}`,
					element: <Admin />,
				},
				{ path: '/setting', element: <Setting /> },
				{ path: '404', element: <Page404 /> },
				{ path: '*', element: <Navigate to="/404" replace /> },
			],
		},
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}
