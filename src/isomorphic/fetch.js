export function isBrowserPlatform() {
    return typeof window !== 'undefined';
}

export function isServerPlatform() {
    return typeof window === 'undefined';
}

export class SyncPromise {
    constructor(data) {
        this.data = data;
    }

    then(callback) {
        callback(this.data);
        return this
    }
}

class FaceResponse {

    constructor(response) {
        this.response = response;
    }

    get ok() {
        const status = this.status;
        return 200 <= status && status <= 299;
    }

    get status() {
        return parseInt(this.response.statusCode, 10);
    }

    json() {
        return new SyncPromise(JSON.parse(this.response.getBody('utf8')));
    }

    text() {
        return new SyncPromise(this.response.getBody());
    }
}

/**
 * @param url
 * @param options
 * @return {Promise<Response|SyncPromise>}
 */
export function isomorphicFetch(url, options = {}) {
    if (isServerPlatform()) {
        const request = require('sync-request');

        if (!options.method) {
            options.method = 'GET';
        }

        const response = request(options.method, url);

        return new SyncPromise(new FaceResponse(response));
    } else {
        return fetch(url, options);
    }
}
