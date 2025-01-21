import { useState } from "react";
import useLocalStorage from "./useLocalStorage";


export default function usePersisentState(key: string): [string | undefined, (t: any) => void, () => void] {
    const {getValue, deleteValue, saveValue} = useLocalStorage();
    const [value, setValue] = useState<string | undefined>(getValue(key) !== null ? getValue(key) as string : undefined);

    const setValueAndStore = (t: any) => {
        deleteValue(key)

        setValue(t);
        saveValue(key, typeof t === 'string' ? t : JSON.stringify(t));
    }

    const clearValue = () => {
        deleteValue(key);
    }


    return [value, setValueAndStore, clearValue];
}