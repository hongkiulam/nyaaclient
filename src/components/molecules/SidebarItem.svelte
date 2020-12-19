<script lang="ts">
  export let title: string | number;
  export let subtitle: string = "";
</script>

<style lang="scss">
  .sidebar_item {
    display: flex;
    align-items: center;
    width: 100%;
    background: var(--main0);
    color: var(--main-4);
    padding: var(--paddingS);
    border-bottom: 1px solid var(--main-3);
    &:hover {
      border-bottom-color: white;
      background: var(--main-1);
    }
  }
  .left {
    flex: 1;
    display: grid;
    grid-auto-flow: row;
    gap: var(--paddingS);
    cursor: pointer;
    margin-right: var(--paddingS);
  }
  .right {
    display: flex;
  }
  .titles {
    display: flex;
    justify-content: space-between;
    span {
      margin-right: 5px;
    }
    h2 {
      font-size: var(--small);
      white-space: nowrap;
    }
  }
</style>

<div class="sidebar_item">
  <div class="left" on:click>
    <div class="titles">
      <span>{title}</span>
      <h2>{subtitle}</h2>
    </div>
    <slot name="body" />
  </div>
  <div class="right">
    <slot name="icons" />
  </div>
</div>
