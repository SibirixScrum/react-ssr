import * as React from "react";
import {isServerPlatform} from "./fetch";

export class IsomorphicComponent extends React.Component {

    /**
     *
     * @param state
     * @param callback
     */
    setState(state, callback) {
        if (isServerPlatform()) {
            this.state = state;
        } else {
            super.setState(state, callback);
        }
    }
}
