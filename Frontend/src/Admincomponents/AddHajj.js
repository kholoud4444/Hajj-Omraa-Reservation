import React, { useState, useRef } from 'react';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import '../AdminStyle/AddTrav.css';
import '../AdminStyle/Addapp.css';

import classes from '../AdminStyle/AddAppointment.module.css';

const Addapp = ({ OnAddAppointment }) => {
	const auth = getAuthUser();
	const [hajjname, setHajjname] = useState("");
	const [from_where, setFromWhere] = useState("");
	const [to_where, setToWhere] = useState("");
	const [ticket_price, setTicketPrice] = useState("");
	const [day_and_time, setDayAndTime] = useState("");
	const [max_num_trav, setMaxNumTrav] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);
	const hideModal = () => {
		const x = document.getElementById('add-appointment-modal');
		x.style.display = 'none';
	};


	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(
				'http://localhost:5000/api/hajj',
				{ hajjname, from_where, to_where, ticket_price, day_and_time, max_num_trav }
			);

			OnAddAppointment();
			setLoading(false)
			setErr(null)
			setSuccess(true)

			hideModal();
		} catch (error) {
			console.error(error);
			setLoading(false);
			setErr(err.message);
		}
	};
	return (
		<form
			id='add-appointment-modal'
			className={classes['add-modal']}
			onSubmit={submitHandler}
		>
			<h4>Add Hajj Ticket</h4>
			<div>
				<label>Hajj Appointment Name</label>
				<input
					type='text'
					className='form-control'
					required
					value={hajjname}
					onChange={(e) => setHajjname(e.target.value)}
				/>
			</div>

			<div>
				<label>From</label>
				<input
					type='text'
					className='form-control'
					required
					value={from_where}
					onChange={(e) => setFromWhere(e.target.value)}
				/>
			</div>
			<div>
				<label>To</label>
				<input
					type='text'
					className='form-control'
					required
					value={to_where}
					onChange={(e) => setToWhere(e.target.value)}
				/>
			</div>
			<div>
				<label>Ticket Price</label>
				<input
					type='text'
					className='form-control'
					required
					value={ticket_price}
					onChange={(e) => setTicketPrice(e.target.value)}
				/>
			</div>
			<div>
				<label>Date and Time</label>
				<input
					type='datetime-local'
					className='form-control'
					required
					value={day_and_time}
					onChange={(e) => setDayAndTime(e.target.value)}
				/>
			</div>
			<div>
				<label>Max Number of Travelers</label>
				<input
					type='number'
					className='form-control'
					required
					value={max_num_trav}
					onChange={(e) => setMaxNumTrav(e.target.value)}
				/>
			</div>
			<div className={classes['btn-box']}>
				<button
					className={classes['btn-cancel']}
					type='button'
					data-dismiss='modal'
					onClick={hideModal}>
					Cancel
				</button>
				<button className={classes['btn-save']} type='submit'>
					Add
				</button>
			</div>
		</form>
	);
};

export default Addapp;
