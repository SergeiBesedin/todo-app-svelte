<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let textTask = '';

  const changeText = (e) => {
    e.preventDefault();
    dispatch('change', {
      text: textTask.trim(),
    });
    textTask = '';
  };
</script>

<div class="entry-field">
  <form on:submit={changeText}>
    <input
      required
      minlength="3"
      placeholder="Поле ввода"
      bind:value={textTask}
    />
    <button>Добавить задачу</button>
  </form>
  <button on:click>Очистить список</button>
</div>

<style>
  .entry-field {
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
  }

  .entry-field input {
    padding: 0px 5px;
    outline: none;
    border: none;
  }

  .entry-field input:invalid {
    border-bottom: 1px solid rgb(197, 9, 9);
  }

  input:valid {
    border-bottom: 1px solid rgb(0, 255, 55);
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
