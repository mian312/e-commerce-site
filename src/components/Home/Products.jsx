import React from 'react'
import { Link } from 'react-router-dom'

function Products({product}) {
  const descriptionWords = product.description.split(' ').slice(0, 11);
  const limitedDescription = descriptionWords.join(' ')
  

  return (
    <div className="card m-2" style={{width: '20rem', height: '20rem'}}>
      <img src={product.thumbnail} alt={product.brand}
      className="card-img-top img-thumbnail"  
      style={{width: '20rem', height: '12rem'}}/>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-body-secondary">{limitedDescription}...</p>
      </div>
      {/* <div className="card-body">
        <Link to='/' className="card-link">Card link</Link>
        <Link to='/' className="card-link">Another link</Link>
      </div> */}
    </div>
  )
}

export default Products
