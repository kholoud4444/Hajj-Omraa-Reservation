import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SideBar from './SideBar';
import Edit from './EditTrans';
import EditUnits from './EditUnits';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/ManageTrav.module.css';
import '../App.css';

const Transportation = () => {
    const [trans, setTrans] = useState([]);
    const [editId, setEditId] = useState(null);
    const [showEditUnits, setShowEditUnits] = useState(false);
    const [error, setError] = useState(null);
    const auth = getAuthUser();

    function displayEditUnits() {
        setShowEditUnits(true);
    }


    function displayEdit(id) {
        setEditId(id);
        const x = document.getElementById('edit-modal');
        x.style.display = 'flex';
    }



    const fetchAllTrans = async () => {

        try {
            const transportation = await axios.get('http://localhost:3001/transportation/')
            setTrans(transportation.data);
        }
        catch (err) {
            setError('Failed to fetch appointments. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAllTrans();
    }, []);

    return (
        <div className={classes.wrapper}>
            <SideBar />
            <main className={classes.main}>
                <h2>Manage Transportation</h2>
                {error ? (
                    <p className={classes.error}>{error}</p>
                ) :
                    trans.length > 0 && (
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Units</th>
                                    <th>Available Units</th>
                                    <th>Seats</th>
                                    <th>Free Steats</th>
                                    <th>Edit Constraction</th>

                                </tr>
                            </thead>
                            <tbody>
                                {trans.map(t => (
                                    <tr key={t.Type}>
                                        <td>{t.Type}</td>
                                        <td>{t.units}</td>
                                        <td>{t.avail_units}</td>
                                        <td>{t.seats}</td>
                                        <td>{t.free_seats}</td>



                                        <td>
                                            <div className={classes['btn-box']}>
                                                <button className='edit' data-toggle='modal'>
                                                    <i
                                                        className='material-icons'
                                                        data-toggle='tooltip'
                                                        title='Edit'
                                                        onClick={() => displayEdit(t.Type)}

                                                    >
                                                        &#xE254;
                                                    </i>
                                                </button>


                                            </div>
                                        </td>



                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                {!error && (
                    <button
                        style={{ color: "black", background: "#d3b923", border: "none" }}
                        className='btn btn-success margin-bottom-md'
                        onClick={displayEditUnits}>
                        Edit Units
                    </button>
                )}
                {!error && trans.length === 0 && (
                    <h2 className='no-data'>No Trans Found!</h2>
                )}


                {<Edit sort={editId} onEditTrans={fetchAllTrans} />}

                {showEditUnits && <EditUnits onEditTrans={fetchAllTrans} />}
            </main>
        </div>
    );
};

export default Transportation;
