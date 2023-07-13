import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';



function SignUp() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState();
    const [statusMessage, setStatusMessage] = useState([]);
    const [name, setName] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const register = (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!name) {
            newErrors.name = "Please enter name";
        }
        if (!email) {
            newErrors.email = "Please enter email";
        }
        if (!password) {
            newErrors.password = "Please enter password";
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm Password does not match";
        }
        if (Object.keys(newErrors).length > 0) {
            setStatusMessage(newErrors);
        }
        else {
            return;
        }
    };


    return (
        <div className="card w-75 opacity-75 bg-light shadow-lg border-0 rounded-lg m-auto my-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <form onSubmit={register}>
                        <div className="form-group m-3">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                            />
                            {statusMessage.name &&
                                <p className="text-danger">{statusMessage.name}</p>
                            }
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                            {statusMessage.email &&
                                <p className="text-danger">{statusMessage.email}</p>
                            }
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                />
                                <i style={{ cursor: 'pointer' }} className="input-group-text"
                                    onClick={togglePassword}>
                                    {!passwordShown
                                        ? <i class="bi bi-eye-slash-fill"></i>
                                        : <i class="bi bi-eye-fill"></i>
                                    }
                                </i>
                            </div>
                            {statusMessage.password &&
                                <p className="text-danger">{statusMessage.password}</p>
                            }
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                            />
                            {statusMessage.confirmPassword &&
                                <p className="text-danger">{statusMessage.confirmPassword}</p>
                            }
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary m-3 center"
                            >Sign Up</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <span className="my-4">Already have an account? <Link className="text-decoration-none">Login</Link> now.</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default SignUp;