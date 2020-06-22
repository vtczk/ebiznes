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
import fetchCategories from "./categories-handler";
import {withRouter} from "react-router-dom";

class Header extends Component {

    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            categories: [{name: "test"}],
            searchText: ""
        };
        this.expand = this.expand.bind(this);
        this.categories = this.categories.bind(this);
        this.categoryItem = this.categoryItem.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.logout = this.logout.bind(this);
    }

    expand() {
        let activity = !this.state.active;
        this.setState({active: activity})
    }


    componentDidMount() {
        fetchCategories().then(data => this.setState({
            categories: data
        }))
    }

    categories() {
        return (
            <ul className="main-category">
                {this.state.categories.map(category => this.categoryItem(category)
                )}
            </ul>
        )
    }

    categoryItem(category) {
        return (<li><a href={"/categories/" + category.id}>{category.name}</a></li>)
    }

    logout() {
        localStorage.clear();
        console.log("out");
        this.props.history.push("/");
    }

    loginHandler() {
        console.log("user " + this.context.user);
        if (this.context.user !== null) {
            return (<a onClick={() => this.logout()}>Logout</a>);

        } else {
            return (<a href="/login">Login</a>);
        }

    }

    handleChangeText(e) {
        this.setState({searchText: e.target.value})
    }

    search() {

        window.location.replace("/search/"+this.state.searchText);
        // fetch("http://localhost:9000/search/" + this.state.searchText)
        //     .then(response => response.json()).then(response => this.props.history.push("/product/" + response.id));

    };

    render() {
        return (

            <header className="header shop">

                <div className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-12">

                                <div className="top-left">
                                    <ul className="list-main">
                                        <li><i className="ti-headphone-alt"></i> +0123 456 789</li>
                                        <li><i className="ti-email"></i> e-shop@gmail.com</li>
                                    </ul>
                                </div>

                            </div>
                            <div className="col-lg-8 col-md-12 col-12">

                                <div className="right-content">
                                    <ul className="list-main">

                                        <li><i className="ti-power-off"></i> {this.loginHandler()}   </li>
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
                                    <a href="/">SHOP</a>
                                </div>

                                <div className="mobile-nav"></div>
                            </div>


                            <div className="col-lg-8 col-md-7 col-12">
                                <div className="search-bar-top">
                                    <div className="search-bar">

                                        <input name="search" placeholder="Search Products Here....."
                                               value={this.state.searchText} onChange={this.handleChangeText}
                                               type="search"/>
                                        <button className="btnn" onClick={() => this.search()}><i
                                            className="ti-search"></i></button>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-12">
                                <div className="right-bar">


                                    <div className="sinlge-bar">
                                        <a href="/user/details" className="single-icon"><i
                                            className="fa fa-user-circle-o"
                                            aria-hidden="true"></i></a>
                                    </div>
                                    <div className="sinlge-bar shopping">
                                        <a href="/cart" className="single-icon"><i className="ti-bag"></i> <span
                                            className="total-count">{this.context.cart.length > 0 ? this.context.cart.length : 'X'}</span></a>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-inner">
                    <div className="container">
                        <div className="cat-nav-head">
                            <div className="row">

                                <div className="col-lg-3">

                                    <div className="all-category">
                                        <h3 className="cat-heading" onClick={this.expand}><i className="fa fa-bars"
                                                                                             aria-hidden="true"></i>CATEGORIES
                                        </h3>

                                        {this.state.active && this.categories()

                                        }
                                    </div>

                                </div>
                                <div className="col-lg-9 col-12">
                                    <div className="menu-area">

                                        <nav className="navbar navbar-expand-lg">
                                            <div className="navbar-collapse">
                                                <div className="nav-inner">
                                                    <ul className="nav main-menu menu navbar-nav">
                                                        <li><a href="/">Top Deals</a></li>
                                                        <li><a href="/wishlist">Wishlist</a></li>
                                                        <li><a href="/contact">Contact Us</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
        );
    }
}


export default withRouter(Header)