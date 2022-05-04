export const messages = {
  errors: {
    ['INVALID_EMAIL']: {
      text: 'Please enter a valid email address',
      field: 'email',
      textColor: '#c30052',
    },
    ['PASS_LENGTH_ERROR']: {
      text: 'Password cannot be shorter than 6 characters',
      field: 'password',
      textColor: '#c30052',
    },
    ['EMAIL_NOT_FOUND']: {
      text: 'Email not found',
      field: 'email',
      textColor: '#c30052',
    },
    ['INVALID_PASSWORD']: {
      text: 'Invalid password',
      field: 'password',
      textColor: '#c30052',
    },
    ['EMAIL_EXISTS']: {
      text: 'Email already in use',
      field: 'email',
      textColor: '#c30052',
    },
  },
  notifications: {
    ['ACCOUNT_CREATED']: {
      text: 'Account created. You must be logged in to continue',
      field: '',
      textColor: '#04b304',
    },
    ['SUCCESS']: { text: 'Signed in', field: '', textColor: '#04b304' },
  },
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formValid = (email, password) => {
  if (!validateEmail(email)) {
    return { messageError: ['INVALID_EMAIL'] };
  }
  if (password.length < 6) {
    return { messageError: ['PASS_LENGTH_ERROR'] };
  }
  return { valid: true };
};
