<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page class="q-pa-md">
        <q-form @submit.prevent="submitForm">
          <!-- Staff Details -->
          <q-card class="q-mb-md shadow-2">
            <q-card-section>
              <div class="text-h6 text-primary flex justify-between">
                <div class="handle-back">
                  <q-btn
                  flat
                  dense
                  class="handle-left-arrow"
                  icon="arrow_back"
                  @click="goBack"
                />
                <span>Staff Details</span>
                </div>
                <q-icon name="person_add" size="30px" class="addstaff" color="primary" @click="addStaff" />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section v-for="(staffMember, index) in staff" :key="index">
              <q-input filled v-model="staffMember.username" label="Name" dense class="q-mb-sm" />
              <q-input
                filled
                v-model="staffMember.phone"
                label="Phone Number"
                dense
                class="q-mb-sm"
                :rules="phoneRules"
              />
              <q-input filled v-model="staffMember.email" label="Email" type="email" dense class="q-mb-sm" />
              <q-select filled v-model="staffMember.role" :options="roles" label="Role" dense class="q-mb-sm" />
              <q-input filled v-model="staffMember.password" label="Password" type="password" dense />
              <q-card class="q-my-md q-pa-md bg-grey-2">
                <q-card-section>
                  <div class="text-subtitle1">Staff Schedule</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-select
                    filled
                    v-model="staffMember.schedule"
                    :options="staffSchedules"
                    label="Schedule"
                    dense
                    class="q-mb-sm"
                    @update:model-value="(value) => {
                      staffMember.schedule = value;
                      if (value === 'Customize Schedule') {
                        showScheduleDialog(index);
                      }
                    }"
                  />
                  <q-select
                    filled
                    v-if="staffMember.schedule === 'Customize Schedule'"
                    v-model="staffMember.openingDays"
                    :options="daysOfWeek"
                    label="available Days"
                    dense
                    multiple
                    use-chips
                    emit-value
                    map-options
                    class="q-mb-sm"
                    >
                    <template v-slot:option="scope">
                      <q-item>
                        <q-item-section>
                          <q-checkbox
                            v-model="staffMember.openingDays"
                            :label="scope.opt.label"
                            :val="scope.opt.value"
                            dense
                          />
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-card-section>
              </q-card>
              <div class="handle-staff">
                <q-toggle
                  v-model="staffMember.active"
                  checked-icon="check"
                  :label="staffMember.active ? 'Active' : 'Inactive'"
                  color="green"
                  unchecked-icon="clear"
                />
                <q-btn
                  label="Remove Staff"
                  color="negative"
                  outline
                  dense
                  class="q-my-sm remove-staff-button"
                  @click="removeStaff(index)"
                />
              </div>
            </q-card-section>
          </q-card>
          <div class="q-mt-lg handle-form-button">
            <q-btn label="Cancel" color="negative" @click="confirm = true" />
            <q-btn label="Back" color="primary" @click="goBack" />
            <q-btn label="Submit" color="positive" type="submit" />
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm">Are you sure you want to cancel the form?</span>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="Confirm" color="primary" v-close-popup @click="resetForm" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-form>

        <!-- Customize Schedule Dialog -->
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
              <q-btn flat label="Close" color="primary" @click="scheduleDialogOpen = false" />
              <q-btn flat label="Save" color="positive" @click="saveSelectedDate" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Event Dialog -->
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AppHeader from 'src/components/common/AppHeader.vue';
import { useAuthStore } from 'src/stores/AuthStore';
import { format } from 'date-fns';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const fullCalendar = ref(null);

const store = ref(JSON.parse(route.query.storeData));

const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
]

const daysOfWeek = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' }
]

const staff = ref([
  {
    username: '',
    phone: '',
    email: null,
    active: true,
    role: '',
    password: '',
    schedule: '',
    customSchedule: [],
    openingDays: [],
  },
]);

const roles = ['Manager', 'Therapist'];
const confirm = ref(false);
const staffSchedules = ['Follow Store Schedule', 'Customize Schedule'];

const scheduleDialogOpen = ref(false);
const selectedStaffIndex = ref(null);
const eventDialogOpen = ref(false);
const eventForm = ref({
  id: null,
  title: '',
  start: '',
  end: '',
  color: '#21BA45',
});

const addStaff = () => {
  staff.value.push({
    username: '',
    phone: '',
    email: '',
    active: false,
    role: '',
    password: '',
    schedule: '',
    customSchedule: [],
    openingDays: [],
  });
};

const removeStaff = (index) => {
  staff.value.splice(index, 1);
};

