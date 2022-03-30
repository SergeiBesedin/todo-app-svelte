<script>
  import Sort from './sort.svelte';
  import Filters from './filters.svelte';
  export let filteredTasks;
  export let currentFilter;
</script>

<div class="toolbar">
  <Sort {filteredTasks} />
  <Filters {currentFilter} on:changeFilter />
</div>

<style>
  .toolbar {
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>
