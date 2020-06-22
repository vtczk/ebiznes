import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer"
import Contact from "./components/contact"


function ContactPage() {
  return (
    <div className="App">
        <Header/>
        <Contact/>
        <Footer/>
    </div>
  );
}

export default ContactPage;
