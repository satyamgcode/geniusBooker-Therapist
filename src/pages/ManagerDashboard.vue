<template>
    <q-layout view="lHh Lpr lFf">
      <AppHeader />
      <q-page-container>
        <div class="q-pa-md q-mx-lg dashboard-container">
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
                <q-btn
                  v-if="isEditing"
                  color="positive"
                  icon="save"
                  label="Save"
                  flat
                  @click="saveManagerDetails"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pa-lg manager-info">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.name"
                    label="Manager Name"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.department"
                    label="Department"
                    dense
                    filled
                    :disable="!isEditing"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="managerDetails.experience"
                    label="Experience (years)"
                    dense
                    filled
                    type="number"
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
          </q-card>
  
          <!-- Available Therapists Section -->
          <q-card flat bordered class="therapist-dropdown-card">
            <q-card-section class="q-pa-md">
              <h3 class="text-h6">Staff members</h3>
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

          <!-- therapist details and booking cards -->
           <BookingCards v-if = "selectedTherapist" :selectedTherapist="selectedTherapist" />

        </div>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import BookingCards from 'src/components/cardsection/BookingCards.vue';
  
  const managerDetails = ref({
    name: 'Manager John Doe',
    department: 'Therapy Management',
    experience: 15,
    description: 'Experienced manager overseeing therapy operations for over 15 years.',
  });
  
  const isEditing = ref(false);
  
  const therapists = ref([
  { id: 1, name: 'Dr. Jane Doe' },
  { id: 2, name: 'Dr. Alice Johnson' },
]);

const selectedTherapist = ref(null);

watch(selectedTherapist, () => {
  console.log('Selected therapist:', selectedTherapist.value);
});
  
  function saveManagerDetails() {
    console.log('Saving manager details...', managerDetails.value);
    isEditing.value = false;
  }

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
  </style>
  