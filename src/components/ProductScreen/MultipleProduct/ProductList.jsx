import React from 'react'
import { useNavigate } from 'react-router-dom';
import StarRating from '../../StarRating';

function ProductList(product) {
    const navigate = useNavigate();
    return (
        <div className="card mb-3" onClick={() => navigate(`/product/${product.product._id}`)}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img type='button' src={product.product.thumbnail} className="img-fluid object-fit-fill rounded-start h-100 w-100" alt={product.product.title} />
                </div>
                <div className="col-md-8 my-auto">
                    <div className="card-body">
                        <h3 className="card-title h-50">{product.product.title}</h3>
                        <p className="card-text fst-italic h-50">{product.product.description}</p>
                        <h5 className="card-text">
                            <small className="text-dark fw-bold">${product.product.price}</small>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <small className="text-danger">{product.product.discountPercentage}%</small>
                        </h5>
                        <h4 className='d-flex'>
                            <StarRating value={product.product.rating} editable={false} />
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;
