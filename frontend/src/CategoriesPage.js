import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer-comp"
import Categories from "./components/main-body-comp"
import {useParams} from "react-router";

function CategoriesPage() {
    let {id} = useParams();

    return (
        <div className="App">
            <Header/>
            <Categories id={id}/>
            <Footer/>
        </div>
    );
}

export default CategoriesPage;
