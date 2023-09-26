import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { getAllCategories } from "../../services/Api";
import ICategory from "../../interfaces/category.interface";


import 'swiper/css';
import 'swiper/css/pagination';

import style from './styles.module.css';

const Homepage = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllCategories();
				setCategories(data);
				setLoading(false)
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		}
		fetchData();
	}, []);


	if (loading) {
		return <div>Loading...</div>;
	}
	
	if (error) {
		return <div className={style.error}>Error loading categories. Please try again later.</div>;
	}

	return (
		<div className={style.hero}>
			<div className={style.categories}>
				<ul className={style.list}>
					{categories.map(category => (
						<li className={style.listItem} key={category.id}><a href="#">{category.name}<span className={style.arrowIcon}></span></a></li>
					))}
				</ul>
			</div>
			<div className={style.slider}>
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					pagination={{ clickable: true }}
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					>
					<SwiperSlide>
						<div className={style.slide}><img src="src/assets/slide_1.png" alt="slide 1" /></div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={style.slide}><img src="src/assets/slide_2.png" alt="slide 2" /></div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={style.slide}><img src="src/assets/slide_3.png" alt="slide 3" /></div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={style.slide}><img src="src/assets/slide_4.png" alt="slide 4" /></div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={style.slide}><img src="src/assets/slide_5.png" alt="slide 5" /></div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	)
}

export default Homepage;