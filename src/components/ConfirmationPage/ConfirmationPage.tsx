import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import { IProductWithQuantity } from '@interfaces/product.interface';

import style from './styles.module.css';

function ConfirmationPage() {
	const [order, setOrder] = useState<IProductWithQuantity[]>([]);
	const ordersFromLocalStorage = localStorage.getItem('orders');
	const savedOrders = ordersFromLocalStorage? Object.values(JSON.parse(localStorage.getItem('orders'))): [];
	const lastItem = savedOrders[savedOrders.length - 1];
	let total = 0;

	useEffect(() => {
		const typeOfBuy = localStorage.getItem('typeOfBuy');
		
		if (typeOfBuy !== 'addToCart') {
			if (lastItem !== null) {
				setOrder([lastItem as IProductWithQuantity]);
			} else {
				setOrder([]);
			}
		} else {
			if (Array.isArray(lastItem)) {
				setOrder(lastItem);
			} else {
				setOrder([]);
			}
		}
	}, []);

	return (
		<>
			<Header/>
			<div className={style.circleIcon}>
				<CheckCircleIcon sx={{color: '#74e8ae', width: '100px', height: '100px', margin: 'auto'}} fontSize="large" />
			</div>
			<div className={style.text}>Thank you for your order!</div>
			<div className={style.wrapper}>
				{
					order.map(orderItem => {
						const subtotal = orderItem.price * orderItem.cartQuantity;

						total += subtotal;
						return (
							<CartItem key={orderItem.id} cartItem={orderItem} />
						)
					})
				}
				<div className={style.total}>Total: {total} $</div>
			</div>
		</>
	)
}

export default ConfirmationPage;