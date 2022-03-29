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
  <h2>Список дел на текущий день будет полностью очищен. Вы уверены?</h2>
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
    top: 0;
    left: 50px;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    border-radius: 10px;
    padding: 8px;
    text-align: center;
    background: #f6a9ff;
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
    border-radius: 5px;
    color: #ffffff;
    padding: 5px;
  }

  .clear {
    margin-right: 50px;
    background: rgb(231, 25, 25);
  }

  .cancel {
    background: #d1d1d1;
  }
</style>
