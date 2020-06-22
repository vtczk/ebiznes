import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer-comp"

import CreateAccount from "./components/create-account"


function Register() {
  return (
    <div className="App">
        <Header/>
        <CreateAccount/>
        <Footer/>
    </div>
  );
}

export default Register;
