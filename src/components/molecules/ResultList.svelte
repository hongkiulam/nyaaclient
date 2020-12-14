<script lang="ts">
  import { DownloadIcon } from "svelte-feather-icons";
  import { searchResults } from "../../store";
  import { torrents } from "../../store/customStores/torrents";
  import Pill from "../atoms/Pill.svelte";
  $: _torrents = $searchResults?.torrents || [];

  const formatFileSize = (sizeInBytes: number) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let counter = 0;
    let formatted = sizeInBytes;
    while (formatted > 1024) {
      formatted = formatted / 1024;
      counter++;
    }
    return formatted.toFixed(1) + units[counter];
  };
  const formatDate = (isoDate: string) => {
    return isoDate.slice(0, 10);
  };
</script>

<style lang="scss">
  ul {
    padding: var(--padding) 0;
  }
  li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--main-3);
    padding: calc(var(--paddingS) / 3);
    &:hover {
      border-bottom-color: var(--main-4);
    }
    .title {
      flex: 1;
    }
    .meta {
      margin: 0 var(--paddingS);
    }
    .icon {
      display: contents;
      cursor: pointer;
    }
  }
</style>

<ul>
  {#each _torrents as torrent}
    <li>
      <div class="title">{torrent.name}</div>
      <div class="meta">
        <Pill>{formatFileSize(torrent.filesize)}</Pill>
        <Pill style="background:var(--success);opacity:0.7;">
          {torrent.seeders}
          Seeders
        </Pill>
        <Pill style="background:var(--danger);opacity:0.7;">
          {torrent.leechers}
          Leechers
        </Pill>
        <Pill style="background:var(--main-3)">{formatDate(torrent.date)}</Pill>
      </div>
      <div
        class="icon"
        on:click={() => {
          torrents.add(torrent);
        }}>
        <DownloadIcon size="24" />
      </div>
    </li>
  {:else}Loading{/each}
</ul>
