<script lang="ts">
  import Sidebar from "../atoms/Sidebar.svelte";
  import { StarIcon } from "svelte-feather-icons";
  import { savedSearches } from "../../store";
  import * as savedSearchesActions from "../../store/actions/savedSearches";
  import { objToQueryString } from "../../helpers/query";
  export let open: boolean = false;
</script>

<Sidebar bind:open title="Saved Searches" side="left" icon={StarIcon}>
  {#each $savedSearches as sS}
    <a href="#/?{objToQueryString(sS)}">{sS.q}</a><button
      on:click={() => {
        savedSearchesActions.remove(sS);
      }}>X</button>
  {/each}
</Sidebar>
