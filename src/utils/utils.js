import { authData } from '../store/store';

export const makeTwoDigits = (num) => {
  return num.toString().padStart(2, 0);
};

export const auth = async (email, password, isLogin) => {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1wvqaPKt6YV-c8WN-LYcMvzDhUHpoR3I'; //РЕГИСТРАЦИЯ
  if (isLogin) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1wvqaPKt6YV-c8WN-LYcMvzDhUHpoR3I'; //ВХОД
  }
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(authData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem(
        'sessionTime',
        new Date(new Date().getTime() + data.expiresIn * 1000)
      );
      authSuccess(data.idToken);
      autoLogout(data.expiresIn);
    });
};

export const autoLogin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    logout();
  } else {
    const sessionTime = new Date(localStorage.getItem('sessionTime'));
    if (sessionTime <= new Date()) {
      logout();
    } else {
      authSuccess(token);
      autoLogout((sessionTime.getTime() - new Date().getTime()) / 1000);
    }
  }
};

export const autoLogout = (time) => {
  setTimeout(() => {
    logout();
  }, time * 1000);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('sessionTime');
  authData.update((value) => {
    return { ...value, token: null };
  });
};

export const authSuccess = (token) => {
  authData.update((value) => {
    return { ...value, token };
  });
};
