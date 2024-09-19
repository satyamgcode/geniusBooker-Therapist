import { ref, watch } from 'vue'

const PREFIX = "genius-booker-"

export const useLocalStorage = (key, initialValue) => {
    const data = ref(localStorage.getItem(PREFIX + key) ? JSON.parse(localStorage.getItem(PREFIX + key)) : initialValue)

    watch(data, (value) => {
        if (value == null) {
            localStorage.removeItem(PREFIX + key)
        } else {
            localStorage.setItem(PREFIX + key, JSON.stringify(value))
        }
    })

    return data
}