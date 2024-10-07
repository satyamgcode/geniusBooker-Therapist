<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page padding class="bg-light page-wrapper">
        <div class="form-wrapper">
          <q-card flat bordered class="q-pa-sm booksession-form">
            <q-card-section class="text-center">
              <h5 class="text-primary gb-appointment">Book an Appointment</h5>
              <p>Fill in the details to schedule your session</p>
            </q-card-section>

            <q-card-section>
              <q-form @submit="handleSubmit" class="q-gutter-md">
                <q-input
                  v-model="form.name"
                  label="Your Name"
                  filled
                  dense
                  class="input-field"
                  :rules="[val => !!val || 'Name is required']"
                  hide-bottom-space
                />

                <q-input
                  filled
                  v-model="form.email"
                  label="Email(Optional)"
                  dense
                  type="email"
                />
                <q-input
                  filled
                  v-model="form.phone"
                  label="Phone Number"
                  dense
                  :rules="phoneRules"
                  hide-bottom-space
                />

                <q-select
                  v-model="form.therapist"
                  label="Select Therapist"
                  filled
                  dense
                  :options="therapistOptions"
                  option-value="name"
                  class="input-field"
                  :rules="[val => !!val || 'Therapist is required']"  
                  hide-bottom-space
                  @update:model-value="handleTherapistChange"
                />

                <q-input
                  v-model="form.date"
                  label="Book a time"
                  readonly
                  dense
                  filled
                  class="input-field"
                  @click="showTimeDialog = true"
                  hide-bottom-space
                  :rules="[val => !!val || 'Date is required']"
                />

                <q-input
                  v-model="form.startTime"
                  label="Session StartTime"
                  readonly
                  dense
                  filled
                  class="input-field cursor-pointer"
                />
                <q-input
                  v-model="form.endTime"
                  label="Session EndTime"
                  readonly
                  dense
                  filled
                  class="input-field cursor-pointer"
                />

                <q-checkbox
                  v-model="form.notRobot"
                  label="I am not a robot"
                  size="md"
                  color="primary"
                  :keep-color="true"
                  class="robot-check"
                />

                <q-btn
                  type="submit"
                  label="Submit"
                  color="primary"
                  class="full-width q-mt-lg"
                  size="md"
                  :disable="isSubmitting"
                  :loading="isSubmitting"
                />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>

    <q-dialog v-model="showTimeDialog" persistent @show="onDialogShow">
      <q-card>
        <q-card-section>
          <h6 class="text-primary calendar-header">Select Available Time</h6>
          <q-separator />
        </q-card-section>

        <q-card-section class="calendar-wrapper">
          <FullCalendar
            ref="fullCalendar"
            :options="calendarOptions"
            class="full-calendar"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="showTimeDialog = false" />
          <q-btn flat label="Save" color="positive" @click="saveSelectedDate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="eventDialogOpen" persistent>
      <q-card class="event-card">
        <q-card-section>
          <div class="text-h6">Event Details</div>
          <q-input filled v-model="eventForm.start" label="Start Time" type="time" />
          <q-input filled v-model="eventForm.end" label="End Time" type="time" />
          <q-input filled v-model="eventForm.color" label="Event Color" type="color" class="q-mb-sm" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveEvent" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref , computed, nextTick, watch, onBeforeMount , onMounted } from 'vue';
import AppHeader from 'src/components/common/AppHeader.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCustomerStore } from 'src/stores/customerStore';
import { useFetchAllStores } from 'src/stores/useFetchAllStores';
import { useTherapistStore } from 'src/stores/useStaffStore';
import { format } from 'date-fns';
import { useRouter , useRoute } from 'vue-router';
import axios from 'axios';
import { end, start } from '@popperjs/core';

const router = useRouter();
const route = useRoute();
const customerStore = useCustomerStore();
const fetchAllStores = useFetchAllStores();
const StaffDetails = useTherapistStore();
const therapistDetails = ref({});
const schedule = ref([]); // Array to store events
const therapistSchedule = ref([]);

