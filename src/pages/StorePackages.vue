<template>
    <q-layout view="lHh Lpr lFf">
      <app-header />
  
      <q-page-container>
        <q-page class="q-pa-md">
        <div class="q-gutter-md ">
          <div class="text-h3 text-weight-medium text-center q-mb-sm q-mt-xl">Our Packages</div>
          <div class="text-grey text-center q-mb-lg"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure impedit molestiae perspiciatis, debitis illum natus totam quasi possimus culpa eaque. Deserunt, minima! Aut dolorum, nemo beatae esse nostrum sapiente dicta.</div>
          
            <div class="packages-container">
                <q-card v-for="packages in packages" :key="packages.id" flat bordered class="q-pa-md q-ma-sm inner-package-container">
             <div>
                <q-card-section class="text-center">
                <div class="text-h5 q-mb-xs">{{ packages.name }}</div>
                <div class="text-subtitle2 text-grey">{{ packages.description }}</div>
              </q-card-section>
  
              <q-card-section>
                <q-list dense>
                  <q-item v-for="feature in packages.features" :key="feature" class="q-pt-none q-pb-none">
                    <q-item-section>{{ feature }}</q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
  
              <q-separator />
             </div>
  
              <q-card-section class="text-center q-pt-none">
                <div class="text-h6 q-mb-xs">${{ packages.price }} </div>
                <q-btn label="Choose Plan" color="primary" @click="selectPackage(packages)" />
              </q-card-section>
            </q-card>
            </div>
        </div>
      </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AppHeader from 'src/components/common/AppHeader.vue';
  
  const packages = ref([
    {
      id: 1,
      name: 'One Month Plan',
      description: 'Best for growing businesses.',
      features: [
        '1 month of unlimited benefits',
        'Basic Support',
        'Access to Community Forum'
      ],
      price: 19.99
    },
    {
      id: 2,
      name: 'Three Months Plan',
      description: 'Best for growing businesses.',
      features: [
        'Unlimited benefits for 3 month',
        'Priority Support',
        'Access to Community Forum',
        'Monthly features'
      ],
      price: 49.99
    },
    {
      id: 3,
      name: 'Six Months Plan',
      description: 'Perfect for long-term goals.',
      features: [
        'Unlimited benefits',
        '24/7 Support',
        'Access to Community Forum',
        'Monthly features',
        'One-on-One Support'
      ],
      price: 89.99
    }
  ]);
  
  const selectPackage = (pkg) => {
    // Handle packages selection
    console.log(`Selected packages: ${pkg.name}`);
  };
  </script>
  
  <style scoped>
  .q-page {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .q-card-deck {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .q-card {
    width: 100%;
    max-width: 300px;
    border-radius: 20px;
  }
  .packages-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .inner-package-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media screen and (max-width: 1100px) {
    .packages-container{
      justify-content: center;
    }
    
  }
  </style>
  