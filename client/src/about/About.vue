<template>
  <div class="about">
    <h3>About</h3>
    <p>
      Diese Seite wird von mir betrieben.
      Ich bin 15 Jahre alt und gehe in die 10. Klasse.
      In meiner Freizeit programmiere ich gerne.
    </p>
    <p>
      Das Frontend wie auch das Backend dieser Applikation habe ich in den Osterferien 2020 (während der Corona-Zeit) entwickelt.
      Das Backend finden Sie
      <router-link :to="{ name: 'Backend' }" class="router-links noMargin">hier</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
</style>
