import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function ProductGroup({ product }) {
  const descriptionWords = product.description.split(' ').slice(0, 11);
  const limitedDescription = descriptionWords.join(' ')

  return (
    <div className="card m-2" style={{ width: '20rem', height: '20rem' }}>
      <Link to={`/product/${product._id}`}>
        <img src={product.thumbnail} alt={product.brand}
          className="card-img-top img-thumbnail"
          style={{ width: '20rem', height: '12rem' }} />
      </Link>
      <Link to={`/product/${product._id}`} className='link-underline-light'>
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-body-secondary">{limitedDescription}...</p>
        </div>
      </Link>
      {/* <div className="card-body">
        <Link to='/' className="card-link">Card link</Link>
        <Link to='/' className="card-link">Another link</Link>
      </div> */}
    </div>
  )
}

export default ProductGroup
