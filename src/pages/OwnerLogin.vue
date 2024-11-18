<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader />
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-h5 text-weight-bold text-positive">Store Owner Login</div>
            <div class="text-positive">Sign in to access your store insights</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="submitForm">
              <q-input
                outlined
                v-model="phone"
                label="Phone Number"
                dense
                :rules="phoneRules"
              />
              <q-input
                dense
                outlined
                v-model="password"
                type="password"
                label="Password"
                :rules="passwordRules"
                hide-bottom-space
              />
              <p @click="goToForgotPassword" class="q-mt-md cursor-pointer text-positive">Forgot Password</p>
              <q-btn
                style="border-radius: 8px;"
                color="positive"
                rounded
                size="md"
                label="Sign in"
                type="submit"
                no-caps
                class="full-width"
              />
            </q-form>
          </q-card-section>
        </q-card>
        <div v-if="isLoading" class="loader-overlay">
  <q-spinner color="primary" size="50px" />
</div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from 'src/components/common/AppHeader.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from 'src/stores/AuthStore';
import { useOwnerStore } from 'src/stores/ownerStoresStore';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const isLoading = ref(false);

const ownerStore = useOwnerStore();

const authStore = useAuthStore();

const router = useRouter();

const phone = ref('');
const password = ref('');
const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
];
const passwordRules = [
  val => !!val || 'Password is required',
  val => val.length >= 8 || 'Password must be at least 8 characters',
  val => /[A-Z]/.test(val) || 'Password must contain an uppercase letter',
  val => /[a-z]/.test(val) || 'Password must contain a lowercase letter',
  val => /[0-9]/.test(val) || 'Password must contain a number',
  val => /[!@#$%^&*]/.test(val) || 'Password must contain a special character',
];
const goToForgotPassword = () => {
  router.push('/forgotPassword');
};

const handleOwnerLogin = async () => {
  // isLoading.value = true;
  try {
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/login/owner/`, {
      phone: phone.value,
      password: password.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // localStorage.setItem('phoneNumber', phone.value);
    console.log(response.data);
    authStore.setToken(response.data.access);
    const { owner, stores } = response.data;
    ownerStore.setOwner(owner);
    ownerStore.setStores(stores);
    if (stores[0]?.store_id) {
      console.log(`/store/${stores[0].store_id}`);
      router.push(`/store/${stores[0].store_id}`);
      toast.success('Login successful');
    } else {
      router.push('/createStore');
      toast.info('Please create a store');
    }
  } catch (error) {
    console.error('Error during login:', error);
    toast.error('Invalid credentials');
  }finally {
    localStorage.setItem('phoneNumber', phone.value);
  }
};

// const submitForm = () => {
//   console.log('submitted', phone.value, password.value);
//   handleOwnerLogin();
// };
const submitForm = async () => {
  isLoading.value = true;
  try {
      await handleOwnerLogin();
    } finally {
      isLoading.value = false;
    }
  }

</script>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin: 10px;
}
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; 
  backdrop-filter: blur(5px);
}
</style>
