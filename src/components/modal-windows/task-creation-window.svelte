<script>
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { date, createTaskData } from '../../store/store';
  import { makeTwoDigits } from '../../utils/utils';
  export let editTask;
  export let visibleTaskCreation;
  export let handleCloseCreateTask = () => handleCloseCreateTask;

  const stateContext = getContext('todos');

  let totalDays = $date.getTotalDays();
  let hour = makeTwoDigits($date.hour);
  let minutes = makeTwoDigits($date.minutes);

  const changeTimeHandler = () => {
    date.update((value) => {
      return { ...value, hour, minutes };
    });
  };

  const handleClickOnOk = () => {
    if (editTask !== true) {
      stateContext.tasks.addTask(
        $date.getFullDate(),
        $date.hour,
        $date.minutes,
        $createTaskData.markersInd,
        $createTaskData.categoryInd,
        $createTaskData.descriptionTask
      );
    } else {
      stateContext.tasks.editTask(
        $date.getFullDate(),
        $date.hour,
        $date.minutes,
        $createTaskData.markersInd,
        $createTaskData.categoryInd,
        $createTaskData.descriptionTask,
        $createTaskData.currentId
      );
    }
    handleCloseCreateTask();
  };
</script>

{#if visibleTaskCreation}
  <div class="task-creation-modal" transition:fade>
    <div class="task-creation-close" on:click />
    <form on:submit|preventDefault={handleClickOnOk}>
      <div class="task-creation">
        <h2>Create task</h2>
        <div class="task-date" on:change>
          <span>Date:</span>

          <select name="select" bind:value={$date.day} disabled={editTask}>
            {#each Array.from({ length: totalDays }) as day, i}
              <option value={i + 1}>{i + 1}</option>
            {/each}
          </select>
          <select
            name="select"
            bind:value={$date.month}
            disabled={editTask}
            on:change={(e) =>
              (totalDays = $date.getTotalDays(Number(e.target.value)))}
          >
            {#each $date.months as month, i}
              <option value={i}>{month}</option>
            {/each}
          </select>
        </div>

        <div class="task-time" on:change={changeTimeHandler}>
          <span>Time:</span>
          <select name="select" bind:value={hour}>
            {#each Array.from({ length: 24 }) as hour, i}
              <option value={makeTwoDigits(i + 1)}
                >{makeTwoDigits(i + 1)}</option
              >
            {/each}
          </select>
          <select name="select" bind:value={minutes}>
            {#each Array.from({ length: 60 }) as minutes, i}
              <option value={makeTwoDigits(i)}>{makeTwoDigits(i)}</option>
            {/each}
          </select>
        </div>

        <div class="task-category">
          <span>Category:</span>
          <select name="select" bind:value={$createTaskData.categoryInd}>
            {#each $createTaskData.category as category, i}
              <option value={i}>{category}</option>
            {/each}
          </select>
        </div>

        <div class="task-marker">
          <span>Marker</span>
          <select name="select" bind:value={$createTaskData.markersInd}>
            {#each $createTaskData.markers as marker, i}
              <option value={i} style={`background-color: ${marker}`}
                >{marker}</option
              >
            {/each}
          </select>
        </div>

        <div class="task-description">
          <textarea
            bind:value={$createTaskData.descriptionTask}
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
{/if}

<style>
  .task-creation-modal {
    user-select: none;
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
    height: 600px;
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
    font-size: 18px;
    font-style: italic;
    font-weight: 600;
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
    text-align: center;
    border-radius: 5px;
  }
</style>
