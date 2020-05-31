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
              throw err;
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
          try {
            const push = await serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlB64ToUint8Array(
                'BATndbq9yATBnHCvpGMBOyaVGdpw80-UeXDmSR8nyf1Qmk6oi8EUM-sQ90PxAX3VquE9fC_tFxdu9EDOgbxbsZ4',
              ),
            });

            console.log('push: ');
            console.log(push);

            const pushSub = JSON.stringify(push);
            console.log('pushSub: ');
            console.log(pushSub);

            const url = '/api/subscribe/';
            const response = await axios.post(url, { pushSub });
            return response;
          } catch (err) {
            console.log(err);
            throw err;
          }
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

  position: absolute;
  bottom: 0;
  left: 0;
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