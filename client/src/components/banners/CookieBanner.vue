<template>
  <div class="container cookieBanner" v-if="!notShowCookieMsg" style="z-index: 2;">
    <div class="fullWidth black-background">
      <button @click="cookieClick()" class="center-button">Diese Website nutzt Cookies.</button>
      <button class="closeX" :style="`width: ${closeXWidth};`" @click="closeClick()">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBanner',
  data() {
    return {
      notShowCookieMsg: localStorage.notShowCookieMsg,

      closeXWidth:
        window.innerWidth > 600 ? '3%' : window.innerWidth / 8 + 'px',
    };
  },
  methods: {
    cookieClick() {
      this.closeClick();
    },
    closeClick() {
      localStorage.notShowCookieMsg = true;
      this.notShowCookieMsg = true;
      return 0;
    },
  },
};
</script>

<style>
.fullWidth {
  width: 98%;
  height: 50px;

  position: fixed;
  bottom: 0;
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

  color: #ffffff;

  border: none;
  background-color: var(--navTextColor);
}

.closeX {
  float: right;
  margin-right: 15px;
  height: 92%;

  color: #ffffff;

  border: none;
  background-color: var(--navTextColor);
}
</style>