import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItemFromCart } from '../../store/actions/actions';
import Header from '../Header/Header';
import StepContext from '../StepsProvider/StepsProvider';
import Button from '../Button/Button';
import Subheader from '../Subheader/Subheader';

import style from './styles.module.css';

function CartPage () {
	const cart = useSelector(state => state.cart.results);
	const dispatch = useDispatch();
	const { nextStep, currentStep } = useContext(StepContext);
	const navigator = useNavigate();

	const handleRemoveFromCart = (id) => {
		dispatch(removeItemFromCart({ id }));
	}
	useEffect(() => {
		console.log(currentStep);
	}, [currentStep])

	return(
		<>
			<Header/>
				<div className={style.wrapper}>
					<Subheader/>
					<hr style={{backgroundColor: '#DB4444', height: '2px', border: '0', marginBottom: '5%'}} />
						<div className={style.header}>
							<div className={style.headerItem} style={{width: '300px',display: 'flex', justifySelf: 'start'}}>Product</div>
							<div className={style.headerItem}>Price</div>
							<div className={style.headerItem}>Quantity</div>
							<div className={style.headerItem}>Subtotal</div>
						</div>
					<div>
					{
						cart.length? (
							cart.map(cartItem => (
								<>
									<div key={cartItem.id} className={style.products}>
										<div className={style.productImage} style={{width: '300px'}}>
											<img src={cartItem.images[0]} alt={cartItem.title} style={{ width: '100px', height: '100px', borderRadius: '4px', marginRight: '20px'}} />
											<Link to={`/products/${cartItem.category.id}/${cartItem.id}`}><h3>{cartItem.title}</h3></Link>
										</div>
										<div className={style.price}>$ {cartItem.price}</div>
										<div className={style.quantity}>{cartItem.cartQuantity}</div>
										<div className={style.subtotal}>
											<div>$ {cartItem.price * cartItem.cartQuantity}</div>
											<div onClick={() => handleRemoveFromCart(cartItem.id)} style={{cursor: 'pointer'}}>
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
													<path d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143" stroke="black" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
											</div>
										</div>
									</div>
								</>
							))
		
						): <h2 style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bolder'}}>Cart is empty</h2>
						}
						{cart.length && <Button appearance='filled' onClick={() => {nextStep(); navigator('/cart/form')}} style={{float: 'right', marginTop: '20px'}}>Procees to checkout</Button>}
					</div>
				</div>
		</>
	)
}

export default CartPage;