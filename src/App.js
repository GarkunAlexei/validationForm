import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // проверяем нажали ли мы на какой-либо из инпутов
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  // отлавливаем ошибки
  const [emailError, setEmailError] = useState('Введите свою почту');
  const [passwordError, setPasswordError] = useState('Введите пароль');
  // проверка валидности заполненых инпутов
  const [formValid, setFormValid] = useState(false)
  // при правильном заполнении инпутов разблокируем кнопку
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])
  // слушатель на форму, выводим данные из инпутов в консоль и очищаем их
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Email: ', email, 'Password: ', password);
    setEmail('')
    setPassword('')
  } 
  // проверка регулярным вырашением валидности введенного емейла
  const emailHandler = (e) => {
    setEmail(e.target.value)
    const reg = /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
    if (!reg.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный Email адрес')
    } else {
      setEmailError('')
    }
  }
  // проверка валидности пароля
  const passHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length> 8) {
      setPasswordError('Пароль должен быть длинее 3 и меньше 8 символов')
      if (!e.target.value) {
        setPasswordError('Пароль должен быть длинее 3 и меньше 8 символов')
      }
    } else {
      setPasswordError('')
    }
  }
  // действие, если мы нажали на инпут
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler} className='form'>
        <h2 className='form__title'>Авторизация</h2>
        
        <div className='form__group'>
        {(emailDirty && emailError) 
          ?
          <div className='form__label' style={{color: 'red'}}>{emailError}</div> 
          :
          <div className='form__label'>Email</div>
        }
          <input 
            className='form__input'
            onChange={e => emailHandler(e)} 
            value={email} 
            onBlur={e => blurHandler(e)} 
            name='email' 
            type='text' 
            placeholder='example@mail.com'
          />
        </div>
        <div className='form__group'>
        {(passwordDirty && passwordError) 
          ?
          <div className='form__label' style={{color: 'red'}}>{passwordError}</div> 
          :
          <div className='form__label'>Пароль</div>
        }
          <input 
            className='form__input'
            onChange={e => passHandler(e)} 
            value={password} 
            onBlur={e => blurHandler(e)} 
            name='password' 
            type='password' 
            placeholder='3-8 symbol'
          />
        </div>
        <button className='form__button' disabled={!formValid} type='submit'>Войти</button>
      </form>
    </div>
  );
}

export default App;
