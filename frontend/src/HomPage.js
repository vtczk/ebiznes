import React, {Component} from 'react';
import './HomePage.css';

import Header from "./components/header-comp"
import Footer from "./components/footer-comp"
import TopDeal from "./components/top-deal"

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.listDeals = this.listDeals.bind(this)
    }

    listDeals() {
        let result = [];
        for (let i = 0; i < this.state.products.length; i++) {
            result.push(<TopDeal even={i % 2 == 0} product={this.state.products[i]}/>)
        }
        return result;
    }

    componentDidMount() {
        fetch("http://localhost:9000/topdeals",
            {
                mode: 'cors',
                method: 'GET'
            }).then(response => response.json())
            .then(response => response.map(deal => {
                fetch("http://localhost:9000/products/" + deal.product,
                    {
                        mode: 'cors',
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then(response => {
                        response["discount"] = deal["discount"];
                        this.setState({products: [...this.state.products, response]})
                    });
            }));

    };
    render() {
        return (
            <div className="App">
                <Header/>
                <br/> <br/> <br/>

                {this.listDeals()}
                <Footer/>
            </div>

        );
    }
}

export default HomePage;
