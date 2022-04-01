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

<div class="header-date">
  <CurrentDate />
  <Calendar {visibleCalendar} on:click on:changeDate={handleChangeDate} />
</div>
<div class="day-carousel">
  <DayCarousel on:changeDate={handleChangeDate} />
</div>

<style>
  .header-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 5px;
  }

  .day-carousel {
    position: relative;
    overflow: hidden;
    user-select: none;
  }
</style>
