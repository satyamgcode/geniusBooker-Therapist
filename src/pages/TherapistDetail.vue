<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page class="q-pa-sm q-pb-lg">
          <!-- Store Information Section -->
          <q-card class="store-info-card q-pa-sm q-mb-lg">
            <q-card-section>
              <div class="row items-center q-gutter-sm">
                <div class="col-12 col-md-auto text-center q-py-md">
                  <q-avatar size="100px" color="primary" icon="storefront" />
                </div>
                <div class="col-12 col-md">
                  <div class="text-h5 text-weight-bold">{{ store.name }}</div>
                  <div class="text-subtitle2 text-grey-7 q-mt-xs">{{ store.address }}</div>
                  <div class="text-body2 q-mt-xs">Contact: {{ store.contact }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
  
          <!-- Staff Members Section -->
          <q-card class="q-pa-sm staff-section">
            <q-card-section>
              <div class="text-h6 text-weight-bold q-mb-md">Our Staff Members</div>
              <div class="row q-col-gutter-sm">
                <div
                  v-for="staff in store.staff"
                  :key="staff.id"
                  class="col-12 col-sm-6 col-md-4"
                >
                  <q-card class="staff-card q-pa-sm q-mb-md">
                    <q-card-section class="text-center">
                      <q-avatar size="80px">
                        <img :src="staff.image" alt="Staff Photo" />
                      </q-avatar>
                      <div class="text-subtitle1 text-weight-bold q-mt-sm">
                        {{ staff.name }}
                      </div>
                      <div class="text-caption text-grey-7 q-mt-xs">{{ staff.role }}</div>
                      <div class="text-body2 q-mt-xs">{{ staff.experience }}</div>
                    </q-card-section>
                    <q-card-actions align="center">
                      <q-btn flat color="primary" label="View Profile" @click="viewProfile(staff.id)" />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
  
          <div class="q-pa-md text-center">
            <q-btn color="orange-8" label="BOOK SESSION" class="text-white" padding="sm lg" @click="bookSession" />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  
  const router = useRouter();
  const route = useRoute();
  
  const store = ref({});
  
  onMounted(() => {
    fetchStoreDetails(route.params.id);
  });
  
  const fetchStoreDetails = (id) => {
    const storeData = {
      1: {
        name: 'Malvika Therapy Store',
        address: '1234 Elm Street, City, Country',
        contact: '+123 456 7890',
        staff: [
          { id: 1, name: 'Dr. Anjali Sharma', role: 'Senior Psychologist', experience: '10 years', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Dr. Vikram Mehta', role: 'Child Psychologist', experience: '7 years', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Ms. Nidhi Patel', role: 'Therapy Assistant', experience: '3 years', image: 'https://via.placeholder.com/80' }
        ]
      },
      2: {
        name: 'Ayesha Bukhari Therapy Store',
        address: '5678 Maple Avenue, City, Country',
        contact: '+987 654 3210',
        staff: [
          { id: 1, name: 'Dr. Sameer Khan', role: 'Senior Therapist', experience: '12 years', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Ms. Ritu Verma', role: 'Cognitive Therapist', experience: '5 years', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Mr. Ajay Singh', role: 'Mental Health Counselor', experience: '4 years', image: 'https://via.placeholder.com/80' }
        ]
      },
      3: {
        name: 'Sanaa Bukhari Therapy Store',
        address: '9012 Pine Road, City, Country',
        contact: '+456 789 0123',
        staff: [
          { id: 1, name: 'Dr. Faizan Ansari', role: 'Psychiatrist', experience: '10 years', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Ms. Pooja Sharma', role: 'Child Therapist', experience: '7 years', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Mr. Samir Patel', role: 'Psychologist', experience: '3 years', image: 'https://via.placeholder.com/80' }
        ]
      },
      4: {
        name: 'Fatima Bukhari Therapy Store',
        address: '3456 Oak Lane, City, Country',
        contact: '+789 012 3456',
        staff: [
          { id: 1, name: 'Dr. Ayub Khan', role: 'Psychiatrist', experience: '12 years', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Ms. Sarika Verma', role: 'Cognitive Therapist', experience: '5 years', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Mr. Bilal Singh', role: 'Mental Health Counselor', experience: '4 years', image: 'https://via.placeholder.com/80' }
        ]
      },
      5: {
        name: 'Sanaa Bukhari Therapy Store',
        address: '9012 Pine Road, City, Country',
        contact: '+456 789 0123',
        staff: [
          { id: 1, name: 'Dr. Faizan Ansari', role: 'Psychiatrist', experience: '10 years', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Ms. Pooja Sharma', role: 'Child Therapist', experience: '7 years', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Mr. Samir Patel', role: 'Psychologist', experience: '3 years', image: 'https://via.placeholder.com/80' }
        ]
      },
      6: {
        name: 'Fatima Bukhari Therapy Store',
        address: '3456 Oak Lane, City, Country',
        contact: '+789 012 3456',
        staff: [
          { id: 1, name: 'Dr. Ayub Khan', role: 'Psychiatrist', experience: '12 years', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Ms. Sarika Verma', role: 'Cognitive Therapist', experience: '5 years', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Mr. Bilal Singh', role: 'Mental Health Counselor', experience: '4 years', image: 'https://via.placeholder.com/80' }
        ]
      }
    };
  
    store.value = storeData[id];
  };
  
  const viewProfile = (staffId) => {
    console.log(`Viewing profile for staff ID: ${staffId}`);
    router.push({ path: `/staff/${staffId}` });
  };
  
  const bookSession = () => {
    console.log('Book Session');
    console.log('storeId:', route.params.id);
    router.push({ path: '/book-session' , query: { store_id: route.params.id } } , );
  };
  </script>
  
  <style scoped>
  .store-info-card,
  .staff-section {
    max-width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .staff-card {
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
  }
  
  .staff-card:hover {
    transform: translateY(-5px);
  }
  
  .text-h6,
  .text-subtitle1 {
    color: #333;
  }
  
  .q-btn {
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    .store-info-card,
    .staff-section {
      padding: 8px;
    }
  
    .staff-card {
      margin-bottom: 12px;
    }
  }
  </style>
  