import React from "react";
import {BrowserRouter, Route, StaticRouter, Switch} from "react-router-dom";
import {DetailComponent} from "./catalog/detail";
import {ElementListComponent} from "./catalog/element-list";
import {SectionListComponent} from "./catalog/section-list";
import {IsomorphicComponent} from "./isomorphic/component";
import {isServerPlatform} from "./isomorphic/fetch";

export class App extends IsomorphicComponent {

    render() {
        const routes = (
            <main id="main" style={{padding: 0}}>
                <Switch>
                    <Route path={'/'} exact component={SectionListComponent} />
                    <Route path={'/:sectionCode'} exact component={ElementListComponent} />
                    <Route path={'/:sectionCode/:elementCode'} component={DetailComponent} />
                </Switch>
            </main>
        );

        if (isServerPlatform()) {
            return <StaticRouter location={this.props.serverParams.url} context={{}}>{routes}</StaticRouter>
        } else {
            return (
                <BrowserRouter>{routes}</BrowserRouter>
            );
        }
    }
}
