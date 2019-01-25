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
            section: null,
            items: null,
            navParams: null,
            loading: true,
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
                this.setState({
                    items: null,
                    navParams: null,
                    loading: true,
                });
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

    loadPage(page) {
        if (!page) {
            page = 1;
        }

        return isomorphicFetch(`http://olehouse.local/catalog-api/section/${this.getSectionCode()}/?PAGEN_1=${page}`)
            .then((data) => {
                    data.json().then((data) => {
                        return this.setState({
                            section: data.section,
                            items: data.items,
                            navParams: data.navParams,
                            loading: false,
                        });
                    });
                });
    }

    render() {

        let title = '';
        if (this.state.section !== null) {
            title = (
                <div className="container">
                    <div className="grid-row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 offset-content text-content-wrapper">
                            <div className="text-content">
                                <h1>{this.state.section.NAME}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        let list = '';

        if (this.state.items !== null) {
            list = (
                <div className="catalog-block">
                    <div className="catalog-content product-card-left-container">
                        <div className="container">
                            <div className="grid-row ">
                                {this.state.items.map((item, i) => {
                                    return this.renderCard(item, i)
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            );
        }

        let paginator = '';
        if (this.state.navParams !== null) {
            paginator = (
                <div className="pagination-wrapper" style={{paddingBottom: 60}}>
                    <PaginatorComponent
                        path={this.props.location.pathname}
                        totalCount={this.state.navParams.totalCount}
                        size={this.state.navParams.size}
                        current={this.state.navParams.page} />
                </div>
            );
        }

        return (
            <div className={`catalog-page ajax-area  ${this.state.loading ? 'active' : ''}`} style={{minHeight: '100vh'}}>
                <div className={`ajax-loader`}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                {title}

                {list}

                {paginator}

            </div>
        )
    }

    renderCard(item, i) {
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 flex-column" key={i}>

                <Link to={`/${this.state.section.CODE}/${item.CODE}`} className="product-card">
                    <span className="img-wrap">
                        <img src={`http://olehouse.local${item.PREVIEW_PICTURE_RESIZE}`} alt="" />

                        {item.HOVER_PICTURE_RESIZE ? (
                            <img src={`http://olehouse.local${item.HOVER_PICTURE_RESIZE}`} alt="" className="img-hover" />
                        ) : ''}

                    </span>
                    <span className="info">
                        {item.SELECTED_DATA && item.SELECTED_DATA.ARTICLE ? (
                            <span className="article">{item.SELECTED_DATA.ARTICLE}</span>
                        ) : ''}

                        {item.PROPERTIES.RATING_REVIEW.VALUE
                            ? ElementListComponent.renderRating(item.PROPERTIES.RATING_REVIEW.VALUE)
                            : ''
                        }

                        <span className="title">{item.Name}</span>

                        {item.COLOR && item.COLOR.NAME ? (
                            <span className="text">{item.COLOR.NAME}</span>
                        ) : ''}
                    </span>

                    <span className="card-bottom">
                        <span className="catalog">
                            <span className="price" dangerouslySetInnerHTML={{__html: item.PRICE.price}} />
                            <span className="buy">Купить</span>
                        </span>
                    </span>

                    <span className="fav " />
                </Link>
            </div>
        );
    }

    static renderRating(value) {
        let result = '';
        
        for (let i = 1; i <=5 ; i++) {
            if (i === parseInt(value, 10)) {
                result += '<i className="current"></i>';
            } else {
                result += '<i></i>';
            }
        }

        return (
            <span className="rating" dangerouslySetInnerHTML={{__html: result}} />
        )
    }
}
