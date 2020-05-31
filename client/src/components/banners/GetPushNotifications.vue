<template>
  <div class="container fullWidth black-background" v-if="!pushEnabled">
    <button @click="getPush" class="center-button">Benachrichtigungen aktivieren</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pushEnabled: localStorage.pushEnabled,
    };
  },
  methods: {
    getPush() {
      Notification.requestPermission(status => {
        console.log('Notifications: ' + status);
        if (status === 'default' || status === 'granted') {
          this.subscribeToPush()
            .then(responseJson => {
              console.log(`Finished subscribing: ${responseJson}`);
              localStorage.pushEnabled = true;
              return true;
            })
            .catch(err => {
              console.log(err);
              localStorage.pushEnabled = false;
              return false;
            });
        } else if (status === 'denied') {
          return false;
        } else {
          console.log('Something went wrong with requesting permission');
          return false;
        }
      });
    },

    async subscribeToPush() {
      console.log('SubscribeToPush');
      await navigator.serviceWorker.ready.then(
        async serviceWorkerRegistration => {
          let push;
          try {
            push = await serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlB64ToUint8Array(
                'BJ7W-pBAXF91XktUlW4smzlr5DKSn3HZI5ubRO2FL9xzvo3s5r0duXXKCH1o6MWgegXat4JT7uM0eooeYO0xpzE',
              ),
            });
          } catch (err) {
            console.log(err);
          }

          const pushSub = JSON.stringify(push);
          console.log(pushSub);

          let response;
          try {
            response = await axios.post('/api/subscribe', { pushSub });
          } catch (err) {
            console.log(err);
          }
          return response.json();
        },
      );
    },

    urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
  },
};
</script>

<style scoped>
.fullWidth {
  width: 100%;
  height: 50px;
}

.black-background {
  background-color: rgba(0, 0, 0, 0.8);
}

.center-button {
  margin: auto;
  height: 92%;

  border: none;
  background-color: var(--navTextColor);
}
</style>