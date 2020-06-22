import React from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer"
import Categories from "./components/search-comp"
import {useParams} from "react-router-dom";


function SearchPage() {
    let {searchText} = useParams();

    return (
        <div className="App">
            <Header/>
            <Categories searchText={searchText}/>
            <Footer/>
        </div>
    );
}

export default SearchPage;
