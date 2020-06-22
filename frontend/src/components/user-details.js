import React from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';

function UserDetails() {

    return (

        <div>

            <section className="product-area shop-sidebar shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="shop-sidebar">

                                <div className="single-widget category">
                                    <h3 className="title">My account</h3>
                                    <ul className="categor-list">
                                        <li><a href="#">My data</a></li>
                                        <li><a href="#">Logout</a></li>

                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="shopping-cart">
                                    <div className="container">

                                        <div className="shop-section mb-80">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="product-pos">
                                                        <div className="col-md-9 col-xs-12">
                                                            <div className="single-product-area mb-80">
                                                                <div className="row">
                                                                    <div className="single-product-info">

                                                                        <section className="shop checkout section">

                                                                            <div className="col-lg-12 col-12">
                                                                                <div className="checkout-form">
                                                                                    <h2>My data</h2>
                                                                                    <br/>
                                                                                    <hr/>

                                                                                    <form className="form" method="post"
                                                                                          action="#">
                                                                                        <div className="row">
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>First
                                                                                                        Name<span>*</span></label>
                                                                                                    <input type="text"
                                                                                                           name="name"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Last
                                                                                                        Name<span>*</span></label>
                                                                                                    <input type="text"
                                                                                                           name="name"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Email Address<span>*</span></label>
                                                                                                    <input type="email"
                                                                                                           name="email"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Phone
                                                                                                        Number<span>*</span></label>
                                                                                                    <input type="number"
                                                                                                           name="number"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Address<span>*</span></label>
                                                                                                    <input type="text"
                                                                                                           name="text"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Address
                                                                                                        2<span></span></label>
                                                                                                    <input type="text"
                                                                                                           name="text"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>ZIP<span>*</span><span></span></label>
                                                                                                    <input type="text"
                                                                                                           name="text"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-lg-6 col-md-6 col-12">
                                                                                                <div className="form-group">
                                                                                                    <label>Country<span>*</span><span></span></label>
                                                                                                    <input type="text"
                                                                                                           name="text"
                                                                                                           placeholder=""
                                                                                                           required="required"/>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </form>

                                                                                </div>

                                                                            </div>
                                                                        </section>

                                                                        <hr/>


                                                                        <div>
                                                                            <div className="single-widget get-button sign">
                                                                                <div className="content">
                                                                                    <div className="button">

                                                                                        <a href="#" className="btn">Edit</a>
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
                                            </div>
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

export default UserDetails;

