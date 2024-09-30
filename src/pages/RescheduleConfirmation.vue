<template>
    <q-layout view="lHh Lpr lFf">
        <AppHeader />
        <q-page-container>
            <q-page>
                <q-btn label="Cancel" icon="close" color="negative" @click="router.push('/')"/>
                <q-btn label="Reschedule" icon="check" color="positive" @click="confirm"/>
            </q-page>
        </q-page-container>
        </q-layout>

    </template>

<script setup>

import AppHeader from 'src/components/common/AppHeader.vue';
import { useRouter , useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>