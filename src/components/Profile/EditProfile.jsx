import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const {state,  dispatch: ctxDispatch} = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        'http://localhost:5000/users/profile',
        {
          name,
          email,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-center my-5">
      <Helmet><title>Edit Profile</title></Helmet>
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h4>Edit Your Profile</h4>
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={submitHandler}>
                    <div className="form-group row m-2">
                      <label htmlFor="username" className="col-4 col-form-label">User Name*</label>
                      <div className="col-8">
                        <input id="username" name="username" placeholder={userInfo?.name} className="form-control here" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required type="text" />
                      </div>
                    </div>
                    <div className="form-group row m-2">
                      <label htmlFor="email" className="col-4 col-form-label">Email*</label>
                      <div className="col-8">
                        <input id="email" name="email" placeholder={userInfo?.email} className="form-control here" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required type="text" />
                      </div>
                    </div>
                    <div className="form-group row m-2">
                      <div className="offset-4 col-8">
                        <button name="submit" type="submit" className="btn btn-primary">Update My Profile</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default EditProfile;
