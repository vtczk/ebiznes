import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer-comp"
import Cart from "./components/cart"


function WishlistPage() {
  return (
    <div className="App">
        <Header/>
        <Cart/>
        <Footer/>
    </div>
  );
}

export default WishlistPage;
