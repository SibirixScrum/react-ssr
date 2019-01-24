import React from "react";
import {IsomorphicComponent} from "../isomorphic/component";
import {isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";
import {ServerState} from "../server";

export class DetailComponent extends IsomorphicComponent {


    constructor(props) {
        super(props);

        this.state = {
            item: null
        };

        if (isServerPlatform()) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        isomorphicFetch(`http://react-rss.api/catalog/element/${this.getElementCode()}/`).then((data) => {
            data.json().then((data) => {

                if (isServerPlatform()) {
                    ServerState.getInstance().title = data.NAME;
                } else {
                    document.title = data.NAME;
                }

                return this.setState({
                    item: data,
                });
            });
        });
    }

    getElementCode() {
        return this.props.match.params.elementCode;
    }

    render() {
        let detail;

        if (this.state.item !== null) {
            detail = (
                <div className="detail-wrapper">
                    <h1>{this.state.item.NAME}</h1>
                </div>
            )
        } else {
            detail = 'Загрузка...'
        }

        return (
            <div className="catalog-detail">
                <div className="container">
                    <div className="grid-row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 offset-content text-content-wrapper">
                            <div className="breadcrumb-with-back-link">
                                <a href="javascript:void(0);"
                                   className="breadcrumb-link back-link"><span>Назад к списку</span></a>
                                <div className="breadcrumbs">
                                    <a href="javascript:void(0);" className="breadcrumb-link"><span>Главная</span></a>
                                    <a href="javascript:void(0);" className="breadcrumb-link"><span>Каталог</span></a>
                                    <a href="javascript:void(0);" className="breadcrumb-link"><span>Препараты</span></a>
                                    <a href="javascript:void(0);"
                                       className="breadcrumb-link"><span>СND Shellac</span></a>
                                    <span
                                        className="breadcrumb-link"><span>CND Shellac, цвет Black Pool&nbsp;7,3&nbsp;ml</span></span>
                                </div>
                            </div>

                            <div className="text-content">
                                <h1>CND Shellac, Black Pool</h1>
                            </div>

                            <div className="info">
                                <span className="article">Арт.&nbsp;91153</span>
                                <a href="javascript:void(0);" className="review-rating-info">
                                    <span className="review-link js-review-link"><span>7 отзывов</span></span>
                                    <span className="rating">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i className="current"></i>
                            <i></i>
                        </span>
                                </a>

                                <a href="javascript:void(0);" className="dashed award-link">3 награды</a>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 image-container">
                            <div className="image" style={{backgroundColor: '#b3b3b3'}}>
                                <div className="js-main-slider">
                                    <div className="slider image-slider">
                                        <div className="slider-list js-slide-list">
                                            <div className="slide js-slide">
                                                <div className="img-wrap">
                                                    <img src="/assets/pictures/catalog-detail/product-big-black.png" alt=""/>
                                                </div>
                                            </div>

                                            <div className="slide js-slide">
                                                <div className="img-wrap">
                                                    <img src="/assets/pictures/catalog-detail/product-big-black.png" alt="" />
                                                </div>
                                            </div>

                                            <div className="slide js-slide">
                                                <div className="img-wrap">
                                                    <img src="/assets/pictures/catalog-detail/product-big-black.png" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="slider image-thumb-slider js-thumb-slider">
                                        <div className="slider-list js-slide-list-thumb">
                                            <div className="slide js-slide"><a href="javascript:void(0);"
                                                                               className="play"></a></div>

                                            <div className="slide js-slide">
                                                <div className="image-thumb"
                                                     style={{backgroundImage: 'url(/assets/pictures/main/lak-1.png)'}} />
                                            </div>

                                            <div className="slide js-slide">
                                                <div className="image-thumb"
                                                     style={{backgroundImage: 'url(/assets/pictures/main/lak-1.png)'}} />
                                            </div>

                                            <div className="slide js-slide">
                                                <div className="image-thumb"
                                                     style={{backgroundImage: 'url(/assets/pictures/main/lak-1.png)'}} />
                                            </div>
                                        </div>

                                        <div className="slider-nav js-slider-nav">
                                            <div className="js-slider-arrow-prev prev" />
                                            <div className="js-slider-arrow-next next" />
                                        </div>
                                    </div>
                                </div>

                                <a href="javascript:void(0);" className="alert underline-reverse">Остерегайтесь
                                    подделок</a>

                                <div className="label-wrap">
                                    <span className="label" style={{backgroundColor: '#bfb1c3'}}>Новинка</span>
                                </div>

                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-lg-offset-1">
                            <div className="info-detail">
                                <div className="text">
                                    Покрытие шеллак прозрачное, с&nbsp;мелкой голографической слюдой. Может наноситься
                                    как самостоятельный лак, либо как эффект.
                                </div>

                                <form action="javascript:void(0);" className="form buy-block">

                                    <div className="buy-bottom">
                                        <div className="buy-column">
                                            <div className="buy-column-item price-wrapper">
                                                <span className="price">1&nbsp;555&nbsp;<i className="rub"></i></span>
                                                <span className="price-old">1&nbsp;635&nbsp;<i
                                                    className="rub"></i></span>
                                            </div>
                                            <div className="buy-column-item count-input-wrapper">
                                                <div className="count-input big js-count-button"
                                                     data-url="/order/update" data-max="2" data-min="1" data-step="1">
                                                    <a href="javascript:void(0)" className="minus js-dec disabled"></a>
                                                    <input type="text" name="count" className="js-input-count js-val"
                                                           value="1" inputMode="numeric" pattern="[0-9]*" maxLength="2" />
                                                        <a href="javascript:void(0)" className="plus js-inc"></a>
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

                                <div className="advantage-list">
                                    <div className="advantage-list-item">Плотность высокая</div>
                                    <div className="advantage-list-item">Формула 7Free</div>
                                    <div className="advantage-list-item">Объем 7,3&nbsp;ml</div>
                                </div>

                                <div className="info-list js-toggle-list">
                                    <div className="info-list-item ">
                                        <div className="info-list-item-header js-toggle-item open">Доставка<i></i></div>
                                        <div className="info-list-item-content js-toggle-content">
                                            <div className="text-content">
                                                <p>Забрать в&nbsp;магазине&nbsp;— <a href="javascript:void(0);"
                                                                                     className="underline-reverse underline-dark-gray">бесплатно
                                                    9&nbsp;июня</a></p>
                                                <p>Доставка на&nbsp;дом&nbsp;— <a href="javascript:void(0);"
                                                                                  className="underline-reverse underline-dark-gray">бесплатно
                                                    9&nbsp;июня</a>
                                                    (в&nbsp;пределах МКАД при заказе от&nbsp;3&nbsp;500&nbsp;Р)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-list-item">
                                        <div className="info-list-item-header js-toggle-item">Характеристики<i></i>
                                        </div>
                                        <div className="info-list-item-content js-toggle-content"
                                             style={{display: 'none'}}>
                                            <div className="text-content">
                                                <p><a href="javascript:void(0);">Забрать в&nbsp;магазине</a>&nbsp;—
                                                    бесплатно 9&nbsp;июня</p>
                                                <p><a href="javascript:void(0);">Доставка на&nbsp;дом</a>&nbsp;—
                                                    бесплатно 9&nbsp;июня
                                                    (в&nbsp;пределах МКАД при заказе от&nbsp;3&nbsp;500&nbsp;Р)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-list-item">
                                        <div className="info-list-item-header js-toggle-item">Описание<i></i></div>
                                        <div className="info-list-item-content js-toggle-content"
                                             style={{display: 'none'}}>
                                            <div className="text-content">
                                                <p><a href="javascript:void(0);">Забрать в&nbsp;магазине</a>&nbsp;—
                                                    бесплатно 9&nbsp;июня</p>
                                                <p><a href="javascript:void(0);">Доставка на&nbsp;дом</a>&nbsp;—
                                                    бесплатно 9&nbsp;июня
                                                    (в&nbsp;пределах МКАД при заказе от&nbsp;3&nbsp;500&nbsp;Р)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-list-item">
                                        <div className="info-list-item-header js-toggle-item">Как использовать<i></i>
                                        </div>
                                        <div className="info-list-item-content js-toggle-content"
                                             style={{display: 'none'}}>
                                            <div className="text-content">
                                                <p><a href="javascript:void(0);">Забрать в&nbsp;магазине</a>&nbsp;—
                                                    бесплатно 9&nbsp;июня</p>
                                                <p><a href="javascript:void(0);">Доставка на&nbsp;дом</a>&nbsp;—
                                                    бесплатно 9&nbsp;июня
                                                    (в&nbsp;пределах МКАД при заказе от&nbsp;3&nbsp;500&nbsp;Р)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
