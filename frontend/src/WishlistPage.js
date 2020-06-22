import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer-comp"
import Wishlist from "./components/wishlist-comp"


function WishlistPage() {
  return (
    <div className="App">
        <Header/>
        <Wishlist/>
        <Footer/>
    </div>
  );
}

export default WishlistPage;