const fullCalendar = ref(null);
const eventDialogOpen = ref(false);

const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
];

const fetchTherapistSchedule = async () => {
  const therapist_id =  form.value.therapist?.value 

  try {
    const response = await axios.get(
      `${process.env.VUE_APP_API_URL}/api/therapists/${therapist_id}/schedule/`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log(response.data);

    // Combine confirmedBookings, pendingBookings, and schedules into a single array
    const combinedSchedule = [
      ...response.data.confirmedBookings.map((booking) => ({
        id: booking.appointment_id, // Use appointment_id for the unique identifier
        title: booking.title,
        start: booking.start,
        end: booking.end,
        backgroundColor: '#21BA45', // You can change colors based on your logic
        borderColor: '#21BA45',
        editable: false,
      })),
      ...response.data.pendingBookings.map((booking) => ({
        id: `pending-${booking.appointment_id}`, // Unique ID for pending bookings
        title: `Pending: ${booking.title}`, // Prefix to distinguish
        start: booking.start,
        end: booking.end,
        backgroundColor: '#FFA500', // Change color for pending bookings
        borderColor: '#FFA500',
        editable: false,
      })),
      ...response.data.schedules.map((scheduleEvent) => ({
        id: `schedule-${scheduleEvent.title}`, // Unique ID for schedules
        title: scheduleEvent.title,
        start: scheduleEvent.start,
        end: scheduleEvent.end,
        backgroundColor: 'red', // Change color for schedules
        borderColor: 'red',
        editable: false,
      })),
    ];

    therapistSchedule.value = combinedSchedule; // Store the combined schedule

    console.log(therapistSchedule.value);

    // Assign to schedule.value if needed for specific use
    schedule.value = combinedSchedule;

    console.log(schedule.value);
  } catch (error) {
    console.error(error);
  }
}

const eventForm = ref({
  id: null,
  start: '',
  end: '',
  color: '#21BA45',
});
const props = defineProps({
  scheduleDialogOpen: Boolean,
  staff: Array,
  selectedStaffIndex: Number,
});

const getCurrentTime = () => {
  const now = new Date();
  return now.toISOString().slice(11, 16);
};

// Define allowed weekdays (e.g., Monday to Friday) and timeslots (e.g., 9 AM to 5 PM)
const allowedWeekdays = ref([]); // Empty array to be filled dynamically

// Mapping weekday names to numbers
const weekdayMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

// Initialize businessHours and busyHours as refs
const businessHours = ref([]);

const busyHours = ref([]);

// Function to update businessHours and busyHours when allowedWeekdays change
const updateBusinessHoursAndBusyHours = () => {
  businessHours.value.forEach(bh => {
    bh.daysOfWeek = allowedWeekdays.value;
  });
  busyHours.value.forEach(bh => {
    bh.daysOfWeek = allowedWeekdays.value;
  });
};

// Watch for changes in therapistDetails to update allowedWeekdays
watch(() => therapistDetails.value?.store_schedule?.opening_days, (newDays) => {
  if (newDays && Array.isArray(newDays)) {
    allowedWeekdays.value = newDays.map(day => weekdayMap[day.toLowerCase()]);
    console.log('allowedWeekdays', allowedWeekdays.value); // Output: [0, 1, ...] for days like ['sunday', 'monday']
    updateBusinessHoursAndBusyHours();
  }
});

// Watch for changes in lunch start and end times
watch(
  () => [therapistDetails.value.store_schedule?.lunch_start_time, therapistDetails.value.store_schedule?.lunch_end_time], 
  ([newLunchStart, newLunchEnd]) => {
    if (newLunchStart && newLunchEnd) {
      // Dynamically update busy hours with lunch time
      busyHours.value = [
        { 
          title: 'BusyHours/Lunchtime',
          daysOfWeek: allowedWeekdays.value, // Apply to allowed weekdays
          startTime: newLunchStart, // Dynamically set lunch start time
          endTime: newLunchEnd,     // Dynamically set lunch end time
        },
      ];
      console.log('Updated busy hours:', busyHours.value);
    }
  }
);

// Watch for changes in business start_time and end_time
watch(
  () => [therapistDetails.value?.store_schedule?.start_time, therapistDetails.value?.store_schedule?.end_time], 
  ([newStartTime, newEndTime]) => {
    if (newStartTime && newEndTime) {
      // Dynamically update business hours with the start and end time
      businessHours.value = [
        {
          daysOfWeek: allowedWeekdays.value, // Apply to allowed weekdays
          startTime: newStartTime, // Dynamically set business start time
          endTime: newEndTime,        // Keep lunch break (fixed time slot)
        }
      ];
      console.log('Updated business hours:', businessHours.value);
    }
  }
);


// Function to check if a time slot is within a busy period
const isWithinBusyHours = (selectInfo, dayOfWeek) => {
  const startTime = format(selectInfo.start, 'HH:mm:ss');
  const endTime = format(selectInfo.end, 'HH:mm:ss');

  return busyHours.value.some((busyTime) => {
    return (
      allowedWeekdays.value.includes(dayOfWeek) &&
      (
        (startTime >= busyTime.startTime && startTime < busyTime.endTime) || // Start time overlaps with busy time
        (endTime > busyTime.startTime && endTime <= busyTime.endTime)       // End time overlaps with busy time
      )
    );
  });
};

// Function to check if a time slot is within business hours
const isWithinBusinessHours = (selectInfo, dayOfWeek) => {
  const startTime = format(selectInfo.start, 'HH:mm:ss');
  const endTime = format(selectInfo.end, 'HH:mm:ss');

  return businessHours.value.some((businessTime) => {
    return (
      allowedWeekdays.value.includes(dayOfWeek) &&
      startTime >= businessTime.startTime &&
      endTime <= businessTime.endTime
    );
  });
};

// Initialize busyEvents as a ref
const busyEvents = ref([]);

// Watch for changes in busyHours to update busyEvents
watch(busyHours, (newBusyHours) => {
  busyEvents.value = newBusyHours.map(busyTime => ({
    title: busyTime.title || 'Not available',
    daysOfWeek: busyTime.daysOfWeek, // Apply to specific days
    startTime: busyTime.startTime,   // Busy start time
    endTime: busyTime.endTime,       // Busy end time
    display: 'background',           // Display it as a background event
    className: 'fc-busy-event',      // Apply custom CSS class for busy slots
  }));
}, { deep: true });

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridDay',
  slotDuration: '01:00:00',
  slotLabelInterval: '01:00',
  allDaySlot: false,
  headerToolbar: {
    start: '',
    center: 'title',
    end: 'timeGridDay prev,next',
  },
  height: '70vh',
  selectable: true,
  selectMirror: true,
  nowIndicator: true,
  longPressDelay: 50,
  events: [], // Will be updated dynamically
  businessHours: businessHours.value,
  selectAllow: (selectInfo) => {
    const dayOfWeek = selectInfo.start.getUTCDay();
    // Check if the selected slot is within business hours and not within busy hours
    return isWithinBusinessHours(selectInfo, dayOfWeek) && !isWithinBusyHours(selectInfo, dayOfWeek);
  },
  select: (info) => {
    eventDialogOpen.value = true;
    form.value.date = format(info.start, 'yyyy-MM-dd');
    eventForm.value.start = format(info.start, 'HH:mm');
    eventForm.value.end = format(info.end, 'HH:mm');
  }
});

