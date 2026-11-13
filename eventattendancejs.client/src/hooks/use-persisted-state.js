import { useEffect, useState } from "react"; // Custom hook to persist state in localStorage and synchronize across tabs.

function readStoredValue(key, initialValue) {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue === null ? initialValue : JSON.parse(storedValue);
    } catch {
        return initialValue;
    }
}

export function usePersistedState(key, initialValue) {
    const [value, setValue] = useState(() => readStoredValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    useEffect(() => {
        function handleStorageChange(event) {
            if (event.key === key && event.newValue !== null) {
                setValue(JSON.parse(event.newValue));
            }
        }

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    return [value, setValue];
}
