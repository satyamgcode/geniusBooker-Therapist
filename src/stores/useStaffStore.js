import { defineStore } from 'pinia'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

export const useTherapistStore = defineStore('therapistStore', () => {

    // Store therapist and associated stores in local storage
    const therapist = useLocalStorage("therapist", {})
    const therapistStores = useLocalStorage("therapistStores", [])
    const therapistScheduleDetails = useLocalStorage("therapistScheduleDetails", [])
    const therapistPendingBookings = useLocalStorage("therapistPendingBookings", [])

    // Function to set therapist data
    const setTherapist = (newTherapist) => {
        therapist.value = newTherapist
        console.log(therapist.value)
    }

    const setTherapistSchedule = ( schedule) => {
        therapistScheduleDetails.value = schedule
        console.log('schedule', therapistScheduleDetails.value)
    } 

    const setTherapistPendingBookings = ( bookings) => {
        therapistPendingBookings.value = bookings
        console.log('bookings', therapistPendingBookings.value)
    }

    // Function to set therapist's stores data
    const setTherapistStores = (newStores) => {
        console.log('newStores', newStores)
        therapistStores.value = newStores
        console.log(therapistStores.value)
    }

    // Function to display store details
    const showTherapistStoreDetails = () => {
        console.log(therapistStores.value)
    }

    // Function to clear therapist and associated stores data
    const clearTherapist = () => {
        therapist.value = null
        therapistStores.value = null
        therapistScheduleDetails.value = null
    }

    return {
        therapist,
        therapistStores,
        setTherapist,
        setTherapistStores,
        clearTherapist,
        showTherapistStoreDetails,
        therapistScheduleDetails,
        setTherapistSchedule,
        therapistPendingBookings,
        setTherapistPendingBookings
    }
})
