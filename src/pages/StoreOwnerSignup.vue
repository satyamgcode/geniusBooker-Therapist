<template>
    <q-layout>
      <home-header />
      <q-page-container>
        <q-page padding class="flex flex-center bg-grey-3">
          <q-card class="q-ma-md q-pa-sm custom-card" style="width: 400px;">
            <q-tabs
              v-model="selectedTab"
              class="text-teal"
              align="center"
              dense
            >
              <q-tab name="signin" label="Sign In" />
              <q-tab name="signup" label="Sign Up" />
            </q-tabs>
  
            <q-tab-panels v-model="selectedTab" animated>
              <q-tab-panel name="signin">
                <q-card-section>
                  <q-form @submit.prevent="submitForm">
                    <q-input
                    filled
                    v-model="storeName"
                    label="Store Name"
                    dense
                    class="q-my-sm"
                    :rules="[val => !!val || 'Store Name is required']"
                    />
                    <q-input
                      filled
                      v-model="email"
                      label="Email"
                      dense
                      type="email"
                      class="q-my-sm"
                      :rules="[val => !!val || 'Valid email is required']"
                    />
                    <q-input
                      filled
                      v-model="password"
                      label="Password"
                      dense
                      type="password"
                      class="q-my-sm"
                      :rules="[val => !!val || 'Password is required']"
                    />
                    <q-btn
                      type="submit"
                      label="Sign In"
                      color="secondary"
                      class="q-my-md full-width"
                    />
                  </q-form>
                </q-card-section>
              </q-tab-panel>
  
              <q-tab-panel name="signup">
                <q-card-section>
                  <q-form @submit.prevent="submitForm">
                    <q-input
                    filled
                    v-model="storeName"
                    label="Store Name"
                    dense
                    class="q-my-sm"
                    :rules="[val => !!val || 'Store Name is required']"
                    />
                    <q-input
                      filled
                      v-model="name"
                      label="Name"
                      dense
                      class="q-my-sm"
                      :rules="[val => !!val || 'Name is required']"
                    />
                    <q-input
                      filled
                      v-model="email"
                      label="Email"
                      dense
                      type="email"
                      class="q-my-sm"
                      :rules="[val => !!val || 'Valid email is required']"
                    />
                    <q-input
                      filled
                      v-model="password"
                      label="Password"
                      dense
                      type="password"
                      class="q-my-sm"
                      :rules="[val => !!val || 'Password is required']"
                    />
                    <q-btn
                      type="submit"
                      label="Sign Up"
                      color="secondary"
                      class="q-my-md full-width"
                    />
                  </q-form>
                </q-card-section>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { useAuthStore } from 'src/stores/AuthStore';
  import { ref } from 'vue';
  import HomeHeader from '../components/common/HomeHeader.vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios';
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const selectedTab = ref('signup');
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const storeName = ref('');

  const handleSignup = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', {
      username: name.value,
      email: email.value,
      password: password.value,
      store_name: storeName.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    selectedTab.value = 'signin';
  } catch (error) {
    console.error('Error during signup:', error);
  } finally{
    selectedTab.value = 'signin';
  }
}

const handleLogin = async () => {
  try{
    const response = await axios.post('http://127.0.0.1:8000/api/login/', {
      email: email.value,
      password: password.value
    },
    {
      headers: {
      'Content-Type': 'application/json'
    }
    });
    console.log(response.data);
    authStore.setToken(response.data.token);
    router.push('/createStore');
  } catch (error) {
    console.error('Error during login:', error);
  } finally{
    router.push('/createStore');
  }
}
  
  const submitForm = async () => {
    if(selectedTab.value === 'signup') {
      await handleSignup();
    } else if(selectedTab.value === 'signin') {
      await handleLogin();
    }
    
    
  };
  </script>

  <style scoped>
      .custom-card {
        border-radius: 20px;
        padding-top: 12px;
      }
  </style>
  