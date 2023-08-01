import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Profile() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        setUser(user)
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo]);

    return (
        <div className="container card text-center my-5" style={{width: '50vh'}}>
            <Helmet><title>User Profile</title></Helmet>
            <h3 className="card-header">User Profile</h3>
            <div className="card-body">
                <h5 className="card-title">Name: {user?.name}</h5>
                <h5 className="card-title">Email: {user?.email}</h5>
                <h5 className="card-text">Admin: {user?.isAdmin ? 'Yes' : 'No'}</h5>
                <Link to='/editprofile' className="btn btn-primary">Edit Profile</Link>
            </div>
        </div>
    )
}

export default Profile
