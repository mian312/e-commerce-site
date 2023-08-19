import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function ProductDetails({ product }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className='link-underline-dark' scope="col">Product Variable</th>
                    <th className='link-underline-dark' scope="col">Values</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Product id</th>
                    <td>{product.id}</td>
                </tr>
                <tr>
                    <th scope="row">Product Category</th>
                    <td >{product.category}</td>
                </tr>
                <tr>
                    <th scope="row">Product Brand</th>
                    <td>{product.brand}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProductDetails
