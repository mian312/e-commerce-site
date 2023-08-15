import React, { useContext, useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Store } from '../../Store';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils'
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      })
      ctxDispatch({ type: 'USER_LOGIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirectInUrl || '/')
    } catch (error) {
      console.error(error)
      toast.error(getError(error));
    }
  }

  useEffect(() => {
    if (userInfo && redirectInUrl) {
      navigate(redirect);
    }
  }, [userInfo, redirectInUrl, navigate])

  return (
    <div style={{ height: '100%' }} className="d-flex align-items-center justify-content-center my-5">
      <div >
        <div className="card bg-light opacity-75 shadow-lg border rounded-lg mx-auto p-2">
          <div className="card bg-light m-2 p-2 text-center">
            Login Form
          </div>
          <div className="card bg-light bg-transparent-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required value={email} onChange={(event) => setEmail(event.target.value)} />
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
                    value={password} required
                    onChange={(event) => setPassword(event.target.value)} />
                  <i style={{ cursor: 'pointer' }} className="input-group-text"
                    onClick={togglePassword}>
                    {!passwordShown
                      ? <i className="bi bi-eye-slash-fill"></i>
                      : <i className="bi bi-eye-fill"></i>
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
        <span className="m-4 p-4">Don't have an account? <Link to={`/signup?redirect=${redirect}`}>Register</Link> now.</span>
      </div>
      <div className="continer">
      </div>
    </div>
  )
}
