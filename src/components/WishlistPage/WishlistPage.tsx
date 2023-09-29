import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IProduct from '../../interfaces/product.interface';
import Subheader from '../Subheader/Subheader';

import style from './styles.module.css';

function WishlistPage () {
	const wishlist = useSelector(state => state.wishlist.results);

	return (
		<>
			<Header/>
			<div className={style.wishlist}>
				<Subheader/>
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