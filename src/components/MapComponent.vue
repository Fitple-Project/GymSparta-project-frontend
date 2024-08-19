<template>
  <div ref="map" class="map"></div>
</template>

<script>
/* global google */

import { Loader } from "@googlemaps/js-api-loader";
import { getCurrentLocation } from "@/utils/location";

export default {
  name: 'MapComponent',
  props: {
    zoom: {
      type: Number,
      default: 15
    },
    markers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      googleMarkers: [],
      infoWindow: null
    };
  },
  watch: {
    markers: {
      handler(newMarkers) {
        this.clearMarkers();
        this.addMarkers(newMarkers);
      },
      deep: true
    }
  },
  mounted() {
    this.loadGoogleMapsApi();
  },
  methods: {
    async loadGoogleMapsApi() {
      const loader = new Loader({
        apiKey: 'AIzaSyAWbTMbQni2k1rhRNxtJX7iUsRFl5fR3ss',  // 여기에 실제 API 키를 입력하세요.
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

    async initMap() {
      try {
        const location = await getCurrentLocation();
        const mapOptions = {
          center: { lat: location.latitude, lng: location.longitude },
          zoom: this.zoom,
        };

        this.map = new google.maps.Map(this.$refs.map, mapOptions);

        const blueMarkerIcon = {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        };

        new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: this.map,
          icon: blueMarkerIcon,
          title: 'You are here'
        });

        this.infoWindow = new google.maps.InfoWindow();
        this.addMarkers(this.markers);
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    },

    addMarkers(markers) {
      this.clearMarkers();

      const bounds = new google.maps.LatLngBounds();
      markers.forEach(markerData => {
        const marker = new google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: this.map,
          title: markerData.title
        });

        marker.addListener('click', () => {
          const content = `
            <div>
              <h3>${markerData.title}</h3>
              <p>${markerData.address}</p>
            </div>
          `;
          this.infoWindow.setContent(content);
          this.infoWindow.open(this.map, marker);
        });

        this.googleMarkers.push(marker);
        bounds.extend(marker.position);
      });

      if (markers.length > 0) {
        this.map.fitBounds(bounds);
      }
    },

    clearMarkers() {
      this.googleMarkers.forEach(marker => marker.setMap(null));
      this.googleMarkers = [];
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
