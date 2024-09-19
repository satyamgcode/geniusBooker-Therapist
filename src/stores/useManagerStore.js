import { defineStore } from 'pinia';
import { useLocalStorage } from 'src/hooks/useLocalStorage'

export const useManagerStore = defineStore('managerStore', () => {

    // Store manager and associated stores in local storage
    const manager = useLocalStorage("manager", {})
    const managerStores = useLocalStorage("managerStores", [])

    // Function to set manager data
    const setManager = (newManager) => {
        manager.value = newManager
        console.log(manager.value)
    }

    // Function to set manager's stores data
    const setManagerStores = (newStores) => {
        console.log('newStores', newStores)
        managerStores.value = newStores
        console.log(managerStores.value)
    }

    // Function to display store details
    const showManagerStoreDetails = () => {
        console.log(managerStores.value)
    }

    // Function to clear manager and associated stores data 
    const clearManager = () => {
        manager.value = null
        managerStores.value = null
    }

    return {
        manager,
        managerStores,
        setManager,
        setManagerStores,
        clearManager,
        showManagerStoreDetails
    }
})