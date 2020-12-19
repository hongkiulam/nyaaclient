<script lang="ts">
  import { fade } from "svelte/transition";
  import { DownloadIcon, CheckIcon } from "svelte-feather-icons";
  import { searchResults, sidebar } from "../../store";
  import { torrents } from "../../store/customStores/torrents";
  import type { NyaaTorrent } from "../../types/torrent";
  import Pill from "../atoms/Pill.svelte";
  import { formatFileSize } from "../../helpers/format";
  $: _torrents = ($searchResults?.torrents || []) as NyaaTorrent[];

  const formatDate = (isoDate: string) => {
    return isoDate.slice(0, 10);
  };

  $: torrentAlreadyAdded = (torrent: NyaaTorrent) => {
    return torrents.exists(torrent.magnet);
    $torrents; //dependency
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
      border-bottom-color: white;
      background: var(--main-1);
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
      &.check {
        color: var(--success);
        cursor: auto;
      }
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
        class:check={torrentAlreadyAdded(torrent)}
        on:click|stopPropagation={() => {
          if (!torrents.exists(torrent.magnet)) {
            $sidebar.right = true;
            torrents.add(torrent);
          }
        }}>
        {#if torrentAlreadyAdded(torrent)}
          <div in:fade>
            <CheckIcon size="24" />
          </div>
        {:else}
          <div>
            <DownloadIcon size="24" />
          </div>
        {/if}
      </div>
    </li>
  {:else}Loading{/each}
</ul>
