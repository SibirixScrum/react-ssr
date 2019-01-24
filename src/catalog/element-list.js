import React from "react";
import {Link} from "react-router-dom";
import {IsomorphicComponent} from "../isomorphic/component";
import {isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";

export class ElementListComponent extends IsomorphicComponent {

    constructor(props) {
        super(props);

        this.state = {
            items: null
        };

        if (isServerPlatform()) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        isomorphicFetch('http://react-rss.api/catalog/section/' + this.getSectionCode() + '/').then((data) => {
            data.json().then((data) => {
                return this.setState({
                    items: data,
                });
            });
        });
    }

    getSectionCode() {
        return this.props.match.params.sectionCode;
    }

    render() {
        let list;

        if (this.state.items !== null) {
            list = (
                <div className="element-list-wrapper">
                    {this.state.items.map((el, index) => {
                        return (
                            <div className="item" key={index}>
                                <Link to={`/${this.getSectionCode()}/${el.CODE}`} className="name">{el.NAME}</Link>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            list = 'Загрузка...'
        }

        return (
            <div>
                <h1>Список товаров</h1>

                {list}
            </div>
        )
    }
}
