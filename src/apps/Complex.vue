<template>
    <div>
        <v-btn color="info" @click="increment">Increment</v-btn>
        <h3>Count: {{counter}}</h3>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            counter: 0
        }
    },
    methods: {
        increment() {
            this.counter++;
        }
    }
}
</script>