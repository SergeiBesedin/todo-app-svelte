<script>
  import { v4 as uuidv4 } from 'uuid';
  import { tasks, basket, date } from './store/store';
  import CurrentDate from './components/current-date.svelte';
  import DaysOfTheWeek from './components/days-of-the-week.svelte';
  import TasksList from './components/tasks-list.svelte';
  import EntryField from './components/entry-field.svelte';
  import ModalConfirm from './components/modal-confirm.svelte';

  let currentFilter = 'All';
  let dateTask = `${$date.day}.${$date.month}.${$date.year}`;
  tasks.update((items) => {
    return { ...items, [dateTask]: [] };
  });

  const handleAdd = (e) => {
    if (e.detail.text === '') {
      return;
    }
    tasks.update((items) => {
      return {
        ...items,
        [dateTask]: [
          ...items[dateTask],
          {
            id: uuidv4(),
            text: e.detail.text,
            done: false,
            rating: 0,
          },
        ],
      };
    });
  };

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
        console.log(123);
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

  $: console.log(dateTask);
  $: console.log($tasks);
  // const handleCreateTask = () => {};
  // const handleClose = () => {};

  // const handleOpenBasket = () => {};
  // const handleCloseBasket = () => {};

  $: filteredTasks = filterTasks($tasks[dateTask], currentFilter);
</script>

<div class="container">
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
    <EntryField on:click={handleClear} on:changeText={handleAdd} />
    <button>Создать задачу</button>
  </main>
</div>

<ModalConfirm on:confirm={handleConfirmDel} />

<!-- <div class="task-creation">
  <h2>Create task</h2>
  <div class="task-category">
    <span>Категория:</span>
    <select name="select">
      <option value="value1" selected>Покупки</option>
      <option value="value2">Хобби</option>
      <option value="value3">Спорт</option>
      <option value="value3">Работа</option>
      <option value="value3">Образование</option>
    </select>
  </div>
  <div>
    <input placeholder="Описание" />
  </div>
</div> -->
<style>
  .container {
    z-index: 0;
    position: relative;
    max-width: 470px;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
    margin-top: 100px;
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
</style>
