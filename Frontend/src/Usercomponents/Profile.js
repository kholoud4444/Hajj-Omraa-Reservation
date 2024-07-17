import React from 'react';
import Header from '../Usercomponents/Header';
import Footer from '../Usercomponents/Footer';
import User from '../Usercomponents/User';
import HistoryTickets from '../Usercomponents/HistoryTickets';

const Profile = () => {
	return (
		<>
			<Header />
			<User />
			<HistoryTickets />
			<Footer />
		</>
	);
};

export default Profile;
