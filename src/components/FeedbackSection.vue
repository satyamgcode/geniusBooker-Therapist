<template>
    <div class="client-feedback q-pa-md">
      <h2 class="text-center text-h4 q-mb-lg">What Store Owners Are Saying</h2>
      <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="amber"
      navigation
      padding
      infinite
      arrows
    >
        <q-carousel-slide
          v-for="(feedback, index) in feedbackList"
          :key="index"
          :name="index"
          class="column no-wrap carousel-slide"
        >
          <div class="feedback-slide q-pa-lg flex flex-center">
            <q-avatar
              size="80px"
              :color="feedback.avatarColor"
              class="q-mr-md"
            >
              <q-icon name="store" />
            </q-avatar>
            
            <div class="feedback-details text-left">
              <p class="text-body1 q-my-xs">
                "{{ feedback.review }}"
              </p>
              <p class="text-subtitle1 q-mt-sm text-weight-bold">
                - {{ feedback.clientName }}, {{ feedback.storeName }}
              </p>
              <p class="text-caption">
                {{ feedback.businessType }}
              </p>
            </div>
          </div>
        </q-carousel-slide>
  
        <!-- Arrow for Previous -->
        <template v-slot:prev>
          <q-btn round color="primary" icon="arrow_left" class="arrow-btn left-arrow"/>
        </template>
  
        <!-- Arrow for Next -->
        <template v-slot:next>
          <q-btn round color="primary" icon="arrow_right" class="arrow-btn right-arrow"/>
        </template>
      </q-carousel>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const slide = ref(1);
  const autoplay = ref(true);
  
  const feedbackList = ref([
    {
      clientName: 'John Doe',
      storeName: 'Health & Wellness Spa',
      businessType: 'Therapy Center',
      review: 'Genius Booker made managing my staff and scheduling sessions seamless! It saved me hours of work each week.',
      avatarColor: 'primary',
    },
    {
      clientName: 'Emily Smith',
      storeName: 'Relaxation Studio',
      businessType: 'Massage Therapy',
      review: 'With Genius Booker, our client bookings have doubled. The platform is super intuitive and easy to use.',
      avatarColor: 'secondary',
    },
    {
      clientName: 'Michael Johnson',
      storeName: 'Serenity Spa',
      businessType: 'Spa & Wellness',
      review: 'Managing my business has never been easier. From scheduling to staff management, Genius Booker has it all!',
      avatarColor: 'positive',
    },
    {
      clientName: 'Sarah Williams',
      storeName: 'Relaxation Studio',
      businessType: 'Massage Therapy',
      review: 'Genius Booker has been an absolute lifesaver. I can now focus on my business and my clients.',
      avatarColor: 'accent',
    },
    
  ]);
  </script>
  
  <style scoped>
  .client-feedback {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .feedback-slide {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 30px;
    align-items: center;
  }
  
  .feedback-details {
    max-width: 600px;
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-left {
    text-align: left;
  }
  
  .carousel-container {
    position: relative;
  }
  
  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  
  .left-arrow {
    left: 10px;
  }
  
  .right-arrow {
    right: 10px;
  }
  .carousel-slide{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  