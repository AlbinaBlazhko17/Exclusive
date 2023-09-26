import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Input, Checkbox} from '@mui/joy';
import Key from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import Button from '../Button/Button';
import PhoneInput from 'react-phone-input-2';
import RadioGroup from '../RadioGroup/RadioGroup';

import 'react-phone-input-2/lib/style.css'

import style from './styles.module.css';

function MyForm ({type}: { type: string }) {
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
		// Add validation for other fields as needed
	});
	return (
		<Formik 
			initialValues={{
			email: '',
			password: '',
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
			}}
			validationSchema={validationSchema}>
			<Form>
			<label className={style.formLabel}>Login</label>
			<Field
				type="email" name="email" placeholder=""
				component={({ field }) => (
					<Input {...field} startDecorator={<MailIcon />} placeholder='email@gmail.com'/>
				)}
			/>
			<label>Password</label>
			<Field
				type="password"
				name="password"
				component={({ field }) => (
					<Input {...field} startDecorator={<Key />}/>
				)}
			/>
			{type === 'Sign up'? (
				<>
					<label>Password</label>
					<Field
						type="password"
						name="password"
						component={({ field }) => (
							<Input {...field} startDecorator={<Key />}/>
						)}
					/>
					<label>Phone number</label>
					<Field
						type="tel"
						name="tel"
						component={({ field }) => (
							<PhoneInput {...field} country={'ua'} />
						)}
					/>
					<label>Sex</label>
					<Field name="gender" component={RadioGroup} />
					<hr style={{marginBottom: '30px'}}/>
					<Checkbox label="I agree with Private policy" required/>
				</>
			): undefined}
			{type === 'Sign in'? <a href="#" className={style.forgot}>Forgot password?</a>: undefined}
			<Button appearance='filled' type='submit' className={style.buttonSubmit}>Submit</Button>
		</Form>
		</Formik>
	)
}

export default MyForm;