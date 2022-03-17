<script>
  // import { v4 as uuidv4 } from 'uuid';
  import { tasks, date } from './store/store';
  import CurrentDate from './components/current-date.svelte';
  import DaysOfTheWeek from './components/days-of-the-week.svelte';
  import TaskCreation from './components/task-creation-window.svelte';
  import TasksList from './components/tasks-list.svelte';
  import ModalConfirm from './components/modal-confirm.svelte';

  let currentFilter = 'All';
  let dateTask = `${$date.day}.${$date.month}.${$date.year}`;
  tasks.update((items) => {
    return { ...items, [dateTask]: [] };
  });

  // const handleAdd = (e) => {
  //   if (e.detail.text === '') {
  //     return;
  //   }
  //   tasks.update((items) => {
  //     return {
  //       ...items,
  //       [dateTask]: [
  //         ...items[dateTask],
  //         {
  //           id: uuidv4(),
  //           text: e.detail.text,
  //           done: false,
  //           rating: 0,
  //         },
  //       ],
  //     };
  //   });
  // };

  const handleRemove = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [dateTask]: items[dateTask].filter((item) => {
          return item.id !== e.detail.id;
        }),
      };
    });
  };

  const handleClear = () => {
    if ($tasks[dateTask].length === 0) {
      return;
    }
    document.querySelector('.modal-dialog').style.display = 'block';
    document.querySelector('.container').style.zIndex = '-1';
  };

  const handleConfirmDel = (e) => {
    if (e.detail.conf === true) {
      tasks.update((items) => {
        return {
          ...items,
          [dateTask]: [],
        };
      });
    }
    document.querySelector('.modal-dialog').style.display = 'none';
    document.querySelector('.container').style.zIndex = '0';
  };

  const handleChangeDay = (e) => {
    if (e.target.tagName === 'LI') {
      date.update((value) => {
        return {
          ...value,
          day: Number(e.target.id),
          dayOfTheWeek: new Date($date.year, $date.month, e.target.id).getDay(),
        };
      });
      dateTask = `${$date.day}.${$date.month}.${$date.year}`;
      if ($tasks.hasOwnProperty(dateTask)) {
        return;
      } else {
        tasks.update((items) => {
          return {
            ...items,
            [dateTask]: [],
          };
        });
      }
    }
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
        [dateTask]: items[dateTask].map((item) => {
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
        [dateTask]: items[dateTask].map((item) => {
          if (item.id === e.detail.id) {
            return { ...item, rating: e.detail.rating };
          } else {
            return item;
          }
        }),
      };
    });
    tasks.update((items) => {
      return {
        ...items,
        [dateTask]: items[dateTask].sort((a, b) => {
          return b.rating - a.rating;
        }),
      };
    });
  };

  const handleOpenCreateTask = () => {
    document.querySelector('.task-creation-modal').style.display = 'block';
  };

  // const handleOpenBasket = () => {};
  // const handleCloseBasket = () => {};

  $: filteredTasks = filterTasks($tasks[dateTask], currentFilter);
</script>

<div class="wrapper">
  <div class="container">
    <div class="app">
      <header>
        <CurrentDate />
        <DaysOfTheWeek on:click={handleChangeDay} />
      </header>

      <main>
        <TasksList
          {filteredTasks}
          {currentFilter}
          on:remove={handleRemove}
          on:changeFilter={handleChangeFilter}
          on:changeDone={changeDoneHandler}
          on:changeRating={handleChangeRating}
        />

        <div class="entry-field">
          <button on:click={handleOpenCreateTask}>Добавить задачу</button>
          <button on:click={handleClear}>Очистить список</button>
        </div>
      </main>
    </div>
    <TaskCreation />
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
    padding: 10px;
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
    padding: 15px 10px 10px;
    background: linear-gradient(0deg, #696eff, #f6a9ff);
    border-radius: 5px 5px 0 0;
  }

  main {
    background: #ffffff;
    border-radius: 0 0 5px 5px;
  }

  .entry-field {
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
  }

  .entry-field button {
    background: linear-gradient(0deg, #696eff, #f6a9ff);
    color: #ffffff;
    padding: 7px;
    border-radius: 5px;
  }

  .entry-field button:active {
    transform: scale(1.05);
    transition-duration: 300ms;
  }
</style>
