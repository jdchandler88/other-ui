<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" fixed temporary app>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">App Control</v-subheader>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn @click="toggleApps">Toggle Apps: {{ this.isVisible() }}</v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Toggle Apps</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-subheader class="mt-3 grey--text text--darken-1">OUR APPLICATIONS</v-subheader>
        <v-list-tile v-for="item in this.$root.availableApps" :key="item" @click="launchOurApp(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title :ref="'app-' + item">
              {{ item }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">ADMINISTRATION</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" avatar>
            <v-list-tile-avatar>
              <img alt="N">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="grey" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">important_devices</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Application Title</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content> 
      <v-container fill-height>
        <!-- renders a panel for each open app in openapps. does each app need a unique identifier? i dunno --> 
        <!-- <div v-if="this.isVisible()"> -->
          <JsPanel v-for="app in $root.openApps" :key="app.id" :comp="app.name" :appid="app.id" :visible="isVisible()" @close="close(app.id)">
            <component :is="app.name"></component>
          </JsPanel>
        <!-- </div> -->
        
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn
                slot="activator"
                :href="source"
                icon
                large
                target="_blank"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/YeRKwQ" target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import TestApp from "./components/TestApp.vue";

export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: "trending_up", text: "Most Popular" },
      { icon: "subscriptions", text: "Subscriptions" },
      { icon: "history", text: "History" },
      { icon: "featured_play_list", text: "Playlists" },
      { icon: "watch_later", text: "Watch Later" }
    ],
    items2: [
      { picture: 28, text: "Joseph" },
      { picture: 38, text: "Apple" },
      { picture: 48, text: "Xbox Ahoy" },
      { picture: 58, text: "Nokia" },
      { picture: 78, text: "MKBHD" }
    ],
    inst: 0,
    visible: true
  }),
  props: {
    source: String
  },
  methods: {
    launchOurApp(component) {
        this.drawer = !this.drawer;
        this.$root.openApps.push(
          {name: component, id: this.inst++}
        );
    },
    getNextId() {
      return this.inst++;
    },
    close(id) {
      console.log(id + "closed");
      for (var i=0; i<this.$root.openApps.length; i++) {
        var openApp = this.$root.openApps[i];
        if (openApp.id === id) {
          console.log("YAS");
          this.$root.openApps.splice(i, 1);
        }
      }
    },
    isVisible() {
      return this.visible;
    },
    toggleApps() {
      this.visible = !this.visible;
    }
  }
};
</script>
