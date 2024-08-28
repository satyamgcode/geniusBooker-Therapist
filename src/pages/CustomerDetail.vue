<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page class="q-pa-none full-height bg-cover flex flex-center">
          <q-card class="q-pa-md glass-card">
            <q-card-section>
              <div class="text-h5 text-center ">Book Appointment</div>
            </q-card-section>
  
            <q-card-section>
              <q-form @submit.prevent="submitForm">
                <q-input
                  filled
                  v-model="formData.fullName"
                  label="Full Name"
                  outlined
                  :rules="[val => !!val || 'Full Name is required']"
                />
                <q-input
                  filled
                  v-model="formData.phoneNumber"
                  label="Phone Number"
                  outlined
                  type="tel"
                  :rules="[val => !!val || 'Phone Number is required']"
                />
                <q-select
                  filled
                  v-model="formData.sessionDuration"
                  label="Session Duration"
                  :options="sessionOptions"
                  outlined
                  :rules="[val => !!val || 'Please select a session duration']"
                />
                <q-btn
                  label="Book Appointment"
                  color="primary"
                  type="submit"
                  class="q-mt-md full-width"
                />
              </q-form>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AppHeader from 'src/components/common/AppHeader.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  
  const formData = ref({
    fullName: '',
    phoneNumber: '',
    sessionDuration: null,
  })
  
  const sessionOptions = [
    { label: '30 minutes', value: '30' },
    { label: '60 minutes', value: '60' },
    { label: '90 minutes', value: '90' },
  ]
  
  const submitForm = () => {
    console.log(formData.value)
    router.push('/therapyStores')
  }
  </script>
  
  <style scoped>
  .full-height {
    height: 100vh;
  }
  
  .bg-cover {
    background-image: url('../assets/therapist-backgrounds.png');
    background-size: cover;
    background-position: center;
  }
  
  .glass-card {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px); 
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

  </style>
  