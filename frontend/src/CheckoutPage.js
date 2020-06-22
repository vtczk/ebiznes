import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer"
import Checkout from "./components/checkout"


function CheckoutPage() {
  return (
    <div className="App">
        <Header/>
        <Checkout/>
        <Footer/>
    </div>
  );
}

export default CheckoutPage;
