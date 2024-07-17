import { createBrowserRouter } from 'react-router-dom';
import Show from './Admincomponents/Show';
import Ma from './Admincomponents/ManagHajjapp';
import Manageumrahapp from './Admincomponents/ManageUmrahapp';
import Requests from './Admincomponents/Requests';
import Tickets from './Usercomponents/HajjTickets';
import UmrahTickets from './Usercomponents/UmrahTickets';
import Profile from './Usercomponents/Profile';
import HistoryTickets from './Usercomponents/HistoryTickets';
import Login from './shared/login';
import Register from './shared/register';
import Transportation from './Admincomponents/Transportation'
import { isAuthenticated, isAdmin } from './helper/Storage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Tickets />,
	},

	{
		path: '/show/:id',
		element: <Show />,
	},
	{
		path: '/manageHajjappoint',
		element: isAuthenticated() && isAdmin() ? <Ma /> : <Login />,

	},

	{
		path: '/manageumrahappoint',
		element: isAuthenticated() && isAdmin() ? <Manageumrahapp /> : <Login />,

	},
	{
		path: '/requests',
		element: isAuthenticated() && isAdmin() ? <Requests /> : <Login />,
	},
	{
		path: '/hajjtickets',
		element: <Tickets />,
	},
	{
		path: '/Umrahtickets',
		element: <UmrahTickets />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/history',
		element: <HistoryTickets />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/transportation',
		element: <Transportation />,
	},
]);
