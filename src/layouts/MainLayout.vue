<template>
  <q-layout view="lHh Lpr lFf">
    <home-header />

    <q-page-container>
      <q-page padding class="page-content">
        <div class="welcome-container">
          <div class="welcome-text">
            <h1 class="welcome-title">Welcome to Genius Booker</h1>
            <h3 class="welcome-subtitle">Your Home Therapist</h3>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HomeHeader from '../components/common/HomeHeader.vue'
</script>

<style scoped>
.page-content {
  background-image: url('../assets/therapist-backgrounds.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.page-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.welcome-container {
  text-align: center;
  z-index: 2;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
}

.welcome-subtitle {
  font-size: 2rem;
  color: #555;
}
</style>
