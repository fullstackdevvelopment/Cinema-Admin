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

  static updateMovie({ formData, movieId }) {
    return api.put(`/movie/change/${movieId}`, formData);
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

  static bookingList(page = 1, limit = 4) {
    return api.get(`/booking/list?page=${page}&limit=${limit}`);
  }

  static userList(page = 1, limit = 6) {
    return api.get(`/user/list?page=${page}&limit=${limit}`);
  }

  static movieList(page = 1, limit = 6) {
    return api.get(`/movie/list?page=${page}&limit=${limit}`);
  }

  static ticketList(page = 1, limit = 6) {
    return api.get(`/tickets/list?page=${page}&limit=${limit}`);
  }

  static reviewList(page = 1, limit = 4) {
    return api.get(`/review/list?page=${page}&limit=${limit}`);
  }

  static deleteReview(commentId) {
    return api.put(`/review/delete/${commentId}`);
  }

  static uploadFile(data) {
    return api.post('/upload/file', data);
  }

  static uploadStills(data) {
    return api.post('/upload/stills', data);
  }

  static uploadPhoto(data) {
    return api.post('/upload/photo', data);
  }

  static uploadTrailer(data) {
    return api.post('/upload/trailer', data);
  }

  static getSingleMovie(movieId) {
    return api.get(`/movie/single/${movieId}`);
  }

  static scheduleList() {
    return api.get('/schedule/list');
  }
}

export default Api;
