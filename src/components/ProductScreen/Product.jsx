import React from 'react'
import { useParams } from 'react-router-dom'

function Product() {
const params = useParams();
const { productId } = params

  return (
    <div>
      {productId}
    </div>
  )
}

export default Product
