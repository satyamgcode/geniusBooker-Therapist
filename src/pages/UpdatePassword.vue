<template>
    <q-layout view="lHh Lpr lFf">
      <app-header />
      <q-page-container>
        <q-page padding class="flex flex-center bg-grey-2">
          <q-card class="q-ma-md q-pa-none custom-card" flat style="max-width: 500px; width: 100%;">
            <div class="q-pa-md bg-white" style="border-radius: 16px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div class="text-h5 text-bold text-primary q-mb-md text-center">
                Update Password
              </div>
              <div class="text-body2 text-secondary text-center q-mb-lg">
                Enter your new password and confirm it below to update your password.
              </div>
  
              <!-- Form Section -->
              <q-form @submit.prevent="submitForm">
                <q-input
                  outlined
                  v-model="newPassword"
                  label="New Password"
                  type="password"
                  dense
                  class="q-my-md"
                  :rules="passwordRules"
                  hint="Your new password should be at least 8 characters long"
                  hide-bottom-space
                />
                <q-input
                  outlined
                  v-model="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  dense
                  class="q-my-md"
                  :rules="[confirmPasswordMatch]"
                  hint="Re-enter your new password"
                  hide-bottom-space
                />
                
                <!-- Button Row -->
                <div class="row  items-center justify-between q-mt-lg q-mb-md">
                  <q-btn flat no-caps label="Back to Sign In" color="secondary" @click="goToSignIn" />
                  <q-btn
                    type="submit"
                    label="Update Password"
                    color="primary"
                    class="rounded-btn"
                    :loading="loading"
                    :disable="loading"
                    no-caps
                  />
                </div>
              </q-form>
            </div>
          </q-card>
        </q-page>
      </q-page-container>
  
      <!-- Success Dialog -->
      <q-dialog v-model="successDialog">
        <q-card>
          <q-card-section class="row items-center q-pa-md">
            <q-icon name="check_circle" color="green" size="36px" />
            <div class="text-subtitle1 q-ml-sm">Password updated successfully!</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" @click="successDialog = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter , useRoute } from 'vue-router';
  import AppHeader from 'src/components/common/AppHeader.vue';
  import axios from 'axios';
  
  const newPassword = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  const successDialog = ref(false);
  const router = useRouter();
  const route = useRoute();
  
  // Password validation rules
  const passwordRules = [
    val => !!val || 'Password is required',
    val => val.length >= 8 || 'Password must be at least 8 characters long',
  ];
  
  // Confirm password validation rule
  const confirmPasswordMatch = () => {
    return newPassword.value === confirmPassword.value || 'Passwords do not match';
  };
  
  const submitForm = async () => {
    if (!newPassword.value || !confirmPassword.value || newPassword.value !== confirmPassword.value) return;
  
    loading.value = true;
    const queryParam = Object.keys(route.query)[0]; // Get the query string after '?'
  console.log(queryParam); 
  
    try {
      const payload = {
         new_password: newPassword.value ,
        confirm_password: confirmPassword.value,

        };
  
      // Call the actual password update API
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/password-reset/confirm/${queryParam}`, payload);
  
      // Simulate success response
      successDialog.value = true;
      console.log('Password updated successfully:', response.data);
      newPassword.value = ''; // Reset password input
      confirmPassword.value = ''; // Reset confirm password input
      router.push('/owner-login');
    } catch (error) {
      console.error('Error updating password:', error);
      router.push('/owner-login');
    } finally {
      loading.value = false;
    }
  };
  
  const goToSignIn = () => {
    router.push('/owner/signup');
  };
  </script>
  
  <style scoped>
  .custom-card {
    border-radius: 16px;
  }
  
  .text-primary {
    color: #1e88e5;
  }
  
  .text-secondary {
    color: #757575;
  }
  
  .q-input {
    border-radius: 8px;
  }
  
  .q-btn.rounded-btn {
    border-radius: 50px;
  }
  
  .q-btn.full-width {
    width: 100%;
  }
  
  .bg-grey-2 {
    background-color: #f5f5f5;
  }
  
  .text-h5 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .text-body1 {
    font-size: 1.125rem;
    font-weight: normal;
  }
  
  .q-my-md {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  
  .q-mb-md {
    margin-bottom: 16px;
  }
  
  .q-mt-lg {
    margin-top: 24px;
  }
  
  @media (max-width: 600px) {
    .text-h5 {
      font-size: 1.25rem;
    }
  
    .text-body1 {
      font-size: 1rem;
    }
  
    .custom-card {
      padding: 16px;
      max-width: 90%;
    }
  
    .q-mt-lg {
      margin-top: 16px;
    }
  }
  </style>
  