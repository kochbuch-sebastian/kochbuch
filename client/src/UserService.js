const axios = require('axios');

const url = 'api/users/';

class ItemService {
  // Get one Item by username
  static getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
      })
        .then((res) => {
          const searchedUser = res.data.filter(
            (user) => user.username.toString() === username,
          );

          resolve(searchedUser);
        })
        .catch((err) => reject(err));
    });
  }

  // Get one Item
  static getUserById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  // Create Item
  static insertUser(username, password1, password2, description) {
    username = username.trim();
    description = description.trim();

    return axios.post(url, {
      username,
      password1,
      password2,
      description,
      favorites: [],
    });
  }

  // Update Item
  static updateUser(id, username, password, description) {
    return axios.patch(`${url}${id}`, {
      username,
      password,
      description,
    });
  }

  static login(username, password) {
    return axios.post(`${url}login`, {
      username,
      password,
    });
  }

  static addFavorite(username, recipeId) {
    return new Promise((resolve, reject) => {
      this.getUserByUsername(username)
        .then((user) => {
          const id = user[0]._id;

          axios.patch(`${url}favorite/${id}`, {
            recipeId,
          });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static removeFavorite(username, recipeId) {
    return new Promise((resolve, reject) => {
      this.getUserByUsername(username)
        .then((user) => {
          const id = user[0]._id;

          axios.patch(`${url}removeFavorite/${id}`, {
            recipeId,
          });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Delete Item
  static deleteUser(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default ItemService;
