import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuthUser, getAuthUser, isAdmin } from '../helper/Storage';

import '../UserStyle/Header.css';

const Header = () => {
	const navigate = useNavigate();
	const auth = getAuthUser();
	// const isAdmin = isAdmin();

	const Logout = () => {
		removeAuthUser();
		navigate('/');
	};

	return (
		<header className='header'>
			<div className='logo'>
				<img className="imglogo" src={require('../assets/favicon.png')}></img>
				<h1 className='textlogo'>Hajj&Umara</h1>
			</div>
			<nav className='navigation-menu'>

				{auth && isAdmin() && <Link to='/manageHajjappoint'>manage Hajj appointments</Link>}
				{auth && isAdmin() && <Link to='/manageumrahappoint'>Manage Umrah appointments</Link>}
				{auth && isAdmin() && (
					<Link to='/transportation'>Manage Transportation</Link>
				)}
				<Link to='/hajjtickets'>Hajj Tickets</Link>
				<Link to='/umrahtickets'>Umrah Tickets</Link>
				{auth && <Link to='/profile'>Profile</Link>}

				{auth && (
					<Link to='/login' onClick={Logout}>
						Logout
					</Link>
				)}
				{!auth && <Link to='/register'>Signup</Link>}
				{!auth && <Link to='/login'>Login</Link>}
			</nav>
		</header>
	);
};

export default Header;
