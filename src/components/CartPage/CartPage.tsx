import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart } from '../../store/actions/actions';
import Button from '../Button/Button';
import Header from '../Header/Header';
import StepContext from '../StepsProvider/StepsProvider';
import Subheader from '../Subheader/Subheader';
import CartItem from '../CartItems/CartItems';

import style from './styles.module.css';

function CartPage () {
	const cart = useSelector(state => state.cart.results);
	const cartDispatch = useDispatch();
	const { nextStep, currentStep } = useContext(StepContext);
	const navigator = useNavigate();
	let total = 0;

	const handleRemoveFromCart = (id) => {
		cartDispatch(removeItemFromCart({ id }));
	}

	const goBack = () => {
		navigator(-1);
	};

	return(
		<>
			<Header/>
				<div className={style.wrapper}>
					<Button appearance='filled' style={{marginRight: '30px'}} onClick={goBack}>Go Back</Button>
					<Subheader type={'Cart'}/>
					{cart.length? (
						<>
							<hr style={{backgroundColor: '#DB4444', height: '2px', border: '0', marginBottom: '5%'}} />
							<div className={style.header}>
								<div className={style.headerItem} style={{width: '300px',display: 'flex', justifySelf: 'start'}}>Product</div>
								<div className={style.headerItem}>Price</div>
								<div className={style.headerItem}>Quantity</div>
								<div className={style.headerItem}>Subtotal</div>
							</div>
						</>
					): undefined}
					<div>
					{
						cart.length? (
							cart.map(cartItem => {
								const subtotal = cartItem.price * cartItem.cartQuantity;

								total += subtotal;
								return (
									<CartItem key={cartItem.id} cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} type='cart'/>
								)
							})
		
						): <h2 style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bolder'}}>Cart is empty</h2>
						}
						{cart.length? (
							<div style={{display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
								<div style={{float: 'right', fontWeight: 'bold', fontSize: '20px', marginRight: '5%'}}>Total: {total} $</div>
								<Button appearance='filled' onClick={() => {nextStep(); navigator('/cart/form'); localStorage.setItem('typeOfBuy', 'addToCart')}} style={{marginTop: '20px'}}>Procees to checkout</Button>
							</div>
						): undefined}
					</div>
				</div>
		</>
	)
}

export default CartPage;