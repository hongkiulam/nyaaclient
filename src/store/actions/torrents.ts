import { get } from "svelte/store";
import { torrents } from "..";
import type { Torrent } from "../../types/torrent";

export const add = (torrent: Torrent) => {
  torrents.update((old) => [...old, torrent]);
};
export const remove = (torrent: Torrent) => {
  const removed = get(torrents).filter((t) => {
    return t.id !== torrent.id;
  });
  torrents.set(removed);
};

export const exists = (torrent: Torrent) => {
  const found = get(torrents).some((t) => {
    return t.id === torrent.id;
  });
  return found;
};
