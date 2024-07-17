import React from 'react';
import { Link } from 'react-router-dom';

import { removeAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/SideBar.module.css';

const SideBar = () => {
	const logout = async () => {
		removeAuthUser();
	};

	return (
		<div className={classes.sidebar}>
			<p className={classes['logo-name']}> Hajj&Umara</p>
			<ul className={classes['nav-list']}>
				<li>
					<Link className={classes['link_name']} to='/manageHajjappoint'>
						Hajj Appointments
					</Link>

					<Link className={classes['link_name']} to='/manageUmrahappoint'>
						Umra Appointments
					</Link>
				</li>

				<li>
					<Link className={classes['link_name']} to='/requests'>
						Requests
					</Link>
				</li>

				<li>
					<Link className={classes['link_name']} to='/transportation'>
						Transportation
					</Link>
				</li>

				<li>
					<Link className={classes['link_name']} to='/profile'>
						Profile
					</Link>
				</li>

				<li>
					<Link className={classes['link_name']} to='/login' onClick={logout}>
						Logout
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default SideBar;
