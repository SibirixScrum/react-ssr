import React from "react";
import {Link} from "react-router-dom";
import {IsomorphicComponent} from "../isomorphic/component";
import {isBrowserPlatform, isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";
import {ServerState} from "../server";
import {PaginatorComponent} from "./paginator";

export class ElementListComponent extends IsomorphicComponent {

    constructor(props) {
        super(props);

        this.state = {
            items: null,
        };

        if (isServerPlatform()) {
            this.componentDidMount();
        }

        if (isServerPlatform()) {
            ServerState.getInstance().title = 'Список товаров';
        } else {
            document.title = 'Список товаров';
        }
    }

    componentDidMount() {
        this.loadPage(this.getPageNumber(this.props.location));

        if (isBrowserPlatform()) {
            this.props.history.listen((location) => {
                this.setState({items: null});
                this.loadPage(this.getPageNumber(location));
            });
        }
    }

    getSectionCode() {
        return this.props.match.params.sectionCode;
    }

    getPageNumber(location) {
        const params = new URLSearchParams(location.search);
        return params.get('page');
    }

    loadPage(page = 1) {
        isomorphicFetch(`http://react-rss.api/catalog/section/${this.getSectionCode()}/?PAGEN_1=${page}`).then((data) => {
            data.json().then((data) => {
                return this.setState({
                    items: data.items,
                    navParams: data.navParams
                });
            });
        });
    }

    render() {
        let list;

        if (this.state.items !== null) {
            list = (
                <div>
                    <div className="element-list-wrapper">
                        {this.state.items.map((el, index) => {
                            return (
                                <div className="item" key={index}>
                                    <Link to={`/${this.getSectionCode()}/${el.CODE}`} className="name">{el.NAME}</Link>
                                </div>
                            )
                        })}
                    </div>

                    <PaginatorComponent
                        path={this.props.location.pathname}
                        totalCount={this.state.navParams.totalCount}
                        size={this.state.navParams.size}
                        current={this.state.navParams.page} />
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
