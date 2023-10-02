import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import StepContext from '../StepsProvider/StepsProvider';
import { useContext } from 'react';

function ConfirmationPage() {
	const { previousStep } = useContext(StepContext);

	previousStep();
	previousStep();
	return (
		<>
			<Header/>
			<div style={{display: 'flex', alignItems: 'center', marginTop: '10%', marginBottom: '3%'}}>
				<CheckCircleIcon sx={{color: '#74e8ae', width: '100px', height: '100px', margin: 'auto'}} fontSize="large" />
			</div>
			<div style={{color: '#74e8ae', fontSize: '40px', textAlign: 'center'}}>Thank you for your order!</div>
		</>
	)
}

export default ConfirmationPage;