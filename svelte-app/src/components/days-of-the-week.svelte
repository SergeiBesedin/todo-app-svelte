<script>
  import { date } from '../store/store';

  const calendar = [];
  let totalDays = new Date($date.year, $date.month + 1, 0).getDate();
  for (let i = 1; i <= totalDays; i++) {
    calendar.push(i);
  }
</script>

<ul class="days" on:click>
  {#each calendar as number, i}
    <li id={number} class:active={$date.day == number}>
      {$date.daysOfTheWeek[
        new Date($date.year, $date.month, calendar[i]).getDay()
      ]}
      {number}
    </li>
  {/each}
</ul>

<style>
  .days {
    display: flex;
    justify-content: space-between;
    color: #d1d1d1;
    overflow: hidden;
  }

  .days li {
    cursor: pointer;
    padding: 0 5px;
  }

  .active {
    color: #ffffff;
    font-weight: 700;
  }
</style>
