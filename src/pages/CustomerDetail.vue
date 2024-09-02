<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page class="q-pa-none full-height flex flex-center bg-cover">
        <q-card class="q-pa-sm q-ma-md custom-card">
          <q-card-section>
            <div class="text-h4 text-center q-mb-md">Book Your Appointment</div>
            <div class="text-subtitle1 text-center q-mb-sm">Fill in your details to schedule a session</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="submitForm">
              <q-input
                filled
                v-model="formData.fullName"
                label="Full Name"
                outlined
                dense
                :rules="[val => !!val || 'Full Name is required']"
                class="custom-input"
              />
              <q-input
                filled
                v-model="formData.phoneNumber"
                label="Phone Number"
                outlined
                type="tel"
                dense
                :rules="[val => !!val || 'Phone Number is required']"
                class="custom-input"
              />
              <q-select
                filled
                v-model="formData.sessionDuration"
                label="Session Duration"
                :options="sessionOptions"
                outlined
                dense
                :rules="[val => !!val || 'Please select a session duration']"
                class="custom-input"
              />
              <q-btn
                label="Book Appointment"
                color="primary"
                type="submit"
                class="q-mt-md full-width custom-button"
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

.custom-card {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  max-width: 350px;
}

.custom-input {
  font-size: 14px;
}

.custom-button {
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
  font-weight: bold;
  background: linear-gradient(45deg, #667eea, #764ba2);
}
</style>
