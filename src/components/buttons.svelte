<script>
  import { tasks, date } from '../store/store.js';
  import clearIcon from '../assets/icons/clear.png';
  export let handleOpenCreateTask = () => handleOpenCreateTask;
  export let handleClearClick = () => handleClearClick;
</script>

<div class="buttons">
  <button class="btn-add" on:click={handleOpenCreateTask} />
  <div
    class="btn-clear"
    class:visible={$tasks[$date.getFullDate()].length > 0}
    on:click={handleClearClick}
  >
    <img src={clearIcon} alt="clear" />
  </div>
</div>

<style>
  .buttons {
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
  }

  .btn-add {
    background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff),
      #696eff;
    background-position: center;
    background-size: 50% 2px, 2px 50%;
    background-repeat: no-repeat;
  }

  .btn-add:hover,
  .btn-clear:hover {
    transform: scale(1.1);
  }

  .btn-add,
  .btn-clear {
    width: 50px;
    height: 50px;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
    transition-duration: 300ms;
    border-radius: 50%;
  }

  .btn-clear {
    background: #c55151;
    cursor: pointer;
    text-align: center;
    display: none;
    padding: 6px 10px;
    box-sizing: border-box;
  }

  .btn-clear img {
    width: 35px;
  }

  .visible {
    display: block;
  }
</style>
