import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer"
import Account from "./components/user-details"


function UserPage() {
  return (
    <div className="App">
        <Header/>
        <Account/>
        <Footer/>
    </div>
  );
}

export default UserPage;
