import React, { useEffect, useState } from 'react'
import Deals from './Deals'
import ProductGroup from '../ProductScreen/MultipleProduct/ProductGroup';
import Footer from './Footer';
import Loader from '../Loader';
import 'bootstrap/dist/css/bootstrap.min.css'
import BasicData from '../../Data/BasicData';
import { Helmet } from 'react-helmet-async';



function Body() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const fetchedProducts = await BasicData();
                setProducts(fetchedProducts);
                setLoading(false)
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchProducts();
    }, []);


    return (
        <div className='bg-body-secondary'>
            <Helmet>
<title>E-amazon</title>
            </Helmet>
            <div style={{ top: "0", left: "0", width: '100%', height: '50vh' }}>
                <Deals />
            </div>
            <div className="container text-center my-4">
                {loading ? <Loader />
                    : <div className="row">
                        {
                            products.map((product) => {
                                return <div key={product.id} className='col'>
                                    <ProductGroup product={product} />
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            <div style={{ top: "0", left: "0", width: '100%', height: '50vh' }}>
                <Footer />
            </div>
        </div>

    )
}

export default Body
