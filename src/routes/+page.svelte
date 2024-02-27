<script lang="ts">
	import { localstorage } from '$lib/index.js';

	let store = localstorage('demo', 1);

	let store2 = localstorage('demo', 1);

	store.subscribe(console.log);
</script>

<table>
	<thead>
		<tr>
			<th>Store 1</th>
			<th>Store 2</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{$store}</td>
			<td>{$store2}</td>
		</tr>
		<tr>
			<td>
				<button
					on:click={() => {
						store.set($store + 1);
					}}
				>
					Increment store 1
				</button>
				<button
					on:click={() => {
						store2.update((val) => val + 1);
					}}
				>
					Increment store 2
				</button>
			</td>
		</tr>
	</tbody>
</table>
