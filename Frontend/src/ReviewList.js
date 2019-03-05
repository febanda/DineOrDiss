import React, { Component } from 'react';
import {ReviewCard} from './views/ReviewCard'

export class ReviewList extends Component {
    render() {
        return (
            <div>
                {this.props.reviews.map(review => {
                    return <ReviewCard key={review.id} selectedReview={review}/>
                })}
            </div>
        );
    }
}

export default ReviewList;