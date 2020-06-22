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


export default class AddReview extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            placeholder: "Enter your review here...",
            review: "",
            stars: 5.0,
            product: this.props.product,
        }
        ;
        this.changeText = this.changeText.bind(this);
        this.cancel = this.cancel.bind(this);
        this.publishReview = this.publishReview.bind(this);
    }

    changeText(event) {
        this.setState({review: event.target.value});
    }

    cancel() {
        this.setState({review: ""})
    }


    handleChange(event) {
        // let opinion = { ...this.state.opinion };
        // opinion[event.target.name] = event.target.value;
        this.setState({stars: event.target.value})


    }

    publishReview() {
        fetch("http://localhost:9000/opinion",
            {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': this.context.user
                },
                method: 'POST',
                body: JSON.stringify({
                    "review": this.state.review,
                    "stars": parseInt(this.state.stars, 10),
                    "product": this.state.product
                })
            }).then(
            ()=>this.props.updateRating()
        )
            .catch(err => console.log(err));

    }


    render() {
        return (
            <div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="well well-sm">
                                <div className="row" id="post-review-box">
                                    <div className="col-md-12">
                                        <input id="ratings-hidden" name="rating" type="hidden"/>
                                        <textarea className="form-control animated" cols="50" id="new-review"
                                                  name="comment" value={this.state.text}
                                                  onChange={e => this.changeText(e)}
                                                  placeholder={this.state.placeholder}
                                                  rows="5"></textarea>
                                        <br/>

                                        <div className="rate text-right">
                                            <input type="radio" id="star5" name="rate" value="5"
                                                   onChange={e => this.handleChange(e)}/>
                                            <label htmlFor="star5" title="text">5 stars</label>
                                            <input type="radio" id="star4" name="rate" value="4"
                                                   onChange={e => this.handleChange(e)}/>
                                            <label htmlFor="star4" title="text">4 stars</label>
                                            <input type="radio" id="star3" name="rate" value="3"
                                                   onChange={e => this.handleChange(e)}/>
                                            <label unchecked htmlFor="star3" title="text">3 stars</label>
                                            <input type="radio" id="star2" name="rate" value="2"
                                                   onChange={e => this.handleChange(e)}/>
                                            <label htmlFor="star2" title="text">2 stars</label>
                                            <input type="radio" id="star1" name="rate" value="1"
                                                   onChange={e => this.handleChange(e)}/>
                                            <label htmlFor="star1" title="text">1 star</label>
                                        </div>

                                        {/*<div className="star text-right">*/}
                                        {/*<span className="fa fa-star "></span>*/}
                                        {/*<span className="fa fa-star "></span>*/}
                                        {/*<span className="fa fa-star "></span>*/}
                                        {/*<span className="fa fa-star"></span>*/}
                                        {/*<span className="fa fa-star"></span>*/}
                                        {/*</div>*/}
                                        <div className="text-right">
                                            <a className="btn btn-danger btn-sm" id="close-review-box"
                                               onClick={this.cancel}>
                                                <span className="glyphicon glyphicon-remove"></span>Cancel</a>
                                            <button className="btn  btn-lg" onClick={this.publishReview}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}



