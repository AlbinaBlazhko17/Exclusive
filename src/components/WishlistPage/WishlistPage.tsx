import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IProduct from '../../interfaces/product.interface';

import style from './styles.module.css';

function WishlistPage () {
	const wishlist = useSelector(state => state.wishlist.results);

	return (
		<>
			<Header/>
			<div className={style.wishlist}>
				<div className={style.subheader}>
					<div className={style.redBox}></div>
					<h3>Wishlist</h3>
				</div>
				<hr style={{backgroundColor: '#DB4444', height: '2px', border: '0', marginBottom: '5%'}} />
				<div className={style.products}>
					{wishlist.length !== 0 ? wishlist.map((product: IProduct) => (
						<Link to={`/products/${product.category.id}/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'black' }}>
							<ProductCard product={product} type={'listOfWishlist'} />
						</Link>
					)): <div style={{textAlign: 'center', color: 'black', fontSize: '40px', fontWeight: 'bolder'}}>Here is no products</div>}
				</div>
			</div>
		</>
	)
}

export default WishlistPage;