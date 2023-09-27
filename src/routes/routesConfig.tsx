import Homepage from '../components/Homepage/Homepage';
import ProductsPage from '../components/ProductsPage/ProductsPage';

const routesConfig = [
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/products',
		element: <ProductsPage />,
	},
	// {
	// 	path: '/products/:id',
	// 	element: <RequestFormPage typeOfRequest="order" />,
	// },
	// {
	// 	path: '*',
	// 	element: <NotFoundPage />,
	// },
];

export default routesConfig;