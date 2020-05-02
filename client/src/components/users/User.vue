<template>
  <div class="container">
    <h3>Benutzer: {{ this.$route.params.username }}</h3>

    <h4>Eigene Beschreibung:</h4>
    <p v-if="!user.description">Dieser Benutzer wird für uns immer ein Mysterium bleiben...</p>
    <pre v-if="user.description">{{ user.description }}</pre>
  </div>
</template>

<script>
import UserService from '../../UserService';

export default {
  name: 'User',
  data() {
    return {
      user: {},
    };
  },
  async created() {
    this.user = await this.getUser();
  },
  computed: {},
  methods: {
    async getUser() {
      const returnValue = await UserService.getUserByUsername(
        this.$route.params.username,
      );
      return returnValue[0];
    },
  },
};
</script>

<style scoped>
</style>