import { useForm } from 'react-hook-form';
import s from '../login/styles.module.css';
import { Form } from '../form-components/form';
import { FormInput } from '../form-components/form-input';
import { FormButton } from '../form-components/form-button';

export const Register = ({ onSubmit, onClose, onNavigateLogin }) => {

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
    <h2 className={s.title}>Регистрация</h2>
    <button className={s['close-btn']} onClick={onClose}>+</button>
    <Form handleSubmit={handleSubmit(onSubmit)} className={s.form}>

      <FormInput {...usernameRegister}
                 id={'username'}
                 className={s.form__input}
                 type={'email'}
                 placeholder={'Email'}/>
      {errors?.username && <span className={'form__error-message'}>{errors?.username?.message}</span>}
      <FormInput {...passwordRegister}
                 id={'password'}
                 className={s.form__input}
                 type={'password'}
                 placeholder={'Пароль'}/>
      {errors?.password && <span className={'form__error-message'}>{errors?.password?.message}</span>}

      <p className={s.info}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на
        информационную рассылку.</p>

      <FormButton className={`${s.form__btn} ${s['main-btn']}`} type={'submit'}>Зарегистрироваться</FormButton>
      <FormButton className={s.form__btn} onClick={onNavigateLogin}>Войти</FormButton>
    </Form>
  </>;
};