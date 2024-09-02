<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <q-page class="q-pa-md">
          <q-form>
            <!-- Store Information -->
            <q-card class="q-mb-md shadow-2">
              <q-card-section>
                <div class="text-h6 text-primary">Store Information</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-input filled v-model="store.name" label="Store Name" dense class="q-mb-sm" />
                <q-input filled v-model="store.address" label="Store Address" dense class="q-mb-sm" />
                <q-input filled v-model="store.phone" label="Phone Number" mask="(###) ###-####" dense class="q-mb-sm" />
                <q-input filled v-model="store.email" label="Email" type="email" dense class="q-mb-sm" />
  
                <!-- Store Schedule -->
                <q-card class="q-my-md q-pa-md bg-grey-2">
                  <q-card-section>
                    <div class="text-subtitle1">Store Schedule</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <q-select filled v-model="store.openingDays" :options="daysOfWeek" label="Opening Days" multiple dense class="q-mb-sm" />
                    <q-input
                      filled
                      v-model="store.startTime"
                      label="Start Time"
                      dense
                      readonly
                      class="q-mb-sm"
                      @click="handleStoreTimeChangeStart"
                    />
                    <q-input
                      filled
                      v-model="store.endTime"
                      label="End Time"
                      dense
                      readonly
                      @click="handleStoreTimeChangeEnd"
                    />
  
                    <!-- Start Time Picker Dialog -->
                    <q-dialog v-model="showStartTimePicker">
                      <q-card-section>
                        <q-time
                          v-model="store.startTime"
                          format24h
                          @blur="showStartTimePicker = false"
                        />
                      </q-card-section>
                    </q-dialog>
  
                    <!-- End Time Picker Dialog -->
                    <q-dialog v-model="showEndTimePicker">
                      <q-card-section>
                        <q-time
                          v-model="store.endTime"
                          format24h
                          @blur="showEndTimePicker = false"
                        />
                      </q-card-section>
                    </q-dialog>
                  </q-card-section>
                </q-card>
  
                <!-- Lunch Break -->
                <q-card class="q-my-md q-pa-md bg-grey-2">
                  <q-card-section>
                    <div class="text-subtitle1">Lunch Break</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <q-input
                      filled
                      v-model="store.lunchStartTime"
                      label="Lunch Start Time"
                      dense
                      class="q-mb-sm"
                      readonly
                      @click="handleLunchStartTimePicker"
                    />
                    <q-input
                      filled
                      v-model="store.lunchEndTime"
                      label="Lunch End Time"
                      dense
                      readonly
                      @click="handleLunchEndTimePicker"
                    />
  
                    <!-- Lunch Start Time Picker Dialog -->
                    <q-dialog v-model="showLunchStartTimePicker">
                      <q-card-section>
                        <q-time
                          v-model="store.lunchStartTime"
                          format24h
                          @blur="showLunchStartTimePicker = false"
                        />
                      </q-card-section>
                    </q-dialog>
  
                    <!-- Lunch End Time Picker Dialog -->
                    <q-dialog v-model="showLunchEndTimePicker">
                      <q-card-section>
                        <q-time
                          v-model="store.lunchEndTime"
                          format24h
                          @blur="showLunchEndTimePicker = false"
                        />
                      </q-card-section>
                    </q-dialog>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
  
            <!-- Staff Details -->
            <q-card class="q-mb-md shadow-2">
              <q-card-section>
                <div class="text-h6 text-primary flex justify-between">
                  <span>Staff Details</span>
                  <img src="src/assets/icons/addStaff.svg" outline dense @click="addStaff" />
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section v-for="(staffMember, index) in staff" :key="index">
                <q-input filled v-model="staffMember.name" label="Name" dense class="q-mb-sm" />
                <q-input filled v-model="staffMember.phone" label="Phone Number" mask="(###) #####-#####" dense class="q-mb-sm" />
                <q-input filled v-model="staffMember.email" label="Email" type="email" dense class="q-mb-sm" />
                <q-select filled v-model="staffMember.role" :options="roles" label="Role" dense class="q-mb-sm" />
                <q-input filled v-model="staffMember.password" label="Password" type="password" dense />
                <q-card class="q-my-md q-pa-md bg-grey-2">
                  <q-card-section>
                    <div class="text-subtitle1">Staff Schedule</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <q-select filled v-model="staffMember.schedule" :options="staffSchedules" label="Schedule" dense />
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
          </q-form>
          <div class="q-mt-lg handle-form-button">
            <q-btn label="Cancel" color="negative" @click="confirm = true" />
            <q-btn label="Submit" color="primary" @click="submitForm" />
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
  import { ref } from 'vue'
  import AppHeader from 'src/components/common/AppHeader.vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const store = ref({
    name: '',
    address: '',
    phone: '',
    email: '',
    openingDays: [],
    startTime: '',
    endTime: '',
    lunchStartTime: '',
    lunchEndTime: '',
    subscribe: false
  })
  
  const staff = ref([
    {
      name: '',
      phone: '',
      email: '',
      active: false,
      role: '',
      password: '',
      schedule: ''
    }
  ])
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const roles = ['Manager', 'Therapist']
  const staffSchedules = ['Follow Store Schedule', 'Customize Schedule']
  
  const showStartTimePicker = ref(false)
  const showEndTimePicker = ref(false)
  const showLunchStartTimePicker = ref(false)
  const showLunchEndTimePicker = ref(false)
  const confirm = ref(false)
  
  const handleStoreTimeChangeStart = () => {
    showStartTimePicker.value = true
  }
  
  const handleStoreTimeChangeEnd = () => {
    showEndTimePicker.value = true
  }
  
  const handleLunchStartTimePicker = () => {
    showLunchStartTimePicker.value = true
  }
  
  const handleLunchEndTimePicker = () => {
    showLunchEndTimePicker.value = true
  }
  
  const addStaff = () => {
    staff.value.push({
      name: '',
      phone: '',
      email: '',
      active: false,
      role: '',
      password: '',
      schedule: ''
    })
  }
  
  const removeStaff = (index) => {
    staff.value.splice(index, 1)
  }

  const handleSubmitFromCreateStore = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/stores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: store.value.name,
        address: store.value.address,
        phone: store.value.phone,
        email: store.value.email,
        openingDays: store.value.openingDays,
        startTime: store.value.startTime,
        endTime: store.value.endTime,
        lunchStartTime: store.value.lunchStartTime,
        lunchEndTime: store.value.lunchEndTime,
        // subscribe: store.value.subscribe
      })
    })
    const data = await response.json()
    console.log('Data:', data)
  }
  
  const submitForm = async () => {
    console.log('Store:', store.value)
    console.log('Staff:', staff.value)
    // router.push({
    //   path: '/storeId',
    //   query: {
    //   storeData: JSON.stringify(store.value),
    //   staffData: JSON.stringify(staff.value)
    // }
    // })
    await handleSubmitFromCreateStore()
  }
  
  const resetForm = () => {
    store.value = {
      name: '',
      address: '',
      phone: '',
      email: '',
      openingDays: [],
      startTime: '',
      endTime: '',
      lunchStartTime: '',
      lunchEndTime: '',
      subscribe: false
    }
  
    staff.value = [
      {
        name: '',
        phone: '',
        email: '',
        active: false,
        role: '',
        password: '',
        schedule: ''
      }
    ]
  }
  </script>
  
  <style scoped>
  .q-card {
    border: 1px solid #1e88e5;
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
  