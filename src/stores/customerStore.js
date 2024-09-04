import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCustomerStore = defineStore('customerStore', () => {
  const formData = ref({
    fullName: '',
    phoneNumber: '',
    sessionDuration: null,
  });

  const setCustomerData = (data) => {
    formData.value = data;
    console.log('formdata',formData.value);
  };

  return {
    formData,
    setCustomerData,
  };
});
