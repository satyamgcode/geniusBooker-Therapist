<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page class="q-pa-none">
        <div class="bg-cover-container">
          <div class="hero-content q-px-lg">
            <q-card class="hero-card">
              <q-card-section>
                <div class="text-h4 text-bold">Talk Resolve Heal</div>
                <div class="q-mt-sm text-subtitle2">
                  Online Counselling Therapy With Top Psychologists Anytime, Anywhere, Any device.
                </div>
                <q-btn label="Get Started" color="primary" class="q-mt-md q-px-lg" />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div>
          <q-separator class="q-my-lg" />
          <div class="text-center">
            <h2>Choose Help. Not Suffering.</h2>
            <h5 class="max-w-lg">Counselling Therapy Sessions With Licensed & Verified Experts</h5>
          </div>

          <div class="therapists-container row wrap justify-center q-px-lg q-py-md">
            <TherapistCard
              v-for="(store, index) in therapists"
              :key="index"
              :therapist="store"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AppHeader from 'src/components/common/AppHeader.vue';
import TherapistCard from 'src/components/cardsection/TherapistCards.vue';
import axios from 'axios';

const therapists = ref([]);

const dummyTherapists = [
  { 
    id: 1000,
    storeName: 'Malvika Therapy Store',
    qualification: 'MA in Clinical Psychology',
    specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
    availableAt: 'Aug 28, 2024 3:00 PM',
    image: 'https://via.placeholder.com/80',
    staff: [
      { id: 1, name: 'Dr. Anjali Sharma', role: 'Senior Psychologist', experience: '10 years' },
      { id: 2, name: 'Dr. Vikram Mehta', role: 'Child Psychologist', experience: '7 years' }, 
      { id: 3, name: 'Ms. Nidhi Patel', role: 'Therapy Assistant', experience: '3 years' }
    ]
  },
  {
    id: 2000,
    storeName: 'Ayesha Bukhari Therapy Store',
    qualification: 'MA in Clinical Psychology',
    specialization: 'Depression, Trauma, Body Image, ADHD, Stress, Anger, Anxiety',
    availableAt: 'Aug 28, 2024 3:00 PM',
    image: 'https://via.placeholder.com/80',
    staff: [
      { id: 1, name: 'Dr. Sameer Khan', role: 'Senior Therapist', experience: '12 years' },
      { id: 2, name: 'Ms. Ritu Verma', role: 'Cognitive Therapist', experience: '5 years' },
      { id: 3, name: 'Mr. Ajay Singh', role: 'Mental Health Counselor', experience: '4 years' }
    ]
  },
  {
    id: 3000,
    storeName: 'Rashi Lambe Therapy Store',
    qualification: 'MSc. in Counseling Psychology',
    specialization: 'Stress, Anxiety, Depression, Career Counselling, Relationship Issues',
    availableAt: 'Aug 28, 2024 3:00 PM',
    image: 'https://via.placeholder.com/80',
    staff: [
      { id: 1, name: 'Dr. Pooja Kulkarni', role: 'Psychotherapist', experience: '8 years' },
      { id: 2, name: 'Mr. Arun Jain', role: 'Relationship Counselor', experience: '6 years' },
      { id: 3, name: 'Ms. Preeti Desai', role: 'Wellness Coach', experience: '3 years' }
    ]
  },
  {
    id: 4000,
    storeName: 'Malvika Agarwal Therapy Store',
    qualification: 'MA in Clinical Counseling',
    specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
    availableAt: 'Aug 28, 2024 3:00 PM',
    image: 'https://via.placeholder.com/80',
    staff: [
      { id: 1, name: 'Dr. Meera Gupta', role: 'Clinical Psychologist', experience: '15 years' },
      { id: 2, name: 'Ms. Kavita Nair', role: 'Therapist', experience: '4 years' },
      { id: 3, name: 'Mr. Karan Bose', role: 'Behavioral Therapist', experience: '5 years' }
    ]
  },
  {
    id: 5000,
    storeName: 'Rashi Lambe Therapy Store',
    qualification: 'MSc. in Counseling Psychology',
    specialization: 'Stress, Anxiety, Depression, Career Counselling, Relationship Issues',
    availableAt: 'Aug 28, 2024 3:00 PM',
    image: 'https://via.placeholder.com/80',
    staff: [
      { id: 1, name: 'Dr. Sneha Bhatt', role: 'Clinical Psychologist', experience: '9 years' },
      { id: 2, name: 'Mr. Ravi Sinha', role: 'Family Therapist', experience: '5 years' },
      { id: 3, name: 'Ms. Sunita Verma', role: 'Mental Health Specialist', experience: '6 years' }
    ]
  },
  {
    id: 6000,
    storeName: 'Malvika Agarwal Therapy Store',
    qualification: 'MA in Clinical Counseling',
    specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
    availableAt: 'Aug 28, 2024 3:00 PM',
    image: 'https://via.placeholder.com/80',
    staff: [
      { id: 1, name: 'Dr. Aakash Verma', role: 'Psychiatrist', experience: '11 years' },
      { id: 2, name: 'Ms. Anamika Gupta', role: 'Psychologist', experience: '4 years' },
      { id: 3, name: 'Mr. Rajiv Kumar', role: 'Life Coach', experience: '7 years' }
    ]
  }
];

const fetchStores = async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/stores/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const apiTherapists = response.data.map(store => ({
      id: store.id,
      storeName: store.name,
      qualification: '', // Placeholder if qualification data is not available in API
      specialization: '', // Placeholder if specialization data is not available in API
      availableAt: '', // Placeholder if availableAt data is not available in API
      image: 'https://via.placeholder.com/80', // Placeholder image
      staff: store.therapists.map(therapist => ({
        id: therapist.first_name, // Adjust as per the actual data structure
        name: `${therapist.first_name} ${therapist.last_name || ''}`.trim(),
        role: therapist.specialty || 'Therapist', // Default role if specialty not available
        experience: therapist.experience ? `${therapist.experience} years` : 'Experience not available'
      }))
    }));

    // Combine API data and dummy data
    therapists.value = [...dummyTherapists, ...apiTherapists];
  } catch (error) {
    console.error("Error fetching stores:", error);
    therapists.value = dummyTherapists;
    throw error;
  }
};

onMounted(async () => {
  await fetchStores();
});
</script>



<style scoped>
.bg-cover-container {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/heroimage.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-content {
  max-width: 500px;
  width: 100%;
}

.hero-card {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.therapists-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
