import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products-context';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '../../components/form-components/form';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/form-components/form-input';
import { FormButton } from '../../components/form-components/form-button';
import s from './styles.module.css';
import { BreadCrumbs } from '../../components/navigate';
import { productService } from '../../services/product-service';

export const AddReviewPage = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' });

  const { id } = useParams();
  const products = useContext(ProductsContext);

  const product = products.find(p => p._id === id);
  const title = `Отзыв о товаре ${product?.name}`;
  const navigate = useNavigate();

  const submitReviewForm = data => {
    console.log({ data });
    reset();
    productService.addReviewForProduct(id, { ...data }).then(() => {
      navigate(`/product/${id}`);
    });
  };

  const textRegister = register('text', {
    required: {
      value: true,
      message: 'Пожалуйста заполните поле'
    }
  });

  register('rating', { value: 5 });
  register('name', { value: 'Покупка' });
  register('city', { value: 'Москва' });

  return <>
    <BreadCrumbs textButton="Назад"/>
    <h2 className={s.title}>{title}</h2>
    <div className={s.divider}></div>
    <Form className={s.form} handleSubmit={handleSubmit(submitReviewForm)}>

      <div className={s.form__element}>
        <p>Комментарий</p>
        <div>
          <FormInput {...textRegister}
                     id={'text'}
                     className={s.textarea}
                     typetag={'textarea'}
                     placeholder={'Поделитесь впечатлениями о товаре'}/>
          {errors?.text && <p className={'form__error-message'}>{errors?.text?.message}</p>}
        </div>
      </div>

      <div>
        <FormButton className={s['submit-btn']} type={'submit'} color={'primary'}>Отправить отзыв</FormButton>
      </div>
    </Form>
  </>;
};