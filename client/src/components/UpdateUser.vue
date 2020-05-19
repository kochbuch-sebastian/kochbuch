<template>
  <div class="container">
    <h3>Account-Einstellungen</h3>

    <router-link :to="{name: 'UpdatePassword'}" class="router-links">Passwort ändern</router-link>
    <router-link :to="{name: 'UpdateDescription'}" class="router-links">Beschreibung ändern</router-link>
  </div>
</template>

<script>
export default {
  name: 'UpdateUser',
  data() {
    return {
      error: '',
    };
  },
};
</script>

<style scoped>
</style>
