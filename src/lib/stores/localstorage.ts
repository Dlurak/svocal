import { browser } from '$app/environment';
import { readFromLocalStorage, writeToLocalStorage } from '$lib/localstorage/index.js';
import { get, writable } from 'svelte/store';

function addWindowEventListener<T>(key: string, set: (this: void, value: T) => void, fallback: T) {
	if (!browser) return;
	if (!window) return;

	const update = () => set(readFromLocalStorage<T>(key, fallback));

	window.addEventListener('storage', ({ storageArea }) => {
		if (!storageArea || storageArea !== localStorage) return;
		update();
	});

	document.addEventListener('internalLocalStorageChange', update);
}

/**
 * A writeable store that autosyncs with localstorage
 * It can also be used to sync state between multiple tabs/windows
 */
export function localstorage<T>(key: string, fallback: T) {
	const value = readFromLocalStorage(key, fallback);
	const writableStore = writable(value);
	const { subscribe, set } = writableStore;

	addWindowEventListener<T>(key, set, fallback);

	return {
		subscribe,
		/**
		 * Set a new value into the store,
		 * this will also affect all other svocal stores using the same key
		 * and will write to the localstorage
		 * @param newValue The new value to set
		 */
		set: (newValue: T) => {
			set(newValue);

			writeToLocalStorage(key, newValue);
			document.dispatchEvent(new Event('internalLocalStorageChange'));
		},
		/**
		 * Update the store using a function
		 * It will affect other stores with the same key and write to the localstorage
		 * @param newValueFn A function which return value will be the new value
		 */
		update: (newValueFn: (oldVal: T) => T) => {
			const newValue = newValueFn(get(writableStore));
			set(newValue);

			writeToLocalStorage(key, newValue);
			document.dispatchEvent(new Event('internalLocalStorageChange'));
		}
	};
}
