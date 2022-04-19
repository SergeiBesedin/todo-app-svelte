<script>
  import { date } from '../../store/store';
  import Calendar from './calendar.svelte';
  export let visibleCalendar;
</script>

<div class="current-date">
  <Calendar {visibleCalendar} on:click on:changeDate />
  <div class="date">
    <span>{$date.day}</span>
    <span>{$date.getMonth()}, {$date.year}</span>
    <span>{$date.getDayOfTheWeek()}</span>
  </div>
</div>

<style>
  .current-date {
    display: flex;
    align-items: center;
  }

  .date {
    display: grid;
    max-width: 150px;
    margin-right: 10px;
    grid-template-areas:
      'A B'
      'A C';
    color: #ffffff;
  }

  .date span:first-child {
    font-size: 50px;
    grid-area: A;
    font-weight: 600;
    padding-right: 10px;
  }

  .date :nth-child(2) {
    grid-area: C;
    font-size: 18px;
    color: #d1d1d1;
  }

  .date span:last-child {
    align-self: flex-end;
    grid-area: B;
    font-size: 18px;
  }
</style>
