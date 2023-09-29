import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { IFormData } from "../../interfaces/formData.interface";

import style from './styles.module.css';

function Header () {
	const [searchTerm, setSearchTerm] = useState('');
	const [open, setOpen] = useState(false);
	const [type, setType] = useState('');
	const [formData, setFormData] = useState<IFormData>({
		email: '',
		password: '',
		confirmPassword: '',
		tel: '',
		gender: '',
		agreeToPolicy: false,
	});

	function handleClose () {
		localStorage.setItem('formData', JSON.stringify(formData));
		setOpen(false);
	}
	useEffect(() => {
		const savedData = localStorage.getItem('formData');
		if (savedData) {
			const parsedData = JSON.parse(savedData);
			setFormData(parsedData);
		}
	}, []);

	const handleOpen = (typeOfForm: string): void => {
		setType(typeOfForm);
		setOpen(true);
	};

	return (
		<header className={style.header}>
			<Link to="/" className={style.logo}>
				Exclusive
			</Link>
			<form action="">
				<div className={style.searchBar}>
					<input
						className={style.input}
						type="text"
						placeholder="What are you looking for?"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button className={style.submit} type="submit">
						<span>
							<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path id="Vector" d="M17.5 17L13.7223 13.2156M15.8158 8.15789C15.8158 10.0563 15.0617 11.8769 13.7193 13.2193C12.3769 14.5617 10.5563 15.3158 8.65789 15.3158C6.7595 15.3158 4.93886 14.5617 3.5965 13.2193C2.25413 11.8769 1.5 10.0563 1.5 8.15789C1.5 6.2595 2.25413 4.43886 3.5965 3.0965C4.93886 1.75413 6.7595 1 8.65789 1C10.5563 1 12.3769 1.75413 13.7193 3.0965C15.0617 4.43886 15.8158 6.2595 15.8158 8.15789V8.15789Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</span>
					</button>
				</div>
			</form>
			
			<div className={style.auth}>
				<div style={{width: '100px', display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
					<Link to='/wishlist'>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{marginRight: '20px'}}>
							<path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</Link>
					<Link to='/cart'>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{marginRight: '20px'}}>
							<path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</Link>
				</div>
				<Button appearance="outlined" onClick={() => handleOpen('Sign in')} style={{marginRight: '30px'}}>Sign in</Button>
				<Button appearance="filled" onClick={() => handleOpen('Sign up')}>Sign up</Button>
			</div>
			<Modal open={open} handleClose={handleClose} formData={formData} setFormData={setFormData} type={type}/>
		</header>
	)
}

export default Header;