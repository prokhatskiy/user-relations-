import superagent from 'superagent';

export default {
    origin: 'https://randomuser.me/api/',

    get: function (...args) {
        return this.doMethod('get', ...args);
    },

    post: function (...args) {
        return this.doMethod('post', ...args);
    },

    put: function (...args) {
        return this.doMethod('put', ...args);
    },

    delete: function (...args) {
        return this.doMethod('delete', ...args);
    },

    doMethod: function (method, url, params) {
        return new Promise((resolve, reject) => {
            const requestUrl = this.origin + url;

            const request = superagent[method](requestUrl);

            if (params) {
                if (method === 'get') {
                    request.query(params);
                } else {
                    request.send(params);
                }
            }

            if (method !== 'get') {
                request.set('Accept', 'application/json');
            }

            request.end(err => reject(err));
        });
    }
}

