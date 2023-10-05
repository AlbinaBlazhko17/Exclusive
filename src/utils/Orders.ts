import { getLocalStorage, setLocalStorage } from "./localStorage";

const updateOrdersAndSales = (order) => {
	const ordersFromLocalStorage = localStorage.getItem('orders');
	let existingOrders = ordersFromLocalStorage ? Object.values(JSON.parse(ordersFromLocalStorage)): [];
	if(!existingOrders.length) existingOrders.push(order)

	const newItems = [];

	existingOrders.forEach(el => {
		order.forEach(item => {
			if(el.id === item.id) el.numberOfSelling += item.cartQuantity;
			else newItems.push(order);
		})
	})
	
	console.log(newItems);
	existingOrders = [...existingOrders, ...newItems];

	const updatedResultsObject = existingOrders.reduce((acc, item) => {
		acc.push(item);
		return acc;
	}, []);

	localStorage.setItem('orders', JSON.stringify(updatedResultsObject));
};

export default updateOrdersAndSales;
