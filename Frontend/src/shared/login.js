import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import Header from '../Usercomponents/Header';
import { setAuthUser, getAuthUser } from '../helper/Storage';

import classes from './login.module.css';

function Login() {
	//const auth = getAuthUser();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	const emailChangeHandler = event => {
		setUsername(event.target.value);
	};

	const passwordChangeHandler = event => {
		setPassword(event.target.value);
	};

	const submitHandler = async event => {
		// Prevent reload after form submission
		event.preventDefault();

		const data = { username, password };

		try {
			const result = await Axios.post('http://localhost:5002/api/user/auth', data);
			console.log(result.data.id);
			console.log(result.data.email);
			setAuthUser(result.data.id, result.data.email, result.data.token);

			if (result.data.email.toString() === 'admin@admin.com') {
				console.log('it should navigate to ManageAppointments');
				navigate('/manageumrahappoint');
			} else {
				navigate('/hajjtickets');
			}
			console.log("login");
		} catch (err) {
			const errorMessage =
				err.response?.status === 401 ? 'Unauthorized' : 'Something went wrong';
			setErrorMessage(errorMessage);
		}
	};

	return (
		<>
			<Header />
			<div className={classes.wrapper}>
				{errorMessage && (
					<p className={classes.errorMessage}>
						{errorMessage}
					</p>
				)}

				<h2>Login</h2>
				<form onSubmit={submitHandler}>
					<div className={classes['input-box']}>
						<label htmlFor='username'>User Name</label>
						<input
							id='username'
							name='username'
							type='text'
							// placeholder='Enter your email'
							required
							{...register('username', {
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
							})}
							value={username}
							onChange={emailChangeHandler}
						/>
					</div>
					<div className={classes['input-box']}>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							name='password'
							type='password'
							// placeholder='Password'
							required
							{...register('password', {
								minLength: 8,
							})}
							value={password}
							onChange={passwordChangeHandler}
						/>
					</div>

					<div className={classes['input-box']}>
						<button className={classes['btn--login']} type='Submit'>
							Login
						</button>
					</div>
					<div className={classes.text}>
						<h3>
							Don't have an account? <br />{' '}
							<Link style={{ color: "#d3b923" }} to='/register'>Register Now</Link>
						</h3>
					</div>
				</form>
			</div>
		</>
	);
}
export default Login;
