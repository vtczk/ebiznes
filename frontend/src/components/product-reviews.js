import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


export default class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state={
            opinion:[{
                review : "bullshit",
                userName:"bullshit"
            }],
            test:"teeest"
        }
    }


    componentDidMount() {
        fetch("http://localhost:9000/opinion/" + this.props.id,
            {
                mode: 'cors',
                method: 'GET'
            })
            .then(result => result.json())
            .then(data =>{
                console.log(data);
                this.setState({
                opinion: data
            })});
    }

    singleReview(opinion){
        return(

        <div className="media mt-30">

            {/*<div className="media-left">*/}
                {/*<a href="#"><img src="https://via.placeholder.com/80x80" alt="#"/></a>*/}
            {/*</div>*/}

            <div className="media-body">
                <div className="row">
                <div className="clearfix">
                    <div className="name-commenter pull-left mb-0">
                        <h6 className="media-heading mb-0"  > {opinion.userName} </h6>

                    </div>

                </div>
                <p className="mb-0">{opinion.review}</p>
            </div>
                <br/>

            </div>
        </div>

    )

    }
    render() {
        return (

            <div>
                <br/>
                <div className="reviews-tab-desc">
                    {this.state.opinion.map(single => this.singleReview(single))}

                </div>

                <hr/>
            </div>

        );
    }
}



