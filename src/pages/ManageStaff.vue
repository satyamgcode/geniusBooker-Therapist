<template>
    <q-layout>
      <app-header />
      <q-page-container>
        <div class="gb-addremove-staff">
            <!-- Staff Members Section -->
        <q-card-section>
          <div class="handle-back">
            <q-btn
              flat
              dense
              class="handle-left-arrow"
              icon="arrow_back"
              @click="goBack"
            />
            <div class="text-h6 text-weight-bold q-mb-md">Staff Members</div>
          </div>
          <div class="row q-col-gutter-sm">
            <div
              v-for="(staff, index) in staff"
              :key="staff.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <q-card class="staff-card q-pa-sm">
                <q-card-section class="text-center">
                  <q-avatar size="80px">
                    <img :src="staff.image ? staff.image : 'https://via.placeholder.com/80'" alt="Staff Photo" />
                  </q-avatar>
                  <div class="text-subtitle1 text-weight-bold q-mt-sm">
                    {{ staff.username }}
                  </div>
                  <div class="text-caption text-grey-7 q-mt-xs">{{ staff.role }}</div>
                  <div class="text-body2 q-mt-xs">{{ staff.experience }}</div>
                  <q-toggle
                    :model-value="staff.active"
                    checked-icon="check"
                    unchecked-icon="clear"
                    color="green"
                    :label="staff.active ? 'Active' : 'Inactive'"
                    @update:model-value="showConfirmDialog(staff, index)"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <AddRemoveStaff class="add-remove-staff" @update-staff="updateStaff" />
        </div>
        
        
      </q-page-container>
       <!-- Confirmation Dialog -->
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            Are you sure you want to
            {{ selectedStaff.active ? 'deactivate' : 'activate' }}
            {{ selectedStaff.username }}?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Confirm"
            color="primary"
            v-close-popup
            @click="confirmStatusChange"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-layout>
  </template>
  

  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AddRemoveStaff from 'src/components/common/AddRemoveStaff.vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  const confirm = ref(false);
  const selectedStaff = ref({});
  
  const router = useRouter();
  const staff = ref([
    {
      id: 1,
      username: 'John Doe',
      role: 'Manager',
      experience: '10 years',
      image: 'https://cdn.quasar.dev/img/avatar2.jpg',
      active: true 
    },
    {
      id: 2,
      username: 'Jane Smith',
      role: 'Assistant Manager',
      experience: '5 years',
      image: 'https://cdn.quasar.dev/img/avatar3.jpg',
      active: false 
    },
    {
      id: 3,
      username: 'Mike Johnson',
      role: 'Therapist',
      experience: '2 years',
      image: 'https://cdn.quasar.dev/img/avatar4.jpg',
      active: true 
    },
    {
      id: 4,
      username: 'Sarah Williams',
      role: 'Therapist',
      experience: '3 years',
      image: 'https://cdn.quasar.dev/img/avatar5.jpg',
      active: false 
    },
    {
      id: 5,
      username: 'David Brown',
      role: 'Therapist',
      experience: '4 years',
      image: 'https://cdn.quasar.dev/img/avatar6.jpg',
      active: true 
    },
    {
      id: 6,
      username: 'Emily Davis',
      role: 'Therapist',
      experience: '6 years',
      image: 'https://cdn.quasar.dev/img/avatar1.jpg',
      active: true 
    }
  ]);

  const goBack = () => {
    router.back();
  };

  const updateStaff = (newStaff) => {
    console.log('Old Staff:', staff.value);
  staff.value = [...staff.value, ...newStaff]; 
  console.log('Updated Staff:', staff.value);
};
   const showConfirmDialog = (staffMember, index) => {
    selectedStaff.value = staffMember;
    confirm.value = true;
  };
  
  const confirmStatusChange = () => {
    if (selectedStaff.value) {
      selectedStaff.value.active = !selectedStaff.value.active;
    }
  };
  </script>
  

<style scoped>
    .handle-back{
  cursor: pointer;
  display: flex;
}
.handle-left-arrow{
  cursor: pointer;
  margin-bottom:16px;
  margin-right: 5px;
}
.gb-addremove-staff{
    display: flex;
}
@media (max-width: 800px) {
  .gb-addremove-staff{
    flex-direction: column;
  }
}
@media (min-width: 800px) {
    .add-remove-staff{
        margin-top: 50px;
    }
    .gb-addremove-staff{
        max-width: 1200px;
        margin: 0 auto;
    }
}
</style>