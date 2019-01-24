import React from "react";
import {Link} from "react-router-dom";
import {IsomorphicComponent} from "../isomorphic/component";
import {isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";
import {ServerState} from "../server";

export class SectionListComponent extends IsomorphicComponent {

    constructor(props) {
        super(props);

        this.state = {
            items: null
        };

        if (isServerPlatform()) {
            this.componentDidMount();
        }

        if (isServerPlatform()) {
            ServerState.getInstance().title = 'Список разделов';
        } else {
            document.title = 'Список разделов';
        }
    }

    componentDidMount() {
        isomorphicFetch('http://react-rss.api/catalog/').then((data) => {
            data.json().then((data) => {
                return this.setState({
                    items: data.items,
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
                                <h1>Каталог</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slider-special catalog-section-list" style={{opacity: 1}}>
                    <div className="container">
                        <div className="slide-list grid-row  gutter-0">
                            <a href="javascript:void(0);" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 slide colored">
                                <span className="slide-content" style={{backgroundColor: '#bfb1c3'}}>
                                    <span className="slide-content-text">
                                        <span className="slide-title">Базы и топы</span>
                                        <span
                                            className="slide-text">Каучуковые, вельветовые, матовые, ультраглянцевые, с&nbsp;блестками и&nbsp;т.д.</span>
                                    </span>
                                    <span className="slide-content-img">
                                        <img src="/assets/pictures/main/hand.png" alt="" />
                                    </span>
                                </span>
                            </a>
                            <a href="javascript:void(0);" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 slide ">
                                <span className="slide-content">
                                    <span className="slide-content-text">
                                        <span className="slide-title">Уход за ногтями</span>
                                        <span className="slide-text">Крема, натуральные масла&nbsp;— все&nbsp;то, что так необходимо для ухода за&nbsp;кожей рук</span>
                                    </span>
                                    <span className="slide-content-img">
                                        <img src="/assets/pictures/main/special-product-10.png" alt="" />
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
