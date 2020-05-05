<template>
  <div class="container border shadow">
    <h4>Bilder</h4>
    <div v-if="pictureNames.length > 0">
      <div v-for="(pictureName, index) in pictureNames" :key="index">
        <img
          :src="'/api/images/image/name/' + pictureName"
          :style="pictureWidth"
          class="border shadow"
        />
      </div>
    </div>
    <p v-else>Keine Bilder gefunden!</p>
  </div>
</template>

<script>
import ItemService from '../ItemService';

export default {
  name: 'ShowPictures',
  props: ['recipeId'],
  data() {
    return {
      pictureNames: [],
      pictureWidth:
        window.width > 700
          ? `width: ${window.width / (this.pictureNames.length % 4)};`
          : 'width: 100%;',
    };
  },
  methods: {
    async getPictures() {
      const item = await ItemService.getItemById(this.recipeId);

      this.pictureNames = item.pictures;
    },
  },
  async created() {
    await this.getPictures();
  },
};
</script>

<style scoped>
</style>