<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page class="q-pa-md q-pb-lg">
          <!-- Store Information Section -->
          <q-card class="store-info-card q-pa-md q-mb-lg">
            <div class="handle-store-section">
                <q-card-section>
              <div class="row items-center q-gutter-sm">
                <div class="col-12 col-md-auto text-center q-py-md">
                  <q-avatar size="100px" color="blue" icon="store" />
                </div>
                <div class="col-12 col-md flex column flex-center align-center">
                  <div class="text-h5 text-weight-bold">{{ store.store_name || 'Store Name' }}</div>
                  <div class="text-subtitle2 text-grey-8 q-mt-xs">{{ store.store_address  || 'Store Address' }}</div>
                  <div class="text-body2 q-mt-xs">Contact: {{ store.store_phone  || 'Store Contact' }}</div>
                </div>
              </div>
            </q-card-section>
            <!-- Right Side: Staff Management Panel -->
        <div class="col-12 col-md-4 q-pa-md management-panel">  
              <q-btn
                color="primary"
                label="Staff Management"
                icon="supervisor_account"
                class="q-mb-md  action-button"
                @click="manageStaff"
              />
              <q-btn
                color="positive"
                label="Store Management"
                icon="store"
                class="q-mb-md action-button"
                @click="manageStore"
              />
        </div>
            </div>
          </q-card>
  
          <!-- Staff Members Section -->
          <q-card class="q-pa-md staff-section">
            <q-card-section>
              <div class="text-h6 text-weight-bold q-mb-md">Staff members</div>
              <div class="row q-col-gutter-sm">
                <div
                  v-for="staff in store.therapists"
                  :key="staff.id"
                  class="col-12 col-sm-6 col-md-4"
                >
                  <q-card class="staff-card q-pa-sm q-mb-md">
                    <q-card-section class="text-center">
                      <q-avatar size="80px">
                        <img :src="staff.image || 'https://via.placeholder.com/80'" alt="Staff Photo" />
                      </q-avatar>
                      <div class="text-subtitle1 text-weight-bold q-mt-sm">
                        {{ staff.username || 'staff name' }}
                      </div>
                      <div class="text-caption text-grey-7 q-mt-xs">{{ staff.role }}</div>
                      <div class="text-body2 q-mt-xs">{{ staff.speciality || 'No detail available' }}</div>
                      <div class="text-body2 q-mt-xs">{{ staff.experience || 'No detail available' }}</div>
                    </q-card-section>
                    <q-card-actions align="center">
                      <q-btn flat color="green" icon="visibility" label="Profile" @click="viewProfile(staff.id)" />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-separator/>
          <!-- managers details -->
          <q-card class="q-pa-md staff-section">
            <q-card-section>
              <div class="text-h6 text-weight-bold q-mb-md">Manager members</div>
              <div class="row q-col-gutter-sm">
                <div
                  v-for="staff in store.managers"
                  :key="staff.id"
                  class="col-12 col-sm-6 col-md-4"
                >
                  <q-card class="staff-card q-pa-sm q-mb-md">
                    <q-card-section class="text-center">
                      <q-avatar size="80px">
                        <img :src="staff.image || 'https://via.placeholder.com/80'" alt="Staff Photo" />
                      </q-avatar>
                      <div class="text-subtitle1 text-weight-bold q-mt-sm">
                        {{ staff.username || 'staff name' }}
                      </div>
                      <div class="text-caption text-grey-7 q-mt-xs">{{ staff.role }}</div>
                      <div class="text-body2 q-mt-xs">{{ staff.speciality || 'No detail available' }}</div>
                      <div class="text-body2 q-mt-xs">{{ staff.experience || 'No detail available' }}</div>
                    </q-card-section>
                    <q-card-actions align="center">
                      <q-btn flat color="green" icon="visibility" label="Profile" @click="viewProfile(staff.id)" />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>

        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import { useOwnerStore } from 'src/stores/ownerStoresStore';

  const ownerStore = useOwnerStore();
  
  const router = useRouter();
  const route = useRoute();
  
  const store = ref({
    name: '',
    address: '',
    contact: '',
    staff: []
  });

  
  // const fetchStoreDetails = async (id) => {
  //   try {
  //     // Dummy data to simulate API response
  //     const storeData = {
  //       1: {
  //         name: 'Malvika Therapy Center',
  //         address: '1234 Elm Street, City, Country',
  //         contact: '+123 456 7890',
  //         staff: [
  //           { id: 1, name: 'Dr. Anjali Sharma',role:'therapist', speciality: 'Senior Psychologist', experience: '10 years', image: 'https://cdn.quasar.dev/img/avatar2.jpg' },
  //           { id: 2, name: 'Dr. Vikram Mehta',role:'therapist', speciality: 'Child Psychologist', experience: '7 years', image: 'https://via.placeholder.com/80' },
  //           { id: 3, name: 'Ms. Nidhi Patel',role:'therapist', speciality: 'Therapy Assistant', experience: '3 years', image: 'https://via.placeholder.com/80' },
  //           { id: 4, name: 'Dr. Ayesha Bukhari',role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' },
  //           { id: 5, name: 'Dr. Faizan Ansari',role:'therapist', speciality: 'Counselling Psychologist', experience: '10 years', image: 'https://via.placeholder.com/80' },
  //           { id: 6, name: 'Dr. Ayesha Bukhari',role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' }
  //         ]
  //       },
  //       2: {
  //         name: 'Ayesha Bukhari Therapy Center',
  //         address: '5678 Oak Street, City, Country',
  //         contact: '+987 654 3210',
  //         staff: [
  //           { id: 4, name: 'Dr. Ayesha Bukhari', role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' }
  //         ]
  //       },
  //       3: {
  //         name: 'Dr. Faizan Ansari Therapy Center',
  //         address: '9012 Pine Street, City, Country',
  //         contact: '+555 123 4567',
  //         staff: [
  //           { id: 5, name: 'Dr. Faizan Ansari',role:'therapist', speciality: 'Counselling Psychologist', experience: '10 years', image: 'https://via.placeholder.com/80' },
  //           { id: 6, name: 'Dr. Ayesha Bukhari',role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' },
  //           { id: 7, name: 'Dr. Ayesha Bukhari',role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' }
  //         ]
  //       },
  //       4: {
  //         name: 'Dr. Ayesha Bukhari Therapy Center',
  //         address: '3456 Cedar Street, City, Country',
  //         contact: '+111 222 3333',
  //         staff: [
  //           { id: 7, name: 'Dr. Ayesha Bukhari',role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' }
  //         ]
  //       },
  //       5: {
  //         name: 'Dr. Ayesha Bukhari Therapy Center',
  //         address: '7890 Alder Street, City, Country',
  //         contact: '+444 555 6666',
  //         staff: [
  //           { id: 8, name: 'Dr. Ayesha Bukhari',role:'therapist', speciality: 'Counselling Psychologist', experience: '15 years', image: 'https://via.placeholder.com/80' }
  //         ]
  //       }
  //     };
  //     store.value = storeData[id] || {};
  //   } catch (error) {
  //     console.error('Error fetching store details:', error);
  //   }
  // };
  
  const viewProfile = (staffId) => {
    console.log(`Viewing profile for staff ID: ${staffId}`);
    router.push({ path: `/staff/${staffId}` });
  };

  const manageStaff =()=> {
  console.log('Navigating to Staff Management...');
  router.push('/manage-staff');
}

const manageStore =()=> {
  console.log('Navigating to Store Management...');
  router.push('/manage-store');
}

onMounted(() => {
    store.value = ownerStore.stores[0];
    console.log(store.value)
  });
  </script>
  
  <style scoped>
  .store-info-card {
    background-color: #f0f8ff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  .staff-section {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .staff-card {
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .staff-card:hover {
    transform: translateY(-5px);
  }
  
  .text-h6, .text-subtitle1 {
    color: #333;
  }
  
  .q-btn {
    font-weight: bold;
    border-radius: 8px;
  }
  
  .q-btn[flat] {
    text-transform: uppercase;
  }
  .handle-store-section{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .management-panel{
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
    .store-info-card,
    .staff-section {
      padding: 12px;
    }
  
    .staff-card {
      margin-bottom: 16px;
    }

    .handle-store-section{
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
}
  </style>
  