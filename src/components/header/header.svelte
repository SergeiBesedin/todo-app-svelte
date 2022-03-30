<script>
  import { date } from '../../store/store';
  import CurrentDate from './current-date.svelte';
  import Calendar from './calendar.svelte';
  import DayCarousel from './day-carousel.svelte';
  export let updateTasks = (date) => updateTasks(date);
  export let visibleCalendar;

  const handleChangeDate = (e) => {
    date.update((value) => {
      return {
        ...value,
        day: Number(e.detail.day),
        month: Number(e.detail.month),
        dayOfTheWeek: new Date($date.year, $date.month, e.detail.day).getDay(),
      };
    });
    updateTasks($date.getFullDate());
  };
</script>

<header>
  <div class="header-date">
    <CurrentDate />
    <Calendar {visibleCalendar} on:click on:changeDate={handleChangeDate} />
  </div>
  <DayCarousel on:changeDate={handleChangeDate} />
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
