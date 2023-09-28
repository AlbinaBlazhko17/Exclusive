import Homepage from '../components/Homepage/Homepage';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import SingleProductPage from '../components/SingleProductPage/SingleProductPage';

const routesConfig = [
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/products',
		element: <ProductsPage />,
		// children: [
		// 	{ path: '/', element: <ProductsPage /> },
		// 	{ path: ':categoryId', element: <ProductsPage /> },
		// 	{ path: ':categoryId/:productId', element: <SingleProductPage /> },
		// ],
	},
	{
		path: '/products/:categoryId',
		element: <ProductsPage />,
	},
	{
		path: '/products/:categoryId/:productId',
		element: <SingleProductPage />,
	},
	// {
	// 	path: '*',
	// 	element: <NotFoundPage />, // Add a NotFoundPage route for unmatched paths
	// },
];


export default routesConfig;