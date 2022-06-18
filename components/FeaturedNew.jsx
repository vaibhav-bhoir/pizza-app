import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "../styles/Featured.module.css";

const FeaturedNew = () => {
    const images = ["/img/banner6.jpg","/img/banner5.jpg", "/img/banner8.jpg",];


    return (
        <div className={styles.container}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false,
                }}
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className={styles.imgContainer} key={i}>
                            <img src={img} alt="" />
                            {/* <Image
                                alt=""
                                src={img}
                                width="100%" height="100%" layout="fill" objectFit="cover"
                            /> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedNew;
