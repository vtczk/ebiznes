import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer"

import CreateAccount from "./components/create-account"


function RegisterPage() {
  return (
    <div className="App">
        <Header/>
        <CreateAccount/>
        <Footer/>
    </div>
  );
}

export default RegisterPage;
