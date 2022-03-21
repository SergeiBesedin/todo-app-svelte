<script>
  import { createEventDispatcher } from 'svelte';
  import Star from './star.svelte';
  export let done;
  export let id;
  export let description;
  export let rating;
  export let time;
  export let category;

  const dispatch = createEventDispatcher();
  const numTotalStars = 3;

  const handleDoneChange = (e) => {
    dispatch('changeDone', { checked: e.target.checked, id });
  };

  const handleChangeRating = (e) => {
    dispatch('changeRating', { rating: e.target.value, id });
  };

  const handleRemove = (id) => {
    dispatch('remove', { id });
  };
</script>

<div class="task">
  <div class="task-container">
    <div class="task-left">
      <p>{description}</p>
      <span>{category}</span>
    </div>

    <div class="task-right">
      <p>{time}</p>
      <div class="task-raiting">
        <div class="raiting-items">
          {#each Array.from({ length: numTotalStars }) as star, i (id + i)}
            <Star
              num={i + 1}
              {id}
              {rating}
              on:input={(e) => handleChangeRating(e)}
            />
          {/each}
        </div>
      </div>
      <input
        type="checkbox"
        checked={done}
        on:input={(e) => handleDoneChange(e)}
      />
      <button on:click={() => handleRemove(id)}>X</button>
    </div>
  </div>
</div>

<style>
  .task {
    width: 90%;
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  }

  .task-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 7px;
  }

  .task-left {
  }

  .task-right {
  }

  .task-left p {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
  }

  .task-left span {
    font-size: 14px;
    opacity: 0.7;
  }

  .task-right p {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .task-right input {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .task-raiting {
    position: relative;
    font-size: 18px;
    display: inline-block;
  }

  .task-raiting::before {
    content: '★★★';
    display: block;
  }

  .raiting-items {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden;
  }

  .raiting-label:hover,
  .raiting-label:hover ~ .raiting-label,
  .raiting-label:checked ~ .raiting-label:hover {
    color: rgb(243, 205, 135);
  }
</style>
