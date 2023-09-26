import {Radio} from '@mui/joy';
import style from '../Form/styles.module.css';

const RadioGroup = ({ field, ...props }) => (

	<div className={style.radio}>
		<Radio
			{...props}
			{...field}
			// checked={field.value === 'Male'}
			// onChange={() => form.setFieldValue(field.name, 'Male')}
			value="Male"
			name={field.name}
			inputProps={{ 'aria-label': 'Male' }}
			label='Male'
			sx={{
			color: 'black'
			}}s
		/>
		<Radio
			{...props}
			{...field}
			// checked={field.value === 'Female'}
			// onChange={() => form.setFieldValue(field.name, 'Female')}
			value="Female"
			// name={field.name}
			inputProps={{ 'aria-label': 'Female' }}
			label='Female'
			sx={{
				color: 'black',
				marginBottom: '10px'
			}}
		/>
	</div>
);

export default RadioGroup;
  