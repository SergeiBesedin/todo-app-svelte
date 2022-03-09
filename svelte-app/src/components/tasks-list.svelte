<script>
  import Filters from './filters.svelte';
  import TaskItem from './task.svelte';
  export let filteredTasks;
  export let currentFilter;

  const textMessage = {
    All: 'На этот день Вы еще ничего не планировали',
    Active: 'Нет активных задач',
    Completed: 'Вы еще не выполнини ни одной задачи',
  };
</script>

<div class="tasks-list">
  <Filters on:changeFilter {currentFilter} />
  {#if filteredTasks.length === 0}
    <p class="message">{textMessage[currentFilter]}</p>
  {:else}
    {#each filteredTasks as { done, text, id } (id)}
      <TaskItem {done} {text} {id} on:remove on:changeDone />
    {/each}
  {/if}
</div>

<style>
  .tasks-list {
    min-height: 400px;
  }

  .message {
    padding: 15px;
    font-style: italic;
  }
</style>
