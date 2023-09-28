import IProduct from '../../interfaces/product.interface';
import style from './styles.module.css';
import notFound from '../../assets/product_not.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function ProductCard (
	{product}: {product: IProduct}
	) {
	const { images, title, price, description} = product;
	return (
		<Card sx={{ maxWidth: 400, minWidth: 250, height: 300}} className={style.card}>
			<CardMedia
				component="img"
				height="140"
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
			</CardContent>
		</Card>
	)
}

export default ProductCard;