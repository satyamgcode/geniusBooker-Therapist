<template>
  <q-layout>
    <home-header />
    <q-page-container>
      <q-page padding class="flex flex-center bg-grey-3">
        <q-card class="q-ma-md q-pa-sm custom-card" style="width: 400px;">
          <q-tabs v-model="selectedTab" class="text-teal" align="center" dense>
            <q-tab name="signin" label="Sign In" />
            <q-tab name="signup" label="Sign Up" />
          </q-tabs>

          <q-tab-panels v-model="selectedTab" animated>
            <q-tab-panel name="signin">
              <q-card-section>
                <q-form @submit.prevent="submitForm">
                  <q-input
                    filled
                    v-model="phone"
                    label="Phone Number"
                    dense
                    class="q-my-sm"
                    :rules="phoneRules"
                    hide-bottom-space
                  />
                  <q-input
                    filled
                    v-model="password"
                    label="Password"
                    dense
                    type="password"
                    class="q-my-sm"
                    hide-bottom-space
                  />
                  
                  <vue-turnstile site-key="0x4AAAAAAAkrXWePswYQwmuw" v-model="token" />
                  
                  <q-btn
                    type="submit"
                    label="Sign In"
                    color="secondary"
                    class="q-my-md full-width"
                  />
                  <q-btn class="text-primary" no-caps flat label="Forgot Password?" @click="goToForgotPassword" />
                </q-form>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel name="signup">
              <q-card-section>
                <q-form @submit.prevent="submitForm">
                  <q-input
                    filled
                    v-model="first_name"
                    label="First Name"
                    dense
                    class="q-my-sm"
                    :rules="[val => !!val || 'First name is required']"
                    hide-bottom-space
                  />
                  <q-input
                    filled
                    v-model="last_name"
                    label="Last Name"
                    dense
                    class="q-my-sm"
                    hide-bottom-space
                  />
                  <q-input
                    filled
                    v-model="email"
                    label="Email"
                    dense
                    type="email"
                    class="q-my-sm"
                    :rules="[val => !!val || 'Valid email is required']"
                    hide-bottom-space
                  />
                  <div class="phone-section">
                    <q-input
                    filled
                    v-model="phone"
                    label="Phone Number"
                    dense
                    class="q-my-sm width-full"
                    :rules="phoneRules"
                    hide-bottom-space
                  />
                  <q-btn
                    label="Send"
                    color="primary"
                    class="q-my-sm"
                    @click="sendOtp"
                    :disable="otpSent"
                    no-caps
                  />
                  </div>
                  <q-input
                    v-if="otpSent"
                    filled
                    v-model="otp"
                    label="Enter OTP"
                    dense
                    class="q-my-sm"
                    :rules="[val => !!val || 'OTP is required']"
                    hide-bottom-space
                  />
                  <q-input
                    filled
                    v-model="password"
                    label="Password"
                    dense
                    type="password"
                    class="q-my-sm"
                    :rules="passwordRules"
                    hide-bottom-space
                  />
                  <q-input
                    filled
                    v-model="confirm_password"
                    label="Confirm Password"
                    dense
                    type="password"
                    class="q-my-sm"
                    :rules="[val => val === password || 'Passwords must match']"
                    hide-bottom-space
                  />

                  <vue-turnstile site-key="0x4AAAAAAAkrXWePswYQwmuw" v-model="token" />
                  
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
import { useOwnerStore } from 'src/stores/ownerStoresStore';
import { ref } from 'vue';
import HomeHeader from '../components/common/HomeHeader.vue';
import VueTurnstile from 'vue-turnstile';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();
const ownerStore = useOwnerStore();

const selectedTab = ref('signup');
const first_name = ref('');
const last_name = ref('');
const email = ref(null);
const password = ref('');
const confirm_password = ref('');
const phone = ref('');
const otp = ref('');  // For OTP input
const otpSent = ref(false);  // Flag to show OTP input after sending OTP

const token = ref('');

const passwordRules = [
  val => !!val || 'Password is required',
  val => val.length >= 8 || 'Password must be at least 8 characters',
  val => /[A-Z]/.test(val) || 'Password must contain an uppercase letter',
  val => /[a-z]/.test(val) || 'Password must contain a lowercase letter',
  val => /[0-9]/.test(val) || 'Password must contain a number',
  val => /[!@#$%^&*]/.test(val) || 'Password must contain a special character',
];

const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
];

const handleSignup = async () => {
  try {
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/complete-registration/`, {
      username: first_name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      password2: confirm_password.value,
      otp: otp.value,  // Pass OTP
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    selectedTab.value = 'signin';
  } catch (error) {
    console.error('Error during signup:', error);
  } finally {
    selectedTab.value = 'signin';
  }
};

const sendOtp = async () => {
  try {
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/register/`, {
      phone: phone.value,
      recaptcha: token.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    otpSent.value = true;
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
    otpSent.value = true;
  }
};

const handleLogin = async () => {
  try {
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/login/owner/`, {
      phone: phone.value,
      password: password.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    authStore.setToken(response.data.access);
    const { owner, stores } = response.data;
    ownerStore.setOwner(owner);
    ownerStore.setStores(stores);
    if (stores[0]?.store_id) {
      console.log(`/store/${stores[0].store_id}`);
      router.push(`/store/${stores[0].store_id}`);
    } else {
      router.push('/createStore');
    }
  } catch (error) {
    console.error('Error during login:', error);
    router.push('/createStore');
  }
};

const submitForm = async () => {
  if (selectedTab.value === 'signup') {
    await handleSignup();
  } else if (selectedTab.value === 'signin') {
    await handleLogin();
  }
};

const goToForgotPassword = () => {
  router.push('/forgotPassword');
};
</script>

<style scoped>
.custom-card {
  border-radius: 20px;
  padding-top: 12px;
}
.phone-section{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:8px; 
}
</style>
