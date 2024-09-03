<template>
  <q-layout view="lHh Lpr lFf">
    <home-header />

    <q-page-container>
      <q-page padding class="page-content">
        <div class="welcome-container">
          <div class="welcome-text">
            <h1 class="welcome-title text-h4 text-md-h2 text-lg-h1">Welcome to Genius Booker</h1>
            <div>
              <h3 class="welcome-subtitle text-body1 text-md-subtitle1">Grow your Business</h3>
              <h6>Own a Store now !!</h6>
            </div>
            
            <div class="bg-cover-container bg-grey-13 q-pa-md store-heading">
              <h3 class="welcome-subtitle text-sm text-body1 text-md-subtitle1 text-weight-bold">
                Maximize your impact with our comprehensive therapist support services
              </h3>
            </div>
          </div>
        </div>
        <q-btn
          class="store-btn q-mt-xl" color="primary" label="Create Store" @click="navigateToStoreLogin" />
        <span class="text-body1 text-lg text-center q-mb-lg q-mt-md q-pa-sm bg-positive text-white" style="border-radius: 20px;">
          Connect with more clients and expand your reach effortlessly.
        </span>
      </q-page>

      <q-page class="q-pa-md store-feature-page">
        <div class="feature-section">
          <h2 class="feature-title text-h4 text-center">Store Management Made Easy</h2>
          <div class="feature-cards-container q-mt-xl">
            <q-card class="feature-card q-pa-md">
              <q-icon name="store" size="40px" color="primary" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Create & Manage Stores</h4>
                <p>
                  Easily create new stores, manage existing ones, and monitor performance with our intuitive dashboard.
                </p>
              </div>
            </q-card>
            <q-card class="feature-card q-pa-md">
              <q-icon name="group" size="40px" color="secondary" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Staff Management</h4>
                <p>
                  Add, edit, and organize your staff members. Assign roles and manage permissions effortlessly.
                </p>
              </div>
            </q-card>
            <q-card class="feature-card q-pa-md">
              <q-icon name="trending_up" size="40px" color="positive" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Performance Tracking</h4>
                <p>
                  Track your store's performance with real-time analytics and insightful reports.
                </p>
              </div>
            </q-card>
            <q-card class="feature-card q-pa-md">
              <q-icon name="settings" size="40px" color="accent" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Customization Options</h4>
                <p>
                  Customize your store's appearance and functionality to align with your brand.
                </p>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>

      <q-page class="q-pa-md">
        <div class="gb-heading">
          <h3>Best Online Counselling and Therapy Consultation</h3>
          <div class="gb-inner-container">
            <div class="flex flex-wrap justify-between q-ma-xl image-container">
              <img class="responsive-image" src="../assets/therapyOnlinne.jpg" alt="loading...">
            </div>
            <div class="booking-section">
              <p class="gb-inner-heading">
                Genius Booker provides the best online therapy and Counseling consultation Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae reiciendis, cumque quidem alias vel ab illo nisi! Ipsam sed voluptatum consequatur adipisci vero doloremque, placeat deleniti nam nisi aliquam asperiores.
              </p>
              
              <q-btn
                label="Book an Appointment"
                color="primary"
                class="q-mt-md booking-btn"
                @click="handleBooking"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HomeHeader from '../components/common/HomeHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBooking = () => {
  router.push('/CustomerDetail')
}

const navigateToStoreLogin = () => {
  router.push('/owner/signup')
}
</script>

<style scoped>
.page-content {
  background-image: url('../assets/therapist-backgrounds.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 70vh;
  align-items: center;
  position: relative;
  padding: 10px;
}

.gb-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gb-inner-heading {
  max-width: 600px;
  display: flex;
  align-content: center;
  margin-right: 60px;
  font-size: 16px;
}

.gb-inner-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
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
  max-width: 90%;
  width: 100%;
}

.welcome-title {
  font-size: 2rem;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #555;
}

.booking-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.store-heading {
  border-radius: 20px;
}

.store-btn {
  z-index: 50;
  border-radius: 10px;
}
.store-feature-page{
  min-height: 500px !important;
}
.feature-section {
  text-align: center;
  margin-top: 20px;
}

.feature-title {
  margin-bottom: 20px;
  margin-top: 40px;
  font-weight: bold;
}

.feature-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.feature-card {
  width: 100%;
  max-width: 280px;
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.feature-content {
  text-align: center;
}

@media (min-width: 600px) {
  .welcome-title {
    font-size: 3rem;
  }

  .welcome-subtitle {
    font-size: 1.5rem;
  }
}

@media (min-width: 960px) {
  .welcome-title {
    font-size: 4rem;
  }

  .welcome-subtitle {
    font-size: 2rem;
  }

  .gb-inner-container {
    flex-direction: row;
  }
}
</style>
