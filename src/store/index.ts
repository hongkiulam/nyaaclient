import { readable, writable } from "svelte/store";
import { querystring } from "svelte-spa-router";
import { parse } from "query-string";
import type { SearchResponse } from "../types/nyaa";
import type { SavedSearch } from "../types/savedSearch";

// setup electron store (persistent storage)
const ElectronStore = (window as any).require("electron-store");
import type Store from "electron-store";
import type { QueryObject } from "../types/query";
import type { Torrent } from "../types/torrent";
const electronStore: Store = new ElectronStore();
// first time initialise keys
if (!electronStore.get("savedSearches")) {
  electronStore.set("savedSearches", []);
  electronStore.set("torrents", []);
}

export const searchResults = writable<SearchResponse>(null);
export const savedSearches = writable<SavedSearch[]>(
  electronStore.get("savedSearches") as SavedSearch[]
);
export const torrents = writable<Torrent[]>(
  electronStore.get("torrents") as Torrent[]
);
export const parsedQueryString = readable<QueryObject>(undefined, (set) => {
  querystring.subscribe((qs) => {
    set(parse(qs) as QueryObject);
  });
});

// SUBSCRIPTIONS
// sync up electron-store with savedSearches store
savedSearches.subscribe((sS) => {
  electronStore.set("savedSearches", sS);
  console.log("SavedSearchesUpdated", sS);
});
// sync up electron-store with torrents store
torrents.subscribe((t) => {
  electronStore.set("torrents", t);
  console.log("TorrentsUpdated", t);
});
