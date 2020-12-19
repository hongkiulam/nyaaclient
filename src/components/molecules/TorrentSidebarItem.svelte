<script lang="ts">
  import { onDestroy } from "svelte";
  const ipcRenderer = require("electron").ipcRenderer;
  import { TrashIcon } from "svelte-feather-icons";
  import Pill from "../atoms/Pill.svelte";
  import SidebarItem from "./SidebarItem.svelte";

  import { formatFileSize } from "../../helpers/format";
  import { torrents } from "../../store/customStores/torrents";
  import type { TorrentInstance } from "../../types/torrent";
  import { push } from "svelte-spa-router";
  import { sidebar } from "../../store";

  export let torrent: TorrentInstance;

  let downloadSpeed = "0";
  let downloaded = "0";
  let total = "0";
  let peers = 0;
  let status = "Loading";

  const removeTorrent = () => {
    // dont delete if we are already removing torrent.
    if (status === "Deleting") return;
    status = "Deleting";
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

  const tickProgress = setInterval(() => {
    if (torrent.webTorrent) {
      const {
        downloadSpeed: _dlSpeed,
        downloaded: dl,
        length,
        numPeers,
      } = torrent.webTorrent;
      downloadSpeed = formatFileSize(_dlSpeed);
      downloaded = formatFileSize(dl);
      total = formatFileSize(length);
      peers = numPeers;
      if (!torrent.loading) {
        if (torrent.webTorrent.done) {
          status = "Complete";
        } else {
          status = "In Progress";
        }
      }
    }
  }, 500);

  const statusToPillBackground = {
    Loading: "var(--main-3)",
    "In Progress": "var(--main-4)",
    Complete: "var(--success)",
    Deleting: "var(--danger)",
  };

  onDestroy(() => {
    clearInterval(tickProgress);
  });
</script>

<style lang="scss">
  .icon_wrapper {
    display: contents;
    cursor: pointer;
    &:hover {
      color: var(--danger);
    }
  }
</style>

<SidebarItem
  title={torrent.searchResult.name}
  subtitle="{peers} peers"
  on:click={() => {
    $sidebar.right = false;
    push('/torrents/' + torrent.searchResult.id);
  }}>
  <div slot="body">
    <Pill style="background:{statusToPillBackground[status]}">{status}</Pill>
    <Pill>{downloadSpeed}/s</Pill>
    <Pill>{downloaded} of {total}</Pill>
  </div>
  <div slot="icons">
    <div
      class="icon_wrapper"
      on:click|preventDefault|stopPropagation={removeTorrent}>
      <TrashIcon size="24" />
    </div>
  </div>
</SidebarItem>
