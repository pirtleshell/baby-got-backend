
class Api {
  constructor(options) {
    if(options instanceof String)
      this.baseUri = options;
    else
      this.baseUri = (options || {}).baseUri || 'http://localhost:3000/admin/api/';
  }

  get(endpoint) {
    return fetch(this.url(endpoint)).then(res => res.json());
  }

  post(endpoint, data) {
    return fetch(this.url(endpoint), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  url(endpoint) { return this.baseUri + endpoint; }
}


export default Api;
