<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page class="q-pa-md">
          <q-form @submit.prevent="submitForm">
            <!-- Staff Details -->
            <q-card class="q-mb-md shadow-2">
              <q-card-section>
                <div class="text-h6 text-primary flex justify-between">
                  <span>Staff Details</span>
                  <img
                    src="src/assets/icons/addStaff.svg"
                    outline
                    alt="Add Staff"
                    dense
                    class="cursor-pointer"
                    @click="addStaff"
                  />
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section v-for="(staffMember, index) in staff" :key="index">
                <q-input filled v-model="staffMember.username" label="Name" dense class="q-mb-sm" />
                <q-input
                  filled
                  v-model="staffMember.phone"
                  label="Phone Number"
                  mask="(###) #####-#####"
                  dense
                  class="q-mb-sm"
                />
                <q-input filled v-model="staffMember.email" label="Email" type="email" dense class="q-mb-sm" />
                <q-select filled v-model="staffMember.role" :options="roles" label="Role" dense class="q-mb-sm" />
                <q-input filled v-model="staffMember.password" label="Password" type="password" dense />
                <q-card class="q-my-md q-pa-md bg-grey-2">
                  <q-card-section>
                    <div class="text-subtitle1">Staff Schedule</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <q-select
                      filled
                      v-model="staffMember.schedule"
                      :options="staffSchedules"
                      label="Schedule"
                      dense
                    />
                  </q-card-section>
                </q-card>
                <q-btn
                  label="Remove Staff"
                  color="negative"
                  outline
                  dense
                  class="q-my-xs remove-staff-button"
                  @click="removeStaff(index)"
                />
              </q-card-section>
            </q-card>
            <div class="q-mt-lg handle-form-button">
            <q-btn label="Cancel" color="negative" @click="confirm = true" />
            <q-btn label="Back" color="primary" @click="goBack" />
            <q-btn label="Submit" color="positive" type="submit" />
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
          </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import axios from 'axios'
  import AppHeader from 'src/components/common/AppHeader.vue'
  import { useAuthStore } from 'src/stores/AuthStore'
  
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  
  const store = ref(JSON.parse(route.query.storeData))
  
  const staff = ref([
    {
      username: '',
      phone: '',
      email: '',
      active: false,
      role: '',
      password: '',
      schedule: ''
    }
  ])
  
  const roles = ['Manager', 'Therapist']
  const confirm = ref(false)
  const staffSchedules = ['Follow Store Schedule', 'Customize Schedule']
  
  const addStaff = () => {
    staff.value.push({
      username: '',
      phone: '',
      email: '',
      active: false,
      role: '',
      password: '',
      schedule: '',
      stores: [1] 
    })
  }
  
  const removeStaff = (index) => {
    staff.value.splice(index, 1)
  }
  
  const goBack = () => {
    router.back()
  }
  
  const handleSubmitFromCreateStore = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/stores/', {
        name: store.value.name,
        address: store.value.address,
        phone: store.value.phone,
        email: store.value.email,
        opening_days: store.value.openingDays,
        start_time: store.value.startTime,
        end_time: store.value.endTime,
        lunch_start_time: store.value.lunchStartTime,
        lunch_end_time: store.value.lunchEndTime,
        subscribe: store.value.subscribe
      },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authStore.authToken}`
      }
    })
  
      console.log(response.data)
    } catch (error) {
      console.error('Error saving store data:', error)
    }finally{
        console.log('store created')
    }
  }
  console.log(authStore.authToken)
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/staff/', {
        staff: staff.value,
        stores: store.value.name
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authStore.authToken}`
        }
      })
  
      console.log('Staff data saved successfully', response.data)
    } catch (error) {
      console.error('Error saving staff data:', error)
    }finally{
        console.log('staff created')
    }
  }
  
  const submitForm = async () => {
    await handleSubmitFromCreateStore()
    await handleSubmit()
    router.push({
      path: '/storeId',
      query: {
        storeData: JSON.stringify(store.value),
        staffData: JSON.stringify(staff.value)
      }
    })
  }
  </script>
  
  <style scoped>
  .q-card {
    border: 1px solid #1e88e5;
  }
  .q-page-container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
}
  
  .remove-staff-button {
    font-size: 12px;
  }
  .handle-form-button {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>
  