import React, { Component } from 'react';


export class PriceForm extends Component {
    render() {
        // let res = this.menu.value 
        return (
            <div>
            <select ref = "Price" onChange={e => this.props.priceFilter(e.target.value)}>
            <option selected={true} disabled={true} >Price</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            </select>
            </div>
        );
    }
}

export default PriceForm;