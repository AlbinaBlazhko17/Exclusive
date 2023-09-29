import Header from '../Header/Header';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import style from './styles.module.css';
import { colors } from '@mui/joy';
import QuantityPicker from '../QuantityPicker/QuantityPicker';

function CartPage () {
	const cart = useSelector(state => state.cart.results);
	const [cartQuantity, setCartQuantity] = useState(1);

	const handleQuantityChange = (newQuantity: number) => {
		setCartQuantity(newQuantity);
	};

	return(
		<>
			<Header/>
			<div className={style.wrapper}>
					<div className={style.header}>
						<div className={style.headerItem} style={{width: '300px',display: 'flex', justifySelf: 'start'}}>Product</div>
						<div className={style.headerItem}>Price</div>
						<div className={style.headerItem}>Quantity</div>
						<div className={style.headerItem}>Subtotal</div>
					</div>
				{
					cart.map(cartItem => (
						<div key={cartItem.id} className={style.products}>
							<div className={style.productImage} style={{width: '300px'}}>
								<img src={cartItem.images[0]} alt={cartItem.title} style={{ width: '100px', height: '100px', borderRadius: '4px', marginRight: '20px'}} />
								<h3>{cartItem.title}</h3>
							</div>
							<div className={style.price}>$ {cartItem.price}</div>
							<div className={style.quantity}>
								<QuantityPicker onQuantityChange={handleQuantityChange} style={{height: '50px'}} />
							</div>
							<div className={style.subtotal}>$ {cartItem.price}</div>
						</div>
					))
				}
			</div>
		</>
	)
}

export default CartPage;