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
                v-for="(therapist, index) in therapists"
                :key="index"
                :therapist="therapist"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import TherapistCard from 'src/components/cardsection/TherapistCards.vue';
  
  const therapists = ref([
    { 
      id: 1,
      name: 'Malvika Agarwal',
      qualification: 'MA in Clinical Psychology',
      specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
      availableAt: 'Aug 28, 2024 3:00 PM',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Ayesha Bukhari',
      qualification: 'MA in Clinical Psychology',
      specialization: 'Depression, Trauma, Body Image, ADHD, Stress, Anger, Anxiety',
      availableAt: 'Aug 28, 2024 3:00 PM',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      name: 'Rashi Lambe',
      qualification: 'MSc. in Counseling Psychology',
      specialization: 'Stress, Anxiety, Depression, Career Counselling, Relationship Issues',
      availableAt: 'Aug 28, 2024 3:00 PM',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 4,
      name: 'Malvika Agarwal',
      qualification: 'MA in Clinical Counseling',
      specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
      availableAt: 'Aug 28, 2024 3:00 PM',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 5,
      name: 'Rashi Lambe',
      qualification: 'MSc. in Counseling Psychology',
      specialization: 'Stress, Anxiety, Depression, Career Counselling, Relationship Issues',
      availableAt: 'Aug 28, 2024 3:00 PM',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 6,
      name: 'Malvika Agarwal',
      qualification: 'MA in Clinical Counseling',
      specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
      availableAt: 'Aug 28, 2024 3:00 PM',
      image: 'https://via.placeholder.com/80',
    }
  ]);
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
  