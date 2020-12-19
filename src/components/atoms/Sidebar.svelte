<script lang="ts">
  import { onDestroy } from "svelte";

  import { XIcon } from "svelte-feather-icons";
  export let side: "left" | "right";
  export let open: boolean = false;
  export let icon: any = XIcon;
  export let title: string = "";

  let sidebarRef;
  const handleClickOutside = (e: MouseEvent) => {
    if (!sidebarRef.contains(e.target) && e.target !== sidebarRef) {
      open = false;
      document.removeEventListener("click", handleClickOutside);
    }
  };
  $: if (open && sidebarRef) {
    document.addEventListener("click", handleClickOutside);
  }
  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<style lang="scss">
  @import "src/styles/global";
  .sidebar {
    display: grid;
    grid-template-rows: $topbarheight auto;
    height: 100%;
    background: var(--main0);
    position: absolute;
    top: 0;
    width: clamp(200px, 30vw, 400px);
    transition: transform 0.3s ease;
    z-index: 5;
  }
  .left {
    left: 0;
    transform: translateX(-100%);
    border-right: 1px solid var(--main-4);
  }
  .right {
    right: 0;
    transform: translateX(100%);
    border-left: 1px solid var(--main-4);
  }
  .open {
    transform: translate(0px);
  }
  header {
    display: grid;
    grid-template-columns: $topbariconarea auto $topbariconarea;
    place-items: center;
  }
  h1 {
    font-size: var(--subheading);
  }
  .sidebar_content {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="sidebar {side}" class:open bind:this={sidebarRef}>
  <header>
    <div class="icon">
      <svelte:component this={icon} size="24" />
    </div>
    <h1>{title}</h1>
    <div
      class="icon"
      style="cursor:pointer"
      on:click={() => {
        open = false;
      }}>
      <XIcon size="24" />
    </div>
  </header>
  <div class="sidebar_content">
    <slot />
  </div>
</div>
