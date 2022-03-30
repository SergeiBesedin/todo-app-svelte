<script>
  import { tasks, createTaskData, date } from './store/store';
  import Header from './components/header/header.svelte';
  import Toolbar from './components/toolbar/toolbar.svelte';
  import TaskCreation from './components/modal-windows/task-creation-window.svelte';
  import TasksList from './components/list/tasks-list.svelte';
  import Buttons from './components/buttons.svelte';
  import ModalConfirm from './components/modal-windows/modal-confirm.svelte';

  let currentFilter = 'All';
  let editTaskId;
  let editTask = false;
  let visibleTaskCreation = false;
  let visibleCalendar = false;
  let visibleConfirmModal = false;

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
      return tasks.filter((task) => !task.done);
    } else if (activeFilter === 'Completed') {
      return tasks.filter((task) => task.done);
    } else {
      return [...tasks];
    }
  };

  const handleOpenCalendar = () => {
    visibleCalendar = !visibleCalendar;
  };

  const handleClearClick = () => {
    visibleConfirmModal = true;
  };

  const handleOpenCreateTask = () => {
    if (visibleCalendar) {
      openCalendar();
    }
    visibleTaskCreation = true;
  };

  const handleCloseCreateTask = () => {
    editTask = false;
    createTaskData.update((items) => {
      return {
        ...items,
        descriptionTask: '',
        categoryInd: 0,
        markersInd: 0,
      };
    });
    visibleTaskCreation = false;
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

  const handleConfirmDel = (confirm) => {
    if (confirm) {
      tasks.update((items) => {
        return {
          ...items,
          [$date.getFullDate()]: [],
        };
      });
    }
    visibleConfirmModal = false;
  };
  $: filteredTasks = filterTasks($tasks[$date.getFullDate()], currentFilter);
</script>

<div class="wrapper">
  <div class="container">
    <div class="app">
      <Header {visibleCalendar} on:click={handleOpenCalendar} {updateTasks} />
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
        <Buttons {handleOpenCreateTask} {handleClearClick} />
      </main>
    </div>
    <TaskCreation
      {editTaskId}
      {editTask}
      {visibleTaskCreation}
      {handleCloseCreateTask}
      on:click={handleCloseCreateTask}
      on:change={() => updateTasks($date.getFullDate())}
    />
    <ModalConfirm {visibleConfirmModal} {handleConfirmDel} />
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
