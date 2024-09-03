<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page padding class="bg-light page-wrapper">
        <div class="form-wrapper">
          <q-card flat bordered class="q-pa-sm booksession-form">
            <q-card-section class="text-center">
              <h5 class="text-primary">Book an Appointment</h5>
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
                />

                <q-input
                  v-model="form.phone"
                  label="Phone Number"
                  filled
                  dense
                  class="input-field"
                />

                <q-input
                  v-model="form.email"
                  label="Email (Optional)"
                  filled
                  dense
                  placeholder="Enter your email (optional)"
                  class="input-field"
                />

                <q-select
                  v-model="form.therapist"
                  label="Select Therapist"
                  filled
                  dense
                  :options="therapistOptions"
                  class="input-field"
                  @input="fetchTherapistSchedule"
                />

                <q-input
                  v-model="form.date"
                  label="Select Date"
                  readonly
                  dense
                  filled
                  class="input-field cursor-pointer"
                  @click="showDateDialog = true"
                />

                <q-input
                  v-model="form.time"
                  label="Select Time"
                  readonly
                  dense
                  filled
                  class="input-field cursor-pointer"
                  @click="showTimeDialog = true"
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

    <q-dialog v-model="showDateDialog">
      <q-card>
        <q-date
          v-model="form.date"
          :options="(date) => availableDates.includes(date)"
          @input="showDateDialog = false"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="showTimeDialog">
      <q-card>
        <q-time
          v-model="form.time"
          format24h
          :hour-options="hourOptionsTime1"
          :minute-options="minuteOptionsTime1"
          @input="showTimeDialog = false"
        />
      </q-card>
    </q-dialog>
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
  therapist: '',
  date: '',
  time: '',
  notRobot: false
});

const showDateDialog = ref(false);
const showTimeDialog = ref(false);

const therapistOptions = ref(['Dr. John Doe', 'Dr. Jane Doe']);
const availableDates = ref([ '2024/09/01', '2024/09/05', '2024/09/06', '2024/09/09', '2024/09/23' ]);
    const  hourOptionsTime1= [ 9, 10, 11, 13, 15 ]
    const  minuteOptionsTime1=[ 0, 15, 30, 45 ]

const fetchTherapistSchedule = () => {
  // Fetch logic for therapist schedule
};

const handleSubmit = () => {
  alert('Form submitted successfully');
  if (!form.value.notRobot) {
    useQuasar().notify('Please check the "I am not a robot" checkbox');
  }

  isSubmitting.value = true;

  setTimeout(() => {
    isSubmitting.value = false;
    $q.notify({
      type: 'positive',
      message: 'Booking request submitted!'
    });

    // Clear form
    form.value = {
      name: '',
      phone: '',
      email: '',
      therapist: null,
      date: null,
      time: null,
      notRobot: false
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
</style>
