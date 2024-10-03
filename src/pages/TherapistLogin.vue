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
                  :rules="[val => !!val || 'Password is required']"
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

  const authStore = useAuthStore();

  const staffStore  = useTherapistStore();


  const router = useRouter();

  const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
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
      router.push('/therapist-dashboard');
    }
    // router.push('/therapist-dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    router.push('/therapist-dashboard');
  }
}
  
  const submitForm = () => {
    console.log('submitted', phone.value, password.value);
    handleLogin();

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
  