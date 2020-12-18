<script lang="ts">
  import { onDestroy } from "svelte";

  const ipcRenderer = require("electron").ipcRenderer;
  import { torrents } from "../../store/customStores/torrents";
  import type { TorrentInstance } from "../../types/torrent";
  export let torrent: TorrentInstance;

  let percent = 0;

  const removeTorrent = () => {
    if (torrent.webTorrent?.path) {
      ipcRenderer.send("rimraf", torrent?.webTorrent.path);
      ipcRenderer.on("rimraf-done", () => {
        console.log("Deleted", torrent?.webTorrent.path);
        torrents.remove(torrent.searchResult);
        ipcRenderer.removeAllListeners();
      });
      ipcRenderer.on("rimraf-error", (e, err) => {
        console.log(err);
        ipcRenderer.removeAllListeners();
      });
    } else {
      torrents.remove(torrent.searchResult);
    }
  };

  const formatPercentage = (progress: number) => {
    return Math.round(progress * 100 * 100) / 100;
  };

  const tickProgress = setInterval(() => {
    if (torrent.webTorrent) {
      percent = formatPercentage(torrent.webTorrent.progress);
    }
  }, 500);

  onDestroy(() => {
    clearInterval(tickProgress);
  });
</script>

{#if torrent.loading}Loading....{/if}
<a href="#/torrents/{torrent.searchResult.id}">{torrent.searchResult.name}</a>
{#if torrent.webTorrent}<code>{percent}%</code>{/if}
<button on:click|preventDefault|stopPropagation={removeTorrent}>X</button>
