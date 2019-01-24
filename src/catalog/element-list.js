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

        return (
            <div className="catalog-page">
                <div className="container">
                    <div className="grid-row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 offset-content text-content-wrapper">
                            <div className="text-content">
                                <h1>CND Shellac</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="catalog-block">
                    <div className="catalog-content product-card-left-container">
                        <div className="container">
                            <div className="grid-row ">
                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 flex-column">

                                    <a href="javascript:void(0);" className="product-card">
                                        <span className="img-wrap">
                                            <img src="/assets/pictures/product-card/black.png" alt="" />

                                                        <img src="/assets/pictures/product-card/hover-red.png" alt="" className="img-hover" />
                                                </span>
                                                                            <span className="info">
                                            <span className="article">91153</span>
                                            <span className="rating">
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i className="current"></i>
                                                <i></i>
                                            </span>
                                            <span className="title">CND Shellac UV&nbsp;Base Coat</span>
                                            <span className="text">Базовое покрытие, 13,6&nbsp;мл</span>
                                        </span>

                                                                            <span className="card-bottom">
                                            <span className="prop-list">
                                                <input type="radio" name="size-477837503" id="size-477837503" checked="" />
                                                <label htmlFor="size-477837503">4.8 мл</label>
                                                <input type="radio" name="size-477837503" id="size-477837504" />
                                                <label htmlFor="size-477837504">7.3 мл</label>
                                            </span>

                                            <span className="catalog">
                                                <span className="price">1&nbsp;380&nbsp;<i className="rub"></i></span>
                                                <span className="buy">Купить</span>
                                            </span>
                                        </span>

                                        <span className="fav "></span>
                                    </a>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 flex-column">

                                    <a href="javascript:void(0);" className="product-card">
                                        <span className="img-wrap">
                                            <img src="/assets/pictures/product-card/red.png" alt="" />

                                                        <img src="/assets/pictures/product-card/hover-red.png" alt="" className="img-hover" />
                                                </span>
                                                                            <span className="info">
                                            <span className="article">10585</span>
                                            <span className="rating">
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i className="current"></i>
                                                <i></i>
                                            </span>
                                            <span className="title">CND Shellac UV&nbsp;Color Coat</span>
                                            <span className="text">13,6&nbsp;мл, 51&nbsp;оттенок</span>
                                        </span>

                                                                            <span className="card-bottom">
                                            <span className="prop-list">
                                                <input type="radio" name="size-82437763" id="size-82437763" checked="" />
                                                <label htmlFor="size-82437763">4.8 мл</label>
                                                <input type="radio" name="size-82437763" id="size-82437764" />
                                                <label htmlFor="size-82437764">7.3 мл</label>
                                            </span>

                                            <span className="catalog">
                                                <span className="price">1&nbsp;264&nbsp;<i className="rub"></i></span>
                                                <span className="buy">Купить</span>
                                            </span>
                                        </span>

                                        <span className="fav "></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="pagination-wrapper">
                    <div className="pagination">
                        <a href="javascript:void(0);" className="arrow prev"></a>
                        <a href="javascript:void(0);" className="item">1</a>
                        <a href="javascript:void(0);" className="item active">2</a>
                        <a href="javascript:void(0);" className="item">3</a>
                        <a href="javascript:void(0);" className="arrow next"></a>
                    </div>
                    <a href="javascript:void(0);" className="pagination-show-all">Показать все</a>

                </div>

            </div>
        )
    }
}
