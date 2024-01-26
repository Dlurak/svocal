import type { Equals, IfElse } from '../../types/if.js';

export const stringifyJson = (json: unknown) => {
	if (json === undefined) return 'undefined';

	return JSON.stringify(json);
};

type ParseString<T, V extends string> = IfElse<
	Equals<T, undefined>,
	IfElse<Equals<V, 'undefined'>, undefined, unknown>,
	T
>;

/**
 * Parse a JSON string with type informations
 */
export const parseString = <T, V extends string>(value: V) => {
	if (value === 'undefined') return undefined as ParseString<T, V>;

	return JSON.parse(value) as ParseString<T, V>;
};
