<template>
    <q-layout>
      <home-header />
      <q-page-container>
        <q-page padding class="flex flex-center bg-grey-3">
          <q-card class="q-pa-lg q-ma-lg" style="width: 400px;">
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
  import { ref } from 'vue';
  import HomeHeader from '../components/common/HomeHeader.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  
  const selectedTab = ref('signin');
  const name = ref('');
  const email = ref('');
  const password = ref('');

  const handleSignup = () => {
    const response = axios.post('http://192.168.29.115:8000/api/register', {
      Headers: {
        'Content-Type': 'application/json'
      }
      
    })
    console.log(response)
  }
  
  const submitForm = () => {
    // if(selectedTab.value === 'signup'){
    //   selectedTab.value = 'signin'
    // }else if(selectedTab.value === 'signin'){
    //   router.push('/CustomerDetail')
    // }
    handleSignup()

  }
  </script>
  