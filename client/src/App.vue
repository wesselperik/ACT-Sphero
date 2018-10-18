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
            <p class="hint">Use WASD or click the arrows below to control Sphero!</p>
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td><v-btn v-bind:class="{ 'primary': w }" @click="roll('w')"><v-icon>arrow_upward</v-icon></v-btn></td>
                  <td></td>
                </tr>
                <tr>
                  <td><v-btn v-bind:class="{ 'primary': a }" @click="roll('a')"><v-icon>arrow_back</v-icon></v-btn></td>
                  <td></td>
                  <td><v-btn v-bind:class="{ 'primary': d }" @click="roll('d')"><v-icon>arrow_forward</v-icon></v-btn></td>
                </tr>
                <tr>
                  <td></td>
                  <td><v-btn v-bind:class="{ 'primary': s }" @click="roll('s')"><v-icon>arrow_downward</v-icon></v-btn></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
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
      w: false,
      a: false,
      s: false,
      d: false,
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
          // message contains direction data.
          if (JSON.parse(message.data).key == "w") {
            this.w = true;
            this.a = false;
            this.s = false;
            this.d = false;
            setTimeout(() => { this.w = false; }, 3000);
          } else if (JSON.parse(message.data).key == "a") {
            this.a = true;
            this.w = false;
            this.s = false;
            this.d = false;
            setTimeout(() => { this.a = false; }, 3000);
          } else if (JSON.parse(message.data).key == "s") {
            this.s = true;
            this.w = false;
            this.a = false;
            this.d = false;
            setTimeout(() => { this.s = false; }, 3000);
           } else if (JSON.parse(message.data).key == "d") {
            this.d = true;
            this.w = false;
            this.a = false;
            this.s = false;
            setTimeout(() => { this.d = false; }, 3000);
          }
        }
      }
    },
    addKeyListener() {
      window.addEventListener("keypress", event => {
        if (event.key){
          this.roll(event.key);
        }
      });
    },
    addAlert(data) {
      var index = this.alerts.push(data) - 1;
      setTimeout(() => { this.alerts[index].show = false }, 4000);
    },
    roll(key) {
      if (this.socket.readyState === this.socket.OPEN) {
        if (key == 'w') {
          this.socket.send('{"key": "w"}');
        } else if (key == 'a') {
          this.socket.send('{"key": "a"}');
        } else if (key == 's') {
          this.socket.send('{"key": "s"}');
        } else if (key == 'd') {
          this.socket.send('{"key": "d"}');
        }
      }
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

  p.hint {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
  }

  table {
    margin: auto;
  }

  table button {
    width: 15vw !important;
    height: 15vw !important;
  }

  table button i {
    font-size: 5vw !important;
  }
</style>
