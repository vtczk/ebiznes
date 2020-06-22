import React, {Component} from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';
import ProductListElement from "./product-comp"
import RecentPost from "./recent-post-comp";

class MainBodyComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categoryId: this.props.id
        }
    }
    componentDidMount() {
        console.log(this.state.categoryId);
        fetch("http://localhost:9000/products/category/" + this.state.categoryId,
            {
                mode: 'cors',
                method: 'GET'
            })
            .then(result => result.json())
            .then(data => this.setState({
                products: data
            }));
    }
    render() {
        return (
            <div>
                <section className="product-area shop-sidebar shop section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-12">
                                <div className="shop-sidebar">
                                    <div className="single-widget recent-post">
                                        <h3 className="title">Top picks in category</h3>
                                        {this.state.products.map(product => <RecentPost product={product}/>)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-12">
                                <div className="row">
                                    {this.state.products.map(product => <ProductListElement product={product}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <br/> <br/> <br/>
                <br/> <br/> <br/>
            </div>
        );
    }
}

export default MainBodyComp;




