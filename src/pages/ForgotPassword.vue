<template>
    <q-layout view="lHh Lpr lFf">
      <home-header />
      <q-page-container>
        <q-page padding class="flex flex-center bg-grey-3">
          <q-card class="q-ma-md q-pa-sm custom-card" style="width: 400px;">
            <q-card-section>
              <div class="text-h5 text-center text-teal q-mb-md">
                Forgot Password
              </div>
              <q-form @submit.prevent="submitForm">
                <!-- <q-input
                  outlined
                  v-model="email"
                  label="Enter your email address"
                  dense
                  type="email"
                  class="q-my-md"
                  :rules="[validateEmailOrPhone]"
                  hint="We will send you a password reset link"
                  hide-bottom-space
                /> -->
                <!-- <div class="text-center text-bold q-my-md">OR</div> -->
                <q-input
                  outlined
                  v-model="phoneNumber"
                  label="Enter your phone number"
                  dense
                  type="tel"
                  class="q-my-md"
                  :rules="phoneRules"
                  hint="We will send you a password reset link via SMS"
                  hide-bottom-space
                />
                <q-btn
                  type="submit"
                  label="Send Reset Link"
                  color="primary"
                  class="q-my-md full-width"
                  :loading="loading"
                  :disable="loading"
                  no-caps
                />
              </q-form>
  
              <q-card-actions align="start">
                <q-btn class="p-sm" no-caps flat label="Back to Sign In" @click="goToSignIn" color="secondary" />
              </q-card-actions>
            </q-card-section>
  
            <q-dialog v-model="successDialog">
              <q-card>
                <q-card-section class="row items-center q-pa-md">
                  <q-icon name="check_circle" color="green" size="36px" />
                  <div class="text-subtitle1 q-ml-sm">
                    Password reset link sent successfully!
                  </div>
                </q-card-section>
  
                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" @click="handleResetRoute" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import HomeHeader from '../components/common/HomeHeader.vue';
  import axios from 'axios';
  
  const email = ref('');
  const phoneNumber = ref('');
  const loading = ref(false);
  const successDialog = ref(false);
  const router = useRouter();

  const handleResetRoute = () =>{
    successDialog.value = false;
  }

  const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
];
  
  // Validation function that checks if either email or phone number is provided
  const validateEmailOrPhone = () => {
    if (!email.value && !phoneNumber.value) {
      return 'Please enter either an email address or a phone number';
    }
    return true;
  };
  
  const submitForm = async () => {
  if (!email.value && !phoneNumber.value) return;

  loading.value = true;

  try {
    const payload = email.value
      ? { email: email.value }
      : { phone: phoneNumber.value }; // Backend expects 'phone_number'

    // Call the actual password reset API
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/password-reset/request/`, payload);

    // Simulate success response
    successDialog.value = true;
    console.log('Password reset link sent successfully:', response.data);
    email.value = ''; // Reset email input
    phoneNumber.value = ''; // Reset phone number input
  } catch (error) {
    console.error('Error sending reset link:', error);
    successDialog.value = true;
  } finally {
    loading.value = false;
  }
};

  
  const goToSignIn = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .custom-card {
    border-radius: 20px;
    padding-top: 12px;
  }
  </style>
  