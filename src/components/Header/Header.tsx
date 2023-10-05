import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { IFormData } from "../../interfaces/formData.interface";
import WishlistCartCounter from "../WishlistCartCounter/WishListCartCounter";

import style from './styles.module.css';
import SearchBarWithDropDown from "../SearchBarWithDropDown/SearchBarWithDropDown";

function Header () {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [hamburgerActive, sethamburgerActive] = useState<boolean>(false);
	const [type, setType] = useState<string>('');
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
					<SearchBarWithDropDown/>
				</div>
			</form>
			
			<div className={style.interactive}>
				<div style={{width: '100px', display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
					<WishlistCartCounter type="wishlist"/>
					<WishlistCartCounter type="cart" />
				</div>
				<div className={hamburgerActive? style.authActive: style.auth}>
					<Button appearance="outlined" onClick={() => handleOpen('Sign in')} style={{marginRight: '30px'}}>Sign in</Button>
					<Button appearance="filled" onClick={() => handleOpen('Sign up')}>Sign up</Button>
				</div>
			</div>
			<Modal open={open} handleClose={handleClose} formData={formData} setFormData={setFormData} type={type}/>
			<div className={hamburgerActive? style.hamburgerActive: style.hamburger} onClick={() => sethamburgerActive(!hamburgerActive)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</header>
	)
}

export default Header;