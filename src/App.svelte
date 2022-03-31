<script>
  import { tasks, createTaskData, date } from './store/store';
  import Header from './components/header/header.svelte';
  import Toolbar from './components/toolbar/toolbar.svelte';
  import TaskCreation from './components/modal-windows/task-creation-window.svelte';
  import TasksList from './components/list/tasks-list.svelte';
  import Buttons from './components/buttons.svelte';
  import ModalConfirm from './components/modal-windows/modal-confirm.svelte';
  import Auth from './components/modal-windows/auth-modal.svelte';

  let currentFilter = 'All';
  let editTask = false;
  let visibleTaskCreation = false;
  let visibleCalendar = false;
  let visibleConfirmModal = false;
  let visibleAuthForm = true;

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
    tasks.updateTasks(date);
  };
  updateTasks($date.getFullDate());

  const handleChangeFilter = (e) => {
    currentFilter = e.detail.filter;
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

  const handleCloseAuthForm = () => {
    visibleAuthForm = false;
  };

  const handleOpenCalendar = () => {
    visibleCalendar = !visibleCalendar;
  };

  const handleClearClick = () => {
    visibleConfirmModal = true;
  };

  const handleOpenCreateTask = () => {
    if (visibleCalendar) {
      handleOpenCalendar();
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
    editTask = true;
    createTaskData.update((data) => {
      return {
        ...data,
        descriptionTask: e.detail.description,
        categoryInd: e.detail.categoryInd,
        markersInd: e.detail.markersInd,
        currentId: e.detail.id,
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

  const handleClearList = (confirm) => {
    if (confirm) {
      tasks.clearTasks($date.getFullDate());
    }
    visibleConfirmModal = false;
  };
  $: filteredTasks = filterTasks($tasks[$date.getFullDate()], currentFilter);
</script>

<div class="wrapper">
  <div class="container">
    <div class="app" class:block={visibleConfirmModal}>
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
      {editTask}
      {visibleTaskCreation}
      {handleCloseCreateTask}
      on:click={handleCloseCreateTask}
      on:change={() => updateTasks($date.getFullDate())}
    />
    <ModalConfirm {visibleConfirmModal} {handleClearList} />
    <Auth {visibleAuthForm} on:click={handleCloseAuthForm} />
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

  .block {
    z-index: -1;
  }

  main {
    background: #ffffff;
    border-radius: 0 0 5px 5px;
    position: relative;
  }
</style>
