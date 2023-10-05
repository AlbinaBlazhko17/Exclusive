import { useLocation } from "react-router-dom";
import Subheader from "../Subheader/Subheader";
import { useEffect, useState } from "react";
import { getProductsBySearch } from "../../services/Api";
import ProductCard from "../ProductCard/ProductCard";

import style from './styles.module.css';
import Header from "../Header/Header";

function SearchResults () {
	const [results, setResults] = useState();
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const query = queryParams.get('query');
  
	console.log(query);

	useEffect(() => {
		(async () => {
			try {
				const data = await getProductsBySearch(query)
				if(!(data instanceof Error)) setResults(data);
			} catch(err) {
				console.error(err);
			}
		}) ();
	}, []);

	return (
		<>
			<Header/>
			<div style={{padding: '5% 10%'}}>
				<Subheader type="Search results"/>
				<div className={style.results}>
					{
						results? (
							results.map (product => (
								<ProductCard product={product}/>
							))
						): <div>Products not found!</div>
					}
				</div>
			</div>
		</>
	)
}

export default SearchResults;