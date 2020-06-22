import * as React from "react";
import fetchCategories from "./categories-handler";

class CategoriesSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []


        };
    }

    componentDidMount() {
        fetchCategories().then(body => this.setState({categories: body}));
    }

    render() {
        return (

            <div className="single-widget category">
                <h3 className="title">Categories</h3>
                <ul className="categor-list">
                    {this.state.categories.map(category => <li><a
                        href={"/categories/" + category.id}>{category.name}</a></li>)}
                </ul>
            </div>


        );
    };

}

export default CategoriesSidebar