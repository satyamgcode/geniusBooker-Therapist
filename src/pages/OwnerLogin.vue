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
                :rules="[val => !!val || 'Password is required']"
              />
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

const ownerStore = useOwnerStore();

const authStore = useAuthStore();

const router = useRouter();

const phone = ref('');
const password = ref('');
const phoneRules = [
  val => !!val || 'Phone number is required',
  val => /^\+\d{1,3}\d{10}$/.test(val) || 'Phone number must include country code and be valid',
];

const handleOwnerLogin = async () => {
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

const submitForm = () => {
  console.log('submitted', phone.value, password.value);
  handleOwnerLogin();
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
