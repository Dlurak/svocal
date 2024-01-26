// import { parseString } from '$lib/json/stringParse.js';
import { readFromLocalStorage, writeToLocalStorage } from '$lib/localstorage/index.js';
import { writable } from 'svelte/store';

export function localstorage(key: string, fallback: unknown) {
	const value = readFromLocalStorage(key, fallback);
	const { subscribe, set } = writable(value);

	// if (window) {
	// 	window.addEventListener('storage', ({ storageArea, oldValue, newValue }) => {
	// 		if (!storageArea || storageArea !== localStorage) return;
	//
	// 		const parsedOldValue = parseString(oldValue || '{}') as Record<string, unknown>;
	// 		const parsedNewValue = parseString(newValue || '{}') as Record<string, unknown>;
	//
	// 		const oldValueKey = parsedOldValue[key];
	// 		const newValueKey = parsedNewValue[key];
	//
	// 		if (oldValueKey === newValueKey) return;
	//
	// 		set(newValueKey);
	// 	});
	// }

	return {
		subscribe,
		set: (newValue: unknown) => {
			set(newValue);
			writeToLocalStorage(key, newValue);
		}
	};
}
