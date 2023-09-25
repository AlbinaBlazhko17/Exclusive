import { useState } from "react";
import Button from "../Button/Button";

import style from './styles.module.css';

function Header () {
	const [searchTerm, setSearchTerm] = useState('');
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
				<Button appearance="outlined">Sign in</Button>
				<Button appearance="filled">Sign up</Button>
			</div>
		</header>
	)
}

export default Header;