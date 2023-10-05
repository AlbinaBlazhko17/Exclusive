import Subheader from "../Subheader/Subheader";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

function MostSellingProducts () {
	const dataFromLocalStorage = localStorage.getItem('orders');
	const orders = dataFromLocalStorage? Object.values(JSON.parse(dataFromLocalStorage)): [];

	const allOrders = [].concat(...orders);

	const productCounts = allOrders.reduce((counts, order) => {
		const productId = order.id;
		counts[productId] = (counts[productId] || 0) + order.cartQuantity;
		return counts;
	}, {});

	const mostSoldProducts = Object.keys(productCounts).reduce((result, productId) => {
		if (!result.length || productCounts[productId] > productCounts[result[0]]) {
			result = [productId];
		} else if (productCounts[productId] === productCounts[result[0]]) {
			result.push(productId);
		}
		return result;
	}, []);

	const mostSoldProductObjects = mostSoldProducts.map(productId => {
	return allOrders.find(order => order.id === +productId);
	});

	return (
		<>
			<Subheader type={'Best selling products'}/>
			<div>
				{
					mostSoldProductObjects.map(el => (
						<Link key={el.id} to={`/products/${el.category.id}/${el.id}`} style={{textDecoration: 'none'}}><ProductCard product={el}/></Link>
					))
				}
			</div>
		</>
	)
}

export default MostSellingProducts;