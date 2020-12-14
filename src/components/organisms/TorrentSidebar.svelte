<script lang="ts">
  import Sidebar from "../atoms/Sidebar.svelte";
  import { DownloadIcon } from "svelte-feather-icons";
  import { torrents } from "../../store/customStores/torrents";

  export let open: boolean = false;
</script>

<Sidebar bind:open title="Torrents" side="right" icon={DownloadIcon}>
  {#each $torrents as torrent}
    <a href="#/torrents/{torrent.id}">{torrent.name}</a><button
      on:click={() => {
        torrents.remove(torrent);
      }}>X</button>
  {/each}
</Sidebar>
