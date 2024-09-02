<template>
    <q-layout >
        <app-header />
        <q-page-container>
            <q-page class="flex bg-green-1 h-0.5">
                <div class="therapist-card  q-ma-md q-pa-md">
                    <div class="row items-center q-col-gutter-md">
                        <div class="col-12 col-sm-auto">
                            <q-avatar size="120px">
                                <img :src=therapist.image alt="Therapist Photo" />
                            </q-avatar>
                        </div>
                        <div class="col-12 col-sm">
                            <div class="text-h4 text-weight-bold">{{ therapist.name }}</div>
                            <div class="text-caption text-grey-7">Reg. No.: {{ therapist.regNo }}</div>
                            <div class="text-body1 q-mt-sm">{{ therapist.qualification }}</div>
                            <div class="text-body2 q-mt-xs">{{ therapist.experience }}</div>
                            <div class="text-body2 q-mt-xs">Starts at ₹{{ therapist.price }} for 30 mins</div>
                        </div>
                    </div>
                    <div class="row q-mt-md q-col-gutter-sm justify-between items-center">
                        <div class="col-auto">
                            <q-btn color="orange-8" label="BOOK SESSION" class="text-white" padding="sm lg"
                                @click="bookSession" />
                        </div>
                        <div class="col-auto">
                            <q-btn flat round icon="share" color="grey-7" @click="shareProfile" />
                        </div>
                    </div>
                </div>
                <div class="therapist-card  q-ma-md q-pa-md">
                    <div class="row items-center q-col-gutter-md">
                        <div class="col-12 col-sm-auto">
                            <q-avatar size="120px">
                                <img :src=therapist.image alt="Therapist Photo" />
                            </q-avatar>
                        </div>
                        <div class="col-12 col-sm">
                            <div class="text-h4 text-weight-bold">{{ therapist.name }}</div>
                            <div class="text-caption text-grey-7">Reg. No.: {{ therapist.regNo }}</div>
                            <div class="text-body1 q-mt-sm">{{ therapist.qualification }}</div>
                            <div class="text-body2 q-mt-xs">{{ therapist.experience }}</div>
                            <div class="text-body2 q-mt-xs">Starts at ₹{{ therapist.price }} for 30 mins</div>
                        </div>
                    </div>
                    <div class="row q-mt-md q-col-gutter-sm justify-between items-center">
                        <div class="col-auto">
                            <q-btn color="orange-8" label="BOOK SESSION" class="text-white" padding="sm lg"
                                @click="bookSession" />
                        </div>
                        <div class="col-auto">
                            <q-btn flat round icon="share" color="grey-7" @click="shareProfile" />
                        </div>
                    </div>
                </div>
                <div class="therapist-card  q-ma-md q-pa-md">
                    <div class="row items-center q-col-gutter-md">
                        <div class="col-12 col-sm-auto">
                            <q-avatar size="120px">
                                <img :src=therapist.image alt="Therapist Photo" />
                            </q-avatar>
                        </div>
                        <div class="col-12 col-sm">
                            <div class="text-h4 text-weight-bold">{{ therapist.name }}</div>
                            <div class="text-caption text-grey-7">Reg. No.: {{ therapist.regNo }}</div>
                            <div class="text-body1 q-mt-sm">{{ therapist.qualification }}</div>
                            <div class="text-body2 q-mt-xs">{{ therapist.experience }}</div>
                            <div class="text-body2 q-mt-xs">Starts at ₹{{ therapist.price }} for 30 mins</div>
                        </div>
                    </div>
                    <div class="row q-mt-md q-col-gutter-sm justify-between items-center">
                        <div class="col-auto">
                            <q-btn color="orange-8" label="BOOK SESSION" class="text-white" padding="sm lg"
                                @click="bookSession" />
                        </div>
                        <div class="col-auto">
                            <q-btn flat round icon="share" color="grey-7" @click="shareProfile" />
                        </div>
                    </div>
                </div>
                <div class="therapist-card  q-ma-md q-pa-md">
                    <div class="row items-center q-col-gutter-md">
                        <div class="col-12 col-sm-auto">
                            <q-avatar size="120px">
                                <img :src=therapist.image alt="Therapist Photo" />
                            </q-avatar>
                        </div>
                        <div class="col-12 col-sm">
                            <div class="text-h4 text-weight-bold">{{ therapist.name }}</div>
                            <div class="text-caption text-grey-7">Reg. No.: {{ therapist.regNo }}</div>
                            <div class="text-body1 q-mt-sm">{{ therapist.qualification }}</div>
                            <div class="text-body2 q-mt-xs">{{ therapist.experience }}</div>
                            <div class="text-body2 q-mt-xs">Starts at ₹{{ therapist.price }} for 30 mins</div>
                        </div>
                    </div>
                    <div class="row q-mt-md q-col-gutter-sm justify-between items-center">
                        <div class="col-auto">
                            <q-btn color="orange-8" label="BOOK SESSION" class="text-white" padding="sm lg"
                                @click="bookSession" />
                        </div>
                        <div class="col-auto">
                            <q-btn flat round icon="share" color="grey-7" @click="shareProfile" />
                        </div>
                    </div>
                </div>
                <div class="therapist-card  q-ma-md q-pa-md">
                    <div class="row items-center q-col-gutter-md">
                        <div class="col-12 col-sm-auto">
                            <q-avatar size="120px">
                                <img :src=therapist.image alt="Therapist Photo" />
                            </q-avatar>
                        </div>
                        <div class="col-12 col-sm">
                            <div class="text-h4 text-weight-bold">{{ therapist.name }}</div>
                            <div class="text-caption text-grey-7">Reg. No.: {{ therapist.regNo }}</div>
                            <div class="text-body1 q-mt-sm">{{ therapist.qualification }}</div>
                            <div class="text-body2 q-mt-xs">{{ therapist.experience }}</div>
                            <div class="text-body2 q-mt-xs">Starts at ₹{{ therapist.price }} for 30 mins</div>
                        </div>
                    </div>
                    <div class="row q-mt-md q-col-gutter-sm justify-between items-center">
                        <div class="col-auto">
                            <q-btn color="orange-8" label="BOOK SESSION" class="text-white" padding="sm lg"
                                @click="bookSession" />
                        </div>
                        <div class="col-auto">
                            <q-btn flat round icon="share" color="grey-7" @click="shareProfile" />
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { useRoute , useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import AppHeader from 'src/components/common/AppHeader.vue';
const router = useRouter();

const route = useRoute();
const therapist = ref(
    {}
);

onMounted(() => {
    fetchTherapistDetails(route.params.id);
});

const fetchTherapistDetails = (id) => {
    const data = {
        1: {
        id: 1,
        name: 'Dr Ahmed Reshamvala',
        regNo: '2018073731',
        qualification: 'M.B.B.S, MD Psychiatry, DNB Psychiatry',
        experience: '1+ years of experience',
        price: 1250,
        image: '/src/assets/heroimage.jpg',
      },
      2: {
        id: 2,
        name: 'Dr. John Doe',
        regNo: '1234567890',
        qualification: 'M.B.B.S, MD, DNB',
        experience: '5 years of experience',
        price: 1500,
        image: '/src/assets/heroimage.jpg',
    },
    3: {
        id: 3,
        name: 'Dr. Jane Smith',
        regNo: '9876543210',
        qualification: 'M.B.B.S, MD, DNB',
        experience: '3 years of experience',
        price: 1000,
        image: 'src/assets/heroimage.jpg',
    },
    4: {
        id: 4,
        name: 'Dr. Smith Johnson',
        regNo: '1234567890',
        qualification: 'M.B.B.S, MD, DNB',
        experience: '10 years of experience',
        price: 2000,
        image: 'src/assets/heroimage.jpg',
    },
    5: {
        id: 5,
        name: 'Dr. Smith Johnson',
        regNo: '1234567890',
        qualification: 'M.B.B.S, MD, DNB',
        experience: '10 years of experience',
        price: 2000,
        image: 'src/assets/heroimage.jpg',   
    },
    6: {
        id: 6,
        name: 'Dr. Smith Johnson',
        regNo: '1234567890',
        qualification: 'M.B.B.S, MD, DNB',
        experience: '10 years of experience',
        price: 2000,
        image: 'src/assets/heroimage.jpg',
    },
}
    therapist.value = data[id];
};
const bookSession = () => {
    console.log('Book Session');
    router.push({ path: '/book-session' });
};
const shareProfile = () => {
    console.log('Share Profile');
};


</script>
<style scoped>
.therapist-card {
    max-width: 100%;
    height: fit-content;
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.text-h4 {
    color: #333;
}

.text-caption {
    font-size: 0.85rem;
}

.q-btn {
    font-weight: bold;
}
.q-page{
    max-width: 1200px;
    margin: 0 auto;
}
</style>