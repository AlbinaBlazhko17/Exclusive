import {Radio} from '@mui/joy';
import style from '../Form/styles.module.css';

const RadioGroup = ({ field, form }) => (

	<div className={style.radio}>
		<Radio
			{...field}
			checked={field.value === 'Male'}
			value="Male"
			label='Male'
		/>
		<Radio
			{...field}
			checked={field.value === 'Female'}
			value="Female"
			label='Female'
		/>
	</div>
);

export default RadioGroup;
  