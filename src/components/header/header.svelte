<script>
  import CurrentDate from './current-date.svelte';
  import Calendar from './calendar.svelte';
  import DayCarousel from './day-carousel.svelte';
</script>

<header>
  <div class="header-date">
    <CurrentDate />
    <Calendar on:click on:changeDate />
  </div>
  <DayCarousel on:changeDate />
</header>

<style>
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
</style>
