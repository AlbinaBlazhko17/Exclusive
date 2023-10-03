import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItemsFromCart, removeItemFromBuyNow } from '../../store/actions/actions';
import CartItem from '../CartItems/CartItems';

function ConfirmationPage() {
	const [order, setOrder] = useState([]);
	const cart = useSelector(state => state.cart.results);
	const cartDispatch = useDispatch();
	let total = 0;

	useEffect(() => {
		
		setOrder(cart);
		localStorage.getItem('typeOfBuy') === 'addToCart'
			? cartDispatch(removeAllItemsFromCart())
			: cartDispatch(removeItemFromBuyNow());
	}, []);

	// useEffect(() => {
	// 	console.log(order);
	// }, [order])

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