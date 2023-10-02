import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItems } from '../../store/actions/actions';
import CartItem from '../CartItems/CartItems';

function ConfirmationPage() {
	const [order, setOrder] = useState([]);
	const cart = useSelector(state => state.cart.results);
	const cartDispatch = useDispatch();

	useEffect(() => {
		setOrder(cart);
		cartDispatch(removeAllItems({ storageKey: 'cart'}));
	}, []);

	useEffect(() => {
		console.log(order);
	}, [order])

	return (
		<>
			<Header/>
			<div style={{display: 'flex', alignItems: 'center', marginTop: '10%', marginBottom: '3%'}}>
				<CheckCircleIcon sx={{color: '#74e8ae', width: '100px', height: '100px', margin: 'auto'}} fontSize="large" />
			</div>
			<div style={{color: '#74e8ae', fontSize: '40px', textAlign: 'center'}}>Thank you for your order!</div>
			<div>
				{order.map((orderItem) => (
					<CartItem cartItem={orderItem} />
				))
				}
			</div>
		</>
	)
}

export default ConfirmationPage;