import { defineStore } from 'pinia'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

export const useOwnerStore = defineStore('ownerStore', () => {

    const owner = useLocalStorage("owner", {})

  const stores = useLocalStorage("stores", [])

  const setOwner =(newOwner)=> {
    owner.value = newOwner
  }

  const setStores =(newStores)=> {
    console.log('newStores', newStores)
    stores.value = newStores
    console.log(stores.value)
  }
  const showStoreDetails = () => {
    console.log(stores.value)
  }

  const clearOwner =()=> {
    owner.value = null
    stores.value = null
  }

  return {
    owner,
    stores,
    setOwner,
    setStores,
    clearOwner,
    showStoreDetails
  }
})
