import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.when('showForgotPassword', ([showForgotPassword]) => {
			return showForgotPassword ? Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required') : Yup.string().notRequired();
		}),
	showFields: Yup.bool(),
	confirmPassword: Yup.string()
			.when('showFields', ([showFields]) => {
				return showFields ? Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Password is required') : Yup.string().notRequired();
			}),
	tel: Yup.string()
		.when('showFields', ([showFields]) => {
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