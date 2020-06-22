import React, {Component} from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


export default class ProductDesc extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="description">
                    <p>{this.props.value}</p>
                </div>
            </div>

        );
    }
}


