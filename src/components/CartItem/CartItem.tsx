import { Link } from 'react-router-dom';
import NotFound from '@assets/product_not.png';
import ICartItem from './CartItem.props';
import TrashSvg from '@assets/Trash.svg';

import style from './styles.module.css';

function CartItem ({cartItem, handleRemoveFromCart, type = 'confirm'}: ICartItem) {
	return (
		<>
			<div key={cartItem.id} className={style.products}>
				<div className={style.productImage} style={{width: '300px'}}>
					<img src={cartItem.images[0]} alt={cartItem.title}
						onError={(e) => {
						const imgElement = e.target as HTMLImageElement;
						imgElement.src = NotFound;
					}} />
					<Link to={`/products/${cartItem.category.id}/${cartItem.id}`}><h3>{cartItem.title}</h3></Link>
				</div>
				<div className={style.price}>$ {cartItem.price}</div>
				<div className={style.quantity}>{cartItem.cartQuantity}</div>
				<div className={style.subtotal}>
					<div>$ {cartItem.price * cartItem.cartQuantity}</div>
					{type !== 'confirm' && 
						<div onClick={() => handleRemoveFromCart(cartItem?.id)} style={{cursor: 'pointer'}}>
							<img src={TrashSvg} alt="trash" />
						</div>
					}
				</div>
			</div>
		</>
	)
}

export default CartItem;