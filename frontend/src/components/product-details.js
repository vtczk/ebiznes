import React from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


import Description from "./product-desc";
import Reviews from "./product-reviews"
import AddReview from "./add-review"
import {GlobalContext} from "./global-context";
import {withRouter} from 'react-router-dom';
import CategoriesSidebar from "./categories-sidebar";
import {addToWishlist} from "./wishlist-handler";


class ProductDetails extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            section: 1,
            product: {
                "name": "test",
                "price": 3,
                "description": "test",
                "id": 1,
                "category": 1
            },
            rating: 0,
            categories: []
        };
        this.setSection = this.setSection.bind(this);
        this.starRating = this.starRating.bind(this);
        this.updateRating = this.updateRating.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:9000/products/" + this.props.id,
            {
                mode: 'cors',
                method: 'GET'
            })
            .then(result => result.json())
            .then(data => this.setState({
                product: data
            }));

        this.updateRating();


    }

    updateRating() {
        fetch("http://localhost:9000/opinion/rating/" + this.props.id,
            {
                mode: 'cors',
                method: 'GET'
            })
            .then(result => result.json())
            .then(data => this.setState({
                selection:3,
                rating: data
            }));
    }

    getSection() {
        switch (this.state.section) {
            case 1:
                return <Description value={this.state.product.description}/>;
            case  2:
                return <AddReview updateRating={this.updateRating} product={this.state.product.id}/>;
            case 3:
                return <Reviews id={this.props.id}/>;
            default:
                return <Description/>;

        }
    }

    setSection(sectionNumber) {
        this.setState({section: sectionNumber})
    }

    productAvailable() {
        if (this.state.product.quantity > 0) {
            return (
                <a onClick={() => this.addToCart()}
                   className="btn">&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Buy Now &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; </a>)
        } else {
            return (

                <a
                    className="btn">&nbsp;&nbsp; Out of stock&nbsp;&nbsp; </a>)
        }
    }

    starRating() {
        return (
            <div className="content">
                <ul className="reviews2">
                    {
                        this.starAmount()
                    }
                </ul>
            </div>
        )
    }

    starAmount() {
        let result = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= this.state.rating) {
                result.push(<span className="fa fa-star checked "></span>)

            }
            else {
                result.push(<span className="fa fa-star "></span>)
            }
        }
        return result
    }

    addToCart() {
        this.context.addToCart(this.state.product);
        this.props.history.push("/cart")
    }

    render() {
        return (
            <div>
                <section className="product-area shop-sidebar shop section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-12">
                                <div className="shop-sidebar">

                                    <CategoriesSidebar/>

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

                                                                        <div className="col-lg-4 col-md-6 col-12">
                                                                            <div className="product-img">
                                                                                <a href="product-details.html">
                                                                                    <img className="default-img"
                                                                                        // src="https://via.placeholder.com/550x750"
                                                                                         src={this.state.product.image}
                                                                                         alt="#"/>

                                                                                </a>

                                                                            </div>

                                                                        </div>

                                                                        <div className="col-md-7 col-sm-7 col-xs-12">
                                                                            <div className="single-product-info">
                                                                                <h3 className="text-black-1">{this.state.product.name} </h3>


                                                                                <hr/>

                                                                                <div
                                                                                    className="single-pro-color-rating reviews2">

                                                                                    <div
                                                                                        className="pro-rating sin-pro-rating f-right">

                                                                                    <span
                                                                                        className="text-black-5">Ratings</span>

                                                                                        {this.starRating()}
                                                                                    </div>
                                                                                </div>

                                                                                <hr/>

                                                                                <div
                                                                                    className="plus-minus-pro-action clearfix">
                                                                                    <div
                                                                                        className="sin-plus-minus f-left clearfix single-product-info">
                                                                                        <p className="single-product-info">Quantity</p>
                                                                                        <input type="text"
                                                                                               name="quant[1]"
                                                                                               className=" inputProduct input-number single-product-info"
                                                                                               data-min="1"
                                                                                               data-max="100"
                                                                                               defaultValue="1"/>


                                                                                    </div>
                                                                                    <div
                                                                                        className="sin-pro-action f-right">
                                                                                        <ul className="action-button">
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   title="Wishlist"
                                                                                                   tabIndex="0"><i
                                                                                                    className="zmdi zmdi-favorite"></i></a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   data-toggle="modal"
                                                                                                   data-target="#productModal"
                                                                                                   title="Quickview"
                                                                                                   tabIndex="0"><i
                                                                                                    className="zmdi zmdi-zoom-in"></i></a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   title="Compare"
                                                                                                   tabIndex="0"><i
                                                                                                    className="zmdi zmdi-refresh"></i></a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#"
                                                                                                   title="Add to cart"
                                                                                                   tabIndex="0"><i
                                                                                                    className="zmdi zmdi-shopping-cart-plus"></i></a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <hr/>

                                                                                <h3 className="pro-price">Price: {this.state.product.price}$</h3>

                                                                                <hr/>
                                                                                <div>

                                                                                    <div
                                                                                        className="single-widget get-button sign">
                                                                                        <div className="content">
                                                                                            <div className="button">
                                                                                                <a onClick={() => this.addToCart()}
                                                                                                   className="btn">&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Buy Now &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; </a>
                                                                                            </div>
                                                                                            <br/>
                                                                                            <div className="button">
                                                                                                <a href="/wishlist"
                                                                                                   onClick={() => addToWishlist(this.context.user, this.props.id)}
                                                                                                   className="btn">Add
                                                                                                    to wishlist</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-12">

                                                                            <hr/>
                                                                            <div className="single-product-tab">
                                                                                <ul className="reviews-tab mb-20">
                                                                                    <li><a
                                                                                        onClick={() => this.setSection(1)}>description</a>
                                                                                    </li>

                                                                                    <li><a
                                                                                        onClick={() => this.setSection(3)}>reviews</a>
                                                                                    </li>
                                                                                    <li><a
                                                                                        onClick={() => this.setSection(2)}>Add
                                                                                        review</a></li>
                                                                                </ul>
                                                                                <div className="tab-content">
                                                                                    {this.getSection()}
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
}

export default withRouter(ProductDetails);

