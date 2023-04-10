import { Service } from './service';
import { BASE_URL, HEADERS } from './config';

class AuthService extends Service {

  constructor({ endpoint, headers }) {
    super({ endpoint, headers });
  }

  signIn({ email, password }) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: this.headers,
    };
    return fetch(this.endpoint, options).then(this._handleResponse);
  }

  signUp({ email, group, password }) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, group, password }),
      headers: this.headers,
    };
    return fetch(this.endpoint, options).then(this._handleResponse);
  }
}

export const authService = new AuthService({
  endpoint: BASE_URL,
  headers: HEADERS,
});