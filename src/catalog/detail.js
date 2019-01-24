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
            <div>
                {detail}
            </div>
        )
    }
}
