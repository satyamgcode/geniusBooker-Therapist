<template>
  <q-header elevated class="header" v-if="isShowHeader">
    <q-toolbar class="toolbar">
      <div class="toolbar-left">
        <q-btn flat dense icon="menu" aria-label="Menu" />
        <q-toolbar-title cursor-pointer class="title" @click="navigateToHome">
          Genius Booker
        </q-toolbar-title>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useOwnerStore } from 'src/stores/ownerStoresStore';
import { useTherapistStore } from 'src/stores/useStaffStore';
import { useManagerStore } from 'src/stores/useManagerStore';
import { useAuthStore } from 'src/stores/AuthStore';

const ownerStore = useOwnerStore();
const StaffDetails = useTherapistStore();
const ManagerDetails = useManagerStore();

const authStore = useAuthStore();

const props = defineProps({
  isShowHeader: {
    type: Boolean,
    default: true
  }
});

const isShowHeader = ref(props.isShowHeader);

const router = useRouter();

const navigateToHome = () => {
  console.log('navigateToHome');
  ownerStore.clearOwner();
  StaffDetails.clearTherapist();
  ManagerDetails.clearManager();
  authStore.clearToken();
  router.push('/');
};
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; 
}

.toolbar {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  width: 100%;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-left: 8px;
  color: #3b82f6;
  cursor: pointer;
}

.toolbar-right {
  display: flex;
  gap: 12px;
}

body {
  padding-top: 60px;
}
</style>