import { defineStore } from 'pinia';
import { ref } from 'vue';

export  const useAuthStore = defineStore('authStore', () => {
    const authToken = ref('');

    function setToken(newToken) {
        authToken.value = newToken;
        console.log(authToken.value)
    }

    function clearToken() {
        authToken.value = null;
    }

    return {
        authToken,
        setToken,
        clearToken
    };
});
