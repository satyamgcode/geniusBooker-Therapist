<template>
  <q-dialog v-model="scheduleDialogOpen" persistent @show="onDialogShow">
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
        <q-btn flat label="Close" color="primary" @click="closeDialog" />
        <q-btn flat label="Save" color="positive" @click="saveSelectedDate" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="eventDialogOpen" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Event Details</div>
        <q-input filled v-model="eventForm.title" label="Enter schedule" />
        <q-input filled v-model="eventForm.start" label="Start Time" type="datetime-local" />
        <q-input filled v-model="eventForm.end" label="End Time" type="datetime-local" />
        <q-input filled v-model="eventForm.color" label="Event Color" type="color" class="q-mb-sm" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="saveEvent" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount, nextTick, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTherapistStore } from 'src/stores/useStaffStore';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuthStore } from 'src/stores/AuthStore';
import axios from 'axios';
import { format, formatRFC3339 } from 'date-fns';

const StaffDetails = useTherapistStore();

const authStore = useAuthStore();

const therapistDetails = ref({});
const therapistSchedule = ref([]);

const scheduleDialogOpen = ref(false);
const eventDialogOpen = ref(false);
const schedule = ref([]); // Array to store events
const eventForm = ref({
  id: null,
  title: '',
  start: '',
  end: '',
  color: '#21BA45',
});

const props = defineProps({
  scheduleDialogOpen: Boolean,
  staff: Array,
  selectedStaffIndex: Number,
});

const fetchTherapistSchedule = async () => {
  const authToken = localStorage.getItem('authToken');
  const therapist_id = StaffDetails.therapist.therapist_id; 
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
  console.log(response.data.schedules);
  StaffDetails.setTherapistSchedule(response.data.schedules);
  } catch (error) {
    console.error(error);
  }
}

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
watch(() => therapistDetails.value.store_schedule?.opening_days, (newDays) => {
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
  () => [therapistDetails.value.store_schedule?.start_time, therapistDetails.value.store_schedule?.end_time], 
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

// Initialize calendarOptions as a ref
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridDay',
  slotDuration: '01:00:00',
  slotLabelInterval: '01:00',
  allDaySlot: false,
  headerToolbar: {
    start: '',
    center: 'title',
    end: 'timeGridWeek,timeGridDay,dayGridMonth prev,next',
  },
  height: '70vh',
  selectable: true,
  selectMirror: true,
  nowIndicator: true,
  longPressDelay: 50,
  events: [], // Will be updated dynamically
  businessHours: businessHours.value, // Link the businessHours array
  selectAllow: (selectInfo) => {
    const currentView = fullCalendar.value.getApi().view.type;

    // If in dayGridMonth (month view), allow full-day selection
    if (currentView === 'dayGridMonth') {
      return true;  // Allow full-day selection in month view
    }

    const dayOfWeek = selectInfo.start.getUTCDay();
    // Check if the selected slot is within business hours and not within busy hours
    return isWithinBusinessHours(selectInfo, dayOfWeek) && !isWithinBusyHours(selectInfo, dayOfWeek);
  },

  select: (info) => {
    eventDialogOpen.value = true;
    eventForm.value.start = format(info.start, 'yyyy-MM-dd HH:mm:ss');
    eventForm.value.end = format(info.end, 'yyyy-MM-dd HH:mm:ss');
  }
});

// Watch for changes in schedule and busyEvents to update calendar events
watch([schedule, busyEvents], () => {
  calendarOptions.value.events = [...schedule.value, ...busyEvents.value];
  console.log(calendarOptions.value.events);
}, { deep: true });

// Watch for changes in businessHours to update calendarOptions
watch(businessHours, () => {
  calendarOptions.value.businessHours = businessHours.value;
}, { deep: true });

const fullCalendar = ref(null);

