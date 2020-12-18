<script lang="ts">
  import Select from "svelte-select";
  export let data: { value: string; label: string }[] = [];
  export let value: { value: string; label: string };
  export let placeholder: string = "";
</script>

<style lang="scss">
  $color: var(--main-4);
  .select_theme {
    display: contents;
    // backgrounds
    --background: var(--main-2);
    --listBackground: var(--main-2);
    --itemIsActiveBG: var(--main0);
    --itemHoverBG: var(--main-1);
    // colors
    --inputColor: $color;
    --itemIsActiveColor: $color;
    --indicatorColor: $color;
    --clearSelectFocusColor: $color;
    --clearSelectColor: $color;

    --border: 0;
    --borderRadius: 5px;
    --padding: 0.4em;
    --height: calc(1em + (2 * var(--padding)));

    // indicator
    --indicatorTop: 50%;
    --indicatorHeight: var(--height);
    --clearSelectTop: 50%;
    --clearSelectRight: 35px;
  }
  :global(.select_class) {
    width: 100%;
  }
  :global(.select_class .indicator),
  :global(.select_class .clearSelect) {
    transform: translateY(-50%);
    height: var(--height);
  }
</style>

<div class="select_theme">
  <Select
    items={data}
    bind:selectedValue={value}
    containerClasses="select_class"
    showIndicator
    on:select
    {placeholder}
    {...$$restProps} />
</div>
