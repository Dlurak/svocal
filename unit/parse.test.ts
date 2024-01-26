import { expect, describe, it } from 'vitest';
import { parseString, stringifyJson } from '../src/lib/json/stringParse';

describe('parse a json value', () => {
	it('the parsed value equals the original one', () => {
		const objects = [
			1,
			'hello world',
			'1',
			{ key: 'value', key2: 1 },
			undefined,
			null,
			-1,
			''
		] as const;
		objects.forEach((o) => {
			const stringified = stringifyJson(o);
			const parsed = parseString(stringified);

			expect(o).toEqual(parsed);
		});
	});
});
