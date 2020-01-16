class AppStorage {
    storage: any
    constructor(storage?: any) {
        this.storage = storage || window.localStorage

        if (!this.isSupported()) {
            throw new Error('Storage is not supported by browser!')
        }
    }

    setItem(key: string, value: any) {
        this.storage.setItem(key, value)
    }

    getItem(key: string) {
        return this.storage.getItem(key)
    }

    removeItem(key: string) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }

    isSupported() {
        let supported = true

        if (!this.storage) {
            supported = false
        }

        return supported
    }
}

const appLocalStorage = new AppStorage()

export default appLocalStorage
