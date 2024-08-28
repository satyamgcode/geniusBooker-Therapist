<template>
    <q-card class="therapist-card">
      <div class="q-pa-md gb-wrapcards">
        <div class="gb-therapist-details">
        <q-card-section>
        <div class="row items-center">
          <q-avatar size="80px" rounded>
            <img :src="therapist.image" alt="Therapist Photo" />
          </q-avatar>
          <div class="q-ml-md">
            <div class="text-h6">{{ therapist.name }}</div>
            <div class="text-subtitle2">{{ therapist.qualification }}</div>
          </div>
        </div>
      </q-card-section>
  
      <q-card-section>
        <div class="row items-center q-mt-md">
          <q-icon name="star" color="orange" />
          <div class="text-bold q-ml-sm">Specialization</div>
        </div>
        <div class="text-body2">{{ therapist.specialization }}</div>
  
        <div class="row items-center q-mt-md">
          <q-icon name="schedule" color="green" />
          <div class="text-bold q-ml-sm">Next Available at</div>
        </div>
        <div class="text-body2">{{ therapist.availableAt }}</div>
      </q-card-section>
      </div>
  
      <q-card-actions align="right" class="q-pt-md">
        <q-btn label="View Profile" flat color="primary" />
        <q-btn label="Book Session" color="primary" />
      </q-card-actions>
      </div>
    </q-card>
  </template>
  
  <script setup>
  defineProps({
    therapist: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .therapist-card {
    max-width: 400px;
    width: 100%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  .gb-wrapcards{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  