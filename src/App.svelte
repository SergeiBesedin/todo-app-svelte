<script>
  import { setContext, onMount } from 'svelte';
  import { tasks, createTaskData, date } from './store/store';
  import BaseLayout from './layouts/base-layout.svelte';
  import Header from './components/header/header.svelte';
  import Toolbar from './components/toolbar/toolbar.svelte';
  import ModalTaskCreation from './components/modal-windows/task-creation-window.svelte';
  import ModalConfirm from './components/modal-windows/modal-confirm.svelte';
  import ModalAuth from './components/modal-windows/auth-modal.svelte';
  import TasksList from './components/list/tasks-list.svelte';
  import Buttons from './components/buttons.svelte';
  import { autoLogin } from './utils/utils';

  setContext('todos', { tasks });

  let currentFilter = 'All';
  let editTask = false;
  let visibleTaskCreation = false;
  let visibleCalendar = false;
  let visibleConfirmModal = false;
  let visibleAuthForm = false;

  //Проверка токена на наличие
  onMount(() => {
    autoLogin();
  });

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

  const handleOpenAuthForm = () => {
    visibleAuthForm = true;
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
    <div class="todo" class:block={visibleConfirmModal}>
      <BaseLayout>
        <div slot="header">
          <Header
            {visibleCalendar}
            on:click={handleOpenCalendar}
            {handleOpenAuthForm}
            {updateTasks}
          />
        </div>
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
      </BaseLayout>
    </div>
    <ModalTaskCreation
      {editTask}
      {visibleTaskCreation}
      {handleCloseCreateTask}
      on:click={handleCloseCreateTask}
      on:change={() => updateTasks($date.getFullDate())}
    />
    <ModalConfirm {visibleConfirmModal} {handleClearList} />
    <ModalAuth {visibleAuthForm} {handleCloseAuthForm} />
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

  .todo {
    position: relative;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  }

  .block {
    z-index: -1;
  }
</style>
