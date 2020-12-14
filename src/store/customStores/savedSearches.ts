import { get, writable } from "svelte/store";
import { electronStore } from "..";
import { objToQueryString } from "../../helpers/query";
import type { SavedSearch } from "../../types/savedSearch";

const useSavedSearch = () => {
  const savedSearches = writable<SavedSearch[]>(
    electronStore.get("savedSearches") as SavedSearch[]
  );
  const add = (search: SavedSearch) => {
    savedSearches.update((oldSS) => [...oldSS, search]);
  };
  const remove = (search: SavedSearch) => {
    const removed = get(savedSearches).filter((sS) => {
      const stringToRemove = objToQueryString(search);
      const stringInStore = objToQueryString(sS);
      return stringToRemove !== stringInStore;
    });
    savedSearches.set(removed);
  };
  const exists = (search: SavedSearch) => {
    const found = get(savedSearches).some((sS) => {
      const stringToFind = objToQueryString(search);
      const stringInStore = objToQueryString(sS);
      return stringToFind === stringInStore;
    });
    return found;
  };

  // sync up store with electronStore
  savedSearches.subscribe((sS) => {
    electronStore.set("savedSearches", sS);
    console.log("SavedSearchesUpdated", sS);
  });

  return {
    ...savedSearches,
    add,
    remove,
    exists,
  };
};

export const savedSearches = useSavedSearch();
