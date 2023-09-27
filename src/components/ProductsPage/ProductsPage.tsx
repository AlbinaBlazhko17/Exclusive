import { useState, useEffect } from "react";
import { getAllCategories, getAllProducts } from "../../services/Api";
import ICategory from "../../interfaces/category.interface";
import Header from "../Header/Header";
import IProduct from "../../interfaces/product.interface";

import style from './styles.module.css';
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";

function ProductsPage () {
		const [products, setProducts] = useState<IProduct[]>([])
		const [categories, setCategories] = useState<ICategory[]>([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [offset, setOffset] = useState(0);
		const [limit, setLimit] = useState(16);
		const maxOffset = Math.max(0, 200 - limit);

		const nextPage = () => {
			if (offset < maxOffset) {
				setOffset(offset + limit);
			}
		};

		const prevPage = () => {
			if (offset >= limit) {
				setOffset(offset - limit);
			}
		};

		useEffect(() => {
			const fetchData = async () => {
				try {
					const data = await getAllCategories();

					if(!(data instanceof Error)) {
						setCategories(data);
					}
					setLoading(false)
				} catch (error) {
					setError(true);
					setLoading(false);
				}
			}
			fetchData();
		}, []);

		useEffect(() => {
			const fetchData = async () => {
				try {
					const data = await getAllProducts(offset, limit);
					console.log(data)
					if(!(data instanceof Error)) {
						setProducts(data);
					}
					setLoading(false)
				} catch (error) {
					setError(true);
					setLoading(false);
				}
			}
			fetchData();
		}, [offset, limit]);

	
		if (loading) {
			return <div>Loading...</div>;
		}
		
		if (error) {
			return <div className={style.error}>Error loading categories. Please try again later.</div>;
		}
	return (
		<>
			<Header/>
			<div className={style.wrapper}>
				<div className={style.categories}>
					<ul className={style.list}>
						{categories.map(category => (
							<li className={style.listItem} key={category.id}><a href="#">{category.name}<span className={style.arrowIcon}></span></a></li>
						))}
					</ul>
				</div>
				<div className={style.productsWrapper}>
						<div className={style.products}>
							{products.map((product: IProduct) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
						<div className={style.buttonsPagination}>
							<Button appearance={offset === 0? 'outlined': 'filled'} onClick={() => prevPage()} disabled={offset === 0} style={{marginRight: '50px'}}>Previous</Button>
							<Button appearance={offset > maxOffset? 'outlined': 'filled'} onClick={() => nextPage()}>Next</Button>
						</div>
				</div>
			</div>
		</>
	)
}

export default ProductsPage;