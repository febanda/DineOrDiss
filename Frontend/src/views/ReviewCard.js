import React, { Component } from 'react';

export class ReviewCard extends Component {
    render() {
        let review = this.props.selectedReview
        return (
            <div>
                <p>{review.text}</p>
            </div>
        );
    }
}

export default ReviewCard;