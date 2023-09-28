import { useState, useEffect } from "react";
import { getAllCategories, getAllProducts, getProductsByCategory, getAllProductsPagination, getProductsByCategoryPagination } from "../../services/Api";
import ICategory from "../../interfaces/category.interface";
import Header from "../Header/Header";
import IProduct from "../../interfaces/product.interface";
import cn from 'classnames';

import style from './styles.module.css';
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import { dividerClasses } from "@mui/joy";

function ProductsPage () {
		const [products, setProducts] = useState<IProduct[]>([])
		const [categories, setCategories] = useState<ICategory[]>([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [offset, setOffset] = useState(0);
		const [limit, setLimit] = useState(16);
		const [maxOffset, setMaxOffset] = useState(0);
		const [categoryId, setCategorId] = useState<number>(0);

		const nextPage = () => {
			console.log('Next page');
			console.log('Offset' + offset);
			console.log('MaxOffset' + maxOffset);
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
					const dataForOffset = await getAllProducts();
					if(!(dataForOffset instanceof Error)) {
						const max = Math.max(0, dataForOffset - limit)
						setMaxOffset(max);
					}

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

					const data = await getAllProductsPagination(offset, limit);

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

		useEffect(() =>{
			const fetchData = async () => {
				try {
					const dataForOffset = await getProductsByCategory(categoryId);
					if(!(dataForOffset instanceof Error)) setMaxOffset(Math.max(0, dataForOffset - limit));

					const data = await getProductsByCategoryPagination(offset, limit, categoryId);
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
		}, [categoryId])

	
		if (loading) {
			return <div style={{color: 'black'}}>Loading...</div>;
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
						<li className={cn(style.listItem, 
								categoryId === 0 ? style.selectedCategory : '')} onClick={() => {setCategorId(0); setOffset(0)}}><div>All categories<span className={style.arrowIcon}></span></div></li>
						{categories.map(category => (
							<li className={cn(style.listItem, 
								+category.id === categoryId ? style.selectedCategory : '')} key={category.id} onClick={() => {setCategorId(+category.id); setOffset(0)}}><div>{category.name}<span className={style.arrowIcon}></span></div></li>
						))}
					</ul>
				</div>
				<div className={style.productsWrapper}>
						<div className={style.products}>
							{products.length !== 0 ?products.map((product: IProduct) => (
								<ProductCard key={product.id} product={product} />
							)): <div style={{textAlign: 'center', color: 'black', fontSize: '40px', fontWeight: 'bolder'}}>Here is no products</div>}
						</div>
						<div className={style.buttonsPagination}>
							{products.length && maxOffset !== 0 && (
								<>
									<Button appearance={offset === 0? 'outlined': 'filled'} onClick={() => prevPage()} disabled={offset === 0} style={{marginRight: '50px'}}>Previous</Button>
									<Button appearance={offset > maxOffset || maxOffset === 0? 'outlined': 'filled'} disabled={maxOffset === 0} onClick={() => nextPage()}>Next</Button>
								</>
							)}
						</div>
				</div>
			</div>
		</>
	)
}

export default ProductsPage;