<!-- CalendarComponent.vue -->
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
  import { ref, nextTick, watch } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { format } from 'date-fns';
  
  const scheduleDialogOpen = ref(false);
  const eventDialogOpen = ref(false);
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
  
  const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridDay',
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00',
    allDaySlot: false,
    headerToolbar: {
      start: '',
      center: 'title',
      end: 'timeGridWeek,timeGridDay prev,next',
    },
    height: 'auto',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    nowIndicator: true,
    longPressDelay: 0,
    events: [],
    select: (info) => {
      eventDialogOpen.value = true;
      eventForm.value.start = format(info.start, 'yyyy-MM-dd HH:mm:ss');
      eventForm.value.end = format(info.end, 'yyyy-MM-dd HH:mm:ss');
    },
  });
  
  const fullCalendar = ref(null);
  
//   const selectedStaffIndex = ref(null);
//   const staff = ref([]);
  
  // Emit events for parent to handle
  const emit = defineEmits(['update:scheduleDialogOpen', 'save-selected-date', 'update-event-form']);
  
  const onDialogShow = async () => {
    await nextTick();
    if (fullCalendar.value && selectedStaffIndex.value !== null) {
      fullCalendar.value.getApi().removeAllEvents();
      const events = staff.value[selectedStaffIndex.value].customSchedule || [];
      events.forEach((event) => {
        fullCalendar.value.getApi().addEvent(event);
      });
      setTimeout(() => {
        if (fullCalendar.value) {
          fullCalendar.value.getApi().updateSize();
        }
      }, 300);
    }
  };
  
  watch(scheduleDialogOpen , () => {
    if (scheduleDialogOpen.value) {
      
    }
  })

  const saveSelectedDate = () => {
    emit('save-selected-date', fullCalendar.value.getApi().getEvents());
    scheduleDialogOpen.value = false;
  };

  const selectedStaffIndex = ref(props.selectedStaffIndex);
const staff = ref(props.staff);

watch(() => props.scheduleDialogOpen, (newValue) => {
  if (newValue) onDialogShow();
});
  
  const closeDialog = () => {
    scheduleDialogOpen.value = false;
    emit('update:scheduleDialogOpen', false);
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
      saveSelectedDate();
      eventForm.value = { id: null, title: '', start: '', end: '', color: '#21BA45' };
      eventDialogOpen.value = false;
    }
  };
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
  </style>
  