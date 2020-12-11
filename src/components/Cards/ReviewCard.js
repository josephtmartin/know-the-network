import React from 'react';

export default function ReviewCard({ review }) {
  return (
          <div>
              <h5>Note/Review: {review.description}</h5>
              <h5>Rating: {review.rating}</h5>
          </div>
  );
}
