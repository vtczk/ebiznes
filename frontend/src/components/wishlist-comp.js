import React, {Component} from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';

import Row from "./wishlist-row-comp";
import {GlobalContext} from "./global-context";
import CategoriesSidebar from "./categories-sidebar";

class WishlistComp extends Component {

    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {

        fetch("http://localhost:9000/favourites",
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    'X-Auth-Token':this.context.user
                }
            })
            .then(result => result.json())
            .then(data => {
                this.setState({
                    products: data
                });
                console.log(data)
            })
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
                                            <div className="row">
                                                <div className="col-12">
                                                    <table className="table shopping-summery">
                                                        <thead>
                                                        <tr className="main-hading">
                                                            <th>PRODUCT</th>
                                                            <th>NAME</th>
                                                            <th className="text-center">UNIT PRICE</th>
                                                            <th className="text-center">STOCK</th>
                                                            <th className="text-center">ADD ITEM</th>
                                                            <th className="text-center"><i
                                                                className="ti-trash remove-icon"></i></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.products.map(product => <Row product={product}/>)}

                                                        </tbody>
                                                    </table>
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

export default WishlistComp;


