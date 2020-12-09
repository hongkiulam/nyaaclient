<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./components/pages/Home.svelte";
  import Torrents from "./components/pages/Torrents.svelte";
  const routes = new Map();
  routes.set("/torrents/:id?", Torrents);
  routes.set("/:query?", Home);
</script>

<style lang="scss">
  main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<main>
  <Router {routes} />
  <a href="#/">home</a>
  <a href="#/?q=haikyuu">home with search</a>

  <a href="#/torrents">torrents</a>
</main>
