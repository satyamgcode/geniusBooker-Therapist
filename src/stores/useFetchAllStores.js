import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useFetchAllStores = defineStore('fetchAllStores', () => {
    const stores = ref([])

    const dummyTherapists = [
        { 
          id: 1000,
          storeName: 'Malvika Therapy Store',
          qualification: 'MA in Clinical Psychology',
          specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
          availableAt: 'Aug 28, 2024 3:00 PM',
          image: 'https://via.placeholder.com/80',
          staff: [
            { id: 1, name: 'Dr. Anjali Sharma', role: 'Senior Psychologist', experience: '10 years' },
            { id: 2, name: 'Dr. Vikram Mehta', role: 'Child Psychologist', experience: '7 years' }, 
            { id: 3, name: 'Ms. Nidhi Patel', role: 'Therapy Assistant', experience: '3 years' }
          ]
        },
        {
          id: 2000,
          storeName: 'Ayesha Bukhari Therapy Store',
          qualification: 'MA in Clinical Psychology',
          specialization: 'Depression, Trauma, Body Image, ADHD, Stress, Anger, Anxiety',
          availableAt: 'Aug 28, 2024 3:00 PM',
          image: 'https://via.placeholder.com/80',
          staff: [
            { id: 1, name: 'Dr. Sameer Khan', role: 'Senior Therapist', experience: '12 years' },
            { id: 2, name: 'Ms. Ritu Verma', role: 'Cognitive Therapist', experience: '5 years' },
            { id: 3, name: 'Mr. Ajay Singh', role: 'Mental Health Counselor', experience: '4 years' }
          ]
        },
        {
          id: 3000,
          storeName: 'Rashi Lambe Therapy Store',
          qualification: 'MSc. in Counseling Psychology',
          specialization: 'Stress, Anxiety, Depression, Career Counselling, Relationship Issues',
          availableAt: 'Aug 28, 2024 3:00 PM',
          image: 'https://via.placeholder.com/80',
          staff: [
            { id: 1, name: 'Dr. Pooja Kulkarni', role: 'Psychotherapist', experience: '8 years' },
            { id: 2, name: 'Mr. Arun Jain', role: 'Relationship Counselor', experience: '6 years' },
            { id: 3, name: 'Ms. Preeti Desai', role: 'Wellness Coach', experience: '3 years' }
          ]
        },
        {
          id: 4000,
          storeName: 'Malvika Agarwal Therapy Store',
          qualification: 'MA in Clinical Counseling',
          specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
          availableAt: 'Aug 28, 2024 3:00 PM',
          image: 'https://via.placeholder.com/80',
          staff: [
            { id: 1, name: 'Dr. Meera Gupta', role: 'Clinical Psychologist', experience: '15 years' },
            { id: 2, name: 'Ms. Kavita Nair', role: 'Therapist', experience: '4 years' },
            { id: 3, name: 'Mr. Karan Bose', role: 'Behavioral Therapist', experience: '5 years' }
          ]
        },
        {
          id: 5000,
          storeName: 'Rashi Lambe Therapy Store',
          qualification: 'MSc. in Counseling Psychology',
          specialization: 'Stress, Anxiety, Depression, Career Counselling, Relationship Issues',
          availableAt: 'Aug 28, 2024 3:00 PM',
          image: 'https://via.placeholder.com/80',
          staff: [
            { id: 1, name: 'Dr. Sneha Bhatt', role: 'Clinical Psychologist', experience: '9 years' },
            { id: 2, name: 'Mr. Ravi Sinha', role: 'Family Therapist', experience: '5 years' },
            { id: 3, name: 'Ms. Sunita Verma', role: 'Mental Health Specialist', experience: '6 years' }
          ]
        },
        {
          id: 6000,
          storeName: 'Malvika Agarwal Therapy Store',
          qualification: 'MA in Clinical Counseling',
          specialization: 'Anxiety, Depression, Stress, Mood Disorder, Relationship Issues',
          availableAt: 'Aug 28, 2024 3:00 PM',
          image: 'https://via.placeholder.com/80',
          staff: [
            { id: 1, name: 'Dr. Aakash Verma', role: 'Psychiatrist', experience: '11 years' },
            { id: 2, name: 'Ms. Anamika Gupta', role: 'Psychologist', experience: '4 years' },
            { id: 3, name: 'Mr. Rajiv Kumar', role: 'Life Coach', experience: '7 years' }
          ]
        }
      ];

    const fetchStores = async () => {
        if (!stores.value) {
            return
        }

        try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/stores/`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)

            const apiTherapists = response.data.map(store => ({
                id: store.id,
                storeName: store.name,
                address: store.address,
                qualification: store.phone,
                phone: store.phone,
                specialization: store.speciality || 'Specialization not available',
                availableAt: 'Checkout schedule',
                image: 'https://via.placeholder.com/80',
                staff: store.therapists.map(therapist => ({
                    name: therapist.username,
                    role: therapist.role || 'Therapist',
                    experience: therapist.experience ? `${therapist.experience} years` : 'Experience not available',
                    StaffId: therapist.id
                })),
                store_schedule:{
                    opening_days : store.opening_days,
                    start_time : store.start_time,
                    end_time : store.end_time,
                    lunch_start_time : store.lunch_start_time,
                    lunch_end_time : store.lunch_end_time
                }
            }));

            // Combine API data and dummy data
            stores.value = [...dummyTherapists, ...apiTherapists];
        } catch (error) {
            console.error("Error fetching stores:", error);
            stores.value = dummyTherapists;
            throw error;
        }
    }

    const getStoreById = (id) => {
        return stores.value.find((store) => {
            return store.id == id
        });
    }

    return {
        stores,
        fetchStores,
        getStoreById,
    }
})