watch([schedule, busyEvents], () => {
  calendarOptions.value.events = [...schedule.value, ...busyEvents.value];
}, { deep: true });

// Watch for changes in businessHours to update calendarOptions
watch(businessHours, () => {
  calendarOptions.value.businessHours = businessHours.value;
}, { deep: true });

const isSubmitting = ref(false);

const form = ref({
  name: '',
  phone: customerStore.formData.phoneNumber,
  email: '',
  therapist: '',
  date: '',
  startTime: '',
  endTime: '',
  sessionDuration: '',
  notRobot: false,
});

const showTimeDialog = ref(false);

const saveSelectedDate = () => {
  showTimeDialog.value = false;
};

const onDialogShow = async () => {
  await nextTick(); 
  setTimeout(() => {
    if (fullCalendar.value) {
      fullCalendar.value.getApi().updateSize();
      fullCalendar.value.getApi().scrollToTime(getCurrentTime());
    }
  }, 300);
};

const saveEvent = () => {
  if (eventForm.value.start && eventForm.value.end) {

    form.value.startTime = eventForm.value.start;
    form.value.endTime = eventForm.value.end;

    eventForm.value = { id: null, title: '', start: '', end: '' , color: '#21BA45' };
    eventDialogOpen.value = false;
    showTimeDialog.value = false;
  }
};

