<script lang="ts">
  import Select from "../atoms/Select.svelte";
  import Input from "../atoms/Input.svelte";
  import { parsedQueryString, searchResults } from "../../store";
  import { updateQuery } from "../../helpers/query";
  import { sortOptions } from "../../helpers/constants";

  $: pageCount =
    Math.ceil(
      $searchResults?.totalRecordCount / $searchResults?.queryRecordCount
    ) || 0;
  $: pageData = Array.from(Array(pageCount).keys()).map((_, i) => {
    const page = (i + 1).toString();
    return { label: page, value: page };
  });

  $: page = $parsedQueryString?.page || "1";
  $: user = $parsedQueryString?.user || "";
  $: sortValue = sortOptions.find((option) => {
    const { sort, order } = $parsedQueryString;
    return option.value === `${sort}|${order}`;
  });

  const handlePageChange = (e) => {
    const page = e.detail;
    if (page.value === "1" && !$parsedQueryString?.page) return;
    if (page.value !== $parsedQueryString?.page) {
      updateQuery({ page: page.value });
    }
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    if (username !== $parsedQueryString?.u) {
      updateQuery({ user: username });
    }
  };

  const handleSortChange = (e) => {
    const sort = e.detail.value;
    const [sortId, sortOrder] = sort.split("|");
    updateQuery({ sort: sortId, order: sortOrder });
  };
</script>

<style>
  .filter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--padding);
  }
</style>

<div class="filter">
  <Select
    placeholder="Page"
    containerStyles="height:auto"
    data={pageData}
    on:select={handlePageChange}
    value={{ label: page, value: page }}
    isClearable={false} />
  <Input placeholder="Username" on:change={handleUsernameChange} value={user} />
  <Select
    placeholder="Sort By"
    containerStyles="height:auto"
    data={sortOptions}
    on:select={handleSortChange}
    value={sortValue}
    isClearable={false} />
</div>
