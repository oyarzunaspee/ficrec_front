export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return null
    }
    return localStorage.getItem(key)
  }

export const setLocalStorage = (key: string, value: string) => {
    if (typeof window != 'undefined') {
        localStorage.setItem(key, value)
    }
  }