<template>
  <q-layout view="lHh Lpr lFf">
    <home-header />

    <q-page-container>
      <q-page padding class="page-content">
        <div class="welcome-container">
          <div class="welcome-text">
            <h1 class="welcome-title text-h4 text-md-h2 text-lg-h1">Welcome to Genius Booker</h1>
            <div>
              <h3 class="welcome-subtitle text-body1 text-md-subtitle1">Simplifying Your Booking Experience</h3>
              <h6 class="business-head">Your business, Our tools, Endless possibilities.</h6>
            </div>

            <div class="bg-cover-container bg-grey-13 q-pa-md store-heading">
              <h3 class="welcome-subtitle text-sm text-body1 text-md-subtitle1 text-weight-regular">
                Empowering small businesses with smarter booking solutions.
              </h3>
            </div>
          </div>
        </div>
        <q-btn
          class="store-btn q-mt-xl"
          color="primary"
          label="Create Store"
          @click="navigateToStoreLogin"
        />
        <span
        class="text-body1 text-lg text-center q-mb-lg q-mt-md q-pa-sm text-primary bg-grey-4"
        style="border-radius: 20px;"
        > 
            Join Genius Booker today and grow your business with ease.
        </span>

      </q-page>



      <!-- Interactive Feature Section -->
      <q-page class="q-pa-md store-feature-page">
        <div class="feature-section">
          <h2 class="feature-title text-h4 text-center">
            Store Management Made Easy
          </h2>
          <p class="feature-description text-body2 text-center">
            Discover the most powerful tools to streamline your business operations.
          </p>
          <div class="feature-cards-container q-mt-xl">
            <q-card class="feature-card q-pa-md hover-card">
              <q-icon name="store" size="40px" color="primary" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Create & Manage Stores</h4>
                <p>
                  Easily create new stores, manage existing ones, and monitor performance with our intuitive dashboard.
                </p>
              </div>
            </q-card>
            <q-card class="feature-card q-pa-md hover-card">
              <q-icon name="group" size="40px" color="secondary" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Staff Management</h4>
                <p>
                  Add, edit, and organize your staff members. Assign roles and manage permissions effortlessly.
                </p>
              </div>
            </q-card>
            <q-card class="feature-card q-pa-md hover-card">
              <q-icon name="trending_up" size="40px" color="positive" />
              <div class="feature-content q-mt-md">
                <h4 class="text-h5">Performance Tracking</h4>
                <p>
                  Track your store's performance with real-time analytics and insightful reports.
                </p>
              </div>
            </q-card>
            <q-card class="feature-card q-pa-md hover-card">
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
        <div class="gb-handle-staff">
          <q-btn
            class="feature-btn q-mt-xl"
            color="primary"
            label="Therapist Login"
            @click="navigateToTherapistLogin"
          />
          <q-btn
            class="feature-btn q-mt-xl"
            color="positive"
            label="Manager Login"
            @click="navigateToManagerLogin"
          />
        </div>
      </q-page>

      <!-- Booking Section -->
      <q-page class="q-pa-md">
        <div class="gb-heading">
          <h3 class="booking-heading">Best Online Counselling and Therapy Consultation</h3>
          <div class="gb-inner-container">
            <div class="flex flex-wrap justify-between q-ma-xl image-container">
              <img class="responsive-image" src="../assets/therapyOnlinne.jpg" alt="loading...">
            </div>
            <div class="booking-section">
              <p class="gb-inner-heading">
                Genius Booker provides the best online therapy and Counseling consultation services. Let us simplify your booking process and help your clients find the perfect therapy session.
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

      <!-- Mission Section -->
      <q-page class="q-pa-md mission-section">
        <div class="mission-content q-px-lg q-py-md q-mx-md">
          <q-icon name="lightbulb_outline" size="60px" color="primary" />
          <h2 class="text-h4 text-center q-mt-lg">
            Our Mission
          </h2>
          <p class="mission-text q-mt-md text-center text-body1">
            {{ missionStatement }}
          </p>
        </div>
        <!-- Services Section -->
        <div class="services-section q-pa-md">
          <h2 class="services-title text-h4 text-center">
            Our Services
          </h2>
          <div class="services-cards-container q-mt-xl">
            <q-card class="services-card q-pa-md hover-card">
              <q-icon name="storefront" size="40px" color="primary" />
              <div class="services-content q-mt-md">
                <h4 class="text-h5">Create Store</h4>
                <p>
                  Set up your online store effortlessly and start reaching more customers.
                </p>
              </div>
            </q-card>
            <q-card class="services-card q-pa-md hover-card">
              <q-icon name="group_work" size="40px" color="secondary" />
              <div class="services-content q-mt-md">
                <h4 class="text-h5">Manage Staff</h4>
                <p>
                  Organize your team effectively with our comprehensive staff management tools.
                </p>
              </div>
            </q-card>
            <q-card class="services-card q-pa-md hover-card">
              <q-icon name="person" size="40px" color="positive" />
              <div class="services-content q-mt-md">
                <h4 class="text-h5">Customer Management</h4>
                <p>
                  Engage with your customers and manage their bookings seamlessly.
                </p>
              </div>
            </q-card>
            <q-card class="services-card q-pa-md hover-card">
              <q-icon name="calendar_today" size="40px" color="accent" />
              <div class="services-content q-mt-md">
                <h4 class="text-h5">Appointment Scheduling</h4>
                <p>
                  Allow customers to book appointments easily through your personalized booking page.
                </p>
              </div>
            </q-card>
            <q-card class="services-card q-pa-md hover-card">
              <q-icon name="settings_applications" size="40px" color="warning" />
              <div class="services-content q-mt-md">
                <h4 class="text-h5">Advanced Settings</h4>
                <p>
                  Customize settings to tailor the platform according to your business needs.
                </p>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>

      <!--  -->
      <FeedbackSection  />
      <AppFooter/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HomeHeader from '../components/common/HomeHeader.vue'
