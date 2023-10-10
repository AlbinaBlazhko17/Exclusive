import { Input } from '@mui/joy';
import { Rating } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Button from '../Button/Button';
import { validationSchema } from './validationSchema';

import style from './styles.module.css';

function Reviews () {
	const initialValues = JSON.parse(localStorage.getItem('review')) || {};
	const [review, setReview] = useState(initialValues);

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
							className={style.review}
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