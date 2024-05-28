import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

class Api {
  static createMovie(formData) {
    return api.post('/movie/create', formData);
  }

  static login(data) {
    return api.post('/login', data);
  }

  static getCategoryList() {
    return api.get('/category/list');
  }

  static createCategory(name) {
    return api.post('/category/create', name);
  }

  static deleteCategory(categoryId) {
    return api.put(`/category/delete/${categoryId}`);
  }

  static bookingList() {
    return api.get('/booking/list');
  }

  static userList() {
    return api.get('/user/list');
  }

  static movieList() {
    return api.get('/movie/list');
  }

  static uploadFile(data) {
    return api.post('/upload/file', data);
  }
}

export default Api;
