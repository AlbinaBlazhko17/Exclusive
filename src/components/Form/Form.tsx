import {Input, FormLabel} from '@mui/joy';
import Key from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import Button from '../Button/Button';

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
				</>
			): undefined}
			{type === 'Sign in'? <a href="#" className={style.forgot}>Forgot password?</a>: undefined}
			<Button appearance='filled' type='submit' className={style.buttonSubmit}>Submit</Button>
		</form>
	)
}

export default Form;