import { useEffect, useState } from "react";

export function useSyncedStateWithChromeStorage(
    key: string,
    defaultValue: any,
) {
    const [state, setState] = useState(defaultValue);

    // Load state from Chrome storage
    useEffect(() => {
        chrome.storage.local.get([key], (result) => {
            if (result[key] !== undefined) {
                setState(result[key]);
            }
        });
    }, [key]);

    // Update Chrome storage when state changes
    useEffect(() => {
        chrome.storage.local.set({ [key]: state });
    }, [key, state]);

    return [state, setState];
}
