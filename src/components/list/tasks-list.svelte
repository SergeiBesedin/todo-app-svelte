<script>
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
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
    <div animate:flip={{ deration: 500 }} class="task-item">
      <TaskItem
        {done}
        {description}
        {id}
        {hour}
        {minute}
        {markersInd}
        {categoryInd}
        {rating}
        on:editTaskClick
      />
    </div>
  {:else}
    <p in:fade={{ delay: 500, duration: 300 }} class="message">
      {textMessage[currentFilter]}
    </p>
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

  .task-item {
    width: 90%;
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  }

  .message {
    padding: 15px;
    font-style: italic;
  }
</style>
