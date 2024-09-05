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
                />

                <q-input
                      filled
                      v-model="form.email"
                      label="Email"
                      dense
                      type="email"
                      class="q-my-sm"
                      :rules="[val => !!val || 'Valid email is required']"
                    />
                    <q-input
                      filled
                      v-model="form.phone"
                      label="Phone Number"
                      dense
                      mask="(###) ###-####"
                      class="q-my-sm"
                      :rules="[val => !!val || 'Phone number is required']"
                    />

                <q-select
                  v-model="form.therapist"
                  label="Select Therapist"
                  filled
                  dense
                  :options="therapistoptionsRef"
                  option-value="name"
                  class="input-field"
                  :rules="[val => !!val || 'Therapist is required']"  
                  @input="fetchTherapistSchedule"
                />

                <q-input
                v-model="form.date"
                label="Select Date"
                readonly
                dense
                filled
                class="input-field cursor-pointer"
                @click="showTimeDialog = true"
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

    <q-dialog v-model="showTimeDialog" persistent>
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
          <q-btn flat label="Save" color="positive" @click="saveSelectedDate" />
          <q-btn flat label="Close" color="primary" @click="showTimeDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref , computed } from 'vue';
import { useQuasar } from 'quasar';
import AppHeader from 'src/components/common/AppHeader.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCustomerStore } from 'src/stores/customerStore';
import { format } from 'date-fns';
import { useRouter } from 'vue-router';

const router = useRouter();

const customerStore = useCustomerStore();

const fullCalendar = ref(null);

const reservedEvents = [
  {
    title: 'Reserved',
    start: '2024-09-04T11:00:00',
    end: '2024-09-04T12:30:00',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    editable: false,
  },
  {
    title: 'Reserved',
    start: '2024-09-04T16:00:00',
    end: '2024-09-04T16:30:00',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    editable: false,
  },
  {
    title: 'Reserved',
    start: '2024-09-04T10:00:00',
    end: '2024-09-04T10:30:00',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    editable: false,
  },
  {
    title: 'Reserved',
    start: '2024-09-06T12:00:00',
    end: '2024-09-06T12:30:00',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    editable: false,
  },
  {
    title: 'Reserved',
    start: '2024-09-07T14:00:00',
    end: '2024-09-07T14:30:00',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    editable: false,
  },
];

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridDay',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00',
  allDaySlot: false,
  headerToolbar: {
    start: '',
    center: 'title',
    end: 'prev,next',
  },
  height: 'auto', // Responsive height
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true, // Enable "more" link when too many events
  events: reservedEvents,// Correctly assign reservedEvents here
  select: (info) => {
    form.value.date= format(info.start, 'yyyy-MM-dd'); ;
    form.value.startTime = format(info.start, 'HH:mm a');
    form.value.endTime= format(info.end, 'HH:mm a');
    console.log(info.startStr)
    console.log(info.endStr)
  },

});

const $q = useQuasar();
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


const therapistOptions = ref([
  { name: 'John Doe', active: true },
  { name: 'Jane Doe', active: false },
  { name: 'Bob Smith', active: true },
  { name: 'Sarah Johnson', active: false },
  { name: 'Michael Brown', active: true },
]);

const therapistoptionsRef = computed(() => {
  return therapistOptions.value.filter((item) => item.active).map((item) => ({ value: item.name, label: item.name }));
})

const fetchTherapistSchedule = () => {
  // Fetch logic for therapist schedule
};


const handleSubmit = () => {
  
  if (!form.value.notRobot) {
    alert('Please check the "I am not a robot" checkbox');
    return;
  }
  else{
    alert('Form submitted!');
    router.push('/')

  }

  isSubmitting.value = true;

  setTimeout(() => {
    isSubmitting.value = false;
    $q.notify({
      type: 'positive',
      message: 'Booking request submitted!',
    });

    // Clear form
    form.value = {
      name: '',
      phone: '',
      email: '',
      therapist: null,
      date: null,
      startTime: null,
      endTime : null ,
      notRobot: false,
    };
  }, 2000);
};


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

.calendar-wrapper {
  min-height: 400px;
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

@media (max-width: 768px) {
  .full-calendar {
    font-size: 0.85rem;
  }
}
</style>
