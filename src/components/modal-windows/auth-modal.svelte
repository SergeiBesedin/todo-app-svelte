<script>
  import { fade } from 'svelte/transition';
  import { auth } from '../../utils/utils';
  import { formValid, messages } from '../../utils/validation';
  import close from '../../assets/icons/close.png';
  export let handleCloseAuthForm = () => handleCloseAuthForm();
  export let visibleAuthForm;

  const validation = {
    email: { text: '' },
    password: { text: '' },
    message: { text: '', field: '', textColor: '' },
  };

  const { email, password } = validation;

  const login = () => {
    auth(email.text, password.text, true)
      .then((data) => {
        if (data.error) {
          validation.message = messages.errors[data.error.message];
        } else {
          validation.message = messages.notifications['SUCCESS'];
          closeAuthForm();
        }
      })
      .catch((e) => console.log(`Error! ${e}`));
  };

  const register = () => {
    auth(email.text, password.text, false)
      .then((data) => {
        if (data.error) {
          validation.message = messages.errors[data.error.message];
        } else {
          validation.message = messages.notifications['ACCOUNT_CREATED'];
        }
      })
      .catch((e) => console.log(`Error! ${e}`));
  };

  const authHandler = (action) => {
    const isValid = formValid(email.text, password.text);
    if (isValid.valid) {
      //Если прошли валидацию полей, то обращаемся к серверу
      action === 'login' ? login() : register();
    } else {
      validation.message = messages.errors[isValid.messageError];
    }
  };

  const closeAuthForm = () => {
    handleCloseAuthForm();
    setTimeout(() => {
      clearField('all');
    }, 500);
  };

  const clearField = (field) => {
    if (field === 'email') {
      email.text = '';
    } else if (field === 'pass') {
      password.text = '';
    } else {
      email.text = '';
      password.text = '';
    }
    validation.message.text = '';
    validation.message.field = '';
    validation.message.textColor = '';
  };
</script>

{#if visibleAuthForm}
  <div class="auth" transition:fade>
    <div class="auth-modal">
      <div class="auth-close" on:click={closeAuthForm} />
      <form>
        <h3>Authorization</h3>
        <div class="auth-fields">
          <div class="auth-login">
            <input
              placeholder="Email"
              bind:value={email.text}
              class="input-email"
              class:error-border={validation.message.field === 'email'}
            />
            <button
              class="input-clear"
              class:visible={email.text.length > 0}
              on:click|preventDefault={() => clearField('email')}
            >
              <img src={close} alt="clear" />
            </button>
          </div>
          <div class="auth-pass">
            <input
              placeholder="Password"
              type="password"
              bind:value={password.text}
              class="input-pass"
              class:error-border={validation.message.field === 'password'}
            />
            <button
              class="input-clear"
              class:visible={password.text.length > 0}
              on:click|preventDefault={() => clearField('pass')}
            >
              <img src={close} alt="clear" />
            </button>
          </div>
          {#if validation.message.text !== ''}
            <div
              class="auth-error"
              style={`color: ${validation.message.textColor}`}
            >
              {validation.message.text}
            </div>
          {/if}
        </div>
        <div class="auth-btns">
          <button
            class="login-btn"
            class:disabled={email.text.length === 0 ||
              password.text.length === 0}
            type="submit"
            on:click|preventDefault={() => authHandler('login')}>Log In</button
          >
          <button
            class="register-btn"
            class:disabled={email.text.length === 0 ||
              password.text.length === 0}
            type="submit"
            on:click|preventDefault={() => authHandler('register')}
            >Register</button
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
    top: 53%;
    left: 15%;
    right: 15%;
    transform: translateY(-50%);
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
    border-radius: 10px;
  }

  .auth-modal {
    position: relative;
    padding: 25px;
  }

  .auth h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  @media (max-width: 446px) {
    .auth {
      left: 5%;
      right: 5%;
    }
  }

  .auth-close {
    z-index: 102;
    position: absolute;
    top: 5px;
    right: 1px;
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
    width: 15px;
    height: 1px;
    background-color: #000000;
  }

  .auth-close::before {
    transform: rotate(45deg);
  }

  .auth-close::after {
    transform: rotate(-45deg);
  }

  .auth-fields {
    position: relative;
    margin-bottom: 30px;
  }

  .auth-fields input {
    width: 100%;
    background-color: #eff0f7;
    border-radius: 10px;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .auth-modal input:focus {
    border: 1px solid #696eff;
  }

  .auth-modal input::placeholder {
    color: #a0a3bd;
    letter-spacing: 0;
  }

  .input-clear {
    display: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
  }

  .auth-login {
    margin-bottom: 15px;
    position: relative;
  }

  .auth-pass {
    position: relative;
  }

  .auth-pass input {
    letter-spacing: 3px;
  }

  .auth-btns {
    display: flex;
    justify-content: space-between;
  }

  .auth-btns button {
    flex: 1;
    padding: 10px 0;
    border-radius: 20px;
    border: 1px solid #696eff80;
  }

  .login-btn {
    background-color: #696eff;
    color: #ffffff;
    margin-right: 15px;
  }

  .register-btn {
    background-color: #ffffff;
    color: #696eff;
  }

  .auth-error {
    position: absolute;
    bottom: -21px;
    font-size: 12px;
  }

  .error-border {
    border: 1px solid #c30052;
  }

  .visible {
    display: block;
  }

  .disabled {
    opacity: 0.7;
    pointer-events: none;
  }
</style>
