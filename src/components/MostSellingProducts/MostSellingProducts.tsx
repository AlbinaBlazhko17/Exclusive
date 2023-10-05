import { useEffect, useState } from "react";
import Subheader from "../Subheader/Subheader";
import ProductCard from "../ProductCard/ProductCard";

function MostSellingProducts () {
	const [bestSelling,  setBestSelling] = useState();
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

//   useEffect(() => {
//     setBestSelling(mostSoldProductObjects);
//   }, [mostSoldProductObjects]);

	return (
		<>
			<Subheader type={'Best selling products'}/>
			<div>
				{
					mostSoldProductObjects.map(el => {
						return <ProductCard key={el.id} product={el}/>
					})
				}
			</div>
		</>
	)
}

export default MostSellingProducts;