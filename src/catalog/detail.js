import React from "react";
import {Link} from "react-router-dom";
import {apiCatalog, assetsServer} from "../config";
import {IsomorphicComponent} from "../isomorphic/component";
import {isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";
import {HtmlHead} from "../isomorphic/html-head";
import {ElementListComponent} from "./element-list";

export class DetailComponent extends IsomorphicComponent {


    constructor(props) {
        super(props);

        this.state = {
            item: null,
            loading: true,
        };

        if (isServerPlatform()) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        isomorphicFetch(`${apiCatalog}element/${this.getElementCode()}/`).then((data) => {
            if (!data.ok) {
                return;
            }

            data.json().then((data) => {
                HtmlHead.title = data.item.NAME;

                return this.setState({
                    item: data.item,
                    loading: false,
                });
            });
        });
    }

    getSectionCode() {
        return this.props.match.params.sectionCode;
    }

    getElementCode() {
        return this.props.match.params.elementCode;
    }

    render() {
        const item = this.state.item;

        return (
            <div className={`catalog-detail ajax-area  ${this.state.loading ? 'active' : ''}`} style={{minHeight: '100vh'}}>
                <div className={`ajax-loader`}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                {item !== null ? (
                    <div className="container">
                        <div className="grid-row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 offset-content text-content-wrapper">
                                <div className="breadcrumb-with-back-link">
                                    <Link to={`/${this.getSectionCode()}/`}
                                          className="breadcrumb-link back-link">
                                        <span>Назад к списку</span>
                                    </Link>

                                </div>

                                <div className="text-content">
                                    <h1>{item.NAME}</h1>
                                </div>

                                <div className="info">
                                    {item.SELECTED_DATA && item.SELECTED_DATA.ARTICLE ? (
                                        <span className="article">Арт.&nbsp;{item.SELECTED_DATA.ARTICLE}</span>
                                    ): ''}
                                    <a href="javascript:void(0);" className="review-rating-info">
                                        {item.PROPERTIES.RATING_REVIEW.VALUE
                                            ? ElementListComponent.renderRating(item.PROPERTIES.RATING_REVIEW.VALUE)
                                            : ''
                                        }
                                    </a>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 image-container">
                                <div className="image" style={{backgroundColor: '#b3b3b3'}}>
                                    <div className="js-main-slider">
                                        <div className="slider image-slider">
                                            <div className="slider-list js-slide-list">
                                                {item.GALLERY.map((item, i) => {
                                                    return (
                                                        <div className="slide js-slide" key={i}>
                                                            <div className="img-wrap">
                                                                <img src={`${assetsServer}${item.PICTURE}`} alt=""/>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="slider image-thumb-slider js-thumb-slider">
                                            <div className="slider-list js-slide-list-thumb">

                                                {item.GALLERY.map((item, i) => {
                                                    return (
                                                        <div className="slide js-slide" key={i}>
                                                            <div className="image-thumb"
                                                                 style={{
                                                                     backgroundImage: `url(${assetsServer}${item.PICTURE})`,
                                                                     backgroundSize: 'contain',
                                                                     backgroundPosition: 'bottom center',
                                                                 }} />
                                                        </div>
                                                    );
                                                })}

                                            </div>

                                            <div className="slider-nav js-slider-nav">
                                                <div className="js-slider-arrow-prev prev" />
                                                <div className="js-slider-arrow-next next" />
                                            </div>
                                        </div>
                                    </div>

                                    <a href="javascript:void(0);" className="alert underline-reverse">Остерегайтесь
                                        подделок</a>

                                    {item.LABEL && item.LABEL.length > 0 ? (
                                        <div className="label-wrap">
                                            {item.LABEL.map((el, i) => {
                                                const style = {};

                                                if (el.PROPERTY_COLOR_VALUE) {
                                                    style.backgroundColor = el.PROPERTY_COLOR_VALUE;
                                                }

                                                return (
                                                    <span className="label" style={style} key={i}>
                                                        {el.NAME}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    ) : ''}

                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-lg-offset-1">
                                <div className="info-detail">
                                    <div className="text" dangerouslySetInnerHTML={{__html: item.PREVIEW_TEXT}} />

                                    <form action="javascript:void(0);" className="form buy-block">

                                        <div className="buy-bottom">
                                            <div className="buy-column">
                                                <div className="buy-column-item price-wrapper">
                                                    <span className="price" dangerouslySetInnerHTML={{__html: item.PRICE.price}} />

                                                    {
                                                        item.PRICE.discount ? (
                                                            <span className="price-old"
                                                                  dangerouslySetInnerHTML={{__html: item.PRICE.oldPrice}} />
                                                        ) : ''
                                                    }
                                                </div>
                                                <div className="buy-column-item count-input-wrapper">
                                                    <div className="count-input big js-count-button"
                                                         data-url="/order/update" data-max="2" data-min="1" data-step="1">
                                                        <a href="javascript:void(0)" className="minus js-dec disabled" />
                                                        <input type="text" name="count" className="js-input-count js-val"
                                                               defaultValue="1" inputMode="numeric" pattern="[0-9]*" maxLength="2" />
                                                        <a href="javascript:void(0)" className="plus js-inc" />
                                                    </div>
                                                </div>
                                                <div className="buy-column-item buy-wrapper">
                                                    <a href="javascript:void(0);" className="btn buy js-to-cart">
                                                        <span className="layer-top">Купить</span>
                                                        <span className="layer-bottom">Купить</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                    </form>

                                    {item.ADVANTAGE && item.ADVANTAGE.length > 0 ? (

                                        <div className="advantage-list">
                                            {item.ADVANTAGE.map((el, i) => {
                                                return <div className="advantage-list-item" key={i}>{el.NAME}</div>
                                            })}
                                        </div>

                                    ) : ''}

                                    <div className="info-list js-toggle-list">

                                        {item.TEXT_ACCORDION && item.TEXT_ACCORDION.length ? (
                                            item.TEXT_ACCORDION.map((el, i) => {
                                                const style = {};

                                                if (i !== 0) {
                                                    style.display = 'none';
                                                }

                                                return (
                                                    <div className="info-list-item" key={i}>
                                                        <div className={`info-list-item-header js-toggle-item ${i === 0 ? 'open' : ''}`}>
                                                            {item.TEXT_ACCORDION_DESCRIPTION[i]}<i />
                                                        </div>
                                                        <div className="info-list-item-content js-toggle-content"
                                                            style={style}>
                                                            <div className="text-content"
                                                                dangerouslySetInnerHTML={{__html: el.TEXT}}/>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ): ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''}
            </div>
        )
    }
}
