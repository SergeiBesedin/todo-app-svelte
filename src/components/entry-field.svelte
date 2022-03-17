<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let textTask = '';

  const changeText = (e) => {
    e.preventDefault();
    dispatch('changeText', {
      text: textTask.trim(),
    });
    textTask = '';
  };
</script>

<div class="entry-field">
  <button on:click>Добавить задачу</button>
  <button on:click>Очистить список</button>
</div>

<style>
  .entry-field {
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
  }

  .entry-field button {
    background: linear-gradient(0deg, #696eff, #f6a9ff);
    color: #ffffff;
    padding: 7px;
    border-radius: 5px;
  }

  .entry-field button:active {
    transform: scale(1.05);
    transition-duration: 300ms;
  }
</style>
