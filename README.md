# Electron Forge + Svelte Starter

Get up and running with 💪 Svelte & ⚡ Electron.

## Usage

```
git clone https://github.com/codediodeio/electron-forge-svelte.git my-app
cd my-app

npm install
npm start
```

![svelte electron](https://firebasestorage.googleapis.com/v0/b/fireship-app.appspot.com/o/assets%2Felectron-svelte-hello.png?alt=media&token=0d3ecb24-3024-4358-ac26-7676b3e60fa1)

## Notes

- src/index.js - Main electron process.
- src/svelte.js - Svelte app entrypoint.

Setup [Electron with Svelte](https://fireship.io/snippets/svelte-electron-setup) from scratch.
Build cool projects with [Electron](https://fireship.io/tags/electron).

## TODO

- [x] populate search when navigating direct to search page e.g. /#/?q=anime
- [x] Search Filter component/ Paginator
- [x] Figure out Persistent storage, stray code in store/index.ts, SaveSearchesButton
- [x] clean up unused storage dependencies - installed: electron-store, electron-json-storage
