<script>
  import { date } from '../../store/store';
  import CurrentDate from './current-date.svelte';
  import Calendar from './calendar.svelte';
  import DayCarousel from './day-carousel.svelte';
  import user from '../../assets/icons/user.png';
  export let updateTasks = (date) => updateTasks(date);
  export let handleOpenAuthForm = () => handleOpenAuthForm();
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

<div class="current-date">
  <CurrentDate />
  <Calendar {visibleCalendar} on:click on:changeDate={handleChangeDate} />
</div>

<div class="login" on:click={handleOpenAuthForm}>
  <img src={user} alt="login" />
</div>

<div class="day-carousel">
  <DayCarousel on:changeDate={handleChangeDate} />
</div>

<style>
  .current-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 5px;
  }

  .login {
    position: absolute;
    top: 3px;
    right: 3px;
    cursor: pointer;
  }

  .login img {
    width: 24px;
  }

  .day-carousel {
    position: relative;
    overflow: hidden;
    user-select: none;
  }
</style>
