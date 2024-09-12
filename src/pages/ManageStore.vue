<template>
  <q-layout>
    <app-header />
    <q-page-container>
      <q-page class="q-pa-md">
        <q-form>
          <!-- Store Information -->
          <q-card class="q-mb-md shadow-4 rounded-borders">
            <q-card-section class="bg-positive text-white flex justify-between items-center">
              <div class="handle-back">
                <q-btn
                flat
                dense
                color="white"
                icon="arrow_back"
                @click="goBack"
              />
              <div class="text-h6">Store Information</div>
              </div>
              <q-btn
                outlined
                flat
                color="white"
                class="handle-edit-save"
                icon="edit"
                label="Edit"
                v-if="!isEditing"
                @click="toggleEdit"
              />
              <q-btn
                outlined
                flat
                color="white"
                class="handle-edit-save"
                icon="save"
                label="Save"
                v-if="isEditing"
                @click="saveStoreInformation"
              />
            </q-card-section>
            <q-card-section class="bg-grey-1">
              <div v-if="isEditing">
                <q-input
                  dense
                  v-model="store.name"
                  label="Store Name"
                  outlined
                  disable
                  class="q-mb-sm"
                />
                <q-input
                  dense
                  v-model="store.address"
                  label="Store Address"
                  outlined
                  class="q-mb-sm"
                />
                <q-input
                  dense
                  v-model="store.phone"
                  label="Phone Number"
                  disable
                  mask="(###) ###-####"
                  outlined
                  class="q-mb-sm"
                />
                <q-input
                  dense
                  v-model="store.email"
                  label="Email"
                  type="email"
                  disable
                  outlined
                  class="q-mb-sm"
                />
              </div>
              <div v-else>
                <p><strong>Store Name:</strong> {{ store.name || "store-Name" }}</p>
                <p><strong>Address:</strong> {{ store.address }}</p>
                <p><strong>Phone Number:</strong> {{ store.phone || '882-858-2258' }}</p>
                <p><strong>Email:</strong> {{ store.email || 'storeOwner@example.com' }}</p>
              </div>

              <!-- Store Schedule -->
              <q-card class="q-my-md bg-white shadow-2">
                <q-card-section>
                  <div class="text-subtitle1">Store Schedule</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-select
                    outlined
                    v-model="store.openingDays"
                    :options="daysOfWeek"
                    label="Opening Days"
                    dense
                    multiple
                    use-chips
                    emit-value
                    :disable="!isEditing"
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
                    dense
                    v-model="store.startTime"
                    label="Start Time"
                    outlined
                    readonly
                    class="q-mb-sm"
                    :disable="!isEditing"
                    @click="handleStoreTimeChangeStart"
                  />
                  <q-input
                    dense
                    v-model="store.endTime"
                    label="End Time"
                    outlined
                    readonly
                    :disable="!isEditing"
                    @click="handleStoreTimeChangeEnd"
                  />
                </q-card-section>
              </q-card>

              <!-- Lunch Break -->
              <q-card class="q-my-md bg-white shadow-2">
                <q-card-section>
                  <div class="text-subtitle1">Lunch Break</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-input
                    dense
                    v-model="store.lunchStartTime"
                    label="Lunch Start Time"
                    outlined
                    readonly
                    :disable="!isEditing"
                    class="q-mb-sm"
                    @click="handleLunchStartTimePicker"
                  />
                  <q-input
                    dense
                    v-model="store.lunchEndTime"
                    label="Lunch End Time"
                    outlined
                    readonly
                    :disable="!isEditing"
                    @click="handleLunchEndTimePicker"
                  />
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>

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
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from 'src/components/common/AppHeader.vue';

const router = useRouter();

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
});

const daysOfWeek = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' }
];

const showStartTimePicker = ref(false);
const showEndTimePicker = ref(false);
const showLunchStartTimePicker = ref(false);
const showLunchEndTimePicker = ref(false);

const isEditing = ref(false);

const handleStoreTimeChangeStart = () => {
  showStartTimePicker.value = true;
};

const handleStoreTimeChangeEnd = () => {
  showEndTimePicker.value = true;
};

const handleLunchStartTimePicker = () => {
  showLunchStartTimePicker.value = true;
};

const handleLunchEndTimePicker = () => {
  showLunchEndTimePicker.value = true;
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const goBack = () => {
  router.back();
};


const saveStoreInformation = () => {
  // Logic to save store information
  isEditing.value = false;
  // Optionally, you can implement API call or save logic here
};
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}
.bg-primary {
  background-color: #1e88e5 !important;
}
.bg-grey-1 {
  background-color: #f0f0f0;
}
.shadow-4 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.rounded-borders {
  border-radius: 8px;
  max-width: 1100px;
  margin: 0 auto;
}
.text-white {
  color: white;
}
.handle-back{
  cursor: pointer;
  display: flex;
}
@media (max-width: 600px) {
  .handle-edit-save{
  flex-basis: min-content;
}
}
</style>
