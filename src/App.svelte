<script>
  import { v4 as uuidv4 } from 'uuid';
  import { tasks, createTaskData, date } from './store/store';
  import CurrentDate from './components/current-date.svelte';
  import Calendar from './components/calendar.svelte';
  import DaysOfTheWeek from './components/days-of-the-week.svelte';
  import TaskCreation from './components/task-creation-window.svelte';
  import Filters from './components/filters.svelte';
  import Sort from './components/sort.svelte';
  import TasksList from './components/tasks-list.svelte';
  import Buttons from './components/buttons.svelte';
  import ModalConfirm from './components/modal-confirm.svelte';

  let currentFilter = 'All';
  let calendarOpen = false;
  let editTaskId = null;
  let editTask = false;

  const updateTasks = (date) => {
    if ($tasks.hasOwnProperty(date)) {
      return;
    }
    tasks.update((items) => {
      return { ...items, [date]: [] };
    });
  };
  updateTasks($date.getFullDate());

  const handleCloseCreateTask = () => {
    document.querySelector('.task-creation-modal').style.display = 'none';
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    updateTasks($date.getFullDate());
    if (editTask === true) {
      handleEditTask();
      editTask = false;
    } else {
      tasks.update((items) => {
        return {
          ...items,
          [$date.getFullDate()]: [
            ...items[$date.getFullDate()],
            {
              id: uuidv4(),
              hour: $date.hour,
              minute: $date.minutes,
              markersInd: $createTaskData.markersInd,
              categoryInd: $createTaskData.categoryInd,
              description: $createTaskData.descriptionTask,
              done: false,
              rating: 0,
            },
          ],
        };
      });
    }
    createTaskData.update((items) => {
      return { ...items, descriptionTask: '' };
    });
    handleCloseCreateTask();
  };

  const handleRemove = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].filter((item) => {
          return item.id !== e.detail.id;
        }),
      };
    });
  };

  const handleConfirmDel = (e) => {
    if (e.detail.conf === true) {
      tasks.update((items) => {
        return {
          ...items,
          [$date.getFullDate()]: [],
        };
      });
    }
    document.querySelector('.modal-dialog').style.display = 'none';
    document.querySelector('.container').style.zIndex = '0';
  };

  const handleChangeDate = (e) => {
    if (calendarOpen) {
      openCalendar();
    }
    date.update((value) => {
      return {
        ...value,
        day: Number(e.detail.day),
        month: Number(e.detail.month),
        dayOfTheWeek: new Date($date.year, $date.month, e.detail.day).getDay(),
      };
    });
    updateTasks($date.getFullDate());
  };

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

  const changeDoneHandler = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].map((item) => {
          if (item.id === e.detail.id) {
            return { ...item, done: e.detail.checked };
          } else {
            return item;
          }
        }),
      };
    });
  };

  const handleChangeRating = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].map((item) => {
          if (item.id === e.detail.id) {
            return { ...item, rating: e.detail.rating };
          } else {
            return item;
          }
        }),
      };
    });
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

  const sortTasksByOption = (e) => {
    if (e.detail.option === 'category') {
      tasks.update((items) => {
        return {
          ...items,
          [$date.getFullDate()]: items[$date.getFullDate()].sort((a, b) => {
            return b.category.length - a.category.length;
          }),
        };
      });
    } else if (e.detail.option === 'time') {
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
            return b[e.detail.option] - a[e.detail.option];
          }),
        };
      });
    }
  };

  const handleEditTaskClick = (e) => {
    editTaskId = e.detail.id;
    editTask = true;
    createTaskData.update((data) => {
      return {
        ...data,
        descriptionTask: e.detail.description,
      };
    });
    date.update((value) => {
      return {
        ...value,
        hour: e.detail.hour,
        minutes: e.detail.minutes,
      };
    });
    handleOpenCreateTask();
  };

  const handleEditTask = () => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].map((item) => {
          if (item.id === editTaskId) {
            return {
              ...item,
              hour: $date.hour,
              minute: $date.minutes,
              markersInd: $createTaskData.markersInd,
              categoryInd: $createTaskData.categoryInd,
              description: $createTaskData.descriptionTask,
            };
          } else {
            return item;
          }
        }),
      };
    });
  };

  $: console.log($date.hour);

  // const handleOpenBasket = () => {};
  // const handleCloseBasket = () => {};

  $: filteredTasks = filterTasks($tasks[$date.getFullDate()], currentFilter);
</script>

<div class="wrapper">
  <div class="container">
    <div class="app">
      <header>
        <div class="header-date">
          <CurrentDate />
          <Calendar on:click={openCalendar} on:changeDate={handleChangeDate} />
        </div>
        <DaysOfTheWeek on:changeDate={handleChangeDate} />
      </header>

      <div class="sidebar">
        <Sort {filteredTasks} on:sort={sortTasksByOption} />
        <Filters {currentFilter} on:changeFilter={handleChangeFilter} />
      </div>

      <main>
        <TasksList
          {filteredTasks}
          {currentFilter}
          on:remove={handleRemove}
          on:changeDone={changeDoneHandler}
          on:changeRating={handleChangeRating}
          on:editTaskClick={handleEditTaskClick}
        />
        <Buttons on:click={handleOpenCreateTask} />
      </main>
    </div>
    <TaskCreation
      on:submit={handleAddTask}
      on:click={handleCloseCreateTask}
      on:change={() => updateTasks($date.getFullDate())}
    />
  </div>
  <ModalConfirm on:confirm={handleConfirmDel} />
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
    z-index: 0;
    position: relative;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  }

  header {
    position: relative;
    padding: 15px 10px 10px;
    background: linear-gradient(0deg, #696eff, #f6a9ff);
    border-radius: 5px 5px 0 0;
  }

  .header-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 5px;
  }

  main {
    background: #ffffff;
    border-radius: 0 0 5px 5px;
    position: relative;
  }

  .sidebar {
    background: #ffffff;
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>
