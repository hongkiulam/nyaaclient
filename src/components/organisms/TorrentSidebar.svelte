<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { DownloadIcon } from "svelte-feather-icons";
  import Sidebar from "../atoms/Sidebar.svelte";
  import TorrentSidebarItem from "../molecules/TorrentSidebarItem.svelte";
  import type { TorrentInstance } from "../../types/torrent";
  import { torrents } from "../../store/customStores/torrents";

  export let open: boolean = false;
  $: {
    console.log($torrents);
  }

  $: _torrents = Object.values($torrents).sort(
    (a, b) => a.added - b.added
  ) as TorrentInstance[];
</script>

<Sidebar bind:open title="Torrents" side="right" icon={DownloadIcon}>
  {#each _torrents as torrent (torrent.searchResult.id)}
    <div animate:flip={{ duration: 300 }} out:fade>
      <TorrentSidebarItem {torrent} />
    </div>
  {/each}
</Sidebar>
