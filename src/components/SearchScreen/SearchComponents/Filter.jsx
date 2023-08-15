import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import StarRating from '../../StarRating';

const prices = [
    {
        name: 'All Price',
        value: 'all',
    },
    {
        name: '$1 to $50',
        value: '1-50',
    },
    {
        name: '$51 to $200',
        value: '51-200',
    },
    {
        name: '$201 to $1000',
        value: '201-1000',
    },
    {
        name: '$1001 to $2000',
        value: '1001-2000',
    },
    {
        name: '$2001 to $5000',
        value: '2001-5000',
    },
];

const ratings = [
    {
        name: '5stars',
        rating: 5,
    },

    {
        name: '4stars & up',
        rating: 4,
    },

    {
        name: '3stars & up',
        rating: 3,
    },

    {
        name: '2stars & up',
        rating: 2,
    },

    {
        name: '1stars & up',
        rating: 1,
    },
];

function Filter() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    const brand = sp.get('brand') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filerBrand = filter.brand || brand;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;
        return `/search?brand=${filerBrand}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    };

    return (
        <div>
            <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                <i className="bi bi-funnel-fill"></i>
            </button>

            <div className="offcanvas offcanvas-bottom h-50 w-100" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">Apply Filters</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body small">
                    <div className='row float-end m-4'>
                        <select class="col form-select text-center d-block"
                            aria-label="Sort By"
                            value={order}
                            onChange={(e) => {
                                navigate(getFilterUrl({ order: e.target.value }))
                            }}
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="lowest">Price: Low to High</option>
                            <option value="highest">Price: High to Low</option>
                            <option value="toprated">Avg. Customer Reviews</option>
                        </select>
                    </div>

                    <h4 className='row'>
                        <div className='col'>
                            {ratings.map((r) => (
                                <li className="d-flex" key={r.name}>
                                    <Link to={getFilterUrl({ rating: r.rating })} className={`link-underline-light d-flex`}>
                                        <StarRating value={r.rating} editable={false} /> &nbsp; {r.name}
                                    </Link>
                                </li>
                            ))}


                            {/* <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='5'
                                    onChange={(e) => {
                                        navigate(getFilterUrl({ rating: e.target.value }))
                                    }} />
                                <label class="form-check-label d-flex" for="flexRadioDefault1">
                                    <StarRating value={5} editable={false} /> &nbsp;
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='4'
                                    onChange={(e) => {
                                        navigate(getFilterUrl({ rating: e.target.value }))
                                    }} />
                                <label class="form-check-label d-flex" for="flexRadioDefault1">
                                    <StarRating value={4} editable={false} /> &nbsp; & up
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='3'
                                    onChange={(e) => {
                                        navigate(getFilterUrl({ rating: e.target.value }))
                                    }} />
                                <label class="form-check-label d-flex" for="flexRadioDefault1">
                                    <StarRating value={3} editable={false} /> &nbsp; & up
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='2'
                                    onChange={(e) => {
                                        navigate(getFilterUrl({ rating: e.target.value }))
                                    }} />
                                <label class="form-check-label d-flex" for="flexRadioDefault1">
                                    <StarRating value={2} editable={false} /> &nbsp; & up
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='1'
                                    onChange={(e) => {
                                        navigate(getFilterUrl({ rating: e.target.value }))
                                    }} />
                                <label class="form-check-label d-flex" for="flexRadioDefault1">
                                    <StarRating value={1} editable={false} /> &nbsp; & up
                                </label>
                            </div> */}
                        </div>
                        <div className="col">
                            {prices.map((p) => (
                                <li key={p.value}>
                                    <Link
                                        to={getFilterUrl({ price: p.value })}
                                        className={`p.value === price ? 'text-bold' : '' link-underline-light`}
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Filter
