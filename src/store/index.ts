import { readable, writable } from "svelte/store";
import { querystring } from "svelte-spa-router";
import { parse } from "query-string";
import type { SearchResponse } from "../types/nyaa";
// setup electron store (persistent storage)
const ElectronStore = require("electron-store");
import type Store from "electron-store";
import type { QueryObject } from "../types/query";

export const electronStore: Store = new ElectronStore();
// first time initialise keys
if (!electronStore.get("savedSearches")) {
  electronStore.set("savedSearches", []);
  electronStore.set("torrents", []);
}
// WebTorrent
import type WebTorrent from "webtorrent";
const WT = require("webtorrent");
export const wtClient = new WT() as WebTorrent.Instance;

export const searchResults = writable<SearchResponse>(null);
export const parsedQueryString = readable<QueryObject>(undefined, (set) => {
  querystring.subscribe((qs) => {
    set(parse(qs) as QueryObject);
  });
});
export const sidebar = writable({ left: false, right: false });
