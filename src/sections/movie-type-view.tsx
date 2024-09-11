"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import React from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    dataMoviesAvailable: any;
    dataMoviesAllItems: any;
    sliderRef: any;
};

const MovieTypeView = ({
    dataMoviesAvailable,
    dataMoviesAllItems,
    sliderRef,
}: Props) => {
    const router = useRouter();
    return (
        <div>
            {dataMoviesAvailable && (
                <div className="w-full min-h-[40vh] px-4 xl:px-32 mb-8">
                    <Swiper
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1000: {
                                slidesPerView: 3,
                            },
                        }}
                        modules={[Pagination, Grid, Navigation]}
                        spaceBetween={20}
                        onSwiper={(it: any) => (sliderRef.current = it)}
                        navigation
                        pagination={{ clickable: true }}
                        grid={{
                            rows: 1,
                        }}
                        autoplay={true}
                        loop={true}
                        parallax={true}
                        // scrollbar={{ draggable: true }}
                        // onSlideChange={() => console.log("slide change")}
                        // slidesPerView={2}
                    >
                        {dataMoviesAllItems?.map((item: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div
                                    key={item?.imdbID}
                                    onClick={() =>
                                        router.push(`/movies/${item?.imdbID}`)
                                    }
                                    className="flex flex-col cursor-pointer h-full justify-between my-12 items-center bg-white rounded-xl shadow-lg hover:shadow-xl duration-300 hover:scale-105 transition-all"
                                >
                                    <div className="w-72 h-[40vh] overflow-hidden rounded-xl">
                                        <Image
                                            width={0}
                                            height={0}
                                            src={
                                                item?.Poster !== "N/A"
                                                    ? item?.Poster
                                                    : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                            }
                                            alt={`Image ${item?.Title}`}
                                            sizes="100vw"
                                            className="object-cover rounded-xl"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <p className="mt-4 w-full bg-slate-200 text-center h-full text-xl text-gray-800 font-semibold rounded-b-xl py-6 px-8 truncate">
                                        {item?.Title}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default MovieTypeView;
