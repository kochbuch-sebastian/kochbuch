import axios from 'axios';

const url = '/api/icons/';

class IconService {
  // Get Images
  static getImages() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  static getImageByName(filename) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}icon/name/${filename}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  // Add Image
  static async addPicture(icon) {
    const formData = new FormData();
    formData.append('file', icon);

    try {
      await axios.post(url, formData);
    } catch (err) {
      console.log(err);
    }
  }
}

export default IconService;
