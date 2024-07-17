import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import Ticket from './Ticket';

import classes from '../UserStyle/Ticket.module.css';

const Tickets = () => {
    const [search, setSearch] = useState('');
    const [ticket, setTicket] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setTicket({ ...ticket, loading: true });
        Axios.get('http://localhost:5001/api/omras')
            .then(resp => {
                setTicket({ ...ticket, results: resp.data.data, loading: false, err: null });
            })
            .catch(err => {
                setTicket({
                    ...ticket,
                    loading: false,
                    err: 'Something went wrong, please try again later!',
                });
            });
    }, [ticket.reload]);



    return (
        <>
            <Header />

            <div className={classes.flex}>
                {ticket.err ? (
                    <p className={classes.error}>{ticket.err}</p>
                ) :
                    Array.isArray(ticket.results) ? (
                        ticket.results.map(t => (
                            <Ticket
                                key={t.id}
                                name={t.omraname}
                                from_where={t.from_where}
                                to_where={t.to_where}
                                ticket_price={t.ticket_price}
                                day_and_time={t.day_and_time}
                                id={t._id}
                            />
                        ))
                    ) : (
                        <p>No results found.</p>
                    )

                }
            </div>
            <Footer />
        </>
    );
};

export default Tickets;