import FeedbackSection from 'src/components/FeedbackSection.vue';
import AppFooter from 'src/components/common/AppFooter.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const missionStatement = `
  Our mission at GeniusBooker is to simplify and revolutionize the booking experience by offering seamless, user-friendly, and innovative solutions for both customers and store owners.
  We are committed to delivering exceptional value, ensuring convenience, and fostering trust in every interaction.
  Our goal is to empower users with the smartest tools to find and book therapy sessions, while helping store owners maximize their reach and potential.
`

const handleBooking = () => {
  router.push('/therapyStores')
}

const navigateToStoreLogin = () => {
  router.push('/owner/signup')
}
const navigateToTherapistLogin = () => {
  router.push('/therapist-login')
}
const navigateToManagerLogin = () => {
  router.push('/manager-login')
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

.mission-section {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  margin: 40px 0;
}

.mission-text {
  font-size: 1.2rem;
  color: #333;
}

.feature-description {
  color: #555;
}

.hover-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
  margin: unset !important;
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #555;
}
.business-head{
  margin :unset !important;
  margin-bottom: 80px !important;
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
  transition: all 0.3s ease;
}
.booking-heading{
  text-align: center;
}

.feature-content {
  text-align: center;
}

.mission-section {
  margin-top: 40px;
  text-align: center;
}

.mission-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.mission-text {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}
/* Services Section Styles */
.services-section {
  margin-top: 40px;
}

.services-title {
  margin-bottom: 20px;
  font-weight: bold;
}

.services-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.services-card {
  width: 100%;
  max-width: 240px;
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.q-page-container{
  /* padding-top: unset !important; */
  /* padding-bottom: unset !important; */
}

.services-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.services-content {
  text-align: center;
}
.booking-btn{
  border-radius: 20px;
}
.gb-handle-staff{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 10px;
  flex-wrap: wrap;
}
.feature-btn{
  border-radius: 25px;
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

@media (max-width: 960px) {
  .mission-text {
  font-size: 1rem;
  }
  .gb-inner-heading{
    margin: unset !important;
    text-align: center !important;
  }
}

</style>
