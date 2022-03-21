<script>
  import { v4 as uuidv4 } from 'uuid';
  import { tasks, createTaskData, date } from './store/store';
  import CurrentDate from './components/current-date.svelte';
  import DaysOfTheWeek from './components/days-of-the-week.svelte';
  import TaskCreation from './components/task-creation-window.svelte';
  import TasksList from './components/tasks-list.svelte';
  import ModalConfirm from './components/modal-confirm.svelte';
  import clearIcon from './assets/icons/clear.png';

  let currentFilter = 'All';
  let fullDate = `${$date.day}.${$date.month + 1}.${$date.year}`;

  const updateTasks = (date) => {
    if ($tasks.hasOwnProperty(date)) {
      return;
    }
    tasks.update((items) => {
      return { ...items, [date]: [] };
    });
  };
  updateTasks(fullDate);

  const handleAddTask = (e) => {
    fullDate = e.detail.dateTask;
    updateTasks(fullDate);
    tasks.update((items) => {
      return {
        ...items,
        [fullDate]: [
          ...items[fullDate],
          {
            id: uuidv4(),
            time: e.detail.timeTask,
            category: e.detail.selectedCategory,
            marker: e.detail.selectedColor,
            description: e.detail.description,
            done: false,
            rating: 0,
          },
        ],
      };
    });
    createTaskData.update((items) => {
      return { ...items, descriptionTask: '' };
    });
  };

  const handleRemove = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [fullDate]: items[fullDate].filter((item) => {
          return item.id !== e.detail.id;
        }),
      };
    });
  };

  const handleClear = () => {
    if ($tasks[fullDate].length === 0) {
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
          [fullDate]: [],
        };
      });
    }
    document.querySelector('.modal-dialog').style.display = 'none';
    document.querySelector('.container').style.zIndex = '0';
  };

  const handleChangeDay = (e) => {
    date.update((value) => {
      return {
        ...value,
        day: Number(e.detail.day),
        dayOfTheWeek: new Date($date.year, $date.month, e.detail.day).getDay(),
      };
    });
    fullDate = `${$date.day}.${$date.month + 1}.${$date.year}`;
    updateTasks(fullDate);
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
        [fullDate]: items[fullDate].map((item) => {
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
        [fullDate]: items[fullDate].map((item) => {
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
        [fullDate]: items[fullDate].sort((a, b) => {
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

  $: filteredTasks = filterTasks($tasks[fullDate], currentFilter);
</script>

<div class="wrapper">
  <div class="container">
    <div class="app">
      <header>
        <CurrentDate />
        <DaysOfTheWeek on:changeDay={handleChangeDay} />
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

        <div class="buttons">
          <button class="btn-add" on:click={handleOpenCreateTask} />
          <div
            class="btn-clear"
            class:visible={$tasks[fullDate].length > 0}
            on:click={handleClear}
          >
            <img src={clearIcon} alt="clear" />
          </div>
        </div>
      </main>
    </div>
    <TaskCreation on:addTask={handleChangeDay} on:addTask={handleAddTask} />
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

  .buttons {
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
  }

  .btn-add {
    width: 50px;
    height: 50px;
    background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff),
      #696eff;
    background-position: center;
    background-size: 50% 2px, 2px 50%;
    background-repeat: no-repeat;
    border-radius: 50%;
    transition-duration: 300ms;
  }

  .btn-add:hover {
    transform: scale(1.1);
  }

  .btn-clear {
    width: 50px;
    height: 50px;
    background: #c55151;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    display: none;
    padding: 6px;
    box-sizing: border-box;
  }

  .btn-clear img {
    width: 35px;
  }

  .visible {
    display: block;
  }
</style>
