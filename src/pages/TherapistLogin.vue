<template>
    <q-layout view="lHh Lpr lFf">
      <AppHeader />
      <q-page-container>
        <q-page class="flex flex-center bg-grey-2">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center">
              <div class="text-h5 text-weight-bold text-primary">Sign in</div>
              <div class="text-primary">Sign in below to access your account</div>
            </q-card-section>
            <q-card-section>
              <q-form @submit="submitForm">
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
                <q-btn
                  style="border-radius: 8px;"
                  color="primary"
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
          <Loader :isVisible="isLoading" color="positive" />
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from 'src/stores/AuthStore';
  import axios from 'axios';
  import { useTherapistStore } from 'src/stores/useStaffStore';
  import Loader from 'src/components/common/Loader.vue';

  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const authStore = useAuthStore();

  const staffStore  = useTherapistStore();

  const isLoading = ref(false);

  const router = useRouter();

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

  const phone = ref('');
  const password = ref('');

  const handleLogin = async () => {
  try{
    console.log("inside try login")
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/login/therapist/`, {
      phone: phone.value,
      password: password.value
    },
    {
      headers: {
      'Content-Type': 'application/json',
    }
    });
    console.log(response.data);
    authStore.setToken(response.data.access);
    const {therapist , stores } = response.data;
    staffStore.setTherapist(therapist);
    console.log("therapist",therapist , stores)
    staffStore.setTherapistStores(stores);
    if(stores.length > 0){
      toast.success('Login successful');
      router.push('/therapist-dashboard');
    }else {
      toast.info('No therapist Account found');
    }
   
    // router.push('/therapist-dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    toast.error('Invalid credentials');
  }
}
  
  const submitForm = async () => {
    isLoading.value = true;
    console.log('submitted', phone.value, password.value);
    await handleLogin();
    isLoading.value = false;

  };
  </script>
  
  <style scoped>
  .my_card {
    width: 25rem;
    border-radius: 8px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    margin: 10px;
  }
  </style>
  