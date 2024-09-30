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
              <q-btn v-if="!isEditing" color="primary" icon="edit" label="Edit" flat @click="isEditing = true" />
              <div class="handle-edit-save">
                <q-btn v-if="isEditing" color="negative" icon="cancel" label="Cancel" flat @click="cancelEditing" />
                <q-btn v-if="isEditing" color="positive" icon="save" label="Save" flat @click="saveTherapistDetails" />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg therapist-info">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="therapistDetails.store_name" label="Store Name" dense filled disable />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="therapistDetails.staff.name" label="Therapist Name" dense filled
                  :disable="!isEditing" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="therapistDetails.staff.exp" label="Experience (years)" dense filled type="number"
                  :disable="!isEditing" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="therapistDetails.staff.role" label="Role" dense filled disable />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="therapistDetails.staff.specialty" label="Speciality" dense filled
                  :disable="!isEditing" />
              </div>
              <div v-if="isEditing" class="col-12 col-md-6">
                <q-input v-model="therapistDetails.staff.email" label="Email" dense filled :disable="!isEditing" />
              </div>
              <div v-if="isEditing" class="col-12 col-md-6">
                <q-input v-model="therapistDetails.staff.phone" label="Phone" dense filled :disable="!isEditing" />
              </div>
              <div class="col-12">
                <q-input v-model="therapistDetails.staff.description" label="Description" dense filled type="textarea"
                  :disable="!isEditing" />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-btn color="positive" class="feature-btn q-mt-am" icon="schedule" label="customize schedule" flat
            @click="handleScheduleChange" />

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
                <q-item v-for="(booking, index) in pendingBookings" :key="index" class="q-pa-md booking-item" clickable
                  @click="viewBooking(booking)">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ booking.name }}</q-item-label>
                    <q-item-label caption class="text-grey-7">
                      {{ booking.phone }} - {{ booking.sessionDuration }} mins
                    </q-item-label>
                    <q-item-label caption class="text-grey-7"> {{ booking.date }}</q-item-label>
                    <q-item-label caption class="text-grey-7"> {{ booking.timeSlot }}</q-item-label>
                  </q-item-section>
                  <q-item-section side class="action-buttons">
                    <q-btn color="positive" flat icon="check_circle" @click.stop="confirmBooking(booking)" />
                    <q-btn color="warning" flat icon="edit_calendar" @click.stop="rescheduleBooking(booking)" />
                    <q-btn color="negative" flat icon="local_offer" @click.stop="cancelBooking(booking)" />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-placeholder v-else icon="event_busy" label="No pending bookings." />
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat bordered class="booking-card">
              <q-card-section class="q-pa-md bg-green-8 text-white">
                <h3 class="text-h6">Confirmed Bookings</h3>
              </q-card-section>
              <q-separator />
              <q-list v-if="confirmedBookings.length > 0" class="q-pa-none">
                <q-item v-for="(booking, index) in confirmedBookings" :key="index" class="q-pa-md booking-item"
                  clickables @click="viewBooking(booking)">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ booking.name }}</q-item-label>
                    <q-item-label caption class="text-grey-7">
                      {{ booking.phone }} - {{ booking.sessionDuration }} mins
                    </q-item-label>
                    <q-item-label caption class="text-grey-7"> {{ booking.date }}</q-item-label>
                    <q-item-label caption class="text-grey-7"> {{ booking.timeSlot }}</q-item-label>
                  </q-item-section>
                  <!-- <q-item-section side class="action-buttons">
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
                    </q-item-section> -->
                </q-item>
              </q-list>
              <q-placeholder v-else icon="event_available" label="No confirmed bookings." />
            </q-card>
          </div>
        </div>
      </div>
      <q-dialog v-model="SlotSuggestionDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Suggestion a new SLot</div>
            <q-input filled v-model="suggestionForm.start_time" label="Start Time" type="datetime-local" />
            <q-input filled v-model="suggestionForm.end_time" label="End Time" type="datetime-local" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="reschedule" color="primary" @click="showSuggestionMethod()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
    <!-- <v-dialog v-model="showScheduleDialog"> -->
    <TherapistCalendar :scheduleDialogOpen="showScheduleDialog" class="calendar-wrapper" />
    <!-- </v-dialog> -->
  </q-layout>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import AppHeader from 'src/components/common/AppHeader.vue';
import TherapistCalendar from 'src/components/common/TherapistCalendar.vue';
import { useTherapistStore } from 'src/stores/useStaffStore';
import { useAuthStore } from 'src/stores/AuthStore';
import axios from 'axios';
import { format } from 'date-fns';

const StaffDetails = useTherapistStore();
const authStore = useAuthStore();

const therapistDetails = ref({});
const therapistProfile = ref({});
const SlotSuggestionDialog = ref(false);

const suggestionForm = ref({
  start_time: '',
  end_time: '',
})

// therapistDetails.value = {...therapistDetails.value, ...JSON.parse(localStorage.getItem('therapistDetails'))};

const isEditing = ref(false);

const showScheduleDialog = ref(false);

