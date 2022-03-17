<script>
  import { createEventDispatcher } from 'svelte';
  import { date, createTaskData } from '../store/store';

  const dispatch = createEventDispatcher();

  let selected = $date.month + 1;
  let currentDate = $date.day;
  $: totalDays = $date.getTotalDays();

  const handleCloseCreateTask = () => {
    document.querySelector('.task-creation-modal').style.display = 'none';
  };
</script>

<div class="task-creation-modal">
  <div class="task-creation-close">
    <button on:click={handleCloseCreateTask}>Закрыть</button>
  </div>

  <div class="task-creation">
    <h2>Create task</h2>

    <div class="task-date">
      <span>Date:</span>
      <select name="select" bind:value={currentDate}>
        {#each Array.from({ length: totalDays }) as day, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
      -
      <select
        name="select"
        bind:value={selected}
        on:change={(e) => (totalDays = $date.getTotalDays(e.target.value - 1))}
      >
        {#each $date.months as month, i}
          <option value={i + 1}>{month}</option>
        {/each}
      </select>
      -
      <select name="select">
        <option value="value-1" selected>{$date.year}</option>
      </select>
    </div>

    <div class="task-time">
      <span>Time:</span>
      <select name="select" bind:value={$date.hour}>
        {#each Array.from({ length: 24 }) as hour, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
      :
      <select name="select" bind:value={$date.minutes}>
        {#each Array.from({ length: 61 }) as minutes, i}
          <option value={i}>{i}</option>
        {/each}
      </select>
    </div>

    <div class="task-category">
      <span>Category:</span>
      <select name="select">
        {#each $createTaskData.category as category, i}
          <option value={i + 1}>{category}</option>
        {/each}
      </select>
    </div>
    <div class="task-description">
      <textarea name="description" placeholder="Description" />
    </div>

    <div class="task-action">
      <button>Добавить</button>
    </div>
  </div>
</div>

<style>
  .task-creation-modal {
    display: none;
    z-index: 101;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
    position: absolute;
    top: 22px;
    right: 3px;
    left: 3px;
  }

  .task-creation {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 570px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    background: linear-gradient(0deg, #696eff, #f6a9ff);
  }

  .task-creation-close {
    z-index: 102;
    position: absolute;
    top: 3px;
    right: 5px;
  }

  .task-creation h2,
  .task-date,
  .task-time,
  .task-category,
  .task-description,
  .task-action {
    border-bottom: 1px solid #ffffff;
    padding-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  .task-category {
    border: none;
    padding: 0;
  }

  .task-description {
    border: none;
  }

  .task-description {
    padding: 0;
  }

  .task-action {
    border: none;
    padding: 0;
  }

  select {
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
  }

  textarea {
    resize: none;
    border: none;
    background: #f0efef;
    padding: 7px;
    width: 100%;
    height: 170px;
    box-sizing: border-box;
    font-size: 14px;
  }
</style>
