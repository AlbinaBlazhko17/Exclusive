import axios from "axios";
import ICategory from "../interfaces/category.interface";

export const getAllCategories = async (): Promise<ICategory[] | Error> => {
	try {
		const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
}