import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { getProductsBySearch } from '@services/Api';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import searchSvg from '@assets/search.svg';

import style from './styles.module.css';
import { IconButton } from '@mui/joy';


function SearchBarWithDropDown () {
	const [searchValue, setSearchValue] = useState('');
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSearchChange = useCallback(
		_.debounce((value) => {
			if (value) {
				getProductsBySearch(value)
					.then((response) => {
						if (Array.isArray(response)) {
							setOptions(response);
						} else {
							setOptions([]);
						}
					})
					.catch((error) => {
						console.error('Error fetching products:', error);
					})
				.finally(() => {
					setLoading(false);
				});
			} else {
				setOptions([]);
				setLoading(false);
			}
		}, 300), [])

		useEffect(() => {
			console.log(searchValue);
		}, [searchValue])

	return (
		<>
			<Autocomplete
				id="search-bar"
				freeSolo
				options={options}
				inputValue={searchValue || ''}
				onInputChange={(e, newValue) => { setSearchValue(newValue); handleSearchChange(newValue)}}
				loading={loading}
				getOptionLabel={(option) => (option && option.title) || ''}
				className={style.searchBar}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search"
						variant="outlined"
						fullWidth
						sx={{width: 500, borderRadius: '5px'}}
					/>
				)}
				renderOption={(props, option) => (
					<>
						<Link to={`/products/${option.category.id}/${option.id}`} key={option.id} style={{textDecoration: 'none'}}>
							<ListItem {...props}>
								<ListItemIcon><img src={option.images[0]} alt="" style={{width: '40px', height: '40px'}} /></ListItemIcon>
								<div>
									<ListItemText primary={option.title} />
									<ListItemText primary={`$ ${option.price}`} />
								</div>
							</ListItem>
						</Link>
					</>
				)}
				// renderOptionGroup={(params, group) => (
				// 	<List key={group}>
				// 		<ListSubheader>{group}</ListSubheader>
				// 		{group.map((option) => (
				// 			<ListItem button {...params}>
				// 				<ListItemText primary={option.title} />
				// 			</ListItem>
				// 		))}
				// 	</List>
				// 	)}
			/>
			<IconButton
				onClick={() => {
					console.log('Search clicked');
				}}
				style={{marginLeft: '10px'}}
			> 
				<Link to={`/search?query=${searchValue}`} style={{color: 'black'}}>
					<img src={searchSvg} alt="Search" />
				</Link>
			</IconButton>
		
		</>
	);
}

export default SearchBarWithDropDown;