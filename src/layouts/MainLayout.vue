<template>
  <q-layout view="lHh Lpr lFf">
    <home-header />

    <q-page-container>
      <q-page padding class="page-content">
        <div class="welcome-container">
          <div class="welcome-text">
            <h1 class="welcome-title text-h4 text-md-h2 text-lg-h1">Welcome to Genius Booker</h1>
            <h3 class="welcome-subtitle text-body1 text-md-subtitle1">Your Home Therapist</h3>
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
</script>

<style scoped>
.page-content {
  background-image: url('../assets/therapist-backgrounds.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
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
.booking-section{
  display: flex;
  flex-direction: column;
  align-items: center;
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
  .gb-inner-container{
    flex-direction: row;
  }
}
</style>
