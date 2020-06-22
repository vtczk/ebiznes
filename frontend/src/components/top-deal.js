import {Component} from "react";
import React from "react";

export default class TopDeal extends Component {
    constructor(props) {
        super(props);


        this.image = this.image.bind(this);
        this.product = this.product.bind(this);
        this.display = this.display.bind(this);
        this.discountedPrice = this.discountedPrice.bind(this);
    }


    discountedPrice() {
        // console.log((parseFloat((this.props.product.price)) ));
        // console.log(typeof this.props.product.price );
        // console.log(typeof this.props.product.discount );
        return parseFloat((this.props.product.price * this.props.product.discount) / 100).toFixed(2)
    }

    product() {
        return (<div className="col-lg-6 col-12 padding-left">
            <div className="content">
                <div className="heading-block">
                    <p className="small-title">Deal of day</p>
                    <h3 className="title">{this.props.product.name}</h3>
                    <p className="text">{this.props.product.description} </p>
                    <h1 className="price">${this.discountedPrice()} <s>${this.props.product.price}</s></h1>
                </div>
            </div>
        </div>)
    }

    image() {
        return (<div className="col-lg-6 col-12 padding-right">
            <a href={"/product/" + this.props.product.id}>
                <div className="image">
                    <img src={this.props.product.image} alt="#"/>
                </div>
            </a>
        </div>)
    }

    display() {
        let list;
        if (this.props.even) {
            list = [this.image(), this.product()];
        } else {
            list = [this.product(), this.image()];
        }
        return list
    }

    render() {
        return <>
            <section className="cown-down">
                <div className="section-inner ">

                    <div className="container-fluid">
                        <div className="row">

                            {this.display()}


                        </div>
                    </div>

                </div>
            </section>
            <br/></>;
    }
}