<script>
  export let visibleAuthForm;
</script>

{#if visibleAuthForm}
  <form>
    <div class="auth">
      <div class="auth-modal">
        <div class="auth-close" on:click />
        <div class="auth-login">
          <div>Login:</div>
          <input minlength="6" required />
        </div>
        <div class="auth-pass">
          <div>Password:</div>
          <input minlength="6" required type="password" />
        </div>
        <div class="auth-btns">
          <button type="submit">log in</button>
          <button>register</button>
        </div>
      </div>
    </div>
  </form>
{/if}

<style>
  .auth {
    z-index: 101;
    position: absolute;
    top: 50%;
    left: 100px;
    right: 100px;
    transform: translateY(-50%);
    background: #f6a9ff;
    color: #ffffff;

    border-radius: 10px;
  }

  .auth-modal {
    position: relative;
    padding: 20px;
  }

  .auth-close {
    z-index: 102;
    position: absolute;
    top: 2px;
    right: -2px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity ease 0.5s;
  }

  .auth-close:hover {
    opacity: 0.5;
  }

  .auth-close::before,
  .auth-close::after {
    content: '';
    position: absolute;
    top: 10px;
    display: block;
    width: 16px;
    height: 2px;
    background: #ffffff;
  }

  .auth-close::before {
    transform: rotate(45deg);
  }

  .auth-close::after {
    transform: rotate(-45deg);
  }

  .auth-modal input {
    width: 100%;
    border-radius: 5px;
    padding: 5px 10px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .auth-login,
  .auth-pass {
    margin-bottom: 10px;
  }

  .auth-btns {
    display: flex;
    justify-content: space-around;
  }

  .auth-btns button {
    padding: 5px;
    border-radius: 5px;
    background-color: #ffffff;
  }
</style>
