import { browser } from '$app/environment';
import { readFromLocalStorage, writeToLocalStorage } from '$lib/localstorage/index.js';
import { writable } from 'svelte/store';

function addWindowEventListener<T>(
	key: string,
	set: (this: void, value: T) => void,
	fallback: T
) {
	if (!browser) return;
	if (!window) return;

	const update = () => set(readFromLocalStorage<T>(key, fallback));

	window.addEventListener('storage', ({ storageArea }) => {
		if (!storageArea || storageArea !== localStorage) return;
		update();
	});

	document.addEventListener('internalLocalStorageChange', update);
}

export function localstorage<T>(key: string, fallback: T) {
	const value = readFromLocalStorage(key, fallback);
	const { subscribe, set } = writable(value);

	addWindowEventListener<T>(key, set, fallback);

	return {
		subscribe,
		set: (newValue: T) => {
			set(newValue);

			writeToLocalStorage(key, newValue);
			document.dispatchEvent(new Event('internalLocalStorageChange'));
		}
	};
}
