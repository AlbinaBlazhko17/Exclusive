import IProduct from '../../interfaces/product.interface';
import style from './styles.module.css';
import notFound from '../../assets/product_not.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { removeItemFromWishlist } from '../../store/actions/actions';


function ProductCard (
	{product, type = 'listOfProducts'}: {product: IProduct, type: string},
	) {
	const { id, images, title, price, description} = product;
	const wishlistDispatch = useDispatch();

	function handleClick(e) {
		e.preventDefault();
		wishlistDispatch(removeItemFromWishlist({ id }));
	}
	return (
		<Card sx={{ maxWidth: type === 'listOfProducts'? 400: 500, minWidth: 250, height: type === 'listOfProducts'? 300: 540, position: 'relative'}} className={style.card}>
			{
				type === 'listOfWishlist' && (
					<div onClick={(e) => handleClick(e)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{position: 'absolute', width: '40px', height: '40px', right: '10%', top: '10%'}}>
							<path d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143" stroke="black" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				)
			}
			<CardMedia
				component="img"
				height={type === 'listOfProducts'? '140px': '350px' }
				image={images[0]}
				sx={{borderRadius: '5%'}}
				alt={style.title}
				onError={(e) => {
					const imgElement = e.target as HTMLImageElement;
					imgElement.src = notFound;
				}}
			/>
			<CardContent className={style.descr}>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography gutterBottom variant="h6" component="div">
					$ {price}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description.slice(0,50)}
				</Typography>
				{
					type === 'listOfWishlist' && (
						<Button appearance='filled' style={{width: '100%', marginTop: '20px'}}>Add to card</Button>
					)
				}
			</CardContent>
		</Card>
	)
}

export default ProductCard;