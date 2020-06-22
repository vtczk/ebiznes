import React, { Component } from "react";
import '../css/style.css';



class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };


    }


    render() {
        let showHideClassName = this.props.show ? "modal d-block" : "modal d-none";
        return (

            <div className={showHideClassName}>
                <div className="modal-container">
                    {this.props.children}
                    <div class="module product_notification">
                        <div class="module_body">
                            <h2 class="title-left">Payment</h2>
                            <hr/>
                            <br/>
                        </div>
                        <div>Payment processed successfully </div>
                        <br/>
                        <button onClick={() => this.props.handleClose()} type="button" class="close topright" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>

                </div>
            </div>

        );
    };
}

export default Modal;