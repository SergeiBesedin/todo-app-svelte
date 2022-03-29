<script>
  import TaskItem from './task-item/task.svelte';
  export let filteredTasks;
  export let currentFilter;

  const textMessage = {
    All: "You haven't planned anything for this day yet",
    Active: 'No active tasks',
    Completed: "You haven't completed any tasks yet",
  };
</script>

<div class="tasks-list">
  {#each filteredTasks as { done, description, hour, minute, markersInd, categoryInd, id, rating } (id)}
    <TaskItem
      {done}
      {description}
      {id}
      {hour}
      {minute}
      {markersInd}
      {categoryInd}
      {rating}
      on:remove
      on:changeDone
      on:changeRating
      on:editTaskClick
    />
  {:else}
    <p class="message">{textMessage[currentFilter]}</p>
  {/each}
</div>

<style>
  .tasks-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    overflow: auto;
  }

  .message {
    padding: 15px;
    font-style: italic;
  }
</style>
