import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer-comp"
import Login from "./components/login"


function LoginPage() {
  return (
    <div className="App">
        <Header/>
        <Login/>
        <Footer/>
    </div>
  );
}

export default LoginPage;
