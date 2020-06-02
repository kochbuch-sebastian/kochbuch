<template>
  <div class="container">
    <h3
      class="error"
    >Push-Benachrichtigungen werden von Ihrem aktuellen Browser nicht unterstützt. Mögliche Browser sind zum Beispiel:</h3>
    <ul>
      <li>Google Chrome</li>
      <li>Mozilla Firefox</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PushNotAvailable',
};
</script>

<style scoped>
.fullWidth {
  width: 100%;
  height: 70px;

  position: fixed;
  bottom: 60px;
  left: 0;

  border-radius: 15px;
}

.black-background {
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
}

.center-button {
  margin: auto;
  height: 92%;

  border: none;
  background-color: var(--navTextColor);
}
</style>