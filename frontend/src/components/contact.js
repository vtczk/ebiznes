import React, { Component } from "react";


import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/font-awesome.css';

import '../css/flex-slider.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/style.css';
import '../css/themify-icons.css';
import '../css/reset.css';


export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: {
                name: "",
                email: "",
                subject: "",
                message: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        fetch("http://localhost:9000/contact/" + this.state.contact.email, {
            mode: 'cors',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: this.state.contact })
        }).catch(err => console.log(err))
    }

    handleChange(event) {
        let contact = { ...this.state.contact };
        contact[event.target.name] = event.target.value;
        this.setState({contact:contact})

    }


    render() {
        return (

            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <br /> <br />
                        <h1 class="text-uppercase">Contact Me</h1>
                        <hr />
                        <p class="lead">Have questions or comments?</p>
                        <br /> <br />
                        <div id="alert"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <form action="" method="post" id="contact-form">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="name" class="sr-only">Name</label>
                                        <input type="text" onChange={e => this.handleChange(e)} name="name" class="form-control input-lg" placeholder="Name" value={this.state.contact.name} />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="email" class="sr-only">Email</label>
                                        <input type="email" onChange={e => this.handleChange(e)} name="email" class="form-control input-lg" id="email" placeholder="Email" value={this.state.contact.email} />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="subject" class="sr-only">Subject</label>
                                        <input type="text" class="form-control input-lg" id="subject" onChange={e => this.handleChange(e)} name="subject" placeholder="Subject" value={this.state.contact.subject} />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label for="message" class="sr-only">Message</label>
                                        <textarea class="form-control input-lg" rows="8" id="message" onChange={e => this.handleChange(e)} name="message" placeholder="Message" value={this.state.contact.message}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <button type="submit" onClick={() => this.sendMessage()} class="btn btn-default btn-lg btn-block" id="send" data-loading-text="Sending...">Send message</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}




