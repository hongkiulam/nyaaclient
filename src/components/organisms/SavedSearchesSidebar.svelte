<script lang="ts">
  import Sidebar from "../atoms/Sidebar.svelte";
  import { StarIcon } from "svelte-feather-icons";
  import { objToQueryString } from "../../helpers/query";
  import { sidebar } from "../../store";
  import { savedSearches } from "../../store/customStores/savedSearches";
  export let open: boolean = false;
</script>

<Sidebar bind:open title="Saved Searches" side="left" icon={StarIcon}>
  {#each $savedSearches as sS}
    <a
      href="#/?{objToQueryString(sS)}"
      on:click={() => {
        $sidebar.left = false;
      }}>{sS.q}</a><button
      on:click={() => {
        savedSearches.remove(sS);
      }}>X</button>
  {/each}
</Sidebar>
