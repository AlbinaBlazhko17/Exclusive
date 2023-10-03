import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItemsFromCart, removeItemFromBuyNow } from '../../store/actions/actions';
import CartItem from '../CartItems/CartItems';
import updateOrdersAndSales from '../../utils/Orders';
import store from '../../store/store';

function ConfirmationPage() {
	const [order, setOrder] = useState([]);
	const cart = localStorage.getItem('typeOfBuy') === 'addToCart'? store.getState().cart.results: store.getState().buyNow;
	const cartDispatch = useDispatch();
	let total = 0;

	const handleRemoveItems = () => {
		if (localStorage.getItem('typeOfBuy') === 'addToCart') {
			cartDispatch(removeAllItemsFromCart());
		} else {
			cartDispatch(removeItemFromBuyNow());
		}
	};
	
	useEffect(() => {
		if(localStorage.getItem('typeOfBuy') !== 'addToCart') setOrder([cart])
		else setOrder(cart);
		handleRemoveItems();
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