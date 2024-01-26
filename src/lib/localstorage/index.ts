import { browser } from '$app/environment';
import { parseString, stringifyJson } from '$lib/json/stringParse.js';

/**
 * Reads (and parses) a value from the Local Storage using the provided key.
 *
 * @param  key - The key under which the value is stored in Local Storage.
 * @param fallback - The default value to be returned if the key is not found or parsing fails.
 * @returns The parsed value from Local Storage, or the fallback value if not found or parsing fails.
 */
export const readFromLocalStorage = <T>(key: string, fallback: T) => {
	if (!browser) return fallback;
	if (!localStorage) return fallback;

	const rawValue = localStorage.getItem(key);

	if (!rawValue) return fallback;

	try {
		const parsed = parseString(rawValue) as T;
		return parsed;
	} catch {
		return fallback;
	}
};

export const writeToLocalStorage = (key: string, value: unknown) => {
	if (!browser) return false;
	if (!localStorage) return false;

	localStorage.setItem(key, stringifyJson(value));
	return true;
};
