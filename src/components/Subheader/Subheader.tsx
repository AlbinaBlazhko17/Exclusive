import style from './styles.module.css';

function Subheader ({type}: {type: string}) {
	return (
		<div className={style.subheader}>
			<div className={style.redBox}></div>
			<h3>{type}</h3>
		</div>
	)
}

export default Subheader;