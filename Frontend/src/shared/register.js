import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import Axios from 'axios';

import Header from '../Usercomponents/Header';

import classes from './register.module.css';

const Register = () => {
	const navigate = useNavigate();

	const [error, setError] = useState('');

	const [username, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const usernameChangeHandler = event => {
		setName(event.target.value);
	};

	const phoneChangeHandler = event => {
		setPhone(event.target.value);
	};

	const passwordChangeHandler = event => {
		setPassword(event.target.value);
	};

	const emailChangeHandler = event => {
		setEmail(event.target.value);
	};

	const submitHandler = async event => {
		// Prevent reload after form submission
		event.preventDefault();//

		const data = { username, password, email, phone };
		try {
			const response = await Axios.post(
				'http://localhost:5002/api/register',
				data
			);

			//console.log(response);
			// console.log('submitted');

			navigate('/login');//
		} catch (err) {
			const errorMessage =
				err.response?.status === 400 || err.response?.status === 500 ? 'username or password are not avaliable' : 'Something went wrong';
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
				<h2>Registration</h2>
				<form onSubmit={submitHandler}>
					<div className={classes['input-box']}>
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							name='name'
							type='text'
							required
							value={username}
							onChange={usernameChangeHandler}
						/>

					</div>
					<div className={classes['input-box']}>
						<label htmlFor='phone'>Phone</label>
						<input
							id='phone'
							name='phone'
							type='text'
							required
							value={phone}
							onChange={phoneChangeHandler}
						/>

					</div>
					<div className={classes['input-box']}>
						<label htmlFor='email'>Email</label>
						<input
							id='email'
							name='email'
							type='email'
							required
							value={email}
							onChange={emailChangeHandler}
						/>

					</div>
					<div className={classes['input-box']}>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							name='password'
							type='password'
							// {...register('password', { required: true, minLength: 8 })}
							required
							value={password}
							onChange={passwordChangeHandler}
						/>

					</div>
					<div className={classes['input-box']}>
						<button className={classes['btn--submit']} type='submit'>
							Register Now
						</button>
					</div>
					<div className={classes.text}>
						<h3>
							Already have an account? <Link to='/login' style={{ color: "#d3b923" }}>Login now</Link>
						</h3>
					</div>
				</form>
			</div>
		</>
	);
};

export default Register;
