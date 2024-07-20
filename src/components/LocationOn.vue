<!-- src/components/LocationOn.vue -->
<template>
  <div class="location-on">
    <img class="icon" alt="Icon" src="location_on.svg">
  </div>
</template>

<script>
export default {
  name: "LocationOn",
};
</script>

<style scoped>
.location-on {
  height: 24px;
  position: relative;
  width: 24px;
}

.location-on .icon{
  height: 20px;
  left: 5px;
  position: absolute;
  top: 2px;
  width: 14px;
}
</style>;