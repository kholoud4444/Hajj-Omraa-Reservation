import React from 'react';
import { useParams } from 'react-router-dom';

import SideBar from './SideBar';
import ShowTicket from './ShowTicket';

import classes from '../AdminStyle/Show.module.css';
const Show = () => {
	const { id } = useParams();
	return (
		<div className={classes.wrapper}>
			<SideBar />
			<main className={classes.main}>
				<h2>History of Requests</h2>
				<ShowTicket id={id} />
			</main>
		</div>
	);
};
export default Show;