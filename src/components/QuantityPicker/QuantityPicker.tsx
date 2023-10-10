import Button from '../Button/Button';
import TextField from '@mui/material/TextField';
import MinusSvg from '@assets/icon-minus.svg';
import PlusSvg from '@assets/icon-plus.svg';

import style from './styles.module.css';

function QuantityPicker({ quantity, onQuantityChange, ...props }: {quantity: number, onQuantityChange: (newQuantity: number) => void}) {

	const handleDecrement = () => {
		if (quantity > 1) {
			onQuantityChange(quantity - 1);
		}
	};

	const handleIncrement = () => {
		onQuantityChange(quantity + 1);
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value, 10);
		if (!isNaN(newQuantity) && newQuantity >= 1) {
			onQuantityChange(newQuantity);
		}
	};

	return (
		<div className={style.picker} {...props}>
			<Button appearance={quantity === 1? 'outlined': 'filled' } className={style.prickerButton} onClick={handleDecrement}>
				<span>
					<img src={MinusSvg} alt="Minus" />
				</span>
			</Button>
			<TextField
				type="tel"
				value={quantity}
				sx={{width: 80}}
				onChange={handleQuantityChange}
				inputProps={{min: 1, style: { textAlign: 'center', borderRadius: 0, borderTop: '1px solid rgba(0, 0, 0, 0.50)', borderBottom: '1px solid rgba(0, 0, 0, 0.50)', fontWeight: 'bolder', fontSize: '20px', height: '15px'}}}
			/>
			<Button appearance={'filled'} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} className={style.prickerButton} onClick={handleIncrement}>
				<span>
					<img src={PlusSvg} alt="Plus" />
				</span>
			</Button>
		</div>
	);
}

export default QuantityPicker;
