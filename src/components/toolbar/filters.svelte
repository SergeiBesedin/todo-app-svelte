<script>
  import { createEventDispatcher } from 'svelte';
  export let currentFilter;

  const dispatch = createEventDispatcher();
  const filters = [
    { filter: 'All' },
    { filter: 'Active' },
    { filter: 'Completed' },
  ];

  const changeFilter = (e) => {
    if (e.target.tagName === 'SPAN') {
      dispatch('changeFilter', {
        filter: e.target.textContent,
      });
    }
  };
</script>

<div class="filters" on:click={changeFilter}>
  {#each filters as { filter }}
    <span class:active={filter === currentFilter}>{filter}</span>
  {/each}
</div>

<style>
  .filters {
    padding: 5px;
    background: #d1d1d1;
    color: #ffffff;
    font-weight: 600;
    border-radius: 0 0 5px 5px;
    opacity: 0.7;
  }

  .filters span {
    cursor: pointer;
  }

  .filters span:not(:last-child) {
    margin-right: 10px;
  }

  .active {
    color: rgb(238, 63, 159);
  }
</style>
