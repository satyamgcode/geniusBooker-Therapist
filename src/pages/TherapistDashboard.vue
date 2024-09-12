<template>
    <q-layout view="lHh Lpr lFf">
      <AppHeader />
      <q-page-container>
        <div class="q-pa-md q-mx-lg dashboard-container">
          <!-- Therapist Details Section -->
          <q-card flat bordered class="q-mb-lg therapist-card">
            <q-card-section class="row items-center justify-between">
              <div class="col">
                <h3 class="text-h5 q-mb-none">Therapist Profile</h3>
                <p class="text-subtitle2 q-mb-md text-grey-7">
                  View and edit your profile information
                </p>
              </div>
              <div class="col-auto">
                <q-btn
                  v-if="!isEditing"
                  color="primary"
                  icon="edit"
                  label="Edit"
                  flat
                  @click="isEditing = true"
                />
                <div class="handle-edit-save">
                  <q-btn
                v-if="isEditing"
                color="negative"
                icon="cancel"
                label="Cancel"
                flat
                @click="cancelEditing"
              />
                <q-btn
                  v-if="isEditing"
                  color="positive"
                  icon="save"
                  label="Save"
                  flat
                  @click="saveTherapistDetails"
                />
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pa-lg therapist-info">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="therapistDetails.storeName"
                    label="Store Name"
                    dense
                    filled
                    disable
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="therapistDetails.name"
                    label="Therapist Name"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="therapistDetails.experience"
                    label="Experience (years)"
                    dense
                    filled
                    type="number"
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="therapistDetails.role"
                    label="Role"
                    dense
                    filled
                    disable
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="therapistDetails.speciality"
                    label="Speciality"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="therapistDetails.description"
                    label="Description"
                    dense
                    filled
                    type="textarea"
                    :disable="!isEditing"
                  />
                </div>
              </div>
            </q-card-section>
            <q-separator />
                <q-btn
                  color="positive"
                  class="feature-btn q-mt-am"
                  icon="schedule"
                  label="customize schedule"
                  flat
                  @click="handleScheduleChange"
            />

          </q-card>
  
          <!-- Pending and Confirmed Bookings Panels -->
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <q-card flat bordered class="booking-card">
                <q-card-section class="q-pa-md bg-primary text-white">
                  <h3 class="text-h6">Pending Bookings</h3>
                </q-card-section>
                <q-separator />
                <q-list v-if="pendingBookings.length > 0" class="q-pa-none">
                  <q-item
                    v-for="(booking, index) in pendingBookings"
                    :key="index"
                    class="q-pa-md booking-item"
                    clickable
                    @click="viewBooking(booking)"
                  >
                    <q-item-section>
                      <q-item-label class="text-bold">{{ booking.name }}</q-item-label>
                      <q-item-label caption class="text-grey-7">
                        {{ booking.phone }} - {{ booking.sessionDuration }} mins
                      </q-item-label>
                      <q-item-label caption class="text-grey-7" > {{ booking.date }}</q-item-label>
                      <q-item-label caption class="text-grey-7" > {{ booking.timeSlot }}</q-item-label>
                    </q-item-section>
                    <q-item-section side class="action-buttons">
                      <q-btn
                        color="positive"
                        flat
                        icon="check_circle"
                        @click.stop="confirmBooking(booking)"
                      />
                      <q-btn
                        color="warning"
                        flat
                        icon="edit_calendar"
                        @click.stop="rescheduleBooking(booking)"
                      />
                      <q-btn
                        color="negative"
                        flat
                        icon="cancel"
                        @click.stop="cancelBooking(booking)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-placeholder
                  v-else
                  icon="event_busy"
                  label="No pending bookings."
                />
              </q-card>
            </div>
  
            <div class="col-12 col-md-6">
              <q-card flat bordered class="booking-card">
                <q-card-section class="q-pa-md bg-green-8 text-white">
                  <h3 class="text-h6">Confirmed Bookings</h3>
                </q-card-section>
                <q-separator />
                <q-list v-if="confirmedBookings.length > 0" class="q-pa-none">
                  <q-item
                    v-for="(booking, index) in confirmedBookings"
                    :key="index"
                    class="q-pa-md booking-item"
                    clickables
                    @click="viewBooking(booking)"
                  >
                    <q-item-section>
                      <q-item-label class="text-bold">{{ booking.name }}</q-item-label>
                      <q-item-label caption class="text-grey-7">
                        {{ booking.phone }} - {{ booking.sessionDuration }} mins
                      </q-item-label>
                      <q-item-label caption class="text-grey-7" > {{ booking.date }}</q-item-label>
                      <q-item-label caption class="text-grey-7" > {{ booking.timeSlot }}</q-item-label>
                    </q-item-section>
                    <q-item-section side class="action-buttons">
                      <q-btn
                        color="warning"
                        flat
                        icon="edit_calendar"
                        @click.stop="rescheduleBooking(booking)"
                      />
                      <q-btn
                        color="negative"
                        flat
                        icon="cancel"
                        @click.stop="cancelBooking(booking)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-placeholder
                  v-else
                  icon="event_available"
                  label="No confirmed bookings."
                />
              </q-card>
            </div>
          </div>
        </div>
      </q-page-container>
      <!-- <v-dialog v-model="showScheduleDialog"> -->
        <TherapistCalendar :scheduleDialogOpen="showScheduleDialog" class="calendar-wrapper" />
      <!-- </v-dialog> -->
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import TherapistCalendar from 'src/components/common/TherapistCalendar.vue';
  
  const therapistDetails = ref({
    storeName: 'Therapist Wellness Center',
    name: 'Dr. Jane Doe',
    experience: 10,
    role: 'Therapist',
    speciality: 'Cognitive Behavioral Therapy',
    description: 'Experienced therapist specializing in CBT for over 10 years. Providing sessions for anxiety and stress management.',
  });
  
  const isEditing = ref(false);
  
  const showScheduleDialog = ref(false);

  const handleScheduleChange = () => {
    console.log('Schedule changed');
    showScheduleDialog.value = !showScheduleDialog.value;
  }
  
  // Save therapist details
  function saveTherapistDetails() {
    console.log('Saving therapist details...', therapistDetails.value);
    isEditing.value = false;
  }

  const cancelEditing = () => {
    isEditing.value = false;
  }
  
  // Mock bookings data
  const pendingBookings = ref([
    { name: 'John Doe', phone: '123-456-7890', sessionDuration: 60 , date: '2023-06-01', timeSlot: '10:00 AM - 11:00 AM'},
    { name: 'Jane Smith', phone: '987-654-3210', sessionDuration: 90 , date: '2023-06-02', timeSlot: '11:00 AM - 12:00 PM'},
    { name: 'Bob Johnson', phone: '555-555-5555', sessionDuration: 120 , date: '2023-06-03', timeSlot: '12:00 PM - 1:00 PM'},
    { name: 'Alice Brown', phone: '111-111-1111', sessionDuration: 150 , date: '2023-06-04', timeSlot: '1:00 PM - 2:00 PM'},
    { name: 'Charlie Lee', phone: '222-222-2222', sessionDuration: 180 , date: '2023-06-05', timeSlot: '2:00 PM - 3:00 PM'},
  ]);
  
  const confirmedBookings = ref([
    { name: 'Alice Johnson', phone: '456-789-0123', sessionDuration: 45 , date: '2023-06-03', timeSlot: '12:00 PM - 1:00 PM'},
    { name: 'Bob Smith', phone: '789-012-3456', sessionDuration: 60 , date: '2023-06-04', timeSlot: '1:00 PM - 2:00 PM'},
    { name: 'Charlie Brown', phone: '321-654-9870', sessionDuration: 75 , date: '2023-06-05', timeSlot: '2:00 PM - 3:00 PM'},
    { name: 'David Lee', phone: '012-345-6789', sessionDuration: 90 , date: '2023-06-06', timeSlot: '3:00 PM - 4:00 PM'},
  ]);
  
  // Booking actions
  function confirmBooking(booking) {
    pendingBookings.value = pendingBookings.value.filter((b) => b !== booking);
    confirmedBookings.value.push(booking);
  }
  
  function rescheduleBooking(booking) {
    console.log('Reschedule booking:', booking);
  }
  
  function cancelBooking(booking) {
    pendingBookings.value = pendingBookings.value.filter((b) => b !== booking);
    confirmedBookings.value = confirmedBookings.value.filter((b) => b !== booking);
  }
  
  function viewBooking(booking) {
    console.log('View booking:', booking);
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .therapist-card {
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  
  .therapist-info .q-input {
    background-color: white;
    border-radius: 8px;
  }
  
  .booking-card {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background-color: white;
  }
  
  .booking-item {
    border-bottom: 1px solid #e0e0e0;
  }
  
  .booking-item:last-child {
    border-bottom: none;
  }
  
  .action-buttons q-btn {
    margin-left: 4px;
  }
  @media (max-width: 600px) {
      .booking-item{
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }
      .action-buttons{
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .handle-edit-save{
        display: flex;
        flex-direction: column;
      }
  }
  </style>
  