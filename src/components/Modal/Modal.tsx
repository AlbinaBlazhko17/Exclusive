import {Modal, Sheet, ModalClose, Typography} from '@mui/joy';
import Form from '../Form/Form';

function MyModal({
	open, handleClose, type
  }: {open: boolean, handleClose: () => void, type: string}) {
	console.log(open)
	return(
		<Modal
			aria-labelledby="modal-title"
			aria-describedby="modal-desc"
			open={open}
			onClose={handleClose}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
		<Sheet
			variant="outlined"
			sx={{
				maxWidth: 900,
				borderRadius: 'md',
				padding: '2% 5%',
				boxShadow: 'lg',
			}}
		>
			<ModalClose variant="plain" sx={{ m: 1 }} />
				<Typography
					component="h2"
					id="modal-title"
					level="h2"
					textColor="inherit"
					fontWeight="lg"
					mb={1}
					textAlign='center'
				>
					{type}
				</Typography>
				<Form type={type}/>
			</Sheet>
		</Modal>
	)
}

export default MyModal;