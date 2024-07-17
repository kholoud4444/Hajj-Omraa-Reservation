import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SideBar from './SideBar';
import Add from './AddOmra';


import { getAuthUser } from '../helper/Storage';

// import '../AdminStyle/Mangeapp.css';
import classes from '../AdminStyle/MangeAppointments.module.css';
import '../App.css';

const ManageAppointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [editId, setEditId] = useState(null);
	const [error, setError] = useState(null);
	const auth = getAuthUser();

	const getAllAppointments = async () => {
		try {
			const response = await axios.get(
				`http://localhost:5001/api/omras`
			);
			setAppointments(response.data.data);
			console.log(response.data.data);
		} catch (err) {
			setError('Failed to fetch appointments. Please try again later.');
		}
	};

	useEffect(() => {
		getAllAppointments();
	}, []);

	function display() {
		const x = document.getElementById('add-appointment-modal');
		x.style.display = 'flex';
	}
	function displayedit(id) {
		setEditId(id);
		const x = document.getElementById('edit-modal');
		x.style.display = 'flex';
	}
	const handleDelete = async id => {
		try {
			await axios.delete(`http://localhost:5001/api/omra/${id}`);
			setAppointments(
				appointments.filter(appointment => appointment.id !== id)
			);
			getAllAppointments();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={classes.wrapper}>
			<SideBar />

			<main className={classes.main}>
				<h2>Manage Umrah Appointments</h2>

				{error ? (
					<p className={classes.error}>{error}</p>
				) : appointments.length > 0 && (
					<table className='table table-striped table-hover'>
						<thead>
							<tr>
								<th>Name</th>
								<th>From</th>
								<th>To</th>
								<th>Ticket Price</th>
								<th>Day and Time</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{appointments.map(appointment => (
								<tr key={appointment._id}>
									<td>{appointment.omraname}</td>
									<td>{appointment.from_where}</td>
									<td>{appointment.to_where}</td>
									<td>{appointment.ticket_price} EGP</td>
									<td>
										{appointment.day_and_time.toLocaleString('en-GB', {
											timeZone: 'EAT',
										})}
									</td>
									<td>
										<div className={classes['btn-box']}>
											{/* <button className='edit' data-toggle='modal'>
												<i
													className='material-icons'
													title='Edit'
													onClick={() => displayedit(appointment.id)}>
													&#xE254;
												</i>
											</button> */}
											<button className='delete' data-toggle='modal'>
												<i
													className='material-icons'
													title='Delete'
													onClick={() => {
														if (
															window.confirm(
																'Are you sure you wish to delete this appointment?'
															)
														)
															handleDelete(appointment._id);
													}}>
													&#xE872;
												</i>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				{!error && appointments.length === 0 && (
					<h2 className='no-data'>No UmrahTickets Found!</h2>
				)}

				{!error && (
					<button
						style={{ color: "black", background: "#d3b923", border: "none" }}
						className='btn btn-success margin-bottom-md'
						data-toggle='modal'
						onClick={display}>
						Add Appointment
					</button>
				)}


			</main>

			<Add OnAddAppointment={getAllAppointments} />

		</div>
	);
};

export default ManageAppointments;
