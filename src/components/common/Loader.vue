<template>
    <div class="loader-overlay" v-if="isVisible">
      <q-spinner :color="color" :size="size" />
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: '50px',
    },
  });
  </script>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }
  </style>
  