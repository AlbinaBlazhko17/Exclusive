import cn from 'classnames';
import { ButtonProps } from './Button.props';

import styles from './styles.module.css';

function Button ({children, appearance, className, ...props}: ButtonProps): JSX.Element {
	return (
		<button className={cn(styles.button, className, {
			[styles.outlined]: appearance === 'outlined',
			[styles.filled]: appearance === 'filled',
		})} {...props}>{children}</button>
	)
}

export default Button;