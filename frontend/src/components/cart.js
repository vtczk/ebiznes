import React from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';

import CartRow from "./cart-row";
import {GlobalContext} from "./global-context";

class Cart extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            prices: {}
        };
        this.totalPrice = this.totalPrice.bind(this);
        this.setPrice = this.setPrice.bind(this);
    }

    componentDidMount() {
        this.setState({
            products: this.context.cart
        }, () => {
            console.log("product" +this.state.products);
            let prices = {};
            this.state.products.map(product =>
                prices[product.id] = parseFloat(product.price)
            );
            this.setState({prices: prices})
        })
        ;

    }

    setPrice(productId, price) {
        console.log("STATE CHANGED ");
        console.log(this.state.prices);
        let currentPrices = this.state.prices;
        currentPrices[productId] = parseFloat(price);
        console.log(currentPrices);
        this.setState({
                prices: currentPrices
            }
        );
        this.context.setPrice(this.totalPrice());

    }

    totalPrice() {
        console.log("pricses  " + Object.values(this.state.prices).map(value => parseFloat(value).toFixed(2)));
        return Object.values(this.state.prices).reduce((a, b) => (a + b), 0).toFixed(2)
    }

    render() {
        return (

            <div>
                <div className="breadcrumbs">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="bread-inner">
                                    <ul className="bread-list">
                                        <li><a href="index1.html">Home<i className="ti-arrow-right"></i></a></li>
                                        <li className="active"><a href="blog-single.html">Cart</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shopping-cart section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">

                                <table className="table shopping-summery">
                                    <thead>
                                    <tr className="main-hading">
                                        <th>PRODUCT</th>
                                        <th>NAME</th>
                                        <th className="text-center">UNIT PRICE</th>
                                        <th className="text-center">QUANTITY</th>
                                        <th className="text-center">TOTAL</th>
                                        <th className="text-center"><i className="ti-trash remove-icon" ></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.products.map(product => <CartRow product={product}
                                                                                 setPrice={this.setPrice}/>)}

                                    {/*<CartRow/>*/}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">

                                <div className="total-amount">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-5 col-12">
                                            <div className="left">

                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-7 col-12">
                                            <div className="right">
                                                <ul>
                                                    <li>Cart Subtotal<span>${this.totalPrice()}</span></li>
                                                    <li>Shipping<span>Free</span></li>

                                                    <li className="last">You Pay<span>${this.totalPrice()}</span></li>
                                                </ul>
                                                <div className="button5">
                                                    <a href="/cart/checkout" className="btn">Checkout</a>
                                                    <a href="/categories/1" className="btn">Continue shopping</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;


