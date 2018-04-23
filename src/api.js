
class api {
  constructor(options) {
    if(options instanceof String)
      this.baseUri = options;
    else
      this.baseUri = (options || {}).baseUri || 'http://localhost:3000/admin/api';
  }

  get(endpoint) {
    console.log(`getting ${this.baseUri}${endpoint}`)
    return fetch(this.baseUri + endpoint).then(res => res.json());
  }

  post(endpoint, data) {
    console.log(`posting to ${this.baseUri}${endpoint}`)
    return fetch(this.baseUri + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }
}


export default api;
