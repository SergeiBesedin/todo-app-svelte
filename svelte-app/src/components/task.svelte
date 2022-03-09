<script>
  import { createEventDispatcher } from 'svelte';
  export let done;
  export let id;
  export let text;

  const dispatch = createEventDispatcher();

  const handleDoneChange = (e, id) => {
    dispatch('changeDone', { checked: e.target.checked, id });
  };

  const handleRemove = (id) => {
    dispatch('remove', { id });
  };
</script>

<div class="task">
  <input
    type="checkbox"
    checked={done}
    on:input={(e) => handleDoneChange(e, id)}
  />
  <p>{text}</p>
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
</style>
