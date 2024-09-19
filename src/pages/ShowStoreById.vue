<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page class="q-pa-md page-content">
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
            <div><strong>Opening Days:</strong> {{ Array.isArray(storeData.openingDays) ? storeData.openingDays.join(', ') : '' }}</div>
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
          <q-card-section v-for="(staffMember, index) in formattedSchedules" :key="index">
            <div><strong>Name:</strong> {{ staffMember.username }}</div>
            <div><strong>Phone:</strong> {{ staffMember.phone }}</div>
            <div><strong>Email:</strong> {{ staffMember.email }}</div>
            <div><strong>Role:</strong> {{ staffMember.role }}</div>
            <div><strong>Schedule:</strong> {{ staffMember.schedule }}</div>
            <div><strong>Available Days:</strong> {{ Array.isArray(staffMember.openingDays) ? staffMember.openingDays.join(', ') : '' }}</div>
            <div><strong>Available Slots:</strong> {{ staffMember.formattedSchedule }}</div>
            <div><strong>Active:</strong> {{ staffMember.active ? 'Yes' : 'No' }}</div>
            <q-separator />
          </q-card-section>

        </q-card>
        <div class="q-mt-lg handle-form-button">
          <q-btn label="Cancel" color="negative" @click="confirm = true" />
          <q-btn label="Continue" color="positive" @click="continueStoreCreation" />
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure you want to cancel the form?</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Confirm" color="primary" v-close-popup @click="resetForm" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import AppHeader from 'src/components/common/AppHeader.vue'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const confirm = ref(false)

const storeData = JSON.parse(route.query.storeData || '{}')
console.log('storeData:', storeData)
const staffData = JSON.parse(route.query.staffData || '[]')

// Computed property to format time slots for each staff member
const formattedSchedules = computed(() => {
  return staffData.map(staffMember => {
    if (!Array.isArray(staffMember.customSchedule)) return '';

    const formattedSlots = staffMember.customSchedule.map(slot => {
      const startTime = new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTime = new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${startTime}-${endTime}`;
    });
    return {
      ...staffMember,
      formattedSchedule: formattedSlots.join(', ')
    };
  });
});

function resetForm() {
  router.go(-1)
}

const continueStoreCreation = () => {
  router.push({ path: 'storePackages'})
}
</script>


<style scoped>
.page-content {
  max-width: 900px;
  margin: 0 auto;
}

.handle-form-button {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
