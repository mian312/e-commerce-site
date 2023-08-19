import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'

const Star = ({ marked, starId, fraction }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      {marked ? '\u2605' : '\u2606'}
      {/* {fraction && <span className="star-fraction">{fraction}</span>} */}
    </span>
  );
};

const StarRating = ({ value, editable }) => {
  const [rating, setRating] = useState();

  const hoverOver = event => {
    if (editable) {
      let val = 0;
      if (event && event.target && event.target.getAttribute('data-star-id')) {
        val = event.target.getAttribute('data-star-id');
      }
    }
  };

  const handleClick = e => {
    if (editable) {
      const newRating = e.target.getAttribute('data-star-id') || rating;
      setRating(newRating);
    }
  };

  useEffect(() => {
    setRating(value);
  }, [value]);

  const renderStars = () => {
    const filledStars = Math.floor(rating);
    const fraction = rating - filledStars;

    return Array.from({ length: 5 }, (v, i) => {
      const starId = i + 1;
      let marked = false;

      if (filledStars >= starId) {
        marked = true;
      } else if (fraction > 0 && Math.ceil(fraction * 10) === starId) {
        marked = true;
      }

      return (
        <Star
          starId={starId}
          key={`star_${starId}`}
          marked={marked}
          fraction={marked && fraction > 0 ? fraction.toFixed(2) : null}
        />
      );
    });
  };

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={handleClick}
      onMouseOver={hoverOver}
    >
      {renderStars()}
    </div>
  );
};
  

export default StarRating;
