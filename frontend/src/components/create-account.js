import React, {Component} from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


export default class CreateAccount extends Component {
    render() {
        return (
            <section className="shop checkout section">
                <div className="container">
                    <div className=" create col-lg-8 col-12">
                        <div className="create">
                            <h2 className="h2create">Create</h2>
                            <p className="h2create">Sign In to our page</p>

                            <form className="form" method="post" action="#">
                                <div className="row">
                                    <div className=" create col-lg-6 col-md-6 col-12">
                                        <div className="form-group ">
                                            <div className="logindetails">
                                                <label>Username<span>*</span></label>
                                                <input type="text" name="name" placeholder="" required="required"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" create col-lg-6 col-md-6 col-12">
                                        <div className="form-group ">
                                            <div className="logindetails">
                                                <label>Email<span>*</span></label>
                                                <input type="text" name="name" placeholder="" required="required"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" create col-lg-6 col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Password<span>*</span></label>
                                            <input type="password" name="name" placeholder="" required="required"/>
                                        </div>
                                    </div>
                                    <div className=" create col-lg-6 col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Repeat password<span>*</span></label>
                                            <input type="password" name="name" placeholder="" required="required"/>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="attention_color trans_color">Already have an account? Sign In
                                    here!</a><br/>
                                <br/>
                                <div className="single-widget get-button create">
                                    <div className="content">
                                        <div className="button">
                                            <a href="#" className="btn">Create</a>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </section>

        );
    }
}


