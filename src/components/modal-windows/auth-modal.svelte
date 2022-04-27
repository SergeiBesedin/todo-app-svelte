<script>
  import { authData } from '../../store/store';
  import { fade } from 'svelte/transition';
  import { auth } from '../../utils/utils';
  export let handleCloseAuthForm = () => handleCloseAuthForm();
  export let visibleAuthForm;

  let email;
  let password;

  const loginHandler = async () => {
    await auth(email, password, true);
    if ($authData.token) {
      handleCloseAuthForm();
    }
  };

  const registerHandler = () => {
    auth(email, password, false);
  };
</script>

{#if visibleAuthForm}
  <div class="auth" transition:fade>
    <div class="auth-modal">
      <div class="auth-close" on:click={handleCloseAuthForm} />
      <form>
        <div class="auth-login">
          <div>Email:</div>
          <input minlength="6" required bind:value={email} />
        </div>
        <div class="auth-pass">
          <div>Password:</div>
          <input minlength="6" required type="password" bind:value={password} />
        </div>
        <div class="auth-btns">
          <button type="submit" on:click|preventDefault={loginHandler}
            >log in</button
          >
          <button type="submit" on:click|preventDefault={registerHandler}
            >register</button
          >
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .auth {
    z-index: 101;
    position: absolute;
    top: 50%;
    left: 15%;
    right: 15%;
    transform: translateY(-50%);
    background: #f6a9ff;
    color: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
    border-radius: 10px;
  }

  .auth h3 {
    text-align: center;
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

  .auth-login div,
  .auth-pass div {
    margin-bottom: 5px;
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
