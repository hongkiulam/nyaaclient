<script lang="ts">
  export let style: string = "";
</script>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 0.1em var(--paddingS);
    background: var(--main-4);
    border-radius: 1000px;
    color: var(--main2);
    font-size: var(--small);
  }
</style>

<div class="pill" {style}>
  <slot />
</div>
