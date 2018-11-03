<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" fixed temporary app>
      <v-list dense>
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
        <v-subheader class="mt-3 grey--text text--darken-1">APPLICATIONS</v-subheader>
        <v-list-tile v-for="item in items" :key="item.text" @click="launchApp">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title :ref="'app-' + item.text.toLowerCase().replace(' ', '-')">
              {{ item.text }}
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
        <JsPanel v-for="app in $root.openApps" v-bind:key="app" :comp="app"></JsPanel>
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
    ]
  }),
  props: {
    source: String
  },
  methods: {
    launchApp: function() {
      //Wrap the TestApp in a Vue extension. This gives us a constructor for the file as it is not a class in and of itself
      //  and as such it can not be constructed on it's own. By extending Vue we get vue's constructor to use.
      var CompClass = Vue.extend(TestApp);
      //Create an instance of the class we wish to launch.
      var instance = new CompClass();
      //The $mount() is used to render what the HTML will look like for the 'Vue class' we want to populate.
      instance.$mount();

      //Create an instance of the JSPanel4 oject that holds the element that was rendered from the instance variable above.
      //  This will make the popup hold the values and data from the TestApp.vue file. Other properties review values at the
      //  JSPanel API site.
      this.$panel.create({
        theme: "primary",
        headerTitle: "my panel #1",
        position: "center-top 0 58",
        contentSize: "450 250",
        content: instance.$el,
        callback: function() {
          this.content.style.padding = "20px";
        },
        onbeforeclose: function() {
          return confirm("Do you really want to close the panel?");
        }
      });
    },
    launchOurApp(component) {
        this.drawer = !this.drawer;
        this.$root.openApps.push(component);
    }
  }
  

};
</script>
