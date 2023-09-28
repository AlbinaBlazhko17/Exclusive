import IProduct from '../../interfaces/product.interface';
import style from './styles.module.css';

function ProductCard (
	{product}: {product: IProduct}
	) {
	const { images, title, price, description} = product;
	return (
		<div className={style.card}>
			<img src={images[0]} alt={title} className={style.img}
				onError={(e) => {
					const imgElement = e.target as HTMLImageElement;
					imgElement.src = 'src/assets/product_not.png';
				}}
			/>
			<div className={style.descr}>
				<div className={style.title}>{title}</div>
				<div className={style.price}>$ {price}</div>
				<div className={style.title}>{description.slice(0,50)}</div>
			</div>
		</div>
	)
}

export default ProductCard;