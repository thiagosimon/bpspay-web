export const setItemInStorage = (key: string, data: string) => {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log(error)
    }
}

export const getItemFromStorage = (key: string) => {
    try {
        const value = localStorage.getItem(key)
        if (value) {
            return value
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const removeStoreItem = (key: string) => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log(error)
    }
}

export const setObjectInStore = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

export const getObjectFromStore = (key: string) => {
    try {
        const value = localStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const storeMultiDelete = (keyArray: any) => {
    try {
        keyArray.forEach((key: string) => {
            localStorage.removeItem(key)
        })
    } catch (error) {
        console.log(error)
    }
}

export const clearStorage = () => {
    try {
        localStorage.clear()
    } catch (error) {
        console.log(error)
    }
}