fetchAllStores.fetchStores();

const therapistOptions = computed(() => {
  return fetchAllStores.getStoreById(route.query.store_id)?.staff.map((item) => ({ label: item.name, value: item.StaffId, active: true })) || []
})

const handleTherapistChange = async () => {
   await fetchTherapistSchedule();
};

const createDateTimeFormatter = (date, time) => {
    const dateTimeString = `${date}T${time}:00`;
    const newDate = new Date(dateTimeString);
    return format(newDate, "yyyy-MM-dd'T'HH:mm:ss");
};

const handleBookAppointment = async () => {

  // const bookingDate = form.value.date
  const bookingStartTime = createDateTimeFormatter(form.value.date , form.value.startTime)
  const bookingEndTime = createDateTimeFormatter(form.value.date , form.value.endTime)
  try{

    const payload = {
      therapist_id: form.value.therapist?.value,
      store_id: parseInt(route.query.store_id), 
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      date: form.value.date,
      start_time: bookingStartTime,
      end_time: bookingEndTime,
      notRobot: form.value.notRobot,
    };

  const appointmentDetails = {...payload};
    console.log(payload)
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/appointments/book/`, appointmentDetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    console.log('Form submitted:', form.value);
    console.log(appointmentDetails)
    alert('Form submitted!');
    router.push('/');
  } catch (error) {
    console.error(error);
  }
}
  


const handleSubmit = () => {
  if (!form.value.notRobot) {
    alert('Please check the "I am not a robot" checkbox');
    return;
  } else {
    handleBookAppointment();
  }

  isSubmitting.value = true;

  setTimeout(() => {
    isSubmitting.value = false;

    form.value = {
      name: '',
      phone: '',
      email: '',
      therapist: null,
      date: null,
      startTime: null,
      endTime: null,
      notRobot: false,
    };
  }, 1000);
};  

watch(therapistOptions, (newOptions) => {
  fetchTherapistSchedule();
})
watch(form, console.log)
onBeforeMount(() => {
  fetchAllStores.fetchStores();
  therapistDetails.value = fetchAllStores.getStoreById(route.query.store_id)
  console.log('therapistSchedule', therapistDetails.value)
})
onMounted(() => {
  therapistSchedule.value = JSON.parse(localStorage.getItem('genius-booker-therapistScheduleDetails'));
  console.log("therapistSchedule", therapistSchedule.value);
})

</script>


<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
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

.robot-check {
  margin-top: 20px;
}

.full-width {
  width: 100%;
  border-radius: 20px;
}

.booksession-form {
  max-width: 400px;
  margin: auto;
}

.calendar-header {
  margin: unset !important;
}

.full-calendar {
  width: 100%;
  max-width: 100%;
  margin: auto;
  overflow-x: auto;
  padding-bottom: 1rem;
}
.gb-appointment{
  margin: unset !important;
  margin-bottom: 10px !important;
}
.event-card{
  min-width: 250px !important;
}

@media (max-width: 768px) {
  .full-calendar {
    font-size: 0.85rem;
  }
}
</style>
