import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IState from '@interfaces/state.interface';
import WishlistSvg from '@assets/Wishlist.svg'
import CartSvg from '@assets/Cart.svg';

import styles from './styles.module.css';

function WishlistCartCounter ({ type }: {type: string}) {
	const [count, setCount] = useState<number>();
	const storeData = useSelector((state: IState) => (type === 'wishlist'? state.wishlist.results: state.cart.results));
	useEffect(() => {
		const length = storeData.length;
		length.toString().length > 2 ? setCount(0) : setCount(length);
	});

	return (
		<div className={styles.container}>
			<Link to={`/${type}`}>
				<span className={styles.counter}>{count}</span>
				{type === 'wishlist'? (
					<div style={{marginRight: '20px'}}>
						<img src={WishlistSvg} alt="wishlist" />
					</div>
				): (
					<div>
						<img src={CartSvg} alt="Cart" />
					</div>
				)}
			</Link>
			
		</div>
	);
}

export default WishlistCartCounter;