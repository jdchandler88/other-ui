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
      hiding: false
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
      this.jspanel = jsPanel.create(options)
    },
    close() {
      if (this.visible) {
        this.$emit('close')
        this.$emit('update:visible', false)
      }
    },
    hide() {
      this.jspanel.close();
    }
  }
}
</script>