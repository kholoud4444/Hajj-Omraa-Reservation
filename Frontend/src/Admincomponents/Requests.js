import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import SideBar from './SideBar';

import classes from '../AdminStyle/Request.module.css';

const Requests = () => {
	const [requests, setrequests] = useState({
		loading: true,
		results: [],
		err: null,
		reload: 0,
	});

	const fetchAllRequest = async () => {
		setrequests({ ...requests, loading: true });

		try {
			const resposne = await Axios.get('http://localhost:3002/request/all');

			setrequests({
				...requests,
				results: resposne.data,
				loading: false,
				err: null,
			});
		} catch (error) {
			setrequests({
				...requests,
				loading: false,
				err: error.message || 'Something went wrong, please try again later!',
			});
		}
	};

	useEffect(() => {
		fetchAllRequest();
	}, [requests.reload]);

	const acceptRequest = async (appid, reqid) => {
		try {
			await Axios.put(
				'http://localhost:3002/request/accept/' + appid + '/' + reqid
			);
			setrequests({ ...requests, loading: true, reload: requests.reload + 1 });

			fetchAllRequest();
			document.getElementById("diableacc").disabled = true;
			document.getElementById("diablerej").disabled = true;
		} catch (err) {
			console.log(err);
		}
	};

	const rejectRequest = async id => {
		await Axios.put('http://localhost:3002/request/decline/' + id);
		setrequests({ ...requests, loading: true, reload: requests.reload + 1 });

		fetchAllRequest();
		document.getElementById("diableacc").disabled = true;
		document.getElementById("diablerej").disabled = true;
	};
	return (
		<div className={classes.wrapper}>
			<SideBar />

			<main className={classes.main}>
				<h2>Manage Requests</h2>

				<table className='table table-striped table-hover'>
					<thead>
						<tr>
							<th>Traveler</th>
							<th>From</th>
							<th>To</th>

							<th>Day and Time</th>
							<th>Number of travelers</th>
							<th>Maxmium</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{requests.results.map(t => (
							<tr key={t.id}>
								<td>{t.email}</td>
								<td>{t.from_where}</td>
								<td> {t.to_where}</td>
								<td>{t.day_and_time}</td>
								<td>{t.number_of_traveler}</td>
								<td>{t.max_number_of_travelers}</td>

								<td>{t.status}</td>
								<td>
									<div className={classes['btn-box']}>
										<button
											type='submit'
											id="diableacc"
											className='btn btn-success'
											onClick={() => acceptRequest(t.appid, t.id)}>
											Accept
										</button>
										<button
											type='submit'
											id="diablerej"
											className='btn btn-danger'
											onClick={() => rejectRequest(t.id)}>
											Reject
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default Requests;
