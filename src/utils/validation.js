export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validate = (value, validations) => {
  const validationData = {
    inputValid: false,
    isEmpty: true,
    minLengthError: false,
    maxLengthError: false,
    emailError: false,
  };

  //   const [inputValid, setInputValid] = useState(false);
  //   const [isEmpty, setEmpty] = useState(true);
  //   const [minLengthError, setMinLengthError] = useState(false);
  //   const [maxLengthError, setMaxLengthError] = useState(false);
  //   const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLengthError':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'maxLengthError':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'emailError':
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (isEmpty || emailError || minLengthError || maxLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
    // eslint-disable-next-line
  }, [isEmpty, emailError, minLengthError, maxLengthError]);

  return {
    inputValid,
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
  };
};

const useInput = (inititalValue, validations) => {
  const [value, setValue] = useState('');
  const [isDirty, setDirty] = useState(false);
  const valid = validate(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onBlur,
    onChange,
    isDirty,
    ...valid,
  };
};

export const errors = {
  isEmpty: 'Поле не должно быть пустым',
  email: 'Некорректный адрес электронной почты',
  password: 'Пароль слишком простой',
  login: 'Некорректная длина логина',
  repeatPass: 'Пароли не совпадают',
};

export default useInput;
