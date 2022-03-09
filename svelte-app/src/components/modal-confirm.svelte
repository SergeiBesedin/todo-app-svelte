<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleConfirmDel = (conf) => {
    dispatch('confirm', {
      conf,
    });
  };
</script>

<div class="modal-dialog">
  <h2>Список дел на текущий день недели будет полностью очищен. Вы уверены?</h2>
  <button class="clear" on:click={() => handleConfirmDel(true)}>Очистить</button
  >
  <button class="cancel" on:click={() => handleConfirmDel(false)}
    >Отменить</button
  >
</div>

<style>
  .modal-dialog {
    z-index: 101;
    position: absolute;
    top: 40%;
    left: 39.5%;
    display: none;
    border-radius: 10px;
    padding: 8px;
    max-width: 400px;
    text-align: center;
    background: #696eff;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
    color: #ffffff;
    box-sizing: border-box;
  }

  .modal-dialog h2 {
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: normal;
  }

  .modal-dialog button {
    background: #ffffff;
    border-radius: 5px;
  }

  .clear {
    margin-right: 50px;
    border: 2px solid greenyellow;
  }

  .cancel {
    border: 2px solid rgb(231, 25, 25);
  }
</style>
