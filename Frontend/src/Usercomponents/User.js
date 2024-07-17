import React from 'react';
import '../UserStyle/User.css';
import { getAuthUser } from '../helper/Storage';

const User = () => {
	const user = getAuthUser();
	const name = user.name;
	const email = user.email;
	const phone = user.phone;
	return (
		<>
			<div className='card'>
				<img className='avatar' alt='User Avatar' src={require('../assets/avt.png')} />

				<h2>{name}</h2>

				<h3>Contact: {email}</h3>
				<h3>{phone}</h3>
			</div>
		</>
	);
};

export default User;
