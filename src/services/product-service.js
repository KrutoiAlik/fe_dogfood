import { Service } from './service';
import { BASE_URL, HEADERS } from './config';

class ProductService extends Service {
  constructor({ endpoint, headers }) {
    super({ endpoint, headers });
  }

  getAll() {
    return fetch(this.endpoint, { headers: this.headers }).then(this._handleResponse);
  }

  filterByQuery(query) {
    return fetch(`${this.endpoint}/search?query=${query}`, { headers: this.headers }).then(this._handleResponse);
  }

  getById(id) {
    return fetch(`${this.endpoint}/${id}`, { headers: this.headers }).then(this._handleResponse);
  }

  createOne(record) {
    const options = {
      method: 'POST',
      body: JSON.stringify(record),
      headers: this.headers,
    };
    return fetch(this.endpoint, options).then(this._handleResponse);
  }

  editById(id, record) {
    const options = {
      method: 'PATCH',
      body: JSON.stringify(record),
      headers: this.headers,
    };
    return fetch(`${this.endpoint}/${id}`, options).then(this._handleResponse);
  }

  deleteById(id) {
    const options = {
      method: 'DELETE',
      headers: this.headers
    };
    return fetch(`${this.endpoint}/${id}`, options).then(this._handleResponse);
  }

  addLike(id) {
    const options = {
      method: 'PUT',
      headers: this.headers
    };
    return fetch(`${this.endpoint}/likes/${id}`, options).then(this._handleResponse);
  }

  removeLike(id) {
    const options = {
      method: 'DELETE',
      headers: this.headers
    };
    return fetch(`${this.endpoint}/likes/${id}`, options).then(this._handleResponse);
  }

  getAllReviews() {
    return fetch(`${this.endpoint}/review`, { headers: this.headers }).then(this._handleResponse);
  }

  getReviewsByProductId(id) {
    return fetch(`${this.endpoint}/review/${id}`, { headers: this.headers }).then(this._handleResponse);
  }
}

export const productService = new ProductService({
  endpoint: `${BASE_URL}/products`,
  headers: HEADERS
});

