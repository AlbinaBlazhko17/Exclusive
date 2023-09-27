import axios from "axios";
import ICategory from "../interfaces/category.interface";
import IProduct from '../interfaces/product.interface';

export const getAllCategories = async (): Promise<ICategory[] | Error> => {
	try {
		const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
}

export const getAllProducts = async (offset: number, limit: number): Promise<IProduct[] | Error> => {
	try {
		const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getProductsByCategory = async (categoryId: number) => {
	try {
		const response = await axios.get(`https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

export const getSingleProducts = async (id: number): Promise<IProduct | Error> => {
	try {
		const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}