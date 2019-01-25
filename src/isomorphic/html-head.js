import {isBrowserPlatform, isServerPlatform} from "./fetch";

export class HtmlHead {
    static get title() {
        if (isBrowserPlatform()) {
            return document.title;
        }

        if (isServerPlatform()) {
            return HtmlHead._title;
        }

        return '';
    }

    static set title(value) {
        if (isBrowserPlatform()) {
            document.title = value;
        }

        if (isServerPlatform()) {
            HtmlHead._title = value;
        }
    }
}
