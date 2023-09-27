import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import style from './styles.module.css';

function Header () {
	const [searchTerm, setSearchTerm] = useState('');
	const [open, setOpen] = useState(false);
	const [type, setType] = useState('');
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		tel: '',
		gender: '',
		agreeToPolicy: false,
	});

	useEffect(() => {
		console.log(formData)
	}, [formData])

	function handleClose () {
		localStorage.setItem('formData', JSON.stringify(formData));
		setOpen(false);
	}
	useEffect(() => {
		// Check if there's saved form data in local storage
		const savedData = localStorage.getItem('formData');
		if (savedData) {
		// Parse the JSON string back into an object
			const parsedData = JSON.parse(savedData);
			// Update your form data state with the parsed data
			setFormData(parsedData);
		}
	}, []);

	const handleOpen = (typeOfForm: string): void => {
		setType(typeOfForm);
		setOpen(true);
	};

	return (
		<header className={style.header}>
			<h2 className={style.logo}>Exclusive</h2>
			<form action="">
				<div className={style.searchBar}>
					<input
						className={style.input}
						type="text"
						placeholder="What are you looking for?"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button className={style.submit} type="submit"><img src="src/assets/search.svg" alt="search" /></button>
				</div>
			</form>
			<div className={style.auth}>
				<Button appearance="outlined" onClick={() => handleOpen('Sign in')}>Sign in</Button>
				<Button appearance="filled" onClick={() => handleOpen('Sign up')}>Sign up</Button>
			</div>
			<Modal open={open} handleClose={handleClose} formData={formData} setFormData={setFormData} type={type}/>
		</header>
	)
}

export default Header;