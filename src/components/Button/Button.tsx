import cn from 'classnames';
import { ButtonProps } from './Button.props';

import styles from './styles.module.css';

function Button ({children, appearance}: ButtonProps): JSX.Element {
	return (
		<button className={cn(styles.button, {
			[styles.outlined]: appearance === 'outlined',
			[styles.filled]: appearance === 'filled',
		})}>{children}</button>
	)
}

export default Button;