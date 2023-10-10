import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';

import { IProductWithQuantity } from '@interfaces/product.interface';



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
			<div style={{display: 'flex', alignItems: 'center', marginTop: '10%', marginBottom: '3%'}}>
				<CheckCircleIcon sx={{color: '#74e8ae', width: '100px', height: '100px', margin: 'auto'}} fontSize="large" />
			</div>
			<div style={{color: '#74e8ae', fontSize: '40px', textAlign: 'center'}}>Thank you for your order!</div>
			<div style={{padding: '2% 10%'}}>
				{
					order.map(orderItem => {
						const subtotal = orderItem.price * orderItem.cartQuantity;

						total += subtotal;
						return (
							<CartItem key={orderItem.id} cartItem={orderItem} />
						)
					})
				}
				<div style={{float: 'right', fontWeight: 'bold', fontSize: '20px'}}>Total: {total} $</div>
			</div>
		</>
	)
}

export default ConfirmationPage;