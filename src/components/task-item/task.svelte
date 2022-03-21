<script>
  import { createEventDispatcher } from 'svelte';
  import Star from './star.svelte';
  export let done;
  export let id;
  export let description;
  export let rating;
  export let time;
  export let category;
  export let marker;

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
      <div class="task-marker" style={`background: ${marker}`} />
      <div>
        <p>{description}</p>
        <span>{category}</span>
      </div>
    </div>

    <div class="task-right">
      <div class="task-right-container">
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
      </div>
      <div class="task-actions">
        <div class="task-check">
          <input
            id={`checkbox-${id}`}
            type="checkbox"
            checked={done}
            class="custom-checkbox"
            on:input={(e) => handleDoneChange(e)}
          />
          <label for={`checkbox-${id}`} />
        </div>
        <div class="task-remove" on:click={() => handleRemove(id)} />
      </div>
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

  .task-left,
  .task-right {
    display: flex;
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
    display: inline;
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .task-right-container {
    display: flex;
    flex-direction: column;
  }

  .task-marker {
    width: 5px;
    height: 100%;
    margin-right: 15px;
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

  .task-actions {
    width: 25px;
  }

  .task-check {
    position: absolute;
    top: 0;
    right: 0;
  }

  .task-check input {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
  }

  .custom-checkbox + label::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: #157ef7;
    background-repeat: no-repeat;
    background-size: 45% 45%;
    background-position: center;
    border-radius: 0 0 0 100%;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    opacity: 0.3;
  }

  .custom-checkbox:checked + label::before {
    opacity: 1;
  }

  .task-remove {
    position: absolute;
    bottom: 0;
    right: -7px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity ease 0.5s;
  }

  .task-remove:hover {
    opacity: 0.5;
  }

  .task-remove::before,
  .task-remove::after {
    content: '';
    position: absolute;
    top: 13px;
    display: block;
    width: 15px;
    height: 3px;
    background: #e92d2d;
  }

  .task-remove::before {
    transform: rotate(45deg);
  }

  .task-remove::after {
    transform: rotate(-45deg);
  }

  .raiting-label:hover,
  .raiting-label:hover ~ .raiting-label,
  .raiting-label:checked ~ .raiting-label:hover {
    color: rgb(243, 205, 135);
  }
</style>
