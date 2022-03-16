<script>
  import { createEventDispatcher } from 'svelte';
  import Star from './star.svelte';
  export let done;
  export let id;
  export let text;
  export let rating;

  const dispatch = createEventDispatcher();
  const numTotalStars = 3;

  const handleDoneChange = (e) => {
    dispatch('changeDone', { checked: e.target.checked, id });
  };

  const handleChangeRating = (e) => {
    console.log(e.target.value);
    dispatch('changeRating', { rating: e.target.value, id });
  };

  const handleRemove = (id) => {
    dispatch('remove', { id });
  };
</script>

<div class="task">
  <input type="checkbox" checked={done} on:input={(e) => handleDoneChange(e)} />
  <p>{text}</p>
  <div class="raiting">
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
  <button on:click={() => handleRemove(id)}>Удалить</button>
</div>

<style>
  .task {
    display: flex;
    justify-content: space-around;
    border-bottom: 1.5px solid #d1d1d1;
    padding: 15px;
  }

  .task p {
    width: 300px;
  }

  .raiting {
    position: relative;
    font-size: 20px;
    display: inline-block;
  }

  .raiting::before {
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
