import { ErrorMessage, Field, Form, Formik } from 'formik';
import Header from '../Header/Header';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormDataDelivery } from '@interfaces/formDataDelivery.interface';
import { setLocalStorage, getLocalStorage } from '@utils/localStorage';
import Button from '../Button/Button';
import CustomInput from '../FormToSign/CustomInput';
import CustomInputNumber from '../FormToSign/CustomInputNumber';
import StepContext from '../StepsProvider/StepsProvider';
import { removeAllItemsFromCart, removeItemFromBuyNow } from '@store/actions/actions';
import store from '@store/store';
import { useDispatch } from 'react-redux';
import { IProductWithQuantity } from '@interfaces/product.interface';
import updateOrdersAndSales from '@utils/Orders';
import { validationSchema } from './validationSchema';
type RootState = ReturnType<typeof store.getState>

import style from './styles.module.css';

function CartFormPage () {
	const cart = localStorage.getItem('typeOfBuy') === 'addToCart'
			? (store.getState() as RootState).cart as IProductWithQuantity[]
			: (store.getState() as RootState).buyNow as IProductWithQuantity | null;

	const initialFormDataDelivery = getLocalStorage('delivery') || {
		firstName: '',
		lastName: '',
		city: '',
		streetAddress: '',
		apartments: '',
		tel: '',
		email: '',
		additionalInfo: '',
	}

	const [formDataDelivery, setFormDataDelivery] = useState<IFormDataDelivery>(initialFormDataDelivery);
	const stepContext = useContext(StepContext);
	const cartDispatch = useDispatch();

	const handleRemoveItems = () => {
		if (localStorage.getItem('typeOfBuy') === 'addToCart') {
			cartDispatch(removeAllItemsFromCart());
		} else {
			cartDispatch(removeItemFromBuyNow());
		}
	};

	if (!stepContext) {
		throw new Error(
			"stepContext has to be used within <Provider>"
		);
	}

	const { nextStep } = stepContext;

	const navigator = useNavigate();

	const goBack = () => {
		navigator(-1);
	};

	useEffect(() => {
		const data = getLocalStorage('delivery');
		if (data) {
			setFormDataDelivery(data);
		}
	}, []);

	useEffect(() => {
		setLocalStorage('delivery', formDataDelivery);
	}, [formDataDelivery]);

	return (
		<>
			<Header/>
			<Formik
				initialValues={formDataDelivery}
				validationSchema={validationSchema}
				onSubmit={(values, {setSubmitting}) => {
					console.log('Form values:', values);
					if(localStorage.getItem('typeOfBuy') === 'buyNow') {
						updateOrdersAndSales([cart]);
					} else {
						updateOrdersAndSales(cart);
					}
					handleRemoveItems();
					nextStep();
					navigator('/cart/form/confirm');
					setSubmitting(false);
				}}>
				<Form className={style.formWrapper}>
					<label className={style.formLabel}>First name</label>
					<div className={style.field}>
						<Field
							type="name"
							name="firstName"
							value={formDataDelivery.firstName}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="firstName" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Last name</label>
					<div className={style.field}>
						<Field
							type="text"
							name="lastName"
							value={formDataDelivery.lastName}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="lastName" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>City</label>
					<div className={style.field}>
						<Field
							type="text"
							name="city"
							value={formDataDelivery.city}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="city" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Street address</label>
					<div className={style.field}>
						<Field
							type="text"
							name="streetAddress"
							value={formDataDelivery.streetAddress}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="streetAddress" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Apartment, floor, etc. (optional)</label>
					<div className={style.field}>
						<Field
							type="text"
							name="apartments"
							value={formDataDelivery.apartments}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="apartments" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Phone number</label>
						<div className={style.field}>
							<Field
								type="text"
								name="tel"
								value={formDataDelivery.tel}
								component={CustomInputNumber}
								formData={formDataDelivery}
								setFormData={setFormDataDelivery}
								width={'400px'}
							/>
							<ErrorMessage name="tel" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
					<label className={style.formLabel}>Email</label>
					<div className={style.field}>
						<Field
							type="email"
							name="email"
							value={formDataDelivery.email}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="email" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Additional info</label>
					<div className={style.field}>
						<Field
							type="text"
							name="additionalInfo"
							as="textarea"
							value={formDataDelivery.additionalInfo}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="additionalInfo" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<div className={style.buttons}>
						<Button appearance='filled' style={{marginRight: '30px'}} onClick={goBack}>Go Back</Button>
						<Button type='submit' appearance='filled'>Confirm order</Button>
					</div>
				</Form>
			</Formik>

		</>
	)
}

export default CartFormPage;