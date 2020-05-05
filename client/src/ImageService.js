import axios from 'axios';
import ItemService from './ItemService';

const url = '/api/images/';

class ImageService {
  static checkContains(string, toCheck) {
    const toCheckStrings = toCheck.split('+');
    let contained = false;

    contained = false;

    for (let i = 0; i < toCheckStrings.length; i += 1) {
      const toCheckString = toCheckStrings[i];
      if (toCheckString !== '+') {
        const toCheckStringLowerCase = toCheckString.toLowerCase();
        const stringLowerCase = string.toLowerCase();

        contained = stringLowerCase.includes(toCheckStringLowerCase);

        if (contained === false) {
          return false;
        }
      }
    }
    return true;
  }

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

  // Get one Image
  static getImageById(id) {
    // image._id or image.id???
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}image/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  static getImageByName(filename) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}image/name/${filename}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  // Add Image
  static async addPicture(recipeId, image) {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const imageRequest = await axios.post(url, formData);
      console.log(imageRequest);
      const image = imageRequest.data.file;
      const imageId = image.id;

      return await ItemService.addPictureToItem(recipeId, imageId);
    } catch (err) {
      console.log(err);
    }
  }
}

export default ImageService;
