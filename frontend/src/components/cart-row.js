import React, {Component} from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';
import {GlobalContext} from "./global-context";


export default class CartRow extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        }

    }


    incrementQuanity() {
        this.setState((prevState, props) => {
            return ({
                quantity: prevState.quantity + 1
            })
        }, () => this.props.setPrice(this.props.product.id, this.totalPrice()));
    }

    decrementQuanity() {
        this.setState((prevState, props) => {
            let next;
            if ((prevState.quantity - 1) <= 0) {
                next = 1;
            } else {
                next = prevState.quantity - 1;
            }
            return ({
                quantity: next
            })

        }, () => this.props.setPrice(this.props.product.id, this.totalPrice()));
    }


    totalPrice() {
        return (this.state.quantity * this.props.product.price).toFixed(2)
    }

    delete() {
        console.log(this.context);
        this.context.deleteFromCart(this.props.product);
        window.location.reload()
    }

    render() {
        return (

            <tr>
                <td className="image" data-title="No"><img src={this.props.product.image} alt="#"/></td>
                <td className="product-des" data-title="Description">
                    <p className="product-name"><a
                        href={"/products/" + this.props.product.id}>{this.props.product.name}</a></p>
                </td>
                <td className="price" data-title="Price"><span>${this.props.product.price} </span></td>
                <td className="qty" data-title="Qty">
                    <div className="input-group">
                        <div className="button minus">
                            <button type="button" className="btn btn-primary btn-number"
                                    onClick={() => this.decrementQuanity()} data-type="minus"
                                    data-field="quant[1]">
                                <i className="ti-minus"></i>
                            </button>
                        </div>
                        <input type="text" name="quant[1]" className="input-number" data-min="1" data-max="100"
                               value={this.state.quantity}/>
                        <div className="button plus">
                            <button type="button" className="btn btn-primary btn-number" data-type="plus"
                                    data-field="quant[1]" onClick={() => this.incrementQuanity()}>
                                <i className="ti-plus"></i>
                            </button>
                        </div>
                    </div>

                </td>
                <td className="total-amount" data-title="Total"><span>${this.totalPrice()}</span></td>
                <td className="action" data-title="Remove"><a><i className="ti-trash remove-icon"
                                                                 onClick={() => this.delete()}></i></a></td>
            </tr>
        );
    }
}


