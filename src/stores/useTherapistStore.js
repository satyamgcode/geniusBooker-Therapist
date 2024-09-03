import { defineStore } from 'pinia'

const Stores = [
    {
        id: 1,
        name: '',
        staff: [
            // 
        ]
    }
]

export const useTherapistStore = defineStore('store', () => {
    const store = ref(Stores)

    const findStoreById = (id) => {
        return store.value.find(store => store.id === id)
    }

    const findStaff = () => {
        return findStoreById(id).staff
    }

    return { store, findStoreById, findStaff }
})