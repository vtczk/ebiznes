import React, {Component} from "react";
import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';
import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


export default class Footer extends Component {
    render() {
        return (
            <div>
                <section className="shop-services section home">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">

                                <div className="single-service">
                                    <i className="ti-rocket"></i>
                                    <h4>Free shiping</h4>
                                    <p>Orders over $100</p>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-6 col-12">

                                <div className="single-service">
                                    <i className="ti-reload"></i>
                                    <h4>Free Return</h4>
                                    <p>Within 30 days returns</p>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-6 col-12">

                                <div className="single-service">
                                    <i className="ti-lock"></i>
                                    <h4>Sucure Payment</h4>
                                    <p>100% secure payment</p>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-6 col-12">

                                <div className="single-service">
                                    <i className="ti-tag"></i>
                                    <h4>Best Peice</h4>
                                    <p>Guaranteed price</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer">

                    <div className="footer-top section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-md-6 col-12">

                                    <div className="single-footer about">
                                        <div className="logo">
                                            SHOP
                                        </div>
                                        <p className="text">Praesent dapibus, neque id cursus ucibus, tortor neque
                                            egestas augue, magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                                            tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
                                        <p className="call">Got Question? Call us 24/7<span><a href="tel:123456789">+0123 456 789</a></span>
                                        </p>
                                    </div>

                                </div>
                                <div className="col-lg-2 col-md-6 col-12">

                                    <div className="single-footer links">
                                        <h4>Information</h4>
                                        <ul>
                                            <li><a href="#">About Us</a></li>
                                            <li><a href="#">Faq</a></li>
                                            <li><a href="#">Terms & Conditions</a></li>
                                            <li><a href="#">Contact Us</a></li>
                                            <li><a href="#">Help</a></li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-lg-2 col-md-6 col-12">

                                    <div className="single-footer links">
                                        <h4>Customer Service</h4>
                                        <ul>
                                            <li><a href="#">Payment Methods</a></li>
                                            <li><a href="#">Money-back</a></li>
                                            <li><a href="#">Returns</a></li>
                                            <li><a href="#">Shipping</a></li>
                                            <li><a href="#">Privacy Policy</a></li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-lg-3 col-md-6 col-12">

                                    <div className="single-footer social">
                                        <h4>Get In Touch</h4>

                                        <div className="contact">
                                            <ul>
                                                <li>NO. 342 - London Oxford Street.</li>
                                                <li>012 United Kingdom.</li>
                                                <li>info@eshop.com</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}


