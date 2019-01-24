import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {DetailComponent} from "./catalog/detail";
import {ElementListComponent} from "./catalog/element-list";
import {SectionListComponent} from "./catalog/section-list";
import {IsomorphicComponent} from "./isomorphic/component";

export class App extends IsomorphicComponent {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path={'/'} exact component={SectionListComponent} />
                    <Route path={'/:sectionCode'} exact component={ElementListComponent} />
                    <Route path={'/:sectionCode/:elementCode'} exact component={DetailComponent} />
                </div>
            </BrowserRouter>
        );
    }
}
