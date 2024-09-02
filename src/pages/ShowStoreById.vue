<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page class="q-pa-md">
          <q-card class="q-mb-md shadow-2">
            <q-card-section>
              <div class="text-h6 text-primary">Store Information</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div><strong>Name:</strong> {{ storeData.name }}</div>
              <div><strong>Address:</strong> {{ storeData.address }}</div>
              <div><strong>Phone:</strong> {{ storeData.phone }}</div>
              <div><strong>Email:</strong> {{ storeData.email }}</div>
              <div><strong>Opening Days:</strong> {{ storeData.openingDays}}</div>
              <div><strong>Start Time:</strong> {{ storeData.startTime }}</div>
              <div><strong>End Time:</strong> {{ storeData.endTime }}</div>
              <div><strong>Lunch Start Time:</strong> {{ storeData.lunchStartTime }}</div>
              <div><strong>Lunch End Time:</strong> {{ storeData.lunchEndTime }}</div>
            </q-card-section>
          </q-card>
  
          <q-card class="q-mb-md shadow-2">
            <q-card-section>
              <div class="text-h6 text-primary">Staff Details</div>
            </q-card-section>
            <q-separator />
            <q-card-section v-for="(staffMember, index) in staffData" :key="index">
              <div><strong>Name:</strong> {{ staffMember.name }}</div>
              <div><strong>Phone:</strong> {{ staffMember.phone }}</div>
              <div><strong>Email:</strong> {{ staffMember.email }}</div>
              <div><strong>Role:</strong> {{ staffMember.role }}</div>
              <div><strong>Schedule:</strong> {{ staffMember.schedule }}</div>
              <q-separator />
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import AppHeader from 'src/components/common/AppHeader.vue'
  
  const route = useRoute()
  const storeData = JSON.parse(route.query.storeData || '{}')
  console.log('storeData:', storeData)
  const staffData = JSON.parse(route.query.staffData || '[]')
  </script>
  