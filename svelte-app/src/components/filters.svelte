<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let currentFilter;

  const filters = [
    { filter: 'All' },
    { filter: 'Active' },
    { filter: 'Completed' },
  ];

  const changeFilter = (e) => {
    dispatch('changeFilter', {
      filter: e.target,
    });
  };
</script>

<div class="filters" on:click={changeFilter}>
  {#each filters as { filter }}
    <span class:active={filter === currentFilter}>{filter}</span>
  {/each}
</div>

<style>
  .filters {
    display: flex;
    justify-content: space-around;
    padding: 5px 0;
    background: #d1d1d1;
    color: #ffffff;
    font-weight: 600;
  }

  .filters span {
    cursor: pointer;
  }

  .active {
    color: rgb(238, 63, 159);
  }
</style>
