<template>
  <q-layout view="lHh Lpr lFf">
    <app-header />

    <q-page-container>
      <q-page class="q-pa-lg">
        <div class="q-gutter-lg">
          <div class="text-h3 text-weight-bold text-center q-mb-md q-mt-lg">Our Packages</div>
          <div class="text-subtitle1 text-grey-8 text-center q-mb-xl">
            Discover the plan that suits your needs best. Choose from our variety of options to get started today!
          </div>

          <div class="packages-container">
            <q-card
              v-for="pkg in packages"
              :key="pkg.id"
              flat
              bordered
              class="q-pa-md package-card"
            >
              <q-card-section class="text-center">
                <div class="text-h6 q-mb-xs text-primary">{{ pkg.name }}</div>
                <div class="text-subtitle2 text-grey-6 q-mb-md">{{ pkg.description }}</div>
              </q-card-section>

              <q-separator class="q-my-md" />

              <q-card-section>
                <q-list dense>
                  <q-item
                    v-for="feature in pkg.features"
                    :key="feature"
                    class="q-pt-none q-pb-none"
                  >
                    <q-item-section class="handle-feature">
                      <q-icon name="check_circle" color="primary" class="q-mr-xs" />
                      <span>{{ feature }}</span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-separator class="q-my-md" />

              <q-card-section class="text-center">
                <div class="text-h5 text-weight-bold q-mb-xs">${{ pkg.price }} </div>
                <q-btn
                  label="Choose Plan"
                  color="primary"
                  class="full-width"
                  @click="selectPackage(pkg)"
                />
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
    description: 'Ideal for quick, short-term needs.',
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
    description: 'Great for steady growth.',
    features: [
      'Unlimited benefits for 3 months',
      'Priority Support',
      'Access to Community Forum',
      'Monthly features'
    ],
    price: 49.99
  },
  {
    id: 3,
    name: 'Six Months Plan',
    description: 'Best for long-term objectives.',
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
  // Handle package selection
  console.log(`Selected package: ${pkg.name}`);
};
</script>

<style scoped>
.q-page {
  max-width: 1300px;
  margin: 0 auto;
}

.packages-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.package-card {
  width: 100%;
  max-width: 280px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.full-width {
  width: 100%;
}

.q-separator {
  border-color: #e0e0e0;
}
.handle-feature {
  display: block !important;
}
</style>
