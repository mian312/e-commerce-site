import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import StarRating from '../../StarRating';
import { Store } from '../../../Store';

function ProductList(product) {
    const navigate = useNavigate();
    const [productQuantity, setProductQuantity] = useState(1)
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const addToCartHandler = async () => {
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product.product, quantity: productQuantity } })
    }
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4" onClick={() => navigate(`/product/${product.product._id}`)}>
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
                        <button onClick={addToCartHandler} className="btn btn-danger rounded-pill float-end m-2" type="button">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;
