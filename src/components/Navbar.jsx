import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Navbar() {
    const [showPopup, setShowPopup] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const formRef = useRef(null);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchClick = (event) => {
        event.preventDefault();
        setShowPopup(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand fs-3" to='/'>E-Commerce</Link>
                    <form className="container d-flex" role="search">
                        <input className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(event) => {
                                handleInputChange(event);
                                setShowPopup(true);
                            }}
                            data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" />
                        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                    </form>
                    <button className="navbar-toggler navbar-brand my-2 position-absolute top-0 end-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse mx-1" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown my-2 mx-4">
                            <Link className="nav-link dropdown-toggle" to='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Your Account
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/'>Your Orders</Link></li>
                                <li><Link className="dropdown-item" to='/'>Buy Again</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to='/'>Login</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item px-4" onClick={() => setShowCart(true)}
                            data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" >
                            <Link className="nav-link position-relative">
                                <i className="bi bi-cart4"></i> Cart
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger my-2">+99</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {showPopup && (
                <div className="card card-body" id="collapseExample" style={{ position: 'absolute', zIndex: 9999, left: '25%', right: '25%' }}>
                    <p>{searchValue}</p>
                </div>
            )}




            {showCart && (
                <div className="collapse collapse-horizontal position-absolute" id="collapseWidthExample" style={{ zIndex: 9999 }}>
                    <div className="card card-body float-start" style={{ width: '100%' }}>
                        This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                    </div>
                </div>
            )}
            <Outlet />
        </>
    )
}

export default Navbar
