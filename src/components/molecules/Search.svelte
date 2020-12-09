<script lang="ts">
  import { push } from "svelte-spa-router";
  import { SearchIcon } from "svelte-feather-icons";
  import Input from "../atoms/Input.svelte";
  import { parsedQueryString } from "../../store";
  import { updateQuery } from "../../helpers/query";
  import SaveSearchButton from "../atoms/SaveSearchButton.svelte";

  export let large: boolean = false;
  export let value: string;

  const search = () => {
    if (value) {
      updateQuery({ q: value });
    }
  };
  $: if (value === "") {
    push("/");
  }

  // assign to act as a memoiser
  $: searchQuery = $parsedQueryString.q as string;
  // update value if querystring q= value changes
  $: value = searchQuery;
</script>

<style lang="scss">
  @import "src/styles/global";
  $searchButtonWidth: 5em;

  .search_bar {
    position: relative;
    width: 100%;
  }
  %button {
    position: absolute;
    height: 100%;
    color: inherit;
    cursor: pointer;
    :global(svg) {
      height: 100%;
    }
  }
  .search_button {
    @extend %button;
    right: 0;
    padding: 0 var(--paddingS);
    background: var(--main-1);
    width: $searchButtonWidth;
  }
  .save_search_button_position {
    @extend %button;
    right: $searchButtonWidth;
    background: transparent;
    display: inline-block;
    padding: 0 var(--paddingS);
  }
</style>

<form class="search_bar" on:submit|preventDefault={search}>
  <Input {large} bind:value placeholder="Search . . ." />
  {#if !large}
    <div class="save_search_button_position">
      <SaveSearchButton />
    </div>
  {/if}
  <button class="search_button">
    <SearchIcon size={large ? '36' : '24'} />
  </button>
</form>
