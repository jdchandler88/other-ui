//Import of basic components needed
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { jsPanel } from "jspanel4";

//Import of CSS files required
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "jspanel4/es6module/jspanel.css";

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$panel", { value: jsPanel });

new Vue({
  render: h => h(App)
}).$mount("#app");
