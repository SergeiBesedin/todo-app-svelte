<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { date } from '../../store/store';
  import calendar from '../../assets/icons/calendar.png';
  export let visibleCalendar;

  const dispatch = createEventDispatcher();

  const clickByMonthHandler = (e) => {
    if (e.target.tagName === 'SPAN') {
      dispatch('changeDate', { day: 1, month: e.target.id });
    }
  };
</script>

<div class="calendar" on:click>
  {#if visibleCalendar}
    <div class="calendar-window" transition:fade>
      <div class="calendar-year">{$date.year}</div>
      <div class="calendar-months" on:click={clickByMonthHandler}>
        {#each $date.months as month, i}
          <span id={i} class:active-month={month === $date.getMonth()}
            >{month}</span
          >
        {/each}
      </div>
    </div>
  {/if}

  <button class="calendar-icon">
    <img src={calendar} alt="calendar" />
  </button>
</div>

<style>
  .calendar {
    border-radius: 50%;
    border: 1px solid #ffffff;
    background-color: #696eff;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .calendar-window {
    position: absolute;
    top: 5px;
    left: 65px;
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
    padding: 0;
    background-color: #696eff;
  }

  .calendar-icon img {
    width: 26px;
    height: 26px;
  }
</style>
