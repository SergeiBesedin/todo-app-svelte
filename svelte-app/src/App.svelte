<script>
  import { v4 as uuidv4 } from 'uuid';
  import { tasks, date } from './store/store';
  import CurrentDate from './components/current-date.svelte';
  import DaysOfTheWeek from './components/days-of-the-week.svelte';
  import TasksList from './components/tasks-list.svelte';
  import EntryField from './components/entry-field.svelte';
  import ModalConfirm from './components/modal-confirm.svelte';

  let currentFilter = 'All';
  tasks.update((items) => {
    return { ...items, [$date.day]: [] };
  });

  const handleAdd = (e) => {
    if (e.detail.text === '') {
      return;
    }
    tasks.update((items) => {
      return {
        ...items,
        [$date.day]: [
          ...items[$date.day],
          {
            id: uuidv4(),
            text: e.detail.text,
            done: false,
          },
        ],
      };
    });
  };

  const handleRemove = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.day]: items[$date.day].filter((item) => {
          return item.id !== e.detail.id;
        }),
      };
    });
  };

  const handleClear = () => {
    if ($tasks[$date.day].length === 0) {
      return;
    }
    document.querySelector('.modal-dialog').style.display = 'block';
    document.querySelector('.container').style.zIndex = '-1';
  };

  const handleConfirmDel = (e) => {
    if (e.detail.conf === true) {
      tasks.update((items) => {
        return { ...items, [$date.day]: [] };
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
      if ($tasks.hasOwnProperty([$date.day])) {
        return;
      } else {
        tasks.update((items) => {
          return { ...items, [$date.day]: [] };
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
        [$date.day]: items[$date.day].map((item) => {
          if (item.id === e.detail.id) {
            return { ...item, done: e.detail.checked };
          } else {
            return item;
          }
        }),
      };
    });
  };

  $: filteredTasks = filterTasks($tasks[$date.day], currentFilter);
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
    />
    <EntryField on:click={handleClear} on:changeText={handleAdd} />
  </main>
</div>

<ModalConfirm on:confirm={handleConfirmDel} />

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
    padding: 15px 15px 10px;
    background: linear-gradient(0deg, #696eff, #f6a9ff);
  }

  main {
    background: #ffffff;
  }
</style>
