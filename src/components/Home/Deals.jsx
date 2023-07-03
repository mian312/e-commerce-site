import React from 'react'
import '../../index.css'

function Deals() {
    return (
        <div>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src='https://cdn3.mageplaza.com/media/general/MImGnKu.png' className="d-block carousel-image" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src='https://carlofontanos.com/wp-content/uploads/2019/05/get-all-five-ecommerce-applications-discount.jpg' className="d-block carousel-image" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src='https://cdn.wedevs.com/uploads/2020/07/Consumers-1.jpg' className="d-block carousel-image" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Deals
