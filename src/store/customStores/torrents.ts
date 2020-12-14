import { get, writable } from "svelte/store";
import { electronStore } from "..";
import type { Torrent } from "../../types/torrent";

const useTorrents = () => {
  const torrents = writable<Torrent[]>(
    electronStore.get("torrents") as Torrent[]
  );
  const add = (torrent: Torrent) => {
    torrents.update((old) => [...old, torrent]);
  };
  const remove = (torrent: Torrent) => {
    const removed = get(torrents).filter((t) => {
      return t.id !== torrent.id;
    });
    torrents.set(removed);
  };
  const exists = (torrent: Torrent) => {
    const found = get(torrents).some((t) => {
      return t.id === torrent.id;
    });
    return found;
  };
  // sync up electron-store with torrents store
  torrents.subscribe((t) => {
    electronStore.set("torrents", t);
    console.log("TorrentsUpdated", t);
  });
  return {
    ...torrents,
    add,
    remove,
    exists,
  };
};

export const torrents = useTorrents();
