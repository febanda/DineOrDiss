import React, { Component } from 'react';

export class ReviewCard extends Component {
    render() {
        let review = this.props.selectedReview
        return (
            <div>
                <li>{review.text}</li>
            </div>
        );
    }
}

export default ReviewCard;