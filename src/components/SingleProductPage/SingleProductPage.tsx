import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '../Header/Header';
import IProduct from '../../interfaces/product.interface';
import { getSingleProduct } from '../../services/Api';

import style from './styles.module.css';


function SingleProductPage () {
	const { categoryId, productId } = useParams();
	const [singleProduct, setSingleProduct] = useState<IProduct>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter((x) => x);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let data;
				if(productId) data = await getSingleProduct(+productId);
				console.log(data);
				if(!(data instanceof Error)) {
					setSingleProduct(data);
				}
				setLoading(false)
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<div style={{color: 'black'}}>
			<Header/>
			<div>
		{pathnames.length > 0 && (
		<div>
			<Link to="/">Home</Link>
			<span> / </span>
			<>
				<Link to='products/'>Products</Link>
				<span> / </span>
				<Link to={`products/${productId}`}>{singleProduct?.category.name}</Link>
				<span> / </span>
				<Link to={`products/${categoryId}`}>{singleProduct?.title}</Link>
			</>
		</div>
		)}
	</div>
			Here is Single product page
		</div>
	)
}

export default SingleProductPage;