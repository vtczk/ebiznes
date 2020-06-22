import React, {Component} from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';
import {addToWishlist} from "./wishlist-handler";
import {GlobalContext} from "./global-context";


export default class ProductListElement extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props)
    }

    addToWishListHandler() {
        addToWishlist(this.context.user, this.props.product.id);
    }

    render() {
        return (

            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                <div className="single-product">
                    <div className="product-img">
                        <a href={"/product/" + this.props.product.id}>
                            <img className="default-img" src={this.props.product.image} alt="#"/>
                            <img className="hover-img" src={this.props.product.image} alt="#"/>
                            <span className="new">New</span>
                        </a>
                        <div className="button-head">
                            <div className="product-action">
                                <a data-toggle="modal" data-target="#exampleModal" title="Quick View"
                                   href={"/product" + this.props.product.id}>
                                    <i className=" ti-eye"></i><span>Quick Shop</span></a>
                                <a title="Wishlist" href="/wishlist" onClick={() => this.addToWishListHandler()}>
                                    <i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                            </div>
                            <div className="product-action-2">
                                <a title="Add to cart" href="#">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="product-content">
                        <h3><a href={"/product/" + this.props.product.id}>{this.props.product.name}</a></h3>
                        <div className="product-price">
                            <span>${this.props.product.price}</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


