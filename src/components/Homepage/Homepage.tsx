import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import style from './styles.module.css';

const Homepage = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCategories() {
		try {
			const response = await axios.get('https://api.escuelajs.co/api/v1/categories');

			setCategories(response.data);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching categories:', error);
			setLoading(false);
		}
		}

		fetchCategories();
	}, []);

	return (
		<div className={style.hero}>
			<div className={style.categories}>
				{loading ? (
					<p>Loading...</p>
				) : (
					<ul className={style.list}>
					{categories.map((category, i) => (
						<li className={style.listItem} key={i}><a href="#">{category.name}</a></li>
					))}
					</ul>
				)}
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