const saveSelectedDate = () => {
  if (selectedStaffIndex.value !== null) {
    staff.value[selectedStaffIndex.value].customSchedule = [...fullCalendar.value.getApi().getEvents().map(event => ({
      title: event.title,
      start: format(event.start, 'yyyy-MM-dd HH:mm:ss'),
      end: format(event.end, 'yyyy-MM-dd HH:mm:ss'),
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor,
      editable: event.editable
    }))]; // Save the schedule for the specific staff member
  }
  scheduleDialogOpen.value = false;
};

const goBack = () => {
  router.back();
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toISOString().slice(11, 16);
};

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
  editable: true,
  selectable: true,
  selectMirror: true,
  nowIndicator: true,
  longPressDelay: 40,
  events: [],
  select: (info) => {
    eventDialogOpen.value = true;
    eventForm.value.start = format(info.start, 'yyyy-MM-dd HH:mm:ss');
    eventForm.value.end = format(info.end, 'yyyy-MM-dd HH:mm:ss');
  },
});

const onDialogShow = async () => {
  await nextTick(); // Ensures DOM updates
  if (fullCalendar.value && selectedStaffIndex.value !== null) {
    fullCalendar.value.getApi().removeAllEvents();
    const events = staff.value[selectedStaffIndex.value].customSchedule;
    events.forEach((event) => {
      fullCalendar.value.getApi().addEvent(event);
    });
    setTimeout(() => {
    if (fullCalendar.value) {
      fullCalendar.value.getApi().updateSize(); 
      fullCalendar.value.getApi().scrollToTime(getCurrentTime());
    }
  }, 300);
  }
};

const handleSubmit = async () => {
  console.log('Form Submitted:', staff.value);
  try {
    console.log('inside console');

    // Create the store object
    const storeData = {
      name: store.value.name,
      address: store.value.address,
      phone: store.value.phone,
      opening_days: store.value.openingDays,
      start_time: store.value.startTime,
      end_time: store.value.endTime,
      lunch_start_time: store.value.lunchStartTime,
      lunch_end_time: store.value.lunchEndTime,
      subscribe: store.value.subscribe
    };

    // Only add email to storeData if it exists and is not empty
    if (store.value.email && store.value.email.trim() !== '') {
      storeData.email = store.value.email;
    }

    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/stores/create/`, {
      store: storeData,
      staff: staff.value.map(staffMember => {
        const staffData = {
          phone: staffMember.phone,
          password: staffMember.password,
          role: staffMember.role,
          username: staffMember.username,
        };
        
        // Only add email to staffData if it exists and is not empty
        if (staffMember.email && staffMember.email.trim() !== '') {
          staffData.email = staffMember.email;
        }
        
        return staffData;
      })
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.authToken}`,
      },
    });
    console.log('Store and staff data saved successfully', response.data);
  } catch (error) {
    console.error('Error saving store and staff data:', error);
  } finally {
    console.log('Submission complete');
  }
};

const submitForm = async () => {
  await handleSubmit();
  router.push({
    path: '/storeId',
    query: {
      storeData: JSON.stringify(store.value),
      staffData: JSON.stringify(staff.value),
    },
  });
  console.log('Form Submitted:', staff.value);
};



const showScheduleDialog = (index) => {
  if (staff.value[index].schedule === 'Customize Schedule') {
    selectedStaffIndex.value = index;
    scheduleDialogOpen.value = true;
  }
};

const saveEvent = () => {
  if (eventForm.value.title && eventForm.value.start && eventForm.value.end) {
    const newEvent = {
      title: eventForm.value.title,
      start: eventForm.value.start,
      end: eventForm.value.end,
      backgroundColor: eventForm.value.color,
      borderColor: eventForm.value.color,
      editable: true,
    };

    fullCalendar.value.getApi().addEvent(newEvent);

    // Save the event for the selected staff member
    saveSelectedDate();

    eventForm.value = { id: null, title: '', start: '', end: '' , color: '#21BA45' };
    eventDialogOpen.value = false;

    scheduleDialogOpen.value = false;
    setTimeout(() => {
      showScheduleDialog(selectedStaffIndex.value);
    }, 100);
  }
};
</script>


<style scoped>
.q-card {
  border: 1px solid #1e88e5;
}
.handle-back{
  cursor: pointer;
  display: flex;
}
.q-page-container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
}

.remove-staff-button {
  font-size: 12px;
}
.handle-form-button {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.full-calendar {
  width: 100%;
  max-width: 100%;
  margin: auto;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.responsive-calendar {
  max-width: 100%;
  height: auto;
}
.handle-staff{
  display: flex;
  justify-content: space-between;
}
.calendar-header {
  margin: unset !important;
}
.addstaff{
  cursor: pointer !important;
}

</style>
