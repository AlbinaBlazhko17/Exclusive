import {Input, FormLabel, Radio, Checkbox} from '@mui/joy';
import Key from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import Button from '../Button/Button';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css'
import style from './styles.module.css';

function Form ({type}: { type: string }) {
	return (
		<form action="">
			<FormLabel sx={{
				fontSize: '18px',
				marginBottom: '10px'
			}}>Login</FormLabel>
			<Input
				placeholder="mail@mui.com"
				type="email"
				startDecorator={<MailIcon />}
				required
				sx={{
					marginBottom: '30px'
				}}
			/>
			<FormLabel sx={{
				fontSize: '18px',
				marginBottom: '10px'
			}}>Password</FormLabel>
			<Input
				type="password"
				placeholder="Type in here…"
				startDecorator={<Key />}
				required
			/>
			{type === 'Sign up'? (
				<>
					<FormLabel sx={{
						fontSize: '18px',
						marginBottom: '10px',
						marginTop: '10px'
					}}>Password</FormLabel>
					<Input
						type="password"
						placeholder="Type in here…"
						startDecorator={<Key />}
						required
					/>
					<FormLabel sx={{
						fontSize: '18px',
						marginBottom: '10px',
						marginTop: '10px'
					}}>Phone number</FormLabel>
					<PhoneInput
						country={'ua'}
					/>
					<FormLabel sx={{
						fontSize: '18px',
						marginBottom: '10px',
						marginTop: '10px',
						textAlign: 'center',
						display: 'block'
					}}>Sex</FormLabel>
					<div className={style.radio}>
						<Radio
							// checked={selectedValue === 'a'}
							// onChange={handleChange}
							value="Male"
							name="radio-buttons"
							slotProps={{ input: { 'aria-label': 'Male' } }}
							label='Male'
							sx={{
								color: 'black'
							}}
						/>
						<Radio
							// checked={selectedValue === 'b'}
							// onChange={handleChange}
							value="Female"
							label='Female'
							name="radio-buttons"
							slotProps={{ input: { 'aria-label': 'Female' } }}
							sx={{
								color: 'black',
								marginBottom: '10px'
							}}
						/>
					</div>
					<hr style={{marginBottom: '30px'}}/>
					<Checkbox label="I agree with Private policy" required/>
				</>
			): undefined}
			{type === 'Sign in'? <a href="#" className={style.forgot}>Forgot password?</a>: undefined}
			<Button appearance='filled' type='submit' className={style.buttonSubmit}>Submit</Button>
		</form>
	)
}

export default Form;