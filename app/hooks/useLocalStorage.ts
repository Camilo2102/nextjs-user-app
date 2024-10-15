export default function useLocalStorage() {
    const saveValue = (key: string, value: string) => {        
        window.localStorage.setItem(key, value);
    }

    const getValue = (value: string) => {
        return typeof window !== "undefined" ? window.localStorage.getItem(value) : undefined;
    }

    const deleteValue = (value: string) => {
        window.localStorage.removeItem(value);
    }

    const deleteStorage = () => {
        window.localStorage.clear();
    }

    return{
        saveValue,
        getValue,
        deleteValue,
        deleteStorage
    }
}