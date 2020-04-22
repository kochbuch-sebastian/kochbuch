import axios from 'axios';

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

  // Delete Item
  static deleteUser(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default ItemService;
