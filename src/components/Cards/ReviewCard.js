import React from 'react';
import Ratings from 'react-ratings-declarative';

export default function ReviewCard({ review }) {
  return (
    <div>
        <h5>Review: {review.description}</h5>
        <Ratings
          rating={review.rating}
          widgetDimensions="40px"
          widgetSpacings="15px"
        >
          <Ratings.Widget widgetRatedColor="gold" />
          <Ratings.Widget widgetRatedColor="gold" />
          <Ratings.Widget widgetRatedColor="gold" />
          <Ratings.Widget widgetRatedColor="gold" />
          <Ratings.Widget widgetRatedColor="gold"/>
        </Ratings>
    </div>
  );
}
