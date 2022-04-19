<script>
  import { authData, date } from '../../store/store';
  import CurrentDate from './current-date.svelte';
  import DayCarousel from './day-carousel.svelte';
  import { logout } from '../../utils/utils';
  import loginIcon from '../../assets/icons/login.png';
  import logoutIcon from '../../assets/icons/logout.png';
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

  const loginOrLogout = () => {
    if ($authData.token) {
      logout();
    } else {
      handleOpenAuthForm();
    }
  };
</script>

<div class="current-date">
  <CurrentDate {visibleCalendar} on:click on:changeDate={handleChangeDate} />
  <button class="login" on:click={loginOrLogout}>
    {#if !$authData.token}
      <img src={loginIcon} alt="login" />
    {:else}
      <img src={logoutIcon} alt="logout" />
    {/if}
  </button>
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
    border: 1px solid #ffffff;
    border-radius: 50%;
    background-color: #696eff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .login img {
    width: 24px;
    height: 24px;
  }

  .day-carousel {
    position: relative;
    overflow: hidden;
    user-select: none;
  }
</style>
