import IProduct from "../../interfaces/product.interface";

export default interface ICartItem {
	cartItem: Required<IProduct> & {cartQuantity: number};
	handleRemoveFromCart?: (id: number) => void;
	type?: string;
}