<template>
  <div class="container">
    <div>
      <h3>Sie sind offline.</h3>
      <p>Jede Seite und jedes Bild, das Sie mindestens einmal (insgesamt) aufrufen, bleibt auch offline verfügbar, bis Sie den Cache löschen.</p>
    </div>
    <div>
      <router-link :to="{name: 'Home'}">Zurück zur Start-Seite</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offline',
};
</script>

<style>
</style>