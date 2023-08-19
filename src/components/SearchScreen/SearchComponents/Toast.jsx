import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const Toast = ({ message }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        const toast = new window.bootstrap.Toast(toastRef.current, {
            autohide: false, // Set to true if you want to disable autohide
        });
        toast.show();
    }, []);

    return (
        <div class="toast align-items-center w-auto h-auto" ref={toastRef} role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div className="toast-body" style={{ whiteSpace: 'normal', overflow: 'hidden', display: 'inline-block', maxWidth: '100%' }}>
                    {message}
                </div>
                {/* <button type="button" class="btn-close me-2 my-auto" data-bs-dismiss="toast" aria-label="Close"></button> */}
            </div>
        </div>
    );
};

export default Toast;
