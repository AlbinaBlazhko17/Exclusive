import style from './styles.module.css';

function Subheader () {
	return (
		<div className={style.subheader}>
			<div className={style.redBox}></div>
			<h3>Cart</h3>
		</div>
	)
}

export default Subheader;