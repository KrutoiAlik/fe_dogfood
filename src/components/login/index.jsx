import { useForm } from 'react-hook-form';
import { FormInput } from '../form-components/form-input';
import { FormButton } from '../form-components/form-button';
import { Form } from '../form-components/form';
import s from './styles.module.css';
import { Link } from 'react-router-dom';

export const Login = ({ onSubmit, onClose, onNavigateRegister, onNavigateReset }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const usernameRegister = register('username', {
    required: {
      value: true,
      message: 'Пожалуйста заполните поле'
    }
  });
  const passwordRegister = register('password', {
    required: {
      value: true,
      message: 'Пожалуйста заполните поле'
    }
  });

  return <>
    <h2 className={s.title}>Вход</h2>
    <button className={s['close-btn']} onClick={onClose}>+</button>
    <Form handleSubmit={handleSubmit(onSubmit)} className={s.form}>

      <FormInput {...usernameRegister} id={'username'} className={s.form__input} type={'email'} placeholder={'Email'}/>
      {errors?.username && <span className={'form__error-message'}>{errors?.username?.message}</span>}
      <FormInput {...passwordRegister} id={'password'} className={s.form__input} type={'password'} placeholder={'Пароль'}/>
      {errors?.password && <span className={'form__error-message'}>{errors?.password?.message}</span>}

      <div className={s.form__reset}>
        <Link className={s['reset-link']} to={'/reset'} onClick={onNavigateReset}>Восстановить пароль</Link>
      </div>

      <FormButton className={`${s.form__btn} ${s['main-btn']}`} type={'submit'}>Войти</FormButton>
      <FormButton className={s.form__btn} onClick={onNavigateRegister}>Зарегистрироваться</FormButton>
    </Form>
  </>;
};