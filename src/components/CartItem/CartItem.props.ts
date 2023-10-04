import IProduct from "../../interfaces/product.interface";

export default interface ICartItem {
	cartItem: IProduct & {cartQuantity: number};
	handleRemoveFromCart: (id: number) => void;
	type: string;
}