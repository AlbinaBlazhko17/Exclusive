import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, 'Title is too short!')
		.max (20, 'Title is too long!')
		.required ('Title is required!'),
	unique: Yup.number()
		.required ('Rating is required!'),
	reviewText: Yup.string()
		.required('Review is required!'),
})