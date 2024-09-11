"use client";

import InputSearch from "@/components/InputSearch";
import { getSearchMovies } from "@/service/moviesApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MovieTypeView from "./movie-type-view";
import SeriesTypeView from "./series-type-view";

export default function HomeView() {
    const sliderRef = useRef();
    const bottomRef = useRef(null);
    const [tempSearchQuery, setTempSearchQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e: any) => {
        setTempSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        localStorage.setItem("searchOlympic", tempSearchQuery);
        setSearchQuery(tempSearchQuery);
    };
    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // useEffect(() => {
    //     const handleLoad = () => {
    //         localStorage.removeItem("searchOlympic");
    //         console.log("Halaman telah di-reload.");
    //     };

    //     window.addEventListener("beforeunload", handleLoad);
    //     return () => {
    //         window.removeEventListener("beforeunload", handleLoad);
    //     };
    // }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const tempSearchQueryLS = localStorage.getItem("searchOlympic");
            if (tempSearchQueryLS) {
                setSearchQuery(tempSearchQueryLS);
                setTempSearchQuery(tempSearchQueryLS);
            }
        }
    }, []);

    const { data, isFetching, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["getMovies", searchQuery],
        queryFn: ({ pageParam = 1 }) =>
            getSearchMovies({
                pageParam: pageParam,
                searchQuery: searchQuery,
                type: "movie",
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const maxPage = Math.ceil(lastPage.totalResults / 10);
            const nextPage = allPages.length + 1;
            return nextPage <= maxPage ? nextPage : undefined;
        },
    });

    const {
        data: dataSeries,
        fetchNextPage: fetchNextPageSeries,
        hasNextPage: hasNextPageSeries,
        // isFetching: isFetchingSeries,
        isFetchingNextPage: isFetchingNextPageSeries,
    } = useInfiniteQuery({
        queryKey: ["getSeries", searchQuery],
        queryFn: ({ pageParam = 1 }) =>
            getSearchMovies({
                pageParam: pageParam,
                searchQuery: searchQuery,
                type: "series",
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const maxPage = Math.ceil(lastPage.totalResults / 10);
            const nextPage = allPages.length + 1;
            return nextPage <= maxPage ? nextPage : undefined;
        },
    });

    const dataMoviesAllItems = data?.pages.flatMap((page) => page.Search) || [];
    const dataSeriesAllItems =
        dataSeries?.pages.flatMap((page) => page.Search) || [];
    const isLoadingPage = isFetching || isFetchingNextPage;
    const dataMoviesAvailable = dataMoviesAllItems?.every(
        (item) => item !== undefined
    );
    const dataSeriesAvailable = dataSeriesAllItems?.every(
        (item) => item !== undefined
    );

    return (
        <section className="mt-12 flex flex-col gap-4 w-full mb-24">
            {/* Input search */}
            <InputSearch
                tempSearchQuery={tempSearchQuery}
                handleChange={handleChange}
                handleSearch={handleSearch}
            />

            {/* If data unavaileble */}
            {(!dataMoviesAvailable || !dataSeriesAvailable) && (
                <p className="text-center my-24 text-xl font-semibold">
                    Data film belum ditemukan, cari dengan keyword yang benar!
                </p>
            )}

            {/* Loading spinner */}
            {isLoadingPage && <LoadingScreen />}

            {/* Data Render */}
            {!isLoadingPage && (
                <>
                    <MovieTypeView
                        dataMoviesAvailable={dataMoviesAvailable}
                        dataMoviesAllItems={dataMoviesAllItems}
                        sliderRef={sliderRef}
                    />

                    <SeriesTypeView
                        dataSeriesAvailable={dataSeriesAvailable}
                        dataSeriesAllItems={dataSeriesAllItems}
                    />

                    {isFetchingNextPageSeries ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            {hasNextPageSeries && (
                                <button
                                    ref={bottomRef}
                                    className="my-12 px-6 py-3 bg-orange-600 text-white rounded-md w-72 hover:bg-orange-800 mx-auto"
                                    onClick={() => {
                                        fetchNextPageSeries();
                                        setTimeout(() => {
                                            scrollToBottom();
                                        }, 400);
                                    }}
                                >
                                    Load More Movie
                                </button>
                            )}
                        </>
                    )}
                </>
            )}
        </section>
    );
}
