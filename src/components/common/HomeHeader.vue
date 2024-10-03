<template>
   <q-header elevated class="header">
      <q-toolbar class="toolbar">
        <div class="toolbar-left">
          <q-btn flat dense icon="menu" aria-label="Menu" />
          <q-toolbar-title cursor-pointer class="title" @click="navigateToHome" >GB</q-toolbar-title>
        </div>
        <div class="toolbar-right">
            <q-btn
              label="Own a Store"
              flat
              class="store-login-button"
              @click="navigateToStoreLogin"
            />
        </div>
      </q-toolbar>
    </q-header>
</template>

<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToStoreLogin = () => {
  router.push('/owner/signup')
}

const navigateToHome = () => {
    console.log('navigateToHome')
    localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.toolbar {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  width: 100%;
}

.toolbar-left {
  display: flex;
  align-items: space-between;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-left: 8px;
  color: #3b82f6;
  cursor: pointer;
}

.toolbar-right {
  display: flex;
  gap: 12px;
}

.customer-login-button, .store-login-button {
  color: #ffffff;
  font-weight: 600;
  font-size: 12px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.customer-login-button {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.customer-login-button:hover {
  background-color: #ffffff;
  color: #3b82f6;
  border-color: #3b82f6;
}

.store-login-button {
  background-color: #10b981;
  border-color: #10b981;
}

.store-login-button:hover {
  background-color: #ffffff;
  color: #10b981;
  border-color: #10b981;
}

</style>