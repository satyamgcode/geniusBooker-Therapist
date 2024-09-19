<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader />
    <q-page-container>
      <div class="page-layout row">
        <!-- Left Side: Manager Details and Available Therapists -->
        <div class="col-12 col-md-8 q-pa-md q-mx-lg dashboard-container">
          <!-- Manager Details Section -->
          <q-card flat bordered class="q-mb-lg manager-card">
            <q-card-section class="row items-center justify-between">
              <div class="col">
                <h3 class="text-h5 q-mb-none">Manager Profile</h3>
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
                  @click="saveManagerDetails"
                />
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pa-lg manager-info">
              <div class="row q-col-gutter-md">

                <div class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.store_name"
                    label="Store Name"
                    dense
                    filled
                    disable
                  />
                </div>

                <div class="col-12 col-md-6">

                  <q-input
                    v-model="managerDetails.managerDetails.name"
                    label="Manager Name"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.managerDetails.role"
                    label="Department"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.managerDetails.exp"
                    label="Experience (years)"
                    dense
                    filled
                    type="number"
                    :disable="!isEditing"
                  />
                </div>
                <div v-if="isEditing" class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.managerDetails.email"
                    label="Email"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div v-if="isEditing" class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.managerDetails.phone"
                    label="Phone"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="managerDetails.description"
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

          <!-- Available Therapists Section -->
          <q-card flat bordered class="therapist-dropdown-card">
            <q-card-section class="q-pa-md">
              <h3 class="text-h6">Staff Members</h3>
              <q-separator />
              <q-select
                v-model="selectedTherapist"
                :options="therapists"
                option-value="id"
                option-label="name"
                label="Select a therapist"
                dense
                outlined
                hint="Select from the available therapists"
              />
            </q-card-section>
          </q-card>

          <!-- Therapist details and booking cards -->
          <BookingCards v-if="selectedTherapist" :selectedTherapist="selectedTherapist" />
        </div>

        <!-- Right Side: Staff Management Panel -->
        <div class="col-12 col-md-4 q-pa-md management-panel">
          <q-card flat bordered class="q-mb-lg management-card">
            <q-card-section class="q-pa-md">
              <h3 class="text-h6 text-primary q-mb-md">Management Actions</h3>
              <q-btn
                color="primary"
                label="Staff Management"
                icon="supervisor_account"
                class="q-mb-md full-width action-button"
                @click="manageStaff"
              />
              <q-btn
                color="positive"
                label="Store Management"
                icon="store"
                class="full-width action-button"
                @click="manageStore"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
    <TherapistCalendar :scheduleDialogOpen="showScheduleDialog" class="calendar-wrapper" />
  </q-layout>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import AppHeader from 'src/components/common/AppHeader.vue';
import BookingCards from 'src/components/cardsection/BookingCards.vue';
import TherapistCalendar from 'src/components/common/TherapistCalendar.vue';
import { useManagerStore } from 'src/stores/useManagerStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const managerStore = useManagerStore();

const showScheduleDialog = ref(false);

const handleScheduleChange = () => {
  console.log('Schedule changed');
  showScheduleDialog.value = !showScheduleDialog.value;
}

const cancelEditing = () => {
    isEditing.value = false;
  }

const managerDetails = ref({});

const isEditing = ref(false);

const therapists = computed(() => {
  console.log(managerDetails.value)
  const data = managerDetails.value?.therapists;
  if (data) {
    return data.map(therapist => ({
      id: therapist.therapist_id,
      name: therapist.therapist_name,
    }))
  }

  return []
})

const selectedTherapist = ref(null);

watch(selectedTherapist, () => {
  console.log('Selected therapist:', selectedTherapist.value);
});

function saveManagerDetails() {
  console.log('Saving manager details...', managerDetails.value);
  isEditing.value = false;
}

function manageStaff() {
  console.log('Navigating to Staff Management...');
  router.push('./manage-staff');
}

function manageStore() {
  console.log('Navigating to Store Management...');
  router.push('./manage-store');
}
onBeforeMount(() => {
  managerDetails.value = {managerDetails:{...managerStore.manager} , ...managerStore.managerStores[0]};
  console.log('managerDetails',managerDetails.value);
});

</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.manager-card {
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.manager-info .q-input {
  background-color: white;
  border-radius: 8px;
}

.therapist-dropdown-card {
  margin-top: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.manage-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.page-layout {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
}

.management-panel {
  display: flex;
  flex-direction: column;
}

.management-card {
  background: linear-gradient(135deg, #f9fbe7, #e8f5e9);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
  padding: 20px;
}

.action-button {
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: white;
  border-radius: 20px;
}

.action-button.q-btn--primary {
  background-color: #2196f3;
}

.action-button.q-btn--primary:hover {
  background-color: #1976d2;
}

.action-button.q-btn--secondary {
  background-color: #ff7043;
}

.action-button.q-btn--secondary:hover {
  background-color: #f4511e;
}

.full-width {
  width: 100%;
}
@media (max-width: 600px) {
  .handle-edit-save{
        display: flex;
        flex-direction: column;
      }
}
</style>
