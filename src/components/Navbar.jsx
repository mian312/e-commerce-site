import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Cart/Cart';
import { Store } from '../Store';
import { ToastContainer } from 'react-toastify';


function Navbar() {
    const [query, setQuery] = useState('');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = (event) => {
        event.preventDefault();
        navigate(`/search?query=${query}`)
    };

    const logoutHandler = () => {
        ctxDispatch({ type: "USER_LOGOUT" });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
    }

    //     const handleClickOutside = (event) => {
    //         if (formRef.current && !formRef.current.contains(event.target)) {
    //             setShowPopup(!showPopup);
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    // const [user, setUser] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        setUser(user)
    }, [userInfo]);


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <ToastContainer position='top-center' limit={1}/>
                <div className="container">
                    <Link className="navbar-brand fs-3" to='/'>E-Commerce</Link>
                    <form className="container d-flex" role="search" onSubmit={handleSearchClick}>
                        <input className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(event) => {
                                handleInputChange(event);
                            }}
                            data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" />
                    </form>
                    <button className="navbar-toggler navbar-brand my-2 position-absolute top-0 end-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse mx-1" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown my-2 mx-4">
                            {user ? (

                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userInfo?.name || user?.name}
                                </Link>
                            ) : (
                                <Link className="nav-link" to='/login'>
                                    Login
                                </Link>
                            )}
                            <ul className="dropdown-menu">
                                <li><Link to='/profile' className="dropdown-item" >Your Account</Link></li>
                                <li><Link to='/orderhistory' className="dropdown-item" >Your Orders</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={logoutHandler}>LogOut</button></li>
                            </ul>
                        </li>
                        <li className="nav-item px-4"
                            type="button" data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" >
                            <li className="nav-link position-relative">
                                <i className="bi bi-cart4" ></i> Cart
                                {cart.cartItems.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger my-2">{cart.cartItems.length}</span>
                                )}
                            </li>
                        </li>
                    </ul>
                </div>
            </nav>

            {
                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{ width: '120vh' }}>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Thankyou For Shopping</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <p>Hello! {user?.name}</p>
                        <Cart />
                    </div>
                </div>
            }
            <Outlet />
        </>
    )
}

export default Navbar
