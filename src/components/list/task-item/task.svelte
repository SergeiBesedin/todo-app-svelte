<script>
  import { createEventDispatcher } from 'svelte';
  import { createTaskData, date, tasks } from '../../../store/store';
  import Star from './star.svelte';
  import triangularArrow from '../../../assets/icons/triangular-arrow.png';
  export let done;
  export let id;
  export let description;
  export let rating;
  export let hour;
  export let minute;
  export let categoryInd;
  export let markersInd;

  const dispatch = createEventDispatcher();

  const changeDoneHandler = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].map((item) => {
          if (item.id === id) {
            return { ...item, done: e.target.checked };
          } else {
            return item;
          }
        }),
      };
    });
  };

  const handleChangeRating = (e) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].map((item) => {
          if (item.id === id) {
            return { ...item, rating: e.target.value };
          } else {
            return item;
          }
        }),
      };
    });
  };

  const handleRemove = (id) => {
    tasks.update((items) => {
      return {
        ...items,
        [$date.getFullDate()]: items[$date.getFullDate()].filter((item) => {
          return item.id !== id;
        }),
      };
    });
  };

  const handleEditTaskClick = (
    hour,
    minute,
    description,
    id,
    categoryInd,
    markersInd
  ) => {
    dispatch('editTaskClick', {
      hour,
      minute,
      description,
      id,
      categoryInd,
      markersInd,
    });
  };
</script>

<div class="task">
  <div class="task-container">
    <div class="task-left">
      <div
        class="task-marker"
        style={`background: ${$createTaskData.markers[markersInd]}`}
      />
      <div>
        <p>{description}</p>
        <span>{$createTaskData.category[categoryInd]}</span>
      </div>
    </div>

    <div class="task-right">
      <div class="task-right-container">
        <p>{`${hour}:${minute}`}</p>
        <div class="task-raiting">
          <div class="raiting-items">
            {#each Array.from({ length: 3 }) as star, i (id + i)}
              <Star num={i + 1} {id} {rating} on:input={handleChangeRating} />
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
            on:input={changeDoneHandler}
          />
          <label for={`checkbox-${id}`} />
        </div>
        <div class="task-dropdown">
          <button class="task-actions-btn">
            <img src={triangularArrow} alt="arrow" />
          </button>
          <div class="task-dropdown-content">
            <span
              on:click={() =>
                handleEditTaskClick(
                  hour,
                  minute,
                  description,
                  id,
                  categoryInd,
                  markersInd
                )}>Edit</span
            >
            <span on:click={() => handleRemove(id)}>Delete</span>
          </div>
        </div>
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
    background-position: 70% 40%;
    border-radius: 0 0 0 100%;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    opacity: 0.3;
  }

  .custom-checkbox:checked + label::before {
    opacity: 1;
  }

  .task-actions-btn {
    padding: 5px;
    border: none;
    outline: none;
    background: none;
  }

  .task-actions-btn img {
    width: 22px;
  }

  .task-dropdown {
    position: absolute;
    bottom: -10px;
    right: -5px;
  }

  .task-dropdown-content {
    display: none;
    position: absolute;
    top: 20px;
    right: 0;
    background-color: #f1f1f1;
    max-width: 60px;
    z-index: 1;
    border-radius: 5px;
  }

  .task-dropdown-content span {
    display: block;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  .task-dropdown-content span:last-child {
    color: rgb(223, 33, 33);
  }

  .task-dropdown-content span:hover {
    background-color: #d1d1d1;
    border-radius: 5px;
  }

  .task-dropdown:hover .task-dropdown-content {
    display: block;
  }
</style>
