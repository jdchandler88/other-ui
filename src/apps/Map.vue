<template>
    <div id="mapcontainer"></div>
</template>

<script>
    import { loadModules } from 'esri-loader'
    
    export default {
        mounted() {
                console.log('map: mounted')
                loadModules([
                'esri/Map',
                'esri/views/SceneView',
                // 'esri/views/MapView',
                'esri/core/watchUtils'
                ]).then(([EsriMap, SceneView, watchUtils]) => {
                    // create map with the given options at a DOM node w/ id 'mapNode'
                    let map = new EsriMap({
                        basemap: 'satellite',
                        ground: 'world-elevation'
                        });
                    const view = new SceneView({
                        container: 'mapcontainer',
                        map
                    });
                    console.log("map:mounted: SUCCESS?");
                // NOTE: important: now that we're using a promise
                // your callback must NOT return any v4.x classes that resolve to promises
                // this will cause a hole in the space-time continum that will kill us all
                // return view
                }).catch(error =>  {
                    console.log("map:mounted FAILURE", error);
                });
        }
    }
</script>

<style scoped>
@import url('https://js.arcgis.com/4.9/esri/css/main.css');

#mapcontainer {
  height: 500px;
  width: 100%;
}
</style>