import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"

import Footer from "./components/footer"

import ProductDetails from "./components/product-details"
import {useParams} from "react-router-dom";


function ProductDetailsPage(props) {
    let {id} = useParams();
    return (
        <div className="App">
            <Header/>
            <ProductDetails id={id}/>
            <Footer/>
        </div>
    );
}

export default ProductDetailsPage;
