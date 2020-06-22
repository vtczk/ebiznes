import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
//import '../css/jquery-ui.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


export default class RecentPost extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

            <div className="single-post first">
                <div className="image">
                    <img src={this.props.product.image} alt="#"/>
                </div>
                <div className="content">
                    <h5><a href="#">{this.props.product.name}</a></h5>
                    <p className="price">${this.props.product.price}</p>
                    <ul className="reviews">
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li><i className="ti-star"></i></li>
                        <li><i className="ti-star"></i></li>
                    </ul>
                </div>
            </div>


        );
    }
}


