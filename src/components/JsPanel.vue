<template>
  <div v-if="visible">
    <slot />
    <slot
      v-show="false"
      name="headerToolbar"
    />
  </div>
</template>
<script>
import { jsPanel } from 'jspanel4/es6module/jspanel.min.js'
export default {
  name: 'JsPanel',
  data: function() {
    return {
      jspanel: null,
      hiding: false,
      width: 500,
      height: 300,
      left: this.defaultLeft,
      top: this.defaultTop
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    panelOptions() {
      return Object.assign({ onclosed: this.close }, this.options)
    },
    defaultTop() {
      return window.innerHeight/2;
    },
    defaultLeft() {
      return window.innerWidth/2;
    }
  },
  watch: {
    visible(isVisible) {
      if (isVisible) {
        this.createPanel()
      } else {
        this.hide()
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.createPanel()
    }
    document.addEventListener('jspanelresizestop', this.changed);
    document.addEventListener('jspaneldragstop', this.changed);
  },
  destroyed() {
    document.removeEventListener('jspanelresizestop', this.changed);
    document.removeEventListener('jspaneldragstop', this.changed);
  },
  methods: {
    async createPanel() {
      await this.$nextTick()
      let options = Object.assign(
        { content: this.$slots.default[0].elm },
        this.panelOptions
      )
      if (this.$slots.headerToolbar) {
        options = Object.assign(
          { headerToolbar: this.$slots.headerToolbar[0].elm },
          options
        )
      }

      this.jspanel = jsPanel.create(options);
      this.jspanel.style.width = this.width;
      this.jspanel.style.height = this.height;
      this.jspanel.style.top = this.top;
      this.jspanel.style.left = this.left;
    },
    close() {
      if (this.visible) {
        this.$emit('close')
        this.$emit('update:visible', false)
      }
    },
    hide() {
      this.jspanel.close();
    },
    changed(event) {
      if (event.detail === this.jspanel.id) {
        this.width = this.jspanel.style.width;
        this.height = this.jspanel.style.height;
        this.top = this.jspanel.style.top;
        this.left = this.jspanel.style.left;
        console.log("top", this.top, "left", this.left);
        console.log("height", this.height, "width", this.width);
      }
    }
  }
}
</script>