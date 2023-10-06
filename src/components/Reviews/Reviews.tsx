import { Input } from '@mui/joy';
import { Rating } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as fs from "fs";
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../Button/Button';

import style from './styles.module.css';

function Reviews () {
	const [review, setReview] = useState();
	const initialFormDataDelivery = {
		title: '',
		rating: 0,
		review: '',
	}

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.min(2, 'Title is too short!')
			.max (20, 'Title is too long!')
			.required ('Title is required!'),
		rating: Yup.number()
			.required ('Rating is required!'),
		review: Yup.string()
			.required('Review is required!'),
	})

	return (
		<>
			<Formik
				initialValues={initialFormDataDelivery}
				validationSchema={validationSchema}
				onSubmit={(values, {setSubmitting}) =>{
					fs.writeFile('reviews.json', JSON.stringify(values, null, 2), 'utf8', (err) => {
						if (err) {
							console.error('Error writing reviews.json:', err);
							return;
						}

						console.log('Data has been written to reviews.json');
					})
						console.log('It submits')
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
							component={Input}
							onChange={(e) =>{
								setFieldValue('title', e.target.value);
							}}
						/>
						<ErrorMessage name="title" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.label} htmlFor="rating">Rating</label>
					<div className={style.field}>
						<Field type="number" name="rating">
							{({ field }) => (
								<Rating
									{...field}
									name="rating"
									value={+field.value || 0}
									size="large"
								/>
							)}
						</Field>
						<ErrorMessage name="rating" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.label} htmlFor="review">Review</label>
					<div className={style.field}>
						<Field
							type="text"
							name="review"
							as="textarea"
							aria-label="Review"
							rows={5}
							placeholder="Enter your review here"
							style={{ width: '100%', resize: 'none', border: '1px solid rgb(205, 215, 225)', borderRadius: '5px', fontWeight: 'bold', fontFamily: 'Poppins' }}
							// formData={formDataDelivery}
							// setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="review" render={(errorMsg) => (
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