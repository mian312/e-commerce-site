import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function ProductImages({ Images }) {
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        setPictures(Images)
    }, [pictures])

    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
            {Images && Images.map((image, index) => (
                    <div key={index} className="carousel-item active" data-bs-interval="10000">
                        <img src={image} className="d-block w-100 img-fluid" style={{height: '30rem'}} alt="..." />
                    </div>
                    ))}
                </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-dark optacity-25" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-dark optacity-25" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default ProductImages
