import ICategory from "./category.interface"

export default interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: ICategory
	images: string[]
  }