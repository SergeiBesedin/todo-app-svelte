export const makeTwoDigits = (num) => {
  return num.toString().padStart(2, 0);
};

// export const auth = (email, password, isLogin) => {
//   return async () => {
//     const authData = {
//       email,
//       password,
//       returnSecureToken: true,
//     };
//     const url =
//       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1wvqaPKt6YV-c8WN-LYcMvzDhUHpoR3I';
//     if (isLogin) {
//       url =
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1wvqaPKt6YV-c8WN-LYcMvzDhUHpoR3I';
//     }
//     const response = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(authData),
//     });
//     const data = response.data;
//     const expirationDate = new Date(
//       new Date().getTime() + data.expiresIn * 1000
//     );

//     localStorage.setItem('token', data.idToken);
//     localStorage.setItem('userId', data.localId);
//     localStorage.setItem('expirationDate', expirationDate);
//   };
// };

export async function auth(email, password, isLogin) {
  const authData = {
    email,
    password,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1wvqaPKt6YV-c8WN-LYcMvzDhUHpoR3I'; //РЕГИСТРАЦИЯ
  if (isLogin) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1wvqaPKt6YV-c8WN-LYcMvzDhUHpoR3I'; //ВХОД
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(authData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
    });
}
