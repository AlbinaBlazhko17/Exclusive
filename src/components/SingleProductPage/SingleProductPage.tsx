import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import IProduct, { IProductWithQuantity } from '@interfaces/product.interface';
import { getSingleProduct } from '@services/Api';
import notFound from '@assets/product_not.png';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWishlist, removeItemFromWishlist, addItemToBuyNow } from '@store/actions/actions';
import {addItemToCart, removeItemFromCart} from '../../store/slices/CartSlice';
import StepContext from '../StepsProvider/StepsProvider';
import IState from '@interfaces/state.interface';
import Reviews from '../Reviews/Reviews';
import Subheader from '../Subheader/Subheader';
import DeliverySvg from '@assets/icon-delivery.svg';
import ReturnSvg from '@assets/Icon-return.svg';

import style from './styles.module.css';
import WishlistIcon from './WishlistIcon';

function SingleProductPage () {
	const { categoryId, productId } = useParams();
	const [singleProduct, setSingleProduct] = useState<IProduct>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [cartQuantity, setCartQuantity] = useState(1);
	const [wishlist, setWishlist] = useState(false);
	const storeDataWishlist = useSelector((state: IState) => state.wishlist.results);
	const stepContext = useContext(StepContext);

	if (!stepContext) {
		throw new Error(
			"stepContext has to be used within <Provider>"
		);
	}
	const {nextStep} = stepContext;
	const navigator = useNavigate();

	const dispatch = useDispatch();

	const dispatchFavouritePeople = () => {
		if(singleProduct) {
			if (wishlist) {
				dispatch(removeItemFromWishlist( singleProduct.id ));
				setWishlist(false);
			} else {
				dispatch(addItemToWishlist( singleProduct ));
				setWishlist(true);
			}
		}
	}

  
	const handleQuantityChange = (newQuantity: number) => {
		setCartQuantity(newQuantity);
	};

	const handleBuyNow = () => {
		const productWithCartQuantity = {
			...singleProduct,
			cartQuantity,
		};
		nextStep();
		navigator('/cart/form');
		localStorage.setItem('typeOfBuy', 'buyNow');
		if(productWithCartQuantity && singleProduct) {
			dispatch(addItemToBuyNow( productWithCartQuantity as IProductWithQuantity ));
			dispatch(removeItemFromCart( singleProduct.id ));
			dispatch(removeItemFromWishlist( singleProduct.id ));
		}
		setWishlist(false);
	}

	const handleAddToCart = () => {
		const productWithCartQuantity = {
			...singleProduct,
			cartQuantity,
		};
		localStorage.setItem('typeOfBuy', 'addToCart');

		dispatch(addItemToCart( productWithCartQuantity as IProductWithQuantity ));
		singleProduct && dispatch(removeItemFromWishlist( singleProduct.id ));
		setWishlist(false);
	}

	useEffect(() => {
		(async () => {
			try {
				let data;
				if(productId) data = await getSingleProduct(+productId);

				if(!(data instanceof Error)) {
					setSingleProduct(data);
				}
				storeDataWishlist.forEach(item => {
					if(productId) {
						if (item.id === +productId) setWishlist(true);
					}
					else setWishlist(false);
				});

				setLoading(false)
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		}) ();
	}, []);


	return (
		<div>
			<Header/>
			<div className={style.wrapper}>
				{!error? (
					<>
						<div className={style.breadcrumbs}>
							<Link to="/">Home</Link>
							<span className={style.slash}> / </span>
							<Link to='/products/'>Products</Link>
							<span className={style.slash}> / </span>
							<Link to={`/products/${categoryId}`}>{singleProduct?.category.name}</Link>
							<span className={style.slash}> / </span>
							<Link to={`/products/${productId}`}>{singleProduct?.title}</Link>
						</div>
						<div className={style.product}>
							<div className={style.img}>
								<img src={singleProduct?.images[0]}
									alt={singleProduct?.title}
									onError={(e) => {
										const imgElement = e.target as HTMLImageElement;
										imgElement.src = notFound;
									}}
								/>
							</div>
							<div className={style.aboutProduct}>
								<h3 className={style.title}>{singleProduct?.title}</h3>
								<p className={style.price}>${singleProduct?.price}</p>
								<p className={style.description}>{singleProduct?.description}</p>
								<hr style={{marginBottom: 120}}/>
								<div className={style.buy}>
									<QuantityPicker onQuantityChange={handleQuantityChange} quantity={cartQuantity}/>
									<Button appearance='filled' className={style.buyButton} onClick={handleAddToCart}>Add to cart</Button>
									<Button appearance='filled' className={style.buyButton} onClick={handleBuyNow}>Buy now</Button>
									<div className={style.wishlist} onClick={dispatchFavouritePeople}>
										<WishlistIcon fill={wishlist? 'yellow': 'none'}/>
									</div>
								</div>
								<div className={style.delivery}>
									<div style={{marginRight: "40px"}}>
										<img src={DeliverySvg} alt="delivery" />
									</div>
									<div>
										<h3>Free delivery</h3>
										<p>Enter your postal code for Delivery Availability</p>
									</div>
								</div>
								<div className={style.delivery}>
									<div style={{marginRight: "40px"}}>
										<img src={ReturnSvg} alt="return" />
									</div>
									<div>
										<h3>Return delivery</h3>
										<p>Free 30 Days Delivery Returns. Details</p>
									</div>
								</div>
							</div>
						</div>
					</>
				): <div style={{fontSize: '40px', textAlign: 'center'}}>Product not Found</div>}
				<div className={style.reviews}>
					<Subheader type='Reviews'/>
					<Reviews/>
				</div>
			</div>
		</div>
	)
}

export default React.memo(SingleProductPage);