import React from "react";
import {IsomorphicComponent} from "./isomorphic/component";
import {fetch, isServerPlatform} from "./isomorphic/fetch";

export class App extends IsomorphicComponent {

    constructor(props) {
        super(props);

        if (isServerPlatform()) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        fetch('http://react-rss.api/data.json').then((data) => {
            data.json().then((data) => {
                return this.setState(data);
            });
        });

    }

    render() {
        return (
            <div>
                {this.state ? this.state.name : 'загрузка...'}
            </div>
        );
    }
}
