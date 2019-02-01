import {isBrowserPlatform} from "./fetch";

class TransferStorage {
    /**
     * @param data
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * @param key
     * @return {boolean}
     */
    has(key) {
        return typeof this.data[key] !== 'undefined';
    }

    /**
     * @param key
     * @return {*}
     */
    get(key) {
        return this.data[key];
    }

    /**
     * @param key
     * @param value
     */
    set(key, value) {
        this.data[key] = value;
    }

    /**
     * @param key
     */
    remove(key) {
        delete this.data[key];
    }

    /**
     * @return {string}
     */
    toJson() {
        return JSON.stringify(this.data);
    }
}

export class TransferState {

    /**
     * @return {TransferState}
     */
    static getInstance() {
        if (typeof TransferState._instance === 'undefined') {
            TransferState._instance = TransferState.factory();

        }

        return TransferState._instance;
    }

    /**
     * @return {TransferState}
     */
    static factory() {
        let storage;
        if (isBrowserPlatform()) {
            const script = document.getElementById('__STATE__');

            let data;
            if (script) {
                try {
                    data = JSON.parse(script.innerText);
                } catch (e) {
                    data = {};
                }
            } else {
                data = {}
            }

            storage = new TransferStorage(data)
        } else {
            storage = new TransferStorage({});
        }

        return new TransferState(storage);
    }

    /**
     *
     * @param storage
     */
    constructor(storage) {
        this.storage = storage;
    }

    /**
     * @param key
     * @return {*}
     */
    has(key) {
        return this.storage.has(key);
    }

    /**
     * @param key
     * @param defaultValue
     * @return {*}
     */
    get(key, defaultValue = null) {
        if (!this.storage.has(key)) {
            return defaultValue;
        }

        return this.storage.get(key);
    }

    /**
     * @param key
     * @param value
     */
    set(key, value) {
        this.storage.set(key, value);
    }


    /**
     * @param key
     */
    remove(key) {
        this.storage.remove(key);
    }

    /**
     * @return {*|{warnings, errors}}
     */
    toJson() {
        return this.storage.toJson();
    }
}
