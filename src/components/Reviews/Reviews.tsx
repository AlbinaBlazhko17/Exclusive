import { Input } from '@mui/joy';
import { Rating } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Button from '../Button/Button';

import style from './styles.module.css';

function Reviews () {
	const initialValues = JSON.parse(localStorage.getItem('review')) || {};
	const [review, setReview] = useState(initialValues);

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.min(2, 'Title is too short!')
			.max (20, 'Title is too long!')
			.required ('Title is required!'),
		unique: Yup.number()
			.required ('Rating is required!'),
		reviewText: Yup.string()
			.required('Review is required!'),
	})

	// useEffect(() => {
	// 	const data = JSON.parse(localStorage.getItem('delivery'));
	// 	if (data) {
	// 		setReview(data);
	// 	}
	// }, []);

	return (
		<>
			<Formik
				initialValues={review}
				validationSchema={validationSchema}
				onSubmit={(values, {setSubmitting}) =>{
						console.log(values);
						localStorage.setItem('review', JSON.stringify(values));
						setReview({
							title: '',
							unique: '0',
							reviewText: '',
						});
						setSubmitting(false);
					}
				}
			>
				{({ setFieldValue }) => (
				<Form className={style.form}>
					<label className={style.label} htmlFor="title">Title</label>
					<div className={style.field}>
						<Field
							type="text"
							name="title"
							value={review.title}
							component={Input}
							onChange={(e) => {
								setFieldValue('title', e.target.value);
								setReview({...review, title: e.target.value})
							}}
						/>
						<ErrorMessage name="title" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.label} htmlFor="rating">Rating</label>
					<div className={style.field}>
						<Field type="number" name="unique">
							{({ field }) => (
								<Rating
									{...field}
									name="unique"
									value={review.unique}
									size="large"
									onClick={() => {
										setReview({...review, unique: field.value})
									}}
								/>
							)}
						</Field>
						<ErrorMessage name="unique" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.label} htmlFor="review">Review</label>
					<div className={style.field}>
						<Field
							type="text"
							name="reviewText"
							as="textarea"
							aria-label="Review"
							value={review.reviewText}
							rows={5}
							placeholder="Enter your review here"
							style={{ width: '100%', resize: 'none', border: '1px solid rgb(205, 215, 225)', borderRadius: '5px', fontWeight: 'bold', fontFamily: 'Poppins' }}
							onChange={(e) => {
								setFieldValue('reviewText', e.target.value)
								setReview({...review, reviewText: e.target.value})
							}}
						/>
						<ErrorMessage name="reviewText" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<Button type="submit" appearance='filled' style={{float: 'right'}}>Add review</Button>
				</Form>
				)}
			</Formik>
		</>
	)
}

export default Reviews;