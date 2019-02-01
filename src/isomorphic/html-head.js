import {isBrowserPlatform, isServerPlatform} from "./fetch";

export class HtmlHead {
    get title() {
        if (isBrowserPlatform()) {
            return document.title;
        }

        if (isServerPlatform()) {
            return this._title;
        }

        return '';
    }

    set title(value) {
        if (isBrowserPlatform()) {
            document.title = value;
        }

        if (isServerPlatform()) {
            this._title = value;
        }
    }
}
