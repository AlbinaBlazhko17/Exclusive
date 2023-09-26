import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input } from '@mui/joy';
import Key from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import Button from '../Button/Button';
import PhoneInput from 'react-phone-input-2';
import RadioGroup from '../RadioGroup/RadioGroup';

import 'react-phone-input-2/lib/style.css'
import style from './styles.module.css';

function MyForm ({type, handleClose}: { type: string, handleClose: () => void }) {

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
		showFields: Yup.bool(),
		confirmPassword: Yup.string()
				.when('showFields', ([showFields]) => {
					return showFields ? Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Password is required') : Yup.string().notRequired();
				}),
		tel: Yup.string()
			.when('showFields', ([showFields]) => {
				console.log();
				return showFields ? Yup.string().min(10, 'Telephone number must be at least 10 characters').required('Telephone number is required') : Yup.number().notRequired();
			}),
		gender: Yup.string()
				.when('showFields', ([showFields]) => {
					return showFields ? Yup.string().required('Gender Password is required') : Yup.string().notRequired();
				}),
		agreeToPolicy: Yup.bool()
				.when('showFields', ([showFields]) => {
					return showFields ? Yup.bool().oneOf([true], 'You must agree'): Yup.bool().notRequired();
				}),
		});
	return (
		<Formik 
			initialValues={{
				email: '',
				password: '',
				confirmPassword: '',
				tel: '',
				gender: '',
				agreeToPolicy: false,
				showFields: type === 'Sign up'
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				handleClose();
				alert('Check the console!')
				setSubmitting(false);
			}}
			validationSchema={validationSchema}>
			<Form>
				<label className={style.formLabel}>Login</label>
				<div className={style.field}>
					<Field
						type="email" name="email"
						component={({ field }) => (
							<Input {...field} startDecorator={<MailIcon />} placeholder='email@gmail.com'/>
						)}
					/>
					<ErrorMessage name="email" render={(errorMsg) => (
							<div className={style.error}>{errorMsg}</div>
					)} />
				</div>
			<label className={style.formLabel}>Password</label>
			<div className={style.field}>
				<Field
					type="password"
					name="password"
					component={({ field }) => (
						<Input {...field} startDecorator={<Key />}/>
					)}
				/>
				<ErrorMessage name="password" render={(errorMsg) => (
							<div className={style.error}>{errorMsg}</div>
				)} />
			</div>
			{type === 'Sign up'? (
				<>
					<label className={style.formLabel}>Password confirmation</label>
					<div className={style.field}>
						<Field
							type="password"
							name="confirmPassword"
							component={({ field }) => (
								<Input {...field} startDecorator={<Key />}/>
							)}
						/>
						<ErrorMessage name="confirmPassword" render={(errorMsg) => (
							<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Phone number</label>
					<div className={style.field}>
						<Field
							type="tel"
							name="tel"
							component={({ field, form }) => (
								<PhoneInput {...field} country={'ua'} name="tel" value={field.value} onChange={(value) => {
									form.setFieldValue('tel', value);
								}}/>
							)}
						/>
						<ErrorMessage name="tel" render={(errorMsg) => (
							<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel} style={{textAlign: 'center'}}>Gender</label>
					<div className={style.field} style={{marginBottom: '20px'}}>
						<Field name="gender" component={RadioGroup} />
						<ErrorMessage name="gender" render={(errorMsg) => (
							<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<hr style={{marginBottom: '30px'}}/>
					<div className={style.field}>
						<label>
							<Field
								type="checkbox"
								name="agreeToPolicy"
							/>
							I agree with the Private policy
						</label>
						<ErrorMessage name="agreeToPolicy" render={(errorMsg) => (
							<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
				</>
			): undefined}
			{type === 'Sign in'? <a href="#" className={style.forgot}>Forgot password?</a>: undefined}
			<Button appearance='filled' type='submit' className={style.buttonSubmit}>Submit</Button>
		</Form>
		</Formik>
	)
}

export default MyForm;