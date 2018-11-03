//Import of basic components needed
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { jsPanel } from "jspanel4";
import JsPanel from "./components/JsPanel"
import Simple from "./apps/Simple"
import Complex from "./apps/Complex"

//globally register jspanel.  this is a 'global' component used everywhere.
Vue.component("JsPanel", JsPanel);
Vue.component("Simple", Simple);
Vue.component("Complex", Complex);

//Import of CSS files required
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "jspanel4/es6module/jspanel.css";

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$panel", { value: jsPanel });

//container for apps detected in system
var availableApps = [];
//register apps globally. this way, they can be included dynamically
const req = require.context('./apps/', true, /\.(js|vue)$/i);
req.keys().map(key => {
  //debug: print which component was located
  console.log(key);
  const name = key.match(/\w+/)[0];
  //register the component with application: this will allow dynamic list of avaliable apps
  availableApps.push(name);
  //register component with vue
  return Vue.component(name, req(key).default)
});

new Vue({
  render: h => h(App),
  data: {
    availableApps: availableApps,
    openApps: []
  }
}).$mount("#app");