const onDialogShow = async () => {
  await nextTick();
  setTimeout(() => {
    if (fullCalendar.value) {
      fullCalendar.value.getApi().updateSize();
      fullCalendar.value.getApi().scrollToTime(getCurrentTime());
    }
  }, 300);
};

const showScheduleDialog = () => {
  scheduleDialogOpen.value = true;
};

watch(() => props.scheduleDialogOpen, (val) => {
  if (val != -1) {
    showScheduleDialog();
  }
});

const UpdateTherapistSchedule = async () => {
  const therapist_id = StaffDetails.therapist.therapist_id;
  const authToken = localStorage.getItem('authToken');
  const storeDetails = JSON.parse(localStorage.getItem('genius-booker-therapistStores'));
  const store_id = storeDetails[0]?.store_id;
  console.log(store_id);
  console.log(authToken);

  const formatDate = (date) => {
    const newdate = new Date(date);
    return format(newdate, "yyyy-MM-dd'T'HH:mm:ss");
  };
  
  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/api/therapists/${therapist_id}/schedule/manage/`,
      {     
            therapist: therapist_id, 
            title: eventForm.value.title,
            start: formatDate(eventForm.value.start),
            end: formatDate(eventForm.value.end),
            backgroundColor: eventForm.value.color,
            store: store_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


const saveSelectedDate = async () => {
  await UpdateTherapistSchedule()
  scheduleDialogOpen.value = false ;
};

const closeDialog = () => {
  scheduleDialogOpen.value = false;
};

// Modify saveEvent to add the new event's time to busyHours
const saveEvent = () => {
  const dayOfWeek = new Date(eventForm.value.start).getUTCDay();// Create new event
  const newEvent = {
    id: Date.now(),
    title: eventForm.value.title,
    start: eventForm.value.start,
    end: eventForm.value.end,
    backgroundColor: eventForm.value.color,
    borderColor: eventForm.value.color,
    editable: false,
  };

  // Add the new event to the schedule array
  schedule.value.push(newEvent);

  // Add the event time to busyHours
  busyHours.value.push({
    title: 'Busy Hours',
    daysOfWeek: [dayOfWeek], // Restrict to the specific day of the event
    startTime: format(new Date(eventForm.value.start), 'HH:mm'),
    endTime: format(new Date(eventForm.value.end), 'HH:mm'),
  });

  saveSelectedDate();

  // Reset the form after saving
  eventForm.value = { id: null, title: '', start: '', end: '', color: '#21BA45' };
  eventDialogOpen.value = false;
  scheduleDialogOpen.value = false;
  setTimeout(() => {
    showScheduleDialog();
  }, 100);
}

onBeforeMount(() => {
  therapistDetails.value = { 
    staff: { ...StaffDetails.therapist },
    ...StaffDetails?.therapistStores[0],
  };
  console.log("therapistDetails", therapistDetails.value);
});
onMounted(() => {
  fetchTherapistSchedule();
  therapistSchedule.value = JSON.parse(localStorage.getItem('genius-booker-therapistScheduleDetails'));
  console.log("therapistSchedule", therapistSchedule.value);
  // Map therapistSchedule to calendar events
  schedule.value = therapistSchedule.value?.map((scheduleEvent) => ({
    id: scheduleEvent.id,
    title: scheduleEvent.title,
    start: scheduleEvent.start,
    end: scheduleEvent.end,
    backgroundColor: scheduleEvent.backgroundColor || '#21BA45',
    borderColor: scheduleEvent.backgroundColor || '#21BA45',
    editable: false,
  }));

})
</script>


<style scoped>
.calendar-wrapper {
  min-height: 400px;
}
.full-calendar {
  width: 100%;
  max-width: 100%;
  margin: auto;
  overflow-x: auto;
  padding-bottom: 1rem;
}
.calendar-header {
  margin: unset !important;
}
.fc-busy-event {
  background-color: rgba(255, 0, 0, 0.1) !important; /* Light red color for busy slots */
  border: none;
}

</style>
