import React, {Component} from "react";

import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';
import '../css/buttons.css'
import {GlobalContext} from "./global-context";
import {withRouter} from "react-router-dom";


class Login extends Component {

    static contextType = GlobalContext;

    constructor(props,) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.authenticate = this.authenticate.bind(this);
        this.socialAuthenticate = this.socialAuthenticate.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    componentDidMount() {
        if (this.context.user !== null) {
            this.props.history.push("/")
        } else {
            console.log("elseeee ");
            console.log(this.context.user)
        }
    }

    authenticate() {
        fetch("http://localhost:9000/auth/login",
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(result => result.json())
            .then(data => {
                this.context.setUser(data.token);
                this.props.history.push("/")
            })
    }

    socialAuthenticate(provider) {
        window.location = 'http://localhost:9000/auth/provider/' + provider;
    }

    render() {
        return (

            <section className="shop checkout section">
                <div className="container">

                    <div className="col-lg-8 col-12">
                        <div className="login">
                            <h2>Sign In</h2>
                            <p>Sign In to our page</p>
                            <div className=" login col-lg-6 col-md-6 col-12">
                                <div className="form-group ">
                                    <div className="logindetails">
                                        <label>Email<span>*</span></label>
                                        <input onChange={event => this.handleChange(event)} type="text" name="email"
                                               placeholder="Email" required="required"/>
                                    </div>
                                </div>
                            </div>
                            <div className=" login col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <label>Password<span>*</span></label>
                                    <input onChange={event => this.handleChange(event)} type="password" name="password"
                                           placeholder="Password" required="required"/>
                                </div>
                                <div className="single-widget get-button sign">
                                    <div className="content">
                                        <div className="button">
                                            <a onClick={() => this.socialAuthenticate("google")} className="btn">Sign
                                                In</a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <a onClick={() => this.socialAuthenticate("facebook")}> <i
                                            className="fa fa-facebook-official fa-3x" aria-hidden="true"></i></a>
                                        <a onClick={() => this.socialAuthenticate("google")}><i
                                            className="fa fa-google-plus-square fa-3x" aria-hidden="true"></i></a>
                                    </div>
                                </div>

                                <a href="#" className="attention_color trans_color">Dont't have an account? Register
                                    here!</a><br/>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
            ;
    }
}

export default withRouter(Login)
