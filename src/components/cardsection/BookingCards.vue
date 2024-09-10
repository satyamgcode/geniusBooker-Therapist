<template>
    <div class="q-pa-md q-mx-lg booking-container">
      <div v-if="selectedTherapist" class="q-mb-lg text-center">
        <h4>Bookings for {{ selectedTherapist.name }}</h4>
      </div>
  
      <!-- Pending and Confirmed Bookings Panels -->
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-card flat bordered class="booking-card">
            <q-card-section class="q-pa-md bg-primary text-white">
              <h3 class="text-h6">Pending Bookings</h3>
            </q-card-section>
            <q-separator />
            <q-list v-if="filteredPendingBookings.length > 0" class="q-pa-none">
              <q-item
                v-for="(booking, index) in filteredPendingBookings"
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
                  <q-item-label caption class="text-grey-7">{{ booking.date }}</q-item-label>
                  <q-item-label caption class="text-grey-7">{{ booking.timeSlot }}</q-item-label>
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
            <q-list v-if="filteredConfirmedBookings.length > 0" class="q-pa-none">
              <q-item
                v-for="(booking, index) in filteredConfirmedBookings"
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
                  <q-item-label caption class="text-grey-7">{{ booking.date }}</q-item-label>
                  <q-item-label caption class="text-grey-7">{{ booking.timeSlot }}</q-item-label>
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
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Props: Selected Therapist
  const props = defineProps({
    selectedTherapist: Object, // Expected to have an ID, name, etc.
  });
  
  // Mock bookings data
  const bookings = ref([
    { therapistId: 1, name: 'John Doe', phone: '123-456-7890', sessionDuration: 60, date: '2023-06-01', timeSlot: '10:00 AM - 11:00 AM', status: 'pending' },
    { therapistId: 1, name: 'Jane Smith', phone: '987-654-3210', sessionDuration: 90, date: '2023-06-02', timeSlot: '11:00 AM - 12:00 PM', status: 'pending' },
    { therapistId: 2, name: 'Alice Johnson', phone: '456-789-0123', sessionDuration: 45, date: '2023-06-03', timeSlot: '12:00 PM - 1:00 PM', status: 'confirmed' },
    { therapistId: 1, name: 'Bob Smith', phone: '789-012-3456', sessionDuration: 60, date: '2023-06-04', timeSlot: '1:00 PM - 2:00 PM', status: 'confirmed' },
  ]);
  
  // Computed to filter bookings based on selected therapist
  const filteredPendingBookings = computed(() => {
    return bookings.value.filter(
      (booking) => booking.therapistId === props.selectedTherapist?.id && booking.status === 'pending'
    );
  });
  
  const filteredConfirmedBookings = computed(() => {
    return bookings.value.filter(
      (booking) => booking.therapistId === props.selectedTherapist?.id && booking.status === 'confirmed'
    );
  });
  
  // Booking actions
  function confirmBooking(booking) {
    booking.status = 'confirmed';
  }
  
  function rescheduleBooking(booking) {
    console.log('Reschedule booking:', booking);
  }
  
  function cancelBooking(booking) {
    bookings.value = bookings.value.filter((b) => b !== booking);
  }
  
  function viewBooking(booking) {
    console.log('View booking:', booking);
  }
  </script>
  
  <style scoped>
  .booking-container {
    max-width: 1200px;
    margin: 0 auto;
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
  </style>
  