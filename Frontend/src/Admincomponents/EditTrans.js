import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/EditAppointment.module.css';
import '../App.css';
import '../AdminStyle/EditTrav.css';

const EditTrans = ({ sort, onEditTrans }) => {
    const auth = getAuthUser();

    console.log(sort)
    // useEffect(() => {
    //     // Fetch the data using axios and update the state
    //     axios
    //         .get(`http://localhost:4000/appointments/getone/${id}`)
    //         .then(response => {
    //             setFormData(response.data);
    //         })
    //         .catch(error => console.log(error));
    // }, [id]);//the first time + on condition

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     try {
    //         // Update the data using axios
    //         await axios.put(`http://localhost:4000/appointments/${id}`,  {
    //             headers: {
    //                 token: auth.token,
    //             },
    //         });
    //         OnEditAppointment();
    //         // Hide the edit form
    //         hideEdit();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    async function handleSubmit(e) {
        e.preventDefault();
        hideEdit();

    }

    async function construct() {

        try {
            const u_construct = 1;
            await axios.patch(`http://localhost:3001/transportation//modify/${sort}`, { u_construct }, {
                headers: {
                    token: auth.token,
                },
            });
            onEditTrans();
        } catch (err) {
            console.log(err);
        }
    }





    async function finish_construct() {

        try {
            const u_construct = -1;
            await axios.patch(`http://localhost:3001/transportation/modify/${sort}`, { u_construct }, {
                headers: {
                    token: auth.token,
                },
            });
            onEditTrans();
        } catch (err) {
            console.log(err);
        }
    }
    function hideEdit() {
        console.log("hide")
        const x = document.getElementById('edit-modal');
        x.style.display = 'none';

    }


    return (
        <form id='edit-modal' onSubmit={handleSubmit}
            className={classes['edit-modal']}>

            <button type='button' onClick={construct}> Add unit to under Constraction</button>
            <button type='button' onClick={finish_construct}>Remove unit from under Constraction</button>

            <button className={classes['btn-save']} type='submit'>
                Save
            </button>
        </form>
    );
};

export default EditTrans;
