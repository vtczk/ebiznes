import React, { Component } from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';
import {GlobalContext} from "./global-context";
import {removeFromWishlist} from "./wishlist-handler"




export default class WishlistRowComp extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);

    }
    addToCart(){
        console.log("entry");
        console.log(this.props.product);
        this.context.addToCart(this.props.product)
    };

    remove(){
        removeFromWishlist(this.context.user,this.props.product.id);
    }
    render() {
        return (

            <tr>
                <td className="image" data-title="No"><img src={this.props.product.image}  /></td>
                <td className="product-des" data-title="Description">
                    <p className="product-name"><a href={"/product/"+this.props.product.id}>{this.props.product.name}</a></p>
                </td>
                <td className="price" data-title="Price"><span>${this.props.product.price} </span></td>
                <td className="total-amount" data-title="Stock"><span>In stock</span></td>
                <td className="qty" data-title="Qty">
                    <div className="input-group">
                        
                        <button type="text" name="quant[1]" className="input-number" onClick={()=> this.addToCart()}>Add to cart</button>
                        
                    </div>

                </td>
                
                <td className="action" data-title="Remove"><a href="/wishlist" onClick={()=>this.remove()}><i className="ti-trash remove-icon"></i></a></td>
            </tr>

        )
    }
}


