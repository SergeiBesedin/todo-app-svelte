<script>
  export let currentDay;
  export let daysOfTheWeek;
</script>

<ul class="days" on:click>
  {#each daysOfTheWeek as day, i}
    <li id={i} class:active={i == currentDay}>{day}</li>
  {/each}
</ul>

<style>
  .days {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    color: #d1d1d1;
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
