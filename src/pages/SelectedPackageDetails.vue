<template>
<q-layout>
  <app-header />
  <q-page-container>
    <q-page padding class="flex flex-center">
    <q-card class="q-pa-md q-mt-md mx-auto shadow-2">
      <q-card-section>
        <div class="text-h6">Payment Page</div>
        <p class="text-subtitle2 text-grey-7">Complete your payment below</p>
      </q-card-section>

      <!-- Package Details Section -->
      <q-card-section class="q-mb-md">
        <div class="text-h6 text-primary">Package Details</div>
        <p class="text-body1"><strong>Amount:</strong> ${{ amount }}</p>
        <p class="text-body2">Please review your payment details carefully.</p>
      </q-card-section>

      <!-- Payment Method Selection -->
      <q-card-section class="q-mb-md">
        <div class="text-h6 text-primary">Select Payment Method</div>
        <q-btn-group flat>
          <q-btn
            v-for="method in paymentMethods"
            :key="method"
            :label="method"
            :color="selectedPaymentMethod === method ? 'primary' : 'grey-5'"
            @click="selectPaymentMethod(method)"
            class="q-my-sm"
          />
        </q-btn-group>
      </q-card-section>

      <!-- User Information Form -->
      <q-card-section>
        <div class="text-h6 text-primary q-mb-md">Enter Your Information</div>
        <q-form @submit.prevent="processPayment">
          <q-input
            v-for="field in formFields"
            :key="field.name"
            v-model="user[field.name]"
            :label="field.label"
            :type="field.type"
            :maxlength="field.maxlength || null"
            :placeholder="field.placeholder"
            dense
            filled
            class="q-my-sm"
            :rules="[val => !!val || `${field.label} is required`]"/>
          
          <q-btn
            type="submit"
            label="Submit Payment"
            color="primary"
            class="full-width q-my-md"
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
import { Notify } from 'quasar';
import AppHeader from 'src/components/common/AppHeader.vue';

const amount = ref(localStorage.getItem('paymentAmount') || 0);
console.log(amount.value);

const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer'];
const selectedPaymentMethod = ref(paymentMethods[0]);

const formFields = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'john.doe@example.com' },
  { name: 'address', label: 'Address', type: 'text', placeholder: '1234 Main St' },
  { name: 'cardNumber', label: 'Card Number', type: 'text', maxlength: 16, placeholder: '1234 5678 9123 4567' },
  { name: 'expiryDate', label: 'Expiration Date', type: 'month' },
  { name: 'cvv', label: 'CVV', type: 'text', maxlength: 3, placeholder: '123' },
];

const user = ref({
  name: '',
  email: '',
  address: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
});

const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
};

const processPayment = () => {
  console.log('Processing payment with the following details:', {
    amount: amount.value,
    paymentMethod: selectedPaymentMethod.value,
    user: user.value,
  });

  Notify.create({
    message: 'Payment submitted successfully!',
    color: 'green',
    position: 'top',
  });
};
</script>

<style scoped>
.max-width-500 {
  max-width: 500px;
}
</style>
