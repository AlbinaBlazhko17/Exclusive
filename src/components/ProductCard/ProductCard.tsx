import IProduct from '../../interfaces/product.interface';
import style from './styles.module.css';

function ProductCard ({product}: {product: IProduct}) {
	const {images, title, price} = product;
	return (
		<div className={style.card}>
			<img src={images[0]? images[0]: 'src/assets/product_not.png'} alt={title} className={style.img}
				onError={(e) => {
					const imgElement = e.target as HTMLImageElement; // Cast e.target to HTMLImageElement
					imgElement.src = 'src/assets/product_not.png'; // Set the source to the default image
				}}
			/>
			<div className={style.descr}>
				<div className={style.title}>{title}</div>
				<div className={style.price}>$ {price}</div>
				<button className={style.add}>Add to card</button>
			</div>
		</div>
	)
}

export default ProductCard;