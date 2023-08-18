import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-light text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <Link to='/' className="me-4 text-reset">
                            <i className="bi bi-google"></i>
                        </Link>
                        <Link to='/' className="me-4 text-reset">
                            <i className="bi bi-linkedin"></i>
                        </Link>
                        <Link to='https://github.com/mian312/e-commerce-site' className="me-4 text-reset" target='_blank'>
                            <i className="bi bi-github"></i>
                        </Link>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>About E-Commerce
                                </h6>
                                <p>
                                    Built with the MERN stack, this e-commerce application features a collection of 100 products listed from a dummy JSON API. It is a scalable, flexible, and easy-to-learn solution that can be customized to meet the needs of your business.
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Features
                                </h6>
                                <p>
                                    <Link to='/' className="text-reset">Shopping cart</Link>
                                </p>
                                <p>
                                    <Link to='/' className="text-reset">Checkout process</Link>
                                </p>
                                <p>
                                    <Link to='/' className="text-reset">Customizable design</Link>
                                </p>
                                <p>
                                    <Link to='/' className="text-reset">Search engine optimization</Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    Website: www.example.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2023 Copyright : &nbsp;
                    <Link className="text-reset fw-bold" target='_blank'>Milan Dey</Link>
                </div>
            </footer>
        </div>
    )
}

export default Footer
