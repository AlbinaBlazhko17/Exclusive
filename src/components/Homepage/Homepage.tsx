import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import FirstImage from '@assets/slide_1.png';

import 'swiper/css';
import 'swiper/css/pagination';

import style from './styles.module.css';
import MostSellingProducts from '../MostSellingProducts/MostSellingProducts';

const Homepage = () => {
	return (
		<>
			<Header/>
			<div className={style.hero}>
				<div className={style.categories}>
					<ul className={style.list}>
						<li className={style.listItem}><Link to='/products'>Products<span className={style.arrowIcon}></span></Link></li>
						<li className={style.listItem}><Link to='/'>Sales<span className={style.arrowIcon}></span></Link></li>
						<li className={style.listItem}><Link to='/'>Contacts<span className={style.arrowIcon}></span></Link></li>
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
							<div className={style.slide}><img src={FirstImage} alt="slide 1" /></div>
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
				<div className={style.most}>
					<MostSellingProducts/>
				</div>
			</div>
		</>
	)
}

export default Homepage;