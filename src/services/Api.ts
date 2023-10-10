import axios from "axios";
import ICategory from "../interfaces/category.interface";
import IProduct from '../interfaces/product.interface';

const instance = axios.create({
	baseURL: 'https://api.escuelajs.co/api/v1',
});

export const getAllCategories = async (): Promise<ICategory[] | Error> => {
	try {
		const response = await instance.get('/categories');
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
}

export const getAllProducts = async (): Promise<number | Error> => {
	try {
		const response = await instance.get(`/products`);
		return response.data.length;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getProductsByCategory = async (categoryId: number): Promise<number | Error> => {
	try {
		const response = await instance.get('/products', {
			params: {
				categoryId
			}
		});
		return response.data.length;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getAllProductsPagination = async (offset: number, limit: number): Promise<IProduct[] | Error> => {
	try {
		const response = await instance.get('/products', {
			params : {
				offset,
				limit,
			}
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getProductsByCategoryPagination = async (offset: number, limit: number, categoryId: number) => {
	try {
		const response = await instance.get('/products', {
			params : {
				offset,
				limit,
				categoryId
			}
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getSingleProduct = async (id: number): Promise<IProduct | Error> => {
	try {
		const response = await instance.get(`/products/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getProductsBySearch = async (title: string): Promise<IProduct[] | Error> => {
	try {
		const response = await instance.get('products', {
			params: {
				title
			}
		});
		return response.data;
	} catch(error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}