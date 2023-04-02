export class Service {

  endpoint;
  headers;

  constructor({ endpoint, headers }) {
    this.endpoint = endpoint;
    this.headers = headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(err => Promise.reject(err));
  }
}