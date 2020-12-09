<script lang="ts">
  export let value: string;
  export let large: boolean = false;
  export let placeholder: string = "";
</script>

<style lang="scss">
  input {
    width: 100%;
    transition: all 0.3s ease;
  }
  .large {
    font-size: var(--heading);
  }
</style>

<input class:large type="text" bind:value {placeholder} on:change />
