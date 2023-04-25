import { useForm } from 'react-hook-form';
import s from '../login/styles.module.css';
import { Form } from '../form-components/form';
import { FormInput } from '../form-components/form-input';
import { FormButton } from '../form-components/form-button';

export const Reset = ({ onClose, onSubmit }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const usernameRegister = register('username', {
    required: {
      value: true,
      message: 'Пожалуйста заполните поле'
    }
  });

  return <>
    <h2 className={s.title}>Восстановление пароля</h2>
    <button className={s['close-btn']} onClick={onClose}>+</button>
    <Form handleSubmit={handleSubmit(onSubmit)} className={s.form}>

      <p className={s.info}>Для получения временного пароля необходимо ввести email, указанный при регистрации</p>

      <FormInput {...usernameRegister} id={'username'} className={s.form__input} type={'email'} placeholder={'Email'}/>
      {errors?.username && <span className={'form__error-message'}>{errors?.username?.message}</span>}

      <p className={s.info}>Срок действия временного пароля 24 ч.</p>

      <FormButton className={`${s.form__btn} ${s['main-btn']}`} type='submit'>Отправить</FormButton>
    </Form>
  </>;
};