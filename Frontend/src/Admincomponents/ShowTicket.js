import React, { useEffect, useState } from 'react';
import axios from 'axios';

import classes from '../AdminStyle/ShowTicket.module.css';
import '../App.css';

const ShowTicket = props => {
	const [tickets, setTickets] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:4000/request/history/${props.id}`).then(res => {
			setTickets(res.data);
			console.log(res.data);
		});
	}, [props.id]);

	return (
		<>
			<ul className={classes.flex}>
				{tickets.map(ticket => (
					<li key={props.id} className={classes.ticket}>
						<img src={ticket.image}></img>
						<h3>{ticket.name}</h3>
						<h4>From :{ticket.from_where}</h4>

						<h4>To : {ticket.to_where}</h4>

						<h4>Ticket Price : {ticket.ticket_price} EGP</h4>

						<h4>Day and Time : {ticket.day_and_time.toLocaleString()}</h4>

					</li>
				))}
			</ul>
			{tickets.length === 0 && <h2 className='no-data'>No Requests.</h2>}
		</>
	);
};

export default ShowTicket;
