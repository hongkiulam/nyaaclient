<script lang="ts">
  import Select from "../atoms/Select.svelte";
  import Input from "../atoms/Input.svelte";
  import { parsedQueryString, searchResults } from "../../store";
  import { updateQuery } from "../../helpers/query";

  $: pageCount =
    Math.ceil(
      $searchResults?.totalRecordCount / $searchResults?.queryRecordCount
    ) || 0;
  $: pageData = Array.from(Array(pageCount).keys()).map((_, i) => {
    const page = (i + 1).toString();
    return { label: page, value: page };
  });
  const sortData = [
    { label: "Date (Descending) - Default", value: "2|false" },
    { label: "Date (Ascending)", value: "2|true" },
    { label: "Name (Descending)", value: "1|false" },
    { label: "Name (Ascending)", value: "1|true" },
    { label: "Size (Descending)", value: "4|false" },
    { label: "Size (Ascending)", value: "4|true" },
    { label: "Seeders (Descending)", value: "5|false" },
    { label: "Seeders (Ascending)", value: "5|true" },
    { label: "Leechers (Descending)", value: "6|false" },
    { label: "Leechers (Ascending)", value: "6|true" },
    { label: "Downloads (Descending)", value: "7|false" },
    { label: "Downloads (Ascending)", value: "7|true" },
  ];

  $: page = $parsedQueryString?.page || "1";
  $: user = $parsedQueryString?.user || "";
  $: sortValue = sortData.find((option) => {
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
    data={sortData}
    on:select={handleSortChange}
    value={sortValue}
    isClearable={false} />
</div>
