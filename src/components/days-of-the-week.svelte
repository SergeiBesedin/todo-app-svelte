<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { date } from '../store/store';
  import arrowNext from '../assets/icons/next-arrow.png';
  import arrowPrev from '../assets/icons/prev-arrow.png';

  const dispatch = createEventDispatcher();
  const { year, month, daysOfTheWeek } = $date;
  const calendar = [];
  let currentPosition = $date.day;

  for (let i = 1; i <= $date.getTotalDays(); i++) {
    calendar.push(i);
  }

  const clickByDayHandler = (e) => {
    if (e.target.tagName === 'LI') {
      dispatch('changeDay', { day: e.target.id });
    }
  };

  const clickToBtnHandler = (position) => {
    currentPosition = position;
    scrollCarousel();
  };

  const scrollCarousel = () => {
    document.querySelector('.days-list').style.transform = `translate(${
      (currentPosition - 1) * -55
    }px, 0)`;
  };

  onMount(() => {
    scrollCarousel();
  });
</script>

<div class="days">
  <div
    class="btn-prev"
    class:disabled={currentPosition === 1}
    on:click={() => clickToBtnHandler(currentPosition - 1)}
  >
    <img src={arrowPrev} alt="arrow-prev" />
  </div>
  <div class="container">
    <ul class="days-list" on:click={(e) => clickByDayHandler(e)}>
      {#each calendar as number, i}
        <li id={number} class:active={$date.day == number}>
          {daysOfTheWeek[new Date(year, month, calendar[i]).getDay()]}
          {number}
        </li>
      {/each}
    </ul>
  </div>
  <div
    class="btn-next"
    class:disabled={currentPosition === calendar.length}
    on:click={() => clickToBtnHandler(currentPosition + 1)}
  >
    <img src={arrowNext} alt="arrow-next" />
  </div>
</div>

<style>
  .days {
    position: relative;
    overflow: hidden;
  }

  .container {
    max-width: 385px;
    overflow: hidden;
    margin: 0 auto;
  }

  .days-list {
    display: flex;
    color: #d1d1d1;
    transition-duration: 300ms;
  }

  .days-list li {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    width: 30px;
    padding: 0 5px;
    text-align: center;
  }

  .days-list li:not(:last-child) {
    margin-right: 15px;
  }

  .active {
    color: #ffffff;
    font-weight: 700;
  }

  .btn-next,
  .btn-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .btn-next img,
  .btn-prev img {
    width: 24px;
  }

  .btn-next {
    right: 0px;
  }

  .btn-prev {
    left: 0;
  }

  .disabled {
    pointer-events: none;
  }

  @media (max-width: 460px) {
    .container {
      max-width: 275px;
    }
  }
</style>
