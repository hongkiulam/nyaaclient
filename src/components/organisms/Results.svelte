<script lang="ts">
  import ResultFilter from "../molecules/ResultFilter.svelte";
  import ResultList from "../molecules/ResultList.svelte";

  export let show: boolean = false;
</script>

<style lang="scss">
  @import "src/styles/global";
  .results {
    width: calc(100% - ((#{$topbariconarea} + var(--paddingL)) * 2));
    margin: 0 auto;
    height: 100%;
    overflow-y: scroll;
    position: relative;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>

{#if show}
  <div class="results">
    <div class="sticky">
      <ResultFilter />
    </div>
    <ResultList />
  </div>
{/if}
