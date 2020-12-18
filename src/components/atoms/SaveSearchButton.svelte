<script lang="ts">
  import { fly } from "svelte/transition";
  import { StarIcon } from "svelte-feather-icons";
  import { parsedQueryString } from "../../store";
  import { savedSearches } from "../../store/customStores/savedSearches";

  let isSaved = false;
  $: {
    isSaved = savedSearches.exists($parsedQueryString);
    $savedSearches; // savedSearches as dependency
  }

  const toggleSaveSearch = () => {
    if (isSaved) {
      savedSearches.remove($parsedQueryString);
    } else {
      savedSearches.add($parsedQueryString);
    }
    isSaved = !isSaved;
  };
</script>

<style lang="scss">
  .save_search_button {
    display: flex;
    align-items: center;
    height: 100%;
    span {
      margin-right: var(--paddingS);
    }
  }
  .isSaved {
    color: var(--success);
  }
</style>

<div class="save_search_button" class:isSaved on:click={toggleSaveSearch}>
  {#if isSaved}<span transition:fly={{ y: 5 }}>Saved</span>{/if}
  <StarIcon size="24" />
</div>
