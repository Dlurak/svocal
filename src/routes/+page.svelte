<script lang="ts">
	import { localstorage } from '$lib/index.js';

	let store = localstorage('demo', 1);
</script>

<p>{$store}</p>
<button
	on:click={() => {
		store.set($store + 1);
	}}
>
	Inc
</button>

<button
	on:click={() => {
		window.localStorage.setItem('demo', `${$store + 1}`);
	}}
>
	Increment directly (not through the store)
</button>
