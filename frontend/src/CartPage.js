import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer"
import Cart from "./components/cart"


function CartPage() {
  return (
    <div className="App">
        <Header/>
        <Cart/>
        <Footer/>
    </div>
  );
}

export default CartPage;
