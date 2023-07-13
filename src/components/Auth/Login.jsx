import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div style={{ height: '100%' }} className="d-flex align-items-center justify-content-center">
      <div >
        <div className="card bg-light opacity-75 shadow-lg border rounded-lg mx-auto p-2">
          <div className="card bg-light m-2 p-2 text-center">
            Login Form
          </div>
          <div className="card bg-light bg-transparent-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                {email.length < 0 &&
                  <p className="text-danger">Please enter email</p>
                }
              </div>
              <div className="form-group m-2">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control" id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                  <i style={{ cursor: 'pointer' }} className="input-group-text"
                    onClick={togglePassword}>
                    {!passwordShown
                      ? <i class="bi bi-eye-slash-fill"></i>
                      : <i class="bi bi-eye-fill"></i>
                    }
                  </i>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary m-2"
                >Submit</button>
              </div>
            </form>
            <Link className="d-flex justify-content-center p-2">Forgot Password</Link>
          </div>
        </div>
        <span className="m-4 p-4">Don't have an account? <Link to={`/signup/redirect=${redirect}`}>Register</Link> now.</span>
      </div>
      <div className="continer">
      </div>
    </div>
  )
}
