import Homepage from '../components/Homepage/Homepage';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import SingleProductPage from '../components/SingleProductPage/SingleProductPage';
import WishlistPage from '../components/WishlistPage/WishlistPage';

const routesConfig = [
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/products',
		element: <ProductsPage />,
	},
	{
		path: '/products/:categoryId',
		element: <ProductsPage />,
	},
	{
		path: '/products/:categoryId/:productId',
		element: <SingleProductPage />,
	},
	{
		path: '/wishlist',
		element: <WishlistPage/>
	}
	// {
	// 	path: '*',
	// 	element: <NotFoundPage />, // Add a NotFoundPage route for unmatched paths
	// },
];


export default routesConfig;