import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'First name is too short!')
		.max (20, 'First name is too long!')
		.required ('First name is required!'),
	lastName: Yup.string()
		.min(2, 'Last name is too short!')
		.max (20, 'Last name is too long!')
		.required ('Last name is required!'),
	city: Yup.string()
		.min(5, 'City is too short!')
		.max(20, 'City is too long!')
		.required('City is required!'),
	streetAddress: Yup.string()
		.min(10, 'Street address it too short')
		.max(20, 'Street address is too long!')
		.required('Street address is required'),
	apartments: Yup.number()
		.max(10, 'Apartmants is too long'),
	tel: Yup.string()
		.min(10, 'Phone number is too short')
		.required('Phone number is required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	additionalInfo: Yup.string()
		.max(100, 'additional info is too long')
})