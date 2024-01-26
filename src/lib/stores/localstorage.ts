import { browser } from '$app/environment';
import { readFromLocalStorage, writeToLocalStorage } from '$lib/localstorage/index.js';
import { writable } from 'svelte/store';

function addWindowEventListener(
	key: string,
	set: (this: void, value: unknown) => void,
	fallback: unknown
) {
	if (!browser) return;
	if (!window) return;

	const update = () => set(readFromLocalStorage(key, fallback));

	window.addEventListener('storage', ({ storageArea }) => {
		if (!storageArea || storageArea !== localStorage) return;
		update();
	});

	document.addEventListener('internalLocalStorageChange', update);
}

export function localstorage(key: string, fallback: unknown) {
	const value = readFromLocalStorage(key, fallback);
	const { subscribe, set } = writable(value);

	addWindowEventListener(key, set, fallback);

	return {
		subscribe,
		set: (newValue: unknown) => {
			set(newValue);

			writeToLocalStorage(key, newValue);
			document.dispatchEvent(new Event('internalLocalStorageChange'));
		}
	};
}
