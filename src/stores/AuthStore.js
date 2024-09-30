import { defineStore } from 'pinia';
import { ref } from 'vue';

export  const useAuthStore = defineStore('authStore', () => {
    const authToken = ref('');

    function setToken(newToken) {
        authToken.value = newToken;
        localStorage.setItem('authToken', newToken);
        console.log(authToken.value)
    }

    function clearToken() {
        authToken.value = null;
        localStorage.removeItem('authToken');
    }

    return {
        authToken,
        setToken,
        clearToken
    };
});
