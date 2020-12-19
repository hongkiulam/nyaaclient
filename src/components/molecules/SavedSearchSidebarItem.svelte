<script lang="ts">
  import { push } from "svelte-spa-router";
  import { TrashIcon } from "svelte-feather-icons";
  import SidebarItem from "./SidebarItem.svelte";
  import Pill from "../atoms/Pill.svelte";

  import { capitalise } from "../../helpers/format";
  import { objToQueryString } from "../../helpers/query";
  import { sidebar } from "../../store";
  import { savedSearches } from "../../store/customStores/savedSearches";
  import type { SavedSearch } from "../../types/savedSearch";
  import { sortOptions } from "../../helpers/constants";

  export let savedSearch: SavedSearch;

  let pills = [];
  if (savedSearch.page) {
    pills = [...pills, `Page ${savedSearch.page}`];
  }
  if (savedSearch.user) {
    pills = [...pills, `Username ${savedSearch.user}`];
  }
  if (savedSearch.sort && savedSearch.order !== undefined) {
    const prettySort = sortOptions.find(
      (sO) => sO.value === `${savedSearch.sort}|${savedSearch.order}`
    )?.label;
    if (prettySort) {
      pills = [...pills, prettySort];
    }
  }
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
  title={capitalise(savedSearch.q)}
  on:click={() => {
    $sidebar.left = false;
    push('/?' + objToQueryString(savedSearch));
  }}>
  <div slot="body">
    {#each pills as pill}
      <Pill>{pill}</Pill>
    {/each}
  </div>
  <div slot="icons">
    <div
      class="icon_wrapper"
      on:click|preventDefault|stopPropagation={() => {
        savedSearches.remove(savedSearch);
      }}>
      <TrashIcon size="24" />
    </div>
  </div>
</SidebarItem>
