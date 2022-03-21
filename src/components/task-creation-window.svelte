<script>
  import { createEventDispatcher } from 'svelte';
  import { date, createTaskData } from '../store/store';

  const dispatch = createEventDispatcher();
  let selectedYear = $date.year;
  let selectedMonth = $date.month + 1;
  let selectedDay = $date.day;
  let selectedHour = $date.hour;
  let selectedMinute = $date.minutes;
  let selectedCategory = $date.category;
  let selectedColor = $createTaskData.markers[0];
  let description = $createTaskData.descriptionTask;
  $: totalDays = $date.getTotalDays();

  const handleAddTask = (e) => {
    e.preventDefault();
    let dateTask = `${selectedDay}.${selectedMonth}.${selectedYear}`;
    let timeTask = `${selectedHour}:${selectedMinute}`;
    dispatch('addTask', {
      dateTask,
      timeTask,
      selectedCategory,
      selectedColor,
      description,
      day: selectedDay,
    });
    handleCloseCreateTask();
    description = '';
  };

  const handleCloseCreateTask = () => {
    document.querySelector('.task-creation-modal').style.display = 'none';
  };
</script>

<div class="task-creation-modal">
  <div class="task-creation-close" on:click={handleCloseCreateTask} />
  <form on:submit={handleAddTask}>
    <div class="task-creation">
      <h2>Create task</h2>
      <div class="task-date">
        <span>Date:</span>
        <select name="select" bind:value={selectedDay}>
          {#each Array.from({ length: totalDays }) as day, i}
            <option value={i + 1}>{i + 1}</option>
          {/each}
        </select>
        -
        <select
          name="select"
          bind:value={selectedMonth}
          on:change={(e) =>
            (totalDays = $date.getTotalDays(e.target.value - 1))}
        >
          {#each $date.months as month, i}
            <option value={i + 1}>{month}</option>
          {/each}
        </select>
        -
        <select name="select" bind:value={selectedYear}>
          <option value={selectedYear} selected>{$date.year}</option>
        </select>
      </div>

      <div class="task-time">
        <span>Time:</span>
        <select name="select" bind:value={selectedHour}>
          {#each Array.from({ length: 24 }) as hour, i}
            <option value={i + 1}>{i + 1}</option>
          {/each}
        </select>
        :
        <select name="select" bind:value={selectedMinute}>
          {#each Array.from({ length: 61 }) as minutes, i}
            <option value={i}>{i}</option>
          {/each}
        </select>
      </div>

      <div class="task-category">
        <span>Category:</span>
        <select name="select" bind:value={selectedCategory}>
          {#each $createTaskData.category as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <div class="task-marker">
        <span>Marker</span>
        <select name="select" bind:value={selectedColor}>
          {#each $createTaskData.markers as marker}
            <option value={marker} style={`color: ${marker}`}>{marker}</option>
          {/each}
        </select>
      </div>

      <div class="task-description">
        <textarea
          bind:value={description}
          maxlength="30"
          minlength="5"
          required
          name="description"
          placeholder="Description"
        />
      </div>

      <div class="task-action">
        <button class="task-add" type="submit">
          <div class="check" />
        </button>
      </div>
    </div>
  </form>
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
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity ease 0.5s;
  }

  .task-creation-close:hover {
    opacity: 0.5;
  }

  .task-creation-close::before,
  .task-creation-close::after {
    content: '';
    position: absolute;
    top: 10px;
    display: block;
    width: 24px;
    height: 3px;
    background: #ffffff;
  }

  .task-creation-close::before {
    transform: rotate(45deg);
  }

  .task-creation-close::after {
    transform: rotate(-45deg);
  }

  .task-creation h2,
  .task-date,
  .task-time,
  .task-category,
  .task-description,
  .task-marker,
  .task-action {
    border-bottom: 1px solid #ffffff;
    padding-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  .task-marker {
    border: none;
    padding: 0;
  }

  .task-description {
    padding: 0;
    border: none;
  }

  .task-description textarea {
    resize: none;
    border: none;
    background: #f0efef;
    padding: 7px;
    width: 100%;
    height: 170px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .task-action {
    border: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .task-add {
    width: 50px;
    height: 50px;
    background: #f6a9ff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition-duration: 300ms;
  }

  .task-add:hover {
    transform: scale(1.1);
  }

  .check {
    border: none;
    padding: 0;
    display: inline-block;
    width: 12px;
    height: 24px;
    margin-bottom: 10px;
    border: solid #ffffff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  select {
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
  }
</style>
