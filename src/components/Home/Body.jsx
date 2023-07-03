import React, { useEffect, useState } from 'react'
import Deals from './Deals'
import Products from './Products';
import BasicData from '../../Data/BasicData';
import Footer from './Footer';



function Body() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const fetchedProducts = await BasicData();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchProducts();
    }, []);


    return (
        <div className='bg-body-secondary'>
            <div style={{ top: "0", left: "0", width: '100%', height: '50vh' }}>
                <Deals />
            </div>
            <div className="container text-center my-4">
                <div className="row">
                    {products.map((product) => {
                        return <div className='col'>
                            <Products key={product.id} product={product} />
                        </div>
                    })}
                </div>
            </div>
            <div style={{ top: "0", left: "0", width: '100%', height: '50vh' }}>
                <Footer />
            </div>
        </div>

    )
}

export default Body
