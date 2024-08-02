<template>
  <div ref="map" class="map"></div>
</template>

<script>
/* global google */

import {Loader} from "@googlemaps/js-api-loader";

export default {
  name: 'MapComponent',
  props: {
    center: {
      type: Object,
      default: () => ({lat: 37.5665, lng: 126.9780}) // 서울의 기본 좌표
    },
    zoom: {
      type: Number,
      default: 10
    }
  },
  mounted() {
    this.loadGoogleMapsApi();
  },
  methods: {
    async loadGoogleMapsApi() {
      const loader = new Loader({
        apiKey: 'AIzaSyAWbTMbQni2k1rhRNxtJX7iUsRFl5fR3ss',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        this.initMap();
      } catch (error) {
        console.error('Google Maps API load error:', error);
      }
    },
    initMap() {
      const mapOptions = {
        center: this.center,
        zoom: this.zoom
      };
      this.map = new google.maps.Map(this.$refs.map, mapOptions);
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>