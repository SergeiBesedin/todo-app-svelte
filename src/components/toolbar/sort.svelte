<script>
  import { tasks, date } from '../../store/store';
  export let filteredTasks;

  const sortTasksByOption = (e) => {
    if (e.target.value === 'time') {
      tasks.update((items) => {
        return {
          ...items,
          [$date.getFullDate()]: items[$date.getFullDate()].sort((a, b) => {
            return `${a.hour}${a.minute}` - `${b.hour}${b.minute}`;
          }),
        };
      });
    } else {
      tasks.update((items) => {
        return {
          ...items,
          [$date.getFullDate()]: items[$date.getFullDate()].sort((a, b) => {
            return b[e.target.value] - a[e.target.value];
          }),
        };
      });
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
