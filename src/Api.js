import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in',
});

class Api {
  static getUser(page) {
    return api.get('/api/users', { params: { page } });
  }
}

export default Api;
