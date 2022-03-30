<script>
  import { createEventDispatcher } from 'svelte';
  import { date } from '../../store/store';
  import calendar from '../../assets/icons/calendar.png';

  const dispatch = createEventDispatcher();

  const clickByMonthHandler = (e) => {
    if (e.target.tagName === 'SPAN') {
      dispatch('changeDate', { day: 1, month: e.target.id });
    }
  };
</script>

<div class="calendar">
  <div class="calendar-window">
    <div class="calendar-year">{$date.year} г.</div>
    <div class="calendar-months" on:click={clickByMonthHandler}>
      {#each $date.months as month, i}
        <span id={i} class:active-month={month === $date.getMonth()}
          >{month}</span
        >
      {/each}
    </div>
  </div>

  <div class="calendar-icon" on:click>
    <img src={calendar} alt="calendar" />
  </div>
</div>

<style>
  .calendar {
    display: flex;
    align-items: center;
  }

  .calendar-window {
    position: absolute;
    top: 5px;
    right: 50px;
    display: none;
    color: #ffffff;
    background: #ffffff;
    border-radius: 5px;
    max-width: 220px;
    margin-right: 10px;
    color: #000000;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  }

  .calendar-year {
    border-bottom: 1px solid #f6a9ff;
    text-align: center;
    padding: 3px;
    font-weight: 600;
  }

  .calendar-months {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 3px;
  }

  .active-month {
    border-bottom: 1px solid #f6a9ff;
  }

  .calendar-months span {
    cursor: pointer;
    margin-right: 7px;
  }

  .calendar-icon {
    cursor: pointer;
  }
</style>
