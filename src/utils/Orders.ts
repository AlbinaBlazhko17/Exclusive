import { getLocalStorage, setLocalStorage } from "./localStorage";

const updateOrdersAndSales = (order) => {
	const existingOrders = JSON.parse(getLocalStorage('orders')) || [];

	const existingOrderIndex = existingOrders.findIndex((item) => item.id === order.id);

	if (existingOrderIndex !== -1) {
		existingOrders[existingOrderIndex].sales += order.cartQuantity;
	} else {
		existingOrders.push({ ...order, sales: order.cartQuantity });
	}

	setLocalStorage('orders', existingOrders);
};

export default updateOrdersAndSales;
