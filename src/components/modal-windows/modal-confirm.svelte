<script>
  import { fade } from 'svelte/transition';
  export let visibleConfirmModal;
  export let handleClearList = (clear) => handleClearList(clear);
</script>

{#if visibleConfirmModal}
  <div class="modal-dialog" transition:fade>
    <h2>Список дел на текущий день будет полностью очищен. Вы уверены?</h2>
    <button class="clear" on:click={() => handleClearList(true)}
      >Очистить</button
    >
    <button class="cancel" on:click={() => handleClearList(false)}
      >Отменить</button
    >
  </div>
{/if}

<style>
  .modal-dialog {
    z-index: 101;
    position: absolute;
    left: 50px;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
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