const handleScheduleChange = () => {
  console.log('Schedule changed');
  showScheduleDialog.value = !showScheduleDialog.value;
}

const handleUpdateTherapistDetail = async (updatedData) => {
  try {
    const response = await axios.put(`${process.env.VUE_APP_API_URL}/api/therapist/update-profile/`, updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.authToken}`
        }

      }
    );
    console.log('Therapist updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating therapist details:', error);
  }
};


// Save therapist details
const saveTherapistDetails = () => {
  console.log('Saving therapist details...', therapistDetails.value);
  therapistProfile.value = {
    username: therapistDetails.value.staff.name,
    exp: therapistDetails.value.staff.exp,
    description: therapistDetails.value.staff.description,
    specialty: therapistDetails.value.staff.specialty,
    email: therapistDetails.value.staff.email,
  }
  handleUpdateTherapistDetail(therapistProfile.value);
  console.log('Updated therapist details:', therapistProfile.value);
  isEditing.value = false;
}

const cancelEditing = () => {
  isEditing.value = false;
}

// Mock bookings data
const pendingBookings = ref([]);

const confirmedBookings = ref([]);

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

function formatToCustomDateTime(isoString) {
  return format(new Date(isoString), 'yyyy-MM-dd HH:mm');
}

const handleShowSuggestion = (appointment_id) => {
  // console.log(suggestionForm.value.start_time);
  // console.log(suggestionForm.value.end_time);
  // console.log(format(suggestionForm.value.start_time, 'yyyy-MM-dd HH:mm'));
  // console.log(format(suggestionForm.value.end_time, 'yyyy-MM-dd HH:mm'));
  UpdateBookingsStatus(appointment_id, 'Rescheduled', { new_start: formatToCustomDateTime(suggestionForm.value.start_time), new_end: formatToCustomDateTime(suggestionForm.value.end_time) });

}

const showSuggestionMethod = () => {
  handleShowSuggestion(temp_booking_id.value);
}

// Booking actions
function confirmBooking(booking) {
  pendingBookings.value = pendingBookings.value.filter((b) => b !== booking);
  // console.log(booking);
  console.log(booking.appointment_id);
  UpdateBookingsStatus(booking.appointment_id, 'Confirmed');
  // confirmedBookings.value = [...confirmedBookings.value, booking];
  confirmedBookings.value.push(booking);
}

const temp_booking_id = ref('')

function rescheduleBooking(booking) {
  SlotSuggestionDialog.value = true;
  temp_booking_id.value = booking.appointment_id
  console.log('Reschedule booking:', booking);
  console.log(booking.appointment_id);
}

function cancelBooking(booking) {
  pendingBookings.value = pendingBookings.value.filter((b) => b !== booking);
  confirmedBookings.value = confirmedBookings.value.filter((b) => b !== booking);
}

function viewBooking(booking) {
  console.log('View booking:', booking);
}

const fetchTherapistSchedule = async () => {
  const authToken = localStorage.getItem('authToken');
  const therapist_id = 2
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_API_URL}/api/therapists/${therapist_id}/schedule/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log(response.data.pendingBookings)
    console.log(response.data.schedules);
    StaffDetails.setTherapistSchedule(response.data.schedules);
    // StaffDetails.setTherapistPendingBookings(response.data.pendingBookings);

    const apiPendingBookings = response.data.pendingBookings.map(booking => ({
      name: booking.name,
      phone: booking.phone,
      sessionDuration: calculateDuration(booking.start, booking.end),
      date: booking.date,
      timeSlot: formatTimeSlot(booking.start, booking.end),
      appointment_id: booking.appointment_id
    }));

    pendingBookings.value = apiPendingBookings;

    const apiConfirmedBookings = response.data.confirmedBookings.map(booking => ({
      name: booking.name,
      phone: booking.phone,
      sessionDuration: calculateDuration(booking.start, booking.end),
      date: booking.date,
      timeSlot: formatTimeSlot(booking.start, booking.end),
      appointment_id: booking.appointment_id
    }));
    confirmedBookings.value = apiConfirmedBookings;
  } catch (error) {
    console.error(error);
  }
}

const UpdateBookingsStatus = async (appointment_id, status, payload = {}) => {
  console.trace(appointment_id. payload)
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.patch(
      `${process.env.VUE_APP_API_URL}/api/appointments/${appointment_id}/update_status/`,
      {
        status: status, // rescheduled , cancelled
        ...payload
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
    )
    if(status === 'Rescheduled'){
      SlotSuggestionDialog.value = false ;
    }
    console.log(response.data);
    confirmedBookings.value = [...confirmedBookings.value, booking];
  } catch (error) {
    console.error(error);
  }
}
onBeforeMount(() => {
  therapistDetails.value = {
    staff: {
      ...StaffDetails.therapist
    }, ...StaffDetails?.therapistStores[0]
  }
  console.log("therapistDetails", therapistDetails.value)
})
onMounted(async () => {
  await fetchTherapistSchedule();
})
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
  .booking-item {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .action-buttons {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .handle-edit-save {
    display: flex;
    flex-direction: column;
  }
}
</style>