<template>
    <component v-bind:is="comp"></component>
</template>

<script>
    export default {
        props: ['comp'],
        mounted() {
            this.$panel.create({
                theme: "primary",
                headerTitle: "my panel #1",
                position: "center-top 0 58",
                contentSize: "450 250",
                content: this.$el,
                callback: function() {
                    this.content.style.padding = "20px";
                },
                onbeforeclose: function() {
                    return confirm("Do you really want to close the panel?");
                }
            });
        }
    }
</script>