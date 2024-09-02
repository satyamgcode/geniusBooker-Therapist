<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page padding class="bg-light page-wrapper">
          <div class="form-wrapper">
            <q-card flat bordered class="q-pa-lg">
              <q-card-section class="text-center">
                <h2 class="text-primary">Book an Appointment</h2>
                <p>Fill in the details to schedule your session</p>
              </q-card-section>
  
              <q-card-section>
                <q-form @submit="handleSubmit" class="q-gutter-md">
                  <!-- Customer Name -->
                  <q-input
                    v-model="form.name"
                    label="Your Name"
                    filled
                    dense
                    :rules="[val => !!val || 'Name is required']"
                    class="input-field"
                  />
  
                  <!-- Phone Number -->
                  <q-input
                    v-model="form.phone"
                    label="Phone Number"
                    filled
                    dense
                    :rules="[val => !!val || 'Phone number is required']"
                    class="input-field"
                  />
  
                  <!-- Email (Optional) -->
                  <q-input
                    v-model="form.email"
                    label="Email (Optional)"
                    filled
                    dense
                    placeholder="Enter your email (optional)"
                    class="input-field"
                  />
  
                  <!-- I'm not a robot Checkbox -->
                  <q-checkbox
                    v-model="form.notRobot"
                    label="I am not a robot"
                    size="lg"
                    color="primary"
                    :keep-color="true"
                    class="robot-check"
                  />
  
                  <!-- Submit Button -->
                  <q-btn
                    type="submit"
                    label="Submit"
                    color="primary"
                    class="full-width q-mt-lg"
                    size="lg"
                    :disable="isSubmitting"
                    loading="isSubmitting"
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import AppHeader from 'src/components/common/AppHeader.vue';
  
  const $q = useQuasar();
  const isSubmitting = ref(false);
  
  const form = ref({
    name: '',
    phone: '',
    email: '',
    date: null,
    time: null,
    notRobot: false
  });
  
  // Available dates and times (Dynamic based on selected therapist)
  const availableDates = ref([]);
  const availableTimes = ref([]);
  
  function fetchTherapistSchedule(therapistId) {
    // Fetch available dates based on selected therapist
    availableDates.value = ['2024-09-03', '2024-09-05', '2024-09-07'];
  }
  
  function fetchAvailableTimes() {
    // Fetch available times based on selected date
    availableTimes.value = [
      { label: '10:00 AM', value: '10:00' },
      { label: '2:00 PM', value: '14:00' }
    ];
  }
  
  function handleSubmit() {
    if (!form.value.notRobot) {
      $q.notify({
        type: 'negative',
        message: "Please confirm you're not a robot!"
      });
      return;
    }
  
    isSubmitting.value = true;
  
    // Simulate API call to submit the booking request
    setTimeout(() => {
      isSubmitting.value = false;
      $q.notify({
        type: 'positive',
        message: 'Booking request submitted!'
      });
  
      // Clear form
      form.value = {
        name: '',
        phone: '123-456-7890',
        email: '',
        therapist: null,
        date: null,
        time: null,
        notRobot: false
      };
    }, 2000);
  }
  </script>
  
  <style scoped>
  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
  }
  
  .form-wrapper {
    max-width: 600px;
    width: 100%;
  }
  
  .q-card {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  
  
  .calendar-wrapper {
    display: flex;
    gap: 16px;
  }
  
  .calendar-field {
    flex: 1;
  }
  
  .robot-check {
    margin-top: 20px;
  }
  
  .full-width {
    width: 100%;
  }
  </style>
  