<script lang="ts">
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { StarIcon } from "svelte-feather-icons";
  import Sidebar from "../atoms/Sidebar.svelte";
  import SavedSearchSidebarItem from "../molecules/SavedSearchSidebarItem.svelte";

  import { savedSearches } from "../../store/customStores/savedSearches";
  import { objToQueryString } from "../../helpers/query";
  export let open: boolean = false;
</script>

<Sidebar bind:open title="Saved Searches" side="left" icon={StarIcon}>
  {#each $savedSearches as sS (objToQueryString(sS))}
    <div animate:flip={{ duration: 300 }} out:fade>
      <SavedSearchSidebarItem savedSearch={sS} />
    </div>
  {/each}
</Sidebar>
