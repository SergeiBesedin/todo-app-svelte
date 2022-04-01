<script>
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
  import { date } from '../../store/store';
  import arrowNext from '../../assets/icons/next-arrow.png';
  import arrowPrev from '../../assets/icons/prev-arrow.png';

  const dispatch = createEventDispatcher();

  onMount(() => {
    scrollCarousel();
  });

  afterUpdate(() => {
    scrollCarousel();
  });

  $: currentPosition = $date.day;
  $: totalDays = $date.getTotalDays();

  const clickByDayHandler = (e) => {
    if (e.target.tagName === 'LI') {
      dispatch('changeDate', { day: e.target.id, month: $date.month });
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
</script>

<div
  class="btn-prev"
  class:disabled={currentPosition === 1}
  on:click={() => clickToBtnHandler(currentPosition - 1)}
>
  <img src={arrowPrev} alt="arrow-prev" />
</div>
<div class="container">
  <ul class="days-list" on:click={(e) => clickByDayHandler(e)}>
    {#each Array.from({ length: totalDays }) as number, i}
      <li id={i + 1} class:active={$date.day == i + 1}>
        {$date.daysOfTheWeek[new Date($date.year, $date.month, i + 1).getDay()]}
        {i + 1}
      </li>
    {/each}
  </ul>
</div>
<div
  class="btn-next"
  class:disabled={currentPosition === totalDays}
  on:click={() => clickToBtnHandler(currentPosition + 1)}
>
  <img src={arrowNext} alt="arrow-next" />
</div>

<style>
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

  .btn-next {
    right: 0px;
  }

  .btn-prev {
    left: 0;
  }

  .btn-next img,
  .btn-prev img {
    width: 24px;
    transition-duration: 200ms;
  }

  .btn-next img:active,
  .btn-prev img:active {
    transform: scale(1.1);
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
