# Svocal

Svocal combines the power of Svelte stores with localstorage.  
This packageg is currently very early, while I use it myself I wouldn't really recomend to use it!

## Installation

```bash
npm i svocal
```

```bash
yarn add svocal
```

```bash
pnpm add svocal
```

```bash
bun add svocal
```

## Usage

Import `localstorage`:

```ts
import { localstorage } from 'svocal';
```

Then you can start using the localstorage:

```ts
const store = = localstorage('demo', 1)
const store2 = = localstorage('demo', 1)
```

`store` and `store2` both use the localstorage key `demo` so when you set store store2 will also update.

```ts
store.set(42)
store2.subscribe(console.log)
```

Will console.log 42

This even works with different tabs, so svocal can be used to sync state between tabs and windows!

