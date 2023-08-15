import React, { useEffect, useReducer } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../../utils'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import ProductList from '../ProductScreen/MultipleProduct/ProductList';
import Filter from './SearchComponents/Filter';
import Loader from '../Loader';
import Toast from './SearchComponents/Toast';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function Search() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const brand = sp.get('brand') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/products/search?page=${page}&query=${query}&brand=${brand}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
        toast.error(getError(err));
      }
    };
    fetchData();
    console.log(products)
  }, [brand, error, order, page, price, query, rating]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filerBrand = filter.brand || brand;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?brand=${filerBrand}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  const removeAllFilter = () => {
    navigate(`/search?query=${query}`)
  }

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>

      <nav className='d-flex mx-5 my-2'>
        <p className='text-bold fs-4 mx-2'>Applied filters: </p>
        <div className='d-flex'>
          {rating !== 'all' && <Toast message={`Rating ${rating} and Up`} />}
          {price !== 'all' && <Toast message={`Price range $${price}`} />}
          {order === 'lowest' && <Toast message={'Price: Low to High'} />}
          {order === 'highest' && <Toast message={'Price: High to Low'} />}
          {order === 'toprated' && <Toast message={'Top Rated'} />}
        </div>
        <button type='button' className="btn-close fs-4" onClick={removeAllFilter} />
      </nav>

      <div className='my-4'>
        {products?.length === 0 && <h1 className='text-center my-auto text-danger'>No Product Found</h1>}
        {loading ? <div className='text-center'> <Loader /> </div>
          : <div className='container'>
            {products?.map((product) => (
              <div className='w-100'>
                <ProductList product={product} />
              </div>
            ))}
          </div>
        }

        <nav className='float-end mx-2 sticky-bottom z-3' >
          <Filter />
        </nav>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item d-flex z-3">
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                className={`page-link ${x == page - 1 ? 'active' : ''}`}
                to={getFilterUrl({ page: x + 1 })}
              >
                {x + 1}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
      <div>

      </div>

    </div>
  )
}

export default Search;
