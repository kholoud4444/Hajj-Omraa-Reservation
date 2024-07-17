import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/EditAppointment.module.css';
import '../App.css';
import '../AdminStyle/EditTrav.css';

const EditUnits = ({ onEditTrans }) => {



    const auth = getAuthUser();

    const [val, setVal] = useState(0);
    const [sort, setSort] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/transportation/units', { sort, val });
            console.log(response.data); // Handle the response data as desired
            hideEdit();
            onEditTrans();
        } catch (error) {
            console.log(error);
        }
    };




    function hideEdit() {

        const x = document.getElementById('edit-modal2');
        x.style.display = 'none';

    }


    return (
        <form id='edit-modal2' onSubmit={handleSubmit}
            className={classes['edit-modal']}>

            <select id="type" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Select a type</option>
                <option value="AIR">AIR</option>
                <option value="Ground">Ground</option>
                <option value="Nautical voy">Nautical voy</option>
            </select>

            <label >Number of units </label>
            <input
                type="number"
                id="val"
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
            />

            <button className={classes['btn-save']} type='submit'>
                Save
            </button>
        </form>
    );
};

export default EditUnits;
