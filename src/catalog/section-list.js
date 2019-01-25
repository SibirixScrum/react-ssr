import React from "react";
import {Link} from "react-router-dom";
import {IsomorphicComponent} from "../isomorphic/component";
import {isomorphicFetch, isServerPlatform} from "../isomorphic/fetch";
import {ServerState} from "../server";

export class SectionListComponent extends IsomorphicComponent {

    constructor(props) {
        super(props);

        this.state = {
            items: null,
            loading: true,
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
        isomorphicFetch('http://olehouse.local/catalog-api/').then((data) => {
            if (!data.ok) {
                return;
            }

            data.json().then((data) => {
                return this.setState({
                    items: data.items,
                    loading: false,
                });
            });
        });

    }

    render() {

        return (
            <div className={`catalog-page ajax-area  ${this.state.loading ? 'active' : ''}`} style={{minHeight: '100vh'}}>
                <div className={`ajax-loader`}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

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
                            {this.state.items ? (
                                this.state.items.map((item, index) => {
                                    const style = {};

                                    if (item.UF_COLOR && item.UF_COLOR !== '#ffffff') {
                                        style.backgroundColor = item.UF_COLOR;
                                    }

                                    if (item.UF_COLOR_TEXT) {
                                        style.color = item.UF_COLOR_TEXT
                                    }

                                    return (
                                        <Link to={item.CODE}
                                           className={`col-xs-6 col-sm-6 col-md-6 col-lg-6 slide ${parseInt(item.UF_BIG_PICTURE, 10) === 1 ? 'colored' : ''}`}
                                            key={index}>
                                            <span className="slide-content" style={style}>
                                                <span className="slide-content-text">
                                                    <span className="slide-title">{item.NAME}</span>
                                                    <span
                                                        className="slide-text">{item.DESCRIPTION}</span>
                                                </span>
                                                {item.PICTURE_RESIZE ? (
                                                    <span className="slide-content-img">
                                                        <img src={`http://olehouse.local/${item.PICTURE_RESIZE}`} alt="" />
                                                    </span>
                                                ): ''}
                                            </span>
                                        </Link>
                                    );
                                })
                            ): ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
