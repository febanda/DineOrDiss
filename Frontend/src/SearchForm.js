import React, { Component } from 'react';

export class SearchForm extends Component {
    render() {
        return (
            <div className="ui form">
                <div className="ui input">
                <input type="text" placeholder="search" onChange={e => this.props.handleSearch(e.target.value)} />
                </div>

            </div>
        );
    }
}

export default SearchForm;