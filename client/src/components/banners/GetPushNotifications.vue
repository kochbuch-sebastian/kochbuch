<template>
  <div class="container fullWidth black-background" v-if="!pushEnabled">
    <div class="activate" v-if="!pushNotAvailable">
      <button @click="getPush" class="center-button">Benachrichtigungen aktivieren</button>
    </div>
    <div class="notAvailable" v-show="pushNotAvailable">
      <h3
        class="error"
      >Push-Benachrichtigungen werden von Ihrem aktuellen Browser nicht unterstützt. Mögliche Browser sind zum Beispiel:</h3>
      <ul>
        <li>Google Chrome</li>
        <li>Mozilla Firefox</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pushEnabled: localStorage.pushEnabled,
      pushNotAvailable: false,
    };
  },
  methods: {
    showPushNotAvailable() {
      console.log('Push in this browser not available');
      this.pushNotAvailable = true;
      this.disappearAfterTenSeconds();
    },
    disappearAfterTenSeconds() {
      setTimeout(() => {
        this.pushNotAvailable = false;
        console.log('Push not available closed');
      }, 10000);
    },
    getPush() {
      Notification.requestPermission(status => {
        console.log('Notifications: ' + status);
        if (status === 'default' || status === 'granted') {
          this.subscribeToPush()
            .then(responseJson => {
              console.log(`Finished subscribing: ${responseJson}`);
              localStorage.pushEnabled = true;
              this.pushEnabled = true;
              return true;
            })
            .catch(err => {
              localStorage.pushEnabled = false;
              this.showPushNotAvailable();
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
      await navigator.serviceWorker.ready.then(
        async serviceWorkerRegistration => {
          try {
            const push = await serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlB64ToUint8Array(
                'BATndbq9yATBnHCvpGMBOyaVGdpw80-UeXDmSR8nyf1Qmk6oi8EUM-sQ90PxAX3VquE9fC_tFxdu9EDOgbxbsZ4',
              ),
            });

            const pushSub = JSON.stringify(push);

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
  width: 98%;
  height: 50px;

  position: absolute;
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
</style>