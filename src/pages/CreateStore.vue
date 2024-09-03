<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page class="q-pa-md">
        <q-form @submit.prevent="goToStaffDetails">
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
                  <q-select
                    filled
                    v-model="store.openingDays"
                    :options="daysOfWeek"
                    label="Opening Days"
                    dense
                    multiple
                    use-chips
                    emit-value
                    map-options
                    class="q-mb-sm"
                    >
                    <template v-slot:option="scope">
                      <q-item>
                        <q-item-section>
                          <q-checkbox
                            v-model="store.openingDays"
                            :label="scope.opt.label"
                            :val="scope.opt.value"
                            dense
                          />
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
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

          <div class="q-mt-lg handle-form-button">
            <q-btn label="Next" color="primary" type="submit" />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from 'src/components/common/AppHeader.vue';

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

const daysOfWeek = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' }
]

const showStartTimePicker = ref(false)
const showEndTimePicker = ref(false)
const showLunchStartTimePicker = ref(false)
const showLunchEndTimePicker = ref(false)

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

const goToStaffDetails = () => {
  router.push({
    path: 'StaffDetails',
    query: {
      storeData: JSON.stringify(store.value)
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
.handle-form-button {
  display: flex;
  justify-content: flex-end;
}
</style>
