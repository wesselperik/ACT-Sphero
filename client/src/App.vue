<template>
  <v-app id="app">
      <v-toolbar dark extended flat>
        <v-toolbar-title>ACT-Sphero</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="btn--depressed black--text white hidden-sm-and-down">
          Socket status: <span v-if="socketConnected" class="green--text">Connected</span><span v-else class="red--text">Disconnected</span>
        </v-btn>
      </v-toolbar>

      <v-layout row pb-2 style="margin-top: -55px;">
        <v-flex xs12 md10 lg8 offset-xs0 offset-md1 offset-lg2>
          <v-card class="card--flex-toolbar">
            <p>Use WASD to control Sphero.<br>
            Open the console to see connection messages.</p>
            <p>{{ messages }}</p>
          </v-card>
        </v-flex>
      </v-layout>

      <v-footer height="auto">
        <v-layout justify-center row wrap>
          <v-btn flat round :href="'https://github.com/weselperik/ACT-Sphero'">Project on GitHub</v-btn>
          <v-flex py-3 text-xs-center xs12>&copy; 2018 Wessel Perik & Thymo van Beers</v-flex>
        </v-layout>
      </v-footer>

      <div class="alert-box">
        <div v-for="(alert, index) in alerts" :key="index">
          <v-alert v-model="alert.show" :type="alert.type" class="content-alert" transition="slide-y-reverse-transition">
            {{ alert.message }}
          </v-alert>
        </div>
      </div>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      socket: null,
      socketConnected: false,
      messages: "",
      alerts: []
    }
  },
  created() {
    window.addEventListener('beforeunload', function(event) {
      if (this.socket.readyState === this.socket.OPEN) {
        this.addAlert({ "type": "info", "message": "Disconnecting from socket...", "show": true });
        this.socket.close();
      }
    });
  },
  mounted: function () {
    // connect to the WebSocket
    this.connectSocket();
  },
  methods: {
    connectSocket() {
      this.addAlert({ "type": "info", "message": "Connecting to socket...", "show": true });
      this.socket = new WebSocket('ws://localhost:40510');

      this.socket.onopen = () => {
        // socket is open, bind key listener to the browser window
        this.addKeyListener();

        setTimeout(() => {
          this.addAlert({ "type": "success", "message": "Succesfully connected to socket!", "show": true });
          this.socketConnected = true;
        }, 1500);
      }

      this.socket.onmessage = (message) => {
        // check if message contains data
        if (JSON.parse(message.data).key) {
          // message contains data. Check the type of data
          this.messages += JSON.parse(message.data).key + "\n";
        }
      }
    },
    addKeyListener() {
      window.addEventListener("keypress", event => {
        if (this.socket.readyState === this.socket.OPEN){
          if (event.key == 'w') {
            this.socket.send('{"key": "w"}');
          } else if (event.key == 'a') {
            this.socket.send('{"key": "a"}');
          } else if (event.key == 's') {
            this.socket.send('{"key": "s"}');
          } else if (event.key == 'd') {
            this.socket.send('{"key": "d"}');
          }
        }
      });
    },
    addAlert(data) {
      var index = this.alerts.push(data) - 1;
      setTimeout(() => { this.alerts[index].show = false }, 4000);
    }
  }
}
</script>

<style>
  footer {
    bottom: 0;
    top: auto;
    position: absolute;
    width: 100vw;
  }
  .alert-box {
    position: fixed;
    top: auto;
    bottom: 0;
    left: auto;
    right: 0;
    margin: 20px;
    max-width: 400px;
  }
  
  .alert-box .v-alert {
    margin: 10px;
    min-width: 300px;
  }

  .alert-box .v-alert .v-alert__icon {
    color: #ffffff;
  }

  .v-toolbar button span {
    margin-left: 5px;
  }

  .v-card {
    padding: 30px;
  }
</style>
