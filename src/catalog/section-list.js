import React from "react";
import {Link} from "react-router-dom";
import {IsomorphicComponent} from "../isomorphic/component";
import {isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";

export class SectionListComponent extends IsomorphicComponent {

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
        isomorphicFetch('http://react-rss.api/catalog/').then((data) => {
            data.json().then((data) => {
                return this.setState({
                    items: data,
                });
            });
        });

    }

    render() {
        let list;

        if (this.state.items !== null) {
            list = (
                <div className="section-list-wrapper">
                    {this.state.items.map((el, index) => {
                        return (
                            <div className="item" key={index}>
                                <Link to={`/${el.CODE}`} className="name">{el.NAME}</Link>
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
                <h1>Список разделов</h1>

                {list}
            </div>
        )
    }
}
