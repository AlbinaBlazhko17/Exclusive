const updateOrdersAndSales = (order) => {
	const ordersFromLocalStorage = localStorage.getItem('orders');
	const existingOrders = ordersFromLocalStorage ? Object.values(JSON.parse(ordersFromLocalStorage)): [];
	existingOrders.push(order)

	const updatedResultsObject = existingOrders.reduce((acc, item) => {
		acc.push(item);
		return acc;
	}, []);

	localStorage.setItem('orders', JSON.stringify(updatedResultsObject));
};

export default updateOrdersAndSales;
