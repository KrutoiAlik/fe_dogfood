import { Service } from './service';
import { BASE_URL, HEADERS } from './config';

class UserService extends Service {
  constructor({ endpoint, headers }) {
    super({ endpoint, headers });
  }

  getAll() {
    return fetch(this.endpoint, { headers: this.headers }).then(this._handleResponse);
  }

  getCurrentUserInfo() {
    return fetch(`${this.endpoint}/me`, { headers: this.headers }).then(this._handleResponse);
  }

  getById(id) {
    return fetch(`${this.endpoint}/${id}`, { headers: this.headers }).then(this._handleResponse);
  }

  updateMyNameOrAbout(data) {
    const options = {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this.headers,
    };
    return fetch(`${this.endpoint}/me`, options).then(this._handleResponse);
  }

  updateMyAvatar(avatar) {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
      headers: this.headers,
    };
    return fetch(`${this.endpoint}/me/avatar`, options).then(this._handleResponse);
  }

}

export const userService = new UserService({
  endpoint: `${BASE_URL}/users`,
  headers: HEADERS
});