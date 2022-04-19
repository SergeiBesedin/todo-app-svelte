<script>
  import { getContext } from 'svelte';
  import { date } from '../../store/store';
  export let filteredTasks;

  const stateContext = getContext('todos');

  const sortTasksByOption = (e) => {
    if (e.target.value === 'time') {
      stateContext.tasks.sortTasksByTime($date.getFullDate());
    } else {
      stateContext.tasks.sortTasks($date.getFullDate(), e.target.value);
    }
  };
</script>

<div class="sort" class:visible={filteredTasks.length > 1}>
  <select name="select" on:change={sortTasksByOption}>
    <option selected="true" disabled="disabled">Sorting</option>
    <option value="rating">priority</option>
    <option value="time">time</option>
    <option value="done">performed</option>
  </select>
</div>

<style>
  .sort {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  .visible {
    display: block;
  }

  select {
    padding: 5px;
    width: 100px;
    font-size: 15px;
    border-radius: 5px;
  }

  @media (max-width: 445px) {
    select {
      width: 90px;
    }
  }
</style>
