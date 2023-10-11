import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart } from '@store/actions/actions';
import Button from '../Button/Button';
import Header from '../Header/Header';
import StepContext from '../StepsProvider/StepsProvider';
import Subheader from '../Subheader/Subheader';
import CartItem from '../CartItem/CartItem';
import IState from '@interfaces/state.interface';
import store from '@store/store';
import { IProductWithQuantity } from '@interfaces/product.interface';
import cn from 'classnames';

import style from './styles.module.css';

type AppDispatch = typeof store.dispatch

function CartPage () {
	const cart: IProductWithQuantity[] = useSelector((state: IState) => state.cart);
	const cartDispatch: AppDispatch = useDispatch();
	const stepContext = useContext(StepContext);
	console.log(cart)

	if (!stepContext) {
		throw new Error(
			"stepContext has to be used within <Provider>"
		);
	}

	const { nextStep } = stepContext;

	const navigator = useNavigate();
	let total = 0;

	const handleRemoveFromCart = (id: number): void => {
		cartDispatch(removeItemFromCart( id ));
	}

	const goBack = () => {
		navigator(-1);
	};

	const handleClickProcessToCheckout = () => {
		nextStep(); navigator('/cart/form');
		localStorage.setItem('typeOfBuy', 'addToCart')
	}

	return(
		<>
			<Header/>
				<div className={style.wrapper}>
					<Button appearance='filled' style={{marginRight: '30px'}} onClick={goBack}>Go Back</Button>
					<Subheader type={'Cart'}/>
					{cart.length !== 0 && (
						<>
							<div className={style.header}>
								<div className={cn(style.headerItem, style.product)}>Product</div>
								<div className={style.headerItem}>Price</div>
								<div className={style.headerItem}>Quantity</div>
								<div className={style.headerItem}>Subtotal</div>
							</div>
						</>
					)}
					<div>
					{
						cart.length? (
							cart.map((cartItem) => {
								const subtotal = cartItem.price * cartItem?.cartQuantity;

								total += subtotal;
								return (
									<CartItem key={cartItem.id} cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} type='cart'/>
								)
							})
		
						): <h2 className={style.empty}>Cart is empty</h2>
						}
						{cart.length? (
							<div className={style.subfooter}>
								<div className={style.total}>Total: {total} $</div>
								<Button appearance='filled' onClick={handleClickProcessToCheckout} style={{marginTop: '20px'}}>Procees to checkout</Button>
							</div>
						): null}
					</div>
				</div>
		</>
	)
}

export default CartPage;