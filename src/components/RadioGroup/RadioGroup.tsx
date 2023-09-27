import {Radio} from '@mui/joy';
import style from '../Form/styles.module.css';

const RadioGroup = ({ field, formData, setFormData }) => (
	<div className={style.radio}>
		<Radio
			{...field}
			checked={field.value === 'Male'}
			value="Male"
			label='Male'
			onChange={() => setFormData({
				...formData, 
				gender: 'Male'
			})}
		/>
		<Radio
			{...field}
			checked={field.value === 'Female'}
			value="Female"
			label='Female'
			onChange={() => setFormData({
				...formData, 
				gender: 'Female'
			})}
		/>
	</div>
);

export default RadioGroup;
  