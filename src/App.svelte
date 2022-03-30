<script>
  import { tasks, createTaskData, date } from './store/store';
  import Header from './components/header/header.svelte';
  import Toolbar from './components/toolbar/toolbar.svelte';
  import TaskCreation from './components/modal-windows/task-creation-window.svelte';
  import TasksList from './components/list/tasks-list.svelte';
  import Buttons from './components/buttons.svelte';
  import ModalConfirm from './components/modal-windows/modal-confirm.svelte';

  let currentFilter = 'All';
  let calendarOpen = false;
  let editTaskId = null;
  let editTask = false;

  const updateDate = () => {
    date.update((value) => {
      return {
        ...value,
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        dayOfTheWeek: new Date().getDay(),
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
      };
    });
  };
  updateDate();

  const updateTasks = (date) => {
    if ($tasks.hasOwnProperty(date)) {
      return;
    }
    tasks.update((items) => {
      return { ...items, [date]: [] };
    });
  };
  updateTasks($date.getFullDate());

  const handleChangeFilter = (e) => {
    if (e.detail.filter.tagName === 'SPAN') {
      currentFilter = e.detail.filter.textContent;
    }
  };

  const filterTasks = (tasks, activeFilter) => {
    if (activeFilter === 'Active') {
      return tasks.filter((t) => !t.done);
    } else if (activeFilter === 'Completed') {
      return tasks.filter((t) => t.done);
    } else {
      return [...tasks];
    }
  };

  const handleOpenCreateTask = () => {
    if (calendarOpen) {
      openCalendar();
    }
    document.querySelector('.task-creation-modal').style.display = 'block';
  };

  const openCalendar = () => {
    calendarOpen = !calendarOpen;
    if (calendarOpen) {
      document.querySelector('.calendar-window').style.display = 'block';
    } else {
      document.querySelector('.calendar-window').style.display = 'none';
    }
  };

  const handleEditTaskClick = (e) => {
    editTaskId = e.detail.id;
    editTask = true;
    createTaskData.update((data) => {
      return {
        ...data,
        descriptionTask: e.detail.description,
        categoryInd: e.detail.categoryInd,
        markersInd: e.detail.markersInd,
      };
    });
    date.update((value) => {
      return {
        ...value,
        hour: e.detail.hour,
        minutes: e.detail.minute,
      };
    });
    handleOpenCreateTask();
  };

  $: filteredTasks = filterTasks($tasks[$date.getFullDate()], currentFilter);
</script>

<div class="wrapper">
  <div class="container">
    <div class="app">
      <Header on:click={openCalendar} {updateTasks} />
      <main>
        <Toolbar
          {filteredTasks}
          {currentFilter}
          on:changeFilter={handleChangeFilter}
        />
        <TasksList
          {filteredTasks}
          {currentFilter}
          on:editTaskClick={handleEditTaskClick}
        />
        <Buttons on:click={handleOpenCreateTask} />
      </main>
    </div>
    <TaskCreation
      {editTaskId}
      {editTask}
      on:change={() => updateTasks($date.getFullDate())}
    />
    <ModalConfirm />
  </div>
</div>

<style>
  .wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 500px;
    padding: 5px;
    margin-bottom: 100px;
    margin: 0 auto;
    position: relative;
  }

  .app {
    position: relative;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  }

  main {
    background: #ffffff;
    border-radius: 0 0 5px 5px;
    position: relative;
  }
</style>
