import axios from 'axios';

const url = '/api/items/';

class ItemService {
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

  // Get Items
  static getItems() {
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

  static getItemsByRecipeType(recipeType) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
      })
        .then((res) => {
          resolve(
            res.data.filter((item) => {
              const isRightType = this.checkContains(
                item.recipeType,
                recipeType,
              );
              return isRightType;
            }),
          );
        })
        .catch((err) => reject(err));
    });
  }

  // Get one Item by title
  static getItemsByTitle(title) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
      })
        .then((res) => {
          resolve(
            res.data.filter((item) => this.checkContains(item.title, title)),
          );
        })
        .catch((err) => reject(err));
    });
  }

  // Get one Item
  static getItemById(id) {
    // item._id or item.id???
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
  static insertItem(title, ingredients, description, recipeType, username) {
    title = title.trim();
    description = description.trim();

    return axios.post(url, {
      title,
      ingredients,
      description,
      recipeType,
      username,
    });
  }

  // Update Item
  static updateItem(id, title, ingredients, description, recipeType, username) {
    return axios.patch(`${url}${id}`, {
      title,
      ingredients,
      description,
      recipeType,
      username,
    });
  }

  static async addPictureToItem(recipeId, imageId) {
    console.log(`recipeId in addPictureToItem: ${recipeId}`);

    // axios post (image array)
    return await axios.patch(`${url}addimage/${recipeId}`, {
      imageId,
    });
  }

  // Delete Item
  static deleteItem(id, username) {
    const body = {
      data: { username: username },
    };

    return axios.delete(`${url}${id}`, body);
  }
}

export default ItemService;
