<script lang="ts">
  import Sidebar from "../atoms/Sidebar.svelte";
  import { DownloadIcon } from "svelte-feather-icons";
  import type { TorrentInstance } from "../../types/torrent";
  import { torrents } from "../../store/customStores/torrents";
  import TorrentSidebarItem from "../molecules/TorrentSidebarItem.svelte";

  export let open: boolean = false;
  $: {
    console.log($torrents);
  }

  $: _torrents = Object.values($torrents) as TorrentInstance[];
</script>

<Sidebar bind:open title="Torrents" side="right" icon={DownloadIcon}>
  {#each _torrents as torrent}
    <TorrentSidebarItem {torrent} />
  {/each}
</Sidebar>
