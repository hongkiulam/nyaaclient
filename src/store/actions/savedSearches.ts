import { get } from "svelte/store";
import { savedSearches } from "..";
import { objToQueryString } from "../../helpers/query";
import type { SavedSearch } from "../../types/savedSearch";

export const add = (search: SavedSearch) => {
  savedSearches.update((oldSS) => [...oldSS, search]);
};
export const remove = (search: SavedSearch) => {
  const removed = get(savedSearches).filter((sS) => {
    const stringToRemove = objToQueryString(search);
    const stringInStore = objToQueryString(sS);
    return stringToRemove !== stringInStore;
  });
  savedSearches.set(removed);
};

export const exists = (search: SavedSearch) => {
  const found = get(savedSearches).some((sS) => {
    const stringToFind = objToQueryString(search);
    const stringInStore = objToQueryString(sS);
    return stringToFind === stringInStore;
  });
  return found;
};
