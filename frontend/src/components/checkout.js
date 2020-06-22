import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';
import {GlobalContext} from "./global-context";
import Modal from "./payment-modal"




export default class Checkout extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            modal: "",

        }
    }


    modalOpen(e) {
        this.setState({ modal: true });
        e.preventDefault();

    }

    modalClose() {
        this.setState({
            modalInputName: "",
            modal: false
        });
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
                                        <li><a href="/">Home<i className="ti-arrow-right"></i></a></li>
                                        <li className="active"><a href="/cart/checkout">Checkout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="shop checkout section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <div className="checkout-form">
                                    <h2>Make Your Checkout Here</h2>
                                    <p>Please register in order to checkout more quickly</p>

                                    <form className="form" method="post" action="#">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>First Name<span>*</span></label>
                                                    <input type="text" name="name" placeholder="" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Last Name<span>*</span></label>
                                                    <input type="text" name="name" placeholder="" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Email Address<span>*</span></label>
                                                    <input type="email" name="email" placeholder="" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Phone Number<span>*</span></label>
                                                    <input type="number" name="number" placeholder="" required="required" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Address<span>*</span></label>
                                                    <input type="text" name="text" placeholder="" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Address 2<span></span></label>
                                                    <input type="text" name="text" placeholder="" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>ZIP<span>*</span><span></span></label>
                                                    <input type="text" name="text" placeholder="" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Country<span>*</span><span></span></label>
                                                    <input type="text" name="text" placeholder="" required="required" />
                                                </div>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="order-details">

                                    <div className="single-widget">
                                        <h2>CART  TOTALS</h2>
                                        <div className="content">
                                            <ul>
                                                <li>Sub Total<span>{this.context.getCurrentPrice()}</span></li>
                                                <li>(+) Shipping<span>FREE</span></li>
                                                <li className="last">Total<span>{this.context.getCurrentPrice()}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="single-widget">
                                        <h2>Payments</h2>
                                        <div className="content">

                                            <div className="checkbox2">

                                                <label className="checkbox-inline" ><input  type="checkbox" /> Credit card</label>
                                                <label className="checkbox-inline" ><input  type="checkbox" /> Debit card</label>
                                                <label className="checkbox-inline" ><input  type="checkbox" /> PayPal</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Full name on card<span>*</span><span></span></label>
                                                <input type="text" name="text" placeholder="" required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Credit card number<span>*</span><span></span></label>
                                                <input type="text" name="text" placeholder="" required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Expiration<span>*</span><span></span></label>
                                                <input type="text" name="text" placeholder="" required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>CVV<span>*</span><span></span></label>
                                                <input type="text" name="text" placeholder="" required="required" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />


                                    <div className="single-widget get-button">
                                        <div className="content">
                                            <div className="button">
                                                <a onClick={e=> this.modalOpen(e)} href="" className="btn" >Place order</a>
                                                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)} />

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


