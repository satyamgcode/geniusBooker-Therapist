<template>
    <q-layout view="lHh Lpr lFf">
      <AppHeader />
      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <q-card class="q-py-lg q-px-md" v-if="!loading">
              <q-card-section>
                <div class="q-gutter-md text-center">
                  <q-icon name="info" size="50px" color="primary" />
                  <h4>Hi, {{ customerName }}!</h4>
                </div>
                <p>
                  Your previous appointment with <strong>{{ therapistName }}</strong> , 
                  <strong>{{ storeName }}</strong> has been rescheduled to new time due to some reason.
                </p>
                <p>
                  <strong>Rescheduled Date:</strong> {{ newAppointmentDate }}<br />
                  <strong>Session Time:</strong> {{ newAppointmentTime }}<br />
                  <strong>Duration:</strong> {{ sessionDuration }}
                </p>
                <p>
                  Kindly confirm your appointment by clicking the Confirm button or you can cancel the appointment.
                </p>
              </q-card-section>
              <q-card-actions align="around">
                <q-btn
                  flat
                  label="Cancel"
                  icon="close"
                  color="negative"
                  @click="cancelAppointment"
                />
                <q-btn
                  flat
                  label="Confirm"
                  icon="check"
                  color="positive"
                  @click="confirmAppointment"
                />
              </q-card-actions>
            </q-card>
  
            <!-- Loader while fetching details -->
            <q-spinner v-if="loading" size="50px" color="primary" class="q-ma-md" />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { format } from 'date-fns';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  import { ref, onBeforeMount } from 'vue';
  
  const router = useRouter();
  const route = useRoute();
  const rescheduleDetails = ref({});
  const loading = ref(true); // Loading state to control when data is fetched
  
  function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate - startDate) / (1000 * 60); // duration in minutes
  }
  
  function formatTimeSlot(start, end) {
    const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${startTime} - ${endTime}`;
  }
  
  // Dummy data bindings using computed values
  const customerName = ref('');
  const newAppointmentDate = ref('');
  const newAppointmentTime = ref('');
  const therapistName = ref('');
  const storeName = ref('');
  const sessionDuration = ref('');
  
  const appointment_id = Object.keys(route.query)[0];
  
  const updateDetails = () => {
    customerName.value = rescheduleDetails.value?.customer_name;
    newAppointmentDate.value = format(new Date(rescheduleDetails.value.current_start_time), 'yyyy-MM-dd');
    newAppointmentTime.value = formatTimeSlot(rescheduleDetails.value.current_start_time, rescheduleDetails.value.current_end_time);
    therapistName.value = rescheduleDetails.value?.therapist;
    storeName.value = rescheduleDetails.value?.store;
    sessionDuration.value = `${calculateDuration(rescheduleDetails.value?.current_start_time, rescheduleDetails.value?.current_end_time)} mins`;
  };
  
  const updateBookingStatus = async (status) => {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/appointments/${appointment_id}/confirm/`,
        { confirmation_status: status },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  
  // Handlers
  const cancelAppointment = () => updateBookingStatus('Declined');
  const confirmAppointment = () => updateBookingStatus('Confirmed');
  
  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/appointment-details/${appointment_id}/`);
      rescheduleDetails.value = response.data;
      updateDetails();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false; // Stop loading once the data is fetched
    }
  };
  
  onBeforeMount(async () => {
    await fetchAppointmentDetails();
  });
  </script>
  
  <style scoped>
  .q-card {
    max-width: 600px;
    margin: auto;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  