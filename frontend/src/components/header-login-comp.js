import React, {Component} from "react";

import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header shop">
                <div className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-12">
                                <div className="top-left">
                                    <ul className="list-main">
                                        <li><i className="ti-headphone-alt"></i> xxxxxxxxxxxxxxx</li>
                                        <li><i className="ti-email"></i> xxxxxxxxxxxxxx</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12 col-12">

                                <div className="right-content">
                                    <ul className="list-main">

                                        <li><i className="ti-power-off"></i><a href="login.html#">Login</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-12">

                                <div className="logo">
                                    <a href="#">SHOP</a>
                                </div>

                                <div className="search-top">
                                    <div className="top-search"><a href="#0"><i className="ti-search"></i></a></div>

                                    <div className="search-top">
                                        <form className="search-form">
                                            <input type="text" placeholder="Search here..." name="search"/>
                                            <button value="search" type="submit"><i className="ti-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <div className="mobile-nav"></div>
                            </div>
                            <div className="col-lg-8 col-md-7 col-12">
                                <div className="search-bar-top">
                                    <div className="search-bar">
                                        <form>
                                            <input name="search" placeholder="Search Products Here....." type="search"/>
                                            <button className="btnn"><i className="ti-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-12">
                                <div className="right-bar">
                                    <div className="sinlge-bar">
                                        <a href="#" className="single-icon"><i className="fa fa-user-circle-o"
                                                                               aria-hidden="true"></i></a>
                                    </div>
                                    <div className="sinlge-bar shopping">
                                        <a href="#" className="single-icon"><i className="ti-bag"></i> <span
                                            className="total-count">X</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </header>
        );
    }
}


